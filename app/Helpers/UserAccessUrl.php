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
 
          //get all data for user menu
          $menuU = UserTypeDetail::where('user_type_id',  $user->user_type_id)->with(['menu_data'])->get();
            
          $user_type = $user->user_type_id;
        
 
       

        $menu=[
          'data_menu'=>isset($menuU)?$menuU:[],
          'access'=>$access,
          'type_user'=>isset($user_type)?$user_type:0,
          'user'=>Auth::user(),
        ];  
  
      return $menu;
    }
}
