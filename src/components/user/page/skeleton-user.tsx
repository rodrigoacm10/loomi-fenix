import { Skeleton } from '@/components/ui/skeleton'
import Container from '@/components/global/container'

export function SkeletonUser() {
  return (
    <div className="flex w-full justify-center">
      <Container className="max-w-150 w-full space-y-6">
        <Skeleton className="h-7 w-48 rounded" />

        <div className="flex flex-col items-center justify-center space-y-4 pt-4">
          <Skeleton className="h-32 w-32 rounded-full" />
        </div>

        <div className="space-y-6 pt-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-24 ml-5 rounded" />
            <Skeleton className="h-14 w-full rounded-4xl" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-24 ml-5 rounded" />
            <Skeleton className="h-14 w-full rounded-4xl" />
          </div>
        </div>

        <div className="pt-4 flex gap-4">
          <Skeleton className="h-18 flex-1 rounded-[15px]" />
          <Skeleton className="h-18 flex-1 rounded-[15px]" />
        </div>

        <div className="pt-8 mt-8 border-t border-white/10">
          <Skeleton className="h-14 w-full rounded-[15px]" />
        </div>
      </Container>
    </div>
  )
}
