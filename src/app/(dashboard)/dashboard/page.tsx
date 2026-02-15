import Container from "@/components/global/container";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | Project Fênix",
    description: "Overview of KPIs and metrics",
};

export default function DashboardPage() {
    return (
        <div className="grid gap-4">
            <Container>
                <p>Algo</p>
            </Container>
        </div>
    );
}
