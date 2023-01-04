const stripe = require("stripe")(process.env.StripeKey);
const { db } = require("../firebase");
const { v4: uuidv4 } = require("uuid");

import express = require("express");
const purchaseRouter = express.Router();

const { getUTCTimestamp } = require("../utils");
const validRef = db.ref("adminData/accessCodes/valid");

// Set up SendInBlue
const Sib = require("sib-api-v3-sdk");
const SibClient = Sib.ApiClient.instance;
const apiKey = SibClient.authentications["api-key"];
apiKey.apiKey = process.env.SibKey;
const tranEmailApi = new Sib.TransactionalEmailsApi();
import { SendCodeTemplate } from "../data/sendCodeEmailHTML";
import { EmailAndQuantity } from "../types";

// Request handlers
purchaseRouter.post(
  "/webhook",
  (req: express.Request, res: express.Response) => {
    const event = req.body;
    handlePaymentIntent(event);
    res.send();
  }
);

const handlePaymentIntent = (event: any) => {
  const paymentIntent: any = event.data.object;
  switch (event.type) {
    case "payment_intent.amount_capturable_updated":
      break;
    case "payment_intent.canceled":
      break;
    case "payment_intent.created":
      break;
    case "payment_intent.partially_funded":
      break;
    case "payment_intent.payment_failed":
      break;
    case "payment_intent.processing":
      break;
    case "payment_intent.requires_action":
      break;
    case "payment_intent.succeeded":
      getEmailAndQuantity(paymentIntent).then((result: EmailAndQuantity) => {
        console.log(result);
      });
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
};

// Stripe helpers
async function getEmailAndQuantity(paymentIntent: any) {
  const email = await getCustomerEmail(paymentIntent);
  const quantity = await getQuantityFromPaymentIntent(paymentIntent);

  return {
    email: email,
    quantity: quantity,
  };
}

async function getCustomerEmail(paymentIntent: any) {
  const customer = await stripe.customers.retrieve(paymentIntent.customer);
  const email = customer.email;

  return email;
}

async function getQuantityFromPaymentIntent(paymentIntent: any) {
  const charge = await stripe.charges.retrieve(paymentIntent.charge);
  const lineItems = charge.items;

  let quantity = 0;
  for (const lineItem of lineItems.data) {
    quantity += lineItem.quantity;
  }

  return quantity;
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
    .then(() => {
      console.log("Email sent!");
    })
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

module.exports = { purchaseRouter };
