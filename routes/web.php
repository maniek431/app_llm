<?php


use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use Laravel\Inertia\Renderer;
use Inertia\Inertia;
use App\Http\Controllers\ChatController;

Route::inertia('/', 'homepage', [
  Inertia::render('homepage'),
  ])
->name('home');



Route::middleware(['auth'])->group(function () {
           Route::inertia('dashboard', 'dashboard')->name('dashboard');

});


    Route::get('/', [ChatController::class, 'index'])->name('chat.index');
    Route::post('/', [ChatController::class, 'store'])->name('chat.store');


require __DIR__.'/settings.php';
