import { RegisterForm } from "@/components/form/register-form"

export default function LoginPage() {

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-orange-300 p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <RegisterForm />
            </div>
        </div>
    )
}
