var express = require("express");
var router = express.Router();
var dashboardController = require("../controllers/dashboardController");

router.get("/kpis", dashboardController.buscarKpis);
router.get("/papas", dashboardController.buscarPapasFavoritos);
router.get("/musicas", dashboardController.buscarMusicasFavoritas);
router.get("/albuns", dashboardController.buscarAlbunsFavoritos);

module.exports = router;
