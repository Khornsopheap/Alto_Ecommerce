<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::where('user_id', (string) $request->user()->id)
            ->orderByDesc('created_at')
            ->get();

        return response()->json($orders);
    }

    public function show(Request $request, $id)
    {
        $order = Order::where('user_id', (string) $request->user()->id)->findOrFail($id);

        return response()->json($order);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|string',
            'items.*.qty' => 'required|integer|min:1',
            'shipping_address' => 'required|array',
            'shipping_address.full_name' => 'required|string',
            'shipping_address.email' => 'required|email',
            'shipping_address.phone' => 'required|string',
            'shipping_address.address' => 'required|string',
            'shipping_address.city' => 'required|string',
            'shipping_address.country' => 'required|string',
        ]);

        $shipping = 10.0;
        $subtotal = 0;
        $snapshotItems = [];

        foreach ($validated['items'] as $item) {
            $product = Product::findOrFail($item['product_id']);
            $subtotal += $product->price * $item['qty'];

            $snapshotItems[] = [
                'product_id' => (string) $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'qty' => $item['qty'],
            ];
        }

        $order = Order::create([
            'user_id' => (string) $request->user()->id,
            'items' => $snapshotItems,
            'subtotal' => $subtotal,
            'shipping' => $shipping,
            'total' => $subtotal + $shipping,
            'status' => 'Pending',
            'shipping_address' => $validated['shipping_address'],
        ]);

        return response()->json($order, 201);
    }

    // Every order, for the admin Orders page
    public function adminIndex()
    {
        return response()->json(Order::orderByDesc('created_at')->get());
    }

    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:Pending,Completed,Cancelled',
        ]);

        $order = Order::findOrFail($id);
        $order->update($validated);

        return response()->json($order);
    }
}
