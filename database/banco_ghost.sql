USE banco_ghost;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nome_usuario VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE album (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    id_spotify VARCHAR(100) UNIQUE,
    imagem_url VARCHAR(500),
    descricao TEXT
);

CREATE TABLE musica (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    autor CHAR(5) NOT NULL,
    id_spotify VARCHAR(100) UNIQUE,
    duracao INT,
    fk_album INT NOT NULL,

    CONSTRAINT fk_musica_album FOREIGN KEY (fk_album) REFERENCES album(id) ON DELETE CASCADE ON UPDATE CASCADE
    CONSTRAINT autor CHECK autor == "GHOST"
);

CREATE TABLE personagem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(75) NOT NULL
);

CREATE TABLE usuario_musica (
    fk_usuario INT NOT NULL,
    fk_musica INT NOT NULL,
    favorita BOOLEAN DEFAULT FALSE,
    nota DECIMAL(3,1),
    data_registro DATETIME DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (fk_usuario, fk_musica),

    CONSTRAINT fk_usuario_musica_usuario FOREIGN KEY (fk_usuario) REFERENCES usuario(id) ON DELETE CASCADE,

    CONSTRAINT fk_usuario_musica_musica FOREIGN KEY (fk_musica) REFERENCES musica(id) ON DELETE CASCADE,

    CONSTRAINT chk_nota_musica
    CHECK (nota IS NULL OR nota BETWEEN 0 AND 10)
);

CREATE TABLE usuario_album (
    fk_usuario INT NOT NULL,
    fk_album INT NOT NULL,
    favorito BOOLEAN DEFAULT FALSE,
    nota DECIMAL(3,1),
    data_registro DATETIME DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (fk_usuario, fk_album),

    CONSTRAINT fk_usuario_album_usuario FOREIGN KEY (fk_usuario) REFERENCES usuario(id) ON DELETE CASCADE,

    CONSTRAINT fk_usuario_album_album FOREIGN KEY (fk_album) REFERENCES album(id) ON DELETE CASCADE,

    CONSTRAINT chk_nota_album
    CHECK (nota IS NULL OR nota BETWEEN 0 AND 10)
);

CREATE TABLE usuario_papa_favorito (
    fk_usuario INT PRIMARY KEY,
    fk_personagem INT NOT NULL,
    data_registro DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_usuario_papa_favorito_usuario FOREIGN KEY (fk_usuario) REFERENCES usuario(id) ON DELETE CASCADE,

    CONSTRAINT fk_usuario_papa_favorito_personagem FOREIGN KEY (fk_personagem) REFERENCES personagem(id) ON DELETE CASCADE
) ;
