<?php

namespace App\Models;


class BlogFaq extends ModelBase
{
    protected $guarded = [];
    public $timestamps = false;
    protected $primaryKey = 'blog_id';

    public function blog(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(BlogCategory::class);
    }
}
