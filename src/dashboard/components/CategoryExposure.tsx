import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CATEGORY_EXPOSURE } from '../dashboard-data'
import { AlertCircle, TrendingDown, TrendingUp, Minus } from 'lucide-react'

interface CategoryExposureProps {
  onCategoryFilter?: (category: string) => void
  activeCategory?: string | null
}

export function CategoryExposure({ onCategoryFilter, activeCategory }: CategoryExposureProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Risk Appetite vs Exposure by Domain</CardTitle>
          <span className="font-caption text-[var(--color-text-muted)]">Max Scale 25.0</span>
        </div>
        <CardDescription>
          Portfolio risk score vs board-approved tolerance thresholds
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-1">
        <div className="space-y-3.5">
          {CATEGORY_EXPOSURE.map((cat) => {
            const avgScore = cat.avgResidualScore ?? 14
            const limit = cat.appetiteLimit ?? 15
            const isBreached = avgScore > limit
            const isSelected = activeCategory === cat.category
            const appetitePct = Math.min(100, Math.round((avgScore / 25) * 100))
            const limitPct = Math.round((limit / 25) * 100)

            const TrendIcon =
              cat.trend === 'up' ? TrendingUp : cat.trend === 'down' ? TrendingDown : Minus
            const trendColor =
              cat.trend === 'up'
                ? 'text-[var(--color-error)]'
                : cat.trend === 'down'
                  ? 'text-[var(--color-success)]'
                  : 'text-[var(--color-text-muted)]'

            return (
              <div
                key={cat.category}
                onClick={() => onCategoryFilter?.(cat.category)}
                className={`group cursor-pointer rounded-lg border p-3 transition-colors ${
                  isSelected
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)]/40 shadow-xs'
                    : isBreached
                      ? 'border-[var(--color-risk-critical-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-secondary)]'
                      : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-secondary)]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-label text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                      {cat.category}
                    </span>
                    {isBreached && (
                      <Badge variant="error" size="sm" className="gap-1">
                        <AlertCircle className="size-3" />
                        Breach
                      </Badge>
                    )}
                    {cat.status === 'near_limit' && (
                      <Badge variant="warning" size="sm">
                        Near Limit
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 font-caption">
                      <TrendIcon className={`size-3.5 ${trendColor}`} />
                      <span className="tabular-nums font-bold text-[var(--color-text-primary)]">
                        {avgScore}
                      </span>
                      <span className="text-[var(--color-text-muted)]">/ {limit} limit</span>
                    </div>
                  </div>
                </div>

                {/* Relative progress bar with appetite threshold tick */}
                <div className="relative mt-2.5">
                  <Progress
                    value={appetitePct}
                    variant={isBreached ? 'error' : cat.status === 'near_limit' ? 'warning' : 'primary'}
                    size="sm"
                  />
                  {/* Limit threshold marker */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-[var(--color-text-primary)] z-10 pointer-events-none"
                    style={{ left: `${limitPct}%` }}
                    title={`Appetite limit: ${limit}`}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between font-caption text-[var(--color-text-muted)]">
                  <span>
                    {cat.riskCount} risks ·{' '}
                    <strong className="text-[var(--color-risk-critical-foreground)] font-semibold">
                      {cat.criticalCount} critical
                    </strong>
                    , {cat.highCount} high
                  </span>
                  <span className="text-[11px] font-mono">
                    Limit: {limitPct}% ({limit})
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-3 text-xs text-[var(--color-text-muted)]">
          <div className="flex items-center gap-2">
            <span className="inline-block size-2 rounded-full bg-[var(--color-text-primary)]" />
            <span>Black tick denotes Risk Committee board tolerance cap</span>
          </div>
          <span className="font-medium text-[var(--color-text-secondary)]">
            2 / 5 categories exceed target
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
