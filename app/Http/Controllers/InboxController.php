<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InboxController extends Controller
{
     /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->menu_id = 1;
        $this->module_name ='Home';
        $this->text_module = ['Created','Updated','Update Password','Deleted','Restored','Actived','Deactived'];
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {   
        $data = [];
        if ($request->ajax()) { 
            return view('edit_site.items.table',['data'=>$data,'dm'=>accesUrl(Auth::user(),$this->menu_id)]);
        }
            return view('edit_site.index',['data'=>$data,'dm'=>accesUrl(Auth::user(),$this->menu_id)]);
    }
}
