<?php

namespace App\Repositories;

use App\Exceptions\GeneralException;
use App\Models\Inbox;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

/**
 * Class UserRepository.
 */
class InboxRepository
{   
    protected $model;
    /**
     * UserRepository constructor.
     *
     * @param  Inbox  $model
     */
    public function __construct(Inbox $model)
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
    public function getSearchPaginated($criterion,$search,$status): LengthAwarePaginator
    {              

                    $rg = (strlen($criterion) > 0 &&  strlen($search) > 0) 
                    ? $this->model->where('id','>',0)->where($criterion, 'like', '%'. $search . '%')
                    : $this->model->where('id','>',0);

                    switch ($status) {
                        case 1:
                            $rg;
                        break;
                        case 'D':
                            $rg->onlyTrashed();
                        break;
                } 

                    $Inboxs = $rg->orderBy('id', 'desc')->paginate(10);

            return $Inboxs;
    }

    public function findById(int $id):Inbox{
        return $this->model->withTrashed()->find($id);
    }

    /**
     * @param array $data
     *
     * @throws \Exception
     * @throws \Throwable
     * @return User
     */
    public function create(array $data): Inbox
    {
        return DB::transaction(function () use ($data) {
            $Inbox = $this->model::create([
                'name' => $data['name'],
                'phone' => $data['phone'],
                'email' => $data['email'],
                'desription' => $data['description'],
            ]);

            if ($Inbox) {
                    return $Inbox;
                
            }

            throw new GeneralException(__('There was an error created the User.'));
        });
    }



    public function deleteOrResotore($Inbox_id)
    {    
        $Bval = Inbox::withTrashed()->find($Inbox_id)->trashed();

            if($Bval){
                Inbox::withTrashed()->find($Inbox_id)->restore();
                $b=4;
            }else{
                $Inbox = Inbox::find($Inbox_id)->delete();
                $b=3;
            }

            if ($b) {
                return $b;
            }
    
            throw new GeneralException(__('Error deleteOrResotore of Inbox.'));
    }



}
