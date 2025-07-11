import { CheckIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function AlatFormCreate() {
    const { data, setData, post, processing, errors } = useForm({
        alat: '',
    })
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/alat', { forceFormData: true });
    };
    useEffect(() => {
        if (errors.alat) {
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
                        <Label htmlFor="alat" className="text-sm">Alat</Label>
                        <Input
                            type="text"
                            id="pembeli"
                            value={data.alat}
                            onChange={(e) => setData('alat', e.target.value)}
                            className="w-full md:w-2/3"
                            placeholder="Masukkan alat"
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