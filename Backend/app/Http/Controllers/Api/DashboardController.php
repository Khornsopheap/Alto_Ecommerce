<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats(Request $request)
    {
        $inStock = Product::where('stock', '>', 5)->count();
        $lowStock = Product::where('stock', '>', 0)->where('stock', '<=', 5)->count();
        $outOfStock = Product::where('stock', 0)->count();

        $recentOrders = Order::orderByDesc('created_at')->take(5)->get();

        $salesOverview = Order::orderBy('created_at')
            ->get()
            ->groupBy(fn ($order) => $order->created_at->format('M'))
            ->map(fn ($group, $month) => [
                'month' => $month,
                'value' => $group->sum('total'),
            ])
            ->values();

        return response()->json([
            'stats' => [
                'revenue' => Order::sum('total'),
                'orders' => Order::count(),
                'products' => Product::count(),
                'customers' => User::count(),
            ],
            'productOverview' => [
                'inStock' => $inStock,
                'lowStock' => $lowStock,
                'outOfStock' => $outOfStock,
                'totalCategories' => Category::count(),
            ],
            'salesOverview' => $salesOverview,
            'recentOrders' => $recentOrders,
        ]);
    }
}
