<?php

namespace App\Http\Resources\Product\Concerns;

// Trait is concerned with resolving product card image data
trait ResolvesProductCard
{
    protected function primaryImage()
    {
        $image = collect($this->images)->firstWhere('is_primary', true)
            ?? collect($this->images)->first();

        return $image
            ? ['url' => $image['url'], 'alt' => $image['alt']]
            : null;
    }
}
