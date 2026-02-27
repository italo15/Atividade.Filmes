const campoTitulo = document.querySelector("#titulo");
const btnBusca = document.querySelector("#btnBusca")

async function buscarFilme () {
    
    try {
        const filme = campoTitulo.value

        const resposta = await fetch(`https://www.omdbapi.com/?t=${filme}&apikey=ca15d384`);
        if (!resposta.ok) {
            throw new Error ("não foi possível concluir a busca")
        }
        
        if (filme.length === 0) {
            throw new Error ("insira um título")
        }

        const dadosFilme = await resposta.json();
        if (dadosFilme.Response === "False") {
            throw new Error ("sem resultados")
        }

        console.log(dadosFilme);
    }
    catch(error) {
        console.error(error);
    }
}

const inputBusca = document.getElementById("titulo");

btnBusca.addEventListener("click", buscarFilme);

inputBusca.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        buscarFilme();
    }
})

//lista de tarefas:
// Renderizar os cards dinamicamente via manipulação do DOM
// Exibir o modal com detalhes ao clicar em um card
// Fechar o modal ao clicar no botão de fechar ou fora dele

//feitas:
// ✅ Tratar erro da API: mensagem amigável quando não há resultados (Response: 'False')
// ✅ Validar campo vazio: impedir busca e exibir mensagem de alerta
// ✅ Ativar a busca ao pressionar Enter no campo de texto
// ✅ Organizar o código em funções com responsabilidades claras (ex: buscarFilmes(), // renderCards(), abrirModal()
// ✅ Usar fetch() com async/await para chamar a API de busca
// ✅ Usar fetch() com async/await para buscar os detalhes do filme (2ª chamada)