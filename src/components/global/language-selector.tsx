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
import Image from "next/image";

export default function LanguageSelector() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const onSelectChange = (nextLocale: string) => {
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <Select defaultValue={locale} onValueChange={onSelectChange}>
            <SelectTrigger className="cursor-pointer bg-[#171d30] border-none font-bold rounded-full text-white p-8">
                <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent className="bg-[#171d30] border-none text-white rounded-[24px]">
                <SelectItem value="pt" className="cursor-pointer focus:bg-[#ffffff]/10 focus:text-white rounded-[16px]">
                    <div className="flex items-center gap-2">
                        <Image src="/icons/br_circle.svg" alt="BR" width={24} height={24} className="w-6 h-6 rounded-full" />
                        PT-br
                    </div>
                </SelectItem>
                <SelectItem value="en" className="cursor-pointer focus:bg-[#ffffff]/10 focus:text-white rounded-[16px]">
                    <div className="flex items-center gap-2">
                        <Image src="/icons/us_circle.svg" alt="US" width={24} height={24} className="w-6 h-6 rounded-full" />
                        EN-us
                    </div>
                </SelectItem>
            </SelectContent>
        </Select>
    );
}
