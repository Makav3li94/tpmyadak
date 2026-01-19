<?php

namespace App\Models;

use Digikraaft\ReviewRating\Traits\HasReviewRating;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Spatie\Feed\Feedable;
use Spatie\Feed\FeedItem;

class Blog extends Model implements Feedable
{
    use HasReviewRating;
    protected $guarded = ['id'];

    public function toFeedItem(): FeedItem
    {
        return FeedItem::create()
            ->id($this->id)
            ->title($this->title)
            ->image("https://cdn.tpmyadak.com/postthumb/$this->img_cover")
            ->category($this->category->title)
            ->summary($this->excerpt)
            ->updated($this->updated_at)
            ->link(route('home.getBlog', $this->slug))
            ->authorName('Sarah Ahoiee')
            ->authorEmail('negood123@yahoo.com');
    }

    public static function getFeedItems()
    {
        return Blog::all();
    }

    protected $appends = [
        'persian_date',
        'fucking_pub_at',
    ];

    public function category(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(BlogCategory::class);
    }

    public function subCategory(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(BlogCategory::class, 'subcategory_id', 'id');
    }

    public function fuq(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(BlogFaq::class);
    }

    public function faq(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(BlogFaq::class)->whereNotNull('q1');
    }

    protected function publishedAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => verta($value)->format('Y-m-d')
        );
    }

    protected function getFuckingPubAtAttribute(): array
    {
        return explode(' ',verta($this->getRawOriginal('published_at'))->format('%B %d'));
    }
    protected function getPersianDateAttribute(): string
    {
        return verta($this->getRawOriginal('published_at'))->formatDifference();
    }

    protected function excerpt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => strip_tags($value)
        );
    }
}
