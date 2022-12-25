"use strict";
const express = require("express");
const { registerRouter } = require("./routes/register.js");
const app = express();
app.use(express.json());
app.listen(5000);
console.log("App listening at port 5000");
// Routers
app.use("/register", registerRouter);
