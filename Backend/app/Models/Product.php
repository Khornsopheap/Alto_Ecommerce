<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Product extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'products';

    protected $fillable = [
        'name',
        'description',
        'category_id',
        'price',
        'original_price',
        'stock',
        'image',
        'rating',
        'reviews',
    ];
    protected function casts(): array
    {
        return [
            'price' => 'float',
            'original_price' => 'float',
            'stock' => 'integer',
            'rating' => 'float',
            'reviews' => 'integer',
        ];
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
