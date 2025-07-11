<?php

namespace App\Http\Controllers;

use App\Models\Dokumen;
use App\Models\Pengajuan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DokumenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($pengajuanId)
    {
        return Pengajuan::findOrFail($pengajuanId)->dokumen;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $pengajuanId)
    {
        try {
            $request->validate([
                'file' => 'required|file|mimes:pdf|max:10240', // Max 10MB
                'jenis_dokumen' => 'required',
            ]);

            $perizinan = Pengajuan::findOrFail($pengajuanId);
            $file = $request->file('file');

            $perizinan->dokumen()->create([
                'jenis_dokumen' => $request->jenis_dokumen,
                'nama_file' => $file->getClientOriginalName(),
                'path_file' => $file->store('dokumen-perizinan'),
                'ukuran_file' => $file->getSize(),
                'tipe_file' => $file->getMimeType(),
            ]);

            return true;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($pengajuanId, $id)
    {
        return Dokumen::where('perizinan_id', $pengajuanId)->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $pengajuan = Pengajuan::with('dokumen')->whereHas('dokumen', function ($query) use ($id) {
            $query->where('id', $id);
        });
        $pengajuan->update([
            'status' => 'belum_dimuat'
        ]);

        $dokumen = Dokumen::where('id', $id)->first();
        Storage::delete($dokumen->path_file);
        $dokumen->delete();
        return back()->with('success', 'Dokumen berhasil dihapus');
    }
}
