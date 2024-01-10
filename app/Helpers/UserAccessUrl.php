<?php

use App\Models\MenuData;
use App\Models\UserTypeDetail;

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
          'menu_data'=>$menu_data,
          'access'=>$access,
          'user_type'=>$user_type,
        ];  
   
      return $menu;
    }
}
