<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $menus = [
            ['name'=> 'Inicio','icon'=> 'fa fa-home','link'=>'/home','priority'=> '3','active'=> 1,],
            ['name'=> 'Usuarios','icon'=> 'fa fa-user','link'=>'/users','priority'=> '3','active'=> 1,],
            ['name'=> 'Edicion de sitio','icon'=> 'fa fa-gears','link'=>'/edit-web','priority'=> '3','active'=> 1,],
            ['name'=> 'Correos recibidos','icon'=> 'fa fa-inbox','link'=>'/inbox','priority'=> '3','active'=> 1,],
      ];
      
      foreach($menus as $menu){
            DB::table('menu_data')->insert($menu);
        }
    }
}
