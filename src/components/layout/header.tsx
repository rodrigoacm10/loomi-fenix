"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/tickets": "Tickets",
    "/chat": "Chat",
    "/simulator": "Simulator",
};

export function Header() {
    const pathname = usePathname();
    const currentTitle = Object.entries(pageTitles).find(([path]) => pathname.startsWith(path))?.[1] || "Dashboard";

    return (
        <header className="bg-[#20273e] sticky top-0 z-30 flex h-18 w-full items-center border-b px-6">
            <h1 className="text-xl font-semibold">{currentTitle}</h1>
        </header>
    );
}
