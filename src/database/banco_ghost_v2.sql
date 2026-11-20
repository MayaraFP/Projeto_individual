CREATE DATABASE sprint3;
USE sprint3;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nome_usuario VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE album (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    id_spotify VARCHAR(100) UNIQUE,
    imagem_url VARCHAR(500)
);

CREATE TABLE musica (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    autor CHAR(5) NOT NULL,
    id_spotify VARCHAR(100) UNIQUE,
    duracao INT,
    fk_album INT NOT NULL,

    CONSTRAINT fk_musica_album FOREIGN KEY (fk_album) REFERENCES album(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT chk_autor CHECK (autor = "GHOST")
);

CREATE TABLE personagem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(75) NOT NULL
);

CREATE TABLE usuario_musica (
    fk_usuario INT NOT NULL,
    fk_musica INT NOT NULL,
    favorita BOOLEAN DEFAULT FALSE,
    data_registro DATETIME DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (fk_usuario, fk_musica),

    CONSTRAINT fk_usuario_musica_usuario FOREIGN KEY (fk_usuario) REFERENCES usuario(id) ON DELETE CASCADE,

    CONSTRAINT fk_usuario_musica_musica FOREIGN KEY (fk_musica) REFERENCES musica(id) ON DELETE CASCADE
);

CREATE TABLE usuario_album (
    fk_usuario INT NOT NULL,
    fk_album INT NOT NULL,

    PRIMARY KEY (fk_usuario, fk_album),

    CONSTRAINT fk_usuario_album_usuario FOREIGN KEY (fk_usuario) REFERENCES usuario(id) ON DELETE CASCADE,

    CONSTRAINT fk_usuario_album_album FOREIGN KEY (fk_album) REFERENCES album(id) ON DELETE CASCADE
);

CREATE TABLE usuario_papa_favorito (
    fk_usuario INT PRIMARY KEY,
    fk_personagem INT NOT NULL,

    CONSTRAINT fk_usuario_papa_favorito_usuario FOREIGN KEY (fk_usuario) REFERENCES usuario(id) ON DELETE CASCADE,

    CONSTRAINT fk_usuario_papa_favorito_personagem FOREIGN KEY (fk_personagem) REFERENCES personagem(id) ON DELETE CASCADE
) ;

-- KPI quantidade de registros
SELECT COUNT(data_registro) AS "Sermoes cadastrados" FROM usuario_papa_favorito;

-- KPI album favorito
SELECT
	nome_papa,
    COUNT(fk_papa) AS "Papa favorito"
FROM usuario_papa_favorito JOIN papa ON usuario_papa_favorito.fk_papa = papa.id
GROUP BY fk_papa
ORDER BY "Papa favorito" DESC
LIMIT 1;

-- KPI papa favorito
SELECT
	album.nome,
    COUNT(fk_album) AS "Album favorito"
FROM usuario_album JOIN album ON usuario_album.fk_album = album.id
GROUP BY fk_album
ORDER BY "Album favorito" DESC
LIMIT 1;

-- SELECT para grafico de papas


SELECT * FROM usuario;