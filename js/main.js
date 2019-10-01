var listaAtual = 0;
//regex ip ^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$

$(document).ready(function () {
    $("#iniciar").click(function () {
        listaAtual = $("#lista").val().split('\n');
        $(this).attr("disabled", true);
        $("#lista").attr("disabled", true);
        status('Removendo <i class="fa fa-spinner fa-spin" aria-hidden="true"></i', 'danger');
        remover_linhas_vazias();
    });
});

const status = function (text, type) {
    if (!type) {
        type = "primary";
    }
    $("#status").removeClass().addClass("label label-" + type).html(text);
}

const unique = function(array) {
    return array.filter(function (el, index, arr) {
        return index == arr.indexOf(el);
    });
}

const contar_total = function (lista) {
    'use strict';
    var array = lista.value.split("\n");
    var total = array.length;

    if (array.length === undefined) {
        total = 0;
    }
    $("#tudo_conta").text(total);
}

const remover_linhas_vazias = function () {
    //var array = $("#lista").val().split(";")
    var array = $("#lista").val().split('\n');
    array = unique(array);

    for (i = 0; i < array.length; i++) {
        array[i] = array[i].trim();
        array[i] = array[i].replace('   ', '');
        if (array[i].length === 0) {
            array.splice(i, 1);
        }
    }

    setTimeout(function () {
        $("#lista").val(array.join("\n"));
        let lista = $("#lista").val().split('\n');
        $("#testado").text(parseInt(listaAtual.length) - parseInt(lista.length));
        //contar_total(document.getElementById("lista"));
        status('Finalizado <i class="fa fa-check" aria-hidden="true"></i>', 'success');
        $("#lista").attr("disabled", false);
        $("#iniciar").attr("disabled", false);
    }, 500);
}