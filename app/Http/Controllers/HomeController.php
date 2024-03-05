<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\HomeRepository;
use Illuminate\Support\Facades\Auth;


class HomeController extends Controller
{
    protected  $menu_id;
    protected $module_name;
    protected $HomeRepository;
    public $text_module;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(HomeRepository $HomeRepository)
    {
        $this->middleware('auth');
        $this->HomeRepository = $HomeRepository;
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
        $this->HomeRepository->add_views();
        $data =  $this->HomeRepository->getSearchPaginated();
        if ($request->ajax()) { 
            return view('home.items.table',['data'=>$data,'dm'=>accesUrl(Auth::user(),$this->menu_id)]);
        }
            return view('home.index',['data'=>$data,'dm'=>accesUrl(Auth::user(),$this->menu_id)]);
    }
}
