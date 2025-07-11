<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dokumen extends Model
{
    use HasFactory;
    protected $table = 'dokumen';
    protected $guarded = ['id'];

    protected $fillable = [
        'pengajuan_id',
        'jenis_dokumen',
        'nama_file',
        'path_file',
        'ukuran_file',
        'tipe_file'
    ];

    // Relasi ke pengajuan
    public function pengajuan()
    {
        return $this->belongsTo(Pengajuan::class);
    }
}
