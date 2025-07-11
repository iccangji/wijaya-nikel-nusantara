<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alat extends Model
{
    use HasFactory;
    protected $table = 'alat';
    protected $guarded = ['id'];

    protected $fillable = [
        'alat',
    ];

    public function operasional()
    {
        return $this->hasMany(Operasional::class, 'alat_id');
    }
}
