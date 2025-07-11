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

export default function OperasionalDetails() {
    const onDelete = (id: number) => {
        Swal.fire({
            title: 'Hapus Operasional?',
            text: 'Yakin menghapus data?',
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
                router.delete(`/operasional/${id}`);
            }
        });
    }
    const { operasional } = usePage().props;
    return (
        <>
            <Head title="Detail Operasional | Trader 88" />
            <div className="w-full bg-[#F7F7F7] min-h-screen flex flex-col gap-4 p-2 md:p-4">
                <Header
                    page="operasional"
                />
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex flex-col justify-between items-start gap-4">
                                <div className="w-full flex items-center justify-between">
                                    <h3>Detail Operasional</h3>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/operasional/${operasional.id}/edit`}
                                        className="flex items-center gap-2"
                                    >
                                        <Button className="flex items-center rounded-full">
                                            <PencilIcon />
                                            <span className="hidden md:inline">Edit</span>
                                        </Button>
                                    </Link>

                                    <Button
                                        className="flex items-center rounded-full bg-red-500 hover:bg-red-600"
                                        onClick={() => onDelete(operasional.id)}>
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
    const { operasional } = usePage().props;
    return (
        <div className="flex flex-col md:flex-row w-full w-full justify-between gap-4 overflow-hidden">
            <div className="flex flex-col gap-2 w-full md:w-1/2">
                <div className="flex-col gap-2">
                    <h3 className="font-bold text-sm">Tanggal</h3>
                    <span className="">{operasional.tanggal}</span>
                </div>
                <div className="flex-col gap-2">
                    <h3 className="font-bold text-sm">Alat</h3>
                    <span className="">{operasional.alat.alat}</span>
                </div>
                <div className="flex-col gap-2">
                    <h3 className="font-bold text-sm">Jam Operasional</h3>
                    <span className="">{operasional.jam_operasional}</span>
                </div>
                <div className="flex-col gap-2">
                    <h3 className="font-bold text-sm">Retase</h3>
                    <span className="">{operasional.retase}</span>
                </div>
                <div className="flex-col gap-2">
                    <h3 className="font-bold text-sm">Solar</h3>
                    <span className="">{operasional.solar}</span>
                </div>
            </div>
        </div>
    )
}