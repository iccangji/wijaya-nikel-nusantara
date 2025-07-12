import { Link } from "@inertiajs/react";
import { UserIcon } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button";
import { usePage, router } from '@inertiajs/react';

type HeaderProps = {
    page: string
}
export default function Header({ page }: HeaderProps) {
    const { auth } = usePage().props;

    const handleLogout = () => {
        router.post('/logout');
    };
    return (
        <div className="flex items-center justify-between bg-orange-400 px-4 py-2 md:py-4 sm:px-6 text-white rounded-full mt-4 md:mt-0 shadow-md">
            <div className="flex flex-1 items-center justify-between">
                <h1 className="text-sm md:text-lg font-semibold">
                    <Link href={auth.user.role === "operasional" ? "/operasional" : "/"}>TRADER 88</Link>
                </h1>
                {auth.user.role === "admin" && (
                    <div className="">
                        <nav className="text-white px-4 py-3 flex items-center justify-between">
                            <ul className="flex space-x-6">
                                <li><Link href="/" className={`${page === "pengajuan" ? "font-bold" : ""}`}>Pengajuan</Link></li>
                                <li><Link href="/operasional" className={`${page === "operasional" ? "font-bold" : ""}`}>Operasional</Link></li>
                            </ul>
                        </nav>
                    </div>
                )}
                <div className="rounded-full bg-gray-300 p-2 w-8 h-8 flex items-center justify-center">
                    <Popover>
                        <PopoverTrigger className="cursor-pointer">
                            <UserIcon
                                className="text-white"
                                width={20}
                                height={20}
                            />
                        </PopoverTrigger>
                        <PopoverContent className="p-2 m-2 w-24">
                            <div className="flex flex-col justify-start gap-2">
                                {auth.user.username}
                                <hr />
                                <Button
                                    variant={"destructive"}
                                    onClick={handleLogout}
                                >Logout</Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div >
    )
}