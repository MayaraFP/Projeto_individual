var preferenciaModel = require("../models/preferenciaModel");

function cadastrar(req, res) {
    var usuarioId = req.body.usuarioIdServer;
    var papa = req.body.nomeServer;
    var musica = req.body.tituloServer;
    var album = req.body.senhaServer;

    if (!usuarioId || !Number.isInteger(Number(usuarioId)) || Number(usuarioId) <= 0 ||
        !papa || !musica || !album || !req.body.personagemServer) {
        return res.status(400).json({ erro: "Todos os campos da preferência são obrigatórios." });
    }

    preferenciaModel.cadastrar({ usuarioId: usuarioId, papa: papa, musica: musica, album: album })
        .then(function () {
            res.status(201).json({ mensagem: "Preferências cadastradas com sucesso." });
        })
        .catch(function (erro) {
            console.error("Erro ao cadastrar preferências:", erro);
            if (erro.code === "ER_DUP_ENTRY") {
                return res.status(409).json({
                    erro: "Este usuário já possui uma resposta cadastrada. A tabela permite apenas uma resposta por usuário."
                });
            }

            res.status(500).json({ erro: erro.message || "Não foi possível cadastrar as preferências." });
        });
}

module.exports = { cadastrar };
