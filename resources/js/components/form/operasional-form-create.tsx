import { CheckIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
export default function OperasionalFormCreate() {
    const { alatData } = usePage().props
    const { data, setData, post, processing, errors } = useForm({
        tanggal: '',
        alat_id: '',
        jam_operasional: '',
        retase: '',
        solar: '',
    })
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/operasional');
    };
    useEffect(() => {
        if (errors.tanggal || errors.alat_id || errors.jam_operasional || errors.retase || errors.solar) {
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

            Toast.fire({
                icon: 'error',
                title: 'Terdapat kesalahan dalam data'
            })
        }
    }, [errors]);
    return (
        <form action="" onSubmit={submit}>
            <div className="flex-col gap-4">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="tanggal" className="text-sm">Tanggal</Label>
                        <Input
                            type="date"
                            id="tanggal"
                            value={data.tanggal}
                            onChange={(e) => setData('tanggal', e.target.value)}
                            className="w-full md:w-2/3"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="alat_id" className="text-sm">Alat</Label>
                        <Select
                            value={data.alat_id}
                            onValueChange={(e) => setData('alat_id', e)}
                        >
                            <SelectTrigger className="w-full md:w-2/3">
                                <SelectValue placeholder="Pilih Alat" />
                            </SelectTrigger>
                            <SelectContent>
                                {alatData.map((alat: any, index: number) => (
                                    <SelectItem value={alat.id.toString()} key={index}>{alat.alat}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="jam_operasional" className="text-sm">Jam Operasional</Label>
                        <Input
                            type="text"
                            id="jam_operasional"
                            value={data.jam_operasional}
                            onChange={(e) => setData('jam_operasional', e.target.value)}
                            className="w-full md:w-2/3"
                            placeholder="Masukkan jam operasional"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="retase" className="text-sm">Retase</Label>
                        <Input
                            type="text"
                            id="retase"
                            value={data.retase}
                            onChange={(e) => setData('retase', e.target.value)}
                            className="w-full md:w-2/3"
                            placeholder="Masukkan retase"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="solar" className="text-sm">Solar</Label>
                        <Input
                            type="text"
                            id="solar"
                            value={data.solar}
                            onChange={(e) => setData('solar', e.target.value)}
                            className="w-full md:w-2/3"
                            placeholder="Masukkan solar"
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <Button
                        type="submit"
                        className="rounded-full p-4 flex items-center justify-center gap-2"
                        disabled={processing}
                    >
                        <CheckIcon></CheckIcon>
                        Simpan
                    </Button>
                </div>
            </div>
        </form>
    )
}