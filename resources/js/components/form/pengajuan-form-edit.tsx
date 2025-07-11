import { CheckIcon, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { router, useForm, usePage, } from "@inertiajs/react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function PengajuanFormEdit() {
    const { pengajuan, dokumen, flash } = usePage().props;
    console.log(dokumen);

    const { data, setData, post, processing, errors } = useForm({
        tanggal: pengajuan.tanggal || '',
        pembeli: pengajuan.pembeli || '',
        kuantitas: pengajuan.kuantitas || '',
        kadar_nikel: pengajuan.kadar_nikel || '',
        lokasi_muat: pengajuan.lokasi_muat || '',
        lokasi_tujuan: pengajuan.lokasi_tujuan || '',
        pembayaran: pengajuan.pembayaran || '',
        kapal: pengajuan.kapal || '',
        status: pengajuan.status || '',
        shipping_instruction: null as File | null,
        final_draft_survey: null as File | null,
        kelengkapan_kapal: null as File | null,
        bukti_pembayaran: null as File | null,
        laporan_hasil_verifikasi: null as File | null,
        surat_persetujuan_berlayar: null as File | null
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/pengajuan/${pengajuan.id}/?_method=PUT`, { forceFormData: true });
    };

    const deleteDokumen = (dokumen: number) => {
        Swal.fire({
            title: 'Apakah anda yakin ingin menghapus dokumen ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#fff',
            customClass: {
                confirmButton: 'order-1',
                cancelButton: 'border-2 border-gray-900 text-gray-900 order-2',
            },
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/dokumen/${dokumen}`);
            }
        });
    };

    useEffect(() => {
        if (Object.keys(errors).length) {
            Swal.fire({
                icon: 'error',
                title: 'Terdapat kesalahan dalam data',
                toast: true,
                position: 'top-end',
                timer: 3000,
                showConfirmButton: false
            });
        }

        if (flash.success) {
            Swal.fire({
                icon: 'success',
                title: flash.success,
                toast: true,
                position: 'top-end',
                timer: 3000,
                showConfirmButton: false
            });
        }
    }, [errors, flash]);

    return (
        <form onSubmit={submit}>
            <div className="flex-col gap-4">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="tanggal">Tanggal</Label>
                        <Input
                            type="date"
                            id="tanggal"
                            value={data.tanggal}
                            onChange={(e) => setData('tanggal', e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="pembeli">Pembeli</Label>
                        <Input
                            type="text"
                            id="pembeli"
                            value={data.pembeli}
                            onChange={(e) => setData('pembeli', e.target.value)}
                            placeholder="Masukkan pembeli"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="kuantitas">Kuantitas</Label>
                        <Input
                            type="text"
                            id="kuantitas"
                            value={data.kuantitas}
                            onChange={(e) => setData('kuantitas', e.target.value)}
                            placeholder="Masukkan kuantitas"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="kadar_nikel">Kadar Nikel</Label>
                        <Input
                            type="text"
                            id="kadar_nikel"
                            value={data.kadar_nikel}
                            onChange={(e) => setData('kadar_nikel', e.target.value)}
                            placeholder="Masukkan kadar nikel"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="lokasi_muat">Lokasi Muat</Label>
                        <Input
                            type="text"
                            id="lokasi_muat"
                            value={data.lokasi_muat}
                            onChange={(e) => setData('lokasi_muat', e.target.value)}
                            placeholder="Masukkan lokasi muat"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="lokasi_tujuan">Lokasi Tujuan</Label>
                        <Input
                            type="text"
                            id="lokasi_tujuan"
                            value={data.lokasi_tujuan}
                            onChange={(e) => setData('lokasi_tujuan', e.target.value)}
                            placeholder="Masukkan lokasi tujuan"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="pembayaran">Pembayaran</Label>
                        <Input
                            type="text"
                            id="pembayaran"
                            value={data.pembayaran}
                            onChange={(e) => setData('pembayaran', e.target.value)}
                            placeholder="Masukkan pembayaran"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="kapal">Kapal</Label>
                        <Input
                            type="text"
                            id="kapal"
                            value={data.kapal}
                            onChange={(e) => setData('kapal', e.target.value)}
                            placeholder="Masukkan kapal"
                        />
                    </div>

                </div>

                <p className="font-semibold mt-6">Dokumen</p>

                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
                    {dokumen.shipping_instruction ? (
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="shipping_instruction">Shipping Instruction</Label>
                            <div className="flex justify-between">
                                <a
                                    href={dokumen.shipping_instruction.path_file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline"
                                >
                                    {dokumen.shipping_instruction.nama_file}
                                </a>
                                <div className="button">
                                    <Trash2Icon
                                        className="text-red-500 cursor-pointer"
                                        onClick={() => deleteDokumen(dokumen.shipping_instruction.id)}
                                    >
                                    </Trash2Icon>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="shipping_instruction">Shipping Instruction</Label>
                            <Input
                                type="file"
                                id="shipping_instruction"
                                onChange={(e) => setData('shipping_instruction', e.target.files![0])}
                            />
                        </div>
                    )}
                    {dokumen.final_draft_survey ? (
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="final_draft_survey">Final Draft Survey</Label>
                            <div className="flex justify-between">
                                <a
                                    href={dokumen.final_draft_survey.path_file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline"
                                >
                                    {dokumen.final_draft_survey.nama_file}
                                </a>
                                <div className="button">
                                    <Trash2Icon
                                        className="text-red-500 cursor-pointer"
                                        onClick={() => deleteDokumen(dokumen.final_draft_survey.id)}
                                    >
                                    </Trash2Icon>                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="final_draft_survey">Final Draft Survey</Label>
                            <Input
                                type="file"
                                id="final_draft_survey"
                                onChange={(e) => setData('final_draft_survey', e.target.files![0])}
                            />
                        </div>
                    )}

                    {dokumen.kelengkapan_kapal ? (
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="kelengkapan_kapal">Kelengkapan Kapal</Label>
                            <div className="flex justify-between">
                                <a
                                    href={dokumen.kelengkapan_kapal.path_file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline"
                                >
                                    {dokumen.kelengkapan_kapal.nama_file}
                                </a>
                                <div className="button">
                                    <Trash2Icon
                                        className="text-red-500 cursor-pointer"
                                        onClick={() => deleteDokumen(dokumen.kelengkapan_kapal.id)}
                                    >
                                    </Trash2Icon>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="kelengkapan_kapal">Kelengkapan Kapal</Label>
                            <Input
                                type="file"
                                id="kelengkapan_kapal"
                                onChange={(e) => setData('kelengkapan_kapal', e.target.files![0])}
                            />
                        </div>
                    )}

                    {dokumen.bukti_pembayaran ? (
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="bukti_pembayaran">Bukti Pembayaran</Label>
                            <div className="flex justify-between">
                                <a
                                    href={dokumen.bukti_pembayaran.path_file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline"
                                >
                                    {dokumen.bukti_pembayaran.nama_file}
                                </a>
                                <div className="button">
                                    <Trash2Icon
                                        className="text-red-500 cursor-pointer"
                                        onClick={() => deleteDokumen(dokumen.bukti_pembayaran.id)}
                                    >
                                    </Trash2Icon>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="bukti_pembayaran">Bukti Pembayaran</Label>
                            <Input
                                type="file"
                                id="bukti_pembayaran"
                                onChange={(e) => setData('bukti_pembayaran', e.target.files![0])}
                            />
                        </div>
                    )}

                    {dokumen.laporan_hasil_verifikasi ? (
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="laporan_hasil_verifikasi">Laporan Hasil Verifikasi</Label>
                            <div className="flex justify-between">
                                <a
                                    href={dokumen.laporan_hasil_verifikasi.path_file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline"
                                >
                                    {dokumen.laporan_hasil_verifikasi.nama_file}
                                </a>
                                <div className="button">
                                    <Trash2Icon
                                        className="text-red-500 cursor-pointer"
                                        onClick={() => deleteDokumen(dokumen.laporan_hasil_verifikasi.id)}
                                    >
                                    </Trash2Icon>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="laporan_hasil_verifikasi">Laporan Hasil Verifikasi</Label>
                            <Input
                                type="file"
                                id="laporan_hasil_verifikasi"
                                onChange={(e) => setData('laporan_hasil_verifikasi', e.target.files![0])}
                            />
                        </div>
                    )}

                    {dokumen.surat_persetujuan_berlayar ? (
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="surat_persetujuan_berlayar">Surat Persetujuan Berlayar</Label>
                            <div className="flex justify-between">
                                <a
                                    href={dokumen.surat_persetujuan_berlayar.path_file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline"
                                >
                                    {dokumen.surat_persetujuan_berlayar.nama_file}
                                </a>
                                <div className="button">
                                    <Trash2Icon
                                        className="text-red-500 cursor-pointer"
                                        onClick={() => deleteDokumen(dokumen.surat_persetujuan_berlayar.id)}
                                    >
                                    </Trash2Icon>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="surat_persetujuan_berlayar">Surat Persetujuan Berlayar</Label>
                            <Input
                                type="file"
                                id="surat_persetujuan_berlayar"
                                onChange={(e) => setData('surat_persetujuan_berlayar', e.target.files![0])}
                            />
                        </div>
                    )}
                </div>

                <div className="mt-6">
                    <Button
                        type="submit"
                        className="rounded-full p-4 flex items-center justify-center gap-2"
                        disabled={processing}
                    >
                        <CheckIcon /> Simpan
                    </Button>
                </div>
            </div>
        </form>
    );
}