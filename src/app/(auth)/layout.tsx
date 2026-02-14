import Image from "next/image";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen w-full">
            {/* Left side - Form Area */}
            <div className="flex w-full flex-col justify-center px-8 sm:px-12 lg:w-1/2 xl:p-12">
                <div className="mx-auto w-full h-full">
                    {children}
                </div>
            </div>

            {/* Right side - Image/Branding Area */}
            <div className="hidden w-1/2 bg-slate-900 lg:flex items-center justify-center flex-col p-12">
                <div className="bg-[url('/images/login-image.png')] bg-cover bg-center h-full w-full rounded-[72px] flex flex-col items-center justify-center">
                </div>


            </div>
        </div>
    );
}
