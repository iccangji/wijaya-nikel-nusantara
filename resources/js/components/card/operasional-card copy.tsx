import { PlusIcon } from "lucide-react";
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
export default function OperasionalCard() {
    const { operasionalData } = usePage().props;
    return (
        <Card className="w-full rounded-2xl">
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-between items-center">
                        <p>Operasional</p>
                        <Link
                            href="/operasional/tambah"
                            className="flex items-center gap-2"
                        >
                            <Button className="flex items-center rounded-full">
                                <PlusIcon />
                                <span>Tambahkan</span>
                            </Button>
                        </Link>
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
                                <TableHead className="text-center">Alat</TableHead>
                                <TableHead className="text-center hidden md:table-cell">Jam Operasional</TableHead>
                                <TableHead className="text-center hidden md:table-cell">Retase</TableHead>
                                <TableHead className="text-center">Solar</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                operasionalData.map((operasional: any, idx: number) => (
                                    <TableRow
                                        key={idx}
                                        onClick={() => router.visit(`/operasional/${operasional.id}`)}
                                        className="cursor-pointer"
                                    >
                                        <TableCell className="font-medium">{operasional.tanggal}</TableCell>
                                        <TableCell className="text-center">{operasional.alat}</TableCell>
                                        <TableCell className="text-center hidden md:table-cell">{operasional.jam_operasional}</TableCell>
                                        <TableCell className="text-center hidden md:table-cell">{formatCurrency(operasional.retase)}</TableCell>
                                        <TableCell className="text-center">{operasional.solar}</TableCell>
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