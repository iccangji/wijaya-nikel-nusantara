import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useForm } from "@inertiajs/react"
import Swal from "sweetalert2"
import { useEffect, useState } from "react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { data, setData, post, processing, errors } = useForm({
    username: '',
    password: '',
  });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/login');
  };

  useEffect(() => {
    if (errors.username || errors.password) {
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
        title: 'Username atau password salah'
      })
    }


  }, [errors]);

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <Card className="overflow-hidden border-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={submit}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-start text-left">
                <h1 className="text-md font-bold">PT. Wijaya Nikel Nusantara</h1>
              </div>
              <p className="font-bold text-xl md:mt-2">
                Selamat Datang!
              </p>
              <div className="grid gap-2 mt-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="username"
                  value={data.username}
                  onChange={(e) => setData('username', e.target.value)}
                  placeholder="Masukkan username"
                  required
                />
              </div>
              <div className="grid gap-2 mt-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  placeholder="Masukkan password"
                  required />
              </div>
              <Button type="submit" disabled={processing} className="w-full mt-2">
                Login
              </Button>
              {/* <Link
                href="/register"
              >
                <Button variant={"outline"} className="w-full">
                  Buat akun
                </Button>
              </Link> */}
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/images/truck.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
