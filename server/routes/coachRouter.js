const { Router } = require("express");
const router = new Router();
const coachController = require("../controllers/coachController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/", checkRoleMiddleware("ADMIN"), coachController.post);
router.get("/", coachController.getAll);

module.exports = router;
