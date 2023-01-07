import express = require("express");
const analyticsRouter = express.Router();
analyticsRouter.use(express.json());

const { incrementAnalytics } = require("../utils");

analyticsRouter.post(
  "/delcount",
  (req: express.Request, res: express.Response) => {
    const count: number = req.body.count;
    incrementAnalytics("historicDelcount", count, { max: 500 });
    res.send();
  }
);

module.exports = { analyticsRouter };
