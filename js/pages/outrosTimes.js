function listoutrosTimes() {
    var auth = window.sessionStorage.getItem("authorization");
    //$('#time td').remove();
    var nome = window.localStorage.getItem("nome");
    $.ajax({
        type: 'GET',
        //              url: "https://draft-webservice.herokuapp.com/draft/time",
        url: "http://localhost:8080/draft/times-adversarios/" + nome,
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", auth);
        },
        success: function (data, textStatus, xhr) {
            var tabela = "";
            console.log(tabela);
            $.each(data, function (i, item) {
                tabela += '<h2>' + item.nomeTime + '</h2>' +
                '<table id="time" class="table" cellspacing="0" width="100%">' +
                '<thead class="thead-dark">' +
                '<tr>' +
                '<th data-field="descricao">Nome</th>' +
                '<th data-field="descricao">Overall</th>' +
                '<th data-field="descricao">Posição</th>' +
                '</tr>' +
                '</thead>' +
                '<thbody>';
                $.each(item.jogadores, function (k, jogador) {
                    tabela += "<tr>" +
                        "<td>" + jogador.nomeJogador + "</td>" +
                        "<td>" + jogador.posicao + "</td>" +
                        "<td>" + jogador.overall + "</td>" +
                        "</tr>";
                });
                tabela += '</thbody>' +
                    '</table>';

                $("#times").html(tabela);
            });
        },
        error: function (xhr, status, error) {
            //            console.log("error: " + xhr.status);
            console.log(error);
        }
    }); //ajax
}
