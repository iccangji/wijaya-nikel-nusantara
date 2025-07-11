<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Operasional extends Model
{
    use HasFactory;
    protected $table = 'operasional';
    protected $guarded = ['id'];

    protected $fillable = [
        'alat_id',
        'tanggal',
        'jam_operasional',
        'retase',
        'solar',
    ];

    // Relasi ke alat
    public function alat()
    {
        return $this->belongsTo(Alat::class);
    }
}
