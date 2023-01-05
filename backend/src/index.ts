require("dotenv").config();
import express = require("express");
const { registerRouter } = require("./routes/register");
const { purchaseRouter } = require("./routes/purchase");
const { accountRouter } = require("./routes/account");

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://munsuite.com");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const port = process.env.PORT || 4242;
app.listen(port);
console.log(`App listening at port ${port}`);

// Routers
app.use("/register", registerRouter);
app.use("/purchase", purchaseRouter);
app.use("/account", accountRouter);
