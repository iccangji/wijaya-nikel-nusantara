import AlatCard from "@/components/card/alat-card";
import Header from "@/components/header";
import OperasionalCard from "@/components/card/operasional-card";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { Head } from '@inertiajs/react'
export default function Operasional() {

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
            <Head title="Operasional | Trader 88" />
            <div className="w-full bg-[#F7F7F7] min-h-screen flex flex-col gap-4 p-2 md:p-4 overflow-hidden">
                <Header
                    page="operasional"
                />
                <div className="flex flex-col md:flex-row w-full w-full justify-between gap-4 overflow-hidden">
                    <div className="flex w-full md:w-1/2 pb-2">
                        <OperasionalCard
                        />
                    </div>
                    <div className="flex w-full md:w-1/2 pb-2">
                        <AlatCard />
                    </div>
                </div>
            </div>
        </>
    )
}