const router = require("express").Router();
const { realCost } = require("../controllers/realcost.controller");

router.post("/", realCost);

module.exports = router;