const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const tarefas = document.querySelector('.tarefas')

function criaLi(){
    const li = document.createElement('li') // Função para fazer a tag li
    return li
}

inputTarefa.addEventListener('keypress', function(e){
    if(e.keyCode === 13){ //cada tecla pressionado há um keycode o do Enter é o 13
        if(!inputTarefa.value) return
        criaTarefa(inputTarefa.value)
    }
})

function limpaInput(){ //quando digita algo no input, termina ficando e para limpar, utiliza-se essa função
    inputTarefa.value = ''
    inputTarefa.focus() // é o que faz o cursor ficar piscando
}

function apagar(li){ // função para fazer o botão apagar
    li.innerText += ' '
    const botao = document.createElement('button')
    botao.innerText = 'Apagar' // Texto do botão após ser inserido
    botao.setAttribute('class', 'apagar') // cria uma classe para botao
    botao.setAttribute('title', 'Apagar esta tarefa') // cria um titulo para o botao
    li.appendChild(botao) // Coloca dentro do li o botão apagar
}

function criaTarefa(textoInput){ //Função para criar a trefa
    const li = criaLi() // Fazer uma tag li
    li.innerText = textoInput // Colocar dentro li, o valor inserido do input
    tarefas.appendChild(li) // Coloca o li dentro de tarefas
    limpaInput() // Limpar o input após criar uma tarefa
    apagar(li) // Cria botão apagar após criar uma tarefa
    salvar()  // Salvar a tarefa, para quando reiniciar a página ela permanecer
}

btnTarefa.addEventListener('click', function(){
    if(!inputTarefa.value) return; //retorna o valor inserido no input
    criaTarefa(inputTarefa.value)
})

document.addEventListener('click', function(e){ //irá apagar a tarefa feita
    const el = e.target;

    if (el.classList.contains('apagar')){
        el.parentElement.remove()
        salvar()
    }
})

function salvar(){
    const liTarefas = tarefas.querySelectorAll('li') // pega todos os li's que estiver em tarefas
    const listaDeTarefas= []

    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim()// Tira o apagar para ficar nada e apagar o espaço ao lado
        listaDeTarefas.push(tarefaTexto)
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas) // transforma em Json string para armazenar os dados inseridos
    localStorage.setItem('tarefas', tarefasJSON) // salva as strings do json no localstorage para depois ser retornada 
}

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas') // vai retorna as strings salvas do json ao reiniciar a página
    const listaDeTarefas = JSON.parse(tarefas) // transforma as strings em array novamente

    for (let tarefa of listaDeTarefas){
        criaTarefa(tarefa)
    }
}
adicionaTarefasSalvas()