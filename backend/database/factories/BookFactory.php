<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'author' => $this->faker->name(),
            'release_date' => $this->faker->date(),
            'quantity' => $this->faker->randomDigit(),
            'description' => $this->faker->text(50),
            'image' => $this->faker->imageUrl(),
            'category_id' => Category::inRandomOrder()->first(),
        ];
    }
}
