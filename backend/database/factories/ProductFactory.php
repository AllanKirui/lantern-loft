<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    // Associate the factory with the Product model
    protected $model = Product::class;

    public function definition(): array
    {
        $name = $this->faker->words(3, true);
        $onSale = $this->faker->boolean(30);
        $price = $this->faker->randomFloat(0, 3000, 15000);
        $discount = random_int(12, 30) / 100; // percentage
        $salePrice = round($price * (1 - $discount), 2);
        $modelCode = strtoupper(
            'LMP-' .
                $this->faker->randomElement(['FLR', 'TBL']) .
                '-' .
                $this->faker->numberBetween(100, 999)
        );

        return [
            'name' => $name,
            'slug' => Str::slug($name) . '-' . $this->faker->unique()->numberBetween(100, 999),
            'price' => $price,
            'discount_price' => $onSale ? $salePrice : null,
            'description' => $this->faker->sentences(random_int(5, 12), true),
            'short_description' => $this->faker->optional(0.7)->sentences(3, true),
            'meta_title' => $this->faker->words(3, true),
            'meta_description' => $this->faker->sentences(3, true),
            'images' => collect(range(1, random_int(2, 5)))->map(fn($i) => [
                'url' => $this->faker->imageUrl(512, 512, 'lamp', true),
                'alt' => $name . ' image ' . $i,
                'is_primary' => $i === 1,
            ])->toArray(),
            'is_featured' => $this->faker->boolean(30),
            'is_new' => $this->faker->boolean(30),
            'stock_quantity' => $this->faker->numberBetween(0, 40),
            'model_code' => $modelCode,
            'sku' => strtoupper('SKU-' . $this->faker->bothify('LMP-###??')),
            'status' => $this->faker->randomElement(['live', 'draft', 'archived', 'coming_soon', 'out_of_stock']),
        ];
    }
}
