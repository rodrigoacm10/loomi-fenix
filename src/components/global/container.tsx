import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

export default function Container({
  children,
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'bg-loomi-bg-card w-full max-w-full overflow-hidden p-6 rounded-4xl border-white/10 border',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
