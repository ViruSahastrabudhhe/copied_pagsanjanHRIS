<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('email', 'admin@gmail.com')->first();
        
        if ($user) {
            // Update existing user
            $user->update([
                'username' => 'System Administrator',
                'password' => Hash::make('asdf'),
            ]);
        } else {
            // Create new user
            User::create([
                'username' => 'System Administrator',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('asdf'),
            ]);
        }
    }
}