function buscarcodigo() {
    fetch('https://brapi.dev/api/quote/' + document.querySelector('#fieldbusca').value).then(resposta => {
        return resposta.json()
    }).then(function(corpo) {
        const results = corpo.results[0];
        const quantidadedesejada = document.querySelector('#quantidadedesejada').value;
        const precoDeTodasAcoes = results.regularMarketPrice * quantidadedesejada;
        return console.log(results.regularMarketPrice)
    })
}