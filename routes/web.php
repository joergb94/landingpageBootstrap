<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\WebSiteController;
use App\Http\Controllers\AdminSiteController;
use App\Http\Controllers\AdminSiteDetailController;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('website.index');
});

Route::get('/contact', function () {
    return view('website.contactPrincipal');
});

Route::get('/careers', function () {
    return view('website.careers');
});
Route::get('/careers/mx', function () {
    return view('website.careers.mx');
});
Route::get('/careers/bz', function () {
    return view('website.careers.bz');
});


Route::get('/site', [WebSiteController::class, 'index']);
Route::post('/send', [WebSiteController::class, 'send_mail']);


Route::prefix('dedicated')->group(function() {
        Auth::routes([
            "register" => false,
            "reset"=>false
        ]);
  




Route::group(['middleware'=>['auth']], function(){
    Route::get('/home', [AdminSiteController::class, 'index']);

    //user
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users/add', [UserController::class, 'store']);
    Route::post('/users/update', [UserController::class, 'update']);
    Route::post('/users/password', [UserController::class, 'change_password']);
    Route::post('/users/change_status',[UserController::class, 'change_status']);
    Route::post('/users/deleteOrResotore',[UserController::class, 'deleteOrResotore']);

    //items
    Route::get('/items', [AdminSiteController::class, 'index']);
    Route::get('/items/{section}', [AdminSiteController::class, 'indexData']);
    Route::post('/items/add', [AdminSiteController::class, 'store']);
    Route::post('/items/update', [AdminSiteController::class, 'update']);
    Route::post('/items/deleteOrResotore',[AdminSiteController::class, 'deleteOrResotore']);

     //itemDeatils
     Route::get('/itemDetails', [AdminSiteDetailController::class, 'index']);
     Route::get('/itemDetails/{section}', [AdminSiteDetailController::class, 'indexData']);
     Route::post('/itemDetails/add', [AdminSiteDetailController::class, 'store']);
     Route::post('/itemDetails/update', [AdminSiteDetailController::class, 'update']);
     Route::post('/itemDetails/deleteOrResotore',[AdminSiteDetailController::class, 'deleteOrResotore']);

});

});