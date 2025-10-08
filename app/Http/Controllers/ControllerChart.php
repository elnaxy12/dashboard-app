<?php

namespace App\Http\Controllers;

class ControllerChart extends Controller
{
    public function index()
    {
        $data = [12, 19, 3, 5, 2];
        return view('dashboard', compact('data'));
    }

}
