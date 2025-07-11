import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Head, Link, router, usePage } from "@inertiajs/react"
import { CheckCircle2Icon, PencilIcon, Trash2Icon } from "lucide-react"
import Swal from "sweetalert2"

export default function PengajuanDetails() {
    const onDelete = (id: number) => {
        Swal.fire({
            title: 'Hapus pengajuan?',
            text: 'Pengajuan yang dihapus juga akan menghapus dokumennya dan tidak dapat dikembalikan!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#fff',
            customClass: {
                confirmButton: 'order-1',
                cancelButton: 'border-2 border-gray-900 text-gray-900 order-2',
            },
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/pengajuan/${id}`);
            }
        });
    }
    const { pengajuan } = usePage().props;
    return (
        <>
            <Head title="Detail Pengajuan | Trader 88" />
            <div className="w-full bg-[#F7F7F7] min-h-screen flex flex-col gap-4 p-2 md:p-4">
                <Header
                    page="pengajuan"
                />
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex flex-col justify-between items-start gap-4">
                                <div className="w-full flex items-center justify-between">
                                    <h3>Detail Pengajuan</h3>
                                    <div className={`flex items-center p-3 rounded-full text-sm ${pengajuan.status === 'dimuat' ? 'bg-orange-500 text-white' : 'bg-transparent border border-orange-500 text-orange-500'} gap-2`}>
                                        {pengajuan.status === 'dimuat' ? (
                                            <>
                                                <CheckCircle2Icon />
                                                DIMUAT
                                            </>
                                        ) : 'BELUM DIMUAT'}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/pengajuan/${pengajuan.id}/edit`}
                                        className="flex items-center gap-2"
                                    >
                                        <Button className="flex items-center rounded-full">
                                            <PencilIcon />
                                            <span className="hidden md:inline">Edit</span>
                                        </Button>
                                    </Link>

                                    <Button
                                        className="flex items-center rounded-full bg-red-500 hover:bg-red-600"
                                        onClick={() => onDelete(pengajuan.id)}>
                                        <Trash2Icon />
                                        <span className="hidden md:inline">Hapus</span>
                                    </Button>
                                </div>
                            </div>
                        </CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PengajuanData />
                    </CardContent>
                    <CardFooter></CardFooter>
                </Card>
            </div>
        </>

    )
}

function PengajuanData() {
    const { pengajuan } = usePage().props;
    const { dokumen } = usePage().props;
    return (
        <div className="flex flex-col md:flex-row w-full w-full justify-between gap-4 overflow-hidden">
            <div className="flex flex-col gap-2 w-full md:w-1/2">
                <div className="flex-col gap-2">
                    <h3 className="font-bold text-sm">Pembeli</h3>
                    <span className="">{pengajuan.pembeli}</span>
                </div>
                <div className="flex-col gap-2">
                    <h3 className="font-bold text-sm">Tanggal</h3>
                    <span className="">{pengajuan.tanggal}</span>
                </div>
                <div className="flex-col gap-2">
                    <h3 className="font-bold text-sm">Lokasi Muat</h3>
                    <span className="">{pengajuan.lokasi_muat}</span>
                </div>
                <div className="flex-col gap-2">
                    <h3 className="font-bold text-sm">Lokasi Tujuan</h3>
                    <span className="">{pengajuan.lokasi_tujuan}</span>
                </div>
                <div className="flex-col gap-2">
                    <h3 className="font-bold text-sm">Kuantitas</h3>
                    <span className="">{pengajuan.kuantitas}</span>
                </div>
                <div className="flex-col gap-2">
                    <h3 className="font-bold text-sm">Kadar Nikel</h3>
                    <span className="">{pengajuan.kadar_nikel}</span>
                </div>

                <div className="flex-col gap-2">
                    <h3 className="font-bold text-sm">Kapal</h3>
                    <span className="">{pengajuan.kapal}</span>
                </div>
            </div>
            <div className="flex w-full md:w-1/2">
                <div className="flex flex-col gap-2 w-full md:w-1/2">
                    <h3 className="font-bold text-sm">Dokumen</h3>
                    <div className="flex-col gap-2">
                        <h3 className="font-bold text-sm">Shipping Instruction</h3>
                        {dokumen.shipping_instruction ? (
                            <a
                                href={`/storage/${dokumen.shipping_instruction.path_file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="underline">{dokumen.shipping_instruction.nama_file}</span>
                            </a>
                        ) : (
                            <span className="text-gray-400 italic">Tidak ada dokumen</span>
                        )}
                    </div>
                    <div className="flex-col gap-2">
                        <h3 className="font-bold text-sm">Kelengkapan Kapal</h3>
                        {dokumen.kelengkapan_kapal ? (
                            <a
                                href={`/storage/${dokumen.kelengkapan_kapal.path_file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="underline">{dokumen.kelengkapan_kapal.nama_file}</span>
                            </a>
                        ) : (
                            <span className="text-gray-400 italic">Tidak ada dokumen</span>
                        )}
                    </div>
                    <div className="flex-col gap-2">
                        <h3 className="font-bold text-sm">Laporan Hasil Verifikasi</h3>
                        {dokumen.laporan_hasil_verifikasi ? (
                            <a
                                href={`/storage/${dokumen.laporan_hasil_verifikasi.path_file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="underline">{dokumen.laporan_hasil_verifikasi.nama_file}</span>
                            </a>
                        ) : (
                            <span className="text-gray-400 italic">Tidak ada dokumen</span>
                        )}
                    </div>
                    <div className="flex-col gap-2">
                        <h3 className="font-bold text-sm">Final Draft Survey</h3>
                        {dokumen.final_draft_survey ? (
                            <a
                                href={`/storage/${dokumen.final_draft_survey.path_file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="underline">{dokumen.final_draft_survey.nama_file}</span>
                            </a>
                        ) : (
                            <span className="text-gray-400 italic">Tidak ada dokumen</span>
                        )}
                    </div>
                    <div className="flex-col gap-2">
                        <h3 className="font-bold text-sm">Bukti Pembayaran</h3>
                        {dokumen.bukti_pembayaran ? (
                            <a
                                href={`/storage/${dokumen.bukti_pembayaran.path_file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="underline">{dokumen.bukti_pembayaran.nama_file}</span>
                            </a>
                        ) : (
                            <span className="text-gray-400 italic">Tidak ada dokumen</span>
                        )}
                    </div>
                    <div className="flex-col gap-2">
                        <h3 className="font-bold text-sm">Surat Persetujuan Berlayar</h3>
                        {dokumen.surat_persetujuan_berlayar ? (
                            <a
                                href={`/storage/${dokumen.surat_persetujuan_berlayar.path_file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="underline">{dokumen.surat_persetujuan_berlayar.nama_file}</span>
                            </a>
                        ) : (
                            <span className="text-gray-400 italic">Tidak ada dokumen</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}