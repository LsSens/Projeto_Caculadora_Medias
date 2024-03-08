const form = document.getElementById('form')
const atividadeInput = document.querySelector('.nomeatividade')
const notaInput = document.querySelector('.nota')
const notaMediaEscrita = document.querySelector('.media-total')
const aprovadoMedia = document.querySelector('.aprovadomedia')
const mensagemSucessoOuErro = document.getElementById('mensagem')
const linhaAdd = document.querySelector('.adicionados')
atividadeInput.focus()

const diciplinas = [
    'matemática',
    'biografia',
    'inglês',
    'química',
    'espanhol',
    'biologia',
    'gramática',
    'português',
    'filosofia',
    'história',
    'educação física',
    'geografia',
    'português',
    'literatura',
    'física',
    'artes',
    'redação',
    'sociologia'
];

function removerEspacosEAcentos(str) {
    return str.toLowerCase().replace(/\s+/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

function removerLinha(elementoClicado) {
    var linha = elementoClicado.parentNode.parentNode
    linha.remove()
    calcularMedia()
}

function calcularMedia(){
    mensagemSucessoOuErro.innerHTML = ''
    const linha = linhaAdd.querySelectorAll('.notaadd')
    if (linha.length > 0) {
        let media = 0;
        for (let i = 0; i < linha.length; i++){
            media += parseFloat(linha[i].innerText)
            linhaAdd.getElementsByTagName('tr')[i].classList.remove('linhaclara')
            if (i % 2 !== 0) {
                linhaAdd.getElementsByTagName('tr')[i].classList.add('linhaclara')
            }
        }
        media /= linha.length;
    
        notaMediaEscrita.innerText = `${media.toFixed(1)}`
    
        if (media >= 7){
            aprovadoMedia.classList.remove('reprovado')
            aprovadoMedia.classList.add('aprovado')
            aprovadoMedia.innerHTML = `<td>Aprovado</td>`
        } else {
            aprovadoMedia.classList.remove('aprovado')
            aprovadoMedia.classList.add('reprovado')
            aprovadoMedia.innerHTML = `<td>Reprovado</td>`
        }
    } else {
        aprovadoMedia.classList.remove('aprovado')
        aprovadoMedia.classList.remove('reprovado')
        notaMediaEscrita.innerText = '-'
        aprovadoMedia.innerText = '-------'
    }
}

function error(m){
    atividadeInput.classList.add('error')
    mensagemSucessoOuErro.classList.add('error')
    atividadeInput.value = ''
    atividadeInput.focus()
    mensagemSucessoOuErro.innerText = m
}

form.addEventListener('keyup', function(e){
    if (e.key !== 'Enter') {
        atividadeInput.classList.remove('error')
        mensagemSucessoOuErro.classList.remove('error')
        mensagemSucessoOuErro.innerHTML = ''
    }
})

form.addEventListener('submit', function(e) {
    e.preventDefault()

    let diciplinaValida = false
    let atividadeAtual = ''
    const linha = linhaAdd.querySelectorAll('.materia')

    for (let h = 0; h < diciplinas.length; h++) {
        if (removerEspacosEAcentos(diciplinas[h]) === removerEspacosEAcentos(atividadeInput.value)) {
            diciplinaValida = true
            atividadeAtual = diciplinas[h]
        }
    }

    if (diciplinaValida) {
        for (let i = 0; i < linha.length; i++) {
            if (removerEspacosEAcentos(linha[i].textContent) === removerEspacosEAcentos(atividadeAtual)) {
                error('Essa atividade já foi inserida na tabela.')
                diciplinaValida = false
            }
        }
    } else {
        error('A atividade inserida não é valida.')
    }

    if (diciplinaValida) {
        linhaAdd.innerHTML += `<tr></tr>`
        resultado = ''
        linhaCorreta = linhaAdd.getElementsByTagName('tr')[linhaAdd.getElementsByTagName('tr').length -1]

        linhaCorreta.innerHTML += `<td class="materia">${atividadeAtual}</td>`
        linhaCorreta.innerHTML += `<td class="notaadd">${notaInput.value}</td>`
    
        if (notaInput.value >= 7) {
            resultado = `<td  id="aour" class="aprovado"> `
            resultado += `<img src="./img/aprovado.png" alt="Emoji festejando">`
            resultado += `Aprovado`
            resultado += `<img src="./img/x.png" id="remover-linha" onClick="removerLinha(this)">`
            resultado += `</td>`
            linhaCorreta.innerHTML += resultado
        } else {
            resultado = `<td  id="aour" class="reprovado"> `
            resultado += `<img src="./img/reprovado.png" alt="Emoji festejando">`
            resultado += `Reprovado`
            resultado += `<img src="./img/x.png" id="remover-linha" onClick="removerLinha(this)">`
            resultado += `</td>`
            linhaCorreta.innerHTML += resultado
        }
        
        calcularMedia()

        atividadeInput.value = ''
        notaInput.value = ''
        atividadeInput.focus()
    }
})
