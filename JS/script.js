const campoTitulo = document.querySelector("#Pesquisa");
const btnBusca = document.querySelector("#lupaBusca")

async function buscarFilme () {
    const filme = campoTitulo.value;
    const url = `https://www.omdbapi.com/?s=${filme}&apikey=ca15d384`

    const resposta = await fetch(url);

    const dadosFilme = await resposta.json();

    console.log(dadosFilme);
}

btnBusca.addEventListener("click", buscarFilme);
