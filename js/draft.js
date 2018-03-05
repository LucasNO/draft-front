$(document).ready(function () {
    $("#cabecalho").load("template/header.html");
    var auth = window.localStorage.getItem("authorization");
    if (auth === null || auth === '') {
        $(location).attr('href', '../index.html');
    }
});
