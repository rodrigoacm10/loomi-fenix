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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";


const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: "icon1.svg" },
    { name: "Tickets", href: "/tickets", icon: "icon1.svg" },
    { name: "Chat", href: "/chat", icon: "icon1.svg" },
    { name: "Simulator", href: "/simulator", icon: "icon1.svg" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="h-screen py-6 sticky top-0 z-40">
            <div className="absolute top-0 flex bg-[#20273e] h-screen flex-col items-center py-6 w-[130px] rounded-r-[40px] shadow-[4px_0px_20px_0px_rgba(0,0,0,0.5)] flex z-50">

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
                            const isActive = pathname.startsWith(item.href);

                            return (
                                <Tooltip key={item.href} delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "flex h-14 w-14 items-center justify-center rounded-lg transition-colors hover:bg-muted",
                                                isActive ? "bg-[#1876D2] text-primary" : "text-muted-foreground bg-[#2b3248]"
                                            )}
                                        >
                                            <div className="relative h-7 w-7">
                                                <Image
                                                    src={`/icons/sidebar/${item.icon}`}
                                                    alt={item.name}
                                                    fill
                                                    className={cn("object-contain", "grayscale")}
                                                />
                                            </div>
                                            <span className="sr-only">{item.name}</span>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">{item.name}</TooltipContent>
                                </Tooltip>
                            )
                        })}
                    </TooltipProvider>
                </nav>

                <div className="mt-auto">
                    <TooltipProvider>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                                <div className="bg-primary/10 p-1 rounded-full cursor-pointer">
                                    <Avatar className="h-10 w-10 border-2 border-white">
                                        <AvatarImage src="" alt="User" />
                                        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">AC</AvatarFallback>
                                    </Avatar>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="right">User Profile</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div>
    );
}
