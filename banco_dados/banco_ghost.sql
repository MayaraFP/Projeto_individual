USE sprint3;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nome_usuario VARCHAR(30) NOT NULL UNIQUE,
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
    id_spotify VARCHAR(100) UNIQUE,
    duracao INT,
    fkAlbum INT NOT NULL,

    CONSTRAINT chFkAlbum FOREIGN KEY (fkAlbum) REFERENCES album(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE personagem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(75) NOT NULL
);

CREATE TABLE usuario_musica (
    fkUsuario INT NOT NULL,
    fkMusica INT NOT NULL,
    favorita BOOLEAN DEFAULT FALSE,
    nota DECIMAL(3,1),
    data_registro DATETIME DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (fkUsuario, fkMusica),

    CONSTRAINT chFkUsuario FOREIGN KEY (fkUsuario) REFERENCES usuario(id) ON DELETE CASCADE,

    CONSTRAINT chFkMusica FOREIGN KEY (fkMusica) REFERENCES musica(id) ON DELETE CASCADE,

    CONSTRAINT chk_nota_musica
    CHECK (nota IS NULL OR nota BETWEEN 0 AND 10)
);

CREATE TABLE usuario_album (
    fkUsuario INT NOT NULL,
    fkAlbum INT NOT NULL,
    favorito BOOLEAN DEFAULT FALSE,
    nota DECIMAL(3,1),
    data_registro DATETIME DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (fkUsuario, fkAlbum),

    CONSTRAINT chFkUsuaioua FOREIGN KEY (fkUsuario) REFERENCES usuario(id) ON DELETE CASCADE,

    CONSTRAINT chFkAlbumua FOREIGN KEY (fkAlbum) REFERENCES album(id) ON DELETE CASCADE,

    CONSTRAINT chk_nota_album
    CHECK (nota IS NULL OR nota BETWEEN 0 AND 10)
);

CREATE TABLE usuario_papa_favorito (
    fkUsuario INT PRIMARY KEY,
    fkPersonagem INT NOT NULL,
    data_registro DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chFkUsuariopf FOREIGN KEY (fkUsuario) REFERENCES usuario(id) ON DELETE CASCADE,

    CONSTRAINT chFkPersonagempf FOREIGN KEY (fkPersonagem) REFERENCES personagem(id) ON DELETE CASCADE
) ;