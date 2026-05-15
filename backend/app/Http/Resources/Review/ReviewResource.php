<?php

namespace App\Http\Resources\Review;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'  => $this->id,
            'rating' => $this->rating,
            'review_title'  => $this->review_title,
            'comment'  => $this->comment,
            'author_name'  => $this->author_name,
            'recommends'  => $this->recommends,
            'is_verified'  => $this->is_verified,
            'expanded'  => $this->expanded,
        ];
    }
}
