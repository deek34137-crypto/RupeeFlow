const router = require("express").Router();
const { convert } = require("../controllers/convert.controller");

router.get("/", convert);

module.exports = router;