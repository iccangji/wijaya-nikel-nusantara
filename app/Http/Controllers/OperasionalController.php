<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Alat;
use App\Models\Operasional;

use Dompdf\Dompdf;
use Dompdf\Options;

class OperasionalController extends Controller
{
    public function index()
    {
        $alatData = Alat::withSum('operasional', 'jam_operasional')->withSum('operasional', 'retase')->withSum('operasional', 'solar')->orderBy('updated_at', 'desc')->get();
        $operasionalData = Operasional::with('alat')->orderBy('updated_at', 'desc')->get();
        return Inertia::render('Operasional', [
            'alatData' => $alatData,
            'operasionalData' => $operasionalData,
        ]);
    }

    public function create()
    {
        $alatData = Alat::orderBy('updated_at', 'desc')->get();
        return Inertia::render('Operasional/Create', [
            'alatData' => $alatData
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tanggal' => 'required|date',
            'alat_id' => 'required|numeric',
            'jam_operasional' => 'required|numeric',
            'retase' => 'required|numeric',
            'solar' => 'required|numeric',
        ]);
        Operasional::create($validated);
        return redirect()->route('operasional')->with('success', 'Operasional berhasil ditambahkan');
    }

    public function show($id)
    {
        $operasional = Operasional::with('alat')->findOrFail($id);
        return Inertia::render('Operasional/Details', [
            'operasional' => $operasional->with('alat')->where('id', $id)->first(),
        ]);
    }

    public function edit($id)
    {
        $operasional = Operasional::findOrFail($id);
        $alatData = Alat::orderBy('updated_at', 'desc')->get();
        return Inertia::render('Operasional/Edit', [
            'operasional' => $operasional->where('id', $id)->first(),
            'alatData' => $alatData
        ]);
    }

    public function update(Request $request, $id)
    {
        $operasional = Operasional::findOrFail($id);
        $validated = $request->validate([
            'tanggal' => 'required|date',
            'alat_id' => 'required|numeric',
            'jam_operasional' => 'required|numeric',
            'retase' => 'required|numeric',
            'solar' => 'required|numeric',
        ]);

        $operasional->update($validated);
        return redirect()->route('operasional')->with('success', 'Operasional berhasil diubah');
    }

    public function destroy($id)
    {
        Operasional::destroy($id);
        return redirect()->route('operasional')->with('success', 'Operasional berhasil dihapus');
    }

    public function print()
    {
        $operasional = Operasional::with('alat')->latest()->get();
        $html = view('print.operasional', compact('operasional'))->render();

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
