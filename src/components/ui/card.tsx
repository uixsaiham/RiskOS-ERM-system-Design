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
        'rounded-xl border border-slate-200/80 bg-white shadow-xs',
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
    <h3 className={cn('text-sm font-semibold text-slate-900', className)}>{children}</h3>
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
    <p className={cn('text-xs text-slate-500 mt-0.5', className)}>
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
        'flex items-center gap-2 border-t border-slate-100 px-5 py-3',
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
      ? 'text-slate-400'
      : trendPositive
        ? 'text-emerald-600'
        : 'text-rose-600'

  return (
    <Card className={cn('p-4.5 hover:border-slate-300 transition-all', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-xs font-medium text-slate-500">{title}</div>
          <div className="mt-2 font-mono text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
            {value}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {trend && (
              <span className={cn('inline-flex items-center gap-0.5 text-xs font-medium', trendColor)}>
                <TrendIcon className="size-3.5" aria-hidden />
                {trend.value}
              </span>
            )}
            {supporting && (
              <span className="text-xs text-slate-400">{supporting}</span>
            )}
            {status}
          </div>
        </div>
        {Icon && (
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Icon className="size-4.5" aria-hidden />
          </div>
        )}
      </div>
      {action && <div className="mt-3.5">{action}</div>}
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
    <Card className={cn('p-4.5 hover:border-slate-300 transition-all', className)}>
      <div className="text-xs font-medium text-slate-500">
        {label}
      </div>
      <div className="mt-1.5 font-mono text-2xl font-bold tracking-tight text-slate-900">{value}</div>
      {description && (
        <div className="mt-1 text-xs text-slate-400">{description}</div>
      )}
    </Card>
  )
}
