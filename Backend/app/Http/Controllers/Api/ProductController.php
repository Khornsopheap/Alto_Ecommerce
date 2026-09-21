<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category');
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }
        return response()->json($query->get());
    }

    public function show($id)
    {
        return response()->json(Product::with('category')->findOrFail($id));
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|string',
            'price' => 'required|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);
        $product = Product::create($validated);
        return response()->json($product, 201);
    }
    
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'sometimes|string',
            'price' => 'sometimes|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'stock' => 'sometimes|integer|min:0',
        ]);
        $product->update($validated);
        return response()->json($product);
    }
    public function destroy($id)
    {
        Product::findOrFail($id)->delete();
        return response()->json(['message' => 'Product deleted']);
    }
}
