const express = require("express");
const { registerRouter } = require("./routes/register");

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`App listening at port ${port}`);

// Routers
app.use("/register", registerRouter);
