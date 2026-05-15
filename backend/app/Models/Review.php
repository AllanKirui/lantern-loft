<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    /** @use HasFactory<\Database\Factories\ReviewFactory> */
    use HasFactory;

    protected $fillable = ['rating', 'review_title', 'comment', 'author_name', 'recommends', 'is_verified'];

    protected $casts = [
        'rating' => 'integer',
        'recommends' => 'boolean',
        'is_verified' => 'boolean',
        'expanded' => 'boolean',
    ];

    // Relationships
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
