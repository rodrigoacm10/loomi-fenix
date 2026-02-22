import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonChat() {
  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className="flex justify-start">
        <Skeleton className="h-17.5 w-[60%] sm:w-[45%] md:w-[35%] rounded-t-4xl rounded-br-4xl rounded-bl-lg" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-12.5 w-[50%] sm:w-[35%] md:w-[25%] rounded-t-4xl rounded-bl-4xl rounded-br-lg bg-loomi-primary/20" />
      </div>
      <div className="flex justify-start">
        <Skeleton className="h-22.5 w-[70%] sm:w-[50%] md:w-[40%] rounded-t-4xl rounded-br-4xl rounded-bl-lg" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-15 w-[45%] sm:w-[30%] md:w-[20%] rounded-t-4xl rounded-bl-4xl rounded-br-lg bg-loomi-primary/20" />
      </div>
    </div>
  )
}
