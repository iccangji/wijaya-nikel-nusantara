import Header from "@/components/header";
import PengajuanForm from "@/components/form/pengajuan-form-create";
import PengajuanFormEdit from "@/components/form/pengajuan-form-edit";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Head } from "@inertiajs/react";

export default function PengajuanEdit() {
    return (
        <>
            <Head title="Edit Pengajuan | Trader 88" />
            <div className="w-full bg-[#F7F7F7] min-h-screen flex flex-col gap-4 p-2 md:p-4">
                <Header page="pengajuan" />
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <h3>Edit Pengajuan</h3>
                            </div>
                        </CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PengajuanFormEdit />
                    </CardContent>
                    <CardFooter></CardFooter>
                </Card>
            </div>
        </>
    )
}