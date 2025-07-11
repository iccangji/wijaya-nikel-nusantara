import Header from "@/components/header";
import PengajuanForm from "@/components/form/pengajuan-form-create";
import PengajuanFormEdit from "@/components/form/pengajuan-form-edit";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AlatFormEdit from "@/components/form/alat-form-edit";
import { Head } from "@inertiajs/react";

export default function AlatEdit() {
    return (
        <>
            <Head title="Tambah Alat | Trader 88" />
            <div className="w-full bg-[#F7F7F7] min-h-screen flex flex-col gap-4 p-2 md:p-4">
                <Header page="operasional" />
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <h3>Edit Alat</h3>
                            </div>
                        </CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AlatFormEdit />
                    </CardContent>
                    <CardFooter></CardFooter>
                </Card>
            </div>
        </>
    )
}