type Dokumen = {
    id: number;
    jenis_dokumen: string;
    nama_file: string;
    path_file: string;
    ukuran_file: number;
    tipe_file: string;
    created_at: string;
    updated_at: string;
}

const dokumenData: Dokumen[] = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    jenis_dokumen: `Dokumen ${index + 1}`,
    nama_file: `dokumen-${index + 1}.pdf`,
    path_file: `dokumen-${index + 1}.pdf`,
    ukuran_file: 1024 * 1024, // 1MB
    tipe_file: 'application/pdf',
    created_at: '2023-06-12',
    updated_at: '2023-06-12'
}));

export default dokumenData