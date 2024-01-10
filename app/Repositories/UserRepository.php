<?php

namespace App\Repositories;

use App\Exceptions\GeneralException;
use App\Models\User;
use App\Models\TypeUser;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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
     * @param int    $paged
     * @param string $orderBy
     * @param string $sort
     *
     * @return mixed
     */
    public function getSearchPaginated($criterion, $search, $status)
    {
            
        $rg = (strlen($criterion) > 0 &&  strlen($search) > 0) 
                     ? $this->model->where($criterion, 'like', '%'. $search . '%')->whereNotIn('type_user_id',[1])
                     : $this->model->where('id','>',0)->whereNotIn('type_user_id',[1]);
                
                if($status != 'all'){

                        switch ($status) {
                            case 1:
                                $rg->active();
                            break;
                            case 2:
                                $rg->active(false);
                            break;
                            case 'D':
                                $rg->onlyTrashed();
                            break;
                            default:
                                $rg->active();
                        } 
                }
                
                $Users = $rg->orderBy('id', 'desc')->paginate(10);

        return [
                'pagination' => [
                    'total'        => $Users->total(),
                    'current_page' => $Users->currentPage(),
                    'per_page'     => $Users->perPage(),
                    'last_page'    => $Users->lastPage(),
                    'from'         => $Users->firstItem(),
                    'to'           => $Users->lastItem(),
                ],
                'Users' => $Users,
                'TypeUser'=>TypeUser::whereNotIn('id',[1])->get(),
            ];
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
                'type_user_id'=>$data['type'],
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
                'type_user_id'=>$data['type'],
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
