<?php

namespace App\Http\Resources\Product;

use Illuminate\Http\Request;
use App\Http\Resources\Category\CategoryResource;

class ProductCardExtendedResource extends ProductCardBaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // TODO Replace fake data with data from reviews and finishes
        $hasNoReviews = fake()->boolean(40);
        $hasNoFinish = fake()->boolean(60);

        // Merge the return array from ProductCardBaseResource with these additional fields
        return array_merge(parent::toArray($request), [
            'category' => CategoryResource::make($this->whenLoaded('category')),
            'price' => round(floatVal($this->price)),
            'discount_price' => $this->discount_price ? round(floatVal($this->discount_price)) : null,
            'tagline' => $this->tagline,
            'is_new' => $this->is_new,
            'rating' => $hasNoReviews ? 0 : round(fake()->randomFloat(1, 3.5, 5), 1),
            'review_count' => $hasNoReviews ? 0 : random_int(0, 500),
            'finishes_count' => $hasNoFinish ? 0 : random_int(0, 100),
        ]);
    }
}
