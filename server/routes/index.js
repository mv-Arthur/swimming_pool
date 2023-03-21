const { Router } = require("express");
const router = new Router();
const bidRouter = require("./bidRouter");
const coachRouter = require("./coachRouter");
const reviewRouter = require("./reviewRouter");
const userRouter = require("./userRouter");
const serviceRouter = require("./serviceRouter");
const categoryRouter = require("./categoryRouter");

router.use("/user", userRouter);
router.use("/bid", bidRouter);
router.use("/coach", coachRouter);
router.use("/review", reviewRouter);
router.use("/service", serviceRouter);
router.use("/category", categoryRouter);

module.exports = router;
