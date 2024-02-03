import express = require("express");
const analyticsRouter = express.Router();
analyticsRouter.use(express.json());

const { incrementAnalytics } = require("../utils/utils");

analyticsRouter.post("/", (req: express.Request, res: express.Response) => {
  const type: string = req.body.type;

  switch (type) {
    case "add_dels":
      const count: number = req.body.count || 0;
      incrementAnalytics("historicDelcount", count, { max: 500 });
      break;
    case "submit_directive":
      incrementAnalytics("directiveSubmissions", 1);
      break;
  }

  res.send();
});

module.exports = { analyticsRouter };
