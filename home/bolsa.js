function buscar() {
    const nome = document.querySelector('#nome');
    const ticket = document.querySelector('#ticket');
    const valor = document.querySelector('#valor');
    const ticketbusca = document.querySelector('#ticketbusca').value;
    const ultimodividendo = document.querySelector('#ultimodividendo');
    const data = document.querySelector('#data');
    const DY = document.querySelector('#DY');
    const numerodeativonecessario = document.querySelector('#numerodeativonecessario');
    const rendadesejada = document.querySelector('#rendadesejada').value;


    fetch('https://fintz.herokuapp.com/api/b3/proventos?ticker=' +
        ticketbusca + '&size=15&sort=dataPagamento,desc').then(resposta => {
        return resposta.json()
    }).then(function(corpo) {

        let value = 0

        for (let i = 0; i < corpo.length; i++) {
            value = parseFloat(corpo[i].valor) + value
        }
        console.log("a " + ticketbusca + " pagou R$" + value.toFixed(2) + " no ultimo ano");
        console.log("cerca de R$" + (value / 12).toFixed(2) + " por mês");

        // altaração da tabela info




    })
    fetch('https://fintz.herokuapp.com/api/b3/proventos?ticker=' + ticketbusca + '&size=12&sort=dataCom,desc&tipo=Dividendo').then(resposta => {
        return resposta.json()
    }).then(function(corpo) {

        nome.innerHTML = (corpo[0].nomeEmpresa).toLowerCase();
        let value = 0

        for (let i = 0; i < corpo.length; i++) {
            value = parseFloat(corpo[i].valor) + value
        }
        media = value / corpo.length
        ultimodividendo.innerHTML = "R$" + (media).toFixed(2)
        data.innerHTML = corpo[0].dataPagamento

        fetch('https://fintz.herokuapp.com/api/b3/acoes/' + ticketbusca + "/preco").then(resposta => {
            return resposta.json()
        }).then(function(corpo2) {

            ticket.innerHTML = corpo2.ticker
            valor.innerHTML = "R$" + corpo2.preco


            const ativosnecessariosresult = (rendadesejada / media).toFixed(0)
            numerodeativonecessario.innerHTML = "Nº de " + corpo[0].categoria + "necessárias: " + ativosnecessariosresult
        })




        console.log(corpo);
        console.log(media);
    })


    fetch('https://fintz.herokuapp.com/api/b3/acoes/' + ticketbusca + "/indicadores").then(resposta => {
        return resposta.json()
    }).then(function(corpo2) {

        DY.innerHTML = parseFloat(corpo2.dy).toFixed(2) + "%"

        console.log(corpo2);


    })
}