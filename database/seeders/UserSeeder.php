<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $adminUser = [
            ['user_type_id' =>1,
            'name'=> 'admin',
            'last_name'=> 'Flex Betta',
            'phone'=>'999999999999',
            'email'=>'adminFLEX@flexbetta.com',
            'password'=> bcrypt('adminFLEX2020'),],

            ['user_type_id' =>2,
            'name'=> 'manager',
            'last_name'=> 'Flex Betta',
            'phone'=>'999999999999',
            'email'=>'managerFLEX@flexbetta.com',
            'password'=> bcrypt('managerFLEX2020'),],

        ];
      
      foreach($adminUser as $admin)
      {
            DB::table('users')->insert($admin);
        }

    }
}
