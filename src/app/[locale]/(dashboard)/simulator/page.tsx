"use client";

import { useEffect } from "react";
import { useSimulatorStore } from "@/store/simulator-store";
import { SimulatorControls } from "@/components/simulator/simulator-controls";
import { SimulatorSummary } from "@/components/simulator/simulator-summary";
import { Loader2 } from "lucide-react";

export default function SimulatorPage() {
    const { fetchSimulatorData, loading } = useSimulatorStore();

    useEffect(() => {
        fetchSimulatorData();
    }, [fetchSimulatorData]);

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-[40px] lg:grid-cols-8">
            <div className="lg:col-span-5">
                <SimulatorControls />
            </div>

            <div className="lg:col-span-3">
                <SimulatorSummary />
            </div>
        </div>
    );
}
