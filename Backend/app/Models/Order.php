<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Order extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'orders';

    protected $fillable = [
        'user_id', 'items', 'subtotal', 'shipping', 'total', 'status', 'shipping_address','payment_method', 'payment_status'
    ];

    protected function casts(): array
    {
        return [
            'items' => 'array',
            'subtotal' => 'float',
            'shipping' => 'float',
            'total' => 'float',
        ];
    }
}
