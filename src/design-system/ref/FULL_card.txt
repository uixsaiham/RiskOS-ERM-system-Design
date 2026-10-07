import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'
import { TrendingDown, TrendingUp, Minus } from 'lucide-react'

export function Card({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-xs)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn('flex items-start justify-between gap-3 px-5 pt-5 pb-0', className)}>
      {children}
    </div>
  )
}

export function CardTitle({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <h3 className={cn('font-h4 text-[var(--color-text-primary)]', className)}>{children}</h3>
  )
}

export function CardDescription({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <p className={cn('font-body-sm text-[var(--color-text-muted)] mt-0.5', className)}>
      {children}
    </p>
  )
}

export function CardContent({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={cn('px-5 py-4', className)}>{children}</div>
}

export function CardFooter({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 border-t border-[var(--color-border)] px-5 py-3',
        className,
      )}
    >
      {children}
    </div>
  )
}

export interface KpiCardProps {
  title: string
  value: string | number
  supporting?: string
  trend?: { value: string; direction: 'up' | 'down' | 'flat'; positive?: boolean }
  icon?: LucideIcon
  status?: React.ReactNode
  action?: React.ReactNode
  className?: string
}

export function KpiCard({
  title,
  value,
  supporting,
  trend,
  icon: Icon,
  status,
  action,
  className,
}: KpiCardProps) {
  const TrendIcon =
    trend?.direction === 'up'
      ? TrendingUp
      : trend?.direction === 'down'
        ? TrendingDown
        : Minus

  const trendPositive = trend?.positive ?? trend?.direction === 'up'
  const trendColor =
    trend?.direction === 'flat'
      ? 'text-[var(--color-text-muted)]'
      : trendPositive
        ? 'text-[var(--color-success)]'
        : 'text-[var(--color-error)]'

  return (
    <Card className={cn('p-5', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="font-body-sm font-medium text-[var(--color-text-muted)]">{title}</div>
          <div className="mt-2 font-h1 tabular-nums text-[var(--color-text-primary)] tracking-tight">
            {value}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {trend && (
              <span className={cn('inline-flex items-center gap-0.5 font-caption font-medium', trendColor)}>
                <TrendIcon className="size-3.5" aria-hidden />
                {trend.value}
              </span>
            )}
            {supporting && (
              <span className="font-caption text-[var(--color-text-muted)]">{supporting}</span>
            )}
            {status}
          </div>
        </div>
        {Icon && (
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary-subtle)] text-[var(--color-primary)]">
            <Icon className="size-5" aria-hidden />
          </div>
        )}
      </div>
      {action && <div className="mt-4">{action}</div>}
    </Card>
  )
}

export function MetricCard({
  label,
  value,
  description,
  className,
}: {
  label: string
  value: React.ReactNode
  description?: string
  className?: string
}) {
  return (
    <Card className={cn('p-4', className)}>
      <div className="font-caption font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
        {label}
      </div>
      <div className="mt-1.5 font-h3 text-[var(--color-text-primary)]">{value}</div>
      {description && (
        <div className="mt-1 font-caption text-[var(--color-text-muted)]">{description}</div>
      )}
    </Card>
  )
}
