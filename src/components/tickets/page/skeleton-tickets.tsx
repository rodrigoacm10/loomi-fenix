import { Skeleton } from '@/components/ui/skeleton'
import Container from '@/components/global/container'

export function SkeletonTickets() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-30 rounded-[24px]" />
        ))}
      </div>
      <Container className="pb-4 space-y-6">
        <Skeleton className="h-10 w-50 rounded-md" />
        <Skeleton className="h-100 w-full rounded-[24px]" />
      </Container>
    </div>
  )
}
