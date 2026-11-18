var database = require("../database/config");

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT id, nome, email, senha
        FROM usuario
        WHERE email = ? AND senha = ?;
    `;

    return database.executar(instrucaoSql, [email, senha]);
}

function cadastrar(nome, email, senha) {
    var instrucaoSql = `
        INSERT INTO usuario (nome, nome_usuario, email, senha)
        VALUES (?, ?, ?, ?);
    `;

    return database.executar(instrucaoSql, [nome, nome, email, senha]);
}

module.exports = {
    autenticar,
    cadastrar
};
