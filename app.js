var ambienteProcesso = "desenvolvimento";
var caminhoEnv = ambienteProcesso === "producao" ? ".env" : ".env.dev";

require("dotenv").config({ path: caminhoEnv });

var express = require("express");
var cors = require("cors");
var path = require("path");
var usuarioRouter = require("./src/routes/usuarios");
var dashboardRouter = require("./src/routes/dashboard");
var preferenciasRouter = require("./src/routes/preferencias");

var app = express();
var portaApp = process.env.APP_PORT || 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, "paginas")));
app.use(express.static(path.join(__dirname, "style")));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/usuarios", usuarioRouter);
app.use("/dashboard", dashboardRouter);
app.use("/preferencias", preferenciasRouter);

app.listen(portaApp, function () {
    console.log(`Servidor rodando na porta ${portaApp}`);
});
