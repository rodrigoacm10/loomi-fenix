import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen text-white bg-[#0b1125]">
            <Sidebar />
            <div className="flex flex-1 flex-col">
                <Header />
                <main className="ml-[130px] flex-1 overflow-auto p-10 flex justify-center">
                    <div className="w-full max-w-[1370px]">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
