import { clientColors } from '@/utils/client-colors'

export function ClientBadge({
  variant,
}: {
  variant: 'Ativo' | 'Pendente' | 'Inativo'
}) {
  const color = clientColors[variant]

  return (
    <div className="flex">
      <div
        className="px-3 py-1 text-xs rounded-full text-center"
        style={{
          backgroundColor: color,
          color: variant === 'Inativo' ? 'white' : 'black',
        }}
      >
        {variant}
      </div>
    </div>
  )
}
