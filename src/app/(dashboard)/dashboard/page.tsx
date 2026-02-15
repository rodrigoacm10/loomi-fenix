import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | Project Fênix",
    description: "Overview of KPIs and metrics",
};

export default function DashboardPage() {
    return (
        <div className="grid gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm border">
                <h2 className="text-lg font-medium mb-2">Welcome to the Dashboard</h2>
                <p className="text-muted-foreground">KPIs and Metrics will be implemented here.</p>
            </div>
        </div>
    );
}
