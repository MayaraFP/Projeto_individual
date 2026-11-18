var database = require("../database/config");

function buscarAquarioDoUsuario(aquarioId, usuarioId) {
    var instrucaoSql = `
        SELECT a.id, a.descricao, a.tipo_agua
        FROM aquario a
        INNER JOIN usuario u ON u.fk_empresa = a.fk_empresa
        WHERE a.id = ? AND u.id = ?;
    `;
    return database.executar(instrucaoSql, [aquarioId, usuarioId]);
}

function buscarNoCatalogo(nomeNormalizado) {
    var instrucaoSql = `
        SELECT id, nome_padrao, tipo_agua
        FROM catalogo_especie
        WHERE nome_normalizado = ?;
    `;
    return database.executar(instrucaoSql, [nomeNormalizado]);
}

function buscarDuplicidade(aquarioId, nomeNormalizado) {
    var instrucaoSql = `
        SELECT id
        FROM especie
        WHERE fk_aquario = ? AND nome_normalizado = ?;
    `;
    return database.executar(instrucaoSql, [aquarioId, nomeNormalizado]);
}

function cadastrar(catalogoId, aquarioId, nomePadrao, nomeNormalizado, tipoAgua) {
    var instrucaoSql = `
        INSERT INTO especie
            (fk_catalogo_especie, fk_aquario, nome_padrao, nome_normalizado, tipo_agua)
        VALUES (?, ?, ?, ?, ?);
    `;
    return database.executar(instrucaoSql, [catalogoId, aquarioId, nomePadrao, nomeNormalizado, tipoAgua]);
}

function listarPorAquario(aquarioId, tipoAgua) {
    var instrucaoSql = `
        SELECT id, nome_padrao, tipo_agua, criado_em
        FROM especie
        WHERE fk_aquario = ?
        ${tipoAgua ? "AND tipo_agua = ?" : ""}
        ORDER BY nome_padrao;
    `;
    var parametros = tipoAgua ? [aquarioId, tipoAgua] : [aquarioId];
    return database.executar(instrucaoSql, parametros);
}

module.exports = {
    buscarAquarioDoUsuario,
    buscarNoCatalogo,
    buscarDuplicidade,
    cadastrar,
    listarPorAquario
};
