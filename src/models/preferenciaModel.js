var database = require("../database/config");

function cadastrar(preferencia) {
    var usuarioId = Number(preferencia.usuarioId);
    var papa = String(preferencia.papa).trim();
    var musica = String(preferencia.musica).trim();
    var album = String(preferencia.album).trim();

    var buscarPapa = `SELECT id FROM personagem WHERE LOWER(nome) = LOWER(?) LIMIT 1`;
    var buscarAlbum = `SELECT id FROM album WHERE LOWER(nome) = LOWER(?) LIMIT 1`;

    return Promise.all([
        database.executar(buscarPapa, [papa]),
        database.executar(buscarAlbum, [album])
    ]).then(function (resultados) {
        var papaEncontrado = resultados[0][0];
        var albumEncontrado = resultados[1][0];

        if (!papaEncontrado) {
            throw new Error("Papa não encontrado no catálogo.");
        }
        if (!albumEncontrado) {
            throw new Error("Álbum não encontrado no catálogo.");
        }

        var inserirPapa = `
            INSERT INTO usuario_papa_favorito (fk_usuario, fk_personagem)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE fk_personagem = VALUES(fk_personagem);
        `;
        var inserirMusica = `
            INSERT INTO musica (titulo, autor, fk_album)
            SELECT ?, 'GHOST', ?
            WHERE NOT EXISTS (
                SELECT 1 FROM musica WHERE LOWER(titulo) = LOWER(?) AND fk_album = ?
            );
        `;

        return database.executar(inserirPapa, [usuarioId, papaEncontrado.id])
            .then(function () {
                return database.executar(inserirMusica, [musica, albumEncontrado.id, musica, albumEncontrado.id]);
            })
            .then(function () {
                return database.executar(
                    `SELECT id FROM musica WHERE LOWER(titulo) = LOWER(?) AND fk_album = ? LIMIT 1`,
                    [musica, albumEncontrado.id]
                );
            })
            .then(function (musicasEncontradas) {
                var musicaEncontrada = musicasEncontradas[0];
                if (!musicaEncontrada) {
                    throw new Error("Música não encontrada no catálogo.");
                }

                return database.executar(
                    `INSERT INTO usuario_musica (fk_usuario, fk_musica, favorita)
                     VALUES (?, ?, TRUE)
                     ON DUPLICATE KEY UPDATE favorita = TRUE`,
                    [usuarioId, musicaEncontrada.id]
                );
            })
            .then(function () {
                return database.executar(
                    `INSERT IGNORE INTO usuario_album (fk_usuario, fk_album) VALUES (?, ?)`,
                    [usuarioId, albumEncontrado.id]
                );
            });
    });
}

module.exports = { cadastrar };
