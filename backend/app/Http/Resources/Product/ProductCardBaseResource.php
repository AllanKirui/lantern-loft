<?php

namespace App\Http\Resources\Product;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Product\Concerns\ResolvesProductCard;

class ProductCardBaseResource extends JsonResource
{
    use ResolvesProductCard;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'short_description' => $this->short_description
                ?? str($this->description)->limit(120),
            'image' => $this->primaryImage(),
        ];
    }
}
