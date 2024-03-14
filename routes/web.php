<?php

//use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

/*=== NikkenCMS ===*/
Route::get('login', 'NikkenCMS\NikkenCMSController@login')->name('login');
Route::get('authLogin', 'NikkenCMS\NikkenCMSController@authLogin');
Route::get('NikkenCMS/{view}', 'NikkenCMS\NikkenCMSController@getViwe');
Route::get('NikkenCMSpro/getActions', 'NikkenCMS\NikkenCMSController@getActions');
Route::get('NikkenCMS/encripytarPass/{pass}', 'NikkenCMS\NikkenCMSController@aes_sap_encrypt');
Route::match(['get','post'],'addMicroSitio', 'NikkenCMS\NikkenCMSController@addMicroSitio')->name('addMicroSitio');

/*

Calle - nuevo campo de texto abierto a 250 caracteres
Nombre de conjunto resindecial (Condominio, Edificio, etc.) - nuevo campo de texto abierto a 250 caracteres
NO. Casa/apartamento - reemplaza a referencia

codigo tel RD: +1 849-682-2000

*/