var botaoAdicionar = document.querySelector("#salvar");
botaoAdicionar.addEventListener("click", function (event) {
    event.preventDefault();
    var id = document.getElementById('id').value;
    console.log(id);
    if (id === null || id === '') {
        savePosicao();
    } else {
        var posicao = document.getElementById('posicao').value;
        editPosicao(id, posicao);
    }
});

var botaoCancelar = document.querySelector("#cancelar");
botaoCancelar.addEventListener("click", function (event) {
    $('#posicaoForm').each(function () {
        this.reset();
    });
});


function listPosicoes() {
    var auth = window.sessionStorage.getItem("authorization");
    $('#posicoes td').remove();
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
            $.each(data, function (i, item) {
                $("#posicoes").append(
                    "<tr>" +
                    "<td>" + item.descricao + "</td>" +
                    '<td><button type="button" name="edit" id="edit" class="btn btn-primary btn-xs" onclick="loadPosicao(' + item.id + ',\'' + item.descricao + '\')">Carregar</button></td>' +
                    '<td><button type="button" name="delete" id="delete" class="btn btn-danger btn-xs" onclick="deletarPosicao(' + item.id + ')">Deletar</button></td>'
                );
            })
        },
        error: function (xhr, status, error) {
            console.log("error: " + xhr.status);
        }
    }); //ajax
}

function savePosicao() {
    var auth = window.sessionStorage.getItem("authorization");
    var posicao = document.getElementById('posicao').value;
    var dado = {
        descricao: posicao
    };
    var parametros = JSON.stringify(dado);
    $.ajax({
        type: 'POST',
        //              url: 'https://draft-webservice.herokuapp.com/draft/posicao',
        url: 'http://localhost:8080/draft/posicao',
        contentType: "application/json",
        data: parametros,
        dataType: "text",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", auth);
        },
        success: function (data, textStatus, jQxhr) {
            console.log(textStatus);
            listPosicoes();
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        },
        async: false
    }); //ajax
    $('#posicaoForm input').val("");
}

function deletarPosicao(id) {
    var auth = window.sessionStorage.getItem("authorization");
    console.log(id);
    $.ajax({
        type: 'DELETE',
        //              url: 'https://draft-webservice.herokuapp.com/draft/posicao',
        url: 'http://localhost:8080/draft/posicao/' + id,
        contentType: "application/json",
        dataType: "text",
        async: "false",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", auth);
        },
        success: function (data, textStatus, jQxhr) {
            console.log(textStatus);
            listPosicoes();
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    }); //ajax
    $('#posicaoForm input').val("");
}


function editPosicao(id, posicao) {
    var auth = window.sessionStorage.getItem("authorization");
    var dado = {
        id: id,
        descricao: posicao
    };
    var parametros = JSON.stringify(dado);
    $.ajax({
        type: 'PUT',
        //              url: 'https://draft-webservice.herokuapp.com/draft/posicao',
        async: "false",
        url: 'http://localhost:8080/draft/posicao',
        contentType: "application/json",
        data: parametros,
        dataType: "text",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", auth);
        },
        success: function (data, textStatus, jQxhr) {
            console.log(textStatus);
            listPosicoes();
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    }); //ajax
    $('#posicaoForm input').val("");
}

function loadPosicao(id, posicao) {
    $('#id').val(id);
    $('#posicao').val(posicao);
}
