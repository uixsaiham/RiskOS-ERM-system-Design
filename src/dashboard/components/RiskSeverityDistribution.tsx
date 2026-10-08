import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { RiskSeverityBadge } from '@/components/ui/risk-severity'
import { SEVERITY_DISTRIBUTION } from '../dashboard-data'
import { ArrowRight } from 'lucide-react'

interface RiskSeverityDistributionProps {
  onSelectSeverity?: (severity: string) => void
  activeSeverity?: string | null
}

export function RiskSeverityDistribution({
  onSelectSeverity,
  activeSeverity,
}: RiskSeverityDistributionProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Risk Distribution by Severity</CardTitle>
          <span className="font-caption text-[var(--color-text-muted)]">248 Total</span>
        </div>
        <CardDescription>
          Click a severity tier to filter register and review immediate concentrations
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 pt-1">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {SEVERITY_DISTRIBUTION.map((item) => {
            const isSelected = activeSeverity === item.severity
            return (
              <button
                key={item.severity}
                type="button"
                onClick={() => onSelectSeverity?.(item.severity)}
                className={`flex items-center justify-between rounded-lg border p-3.5 text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)] ring-1 ring-[var(--color-primary)] shadow-xs'
                    : `${item.borderClass} ${item.subtleClass} hover:border-[var(--color-text-primary)] hover:shadow-xs`
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <RiskSeverityBadge severity={item.severity} size="sm" />
                    <span className="font-caption text-[var(--color-text-muted)]">
                      Score {item.scoreRange}
                    </span>
                  </div>
                  <p className="font-caption text-[var(--color-text-secondary)]">
                    {item.pct}% of total inventory
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-h2 font-bold tabular-nums text-[var(--color-text-primary)]">
                    {item.count}
                  </span>
                  <ArrowRight className="size-4 text-[var(--color-text-muted)] opacity-60" />
                </div>
              </button>
            )
          })}
        </div>

        <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-2.5 text-xs text-[var(--color-text-muted)]">
          <span>50 Critical & High risks require executive review</span>
          <span className="font-medium text-[var(--color-primary)] hover:underline cursor-pointer">
            Explore severity breakdown →
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
