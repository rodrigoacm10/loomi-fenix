import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/global/container";

export function SkeletonTickets() {
    return (
        <div className="space-y-[32px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-[120px] rounded-[24px]" />
                ))}
            </div>
            <Container className="pb-4 space-y-[24px]">
                <Skeleton className="h-[40px] w-[200px] rounded-md" />
                <Skeleton className="h-[400px] w-full rounded-[24px]" />
            </Container>
        </div>
    );
}
