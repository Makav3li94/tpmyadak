<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Shop\Address;
use App\Models\Traits\UserTrackable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, HasUlids, Notifiable, UserTrackable,SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'familiarity_id',
        'ref_id',
        'mobile',
        'status',
        'code',
        'reset_token',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function addresses(): HasMany
    {
        return $this->hasMany(Address::class);
    }
    public function refs(): HasMany
    {
        return $this->hasMany(User::class, 'ref_id');
    }
    public function familiarity(): BelongsTo
    {
        return $this->belongsTo(Familiarity::class);
    }
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function allow($permission, $abort = false)
    {
        if ($this->role_id == null) {
            return true;
        }

        $permit = $this->role()->whereHas('permissions', function ($query) use ($permission) {
            return $query->where('name', $permission);
        })->first();

        if ($permit != null) {
            return true;
        }

        if ($abort) {
            abort(403);
        }

        return false;
    }


}
