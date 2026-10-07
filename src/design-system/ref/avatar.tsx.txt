import { cn } from '@/lib/utils'

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const sizeMap = {
  xs: 'size-6 text-[10px]',
  sm: 'size-7 text-[11px]',
  md: 'size-8 text-xs',
  lg: 'size-10 text-sm',
  xl: 'size-12 text-base',
}

export interface AvatarProps {
  name: string
  src?: string
  size?: keyof typeof sizeMap
  className?: string
}

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-muted)] text-[var(--color-primary)] font-medium overflow-hidden',
        sizeMap[size],
        className,
      )}
      title={name}
      role="img"
      aria-label={name}
    >
      {src ? (
        <img src={src} alt="" className="size-full object-cover" />
      ) : (
        initials(name)
      )}
    </span>
  )
}

export function AvatarGroup({
  people,
  max = 3,
  size = 'sm',
}: {
  people: { name: string; src?: string }[]
  max?: number
  size?: keyof typeof sizeMap
}) {
  const shown = people.slice(0, max)
  const rest = people.length - max
  return (
    <div className="flex items-center -space-x-2">
      {shown.map((p) => (
        <Avatar
          key={p.name}
          name={p.name}
          src={p.src}
          size={size}
          className="ring-2 ring-[var(--color-surface)]"
        />
      ))}
      {rest > 0 && (
        <span
          className={cn(
            'inline-flex items-center justify-center rounded-full bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] font-caption font-medium ring-2 ring-[var(--color-surface)]',
            sizeMap[size],
          )}
        >
          +{rest}
        </span>
      )}
    </div>
  )
}
