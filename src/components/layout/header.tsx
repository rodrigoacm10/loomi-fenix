"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
    "/dashboard": "dashboard",
    "/tickets": "tickets",
    "/chat": "chat",
    "/simulator": "simulator",
};

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTicketStore } from "@/store/ticket-store";
import { useTranslations } from "next-intl";
import { getCurrentPathname } from "@/utils/get-current-pathname";

export function Header() {
    const pathname = usePathname();
    const tNav = useTranslations("Navigation");
    const tHeader = useTranslations("Header");
    const activePath = getCurrentPathname(pathname);
    const currentKey = Object.entries(pageTitles).find(([path, value]) => path === activePath)?.[1] || "dashboard";
    const currentTitle = tNav(currentKey);
    const { openTicketModal } = useTicketStore();

    return (
        <header className="bg-[#20273e] sticky top-0 z-30 flex h-18 w-full items-center px-6 text-white">
            <div className="ml-[130px] flex items-center justify-between w-full">
                <h1 className="text-xl font-semibold">{currentTitle}</h1>

                {activePath === "/tickets" && (
                    <Button
                        onClick={() => openTicketModal()}
                        className="rounded-full bg-loomi-primary shadow-[0px_0px_20px_0px_rgba(24,118,210,0.5)] hover:bg-loomi-primary-hover"
                    >
                        <Plus className="h-4 w-4" /> {tHeader("newTicket")}
                    </Button>
                )}
            </div>
        </header>
    );
}
