<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\AdminUserSeeder;
use Database\Seeders\DeductionTypesSeeder;
use Database\Seeders\InitializeEmployeeLeaveBalancesSeeder;
use Database\Seeders\InitializeLeaveBalancesSeeder;
use Database\Seeders\LeaveAccrualRatesSeeder;
use Database\Seeders\LeaveTypesConfigSeeder;
use Database\Seeders\LoanTypesSeeder;
use Database\Seeders\UpdateDeductionTypesSeeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AdminUserSeeder::class,
            DeductionTypesSeeder::class,
            InitializeEmployeeLeaveBalancesSeeder::class,
            InitializeLeaveBalancesSeeder::class,
            LeaveTypesConfigSeeder::class,
            UpdateDeductionTypesSeeder::class,
        ]);
    }
}
