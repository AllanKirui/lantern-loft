<?php

namespace App\Http\Resources\Product;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductCardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $isExtendedCard = $request->routeIs('products.*') || $request->boolean('extended');

        $primaryImage = collect($this->images)->firstWhere('is_primary', true) ?? collect($this->images)->first();

        $hasNoReviews = fake()->boolean(40);
        $hasNoFinish = fake()->boolean(60);

        return [
            // Shared payload used by NewProductCard.vue and ProductCard.vue
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'short_description' => $this->short_description ?? str($this->description)->limit(120),
            'image' => $primaryImage
                ? ['url' => $primaryImage['url'], 'alt' => $primaryImage['alt']]
                : null,

            // Extended payload for ProductCard.vue
            $this->mergeWhen($isExtendedCard, [
                'price' => $this->price,
                'discount_price' => $this->discount_price,
                'tagline' => $this->tagline,
                'is_new' => $this->is_new,

                // TODO Computed data
                'rating' => $hasNoReviews ? 0 : round(fake()->randomFloat(1, 3.5, 5), 1),
                'review_count' => $hasNoReviews ? 0 : random_int(0, 500),
                'finishes_count' => $hasNoFinish ? 0 : random_int(0, 100),
            ]),

        ];
    }
}
