//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do Número Secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10!';
let listaDeNumerosSorteados = [];
let numeroMax = 10;
let tentativas = 1;

let numeroSecreto = gerarNumeroAleatorio();
console.log('número secreto =', numeroSecreto);

document.getElementById('chutar').removeAttribute('disabled')

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
} 

function exibirMsgInicial(){
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMax}!`);
}

exibirMsgInicial();


function verificarChute() {
    let chute = parseInt(document.querySelector('input').value);
    console.log('valor do chute é', chute);
    console.log('comparação entre chute e número secreto = ',chute == numeroSecreto);

    let maiorMenor = chute > numeroSecreto? 'menor' : 'maior';

    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let foiForam = tentativas > 1 ? 'Foram' : 'Foi';
        let mensagemTentativas = `Parabéns, você acertou o número secreto. ${foiForam} apenas ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chutar').setAttribute('disabled', true);

    }else if (chute > numeroMax){
        exibirTextoNaTela('p', `Marque apenas com números entre 1 e ${numeroMax}!`);

    }else if (chute != numeroSecreto){
        exibirTextoNaTela('p', `Tente um número ${maiorMenor}.`);

    }
    tentativas ++;
    limparCampo();
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroMax + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroMax/3){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio(numeroMax);
    console.log('número secreto é', numeroSecreto);
    limparCampo();
    tentativas = 1;
    exibirMsgInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chutar').removeAttribute('disabled');
}
