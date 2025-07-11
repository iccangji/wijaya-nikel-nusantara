import { CheckIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function PengajuanFormCreate() {
    const { data, setData, post, processing, errors } = useForm({
        tanggal: '',
        pembeli: '',
        kuantitas: '',
        kadar_nikel: '',
        lokasi_muat: '',
        lokasi_tujuan: '',
        pembayaran: '',
        kapal: '',
        status: '',
        shipping_instruction: null as File | null,
        final_draft_survey: null as File | null,
        kelengkapan_kapal: null as File | null,
        bukti_pembayaran: null as File | null,
        laporan_hasil_verifikasi: null as File | null,
        surat_persetujuan_berlayar: null as File | null
    })
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/pengajuan', { forceFormData: true });
    };
    useEffect(() => {
        if (errors.tanggal || errors.pembeli || errors.kuantitas || errors.kadar_nikel || errors.lokasi_muat || errors.lokasi_tujuan || errors.kapal || errors.bukti_pembayaran || errors.laporan_hasil_verifikasi || errors.surat_persetujuan_berlayar || errors.kelengkapan_kapal || errors.final_draft_survey || errors.shipping_instruction) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'error',
                title: 'Terdapat kesalahan dalam data'
            })
        }
    }, [errors]);
    return (
        <form action="" onSubmit={submit}>
            <div className="flex-col gap-4">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="tanggal" className="text-sm">Tanggal</Label>
                        <Input
                            type="date"
                            id="tanggal"
                            value={data.tanggal}
                            onChange={(e) => setData('tanggal', e.target.value)}
                            className="w-full md:w-2/3"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="pembeli" className="text-sm">Pembeli</Label>
                        <Input
                            type="text"
                            id="pembeli"
                            value={data.pembeli}
                            onChange={(e) => setData('pembeli', e.target.value)}
                            className="w-full md:w-2/3"
                            placeholder="Masukkan pembeli"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="kuantitas" className="text-sm">Kuantitas</Label>
                        <Input
                            type="text"
                            id="kuantitas"
                            value={data.kuantitas}
                            onChange={(e) => setData('kuantitas', e.target.value)}
                            className="w-full md:w-2/3"
                            placeholder="Masukkan kuantitas"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="kadar_nikel" className="text-sm">Kadar Nikel</Label>
                        <Input
                            type="text"
                            id="kadar_nikel"
                            value={data.kadar_nikel}
                            onChange={(e) => setData('kadar_nikel', e.target.value)}
                            className="w-full md:w-2/3"
                            placeholder="Masukkan kadar nikel"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="pembayaran" className="text-sm">Pembayaran</Label>
                        <Input
                            type="text"
                            id="pembeli"
                            value={data.pembayaran}
                            onChange={(e) => setData('pembayaran', e.target.value)}
                            className="w-full md:w-2/3"
                            placeholder="Masukkan pembayaran"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="lokasi_muat" className="text-sm">Lokasi muat</Label>
                        <Input
                            type="text"
                            id="lokasi_muat"
                            value={data.lokasi_muat}
                            onChange={(e) => setData('lokasi_muat', e.target.value)}
                            className="w-full md:w-2/3"
                            placeholder="Masukkan lokasi muat"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="lokasi_tujuan" className="text-sm">Lokasi tujuan</Label>
                        <Input
                            type="text"
                            id="lokasi_tujuan"
                            value={data.lokasi_tujuan}
                            onChange={(e) => setData('lokasi_tujuan', e.target.value)}
                            className="w-full md:w-2/3"
                            placeholder="Masukkan lokasi tujuan"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="kapal" className="text-sm">Kapal</Label>
                        <Input
                            type="text"
                            id="kapal"
                            value={data.kapal}
                            onChange={(e) => setData('kapal', e.target.value)}
                            className="w-full md:w-2/3"
                            placeholder="Masukkan nama kapal"
                        />
                    </div>
                </div>

                <p className="font-semibold mt-6">Dokumen</p>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="shipping_instruction" className="text-sm">Shipping Instruction</Label>
                        <Input
                            type="file"
                            id="shipping_instruction"
                            className="w-full md:w-2/3"
                            onChange={(e) => setData('shipping_instruction', e.target.files![0])}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="final_draft_survey" className="text-sm">Final Draft Survey</Label>
                        <Input
                            type="file"
                            id="final_draft_survey"
                            className="w-full md:w-2/3"
                            placeholder="Masukkan pembeli"
                            onChange={(e) => setData('final_draft_survey', e.target.files![0])}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="kelengkapan_kapal" className="text-sm">Kelengkapan Kapal</Label>
                        <Input
                            type="file"
                            id="kelengkapan_kapal"
                            className="w-full md:w-2/3"
                            placeholder="Masukkan kuantitas"
                            onChange={(e) => setData('kelengkapan_kapal', e.target.files![0])}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="bukti_pembayaran" className="text-sm">Bukti Pembayaran</Label>
                        <Input
                            type="file"
                            id="bukti_pembayaran"
                            className="w-full md:w-2/3"
                            placeholder="Masukkan kadar nikel"
                            onChange={(e) => setData('bukti_pembayaran', e.target.files![0])}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="laporan_hasil_verifikasi" className="text-sm">Laporan Hasil Verifikasi</Label>
                        <Input
                            type="file"
                            id="laporan_hasil_verifikasi"
                            className="w-full md:w-2/3"
                            placeholder="Masukkan lokasi muat"
                            onChange={(e) => setData('laporan_hasil_verifikasi', e.target.files![0])}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="surat_persetujuan_berlayar" className="text-sm">Surat Persetujuan Berlayar</Label>
                        <Input
                            type="file"
                            id="surat_persetujuan_berlayar"
                            className="w-full md:w-2/3"
                            placeholder="Masukkan lokasi tujuan"
                            onChange={(e) => setData('surat_persetujuan_berlayar', e.target.files![0])}
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <Button
                        type="submit"
                        className="rounded-full p-4 flex items-center justify-center gap-2"
                        disabled={processing}
                    >
                        <CheckIcon></CheckIcon>
                        Simpan
                    </Button>
                </div>
            </div>
        </form>
    )
}