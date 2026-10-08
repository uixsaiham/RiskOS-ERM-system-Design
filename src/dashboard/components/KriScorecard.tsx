import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { KEY_RISK_INDICATORS, type KriItem } from '../dashboard-data'
import { Activity, AlertTriangle, CheckCircle2, TrendingDown, TrendingUp, Minus } from 'lucide-react'

export function KriScorecard() {
  const breachedCount = KEY_RISK_INDICATORS.filter((k) => k.status === 'breached').length
  const warningCount = KEY_RISK_INDICATORS.filter((k) => k.status === 'warning').length

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle>Key Risk Indicators (KRIs)</CardTitle>
            {breachedCount > 0 && (
              <Badge variant="error" size="sm">
                {breachedCount} Breached
              </Badge>
            )}
            {warningCount > 0 && (
              <Badge variant="warning" size="sm">
                {warningCount} Warning
              </Badge>
            )}
          </div>
          <CardDescription className="mt-1">
            Early-warning velocity metrics monitored against board triggers
          </CardDescription>
        </div>

        <div className="flex items-center gap-1.5 font-caption text-[var(--color-text-muted)]">
          <Activity className="size-4 text-[var(--color-primary)]" />
          <span>Real-time feeds</span>
        </div>
      </CardHeader>

      <CardContent className="pt-1">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {KEY_RISK_INDICATORS.map((kri: KriItem) => {
            const statusConfig = {
              within_appetite: {
                badgeVariant: 'success' as const,
                label: 'Within Appetite',
                icon: CheckCircle2,
                borderColor: 'border-[var(--color-border)]',
              },
              warning: {
                badgeVariant: 'warning' as const,
                label: 'Warning',
                icon: AlertTriangle,
                borderColor: 'border-[var(--color-warning-border)]',
              },
              breached: {
                badgeVariant: 'error' as const,
                label: 'Threshold Breach',
                icon: AlertTriangle,
                borderColor: 'border-[var(--color-risk-critical-border)]',
              },
            }[kri.status]

            const isNegative = kri.trend === 'up' && kri.status !== 'within_appetite'
            const TrendIcon =
              kri.trend === 'up'
                ? TrendingUp
                : kri.trend === 'down'
                  ? TrendingDown
                  : Minus
            const trendColor = isNegative
              ? 'text-[var(--color-risk-critical-foreground)]'
              : kri.trend === 'down'
                ? 'text-[var(--color-success)]'
                : 'text-[var(--color-text-muted)]'

            return (
              <div
                key={kri.id}
                className={`flex flex-col justify-between rounded-lg border ${statusConfig.borderColor} bg-[var(--color-surface)] p-3.5 shadow-xs hover:border-[var(--color-border-strong)] transition-colors`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-overline font-semibold text-[var(--color-primary)]">
                      {kri.code} · {kri.category}
                    </span>
                    <Badge variant={statusConfig.badgeVariant} size="sm">
                      {statusConfig.label}
                    </Badge>
                  </div>

                  <h4 className="mt-1.5 font-label text-sm text-[var(--color-text-primary)] font-semibold line-clamp-1">
                    {kri.name}
                  </h4>
                </div>

                <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="font-caption text-[var(--color-text-muted)] text-[11px] block">
                        Measured Value
                      </span>
                      <span className="font-h3 font-bold tabular-nums text-[var(--color-text-primary)]">
                        {kri.currentValue}
                      </span>
                      <span className="font-caption text-[var(--color-text-muted)] ml-1">
                        {kri.unit}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="font-caption text-[var(--color-text-muted)] text-[11px] block">
                        Limit
                      </span>
                      <span className="font-body-sm font-semibold text-[var(--color-text-secondary)]">
                        {kri.threshold} {kri.unit}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between font-caption text-[11px] text-[var(--color-text-muted)]">
                    <span className="flex items-center gap-1">
                      <TrendIcon className={`size-3.5 ${trendColor}`} />
                      <span className="capitalize">{kri.trend}</span>
                    </span>
                    <span>Updated {kri.lastMeasured}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
