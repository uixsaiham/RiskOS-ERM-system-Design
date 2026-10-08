import { cn } from '@/lib/utils'
import { statusMeta, type StatusTone } from '@/tokens'
import { Badge } from './badge'

const toneToBadge = {
  neutral: 'neutral',
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
  primary: 'primary',
} as const

const toneDot: Record<StatusTone, string> = {
  neutral: 'bg-[var(--color-text-muted)]',
  info: 'bg-[var(--color-info)]',
  success: 'bg-[var(--color-success)]',
  warning: 'bg-[var(--color-warning)]',
  error: 'bg-[var(--color-error)]',
  primary: 'bg-[var(--color-primary)]',
}

export function getStatusMeta(status: string) {
  return statusMeta[status] ?? { label: status, tone: 'neutral' as StatusTone }
}

export interface StatusBadgeProps {
  status: string
  label?: string
  className?: string
  size?: 'sm' | 'md'
  showDot?: boolean
}

export function StatusBadge({
  status,
  label,
  className,
  size = 'md',
  showDot = true,
}: StatusBadgeProps) {
  const meta = getStatusMeta(status)
  const display = label ?? meta.label
  return (
    <Badge
      variant={toneToBadge[meta.tone]}
      size={size}
      className={className}
      title={display}
    >
      {showDot && (
        <span
          className={cn('size-1.5 rounded-full shrink-0', toneDot[meta.tone])}
          aria-hidden
        />
      )}
      <span>{display}</span>
    </Badge>
  )
}

export interface StatusDotProps {
  status: string
  className?: string
  withLabel?: boolean
}

export function StatusDot({ status, className, withLabel = true }: StatusDotProps) {
  const meta = getStatusMeta(status)
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <span
        className={cn('size-2 rounded-full shrink-0', toneDot[meta.tone])}
        aria-hidden
      />
      {withLabel && (
        <span className="font-body-sm text-[var(--color-text-secondary)]">{meta.label}</span>
      )}
      <span className="sr-only">{meta.label}</span>
    </span>
  )
}

export function ControlEffectiveness({
  value,
  className,
}: {
  value: string
  className?: string
}) {
  const normalized = value === 'highly_effective' ? 'effective' : value
  return <StatusBadge status={normalized} className={className} />
}
