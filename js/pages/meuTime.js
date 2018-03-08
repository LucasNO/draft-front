function listMeuTime() {
    var auth = window.sessionStorage.getItem("authorization");
    $('#time td').remove();
    var nome = window.localStorage.getItem("nome");
    $.ajax({
        type: 'GET',
        //              url: "https://draft-webservice.herokuapp.com/draft/time",
        url: "http://localhost:8080/draft/time/" + nome,
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", auth);
        },
        success: function (data, textStatus, xhr) {
            $.each(data, function (i, item) {
                $("#time").append(
                    "<tr>" +
                    "<td>" + item.nome + "</td>" +
                    "<td>" + item.overall + "</td>" +
                    "<td>" + item.pos.descricao + "</td>" +
                    '<td><button type="button" name="dispensar" id="dispensar" class="btn btn-danger btn-xs" onclick="deletarPosicao(' + item.id + ')">Dispensar</button></td>'
                );
            })
        },
        error: function (xhr, status, error) {
            console.log("error: " + xhr.status);
        }
    }); //ajax
}


function dispensarPosicao(id) {
    var auth = window.sessionStorage.getItem("authorization");
    console.log(id);
    $.ajax({
        type: 'DELETE',
        //              url: 'https://draft-webservice.herokuapp.com/draft/posicao',
        url: 'http://localhost:8080/draft/dispensar-jogador/' + id,
        contentType: "application/json",
        dataType: "text",
        async: "false",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", auth);
        },
        success: function (data, textStatus, jQxhr) {
            console.log(textStatus);
            listMeuTime();
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    }); //ajax
}
