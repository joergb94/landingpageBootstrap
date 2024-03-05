<?php

namespace App\Repositories;

use App\Exceptions\GeneralException;
use App\Models\Inbox;
use App\Models\ItemWeb;
use App\Models\User;
use App\Models\Views;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

/**
 * Class UserRepository.
 */
class HomeRepository
{   
    protected $Inbox;
    protected $ItemWeb;
    protected $User;
    protected $Views;
    /**
     * UserRepository constructor.
     *
     * @param  Inbox  $model
     */
    public function __construct(Inbox $Inbox, ItemWeb $ItemWeb, User $User, Views $Views)
    {
        $this->Inbox = $Inbox;
        $this->ItemWeb = $ItemWeb;
        $this->User = $User;
        $this->Views = $Views;
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
    public function getSearchPaginated()
    {     
        $today = Carbon::now();

        $data ['inbox'] = $this->Inbox::whereDate('created_at', '=', $today->toDateString())->count();
        $data ['users'] = $this->User->count();
        $data['last_upadted'] = $this->ItemWeb->orderBy('updated_at', 'desc')->with('type_item_web:id,name,is_main')->take(3)->get();
        $data['views'] = $this->Views::find(1);

        return $data;
    }

    public function add_views(){

        $views = $this->Views::find(1);
        $views->quantity =  $views->quantity + 1;
        $views->save();

    }

}
