<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeUserSeeder extends Seeder
{
   
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types = [
                      ['name'=> 'Admin','active'=> 1,],
                      ['name'=> 'Manager','active'=> 1,],        ];

        foreach($types as $type){
                DB::table('user_types')->insert($type);
            }
           
            $tu_prof_detail= [
              // Admin
              ['user_type_id' => 1, 'menu_data_id' => 1, 'active' => 1],
              ['user_type_id' => 1, 'menu_data_id' => 2, 'active' => 1],
              ['user_type_id' => 1, 'menu_data_id' => 3, 'active' => 1],
              ['user_type_id' => 1, 'menu_data_id' => 4, 'active' => 1],
          
              // Gestor
              ['user_type_id' => 2, 'menu_data_id' => 1, 'active' => 1],
              ['user_type_id' => 2, 'menu_data_id' => 3, 'active' => 1],
              ['user_type_id' => 2, 'menu_data_id' => 4, 'active' => 1],
          ];
          
           DB::table('user_type_details')->insert($tu_prof_detail);
            
    }
}
