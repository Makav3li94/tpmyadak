<?php

namespace App\Models;

class File extends Model
{
    const DIR = 'dir'; //dir

    const FILE = 'file';

    protected $fillable = [
        'upload_name',
        'hash_name',
        'name',
        'type',
        'dir',
    ];
}
