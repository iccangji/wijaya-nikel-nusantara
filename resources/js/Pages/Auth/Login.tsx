import { LoginForm } from "@/components/form/login-form"
import { Head } from "@inertiajs/react"
export default function LoginPage() {
    return (
        <>
            <Head title="Login | Trader 88" />
            <div className="flex min-h-screen flex-col items-center justify-center bg-orange-300 p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-3xl">
                    <LoginForm />
                </div>
            </div>
        </>
    )
}
