<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Termwind\Components\Raw;
use App\Http\Resources\Product\ProductCardBaseResource;
use App\Http\Resources\Product\ProductCardExtendedResource;
use App\Http\Resources\Product\ProductDetailResource;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Eager-load the relationship to include category data
        $products = Product::with('category')
            ->withCount('reviews')
            ->withAvg('reviews', 'rating')
            ->when(
                $request->category,
                fn($q) => $q->category($request->category)
            )
            ->price($request->min_price, $request->max_price)
            ->rating($request->rating)
            ->sort($request->sort)
            ->paginate($request->per_page ?? 12)
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
    public function show(Product $product)
    {
        // eager load the relationship to include reviews data
        $product->load([
            'reviews' => fn($q) => $q->latest()->take(7)
        ]);

        // aggregate review stats
        $product->loadCount('reviews')->loadAvg('reviews', 'rating');

        // recommendation percentage
        $recommendationPercentage = $product->reviews()->where('recommends', true)->count();

        $recommendationPercentage = $product->reviews_count > 0
            ? round(($recommendationPercentage / $product->reviews_count) * 100)
            : 0;

        // rating distributions
        $distributions = $product->reviews()
            ->selectRaw('rating, COUNT(*) as count')
            ->groupBy('rating')
            ->pluck('count', 'rating');

        // attach computed meta
        $product->reviews_meta = [
            'count' => $product->reviews_count,

            'average_rating' => $product->reviews_avg_rating
                ? round($product->reviews_avg_rating, 1)
                : null,

            'recommendation_percentage' => $recommendationPercentage,

            'distributions' => [
                ['star' => 5, 'count' => $distributions[5] ?? 0],
                ['star' => 4, 'count' => $distributions[4] ?? 0],
                ['star' => 3, 'count' => $distributions[3] ?? 0],
                ['star' => 2, 'count' => $distributions[2] ?? 0],
                ['star' => 1, 'count' => $distributions[1] ?? 0],
            ]
        ];

        return new ProductDetailResource($product);
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
        $products = Product::featured()
            ->withCount('reviews')
            ->withAvg('reviews', 'rating')
            ->get();

        return ProductCardExtendedResource::collection($products);
    }

    public function recommended(Product $product)
    {
        $products = Product::recommended($product->id)
            ->withCount('reviews')
            ->withAvg('reviews', 'rating')
            ->get();

        return ProductCardExtendedResource::collection($products);
    }

    public function filters(Request $request)
    {
        // Base filtered query (IMPORTANT: reuse filters except category)
        $baseQuery = Product::query()
            ->price($request->min_price, $request->max_price)
            ->rating($request->rating);

        // Get categories with product counts for each category
        $categories = Category::select('id', 'name', 'slug')
            ->withCount(['products as products_count' => function ($q) use ($baseQuery) {
                $q->whereIn('id', $baseQuery->pluck('id'));
            }])
            ->get();

        return response()->json([
            'categories' => $categories,
            'price' => [
                'min' => Product::min('discount_price') ?? Product::min('price'),
                'max' => Product::max('price')
            ]
        ]);
    }
}
