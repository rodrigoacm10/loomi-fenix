import { cn } from '@/lib/utils'
import Container from '../global/container'

interface PlanCardProps {
  name: string
  price: number
  isSelected: boolean
  isRecommended?: boolean
  onSelect: () => void
}

export function PlanCard({
  name,
  price,
  isSelected,
  isRecommended,
  onSelect,
}: PlanCardProps) {
  return (
    <Container
      className={cn(
        'bg-[#23293b] space-y-6 relative cursor-pointer transition-all hover:border-blue-500/50',
        isSelected ? 'ring-2 ring-loomi-primary border-transparent' : '',
      )}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between relative">
        <p className="font-semibold text-white text-sm">{name}</p>

        {isRecommended && (
          <div className="absolute top-0.5 right-0 rounded-full bg-cyan-400 px-3 py-1 text-sm text-black shadow-sm">
            Recomendado
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold">
          R$ {price.toFixed(2).replace('.', ',')}
        </span>
      </div>
      <p className="text-sm text-white/60 mt-1">Por mês</p>
    </Container>
  )
}
