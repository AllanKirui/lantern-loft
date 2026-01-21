<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::insert([
            [
                'name' => 'Table Lamps',
                'slug' => 'table-lamps',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Floor Lamps',
                'slug' => 'floor-lamps',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
