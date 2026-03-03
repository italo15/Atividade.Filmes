//variáveis correspondentes aos nossos elementos HTML:
const campoPesquisa = document.querySelector("#Pesquisa");
const btnBusca = document.querySelector("#lupaBusca")

const cardFilmes = document.querySelector("#cardFilmes")

const campoPoster = document.querySelector("#poster")
const campoTitulo = document.querySelector("#titulo")
const campoDiretor = document.querySelector("#diretor")
const campoAno = document.querySelector("#ano")
const campoDuracao = document.querySelector("#duracao")
const campoSinopse = document.querySelector("#sinopse")
const campoAtores = document.querySelector("#atores")
const campoGenero = document.querySelector("#genero")

//nossa função assíncrona que vai interagir com a API.
async function buscarFilme() {

    //colocamos toda a lógica dentro de um bloco try/catch, para caso a lógica dê errado
    //try signifca tentar no português, então ele tenta executar o código no bloco dele
    //caso dê errado ele executa o código no bloco catch, que signifca pegar.

    //podemos imaginar que o try é uma pessoa tentando se equilirar em um pé só
    //e o catch é outra pessoa que fica atrás dela para segurar ela no caso de queda.
    try {
        //pegamos o valor inserido pelo usuário na barra de pesquisa e colocamos numa variável.
        const filme = campoPesquisa.value

        //criamos uma variável que irá receber o resultado da busca na API
        //e usamos uma ${máscara} com a nossa variável contendo a busca do usuário.
        //a máscara está posicionada no lugar do link onde ficaria o título do filme.
        const resposta = await fetch(`https://www.omdbapi.com/?t=${filme}&apikey=ca15d384`);
        
        //checamos se a pesquisa na API teve um resultado válido.
        if (!resposta.ok) {
            //caso não tenha sido válido, exibimos um erro.
            throw new Error("não foi possível concluir a busca")
        }

        //checamos se o título dado pelo usuário não é vazio.
        if (filme.length === 0) {
            throw new Error("insira um título")
        }

        //recebemos os conteúdos retornados pela pesquisa na API em formato .json
        //caso não tenha resultados para pesquisa, um valor no .json chamado response será atribuido como False.
        const dadosFilme = await resposta.json();

        //checamos se o valor da variável response veio como falso (vulgo: não houveram resultados para pesquisa).
        if (dadosFilme.Response === "False") {
            throw new Error("sem resultados")
        }

        //imprimimos no console as informações obtidas, útil para saber se estamos conseguindo usar a API.
        console.log(dadosFilme);

        //acessamos o estilo do nosso card e alteramos o seu display para block (por padrão ele é nenhum)
        //isso efetivamente torna as informações visíveis para o usuário caso a pesquisa tenha sido válida.
        cardFilmes.style.display = 'Block';

        //acessamos os valores dos nossos campos e atribuimos os valores correspondentes
        //por meio das variáveis contidas no .json retornado pela nossa pesquisa
        campoPoster.src = dadosFilme.Poster
        campoTitulo.value = dadosFilme.Title
        campoDiretor.value = dadosFilme.Director
        campoAno.value = dadosFilme.Year
        campoDuracao.value = dadosFilme.Runtime
        campoSinopse.value = dadosFilme.Plot
        campoAtores.value = dadosFilme.Actors
        campoGenero.value = dadosFilme.Genre
    }
    catch (error) {
        console.error(error);
    }
}

//colocamos nossa barra de pesquisa em uma variável.
const inputBusca = document.getElementById("Pesquisa");

//usamos do EventListener para aguardar que o botão seja pressionado, o segundo parâmetro é a nossa função.
//ou seja, o botão espera a ação click e assim que ela é performada, ele executa nossa função de busca.
btnBusca.addEventListener("click", buscarFilme);

//aqui a gente diz pra nossa barra de pesquisa esperar que o evento de tecla pressionada aconteça.
inputBusca.addEventListener("keydown", function (event) {
    //caso ele aconteça, nós checamos se essa tecla é o enter.
    if (event.key === "Enter") {
        //preventDefault() impede que a função de buscar filme seja executada somente clicando na barra.
        event.preventDefault();
        buscarFilme();
    }
})

//lista de tarefas:
// Exibir o modal com detalhes ao clicar em um card
// Fechar o modal ao clicar no botão de fechar ou fora dele

//feitas:
// ✅ Renderizar os cards dinamicamente via manipulação do DOM
// ✅ Tratar erro da API: mensagem amigável quando não há resultados (Response: 'False')
// ✅ Validar campo vazio: impedir busca e exibir mensagem de alerta
// ✅ Ativar a busca ao pressionar Enter no campo de texto
// ✅ Organizar o código em funções com responsabilidades claras (ex: buscarFilmes(), // renderCards(), abrirModal()
// ✅ Usar fetch() com async/await para chamar a API de busca
// ✅ Usar fetch() com async/await para buscar os detalhes do filme (2ª chamada)

//                       __                     
//                       /\ \__                  
//    __     ___     ____\ \ ,_\   ___   __  __  
//  /'_ `\  / __`\  /',__\\ \ \/  / __`\/\ \/\ \ 
// /\ \L\ \/\ \L\ \/\__, `\\ \ \_/\ \L\ \ \ \_\ \ ??
// \ \____ \ \____/\/\____/ \ \__\ \____/\ \____/
//  \/___L\ \/___/  \/___/   \/__/\/___/  \/___/ 
//    /\____/                                    
//    \_/__/   - lucas torão
