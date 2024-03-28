require("dotenv").config();
const { initializeServer, initializeSweeper } = require("./utils/utils");

initializeServer(process.env.PORT || 4242);
initializeSweeper("0 0 * * * *");
