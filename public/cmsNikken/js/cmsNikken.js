// Funciones generales
$("#passwordInput").hide();

$(document).ready(function() {
    $('.dropify').dropify();
    $('#allCountries').prop('checked', true);
    $('#allRanges').prop('checked', true);
    $("#unlimitedNDate").prop('checked', true);
    $("#forAllNSite").prop('checked', true);
    catchCheckboxDates();
    catchCheckboxForAllUsers();
    $("#inputEmail").focus();
    $("#inputEmail").val('');
    $("#userInfoMK").hide();
    $("#nNombreMNK, #btnnNombreMNK").hide();
});
var userType = {
    'CI': 'Influencer',
    'CLUB': 'Miembro'
}
var countries = { 
    1: 'COL', 
    2: 'MEX', 
    3: 'PER', 
    4: 'ECU', 
    5: 'PAN', 
    6: 'GTM', 
    7: 'SLV', 
    8: 'CRI', 
    10: 'CHL'
};

function showLoadingIcon(element){
    element.addClass('lds-hourglass');
}

function hideLoadingIcon(element){
    element.removeClass('lds-hourglass');
}

function validateNumber(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46 || event.keyCode === 13) {
        var funcion = event;
        return console.log(funcion);
    } 
    else if (key < 48 || key > 57) {
        return false;
    }
    else {
        return true;
    }
}

function alert(tittle, html, type){
    swal({
        title: tittle,
        text: html,
        type: type,
        padding: '2em'
    });
}

function disabled(control){
    control.attr('disabled', true);
}

function enabled(control){
    control.attr('disabled', false);
}

function required(msg){
    var error = {
        'title': 'Error',
        'style': 'flat',
        'message': msg,
        'icon': 'danger-3',
    };
    
    var n4 = new notifi(error);
    n4.show();
    timeout();
}


// Login
function login(){
    var user = $("#inputEmail").val().trim();
    var pass = $("#inputPassword").val().trim();
    var token = $("#_token").val();
    if(user === '' && pass === ''){
        required('Todos los campos requeridos');
    }
    else{
        var data = { 
            user: user,
            pass: pass,
            token: token
        }
        $.ajax({
            type: "get",
            url: "authLogin",
            data: data,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            beforeSend: function(){
                disabled($("#goBack"));
                disabled($("#inputPassword"));
                disabled($("#loginBtn"));
                $("#validating").addClass('lds-hourglass');
            },
            success: function (response) {
                if(response === '1'){
                    $(location).attr('href', 'NikkenCMS/home');
                }
                else{
                    $("#validating").removeClass('lds-hourglass');
                    required('Valida tus credenciales');
                    enabled($("#goBack"));
                    enabled($("#inputPassword"));
                    enabled($("#loginBtn"));
                }
            },
            error: function(){
                $("#validating").removeClass('lds-hourglass');
                required('Error al validar datos');
                enabled($("#goBack"));
                enabled($("#inputPassword"));
                enabled($("#loginBtn"));
            }
        });
    }
}

function hidePasswordInput(){
    $("#userInput").show(500);
    $("#passwordInput").hide(500);
    $("#inputPassword").val('');
    $("#userName").text('');
}

function showPasswordInput(){
    if($("#inputEmail").val().trim() === ''){
        required('Todos los campos requeridos');
    }
    else{
        $("#userInput").hide(500);
        $("#inputPassword").focus();
        $("#passwordInput").show(500);
    }
}

$('#inputEmail').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        if($("#inputEmail").val().trim() === ''){
            required('Todos los campos requeridos');
        }
        else{
            showPasswordInput();
            $("#inputPassword").focus();
            $("#userName").text($("#inputEmail").val());
        }
    }
});

$('#inputPassword').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        if($("#inputPassword").val().trim() === ''){
            required('Todos los campos requeridos');
        }
        else{
            login();
        }
    }
});

var timeHide = "";
function timeout(){
    timeHide = setTimeout(function(){
        $("#notify-holster").empty();
        clearTimeout(timeHide);
    }, 8000);
}

/*=== home ===*/
function number_format(number, decimals, dec_point, thousands_point) {
    if (number == null || !isFinite(number)) {
        throw new TypeError("number is not valid");
    }
    if (!decimals) {
        var len = number.toString().split('.').length;
        decimals = len > 1 ? len : 0;
    }
    if (!dec_point) {
        dec_point = '.';
    }
    if (!thousands_point) {
        thousands_point = ',';
    }
    number = parseFloat(number).toFixed(decimals);
    number = number.replace(".", dec_point);
    var splitNum = number.split(dec_point);
    splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_point);
    number = splitNum.join(dec_point);
    return number;
}

function top5Activos(plataforma){
    $("#platformName").text(plataforma);
    $.ajax({
        type: "get",
        url: "/NikkenCMSpro/getActions",
        data: {
            action: 'top5Activos',
            parameters: {
                plataforma: plataforma
            }
        },
        beforeSend: function(){
            $("div[id=loadingIcon]").addClass('lds-hourglass');
            $("#contentTop5Activos").empty();
            $("#graphVisitas").empty();
        },
        success: function (response) {
            if(response === 'error'){
                $("#loadingIcon").removeClass('lds-hourglass');
                var html = '<div class="alert text-white bg-danger" role="alert">' +
                                '<div class="iq-alert-text"><a href="login">Inicar sesi??n</a></div>' +
                            '</div>';
                $("#contentTop5Activos").html(html);
                $("#loadingIcon").removeClass('lds-hourglass');
            }
            else{
                $("#loadingIcon").removeClass('lds-hourglass');
                var html = "";
                for(let x = 0; x < response.length; x++){
                    html += '<li class="d-flex mb-1 align-items-center p-1 sell-list border-success rounded">' +
                                '<div class="user-img img-fluid">' +
                                    '<img src="../cmsNikken/images/user/02.jpg" alt="story-img" class="img-fluid rounded-circle avatar-40">' +
                                '</div>' +
                                '<div class="media-support-info ml-1">' +
                                    '<h6>C??digo: ' + response[x]['Associateid'] + '</h6>' +
                                '</div>' +
                                '<div class="iq-card-header-toolbar d-flex align-items-center">' +
                                    '<div class="badge badge-pill badge-success">Acciones: ' + number_format(response[x]['Acciones'], 0) + '</div>' +
                                '</div>' +
                            '</li>';
                }
                $("#contentTop5Activos").html(html);
                graphVisitas(plataforma);
            }
        },
        error: function(){
            $("#loadingIcon").removeClass('lds-hourglass');
            var html = '<div class="alert text-white bg-danger" role="alert">' +
                            '<div class="iq-alert-text">No se pudieron cargar datos</div>' +
                            '<button type="button" class="close" onclick="top5Activos(\'' + $("#actvitieSite").val() + '\');">' +
                                'Reintentar' +
                            '</button>' +
                        '</div>';
            $("#contentTop5Activos").html(html);
        }
    });
}
if ( $("#contentTop5Activos").length > 0 ) {
    top5Activos($("#actvitieSite").val());
}

function graphVisitas(plataforma){
    $("#graphVisitas").empty();
    $.ajax({
        type: "get",
        url: "/NikkenCMSpro/getActions",
        data: {
            action: 'graphVisitas',
            parameters: {
                plataforma: plataforma
            }
        },
        beforeSend: function(){
            options = {
                chart: {
                    height: 350,
                    type: "bar"
                },
                plotOptions: {
                    bar: {
                        horizontal: !1,
                        columnWidth: "90%",
                        endingShape: "rounded"
                    }
                },
                dataLabels: {
                    enabled: !1
                },
                stroke: {
                    show: !0,
                    width: 2,
                    colors: ["transparent"]
                },
                colors: ["#827af3", "#27b345", "#b47af3"],
                series: [
                    {
                        name: "",
                        data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
                    },
                ],
                xaxis: {
                    categories: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
                },
                yaxis: {
                    title: {
                        text: "N??mero de Visitas"
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function(e) {
                            return "Usuarios activos: " + number_format(e, 0)
                        }
                    }
                }
            };
            (chart = new ApexCharts(document.querySelector("#graphVisitas"), options)).render();
            chart.destroy();
            chart.destroy();
            $("div[id=loadingIconGraph]").text('Actualizando datos...');
        },
        success: function (response) {
            $("div[id=loadingIconGraph]").text('');
            chart.destroy();
            if(response === 'error'){
                var html = '<div class="alert text-white bg-danger" role="alert">' +
                                '<div class="iq-alert-text"><a href="login">Inicar sesi??n</a></div>' +
                            '</div>';
                $("#graphVisitas").html(html);
            }
            else{
                options = {
                    chart: {
                        height: 350,
                        //type: "area"
                        type: "bar"
                    },
                    plotOptions: {
                        bar: {
                            horizontal: !1,
                            columnWidth: "90%",
                            endingShape: "rounded"
                        }
                    },
                    dataLabels: {
                        enabled: !1
                    },
                    stroke: {
                        show: !0,
                        width: 2,
                        colors: ["transparent"]
                    },
                    colors: ["#827af3", "#27b345", "#b47af3"],
                    series: [
                        {
                            name: "",
                            data: [response[1][0]['total'], response[2][0]['total'], response[3][0]['total'], response[4][0]['total'], response[5][0]['total'], response[6][0]['total'], response[7][0]['total'], response[8][0]['total'], response[9][0]['total'], response[10][0]['total'], response[11][0]['total'], response[12][0]['total']]
                        },
                    ],
                    xaxis: {
                        categories: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
                    },
                    yaxis: {
                        title: {
                            text: "N??mero de Visitas"
                        }
                    },
                    fill: {
                        opacity: 1
                    },
                    tooltip: {
                        y: {
                            formatter: function(e) {
                                return "Usuarios activos: " + number_format(e, 0)
                            }
                        }
                    }
                };
                (chart = new ApexCharts(document.querySelector("#graphVisitas"), options)).render();
            }
        },
        error: function(){
            $("div[id=loadingIconGraph]").text('');
            var html = '<div class="alert text-white bg-danger" role="alert">' +
                            '<div class="iq-alert-text">No se pudieron cargar datos</div>' +
                            '<button type="button" class="close" onclick="graphVisitas(\'' + $("#actvitieSite").val() + '\');">' +
                                'Reintentar' +
                            '</button>' +
                        '</div>';
            $("#graphVisitas").html(html);
        }
    });
}

$('#nSite').on('submit', function(e) {
    // evito que propague el submit
    e.preventDefault();
    //deshabilitamos el boton para que solo se haga una peticion de registro
    disabled($("#btnsave"));

    // agrego la data del form a formData
    var formData = new FormData(this);
    //formData.append('_token', $('input[name=_token]').val());
    var utltarget = $("#urlAction").val();
    $.ajax({
        type:'POST',
        url: utltarget,
        data: formData,
        cache:false,
        contentType: false,
        processData: false,
        beforeSend: function(){
            $("div[id=loadingIcon]").addClass('lds-hourglass');
            disabled($("#nameNSite"));
            disabled($("#URLNSite"));
            disabled($("#customSwitch2"));
            disabled($("#dateStartNSite"));
            disabled($("#dateEndNSite"));
            disabled($("#unlimitedNDate"));
            disabled($("#tagNSite"));
            disabled($("#iconNsite"));
            disabled($("#allCountries"));
            disabled($("#chckCol"));
            disabled($("#chckMex"));
            disabled($("#chckPer"));
            disabled($("#chckCri"));
            disabled($("#chckEcu"));
            disabled($("#chckSlv"));
            disabled($("#chckGtm"));
            disabled($("#chckPan"));
            disabled($("#chckChl"));
        },
        success:function(data){
            if(data == 'added'){
                alert('OK!', "El micrositio se agreg?? correctamente", 'success');
                $('#nSite').trigger('reset');
                $(".dropify-clear").trigger("click");
            }
            else{
                alert('Ups...!', "No fue posible guardar la informaci??n.", 'error');
            }
            enabled($("#btnsave"));
            $("#loadingIcon").removeClass('lds-hourglass');
            enabled($("#nameNSite"));
            enabled($("#URLNSite"));
            enabled($("#customSwitch2"));
            enabled($("#dateStartNSite"));
            enabled($("#dateEndNSite"));
            enabled($("#unlimitedNDate"));
            enabled($("#tagNSite"));
            enabled($("#iconNsite"));
            enabled($("#allCountries"));
            enabled($("#chckCol"));
            enabled($("#chckMex"));
            enabled($("#chckPer"));
            enabled($("#chckCri"));
            enabled($("#chckEcu"));
            enabled($("#chckSlv"));
            enabled($("#chckGtm"));
            enabled($("#chckPan"));
            enabled($("#chckChl"));
        },
        error: function(jqXHR, text, error){
            $("#loadingIcon").removeClass('lds-hourglass');
            alert('Ups...!', "No fue posible guardar la informaci??n.", 'error');
            enabled($("#nameNSite"));
            enabled($("#URLNSite"));
            enabled($("#customSwitch2"));
            enabled($("#dateStartNSite"));
            enabled($("#dateEndNSite"));
            enabled($("#unlimitedNDate"));
            enabled($("#tagNSite"));
            enabled($("#iconNsite"));
            enabled($("#allCountries"));
            enabled($("#chckCol"));
            enabled($("#chckMex"));
            enabled($("#chckPer"));
            enabled($("#chckCri"));
            enabled($("#chckEcu"));
            enabled($("#chckSlv"));
            enabled($("#chckGtm"));
            enabled($("#chckPan"));
            enabled($("#chckChl"));
            enabled($("#btnsave"));
        }
    });
});

function setDate(){
    Date.prototype.toDateInputValue = (function() {
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0,10);
    });
    
    $('#dateStartNSite').val(new Date().toDateInputValue());
}
setDate();

$("#allCountries").change(function () {
    $("#chckCol, #chckMex, #chckPer, #chckCri, #chckEcu, #chckSlv, #chckGtm, #chckPan, #chckChl").prop('checked', $(this).prop("checked"));
});

$("#allRanges").change(function () {
    $("#chckDIR, #chckEXE, #chckPLA, #chckORO, #chckPLO, #chckDIA, #chckDRL").prop('checked', $(this).prop("checked"));
});

function catchCheckboxDates(){
    var status = $("#unlimitedNDate").prop('checked');
    if(status){
        disabled($("#dateStartNSite"));
        disabled($("#dateEndNSite"));
        $("#dateStartNSite, #dateEndNSite").removeAttr('required');
    }
    else{
        enabled($("#dateStartNSite"));
        enabled($("#dateEndNSite"));
        $("#dateStartNSite, #dateEndNSite").attr('required', 'required');
    }
}

function catchCheckboxForAllUsers(){
    var status = $("#forAllNSite").prop('checked');
    if(status){
        $("#allowedUsersNsite").attr('readonly', 'readonly');
        $("#allowedUsersNsite").val('todos');
    }
    else{
        $("#allowedUsersNsite").removeAttr('readonly');
        $("#allowedUsersNsite").val('');
    }
}