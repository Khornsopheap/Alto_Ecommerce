<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use KHQR\BakongKHQR;
use KHQR\Helpers\KHQRData;
use KHQR\Models\IndividualInfo;

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
            'payment_method' => 'required|in:cod,khqr',
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
            'payment_method' => $validated['payment_method'],
            'payment_status' => 'Unpaid',
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

    public function generateKhqr(Request $request, $id)
    {
        $order = Order::where('user_id', (string) $request->user()->id)->findOrFail($id);
        $info = new IndividualInfo(
            bakongAccountID: config('services.bakong.account_id'),
            merchantName: config('services.bakong.merchant_name'),
            merchantCity: config('services.bakong.merchant_city'),
            currency: KHQRData::CURRENCY_USD,
            amount: $order->total,
            billNumber: (string) $order->id,
            expirationTimestamp: (string) floor(now()->addMinutes(15)->timestamp * 1000),
        );

        $result = BakongKHQR::generateIndividual($info);

        // Check if KHQR generation failed
        if ($result->status['code'] !== 0) {
            return response()->json([
                'message' => 'Failed to generate KHQR',
                'errorCode' => $result->status['errorCode'],
                'error' => $result->status['message'],
            ], 422);
        }

        // The response data is stored directly in $result->data
        $data = $result->data;

        return response()->json([
            'qr' => $data['qr'],
            'md5' => $data['md5'],
        ]);
    }


    public function confirmPayment(Request $request, $id)
    {
        $order = Order::where('user_id', (string) $request->user()->id)->findOrFail($id);
        $order->update(['payment_status' => 'Paid']);

        return response()->json($order);
    }
}
