function contratarFreeAgent(id) {
    var auth = window.sessionStorage.getItem("authorization");
    var nome = window.localStorage.getItem("nome");
    $.ajax({
        type: 'POST',
        //              url: 'https://draft-webservice.herokuapp.com/draft/posicao',
        url: 'http://localhost:8080/draft/contratar-jogador/' + id + '/' + nome,
        contentType: "application/json",
        dataType: "text",
        async: "false",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", auth);
        },
        success: function (data, textStatus, jQxhr) {
            console.log(textStatus);
            listFreeAgents();
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    }); //ajax
}

function listFreeAgents() {
    var auth = window.sessionStorage.getItem("authorization");
    $('#freeAgents td').remove();
    $.ajax({
        type: 'GET',
        //                url: "https://draft-webservice.herokuapp.com/draft/free-agents",
        url: "http://localhost:8080/draft/free-agents",
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", auth);
        },
        success: function (data, textStatus, xhr) {
            $.each(data, function (i, item) {
                $("#freeAgents").append(
                    "<tr>" +
                    "<td>" + item.nome + "</td>" +
                    "<td>" + item.pos.descricao + "</td>" +
                    "<td>" + item.overall + "</td>" +
                    '<td><button type="button" name="contratar" id="contratar" class="btn btn-primary btn-xs" onclick="contratarFreeAgent(' + item.id + ')">Contratar</button></td>' +
                    "</tr>")
            })
        },
        error: function (xhr, status, error) {
            console.log("error: " + xhr.status);
        }
    }); //ajax
}
