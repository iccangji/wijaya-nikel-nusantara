import OperasionalFormCreate from "@/components/form/operasional-form-create";
import Header from "@/components/header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Head } from "@inertiajs/react";

export default function OperationalCreate() {
    return (
        <>
            <Head title="Tambah Operasional | Trader 88" />
            <div className="w-full bg-[#F7F7F7] min-h-screen flex flex-col gap-4 p-2 md:p-4">
                <Header
                    page="operasional"
                />
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <h3>Tambah Operasional</h3>
                            </div>
                        </CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <OperasionalFormCreate />
                    </CardContent>
                    <CardFooter></CardFooter>
                </Card>
            </div>
        </>
    )
}