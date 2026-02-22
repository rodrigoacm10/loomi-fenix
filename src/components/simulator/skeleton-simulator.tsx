import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonSimulator() {
    return (
        <div className="grid grid-cols-1 gap-[40px] lg:grid-cols-8">
            <div className="lg:col-span-5 space-y-[24px]">
                <Skeleton className="h-[80px] w-full rounded-[24px]" />
                <Skeleton className="h-[400px] w-full rounded-[24px]" />
            </div>
            <div className="lg:col-span-3">
                <Skeleton className="h-[480px] w-full rounded-[24px]" />
            </div>
        </div>
    );
}
