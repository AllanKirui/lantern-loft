<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'price',
        'discount_price',
        'description',
        'short_description',
        'images',
        'is_featured',
        'is_new',
        'stock_quantity',
        'model_code',
        'sku',
        'status'
    ];

    protected $casts = [
        'images' => 'array', // Cast JSON column to PHP array
        'price' => 'decimal:2',
        'discount_price' => 'decimal:2',
        'is_featured' => 'boolean',
        'is_new' => 'boolean',
    ];

    public function category()
    {
        $this->belongsTo(Category::class);
    }

    // Model scopes
    public function scopeNewArrivals(Builder $query): Builder
    {
        return $query->where('is_new', true)->latest()->take(6);
    }
}
