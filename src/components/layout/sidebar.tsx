"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { getCurrentPathname } from "@/utils/get-current-pathname";
import { Camera } from "lucide-react";


const navItems = [
    { key: "dashboard", href: "/dashboard", icon: "icon1.svg" },
    { key: "tickets", href: "/tickets", icon: "icon1.svg" },
    { key: "chat", href: "/chat", icon: "icon1.svg" },
    { key: "user", href: "/user", icon: "icon1.svg" },
    { key: "simulator", href: "/simulator", icon: "icon1.svg" },
];

export function Sidebar() {
    const pathname = usePathname();
    const t = useTranslations("Navigation");

    return (
        <div className="h-screen py-6 sticky top-0 z-40">
            <div className="absolute top-0 flex bg-[#20273e] h-screen flex-col items-center py-6 w-[130px] rounded-r-[40px] shadow-[4px_0px_20px_0px_rgba(0,0,0,0.5)] flex z-60">

                <div className="mb-8">
                    <Link href="/dashboard">
                        <div className="relative h-12 w-12">
                            <Image src="/icons/sidebar/logo.svg" alt="Logo" fill className="object-contain" />
                        </div>
                    </Link>
                </div>

                <nav className="flex flex-1 flex-col items-center justify-center gap-8">
                    <TooltipProvider>
                        {navItems.map((item) => {
                            const isActive = getCurrentPathname(pathname) === item.href;

                            return (
                                <Tooltip key={item.href} delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "flex h-14 w-14 items-center justify-center rounded-lg transition-colors hover:bg-loomi-primary",
                                                isActive ? "bg-loomi-primary shadow-[0px_0px_20px_0px_rgba(24,118,210,0.5)]" : "bg-[#2b3248]"
                                            )}
                                        >
                                            <div className="relative h-7 w-7">
                                                <Image
                                                    src={`/icons/sidebar/${item.icon}`}
                                                    alt={t(item.key)}
                                                    fill
                                                    className={cn("object-contain", "grayscale")}
                                                />
                                            </div>
                                            <span className="sr-only">{t(item.key)}</span>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent color="#1876D2" className="bg-loomi-primary text-white border-0" side="right">{t(item.key)}</TooltipContent>
                                </Tooltip>
                            )
                        })}
                    </TooltipProvider>
                </nav>

                <div className="mt-auto">
                    <TooltipProvider>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                                <Link href="/user">
                                    <div className="relative group cursor-pointer">
                                        <div className="h-14 w-14 border-4 border-loomi-primary rounded-full flex">
                                            <div className="bg-loomi-primary text-white  font-semibold rounded-full flex-1 flex items-center justify-center">
                                                <p>AC</p> </div>
                                        </div>
                                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Camera className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent className="bg-loomi-primary text-white border-0" side="right">User Profile</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>

            <div className="absolute top-0 h-1/2 w-[130px] bg-[#20273e] z-50 "></div>
        </div>
    );
}
