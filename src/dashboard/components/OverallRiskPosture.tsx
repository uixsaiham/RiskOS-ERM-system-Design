import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { OVERALL_POSTURE, SEVERITY_DISTRIBUTION } from '../dashboard-data'
import { ArrowDown, ShieldCheck } from 'lucide-react'

interface OverallRiskPostureProps {
  onSeverityClick?: (severity: string) => void
  selectedSeverity?: string | null
}

export function OverallRiskPosture({
  onSeverityClick,
  selectedSeverity,
}: OverallRiskPostureProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle>Overall Risk Posture</CardTitle>
              <Badge variant="warning" size="sm" className="font-semibold">
                {OVERALL_POSTURE.status}
              </Badge>
            </div>
            <CardDescription className="mt-1">
              {OVERALL_POSTURE.criticalCount} Critical · {OVERALL_POSTURE.highCount} High ·{' '}
              {OVERALL_POSTURE.moderateCount} Moderate · {OVERALL_POSTURE.lowCount} Low
            </CardDescription>
          </div>
          <span className="font-caption text-[var(--color-text-muted)] font-mono">
            {OVERALL_POSTURE.totalCount} Total Risks
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 pt-1">
        {/* Horizontal Severity Distribution Bar */}
        <div>
          <div className="flex items-center justify-between text-xs font-caption text-[var(--color-text-muted)] mb-1.5">
            <span>Portfolio Severity Distribution</span>
            <span>100% of Inventory</span>
          </div>

          <div className="flex h-5 w-full overflow-hidden rounded-md bg-[var(--color-surface-secondary)] border border-[var(--color-border)] p-0.5 gap-0.5">
            {SEVERITY_DISTRIBUTION.map((s) => {
              const isSelected = selectedSeverity === s.severity
              return (
                <button
                  key={s.severity}
                  type="button"
                  onClick={() => onSeverityClick?.(s.severity)}
                  style={{ width: `${s.pct}%` }}
                  title={`${s.label}: ${s.count} risks (${s.pct}%) · Click to filter`}
                  className={`h-full rounded-xs transition-all cursor-pointer ${s.bgClass} ${
                    isSelected ? 'ring-2 ring-[var(--color-text-primary)] ring-offset-1 scale-y-110 z-10' : 'hover:opacity-90'
                  }`}
                />
              )
            })}
          </div>

          {/* Interactive Legend with pills */}
          <div className="grid grid-cols-2 gap-2 mt-3 sm:grid-cols-4">
            {SEVERITY_DISTRIBUTION.map((s) => {
              const isSelected = selectedSeverity === s.severity
              return (
                <button
                  key={s.severity}
                  type="button"
                  onClick={() => onSeverityClick?.(s.severity)}
                  className={`flex items-center justify-between rounded-md border p-2 text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)] ring-1 ring-[var(--color-primary)]'
                      : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-secondary)]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`size-2.5 rounded-full ${s.bgClass}`} />
                    <span className="font-caption font-semibold text-[var(--color-text-primary)]">
                      {s.label}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-body-sm font-bold tabular-nums text-[var(--color-text-primary)]">
                      {s.count}
                    </span>
                    <span className="font-caption text-[var(--color-text-muted)] ml-1 text-[11px]">
                      ({s.pct}%)
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Inherent Risk → Residual Risk Mitigation Breakdown */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-4">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-caption mb-3">
            <span className="font-semibold uppercase tracking-wider">Mitigation Impact of Controls</span>
            <span className="text-[var(--color-success)] font-medium flex items-center gap-1">
              <ShieldCheck className="size-3.5" />
              Verified control reduction
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Inherent Exposure */}
            <div className="flex-1 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-center sm:text-left">
              <span className="font-overline text-[var(--color-text-muted)]">Inherent Exposure</span>
              <p className="mt-1 font-h2 font-bold tabular-nums text-[var(--color-text-secondary)]">
                {OVERALL_POSTURE.inherentExposure}
              </p>
              <p className="mt-0.5 font-caption text-[var(--color-text-muted)]">
                Gross unmitigated risk
              </p>
            </div>

            {/* Downward / Transition Arrow */}
            <div className="flex flex-col items-center justify-center shrink-0 px-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-[var(--color-success-subtle)] text-[var(--color-success)] border border-[var(--color-success-border)]">
                <ArrowDown className="size-4" />
              </div>
              <span className="mt-1 font-caption font-bold text-[var(--color-success)] tabular-nums">
                {OVERALL_POSTURE.exposureReductionValue}
              </span>
              <span className="font-caption text-[11px] text-[var(--color-text-muted)]">
                ({OVERALL_POSTURE.exposureReductionPct})
              </span>
            </div>

            {/* Residual Exposure */}
            <div className="flex-1 w-full rounded-md border border-[var(--color-primary-muted)] bg-[var(--color-primary-subtle)]/40 p-3 text-center sm:text-left">
              <span className="font-overline text-[var(--color-primary)]">Residual Exposure</span>
              <p className="mt-1 font-h2 font-bold tabular-nums text-[var(--color-text-primary)]">
                {OVERALL_POSTURE.residualExposure}
              </p>
              <p className="mt-0.5 font-caption text-[var(--color-text-secondary)]">
                Net exposure after active controls
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
