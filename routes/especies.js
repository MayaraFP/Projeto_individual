var express = require("express");
var router = express.Router();

var especieController = require("../controllers/especieController");

router.post("/cadastrar", function (req, res) {
    especieController.cadastrar(req, res);
});

router.get("/aquario/:aquarioId", function (req, res) {
    especieController.listarPorAquario(req, res);
});

module.exports = router;
