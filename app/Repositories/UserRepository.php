<?php

namespace App\Repositories;

use App\Exceptions\GeneralException;
use App\Models\User;
use App\Models\UserType;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

/**
 * Class UserRepository.
 */
class UserRepository
{
    /**
     * UserRepository constructor.
     *
     * @param  User  $model
     */
    public function __construct(User $model)
    {
        $this->model = $model;
    }


     /**
     * It takes a search term, a criterion, a status, a profile and a location and returns a paginated
     * list of users
     * 
     * @param criterion the column name to search
     * @param search the search term
     * @param status 1 =&gt; active, D =&gt; deleted
     * @param profile is the type of user, for example, if it is a student, a teacher, etc.
     * @param location is the location of the user
     * 
     * @return LengthAwarePaginator A LengthAwarePaginator
     */
    public function getSearchPaginated($criterion,$search,$status, $profile): LengthAwarePaginator
    {              

                    $rg = (strlen($criterion) > 0 &&  strlen($search) > 0) 
                    ? $this->model->where('id','>',1)->where('id','!=',Auth::user()->id)->where($criterion, 'like', '%'. $search . '%')
                    : $this->model->where('id','>',1)->where('id','!=',Auth::user()->id);

            
                    if($profile !='all'){
                        $rg->where('user_type_id',$profile);
                    }

                    switch ($status) {
                        case 1:
                            $rg;
                        break;
                        case 'D':
                            $rg->onlyTrashed();
                        break;
                } 

                    $Users = $rg->orderBy('id', 'desc')->paginate(10);

            return $Users;
    }

    public function findById(int $id):User{
        return $this->model->withTrashed()->find($id);
    }

    public function findDataToBlade(int $id = null){
        $data = []; 
        $data['type'] =  Auth::user()->type_user_id == 1?UserType::all():UserType::where('id','>',1)->get();
        if($id > 0){
            $data['data']= $this->findById($id);
        }

        return $data;
    }
  
    /**
     * @param array $data
     *
     * @throws \Exception
     * @throws \Throwable
     * @return User
     */
    public function create(array $data): User
    {
        return DB::transaction(function () use ($data) {
            $User = $this->model::create([
                'use_type_id'=>$data['type'],
                'name' => $data['name'],
                'email' => $data['email'],
                'password' =>Hash::make($data['password']),
            ]);

            if ($User) {
                    return $User;
                
            }

            throw new GeneralException(__('There was an error created the User.'));
        });
    }

    /**
     * @param User  $User
     * @param array $data
     *
     * @throws GeneralException
     * @throws \Exception
     * @throws \Throwable
     * @return User
     */
    public function update($User_id, array $data): User
    {
        
        $User = $this->model->find($User_id);
        
        return DB::transaction(function () use ($User, $data) {
            if ($User->update([
                'use_type_id'=>$data['type'],
                'name' => $data['name'],
                'email' => $data['email'],
            ])) {

                return $User;
            }

            throw new GeneralException(__('There was an error updating the User.'));
        });
    }

     /**
     * @param User  $User
     * @param array $data
     *
     * @throws GeneralException
     * @throws \Exception
     * @throws \Throwable
     * @return User
     */
    public function update_password($User_id, array $data): User
    {
        
        $User = $this->model->find($User_id);
        
        return DB::transaction(function () use ($User, $data) {
            if ($User->update([
                'password' =>Hash::make($data['password']),
            ])) {

                return $User;
            }

            throw new GeneralException(__('There was an error updating the User.'));
        });
    }

    
    /*
     * @param User $User
     * @param      $status
     *
     * @throws GeneralException
     * @return User
     */
     
    public function updateStatus($User_id): User
    {
        $User = $this->model->find($User_id);

        switch ($User->active) {
            case 0:
                $User->active = 1;
            break;
            case 1:
                $User->active = 0;  
            break;
        }

        if ($User->save()) {
            return $User;
        }

        throw new GeneralException(__('Error changing status of User.'));
    }

    public function deleteOrResotore($User_id)
    {    
        $Bval = User::withTrashed()->find($User_id)->trashed();

            if($Bval){
                User::withTrashed()->find($User_id)->restore();
                $b=4;
            }else{
                $User = User::find($User_id)->delete();
                $b=3;
            }

            if ($b) {
                return $b;
            }
    
            throw new GeneralException(__('Error deleteOrResotore of User.'));
    }



}
