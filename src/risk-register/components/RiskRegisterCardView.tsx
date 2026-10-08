import { Avatar, Badge, StatusBadge, Button } from '@/components/ui'
import { Checkbox } from '@/components/ui/checkbox'
import { RiskSeverityBadge } from '@/components/ui/risk-severity'
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react'
import type { RiskRegisterItem } from '../risk-register-data'

interface RiskRegisterCardViewProps {
  risks: RiskRegisterItem[]
  selectedIds: string[]
  onToggleSelectRow: (id: string) => void
  onInspectRisk: (risk: RiskRegisterItem) => void
}

export function RiskRegisterCardView({
  risks,
  selectedIds,
  onToggleSelectRow,
  onInspectRisk,
}: RiskRegisterCardViewProps) {
  const getTrendIcon = (trend: RiskRegisterItem['trend']) => {
    switch (trend) {
      case 'increasing':
        return (
          <span className="inline-flex items-center gap-1 text-[var(--color-risk-critical-foreground)] font-semibold text-xs">
            <TrendingUp className="size-3.5" />
            <span>Increasing</span>
          </span>
        )
      case 'decreasing':
        return (
          <span className="inline-flex items-center gap-1 text-[var(--color-success)] font-semibold text-xs">
            <TrendingDown className="size-3.5" />
            <span>Decreasing</span>
          </span>
        )
      case 'stable':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[var(--color-text-muted)] text-xs">
            <Minus className="size-3.5" />
            <span>Stable</span>
          </span>
        )
    }
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {risks.map((risk) => {
        const isSelected = selectedIds.includes(risk.id)

        return (
          <div
            key={risk.id}
            onClick={() => onInspectRisk(risk)}
            className={`flex flex-col justify-between rounded-xl border p-4 shadow-2xs transition-all cursor-pointer ${
              isSelected
                ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)]/40 ring-1 ring-[var(--color-primary)]'
                : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] hover:shadow-xs'
            }`}
          >
            <div className="space-y-3">
              {/* Header row: Checkbox, ID, Category */}
              <div className="flex items-center justify-between gap-2">
                <div
                  className="flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Checkbox
                    checked={isSelected}
                    onChange={() => onToggleSelectRow(risk.id)}
                    aria-label={`Select risk ${risk.id}`}
                  />
                  <span className="font-mono text-xs font-bold text-[var(--color-primary)]">
                    {risk.id}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Badge variant="neutral" size="sm">
                    {risk.category}
                  </Badge>
                  <StatusBadge status={risk.status} size="sm" />
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h4 className="font-label text-sm font-semibold text-[var(--color-text-primary)] leading-tight">
                  {risk.title}
                </h4>
                <p className="mt-1 font-caption text-xs text-[var(--color-text-muted)] line-clamp-2">
                  {risk.description}
                </p>
              </div>

              {/* Scoring Comparison Card */}
              <div className="grid grid-cols-2 gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-2.5">
                <div>
                  <span className="font-caption text-[11px] text-[var(--color-text-muted)] block">
                    Inherent Risk
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-mono text-xs font-bold tabular-nums text-[var(--color-text-secondary)]">
                      {risk.inherentScore} / 25
                    </span>
                    <RiskSeverityBadge severity={risk.inherentSeverity} size="sm" />
                  </div>
                </div>

                <div>
                  <span className="font-caption text-[11px] text-[var(--color-text-muted)] block">
                    Residual Risk
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-mono text-xs font-bold tabular-nums text-[var(--color-text-primary)]">
                      {risk.residualScore} / 25
                    </span>
                    <RiskSeverityBadge severity={risk.residualSeverity} size="sm" />
                  </div>
                </div>
              </div>

              {/* Owner and Department */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <Avatar name={risk.owner} size="sm" />
                  <div className="min-w-0">
                    <p className="font-medium text-[var(--color-text-primary)] truncate">
                      {risk.owner}
                    </p>
                    <p className="font-caption text-[11px] text-[var(--color-text-muted)] truncate">
                      {risk.department}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  {getTrendIcon(risk.trend)}
                </div>
              </div>
            </div>

            {/* Footer row: Next review & CTA */}
            <div className="mt-4 pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                <Calendar className="size-3.5" />
                <span>{risk.nextReviewDate}</span>
                {risk.isReviewOverdue && (
                  <span className="text-[var(--color-risk-critical-foreground)] font-semibold flex items-center gap-0.5 ml-1">
                    <AlertTriangle className="size-3" />
                    Overdue
                  </span>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onInspectRisk(risk)}
                className="h-7 text-xs text-[var(--color-primary)] font-semibold gap-1 hover:underline p-0"
              >
                <span>View Risk</span>
                <ArrowRight className="size-3" />
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

