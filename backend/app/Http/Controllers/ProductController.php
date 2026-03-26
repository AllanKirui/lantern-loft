<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Termwind\Components\Raw;
use App\Http\Resources\Product\ProductCardBaseResource;
use App\Http\Resources\Product\ProductCardExtendedResource;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Eager-load the relationship to include category data
        $products = Product::with('category')
            ->when(
                $request->category,
                fn($q) => $q->category($request->category)
            )
            ->price($request->min_price, $request->max_price)
            ->paginate(12)
            ->withQueryString();

        return ProductCardExtendedResource::collection($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function newArrivals()
    {
        return ProductCardBaseResource::collection(Product::newArrivals()->get());
    }

    public function featured()
    {
        return ProductCardExtendedResource::collection(Product::featured()->get());
    }

    public function filters()
    {
        return response()->json([
            'categories' => Category::select(['name', 'slug'])->get(),
            'price' => [
                'min' => Product::min('price'),
                'max' => Product::max('price')
            ]
        ]);
    }
}
