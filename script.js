// URL do Google Apps // URL do Google Apps Script
const URL_PLANILHA = "https://script.google.com/macros/s/AKfycbyWYkU5xaTqjkRVS_hidm88gWaGRcaSygwSSH7MaaF-itwVUrVVwPXU4eKIHrFyVvGVGw/exec";

// Formulário de inscrição
const formulario = document.getElementById("formInscricao");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();

    if (nome === "" || telefone === "") {
        alert("Preencha todos os campos.");
        return;
    }

    const dados = new URLSearchParams();

    dados.append("nome", nome);
    dados.append("telefone", telefone);

    fetch(URL_PLANILHA, {
        method: "POST",
        mode: "no-cors",
        body: dados
    })
    .then(function () {
        alert("Inscrição realizada com sucesso!");

        formulario.reset();
    })
    .catch(function (erro) {
        console.error(erro);
        alert("Não foi possível realizar a inscrição.");
    });
});";

// Formulário de inscrição
const formulario = document.getElementById("formInscricao");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();

    if (nome === "" || telefone === "") {
        alert("Preencha todos os campos.");
        return;
    }

    const dados = new URLSearchParams();

    dados.append("nome", nome);
    dados.append("telefone", telefone);

    fetch(URL_PLANILHA, {
        method: "POST",
        mode: "no-cors",
        body: dados
    })
    .then(function () {
        alert("Inscrição realizada com sucesso!");

        formulario.reset();
    })
    .catch(function (erro) {
        console.error(erro);
        alert("Não foi possível realizar a inscrição.");
    });
});
