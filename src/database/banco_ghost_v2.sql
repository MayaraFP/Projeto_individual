CREATE DATABASE sprint3;
USE sprint3;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nome_usuario VARCHAR(100) NOT NULL,
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
    id INT AUTO_INCREMENT,
    fk_usuario INT NOT NULL,
    fk_musica INT NOT NULL,
    favorita BOOLEAN DEFAULT FALSE,
    data_registro DATETIME DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT fk_usuario_musica_usuario FOREIGN KEY (fk_usuario) REFERENCES usuario(id) ON DELETE CASCADE,

    CONSTRAINT fk_usuario_musica_musica FOREIGN KEY (fk_musica) REFERENCES musica(id) ON DELETE CASCADE
);

CREATE TABLE usuario_album (
    id INT AUTO_INCREMENT,
    fk_usuario INT NOT NULL,
    fk_album INT NOT NULL,

    PRIMARY KEY (id),

    CONSTRAINT fk_usuario_album_usuario FOREIGN KEY (fk_usuario) REFERENCES usuario(id) ON DELETE CASCADE,

    CONSTRAINT fk_usuario_album_album FOREIGN KEY (fk_album) REFERENCES album(id) ON DELETE CASCADE
);

CREATE TABLE usuario_papa_favorito (
    id INT AUTO_INCREMENT,
    fk_usuario INT NOT NULL,
    fk_personagem INT NOT NULL,

    CONSTRAINT fk_usuario_papa_favorito_usuario FOREIGN KEY (fk_usuario) REFERENCES usuario(id) ON DELETE CASCADE,

    CONSTRAINT fk_usuario_papa_favorito_personagem FOREIGN KEY (fk_personagem) REFERENCES personagem(id) ON DELETE CASCADE,

    PRIMARY KEY (id)
) ;

-- KPI quantidade de registros
SELECT COUNT(*) AS "Registros cadastrados"
FROM usuario_papa_favorito;

-- KPI papa favorito
SELECT
    p.nome AS papa,
    COUNT(*) AS quantidade
FROM usuario_papa_favorito upf
JOIN personagem p ON upf.fk_personagem = p.id
GROUP BY p.id, p.nome
ORDER BY quantidade DESC, p.nome ASC
LIMIT 1;

-- KPI album favorito
SELECT
    a.nome AS album,
    COUNT(*) AS quantidade
FROM usuario_album ua
JOIN album a ON ua.fk_album = a.id
GROUP BY a.id, a.nome
ORDER BY quantidade DESC, a.nome ASC
LIMIT 1;

-- Dados para o grafico de papas
SELECT
    p.nome AS papa,
    COUNT(*) AS quantidade
FROM usuario_papa_favorito upf
JOIN personagem p ON upf.fk_personagem = p.id
GROUP BY p.id, p.nome
ORDER BY quantidade DESC, p.nome ASC;

-- Dados para o grafico de musicas favoritas
SELECT
    m.titulo AS musica,
    COUNT(*) AS quantidade
FROM usuario_musica um
JOIN musica m ON um.fk_musica = m.id
WHERE um.favorita = TRUE
GROUP BY m.id, m.titulo
ORDER BY quantidade DESC, m.titulo ASC
LIMIT 10;

-- Top 3 albuns favoritos
SELECT
    a.nome AS album,
    COUNT(*) AS quantidade,
    a.imagem_url
FROM usuario_album ua
JOIN album a ON ua.fk_album = a.id
GROUP BY a.id, a.nome, a.imagem_url
ORDER BY quantidade DESC, a.nome ASC
LIMIT 3;

SELECT * FROM usuario;
