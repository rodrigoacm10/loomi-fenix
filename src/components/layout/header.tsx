"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/tickets": "Tickets",
    "/chat": "Chat",
    "/simulator": "Simulator",
};

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTicketStore } from "@/store/ticket-store";

export function Header() {
    const pathname = usePathname();
    const currentTitle = Object.entries(pageTitles).find(([path]) => pathname.startsWith(path))?.[1] || "Dashboard";
    const { openTicketModal } = useTicketStore();

    return (
        <header className="bg-[#20273e] sticky top-0 z-30 flex h-18 w-full items-center px-6 text-white">
            <div className="ml-[130px] flex items-center justify-between w-full">
                <h1 className="text-xl font-semibold">{currentTitle}</h1>

                {pathname === "/tickets" && (
                    <Button
                        onClick={() => openTicketModal()}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Novo Ticket
                    </Button>
                )}
            </div>
        </header>
    );
}
