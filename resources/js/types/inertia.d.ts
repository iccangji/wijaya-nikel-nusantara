// declare module import type { Page } from "@inertiajs/core";

declare module "@inertiajs/core" {
    interface PageProps {
        auth: {
            user: {
                id: number;
                name: string;
            } | null;
        };
        pengajuanData: {
            id: number;
            tanggal: string;
            pembeli: string;
            lokasi_muat: string;
            lokasi_tujuan: string;
            kapal: string;
            kuantitas: number;
            kadar_nikel: number;
            status: string;
        }[];
        pengajuan: {
            id: number;
            tanggal: string;
            pembeli: string;
            lokasi_muat: string;
            lokasi_tujuan: string;
            kapal: string;
            kuantitas: number;
            kadar_nikel: number;
            status: string;
        },
        dokumenData: {
            id: number;
            jenis_dokumen: string;
            nama_file: string;
            path_file: string;
            ukuran_file: number;
            tipe_file: string;
            created_at: string;
            updated_at: string;
        }[]
        chartData: {
            bulan: string;
            year: number;
            total: number;
        }[];
    }
}
