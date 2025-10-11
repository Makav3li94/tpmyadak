<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as BaseModel;
use Illuminate\Database\Eloquent\SoftDeletes;

class ModelSimple extends BaseModel
{
    use  HasFactory, HasUlids, SoftDeletes;

    public $cascadeDeletes = [];
}
