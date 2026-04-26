<?php

namespace Database\Factories;

use App\Models\Review;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    // Associate the factory with the Review model
    protected $model = Review::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $recommends = $this->faker->boolean(70);
        $rating = $recommends
            ? $this->faker->numberBetween(3, 5)
            : $this->faker->numberBetween(1, 3);

        $hasTitle = $this->faker->boolean(60);
        $title = $this->faker->words(random_int(2, 5), true);

        $authorName = $this->faker->firstName . ' ' . $this->faker->lastName;

        return [
            'rating' => $rating,
            'review_title' => $hasTitle ? $title : null,
            'comment' => $this->faker->sentences(random_int(2, 10), true),
            'author_name' => $authorName,
            'recommends' => $recommends,
            'is_verified' => $this->faker->boolean(60),
        ];
    }
}
