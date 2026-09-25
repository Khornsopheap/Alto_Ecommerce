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
        Category::truncate();

        Category::create(['name' => 'Electronics']);
        Category::create(['name' => 'Apparel']);
        Category::create(['name' => 'Accessories']);
        Category::create(['name' => 'Home']);    
    }
}
