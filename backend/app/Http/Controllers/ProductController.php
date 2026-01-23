<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Termwind\Components\Raw;
use App\Http\Resources\Product\ProductCardResource;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $products = Product::where('is_new', true)->take(6)->get();

        return ProductCardResource::collection($products);
    }

    public function featured()
    {
        $products = Product::where('is_featured', true)->take(8)->get();

        return ProductCardResource::collection($products);
    }
}
