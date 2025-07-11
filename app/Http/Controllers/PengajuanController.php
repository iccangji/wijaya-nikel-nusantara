<?php

namespace App\Http\Controllers;

use App\Models\Dokumen;
use App\Models\Pengajuan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Dompdf\Dompdf;
use Dompdf\Options;

class PengajuanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pengajuanData = Pengajuan::with('dokumen')->orderBy('updated_at', 'desc')->get();
        $dokumenData = Dokumen::with(['pengajuan:id,pembeli'])
            ->orderByDesc('updated_at')
            ->limit(10)
            ->get();
        $chartData = Pengajuan::selectRaw("YEAR(tanggal) as tahun, MONTH(tanggal) as bulan, SUM(kuantitas) as total")
            ->where('status', 'dimuat')
            ->groupBy('tahun', 'bulan')
            ->orderBy('tahun')
            ->orderBy('bulan')
            ->get();
        return Inertia::render('Pengajuan', [
            'pengajuanData' => $pengajuanData,
            'dokumenData' => $dokumenData,
            'chartData' => $chartData,
            'showNav' => auth()->user()->role === 'admin',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tanggal' => 'required|date',
            'pembeli' => 'required',
            'lokasi_muat' => 'nullable',
            'lokasi_tujuan' => 'nullable',
            'kapal' => 'nullable',
            'pembayaran' => 'nullable|numeric',
            'kuantitas' => 'nullable|numeric',
            'kadar_nikel' => 'nullable|numeric',
        ]);

        $pengajuan = Pengajuan::create($validated);

        if ($request->file('shipping_instruction')) {
            $request->validate([
                'shipping_instruction' => 'file|mimes:pdf|max:10240',
            ]);
            $file = $request->file('shipping_instruction');
            $path = $file->store('uploads', 'public');

            $pengajuan->dokumen()->create([
                'jenis_dokumen' => 'Shipping Instruction',
                'nama_file' => $file->getClientOriginalName(),
                'path_file' => $path,
                'ukuran_file' => $file->getSize(),
                'tipe_file' => $file->getMimeType(),
            ]);
        }

        if ($request->file('final_draft_survey')) {
            $request->validate([
                'final_draft_survey' => 'file|mimes:pdf|max:10240',
            ]);
            $file = $request->file('final_draft_survey');
            $path = $file->store('uploads', 'public');

            $pengajuan->dokumen()->create([
                'jenis_dokumen' => 'Final Draft Survey',
                'nama_file' => $file->getClientOriginalName(),
                'path_file' => $path,
                'ukuran_file' => $file->getSize(),
                'tipe_file' => $file->getMimeType(),
            ]);
        }

        if ($request->file('kelengkapan_kapal')) {
            $request->validate([
                'kelengkapan_kapal' => 'file|mimes:pdf|max:10240',
            ]);
            $file = $request->file('kelengkapan_kapal');
            $path = $file->store('uploads', 'public');

            $pengajuan->dokumen()->create([
                'jenis_dokumen' => 'Kelengkapan Kapal',
                'nama_file' => $file->getClientOriginalName(),
                'path_file' => $path,
                'ukuran_file' => $file->getSize(),
                'tipe_file' => $file->getMimeType(),
            ]);
        }

        if ($request->file('bukti_pembayaran')) {
            $request->validate([
                'bukti_pembayaran' => 'file|mimes:pdf|max:10240',
            ]);
            $file = $request->file('bukti_pembayaran');
            $path = $file->store('uploads', 'public');

            $pengajuan->dokumen()->create([
                'jenis_dokumen' => 'Bukti Pembayaran',
                'nama_file' => $file->getClientOriginalName(),
                'path_file' => $path,
                'ukuran_file' => $file->getSize(),
                'tipe_file' => $file->getMimeType(),
            ]);
        }

        if ($request->file('laporan_hasil_verifikasi')) {
            $request->validate([
                'laporan_hasil_verifikasi' => 'file|mimes:pdf|max:10240',
            ]);
            $file = $request->file('laporan_hasil_verifikasi');
            $path = $file->store('uploads', 'public');

            $pengajuan->dokumen()->create([
                'jenis_dokumen' => 'Laporan Hasil Verifikasi',
                'nama_file' => $file->getClientOriginalName(),
                'path_file' => $path,
                'ukuran_file' => $file->getSize(),
                'tipe_file' => $file->getMimeType(),
            ]);
        }

        if ($request->file('surat_persetujuan_berlayar')) {
            $request->validate([
                'surat_persetujuan_berlayar' => 'file|mimes:pdf|max:10240',
            ]);
            $file = $request->file('surat_persetujuan_berlayar');
            $path = $file->store('uploads', 'public');

            $pengajuan->dokumen()->create([
                'jenis_dokumen' => 'Surat Persetujuan Berlayar',
                'nama_file' => $file->getClientOriginalName(),
                'path_file' => $path,
                'ukuran_file' => $file->getSize(),
                'tipe_file' => $file->getMimeType(),
            ]);
        }
        if ($pengajuan->dokumen()->count() == 6) {
            $pengajuan->update([
                'status' => 'dimuat'
            ]);
        };

        return redirect()->route('pengajuan')->with('success', 'Pengajuan berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $pengajuan = Pengajuan::with('dokumen')->findOrFail($id);
        $shippingInstruction = $pengajuan->dokumen()->where('jenis_dokumen', 'Shipping Instruction')->first();
        $kelengkapanKapal = $pengajuan->dokumen()->where('jenis_dokumen', 'Kelengkapan Kapal')->first();
        $laporanHasilVerifikasi = $pengajuan->dokumen()->where('jenis_dokumen', 'Laporan Hasil Verifikasi')->first();
        $finalDraftSurvey = $pengajuan->dokumen()->where('jenis_dokumen', 'Final Draft Survey')->first();
        $buktiPembayaran = $pengajuan->dokumen()->where('jenis_dokumen', 'Bukti Pembayaran')->first();
        $suratPersetujuanBerlayar = $pengajuan->dokumen()->where('jenis_dokumen', 'Surat Persetujuan Berlayar')->first();

        return Inertia::render('Pengajuan/Details', [
            'pengajuan' => $pengajuan->where('id', $id)->first(),
            'dokumen' => [
                'shipping_instruction' => $shippingInstruction,
                'kelengkapan_kapal' => $kelengkapanKapal,
                'laporan_hasil_verifikasi' => $laporanHasilVerifikasi,
                'final_draft_survey' => $finalDraftSurvey,
                'bukti_pembayaran' => $buktiPembayaran,
                'surat_persetujuan_berlayar' => $suratPersetujuanBerlayar
            ]
        ]);
    }

    public function edit($id)
    {
        $pengajuan = Pengajuan::with('dokumen')->findOrFail($id);
        $shippingInstruction = $pengajuan->dokumen()->where('jenis_dokumen', 'Shipping Instruction')->first();
        $kelengkapanKapal = $pengajuan->dokumen()->where('jenis_dokumen', 'Kelengkapan Kapal')->first();
        $laporanHasilVerifikasi = $pengajuan->dokumen()->where('jenis_dokumen', 'Laporan Hasil Verifikasi')->first();
        $finalDraftSurvey = $pengajuan->dokumen()->where('jenis_dokumen', 'Final Draft Survey')->first();
        $buktiPembayaran = $pengajuan->dokumen()->where('jenis_dokumen', 'Bukti Pembayaran')->first();
        $suratPersetujuanBerlayar = $pengajuan->dokumen()->where('jenis_dokumen', 'Surat Persetujuan Berlayar')->first();
        return Inertia::render('Pengajuan/Edit', [
            'pengajuan' => $pengajuan->where('id', $id)->first(),
            'dokumen' => [
                'shipping_instruction' => $shippingInstruction,
                'kelengkapan_kapal' => $kelengkapanKapal,
                'laporan_hasil_verifikasi' => $laporanHasilVerifikasi,
                'final_draft_survey' => $finalDraftSurvey,
                'bukti_pembayaran' => $buktiPembayaran,
                'surat_persetujuan_berlayar' => $suratPersetujuanBerlayar
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $pengajuan = Pengajuan::findOrFail($id);

        $validated = $request->validate([
            'tanggal' => 'required|date',
            'pembeli' => 'required',
            'lokasi_muat' => 'nullable',
            'lokasi_tujuan' => 'nullable',
            'kapal' => 'nullable',
            'pembayaran' => 'nullable|numeric',
            'kuantitas' => 'nullable|numeric',
            'kadar_nikel' => 'nullable|numeric',
        ]);

        $pengajuan->update($validated);

        if ($request->file('shipping_instruction')) {
            $pengajuan->dokumen()->where('jenis_dokumen', 'Shipping Instruction')->delete();
            $request->validate([
                'shipping_instruction' => 'required|mimes:pdf|max:10240',
            ]);
            $file = $request->file('shipping_instruction');
            $path = $file->store('uploads', 'public');

            $pengajuan->dokumen()->create([
                'jenis_dokumen' => 'Shipping Instruction',
                'nama_file' => $file->getClientOriginalName(),
                'path_file' => $path,
                'ukuran_file' => $file->getSize(),
                'tipe_file' => $file->getMimeType(),
            ]);
        }

        if ($request->file('final_draft_survey')) {
            $pengajuan->dokumen()->where('jenis_dokumen', 'Final Draft Survey')->delete();
            $request->validate([
                'final_draft_survey' => 'required|mimes:pdf|max:10240',
            ]);
            $file = $request->file('final_draft_survey');
            $path = $file->store('uploads', 'public');

            $pengajuan->dokumen()->create([
                'jenis_dokumen' => 'Final Draft Survey',
                'nama_file' => $file->getClientOriginalName(),
                'path_file' => $path,
                'ukuran_file' => $file->getSize(),
                'tipe_file' => $file->getMimeType(),
            ]);
        }

        if ($request->file('kelengkapan_kapal')) {
            $pengajuan->dokumen()->where('jenis_dokumen', 'Kelengkapan Kapal')->delete();
            $request->validate([
                'kelengkapan_kapal' => 'required|mimes:pdf|max:10240',
            ]);
            $file = $request->file('kelengkapan_kapal');
            $path = $file->store('uploads', 'public');

            $pengajuan->dokumen()->create([
                'jenis_dokumen' => 'Kelengkapan Kapal',
                'nama_file' => $file->getClientOriginalName(),
                'path_file' => $path,
                'ukuran_file' => $file->getSize(),
                'tipe_file' => $file->getMimeType(),
            ]);
        }

        if ($request->file('bukti_pembayaran')) {
            $pengajuan->dokumen()->where('jenis_dokumen', 'Bukti Pembayaran')->delete();
            $request->validate([
                'bukti_pembayaran' => 'required|mimes:pdf|max:10240',
            ]);
            $file = $request->file('bukti_pembayaran');
            $path = $file->store('uploads', 'public');

            $pengajuan->dokumen()->create([
                'jenis_dokumen' => 'Bukti Pembayaran',
                'nama_file' => $file->getClientOriginalName(),
                'path_file' => $path,
                'ukuran_file' => $file->getSize(),
                'tipe_file' => $file->getMimeType(),
            ]);
        }

        if ($request->file('laporan_hasil_verifikasi')) {
            $pengajuan->dokumen()->where('jenis_dokumen', 'Laporan Hasil Verifikasi')->delete();
            $request->validate([
                'laporan_hasil_verifikasi' => 'required|mimes:pdf|max:10240',
            ]);
            $file = $request->file('laporan_hasil_verifikasi');
            $path = $file->store('uploads', 'public');

            $pengajuan->dokumen()->create([
                'jenis_dokumen' => 'Laporan Hasil Verifikasi',
                'nama_file' => $file->getClientOriginalName(),
                'path_file' => $path,
                'ukuran_file' => $file->getSize(),
                'tipe_file' => $file->getMimeType(),
            ]);
        }

        if ($request->file('surat_persetujuan_berlayar')) {
            $pengajuan->dokumen()->where('jenis_dokumen', 'Surat Persetujuan Berlayar')->delete();
            $request->validate([
                'surat_persetujuan_berlayar' => 'required|mimes:pdf|max:10240',
            ]);
            $file = $request->file('surat_persetujuan_berlayar');
            $path = $file->store('uploads', 'public');

            $pengajuan->dokumen()->create([
                'jenis_dokumen' => 'Surat Persetujuan Berlayar',
                'nama_file' => $file->getClientOriginalName(),
                'path_file' => $path,
                'ukuran_file' => $file->getSize(),
                'tipe_file' => $file->getMimeType(),
            ]);
        }

        if ($pengajuan->dokumen()->count() == 6) {
            $pengajuan->update([
                'status' => 'dimuat'
            ]);
        };
        return redirect()->route('pengajuan')->with('success', 'Pengajuan berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Pengajuan::destroy($id);
        return redirect()->route('pengajuan')->with('success', 'Pengajuan berhasil dihapus');
    }

    public function print()
    {
        $pengajuan = Pengajuan::with('dokumen')->latest()->get();
        $html = view('print.pengajuan', compact('pengajuan'))->render();

        // Setup Dompdf
        $options = new Options();
        $options->set('isRemoteEnabled', true);

        $dompdf = new Dompdf($options);
        $dompdf->loadHtml($html);

        // (Optional) set paper size & orientation
        $dompdf->setPaper('A4', 'landscape');

        // Render PDF
        $dompdf->render();

        // Output ke browser
        return response($dompdf->output(), 200)
            ->header('Content-Type', 'application/pdf');
    }
}
