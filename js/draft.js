$(document).ready(function () {
    $("header").load("template/header.html");
    var auth = window.sessionStorage.getItem("authorization");
    if (auth === null || auth === '') {
        $(location).attr('href', '../index.html');
    }

});
