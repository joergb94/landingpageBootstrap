<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Repositories\ItemWebRepository;

class editionSiteController extends Controller
{
    private $menu_id;
    private $module_name;
    protected $ItemWebRepository;
    protected $text_module;
    
    /**
     * CompanyController constructor.
     *
     * @param ItemWebRepository $ItemWebRepository
     */
    public function __construct(ItemWebRepository $ItemWebRepository)
    {   
        $this->menu_id = 2;
        $this->ItemWebRepository = $ItemWebRepository;
        $this->module_name ='User';
        $this->text_module = ['Created','Updated','Update Password','Deleted','Restored','Actived','Deactived'];
    }


    public function index(Request $request){

     
        
            $search = trim($request->search);
            $criterion = trim($request->criterion);
            $status = ($request->status)? $request->status : 1;
            $data = $this->ItemWebRepository->getSearchPaginated($criterion, $search, $status);
  
            if ($request->ajax()) { 
                return view('edit-web.items.table',['data'=>$data,'dm'=>accesUrl(Auth::user(),$this->menu_id)]);
            }
                return view('edit-web.index',['data'=>$data,'dm'=>accesUrl(Auth::user(),$this->menu_id)]);
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
            $data = $this->ItemWebRepository->findById($id);
            return view('edit-web.detail',['data'=>$data]);
        }
    }



       /**
    * The function is called when the user clicks on the button "Add User" in the view "Users.index"
    * and it returns the view "Users.create" with the data of the table "Type_user" and "Location"
    * 
    * @param UserRequest request The request object.
    * @param location The location of the user
    */
    public function create(UserRequest $request)
    {   
        if ($request->ajax()) {
            $data = $this->ItemWebRepository->findDataToBlade();
            return view('edit-web.create',$data);
        }
    }

     /**
    * It creates a new user and returns a json response.
    * </code>
    * 
    * @param UserStoreRequest request The request object.
    * @param location the location of the user
    */
    public function store(UserStoreRequest $request){
        $data = $this->ItemWebRepository->create($request->input());

        return response()->json(Answer( $data['id'],
                                        $this->module_name,
                                        $this->text_module[0],
                                        "success",
                                        'green',
                                        '1'));
    }


      /**
    * It takes the id of the user and the location id and returns the view with the data of the user
    * and the locations.
    * </code>
    * 
    * @param Request request The request object.
    * @param location the location of the user
    * @param id The id of the user you want to edit
    * 
    * @return The view is being returned.
    */
    public function edit(Request $request,$id)
    {   
    
            $data = $this->ItemWebRepository->findDataToBlade($id);
            return view('edit-web.update',$data);
  
    }

       /**
    * It updates a user in the database
    * 
    * @param UserUpdateRequest request The request object.
    * @param location The location of the user
    * @param id The id of the user you want to update
    */
    public function update(Request $request){ 
      
       dd($request->all());
    }

 
    /**
     * It takes a request, a location, and an id, and returns a json response
     * 
     * @param UserIdRequest request The request object.
     * @param location The location of the resource.
     * @param id The id of the user you want to change the status of.
     */
    public function change_status(UserIdRequest $request,$location,$id)
    {
        return response()->json($this->ItemWebRepository->updateStatus($request->id));
    } 

   /**
    * It deletes or restores a user from the database
    * 
    * @param Request request The request object.
    * @param location the location of the module in the system
    * @param id the id of the record
    */
    public function deleteOrResotore(Request $request,$location,$id)
    {    
        $state = $this->ItemWebRepository->deleteOrResotore($id);
        return response()->json(Answer( $id,
                                        $this->module_name,
                                        $this->text_module[$state],
                                        "success",
                                        $state==4?'green':'red',
                                        $state==4?'1':'D'));
    }
}
