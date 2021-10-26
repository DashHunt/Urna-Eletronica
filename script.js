//Controles de interface
let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

//Controle de ambiente
let etapaAtual = 0;
let numero = '';
let votoBranco = true; 
let votos = []; 

//Função construtora
function comecarEtapa(){
    let etapa = etapas[etapaAtual];
    let numeroHTML = '';

    numero = ''; 
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++){
        if (i === 0){
            numeroHTML += '<div class="numero pisca"></div>';
        } else{
            numeroHTML += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;
}

//Atualiza a interface com info de candidatos
function atualizaInterface(){
    console.log('Atualizando interface');
    
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if(item.numero === numero){
            return true;
        }else{
            return false;
        }
    });

    if(candidato.length > 0){
        candidato = candidato[0];

        seuVotoPara.style.display = 'block';
        cargo.innerHTML = etapa.titulo;
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
        aviso.style.display = 'block';
    
        let fotosHTML = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHTML += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`
            }else{
                fotosHTML += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`
            }            
        }

        lateral.innerHTML = fotosHTML;
    }else{
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
    }

    console.log('Candidato', candidato);
}

//Verifica em qual numero você clicou
function clicou(n){
    let elNumero = document.querySelector('.numero.pisca');
    if (elNumero != null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`; 

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling != null){
            elNumero.nextElementSibling.classList.add('pisca');
        }else{
            atualizaInterface();
        }
        
    }
}

//Botão de corrige
function branco(){
    //Retira valor de tudo e mostra aviso na tela
    numero = ''; 
    votoBranco = true; 
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'
    lateral.innerHTML = '';
}

//Botão de corrige
function corrige(){
    //Recomeça etapa
    comecarEtapa();
}

//Botão de confirma
function confirma(){
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;
    
    //Verifica se valor de voto é branco
    if(votoBranco === true){ 
        votoConfirmado = true; 
        votos.push({
            //Adiciona valores para vetor
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        })
    //Verifica se valor de voto é igual a numeros totais
    }else if (numero.length === etapa.numeros){ 
        votoConfirmado = true; 
        votos.push({
            //Adiciona valores para vetor
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    }

    //Verifica se confirmou o voto
    if (votoConfirmado){
        etapaAtual++;

        if (etapas[etapaAtual] != undefined){
            comecarEtapa();
        }else{
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>'; 
            console.log(votos)
        }
    }
}

comecarEtapa()