import express = require("express");
import { Stripe } from "stripe";
const purchaseRouter = express.Router();

const { getUTCTimestamp } = require("../utils");
const { v4: uuidv4 } = require("uuid");

// Set up Firebase
const { db } = require("../firebase");
const validRef = db.ref("adminData/accessCodes/valid");
const orderLogsRef = db.ref("adminData/orderLogs");

// Set up Stripe
const stripe = require("stripe")(process.env.StripeKey);

// Set up SendInBlue
const Sib = require("sib-api-v3-sdk");
const SibClient = Sib.ApiClient.instance;
const apiKey = SibClient.authentications["api-key"];
apiKey.apiKey = process.env.SibKey;
const tranEmailApi = new Sib.TransactionalEmailsApi();
import { SendCodeTemplate } from "../data/sendCodeEmailHTML";
import { OrderDetails } from "../types";

// Request handlers
purchaseRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request: express.Request, response: express.Response) => {
    const payload = request.body;
    const sig = request.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        sig,
        process.env.StripeEndpointSecret
      );
    } catch (err: any) {
      const message = `Webhook Error: ${err.message}`;
      console.log(message);
      return response.status(400).send(message);
    }

    handleStripeEvent(event);
    response.send();
  }
);

function handleStripeEvent(event: any): number {
  switch (event.type) {
    case "checkout.session.completed":
      getOrderData(event).then((orderDetails: OrderDetails) => {
        fulfilledBefore(orderDetails.paymentIntentID).then(
          (alreadyFulfilled: boolean) => {
            if (!alreadyFulfilled) {
              const newCodes = [];
              for (let i = 0; i < orderDetails.quantity; i++) {
                newCodes.push(createProductCode());
              }
              sendCodes(newCodes, orderDetails.email);
              logOrderInFirebase(orderDetails, newCodes);
              logOrderFulfillment("Success", orderDetails);
            } else {
              logOrderFulfillment("Fail", orderDetails);
              return 400;
            }
          }
        );
      });
      return 200;
    default:
      return 200;
  }
}

// Check if order has been fulfilled before
async function fulfilledBefore(paymentIntentID: string): Promise<boolean> {
  let alreadyFulfilled = true;
  orderLogsRef.child(paymentIntentID).once("value", (snapshot: any) => {
    alreadyFulfilled = snapshot.exists();
  });
  return alreadyFulfilled;
}

// Stripe helpers
async function getOrderData(event: any): Promise<OrderDetails> {
  const sessionID = event.data.object.id;

  // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
  const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
    sessionID,
    {
      expand: ["line_items"],
    }
  );

  const timestamp = getUTCTimestamp();
  return {
    timestamp: timestamp,
    checkoutID: sessionWithLineItems.id,
    customerID: sessionWithLineItems.customer || "Guest",
    paymentIntentID: sessionWithLineItems.payment_intent,
    email: sessionWithLineItems.customer_details.email,
    name: sessionWithLineItems.customer_details.name,
    country: sessionWithLineItems.customer_details.address.country,
    paid: sessionWithLineItems.amount_total / 100,
    currency: sessionWithLineItems.currency,
    quantity: sessionWithLineItems.line_items.data.reduce(
      (acc: number, curr: Stripe.LineItem) => acc + (curr?.quantity || 0),
      0
    ),
  };
}

// Order fulfillment
const sendCodes = (codes: string[], recipient: string) => {
  tranEmailApi
    .sendTransacEmail({
      sender: {
        email: "noreply@munsuite.com",
        name: "MUNSuite",
      },
      to: [
        {
          email: recipient,
        },
      ],
      subject: "Your MUNSuite Access Codes",
      htmlContent: SendCodeTemplate({ codes: codes }),
    })
    .then(() => {})
    .catch(() => {
      console.log("Email couldn't send");
    });
};

const createProductCode = (): string => {
  const UTCTimestamp = getUTCTimestamp();
  const newCode = uuidv4();

  // Add new code to Firebase with corresponding timestamp
  validRef.child(newCode).set(UTCTimestamp);
  return newCode;
};

const logOrderFulfillment = (
  outcome: "Success" | "Fail",
  order: OrderDetails
) => {
  if (outcome === "Success") {
    console.log(
      `[${order.timestamp}] Fulfilled order for [E: ${order.email}] [PI: ${order.paymentIntentID}], created & mailed ${order.quantity} codes`
    );
  } else {
    console.log(
      `[${order.timestamp}] Rejected order for [E: ${order.email}] [PI: ${order.paymentIntentID}], already fulfilled before`
    );
  }
};

const logOrderInFirebase = (order: OrderDetails, newCodes: string[]) => {
  orderLogsRef.child(`${order.paymentIntentID}`).push({
    ...order,
    codes: newCodes,
  });
};

module.exports = { purchaseRouter };
