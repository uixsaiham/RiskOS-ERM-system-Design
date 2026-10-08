import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { APPETITE_MONITORING } from '../dashboard-data'
import { AlertCircle, ShieldAlert, ArrowRight } from 'lucide-react'

interface RiskAppetiteCardProps {
  onCategoryClick?: (category: string) => void
  onNavigateAppetite?: () => void
}

export function RiskAppetiteCard({
  onCategoryClick,
  onNavigateAppetite,
}: RiskAppetiteCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle>Risk Appetite Monitoring</CardTitle>
            <Badge variant="warning" size="sm" className="gap-1 font-semibold">
              <AlertCircle className="size-3" />
              {APPETITE_MONITORING.breachCount} Breaches Active
            </Badge>
          </div>
          <CardDescription className="mt-1">
            Enterprise boundary adherence against board-ratified tolerance ceilings
          </CardDescription>
        </div>

        <button
          type="button"
          onClick={onNavigateAppetite}
          className="font-caption font-semibold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1 cursor-pointer shrink-0"
        >
          <span>Appetite Framework</span>
          <ArrowRight className="size-3" />
        </button>
      </CardHeader>

      <CardContent className="space-y-4 pt-1">
        {/* Overall Appetite Progress Bar */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-3.5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="font-caption font-semibold text-[var(--color-text-muted)] uppercase tracking-wider text-[11px]">
                Overall Risk Posture Adherence
              </span>
              <p className="font-h3 font-bold text-[var(--color-text-primary)]">
                {APPETITE_MONITORING.overallWithinPct}% Within Appetite
              </p>
            </div>
            <div className="text-right">
              <span className="font-caption text-[var(--color-text-muted)] text-xs">
                Board Limit: 95%
              </span>
              <p className="font-caption font-semibold text-[var(--color-risk-critical-foreground)]">
                {100 - APPETITE_MONITORING.overallWithinPct}% Exposure Variance
              </p>
            </div>
          </div>

          <div className="relative">
            <Progress
              value={APPETITE_MONITORING.overallWithinPct}
              variant="warning"
              size="md"
            />
            {/* Target marker at 95% */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-[var(--color-success)] z-10 pointer-events-none"
              style={{ left: '95%' }}
              title="Target tolerance: 95%"
            />
          </div>
        </div>

        {/* 3 Appetite Breaches Grid */}
        <div>
          <div className="flex items-center justify-between mb-2 text-xs font-caption text-[var(--color-text-muted)]">
            <span className="font-semibold uppercase tracking-wider text-[11px]">
              Categories Exceeding Approved Ceilings
            </span>
            <span>Current vs Ceiling</span>
          </div>

          <div className="space-y-2">
            {APPETITE_MONITORING.breaches.map((breach) => (
              <div
                key={breach.category}
                onClick={() => onCategoryClick?.(breach.category)}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 rounded-lg border border-[var(--color-risk-critical-border)] bg-[var(--color-surface)] p-3 cursor-pointer hover:bg-[var(--color-surface-secondary)] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex size-7 items-center justify-center rounded-md bg-[var(--color-risk-critical-subtle)] text-[var(--color-risk-critical-foreground)] shrink-0">
                    <ShieldAlert className="size-4" />
                  </div>
                  <div>
                    <h5 className="font-label text-sm font-semibold text-[var(--color-text-primary)]">
                      {breach.category}
                    </h5>
                    <p className="font-caption text-[var(--color-text-secondary)] text-[11px]">
                      Threshold: <span className="font-mono">{breach.appetiteThreshold}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="text-right">
                    <span className="font-caption text-[11px] text-[var(--color-text-muted)] block">
                      Current Exposure
                    </span>
                    <span className="font-mono font-bold text-sm text-[var(--color-text-primary)]">
                      {breach.currentExposure}
                    </span>
                  </div>

                  <div className="text-right pl-2 border-l border-[var(--color-border)]">
                    <span className="font-caption text-[11px] text-[var(--color-text-muted)] block">
                      Variance
                    </span>
                    <span className="font-mono font-bold text-sm text-[var(--color-risk-critical-foreground)]">
                      {breach.variance}
                    </span>
                  </div>

                  <Badge variant="error" size="sm" className="font-semibold shrink-0">
                    {breach.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-2 text-xs text-[var(--color-text-muted)]">
          <span>Escalations routed to Executive Risk Committee per Governance Bylaw 4.2</span>
          <button
            type="button"
            onClick={onNavigateAppetite}
            className="font-caption font-semibold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Review Tolerance Limits</span>
            <ArrowRight className="size-3" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
