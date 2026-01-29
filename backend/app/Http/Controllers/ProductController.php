<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Termwind\Components\Raw;
use App\Http\Resources\Product\ProductCardResource;
use App\Http\Resources\Product\ProductCardBaseResource;

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
        return ProductCardBaseResource::collection(Product::newArrivals()->get());
    }

    public function featured()
    {
        return ProductCardResource::collection(Product::featured()->get());
    }
}
