import { cn } from '@/lib/utils'

export function Progress({
  value,
  max = 100,
  size = 'md',
  variant = 'primary',
  showLabel,
  className,
}: {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'success' | 'warning' | 'error'
  showLabel?: boolean
  className?: string
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const heights = { sm: 'h-1', md: 'h-1.5', lg: 'h-2.5' }
  const colors = {
    primary: 'bg-[var(--color-primary)]',
    success: 'bg-[var(--color-success)]',
    warning: 'bg-[var(--color-warning)]',
    error: 'bg-[var(--color-error)]',
  }

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="mb-1 flex justify-between font-caption text-[var(--color-text-muted)]">
          <span>Progress</span>
          <span className="tabular-nums">{Math.round(pct)}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn(
          'w-full overflow-hidden rounded-full bg-[var(--color-surface-tertiary)]',
          heights[size],
        )}
      >
        <div
          className={cn('h-full rounded-full transition-all duration-300', colors[variant])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export function Spinner({
  size = 'md',
  className,
}: {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const sizes = { sm: 'size-4', md: 'size-5', lg: 'size-8' }
  return (
    <svg
      className={cn('animate-spin text-[var(--color-primary)]', sizes[size], className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-[var(--color-surface-tertiary)]',
        className,
      )}
      aria-hidden
    />
  )
}
