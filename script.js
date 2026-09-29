/* =====================================
   FORMULÁRIO DE INSCRIÇÃO
===================================== */

const formulario = document.getElementById("formInscricao");

const telefone = document.getElementById("telefone");

const mensagem = document.getElementById("mensagem");


/* =====================================
   MÁSCARA DO TELEFONE
===================================== */

telefone.addEventListener("input", function () {

    let valor = telefone.value.replace(/\D/g, "");

    if (valor.length > 11) {
        valor = valor.substring(0, 11);
    }

    if (valor.length <= 10) {

        valor = valor.replace(
            /^(\d{2})(\d{4})(\d{0,4})/,
            "($1) $2-$3"
        );

    } else {

        valor = valor.replace(
            /^(\d{2})(\d{5})(\d{0,4})/,
            "($1) $2-$3"
        );

    }

    telefone.value = valor;

});


/* =====================================
   FAZER INSCRIÇÃO
===================================== */

formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();


    const nome =
        document.getElementById("nome").value.trim();


    const telefoneDigitado =
        telefone.value.trim();


    const numerosTelefone =
        telefoneDigitado.replace(/\D/g, "");


    /* Validação do nome */

    if (nome.length < 3) {

        mensagem.textContent =
            "Digite seu nome completo.";

        mensagem.style.color = "#d93025";

        return;
    }


    /* Validação do telefone */

    if (
        numerosTelefone.length !== 10 &&
        numerosTelefone.length !== 11
    ) {

        mensagem.textContent =
            "Digite um número de telefone válido.";

        mensagem.style.color = "#d93025";

        return;
    }


    /* Buscar inscrições */

    let inscricoes =
        JSON.parse(
            localStorage.getItem("inscricoesCorrida")
        ) || [];


    /* Criar inscrição */

    const novaInscricao = {

        id: Date.now(),

        nome: nome,

        telefone: telefoneDigitado,

        categoria: "Geral",

        data:
            new Date().toLocaleDateString("pt-BR")

    };


    /* Adicionar */

    inscricoes.push(novaInscricao);


    /* Salvar */

    localStorage.setItem(
        "inscricoesCorrida",
        JSON.stringify(inscricoes)
    );


    /* Mensagem */

    mensagem.textContent =
        "✓ Inscrição realizada com sucesso!";

    mensagem.style.color = "#16803c";


    /* Limpar formulário */

    formulario.reset();

});


/* =====================================
   ABRIR ÁREA DO ORGANIZADOR
===================================== */

function abrirAdmin() {

    const admin =
        document.getElementById("admin");


    admin.style.display = "block";


    admin.scrollIntoView({
        behavior: "smooth"
    });

}


/* =====================================
   LOGIN DO ORGANIZADOR
===================================== */

/*
    ESTA SENHA É APENAS PARA TESTE.

    Não use esta senha no site oficial.

    Depois vamos colocar um sistema
    de autenticação de verdade.
*/

const USUARIO_ADMIN = "admin";

const SENHA_ADMIN = "corrida2026";


function entrarAdmin() {

    const usuario =
        document.getElementById("usuarioAdmin")
        .value.trim();


    const senha =
        document.getElementById("senhaAdmin")
        .value;


    const loginMensagem =
        document.getElementById("loginMensagem");


    if (
        usuario === USUARIO_ADMIN &&
        senha === SENHA_ADMIN
    ) {

        loginMensagem.textContent =
            "Login realizado com sucesso!";

        loginMensagem.style.color =
            "#16803c";


        document.getElementById("loginArea")
            .style.display = "none";


        document.getElementById("painelAdmin")
            .style.display = "block";


        mostrarInscricoes();

    } else {

        loginMensagem.textContent =
            "Usuário ou senha incorretos.";

        loginMensagem.style.color =
            "#d93025";

    }

}


/* =====================================
   MOSTRAR INSCRIÇÕES
===================================== */

function mostrarInscricoes() {

    const lista =
        document.getElementById("listaInscricoes");


    const total =
        document.getElementById("totalInscritos");


    let inscricoes =
        JSON.parse(
            localStorage.getItem("inscricoesCorrida")
        ) || [];


    total.textContent =
        "Total de inscritos: " + inscricoes.length;


    lista.innerHTML = "";


    if (inscricoes.length === 0) {

        lista.innerHTML = `
            <tr>
                <td colspan="4">
                    Ainda não existem inscrições.
                </td>
            </tr>
        `;

        return;
    }


    inscricoes.forEach(function (inscricao, indice) {

        const linha =
            document.createElement("tr");


        linha.innerHTML = `
            <td>${indice + 1}</td>
            <td>${escaparHTML(inscricao.nome)}</td>
            <td>${escaparHTML(inscricao.telefone)}</td>
            <td>${escaparHTML(inscricao.categoria)}</td>
        `;


        lista.appendChild(linha);

    });

}


/* =====================================
   SAIR DO PAINEL
===================================== */

function sairAdmin() {

    document.getElementById("painelAdmin")
        .style.display = "none";


    document.getElementById("loginArea")
        .style.display = "flex";


    document.getElementById("usuarioAdmin")
        .value = "";


    document.getElementById("senhaAdmin")
        .value = "";


    document.getElementById("loginMensagem")
        .textContent = "";

}


/* =====================================
   PROTEÇÃO DO TEXTO DA TABELA
===================================== */

function escaparHTML(texto) {

    return String(texto)

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");

}