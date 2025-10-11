<?php

namespace App\Models;


class BlogCategory extends Model
{
    protected $guarded = ['id'];
    protected $fillable = [
        'parent_id',
        'title',
        'slug',
        'image',
        'status'
    ];
    public function categories(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(BlogCategory::class)->where('parent_id',null);
    }
    public function subCategories(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(BlogCategory::class)->whereNotNull('parent_id');
    }
    public function children(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(BlogCategory::class, 'parent_id');
    }
    public function parent(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(BlogCategory::class, 'parent_id');
    }
    public function blogs(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Blog::class);
    }
    public static function tree(): \Illuminate\Database\Eloquent\Collection
    {
        return static::with(implode('.', array_fill(0, 100, 'children')))->where('parent_id', '=', '0')->orderBy('sort')->get();
    }
}
