"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function LanguageSelector() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const onSelectChange = (nextLocale: string) => {
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <Select defaultValue={locale} onValueChange={onSelectChange}>
            <SelectTrigger className="w-[140px] border-[#ffffff]/40 bg-transparent text-white">
                <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="en">English</SelectItem>
            </SelectContent>
        </Select>
    );
}
