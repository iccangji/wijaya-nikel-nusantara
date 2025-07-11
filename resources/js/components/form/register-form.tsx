import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useForm } from "@inertiajs/react"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { data, setData, post, processing, errors } = useForm({
    username: '',
    password: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/register');
  };


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden border-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={submit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-start text-left">
                <h1 className="text-md font-bold">PT. Wijaya Nikel Nusantara</h1>
              </div>
              <p className="font-bold text-xl md:mt-4">
                Buat Akun
              </p>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="username"
                  value={data.username}
                  onChange={(e) => setData('username', e.target.value)}
                  placeholder="Masukkan username"
                  required
                />
                {errors.username && <p className="text-red-500">{errors.username}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={data.password}
                  placeholder="Masukkan password"
                  onChange={(e) => setData('password', e.target.value)}
                  required />
                {errors.password && <p className="text-red-500">{errors.password}</p>}
              </div>
              <Button type="submit" disabled={processing} className="w-full">
                Buat Akun
              </Button>
            </div>
            <div className="my-4"></div>
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
