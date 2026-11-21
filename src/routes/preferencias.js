var express = require("express");
var router = express.Router();
var preferenciaController = require("../controllers/preferenciaController");

router.post("/cadastrar", preferenciaController.cadastrar);

module.exports = router;
