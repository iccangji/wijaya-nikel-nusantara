import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import dokumenData from "../../data/dokumen";
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
import { Link, usePage } from "@inertiajs/react";
import dateLocaleString from "@/utils/dateLocaleString";

export default function PengajuanCard() {
    const { dokumenData } = usePage().props;
    return (
        <Card className="w-full rounded-2xl">
            <CardHeader>
                <CardTitle className="mt-2">
                    <p>Dokumen Terbaru</p>
                </CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[400px] md:h-[300px]">
                    <Table>
                        <TableCaption></TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Tanggal</TableHead>
                                <TableHead className="text-center">Dokumen</TableHead>
                                <TableHead className="text-center">Pembeli</TableHead>
                                <TableHead className="text-center">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                dokumenData.map((dokumen: any, idx: number) => (
                                    <TableRow
                                        key={idx}
                                        className="cursor-pointer"
                                    >
                                        <TableCell className="font-medium">
                                            {dateLocaleString(dokumen.updated_at)}
                                        </TableCell>
                                        <TableCell className="text-center">{dokumen.jenis_dokumen}</TableCell>
                                        <TableCell className="text-center truncate text-wrap">{dokumen.pengajuan.pembeli}</TableCell>
                                        <TableCell className="flex justify-center">
                                            <a
                                                href={`/storage/${dokumen.path_file}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Button className="p-2">Lihat</Button>
                                            </a>
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