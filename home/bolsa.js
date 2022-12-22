//function buscarcodigo() {
fetch('https://fintz.herokuapp.com/api/b3/proventos?ticker=PETR4&size=15&sort=dataPagamento,desc').then(resposta => {
    return resposta.json()
}).then(function(corpo) {

    let value = 0

    for (let i = 0; i < corpo.length; i++) {
        value = parseFloat(corpo[i].valor) + value
    }
    console.log("a PETR4 pagou R$" + value.toFixed(2) + " no ultimo ano");
    console.log("cerca de R$" + (value / 12).toFixed(2) + " por mês");


})
fetch('https://fintz.herokuapp.com/api/b3/proventos?size=2000&sort=valor,desc&tipo=Dividendo').then(resposta => {
    return resposta.json()
}).then(function(corpo2) {


    console.log(corpo2);

})
fetch('https://raw.githubusercontent.com/thefintz/docs/main/Endpoints-Fintz.postman_collection.json').then(resposta => {
    return resposta.json()
}).then(function(corpo2) {


    console.log(corpo2.item[0].item[1].request.url);

})
fetch('https://fintz.herokuapp.com/api/b3/ativos/cotacoes').then(resposta => {
        return resposta.json()
    }).then(function(corpo2) {


        console.log(corpo2);

    })
    //}