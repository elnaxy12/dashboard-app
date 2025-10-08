<?php

namespace App\Http\Controllers;

abstract class Controller
{
    public function index()
    {
        $data = [12, 19, 3, 5, 2];
        return view('dashboard', compact('data'));
    }

}
