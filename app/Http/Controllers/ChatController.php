<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use LangChainLaravel\Facades\LangChain;

class ChatController extends Controller
{
    public function index()
    {
        return Inertia::render('homepage', [
        'history' => session('chat_history', []),
    ]);
    }

public function store(Request $request)
{
    $request->validate([
        'message' => 'required|string',
    ]);

    $result = LangChain::openai($request->input('message'), [

    ]);

    if ($result['success']) {
        $response = $result['text'];
    } else {
        $response = 'Błąd: ' . $result['error'];
    }
    $history = session('chat_history', []);


    $history[] = ['role' => 'user', 'text' => $request->input('message')];
    $history[] = ['role' => 'ai', 'text' => $response];

    session(['chat_history' => $history]);

    return Inertia::render('homepage', [
        'response' => $response,
        'userMessage' => $request->input('message'),
        'history' => $history,
        
    ]);
}
}
