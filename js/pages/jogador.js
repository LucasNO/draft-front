var auth = window.sessionStorage.getItem("authorization");
$.ajax({
    type: 'GET',
    //              url: "https://draft-webservice.herokuapp.com/draft/posicoes",
    url: "http://localhost:8080/draft/posicoes",
    dataType: 'json',
    contentType: 'application/json',
    beforeSend: function (xhr) {
        xhr.setRequestHeader("authorization", auth);
    },
    success: function (data, textStatus, xhr) {
        var p = "";
        $.each(data, function (i, item) {
            p += '<option value=' + item.id + '>' + item.descricao + '</option>'
        })
        $('#posicoes').html(p);
    },
    error: function (xhr, status, error) {
        console.log("error: " + xhr.status);
    }
}); //ajax

var botaoAdicionar = document.querySelector("#salvar");
botaoAdicionar.addEventListener("click", function (event) {
    event.preventDefault();
    var id = document.getElementById('id').value;
    if (id === null || id === '') {
        saveJogador();
    } else {
        var id = document.getElementById('id').value;
        var nomeJogador = document.getElementById('nomeJogador').value;
        var overall = document.getElementById('overall').value;
        var idPosicao = document.getElementById('posicoes').value;
		var idTime = document.getElementById('idTime').value;
        editJogador(id, nomeJogador, overall, idPosicao, idTime);
    }
});

var botaoCancelar = document.querySelector("#cancelar");
botaoCancelar.addEventListener("click", function (event) {
    $('#jogadorForm').each(function () {
        this.reset();
    });
});

function listJogadores() {
    var auth = window.sessionStorage.getItem("authorization");
    $('#jogadores td').remove();
    $.ajax({
        type: 'GET',
        //              url: "https://draft-webservice.herokuapp.com/draft/jogadores",
        url: "http://localhost:8080/draft/jogadores",
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", auth);
        },
        success: function (data, textStatus, xhr) {
            $.each(data, function (i, item) {
                $("#jogadores").append(
                    "<tr>" +
                    "<td>" + item.nomeJogador + "</td>" +
                    "<td>" + item.overall + "</td>" +
                    "<td>" + item.posicao + "</td>" +
                    "<td>" + item.nomeTime + "</td>" +
                    '<td><button id="edit" class="btn btn-primary btn-xs" onclick="loadJogador(' + item.idPosicao + ', ' + item.idJogador + ',\'' + item.nomeJogador + '\'' + ',' + item.overall + ',\'' + item.nomeTime + '\'' + ', '+ item.idTime +')">Carregar</button></td>' +
                    //                    '<td><button type="button" name="delete" id="delete" class="btn btn-danger btn-xs" onclick="deletarPosicao(' + item.id + ')">Deletar</button></td>'+
                    "</tr>"
                );
            });
        },
        error: function (xhr, status, error) {
            console.log("error: " + xhr.status);
        }
    }); //ajax
}

function saveJogador() {
    var auth = window.sessionStorage.getItem("authorization");
    var nomeJogador = document.getElementById('nomeJogador').value;
    var overall = document.getElementById('overall').value;
    var idPosicao = document.getElementById('posicoes').value;
    var dado = {
        "nome": nomeJogador,
        "overall": overall,
        "pos": {
            "id": idPosicao
        }
    };
    var parametros = JSON.stringify(dado);
    console.log(parametros);
    $.ajax({
        type: 'POST',
        //              url: 'https://draft-webservice.herokuapp.com/draft/jogador',
        url: 'http://localhost:8080/draft/jogador',
        contentType: "application/json",
        data: parametros,
        dataType: "text",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", auth);
        },
        success: function (data, textStatus, jQxhr) {
            console.log(textStatus);
            listJogadores();
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        },
        async: false
    }); //ajax
    $('#jogadorForm input').val("");
}

function editJogador(idJogador, nomeJogador, overall, idPosicao, idTime) {
    var auth = window.sessionStorage.getItem("authorization");
	console.log(idTime);
    var dado = {
        "id": idJogador,
        "nome": nomeJogador,
        "overall": overall,
        "pos": {
            "id": idPosicao
        },
		"tim":{
			"id": idTime
		}
    };
    var parametros = JSON.stringify(dado);
    $.ajax({
        type: 'PUT',
        //              url: 'https://draft-webservice.herokuapp.com/draft/jogador',
        async: "false",
        url: 'http://localhost:8080/draft/jogador',
        contentType: "application/json",
        data: parametros,
        dataType: "text",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", auth);
        },
        success: function (data, textStatus, jQxhr) {
            console.log(textStatus);
            listJogadores();
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    }); //ajax
    $('#jogadorForm input').val("");
}

function loadJogador(posicao, idJogador, nomeJogador, overall, nomeTime) {
    $('#id').val(idJogador);
    $('#nomeJogador').val(nomeJogador);
    $('#overall').val(overall);
    $('#posicoes').val(posicao).change();
	$('#nomeTime').val(nomeTime);
	$('#idTime').val(idTime);
}
