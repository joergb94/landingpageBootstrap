<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\WebSiteController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\editionSiteController;
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

Route::get('/', [WebSiteController::class, 'index']);

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



Route::post('/send', [WebSiteController::class, 'send_mail']);


Route::prefix('adminFlex')->group(function() {
        Auth::routes([
            "register" => false,
            "reset"=>false
        ]);
  




Route::group(['middleware'=>['auth']], function(){
    Route::get('/home', [HomeController::class, 'index']);

    //user
    
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/create', [UserController::class, 'create']);
    Route::post('/users/create', [UserController::class, 'store']);
    Route::get('/users/{id}', [UserController::class, 'detail']);
    Route::get('/users/{id}/edit', [UserController::class, 'edit']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::get('/users/{id}/editpass', [UserController::class, 'editPassword']);
    Route::put('/users/{id}/pass', [UserController::class, 'updatePassword']);
    Route::delete('/users/{id}', [UserController::class, 'deleteOrResotore']);


    Route::get('/edit-web', [editionSiteController::class, 'index']);
    Route::get('/edit-web/create', [editionSiteController::class, 'create']);
    Route::post('/edit-web/create', [editionSiteController::class, 'store']);
    Route::get('/edit-web/{id}', [editionSiteController::class, 'detail']);
    Route::get('/edit-web/{id}/edit', [editionSiteController::class, 'edit']);
    Route::put('/edit-web/{id}/edit', [editionSiteController::class, 'update']);
    Route::get('/edit-web/{id}/editpass', [editionSiteController::class, 'editPassword']);
    Route::put('/edit-web/{id}/pass', [editionSiteController::class, 'updatePassword']);
    Route::delete('/edit-web/{id}', [editionSiteController::class, 'deleteOrResotore']);


});

});