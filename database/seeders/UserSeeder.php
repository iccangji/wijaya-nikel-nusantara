<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'username' => 'admin',
            'password' => bcrypt('user9342'),
            'role' => 'admin',
        ]);

        User::create([
            'username' => 'operasional',
            'password' => bcrypt('user8724'),
            'role' => 'operasional',
        ]);

        User::create([
            'username' => 'pengajuan',
            'password' => bcrypt('user9121'),
            'role' => 'pengajuan',
        ]);
    }
}
