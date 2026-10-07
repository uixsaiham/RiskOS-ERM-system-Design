import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon?: LucideIcon
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center px-6 py-16 text-center',
        className,
      )}
    >
      {Icon && (
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)]">
          <Icon className="size-6" aria-hidden />
        </div>
      )}
      <h3 className="font-h3 text-[var(--color-text-primary)]">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm font-body-md text-[var(--color-text-muted)]">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'We could not load this content. Please try again.',
  action,
  className,
}: {
  title?: string
  description?: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border border-[var(--color-error-border)] bg-[var(--color-error-subtle)] px-6 py-12 text-center',
        className,
      )}
      role="alert"
    >
      <h3 className="font-h3 text-[var(--color-error)]">{title}</h3>
      <p className="mt-1.5 max-w-sm font-body-md text-[var(--color-text-secondary)]">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export function LoadingState({
  label = 'Loading…',
  className,
}: {
  label?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 px-6 py-16',
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <svg
        className="size-8 animate-spin text-[var(--color-primary)]"
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
      <span className="font-body-md text-[var(--color-text-muted)]">{label}</span>
    </div>
  )
}
