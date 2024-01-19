<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\User\UserRequest;
use App\Http\Requests\User\UserIdRequest;
use App\Http\Requests\User\UserPassRequest;
use App\Http\Requests\User\UserUpdateRequest;
use App\Http\Requests\User\UserStoreRequest;
use App\Models\User;
use App\Repositories\UserRepository;
use Carbon\Carbon; 
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
      /**
     * CompanyController constructor.
     *
     * @param UserRepository $UserRepository
     */
    public function __construct(UserRepository $UserRepository)
    {
        $this->UserRepository = $UserRepository;
    }


    public function index(UserRequest $request){

        if (!$request->ajax()) return view('user.index',['dm'=>accesUrl(Auth::user(),1)]);
        
        $search = trim($request->search);
        $criterion = trim($request->criterion);
        $status = ($request->status)? $request->status : 1;
  
        return $this->UserRepository->getSearchPaginated($criterion, $search, $status);
    }
    public function store(UserStoreRequest $request){
        $this->UserRepository->create($request->input());
        return response()->json('ready');
    }

    public function update(UserUpdateRequest $request){

        $this->UserRepository->update($request['id'], $request->only(
            'name',
            'type',
            'email',
        ));
        return response()->json('ready');
    }

    public function change_password(UserPassRequest $request)
    {   
        $this->UserRepository->update_password($request['id'], $request->only(
          'password',
        ));
    }

    public function change_status(Request $request)
    {
        $this->UserRepository->updateStatus($request->id);
        return response()->json('exito');
    } 

    public function deleteOrResotore(Request $request)
    {    
        $data = $this->UserRepository->deleteOrResotore($request['id']);
        
        return response()->json('exito');
    }
}
