<?php

namespace App\Http\Resources\Product;

use App\Http\Resources\Review\ReviewResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductDetailResource extends JsonResource
{
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
            'tagline' => $this->tagline,
            'price' => round(floatVal($this->price)),
            'discount_price' => $this->discount_price ? round(floatVal($this->discount_price)) : null,
            'description' => $this->description,
            'is_new' => $this->is_new,
            'model_code' => $this->model_code,
            'sku' => $this->sku,
            'details' => $this->details,
            'specs' => $this->specs,
            'reviews' => [
                'items' => ReviewResource::collection($this->whenLoaded('reviews')),
                'meta' => $this->reviews_meta
            ]
        ];
    }
}
