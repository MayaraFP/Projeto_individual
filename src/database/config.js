var mysql = require("mysql2");

var mySqlConfig = {
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_DATABASE || "banco_ghost",
    user: process.env.DB_USER || "insert_ghost",
    password: process.env.DB_PASSWORD || "h3 Is 4nd w3 Ar3",
    port: process.env.DB_PORT || 3306
};

function executar(instrucao, parametros) {
    return new Promise(function (resolve, reject) {
        var conexao = mysql.createConnection(mySqlConfig);

        conexao.connect(function (erro) {
            if (erro) {
                reject(erro);
                return;
            }

            conexao.query(instrucao, parametros, function (erroConsulta, resultados) {
                conexao.end();

                if (erroConsulta) {
                    reject(erroConsulta);
                    return;
                }

                resolve(resultados);
            });
        });
    });
}

module.exports = {
    executar
};
