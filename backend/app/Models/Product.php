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
        return $this->belongsTo(Category::class);
    }

    // Model scopes
    public function scopeNewArrivals(Builder $query): Builder
    {
        return $query->where('is_new', true)->latest()->take(6);
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true)->latest()->take(8);
    }

    public function scopeCategory(Builder $query, $slug): Builder
    {
        return $query->whereHas(
            'category',
            function ($q) use ($slug) {
                // import $slug into the callback's scope with `use ($slug)`
                $q->where('slug', $slug);
            }
        );
    }
}
