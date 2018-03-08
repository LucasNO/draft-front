function listTitulos() {
    var auth = window.sessionStorage.getItem("authorization");
    $.ajax({
        type: 'GET',
        //              url: "https://draft-webservice.herokuapp.com/draft/titulos",
        url: "http://localhost:8080/draft/titulos",
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", auth);
        },
        success: function (data, textStatus, xhr) {

            $.each(data, function (i, item) {
                $("#titulo").append(
                    "<tr>" +
                    "<td>" + item.usuario.nome + "</td>" +
                    "<td>" + item.primeiro + "</td>" +
                    "<td>" + item.segundo + "</td>" +
                    "<td>" + item.terceiro + "</td>" +
                    "<td>" + item.quarto + "</td>" +
                    "<td>" + item.quinto + "</td>" +
                    "</tr>")
            })
        },
        error: function (xhr, status, error) {
            console.log("error: " + xhr.status);
        }
    }); //ajax
}
