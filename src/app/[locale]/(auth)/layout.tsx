import LanguageSelector from "@/components/global/language-selector";
import { Headset } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen w-full bg-loomi-bg-dark text-white">
            <div className="flex w-full flex-col justify-center px-8 sm:px-12 lg:w-1/2 xl:p-12">
                <div className="mx-auto w-full h-full">
                    {children}
                </div>
            </div>

            <div className="hidden w-1/2 lg:flex items-center justify-center flex-col p-12">
                <div className="relative bg-[url('/images/login-image.png')] bg-cover bg-center h-full w-full rounded-[72px] flex flex-col items-center justify-center">
                    <div className="absolute top-0 right-0 bg-loomi-bg-dark pl-4 pb-4 rounded-bl-[24px] before:absolute before:content-[''] before:w-6 before:h-6 before:bg-transparent before:-left-6 before:top-0 before:rounded-tr-[24px] before:shadow-[10px_-10px_0_10px_#0b1125] after:absolute after:content-[''] after:w-6 after:h-6 after:bg-transparent after:-bottom-6 after:right-0 after:rounded-tr-[24px] after:shadow-[10px_-10px_0_10px_#0b1125]">

                        <div className="flex items-start gap-4">
                            <div className="bg-loomi-bg-card p-7 rounded-full flex items-center gap-2">
                                <Headset className="w-6 h-6" /> <p className="font-bold">Ajuda</p>
                            </div>

                            <LanguageSelector />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
