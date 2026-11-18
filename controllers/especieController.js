var especieModel = require("../models/especieModel");

function normalizarNome(nome) {
    return nome
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

function campoObrigatorio(valor) {
    return valor == undefined || String(valor).trim() === "";
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var tipoAgua = req.body.tipoAguaServer;
    var aquarioId = Number(req.body.aquarioIdServer);
    var usuarioId = Number(req.body.usuarioIdServer);

    if (campoObrigatorio(nome) || campoObrigatorio(tipoAgua) || !Number.isInteger(aquarioId) || !Number.isInteger(usuarioId)) {
        return res.status(400).send("Nome, tipo de agua, aquario e usuario sao obrigatorios.");
    }

    if (tipoAgua !== "DOCE" && tipoAgua !== "SALGADA") {
        return res.status(400).send("O tipo de agua deve ser DOCE ou SALGADA.");
    }

    var nomeNormalizado = normalizarNome(nome);

    especieModel.buscarAquarioDoUsuario(aquarioId, usuarioId)
        .then(function (aquarios) {
            if (aquarios.length === 0) {
                return res.status(404).send("Aquario nao encontrado para este usuario.");
            }

            var aquario = aquarios[0];
            if (aquario.tipo_agua !== tipoAgua) {
                return res.status(400).send("O tipo de agua selecionado nao corresponde ao aquario.");
            }

            return especieModel.buscarNoCatalogo(nomeNormalizado)
                .then(function (especiesCatalogo) {
                    if (especiesCatalogo.length === 0) {
                        return res.status(404).send("Especie nao encontrada no catalogo padronizado.");
                    }

                    var especieCatalogo = especiesCatalogo[0];
                    if (especieCatalogo.tipo_agua !== tipoAgua) {
                        return res.status(400).send("O tipo de agua selecionado nao e compativel com a especie.");
                    }

                    return especieModel.buscarDuplicidade(aquarioId, nomeNormalizado)
                        .then(function (duplicidades) {
                            if (duplicidades.length > 0) {
                                return res.status(409).send("Esta especie ja esta cadastrada neste aquario.");
                            }

                            return especieModel.cadastrar(
                                especieCatalogo.id,
                                aquarioId,
                                especieCatalogo.nome_padrao,
                                nomeNormalizado,
                                especieCatalogo.tipo_agua
                            ).then(function (resultado) {
                                res.status(201).json({
                                    id: resultado.insertId,
                                    nome: especieCatalogo.nome_padrao,
                                    tipoAgua: especieCatalogo.tipo_agua,
                                    aquarioId: aquarioId
                                });
                            });
                        });
                });
        })
        .catch(function (erro) {
            console.log("Erro ao cadastrar especie:", erro);
            if (erro.code === "ER_DUP_ENTRY") {
                return res.status(409).send("Esta especie ja esta cadastrada neste aquario.");
            }
            res.status(500).json(erro.sqlMessage || "Erro interno ao cadastrar especie.");
        });
}

function listarPorAquario(req, res) {
    var aquarioId = Number(req.params.aquarioId);
    var usuarioId = Number(req.query.usuarioId);
    var tipoAgua = req.query.tipoAgua;

    if (!Number.isInteger(aquarioId) || !Number.isInteger(usuarioId)) {
        return res.status(400).send("Aquario e usuario validos sao obrigatorios.");
    }

    if (tipoAgua != undefined && tipoAgua !== "DOCE" && tipoAgua !== "SALGADA") {
        return res.status(400).send("O filtro de tipo de agua deve ser DOCE ou SALGADA.");
    }

    especieModel.buscarAquarioDoUsuario(aquarioId, usuarioId)
        .then(function (aquarios) {
            if (aquarios.length === 0) {
                return res.status(404).send("Aquario nao encontrado para este usuario.");
            }

            return especieModel.listarPorAquario(aquarioId, tipoAgua)
                .then(function (resultado) {
                    res.status(200).json(resultado);
                });
        })
        .catch(function (erro) {
            console.log("Erro ao listar especies:", erro);
            res.status(500).json(erro.sqlMessage || "Erro interno ao listar especies.");
        });
}

module.exports = {
    cadastrar,
    listarPorAquario
};
