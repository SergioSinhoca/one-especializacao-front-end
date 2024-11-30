const listaTeclas = document.querySelectorAll('.tecla');

function tocaSom(seletorAudio){
   const elemento = document.querySelector(seletorAudio);

   if (elemento != null && elemento.localName === 'audio'){
        elemento.play();
   }else{
    console.log("Elemento inexistente ou não encontrado.");
   }
}

for (let contador = 0; contador < listaTeclas.length; contador++){

    const tecla = listaTeclas[contador];
    const instrumento = tecla.classList[1];
    const idAudio = `#som_${instrumento}`;

    // click mouse
    tecla.onclick = function (){
        tocaSom(idAudio);
    }


    // click teclado
    tecla.onkeydown = function (evento) {
        if (evento.code === "Enter" || evento.code === "Space"){
            tecla.classList.add('ativa');
        }
    }

    // quando soltar tecla
    tecla.onkeyup = function (){
        tecla.classList.remove('ativa');
    }
}



