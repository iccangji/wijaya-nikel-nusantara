<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Alat;
use Dompdf\Dompdf;
use Dompdf\Options;

class AlatController extends Controller
{

    public function index() {}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'alat' => 'required',
        ]);
        Alat::create($validated);
        return redirect()->route('operasional')->with('success', 'Alat berhasil ditambahkan');
    }

    public function show($id)
    {
        $alat = Alat::findOrFail($id);
        return Inertia::render('Alat/Details', [
            'alat' => $alat->where('id', $id)->first(),
        ]);
    }

    public function edit($id)
    {
        $alat = Alat::findOrFail($id);
        return Inertia::render('Alat/Edit', [
            'alat' => $alat->where('id', $id)->first(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $alat = Alat::findOrFail($id);
        $validated = $request->validate([
            'alat' => 'required',
        ]);

        $alat->update($validated);
        return redirect()->route('operasional')->with('success', 'Alat berhasil diubah');
    }

    public function destroy($id)
    {
        Alat::destroy($id);
        return redirect()->route('operasional')->with('success', 'Alat berhasil dihapus');
    }

    public function print()
    {
        $alat = Alat::latest()->get();
        $html = view('print.alat', compact('alat'))->render();

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
