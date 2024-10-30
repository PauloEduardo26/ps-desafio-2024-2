<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MutantController;
use App\Http\Controllers\PowerController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return response()->json(Auth::user(), Response::HTTP_OK);
    });
});

Route::middleware(['auth:sanctum', 'can:admin'])->group(function () {
    Route::apiResource('/users', UserController::class);   
    Route::apiResource('/powers', PowerController::class)->except('index', 'show');
    Route::apiResource('/mutants', MutantController::class)->except('index', 'show');

    Route::apiResource('/categories', CategoryController::class)->except('index', 'show');
    Route::apiResource('/books', BookController::class)->except('index', 'show');
});
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);

Route::get('/books', [BookController::class, 'index']);
Route::get('/books/{id}', [BookController::class, 'show']);

Route::get('/powers', [PowerController::class, 'index']);
Route::get('/powers/{id}', [PowerController::class, 'show']);
Route::get('/mutants', [MutantController::class, 'index']);
Route::get('/mutants/{id}', [MutantController::class, 'show']);

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';
