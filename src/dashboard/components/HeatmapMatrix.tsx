import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RiskSeverityBadge } from '@/components/ui/risk-severity'
import {
  HEATMAP_MATRIX,
  type MatrixCellData,
} from '../dashboard-data'
import { ArrowRight, ShieldCheck } from 'lucide-react'

interface HeatmapMatrixProps {
  onSelectRiskId?: (riskId: string) => void
  onCellClick?: (cell: MatrixCellData) => void
  selectedCell?: MatrixCellData | null
}

const LIKELIHOOD_LABELS = [
  { level: 5, label: 'Frequent (5)' },
  { level: 4, label: 'Likely (4)' },
  { level: 3, label: 'Possible (3)' },
  { level: 2, label: 'Unlikely (2)' },
  { level: 1, label: 'Rare (1)' },
]

const IMPACT_LABELS = [
  { level: 1, label: 'Negligible (1)' },
  { level: 2, label: 'Minor (2)' },
  { level: 3, label: 'Moderate (3)' },
  { level: 4, label: 'Major (4)' },
  { level: 5, label: 'Catastrophic (5)' },
]

export function HeatmapMatrix({
  onSelectRiskId,
  onCellClick,
  selectedCell,
}: HeatmapMatrixProps) {
  const [viewMode, setViewMode] = useState<'residual' | 'inherent'>('residual')

  // Calculate totals by band
  const countsBySeverity = useMemo(() => {
    const summary: Record<string, number> = {
      critical: 0,
      high: 0,
      moderate: 0,
      low: 0,
      total: 0,
    }
    for (const cell of HEATMAP_MATRIX) {
      const count = viewMode === 'residual' ? cell.residualCount : cell.inherentCount
      summary[cell.severity] = (summary[cell.severity] ?? 0) + count
      summary.total += count
    }
    return summary
  }, [viewMode])

  const inherentCritical = HEATMAP_MATRIX.reduce(
    (acc, c) => (c.severity === 'critical' ? acc + c.inherentCount : acc),
    0,
  )
  const residualCritical = HEATMAP_MATRIX.reduce(
    (acc, c) => (c.severity === 'critical' ? acc + c.residualCount : acc),
    0,
  )
  const criticalReduction = inherentCritical - residualCritical

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle>5×5 Enterprise Risk Matrix</CardTitle>
            <Badge variant="neutral" size="sm">
              {viewMode === 'residual' ? 'Residual Exposure' : 'Inherent Exposure'}
            </Badge>
          </div>
          <CardDescription className="mt-1">
            Likelihood × Impact distribution of {countsBySeverity.total} enterprise risks across portfolio
          </CardDescription>
        </div>

        <div className="flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-1">
          <Button
            size="sm"
            variant={viewMode === 'residual' ? 'primary' : 'ghost'}
            className="h-7 text-xs"
            onClick={() => setViewMode('residual')}
          >
            Residual
          </Button>
          <Button
            size="sm"
            variant={viewMode === 'inherent' ? 'primary' : 'ghost'}
            className="h-7 text-xs"
            onClick={() => setViewMode('inherent')}
          >
            Inherent
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-1">
        {/* Severity counts pill summary */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <div className="flex items-center justify-between rounded-md border border-[var(--color-risk-critical-border)] bg-[var(--color-risk-critical-subtle)] px-2.5 py-1.5 text-xs">
            <span className="font-medium text-[var(--color-risk-critical-foreground)]">Critical</span>
            <span className="font-bold tabular-nums text-[var(--color-risk-critical-foreground)]">
              {countsBySeverity.critical}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-md border border-[var(--color-risk-high-border)] bg-[var(--color-risk-high-subtle)] px-2.5 py-1.5 text-xs">
            <span className="font-medium text-[var(--color-risk-high-foreground)]">High</span>
            <span className="font-bold tabular-nums text-[var(--color-risk-high-foreground)]">
              {countsBySeverity.high}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-md border border-[var(--color-risk-moderate-border)] bg-[var(--color-risk-moderate-subtle)] px-2.5 py-1.5 text-xs">
            <span className="font-medium text-[var(--color-risk-moderate-foreground)]">Moderate</span>
            <span className="font-bold tabular-nums text-[var(--color-risk-moderate-foreground)]">
              {countsBySeverity.moderate}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-md border border-[var(--color-risk-low-border)] bg-[var(--color-risk-low-subtle)] px-2.5 py-1.5 text-xs">
            <span className="font-medium text-[var(--color-risk-low-foreground)]">Low</span>
            <span className="font-bold tabular-nums text-[var(--color-risk-low-foreground)]">
              {countsBySeverity.low}
            </span>
          </div>
        </div>

        {/* 5x5 Matrix Layout */}
        <div className="relative overflow-x-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
          <div className="min-w-[440px]">
            {/* Impact header label */}
            <div className="mb-2 text-center">
              <span className="font-caption uppercase tracking-wider text-[var(--color-text-muted)] text-[11px] font-semibold">
                Impact → (Negligible to Catastrophic)
              </span>
            </div>

            <div className="flex gap-2">
              {/* Likelihood vertical label */}
              <div className="flex w-6 items-center justify-center">
                <span className="font-caption uppercase tracking-wider text-[var(--color-text-muted)] text-[11px] font-semibold -rotate-90 whitespace-nowrap">
                  Likelihood →
                </span>
              </div>

              {/* Matrix Rows */}
              <div className="flex-1 space-y-1.5">
                {[5, 4, 3, 2, 1].map((likelihood) => {
                  const likelihoodMeta = LIKELIHOOD_LABELS.find((l) => l.level === likelihood)
                  return (
                    <div key={likelihood} className="flex items-center gap-2">
                      <span className="w-24 text-right font-caption text-xs text-[var(--color-text-secondary)] font-medium truncate">
                        {likelihoodMeta?.label}
                      </span>

                      {/* 5 columns */}
                      <div className="grid flex-1 grid-cols-5 gap-1.5">
                        {[1, 2, 3, 4, 5].map((impact) => {
                          const cell = HEATMAP_MATRIX.find(
                            (c) => c.likelihood === likelihood && c.impact === impact,
                          )
                          if (!cell) return null

                          const count = viewMode === 'residual' ? cell.residualCount : cell.inherentCount
                          const isSelected =
                            selectedCell?.likelihood === cell.likelihood &&
                            selectedCell?.impact === cell.impact

                          const bgStyles =
                            cell.severity === 'critical'
                              ? 'bg-[var(--color-risk-critical-subtle)] border-[var(--color-risk-critical-border)] text-[var(--color-risk-critical-foreground)] hover:bg-[var(--color-risk-critical-muted)]'
                              : cell.severity === 'high'
                                ? 'bg-[var(--color-risk-high-subtle)] border-[var(--color-risk-high-border)] text-[var(--color-risk-high-foreground)] hover:bg-[var(--color-risk-high-muted)]'
                                : cell.severity === 'moderate'
                                  ? 'bg-[var(--color-risk-moderate-subtle)] border-[var(--color-risk-moderate-border)] text-[var(--color-risk-moderate-foreground)] hover:bg-[var(--color-risk-moderate-muted)]'
                                  : 'bg-[var(--color-risk-low-subtle)] border-[var(--color-risk-low-border)] text-[var(--color-risk-low-foreground)] hover:bg-[var(--color-risk-low-muted)]'

                          return (
                            <button
                              key={`${likelihood}-${impact}`}
                              type="button"
                              onClick={() => onCellClick?.(cell)}
                              className={cn(
                                'relative flex h-14 flex-col items-center justify-center rounded-lg border p-1 text-center transition-all cursor-pointer',
                                bgStyles,
                                isSelected && 'ring-2 ring-[var(--color-primary)] ring-offset-2 scale-[1.03] shadow-md z-10',
                                count === 0 && 'opacity-40',
                              )}
                              title={`L${likelihood} × I${impact} = ${cell.score} (${cell.severity.toUpperCase()}) · ${count} risks`}
                            >
                              <span className="font-h3 tabular-nums font-bold leading-none">
                                {count}
                              </span>
                              <span className="font-caption text-[10px] opacity-75 mt-0.5">
                                Score {cell.score}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}

                {/* Impact column labels bottom row */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="w-24 text-right" />
                  <div className="grid flex-1 grid-cols-5 gap-1.5 text-center">
                    {IMPACT_LABELS.map((imp) => (
                      <span
                        key={imp.level}
                        className="font-caption text-[11px] text-[var(--color-text-secondary)] truncate"
                        title={imp.label}
                      >
                        {imp.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected cell detail banner */}
        {selectedCell ? (
          <div className="flex items-center justify-between rounded-lg border border-[var(--color-primary)] bg-[var(--color-primary-subtle)]/40 p-3">
            <div className="flex items-center gap-3">
              <span className="flex size-7 items-center justify-center rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold">
                L{selectedCell.likelihood}×I{selectedCell.impact}
              </span>
              <div>
                <p className="font-body-sm font-semibold text-[var(--color-text-primary)]">
                  Cell Score {selectedCell.score} · {selectedCell.residualCount} Residual Risks ({selectedCell.inherentCount} Inherent)
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <RiskSeverityBadge severity={selectedCell.severity} size="sm" />
                  {selectedCell.topRiskIds && selectedCell.topRiskIds.length > 0 && (
                    <span className="font-caption text-[var(--color-text-secondary)]">
                      Sample: {selectedCell.topRiskIds.join(', ')}
                    </span>
                  )}
                </div>
              </div>
            </div>
            {selectedCell.topRiskIds && selectedCell.topRiskIds.length > 0 && onSelectRiskId && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onSelectRiskId(selectedCell.topRiskIds![0])}
                className="text-xs"
              >
                Inspect {selectedCell.topRiskIds[0]}
                <ArrowRight className="size-3.5 ml-1" />
              </Button>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-3 py-2 text-xs text-[var(--color-text-secondary)]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-[var(--color-success)] shrink-0" />
              <span>
                <strong>Control mitigation effect:</strong> {criticalReduction} critical risks downgraded to high/moderate through verified controls.
              </span>
            </div>
            <span className="font-caption text-[var(--color-text-muted)] text-[11px]">
              Click any cell to filter register
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
