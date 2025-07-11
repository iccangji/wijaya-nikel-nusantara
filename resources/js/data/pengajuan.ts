type Pengajuan = {
    id: number;
    tanggal: string;
    pembeli: string;
    lokasi_muat: string;
    lokasi_tujuan: string;
    kapal: string;
    kuantitas: string;
    kadar_nikel: string;
    status: string;
}

const pengajuan: Pengajuan[] = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    tanggal: '2023-06-12',
    pembeli: 'Pembeli ' + index,
    lokasi_muat: 'Lokasi Muat ' + index,
    lokasi_tujuan: 'Lokasi Tujuan ' + index,
    kapal: 'Kapal ' + index,
    kuantitas: 'Kuantitas ' + index,
    kadar_nikel: 'Kadar Nikel ' + index,
    status: index % 2 === 0 ? 'dimuat' : 'belum_dimuat'
}));

export default pengajuan