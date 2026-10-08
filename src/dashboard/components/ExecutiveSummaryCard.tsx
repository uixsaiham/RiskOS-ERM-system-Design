import { Badge } from '@/components/ui/badge'
import { OVERALL_POSTURE } from '../dashboard-data'
import { AlertCircle, TrendingDown, ArrowRight } from 'lucide-react'

interface ExecutiveSummaryCardProps {
  onFocusAttention?: () => void
}

export function ExecutiveSummaryCard({ onFocusAttention }: ExecutiveSummaryCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-[var(--color-border-strong)] bg-gradient-to-r from-[var(--color-surface)] via-[var(--color-surface)] to-[var(--color-primary-subtle)]/40 p-5 shadow-xs">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-overline font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              EXECUTIVE ASSESSMENT
            </span>
            <Badge variant="warning" size="sm" className="gap-1 font-semibold">
              <AlertCircle className="size-3" />
              Posture: {OVERALL_POSTURE.status}
            </Badge>
            <span className="inline-flex items-center gap-1 font-caption text-[var(--color-success)] font-medium">
              <TrendingDown className="size-3.5" />
              Exposure {OVERALL_POSTURE.exposureReductionPct} vs Q3
            </span>
          </div>

          <p className="font-h3 text-[var(--color-text-primary)] font-semibold leading-snug">
            Overall risk exposure is moderately elevated.
          </p>
          <p className="font-body-md text-[var(--color-text-secondary)] leading-relaxed">
            Critical technology and third-party risks require immediate executive attention, while overall residual exposure has decreased 8% compared with the previous quarter through verified mitigation controls.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 shrink-0 border-t lg:border-t-0 lg:border-l border-[var(--color-border)] pt-3 lg:pt-0 lg:pl-6">
          <div className="text-left lg:text-right">
            <p className="font-caption text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">
              Priority Focus Area
            </p>
            <p className="font-body-sm font-semibold text-[var(--color-risk-critical-foreground)]">
              {OVERALL_POSTURE.recommendedFocus}
            </p>
            <p className="font-caption text-[var(--color-text-muted)] mt-0.5">
              {OVERALL_POSTURE.importantChange}
            </p>
          </div>

          {onFocusAttention && (
            <button
              type="button"
              onClick={onFocusAttention}
              className="inline-flex items-center gap-1.5 font-caption font-semibold text-[var(--color-primary)] hover:underline"
            >
              <span>Jump to attention items</span>
              <ArrowRight className="size-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
