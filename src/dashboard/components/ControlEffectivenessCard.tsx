import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CONTROL_EFFECTIVENESS_METRICS } from '../dashboard-data'
import { ArrowRight } from 'lucide-react'

interface ControlEffectivenessCardProps {
  onNavigateControls?: () => void
}

export function ControlEffectivenessCard({
  onNavigateControls,
}: ControlEffectivenessCardProps) {
  const {
    effectivePct,
    partiallyEffectivePct,
    ineffectivePct,
    totalControls,
    testedControls,
    failedControls,
    overdueTests,
  } = CONTROL_EFFECTIVENESS_METRICS

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle>Control Effectiveness</CardTitle>
            <Badge variant="success" size="sm" className="font-semibold">
              82% Overall Health
            </Badge>
          </div>
          <CardDescription className="mt-1">
            Assurance testing and operational reliability across {totalControls} internal controls
          </CardDescription>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onNavigateControls}
          className="gap-1.5 text-xs text-[var(--color-primary)] hover:underline shrink-0"
        >
          <span>View Controls</span>
          <ArrowRight className="size-3.5" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-4 pt-1">
        {/* Visual Distribution Segmented Bar */}
        <div>
          <div className="flex items-center justify-between text-xs font-caption text-[var(--color-text-muted)] mb-1.5">
            <span>Control Assurance Health Breakdown</span>
            <span>{testedControls} of {totalControls} Tested ({Math.round((testedControls / totalControls) * 100)}%)</span>
          </div>

          <div className="flex h-5 w-full overflow-hidden rounded-md bg-[var(--color-surface-secondary)] border border-[var(--color-border)] p-0.5 gap-0.5">
            <div
              style={{ width: `${effectivePct}%` }}
              title={`Effective: ${effectivePct}%`}
              className="h-full rounded-xs bg-[var(--color-success)] transition-all"
            />
            <div
              style={{ width: `${partiallyEffectivePct}%` }}
              title={`Partially Effective: ${partiallyEffectivePct}%`}
              className="h-full rounded-xs bg-[var(--color-warning)] transition-all"
            />
            <div
              style={{ width: `${ineffectivePct}%` }}
              title={`Ineffective: ${ineffectivePct}%`}
              className="h-full rounded-xs bg-[var(--color-risk-critical)] transition-all"
            />
          </div>

          {/* Legend items */}
          <div className="grid grid-cols-3 gap-2 mt-2.5">
            <div className="flex items-center justify-between rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-2">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[var(--color-success)]" />
                <span className="font-caption text-xs text-[var(--color-text-secondary)]">Effective</span>
              </div>
              <span className="font-body-sm font-bold tabular-nums text-[var(--color-text-primary)]">
                {effectivePct}%
              </span>
            </div>

            <div className="flex items-center justify-between rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-2">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[var(--color-warning)]" />
                <span className="font-caption text-xs text-[var(--color-text-secondary)]">Partially</span>
              </div>
              <span className="font-body-sm font-bold tabular-nums text-[var(--color-text-primary)]">
                {partiallyEffectivePct}%
              </span>
            </div>

            <div className="flex items-center justify-between rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-2">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[var(--color-risk-critical)]" />
                <span className="font-caption text-xs text-[var(--color-text-secondary)]">Ineffective</span>
              </div>
              <span className="font-body-sm font-bold tabular-nums text-[var(--color-text-primary)]">
                {ineffectivePct}%
              </span>
            </div>
          </div>
        </div>

        {/* 4 Supporting Metrics from Prompt */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-3 text-center">
            <span className="font-caption text-[11px] text-[var(--color-text-muted)] block">
              Total Controls
            </span>
            <span className="font-h3 font-bold tabular-nums text-[var(--color-text-primary)]">
              {totalControls}
            </span>
          </div>

          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-3 text-center">
            <span className="font-caption text-[11px] text-[var(--color-text-muted)] block">
              Tested Controls
            </span>
            <span className="font-h3 font-bold tabular-nums text-[var(--color-success)]">
              {testedControls}
            </span>
          </div>

          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-3 text-center">
            <span className="font-caption text-[11px] text-[var(--color-text-muted)] block">
              Failed Controls
            </span>
            <span className="font-h3 font-bold tabular-nums text-[var(--color-risk-critical-foreground)]">
              {failedControls}
            </span>
          </div>

          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-3 text-center">
            <span className="font-caption text-[11px] text-[var(--color-text-muted)] block">
              Overdue Tests
            </span>
            <span className="font-h3 font-bold tabular-nums text-[var(--color-warning)]">
              {overdueTests}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-2 text-xs text-[var(--color-text-muted)]">
          <span>Control testing SLA completion rate currently at 94.2%</span>
          <button
            type="button"
            onClick={onNavigateControls}
            className="font-caption font-semibold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View Controls</span>
            <ArrowRight className="size-3" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
