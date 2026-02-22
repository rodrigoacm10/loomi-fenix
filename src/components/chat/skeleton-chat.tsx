import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonChat() {
    return (
        <div className="flex flex-col space-y-4 w-full">
            <div className="flex justify-start">
                <Skeleton className="h-[70px] w-[60%] sm:w-[45%] md:w-[35%] rounded-t-[20px] rounded-br-[20px] rounded-bl-[4px]" />
            </div>
            <div className="flex justify-end">
                <Skeleton className="h-[50px] w-[50%] sm:w-[35%] md:w-[25%] rounded-t-[20px] rounded-bl-[20px] rounded-br-[4px] bg-loomi-primary/20" />
            </div>
            <div className="flex justify-start">
                <Skeleton className="h-[90px] w-[70%] sm:w-[50%] md:w-[40%] rounded-t-[20px] rounded-br-[20px] rounded-bl-[4px]" />
            </div>
            <div className="flex justify-end">
                <Skeleton className="h-[60px] w-[45%] sm:w-[30%] md:w-[20%] rounded-t-[20px] rounded-bl-[20px] rounded-br-[4px] bg-loomi-primary/20" />
            </div>
        </div>
    );
}
