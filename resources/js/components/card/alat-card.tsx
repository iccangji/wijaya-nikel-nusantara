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
export default function AlatCard() {
    const { alatData } = usePage().props;
    return (
        <Card className="w-full rounded-2xl">
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-between items-center">
                        <p>Alat</p>
                        <div className="flex gap-2 items-center">
                            <a
                                href="/alat/print"
                                className="cursor-pointer text-gray-400 hover:text-gray-600"
                                target="_blank"
                            >
                                <PrinterIcon />
                            </a>
                            <Link
                                href="/alat/tambah"
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
                                <TableHead className="text-center">Alat</TableHead>
                                <TableHead className="text-center">Jam Operasional</TableHead>
                                <TableHead className="text-center">Retase</TableHead>
                                <TableHead className="text-center">Solar</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                alatData.map((alat: any, idx: number) => (
                                    <TableRow
                                        key={idx}
                                        onClick={() => router.visit(`/alat/${alat.id}`)}
                                        className="cursor-pointer"
                                    >
                                        <TableCell className="text-center">{alat.alat}</TableCell>
                                        <TableCell className="text-center">{alat.operasional_sum_jam_operasional ? alat.operasional_sum_jam_operasional : 0}</TableCell>
                                        <TableCell className="text-center">{alat.operasional_sum_retase ? alat.operasional_sum_retase : 0}</TableCell>
                                        <TableCell className="text-center">{alat.operasional_sum_solar ? alat.operasional_sum_solar : 0}</TableCell>
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