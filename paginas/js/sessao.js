function aguardar() {
    var elemento = document.getElementById("div_aguardar");
    if (elemento) {
        elemento.style.display = "flex";
    }
}

function finalizarAguardar() {
    var elemento = document.getElementById("div_aguardar");
    if (elemento) {
        elemento.style.display = "none";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location.href = "/login.html";
}
