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
        console.log(corpo);

    })
    //}