<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScrapedProduct extends Model
{
    public $timestamps = false;
    protected $primaryKey = 'url';
    public $incrementing = false;
    protected $fillable = ['url'];
}
