<?php

use App\Models\MenuData;
use App\Models\UserTypeDetail;
use Illuminate\Support\Facades\Auth;

if (!function_exists('accesUrl')) {
 
   
    function accesUrl($user,$menu_id)
    {
   
        //validate access of user     
        $access=UserTypeDetail::where('user_type_id',$user->user_type_id)
                                ->where('menu_data_id',$menu_id)
                                ->where('active',1)
                                ->exists();
        if($access == true){
          //get all data for user menu
          $menuU = UserTypeDetail::where('user_type_id',  $user->user_type_id);

          $menuU->with(['menu_data' => function($query) {
              $query->orderby('prioridad');
            }]);

          $menu_data=$menuU->get();
          $user_type = $user->user_type_id;
        
        }else{
          
           $menu_data=[];
           $user_type =0;
        }
       

        $menu=[
          'data_menu'=>$menuU,
          'access'=>$access,
          'type_user'=>$user_type,
          'user'=>Auth::user(),
        ];  
   
      return $menu;
    }
}
