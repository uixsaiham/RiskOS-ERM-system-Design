import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'

const variants = {
  info: {
    bg: 'bg-[var(--color-info-subtle)] border-[var(--color-info-border)]',
    icon: Info,
    iconColor: 'text-[var(--color-info)]',
    title: 'text-[var(--color-info)]',
  },
  success: {
    bg: 'bg-[var(--color-success-subtle)] border-[var(--color-success-border)]',
    icon: CheckCircle2,
    iconColor: 'text-[var(--color-success)]',
    title: 'text-[var(--color-success)]',
  },
  warning: {
    bg: 'bg-[var(--color-warning-subtle)] border-[var(--color-warning-border)]',
    icon: AlertTriangle,
    iconColor: 'text-[var(--color-warning)]',
    title: 'text-[var(--color-warning)]',
  },
  error: {
    bg: 'bg-[var(--color-error-subtle)] border-[var(--color-error-border)]',
    icon: AlertCircle,
    iconColor: 'text-[var(--color-error)]',
    title: 'text-[var(--color-error)]',
  },
}

export interface AlertProps {
  variant?: keyof typeof variants
  title?: string
  children?: React.ReactNode
  onDismiss?: () => void
  className?: string
}

export function Alert({
  variant = 'info',
  title,
  children,
  onDismiss,
  className,
}: AlertProps) {
  const v = variants[variant]
  const Icon = v.icon
  return (
    <div
      role="alert"
      className={cn(
        'flex gap-3 rounded-lg border p-4',
        v.bg,
        className,
      )}
    >
      <Icon className={cn('size-5 shrink-0 mt-0.5', v.iconColor)} aria-hidden />
      <div className="flex-1 min-w-0">
        {title && (
          <div className={cn('font-label mb-0.5', v.title)}>{title}</div>
        )}
        {children && (
          <div className="font-body-md text-[var(--color-text-secondary)]">{children}</div>
        )}
      </div>
      {onDismiss && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="-mt-1 -mr-1"
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  )
}
