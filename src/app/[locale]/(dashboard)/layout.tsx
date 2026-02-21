import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen text-white bg-loomi-bg-dark">
            <Sidebar />
            <div className="flex flex-col ml-[130px] w-[calc(100%-130px)] min-h-screen">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-10">
                    <div className="w-full max-w-[1370px] mx-auto flex flex-col min-w-0">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
