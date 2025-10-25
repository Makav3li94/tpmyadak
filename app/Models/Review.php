<?php

namespace App\Models;

use Digikraaft\ReviewRating\Models\Review as BaseReview;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Review extends BaseReview
{
    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => verta($value)->formatJalaliDatetime()
        );
    }
}
