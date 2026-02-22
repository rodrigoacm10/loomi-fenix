import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonSimulator() {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-8">
      <div className="lg:col-span-5 space-y-6">
        <Skeleton className="mb-20 w-full rounded-[24px]" />
        <Skeleton className="h-100 w-full rounded-[24px]" />
      </div>
      <div className="lg:col-span-3">
        <Skeleton className="h-120 w-full rounded-[24px]" />
      </div>
    </div>
  )
}
