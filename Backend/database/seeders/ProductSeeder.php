<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::truncate();

        Product::create([
            'name' => 'Wireless Headphones',
            'description' => 'Noise-cancelling over-ear headphones with deep bass.',
            'category' => 'Electronics',
            'price' => 129.99,
            'original_price' => 159.99,
            'stock' => 40,
            'rating' => 4.6,
            'reviews' => 120,
            'image' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        ]);

        Product::create([
            'name' => 'Smart Watch Series 5',
            'description' => 'Fitness tracker with heart rate monitor and GPS.',
            'category' => 'Electronics',
            'price' => 199.99,
            'original_price' => 249.99,
            'stock' => 25,
            'rating' => 4.8,
            'reviews' => 85,
            'image' => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
        ]);

        Product::create([
            'name' => 'Mechanical Gaming Keyboard',
            'description' => 'RGB backlit mechanical keyboard with tactile switches.',
            'category' => 'Electronics',
            'price' => 89.99,
            'original_price' => 109.99,
            'stock' => 60,
            'rating' => 4.5,
            'reviews' => 94,
            'image' => 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
        ]);

        Product::create([
            'name' => 'Minimalist Backpack',
            'description' => 'Durable water-resistant backpack for daily commuting.',
            'category' => 'Accessories',
            'price' => 49.99,
            'original_price' => 69.99,
            'stock' => 50,
            'rating' => 4.7,
            'reviews' => 210,
            'image' => 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
        ]);

        Product::create([
            'name' => 'Stainless Steel Water Bottle',
            'description' => 'Double-wall vacuum insulated water bottle keeping drinks cold for 24h.',
            'category' => 'Accessories',
            'price' => 24.99,
            'original_price' => 29.99,
            'stock' => 100,
            'rating' => 4.9,
            'reviews' => 312,
            'image' => 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80',
        ]);

        // Add more sample products as needed
    }
}
