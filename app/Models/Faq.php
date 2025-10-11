<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;


class Faq extends ModelBase
{
    protected $guarded = [];

    public function ticket(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Ticket::class);
    }

    public function admin(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Admin::class);
    }

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn($value) => verta($value)->format('Y-m-d')
        );
    }

    protected function updatedAt(): Attribute
    {
        return Attribute::make(
            get: fn($value) => verta($value)->format('Y-m-d')
        );
    }

    protected function replyDate(): Attribute
    {
        return Attribute::make(
            get: fn($value) => verta($value)->format('Y-m-d')
        );
    }
}
