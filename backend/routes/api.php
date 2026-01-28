<?php

use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::get('/ping', fn() => response()->json(['pong' => true]));

Route::get('/db-test', function () {
    try {
        // Run a simple query to check the connection
        DB::connection()->getPdo();
        return response()->json([
            'status' => 'success',
            'message' => 'Database connected!',
            'db_name' => DB::connection()->getDatabaseName()
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Database connection failed',
            'error' => $e->getMessage()
        ], 500);
    }
});

// Protected route for Sanctum sanity-check
Route::middleware('auth:sanctum')->get('/user', fn(Request $request) => $request->user());

Route::get('/products/new-arrivals', [ProductController::class, 'newArrivals']);
Route::get('/products/featured', [ProductController::class, 'featured'])->name('products.featured');
Route::apiResource('products', ProductController::class);
