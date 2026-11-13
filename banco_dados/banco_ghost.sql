USE sprint3;
CREATE TABLE usuario(
	id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(65),
    nome VARCHAR(45),
    senha VARCHAR(45)
);
CREATE TABLE musica(
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(70),
    album VARCHAR(45),
    id_spotify VARCHAR(100),
    fkUsuarioM INT,
    CONSTRAINT chFkUsuarioM FOREIGN KEY (fkUsuarioM) REFERENCES usuario(id)
);
CREATE TABLE personagens(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    fkUsuarioP INT,
    CONSTRAINT chFkUsuarioP FOREIGN KEY (fkUsuarioP) REFERENCES usuario(id)
);