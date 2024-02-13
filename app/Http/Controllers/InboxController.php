<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\User\UserRequest;
use App\Http\Requests\User\UserIdRequest;
use App\Http\Requests\User\UserPassRequest;
use App\Http\Requests\User\UserUpdateRequest;
use App\Http\Requests\User\UserStoreRequest;
use App\Models\Inbox;
use App\Repositories\InboxRepository;
use Carbon\Carbon; 
use Illuminate\Support\Facades\Auth;

class InboxController extends Controller
{   
    public $module_name;
    public $text_module;
    protected $menu_id;
    protected $InboxRepository;
    
     /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(InboxRepository $InboxRepository)
    {
        $this->menu_id = 1;
        $this->module_name ='Inbox';
        $this->InboxRepository = $InboxRepository;
        $this->text_module = ['Created','Updated','Deleted','Restored'];
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {   
        $data = [];
        $search = trim($request->search);
        $criterion = trim($request->criterion);
        $status = ($request->status)? $request->status : 1;
        $data = $this->InboxRepository->getSearchPaginated($criterion,$search,$status);
    
        if ($request->ajax()) { 
            return view('inbox.items.table',['data'=>$data,'dm'=>accesUrl(Auth::user(),$this->menu_id)]);
        }
            return view('inbox.index',['data'=>$data,'dm'=>accesUrl(Auth::user(),$this->menu_id)]);
    }

     /**
    * It's a function that returns a view with a variable called data that contains the data of the
    * user with the id that was passed to the function
    * 
    * @param Request request The request object.
    * @param location the location of the view file
    * @param id The id of the user you want to retrieve.
    * 
    * @return The view is being returned.
    */
    public function detail(Request $request,$id)
    {   
        if ($request->ajax()) {
            $data = $this->InboxRepository->findById($id);
            return view('inbox.detail',['data'=>$data]);
        }
    }

    /**
    * It deletes or restores a inbox from the database
    * 
    * @param Request request The request object.
    * @param id the id of the record
    */
    public function deleteOrResotore(Request $request,$id)
    {    
        $state = $this->InboxRepository->deleteOrResotore($id);
        return response()->json(Answer( $id,
                                        $this->module_name,
                                        $this->text_module[$state],
                                        "success",
                                        $state==4?'green':'red',
                                        $state==4?'1':'D'));
    }
}
