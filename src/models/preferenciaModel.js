var database = require("../database/config");

function cadastrar(preferencia) {
    var usuarioId = Number(preferencia.usuarioId);
    var papa = String(preferencia.papa).trim();
    var musica = String(preferencia.musica).trim();
    var album = String(preferencia.album).trim();

    var buscarPapa = `SELECT id FROM personagem WHERE LOWER(nome) = LOWER(?) LIMIT 1`;
    var buscarAlbum = `SELECT id FROM album WHERE LOWER(nome) = LOWER(?) LIMIT 1`;

    return database.executar(buscarPapa, [papa])
        .then(function (papasEncontrados) {
        var papaEncontrado = papasEncontrados[0];

        if (!papaEncontrado) {
            throw new Error("Papa não encontrado no catálogo.");
        }

        return database.executar(
            `INSERT INTO usuario_papa_favorito (fk_usuario, fk_personagem) VALUES (?, ?)`,
            [usuarioId, papaEncontrado.id]
        );
    })
    .then(function () {
        return database.executar(buscarAlbum, [album]);
    })
    .then(function (albunsEncontrados) {
        var albumEncontrado = albunsEncontrados[0];

        if (!albumEncontrado) {
            throw new Error("Álbum não encontrado no catálogo.");
        }

        return database.executar(
            `INSERT INTO musica (titulo, autor, fk_album) VALUES (?, 'GHOST', ?)`,
            [musica, albumEncontrado.id]
        ).then(function (musicaInserida) {
            if (!musicaInserida.insertId) {
                throw new Error("A música não foi inserida no catálogo.");
            }

            return database.executar(
                `INSERT INTO usuario_musica (fk_usuario, fk_musica, favorita) VALUES (?, ?, TRUE)`,
                [usuarioId, musicaInserida.insertId]
            );
        }).then(function () {
            return database.executar(
                `INSERT INTO usuario_album (fk_usuario, fk_album) VALUES (?, ?)`,
                [usuarioId, albumEncontrado.id]
            );
        });
    });
}

module.exports = { cadastrar };
