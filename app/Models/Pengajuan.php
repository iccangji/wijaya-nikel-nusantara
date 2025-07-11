<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengajuan extends Model
{
    use HasFactory;
    protected $table = 'pengajuan';
    protected $guarded = ['id'];

    protected $fillable = [
        'tanggal',
        'pembeli',
        'lokasi_muat',
        'lokasi_tujuan',
        'pembayaran',
        'kapal',
        'kuantitas',
        'kadar_nikel',
        'status'
    ];

    public function dokumen()
    {
        return $this->hasMany(Dokumen::class, 'pengajuan_id');
    }
}
