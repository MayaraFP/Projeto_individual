var database = require("../database/config");

function buscarKpis() {
    var instrucaoSql = `
        SELECT
            (SELECT COUNT(*) FROM usuario) AS registros,
            (SELECT COUNT(*) FROM musica) AS musicas,
            (
                SELECT p.nome
                FROM usuario_papa_favorito upf
                JOIN personagem p ON p.id = upf.fk_personagem
                GROUP BY p.id, p.nome
                ORDER BY COUNT(*) DESC, p.nome ASC
                LIMIT 1
            ) AS papa_favorito;
    `;

    return database.executar(instrucaoSql);
}

function buscarPapasFavoritos() {
    var instrucaoSql = `
        SELECT p.nome AS papa, COUNT(*) AS quantidade
        FROM usuario_papa_favorito upf
        JOIN personagem p ON p.id = upf.fk_personagem
        GROUP BY p.id, p.nome
        ORDER BY quantidade DESC, p.nome ASC;
    `;

    return database.executar(instrucaoSql);
}

function buscarMusicasFavoritas() {
    var instrucaoSql = `
        SELECT m.titulo AS musica, COUNT(*) AS quantidade
        FROM usuario_musica um
        JOIN musica m ON m.id = um.fk_musica
        WHERE um.favorita = TRUE
        GROUP BY m.id, m.titulo
        ORDER BY quantidade DESC, m.titulo ASC
        LIMIT 10;
    `;

    return database.executar(instrucaoSql);
}

function buscarAlbunsFavoritos() {
    var instrucaoSql = `
        SELECT a.nome AS album, COUNT(*) AS quantidade, a.imagem_url
        FROM usuario_album ua
        JOIN album a ON a.id = ua.fk_album
        GROUP BY a.id, a.nome, a.imagem_url
        ORDER BY quantidade DESC, a.nome ASC
        LIMIT 3;
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    buscarKpis,
    buscarPapasFavoritos,
    buscarMusicasFavoritas,
    buscarAlbunsFavoritos
};
