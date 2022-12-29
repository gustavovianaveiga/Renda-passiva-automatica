function buscar() {
    const nome = document.querySelector('#nome');
    const ticket = document.querySelector('#ticket');
    const valor = document.querySelector('#valor');
    const ticketbusca = document.querySelector('#ticketbusca').value;
    const ultimodividendo = document.querySelector('#ultimodividendo');
    const data = document.querySelector('#data');
    const DY = document.querySelector('#DY');
    const numerodeativonecessario = document.querySelector('#numerodeativonecessario');
    const pvptext = document.querySelector('#pvptext');
    const valordeativonecessario = document.querySelector('#valordeativonecessario');
    const rendadesejada = document.querySelector('#rendadesejada').value;
    const vpatext = document.querySelector('#vpatext');
    const roetext = document.querySelector('#roetext');
    const pltext = document.querySelector('#pltext');
    const lpatext = document.querySelector('#lpatext');
    const escolherrandom = document.querySelector('#escolherrandom');
    const dividendosaaam = document.querySelector('#dividendosaaam');
    let acaoorfii = ""
    if (ticketbusca[4] == "1") { acaoorfii = "fiis" } else { acaoorfii = "acoes" }
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
    })
    let tipo = ""
    if (acaoorfii == 'fiis') { tipo = '' } else { tipo = '&tipo=Dividendo' }
    fetch('https://fintz.herokuapp.com/api/b3/proventos?ticker=' + ticketbusca + '&size=12&sort=dataCom,desc' + tipo).then(resposta => {
        return resposta.json()
    }).then(function(corpo) {
        nome.innerHTML = (corpo[0].nomeEmpresa).toLowerCase();
        let value = 0

        for (let i = 0; i < corpo.length; i++) {
            value = parseFloat(corpo[i].valor) + value
        }
        media = value / 12
        ultimodividendo.innerHTML = "R$" + (media).toFixed(2)


        data.innerHTML = corpo[0].dataPagamento
        fetch('https://fintz.herokuapp.com/api/b3/' + acaoorfii + '/' + ticketbusca + "/preco").then(resposta => {
            return resposta.json()
        }).then(function(corpo2) {
            ticket.innerHTML = corpo2.ticker
            valor.innerHTML = "R$" + corpo2.preco
            const ativosnecessariosresult = (rendadesejada / media).toFixed(0)
            numerodeativonecessario.innerHTML = "Nº de " + corpo[0].categoria + " necessária: " + ativosnecessariosresult
            valordeativonecessario.innerHTML = "Valor necessário: R$" + (ativosnecessariosresult * corpo2.preco).toFixed(0)
            if ((((media * 100) / corpo2.preco).toFixed(2)) === Infinity) { DY.innerHTML = "0%" } else {
                DY.innerHTML = ((media * 100) / corpo2.preco).toFixed(2) + "%"
            }
            fetch('https://fintz.herokuapp.com/api/b3/' + acaoorfii + '/' + ticketbusca + "/indicadores").then(resposta => {
                return resposta.json()
            }).then(function(corpo2) {
                if (acaoorfii == 'fiis') {} else { DY.innerHTML = (parseFloat(corpo2.dy) * 100).toFixed(2) + "%" }
                if (corpo2.pvp === undefined) {
                    pvptext.innerHTML = "FIIs";
                    pvptext.style.color = "#c1c1c1"
                } else { pvptext.innerHTML = "   " + corpo2.pvp }
                if (parseFloat(corpo2.pvp) >= 1) {
                    pvptext.style.color = "#007400";
                    vpatext.style.color = "#007400";

                }
                if (parseFloat(corpo2.pvp) < 1) {
                    pvptext.style.color = "#d9c800";
                    vpatext.style.color = "#d9c800";

                }
                if (parseFloat(pvptext.innerHTML) < 0.79) {
                    pvptext.style.color = "#bd0000";
                    vpatext.style.color = "#bd0000";

                }
                if ((corpo2.roe * 100).toFixed(2) >= 20) {
                    roetext.style.color = "#007400";

                }
                if ((corpo2.roe * 100).toFixed(2) < 20) {
                    roetext.style.color = "#bd0000";

                }


                if (corpo2.vpa === undefined) { vpatext.innerHTML = "FIIs" } else { vpatext.innerHTML = "   " + corpo2.vpa }
                if (corpo2.vpa === undefined) { roetext.innerHTML = "FIIs" } else { roetext.innerHTML = "   " + (corpo2.roe * 100).toFixed(2) + "%" }
                if (corpo2.vpa === undefined) { pltext.innerHTML = "FIIs" } else { pltext.innerHTML = "   " + corpo2.pl }
                if (corpo2.vpa === undefined) { lpatext.innerHTML = "FIIs" } else { lpatext.innerHTML = "   " + corpo2.lpa }
            })
        })
    })
}


function random() {
    const randomValue = Math.floor(Math.random() * 2000);
    let urlacoesoufiis
    if (escolherrandom.value == 'acoes') { urlacoesoufiis = 'https://fintz.herokuapp.com/api/b3/proventos?&size=5000&categoria=acao' }
    if (escolherrandom.value == 'fii') { urlacoesoufiis = 'http://fintz.herokuapp.com/api/b3/proventos?&size=5000&categoria=fii' }
    if (escolherrandom.value == '') { urlacoesoufiis = 'http://fintz.herokuapp.com/api/b3/proventos?&size=5000' }
    fetch(urlacoesoufiis).then(resposta => {
        return resposta.json()
    }).then(function(corpo2) {
        const ticketbusca = document.querySelector('#ticketbusca');
        const ativoaleatorio = corpo2[randomValue].ticker
        ticketbusca.value = ativoaleatorio

    })
    setTimeout(() => { buscar() }, 2111)

}
random()


function aoano() {
    if (dividendosaaam.innerHTML == 'Dividendos a.m') {

        fetch('https://fintz.herokuapp.com/api/b3/proventos?ticker=' + ticketbusca.value + '&size=12&sort=dataCom,desc&tipo=Dividendo').then(resposta => {
            return resposta.json()
        }).then(function(corpo) {
            let value = 0

            for (let i = 0; i < corpo.length; i++) {
                value = parseFloat(corpo[i].valor) + value
            }
            ultimodividendo.innerHTML = "R$" + (value).toFixed(2)
            dividendosaaam.innerHTML = 'Dividendos a.a'
        })
    } else {
        fetch('https://fintz.herokuapp.com/api/b3/proventos?ticker=' + ticketbusca.value + '&size=12&sort=dataCom,desc&tipo=Dividendo').then(resposta => {
            return resposta.json()
        }).then(function(corpo) {


            let value = 0
            let media

            for (let i = 0; i < corpo.length; i++) {
                value = parseFloat(corpo[i].valor) + value
            }
            media = value / 12
            ultimodividendo.innerHTML = "R$" + (media).toFixed(2)
            dividendosaaam.innerHTML = 'Dividendos a.m'
        })
    }
}