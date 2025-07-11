import ChartCard from "@/components/card/chart-card";
import DokumenCard from "@/components/card/dokumen-card";
import Header from "@/components/header";
import PengajuanCard from "@/components/card/pengajuan-card";
import { Button } from "@/components/ui/button";
import { Head, usePage } from "@inertiajs/react";
import { PlusIcon } from "lucide-react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function Pengajuan() {
    const { flash } = usePage().props
    useEffect(() => {
        if (flash.success || flash.error) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            if (flash.success) {
                Toast.fire({
                    icon: 'success',
                    title: flash.success
                })
            } else {
                Toast.fire({
                    icon: 'error',
                    title: flash.error
                })
            }
        }
    }, []);
    return (
        <>
            <Head title="Pengajuan | Trader 88" />
            <div className="w-full bg-[#F7F7F7] min-h-screen flex flex-col gap-4 p-2 md:p-4 overflow-hidden">
                <Header
                    page="pengajuan"
                />
                <div className="flex flex-col md:flex-row w-full w-full justify-between gap-4 overflow-hidden">
                    <div className="flex w-full md:w-3/5 pb-2">
                        <PengajuanCard
                        />
                    </div>
                    <div className="flex w-full md:w-2/5 pb-2">
                        <DokumenCard />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row w-full w-full justify-between gap-4 overflow-hidden">
                    <div className="flex w-full pb-2">
                        <ChartCard />
                    </div>
                </div>
            </div>
        </>
    )
}