import { PlusIcon, PrinterIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import pengajuanData from "../../data/pengajuan";
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Link, router, usePage } from "@inertiajs/react";
import { formatCurrency } from "@/utils/formatCurrency";
export default function PengajuanCard() {
    const { pengajuanData } = usePage().props;
    return (
        <Card className="w-full rounded-2xl">
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-between items-center">
                        <p>Pengajuan</p>
                        <div className="flex items-center gap-4">
                            <a
                                href="/pengajuan/print"
                                className="cursor-pointer text-gray-400 hover:text-gray-600"
                                target="_blank"
                            >
                                <PrinterIcon />
                            </a>
                            <Link
                                href="/pengajuan/tambah"
                                className="flex items-center gap-2"
                            >
                                <Button className="flex items-center rounded-full">
                                    <PlusIcon />
                                    <span>Tambahkan</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[360px] md:h-[300px]">
                    <Table>
                        <TableCaption></TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Tanggal</TableHead>
                                <TableHead className="text-center">Pembeli</TableHead>
                                <TableHead className="text-center hidden md:table-cell">Tujuan</TableHead>
                                <TableHead className="text-center hidden md:table-cell">Pembayaran</TableHead>
                                <TableHead className="text-center">Muatan</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                pengajuanData.map((pengajuan: any, idx: number) => (
                                    <TableRow
                                        key={idx}
                                        onClick={() => router.visit(`/pengajuan/${pengajuan.id}`)}
                                        className="cursor-pointer"
                                    >
                                        <TableCell className="font-medium">{pengajuan.tanggal}</TableCell>
                                        <TableCell className="text-center">{pengajuan.pembeli}</TableCell>
                                        <TableCell className="text-center hidden md:table-cell">{pengajuan.lokasi_tujuan}</TableCell>
                                        <TableCell className="text-center hidden md:table-cell">{pengajuan.pembayaran ? formatCurrency(pengajuan.pembayaran) : ''}</TableCell>
                                        <TableCell className="text-center">{pengajuan.kuantitas}</TableCell>
                                        <TableCell className="flex justify-center w-full">
                                            <span className={`text-center rounded-md p-2 w-full md:w-1/2 text-center ${pengajuan.status === 'dimuat' ? 'bg-orange-400 text-white' : 'bg-transparent border border-orange-400 text-orange-400'}`}>{`${pengajuan.status === 'dimuat' ? 'Dimuat' : 'Belum Dimuat'}`}</span>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </ScrollArea>
            </CardContent>
            <CardFooter></CardFooter>
        </Card>
    )
}