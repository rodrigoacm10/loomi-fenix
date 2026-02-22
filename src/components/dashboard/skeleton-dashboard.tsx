import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/global/container";

export function SkeletonDashboard() {
    return (
        <div className="space-y-[40px]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-[40px] h-[380px]">
                <Skeleton className="lg:col-span-2 h-full rounded-[24px]" />
                <Skeleton className="h-full rounded-[24px]" />
            </div>
            <Skeleton className="h-[450px] w-full rounded-[24px]" />
            <Container className="pb-4 space-y-[24px]">
                <Skeleton className="h-[40px] w-[200px] rounded-md" />
                <Skeleton className="h-[400px] w-full rounded-[24px]" />
            </Container>
        </div>
    );
}
