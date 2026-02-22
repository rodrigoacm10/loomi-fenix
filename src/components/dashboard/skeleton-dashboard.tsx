import { Skeleton } from '@/components/ui/skeleton'
import Container from '@/components/global/container'

export function SkeletonDashboard() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-95">
        <Skeleton className="lg:col-span-2 h-full rounded-[24px]" />
        <Skeleton className="h-full rounded-[24px]" />
      </div>
      <Skeleton className="h-112.5 w-full rounded-[24px]" />
      <Container className="pb-4 space-y-6">
        <Skeleton className="h-10 w-50 rounded-md" />
        <Skeleton className="h-100 w-full rounded-[24px]" />
      </Container>
    </div>
  )
}
