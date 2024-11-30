async function buscaEndereco(cep){
    let mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try{
        let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        let converteCepJson = await consultaCEP.json();
        if (converteCepJson.erro){
            throw Error('CEP não existente');
        }

        let cidade = document.getElementById('cidade');
        let logradouro = document.getElementById('endereco');
        let estado = document.getElementById('estado');
        let bairro = document.getElementById('bairro');
        

        cidade.value = converteCepJson.localidade;
        logradouro.value = converteCepJson.logradouro;
        estado.value = converteCepJson.uf;
        bairro.value = converteCepJson.bairro;

        console.log(converteCepJson);
        return converteCepJson;
    } catch (erro) {
        mensagemErro.innerHTML = `<p>Cep inválido tente novamente!</p>`;
        console.log(erro)
    }
}

let cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value));