var dashboardModel = require("../models/dashboardModel");

function responderComDados(res, consulta) {
    consulta
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.error("Erro ao consultar o dashboard:", erro);
            res.status(500).json({ erro: "Não foi possível carregar os dados do dashboard." });
        });
}

function buscarKpis(req, res) {
    responderComDados(res, dashboardModel.buscarKpis());
}

function buscarPapasFavoritos(req, res) {
    responderComDados(res, dashboardModel.buscarPapasFavoritos());
}

function buscarMusicasFavoritas(req, res) {
    responderComDados(res, dashboardModel.buscarMusicasFavoritas());
}

function buscarAlbunsFavoritos(req, res) {
    responderComDados(res, dashboardModel.buscarAlbunsFavoritos());
}

module.exports = {
    buscarKpis,
    buscarPapasFavoritos,
    buscarMusicasFavoritas,
    buscarAlbunsFavoritos
};
