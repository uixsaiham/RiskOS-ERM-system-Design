import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MATRIX_PREVIEW_CELLS, type MatrixPreviewCell } from '../dashboard-data'
import { ArrowRight, Grid3X3 } from 'lucide-react'

interface RiskMatrixPreviewProps {
  onNavigateMatrix?: () => void
  onSelectCell?: (cell: MatrixPreviewCell) => void
  selectedCell?: MatrixPreviewCell | null
}

const LIKELIHOOD_LABELS = [
  { level: 5, label: '5 - Frequent' },
  { level: 4, label: '4 - Likely' },
  { level: 3, label: '3 - Possible' },
  { level: 2, label: '2 - Unlikely' },
  { level: 1, label: '1 - Rare' },
]

const IMPACT_LABELS = [
  { level: 1, label: '1 - Negligible' },
  { level: 2, label: '2 - Minor' },
  { level: 3, label: '3 - Moderate' },
  { level: 4, label: '4 - Major' },
  { level: 5, label: '5 - Catastrophic' },
]

export function RiskMatrixPreview({
  onNavigateMatrix,
  onSelectCell,
  selectedCell,
}: RiskMatrixPreviewProps) {
  const getCellSeverityClasses = (severity: string, isSelected: boolean) => {
    const base = 'transition-all cursor-pointer font-bold text-xs flex flex-col items-center justify-center rounded border p-1 shadow-2xs'
    if (isSelected) {
      return `${base} ring-2 ring-[var(--color-primary)] ring-offset-1 z-10 scale-105`
    }

    switch (severity) {
      case 'critical':
        return `${base} bg-[var(--color-risk-critical-subtle)] border-[var(--color-risk-critical-border)] text-[var(--color-risk-critical-foreground)] hover:border-[var(--color-risk-critical)]`
      case 'high':
        return `${base} bg-[var(--color-risk-high-subtle)] border-[var(--color-risk-high-border)] text-[var(--color-risk-high-foreground)] hover:border-[var(--color-risk-high)]`
      case 'moderate':
        return `${base} bg-[var(--color-risk-moderate-subtle)] border-[var(--color-risk-moderate-border)] text-[var(--color-risk-moderate-foreground)] hover:border-[var(--color-risk-moderate)]`
      case 'low':
      default:
        return `${base} bg-[var(--color-risk-low-subtle)] border-[var(--color-risk-low-border)] text-[var(--color-risk-low-foreground)] hover:border-[var(--color-risk-low)]`
    }
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle>5 × 5 Risk Matrix Preview</CardTitle>
            <Badge variant="neutral" size="sm">
              Residual Concentration
            </Badge>
          </div>
          <CardDescription className="mt-1">
            Likelihood × Impact concentration across 248 portfolio risks
          </CardDescription>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onNavigateMatrix}
          className="gap-1.5 text-xs text-[var(--color-primary)] hover:underline shrink-0"
        >
          <span>View Risk Matrix</span>
          <ArrowRight className="size-3.5" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-3.5 pt-1">
        {/* Matrix Visualization */}
        <div className="relative overflow-x-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
          <div className="min-w-[320px]">
            {/* Top axis label: Impact */}
            <div className="mb-2 text-center">
              <span className="font-caption uppercase tracking-wider text-[var(--color-text-muted)] text-[11px] font-semibold">
                Impact (Low → Catastrophic)
              </span>
            </div>

            {/* Matrix rows */}
            <div className="space-y-1.5">
              {LIKELIHOOD_LABELS.map((lik) => {
                const rowCells = MATRIX_PREVIEW_CELLS.filter((c) => c.likelihood === lik.level)
                return (
                  <div key={lik.level} className="flex items-center gap-2">
                    {/* Y-axis label */}
                    <div className="w-20 shrink-0 text-right">
                      <span className="font-caption text-[11px] font-medium text-[var(--color-text-secondary)] truncate block">
                        {lik.label}
                      </span>
                    </div>

                    {/* 5 cells in row */}
                    <div className="grid grid-cols-5 gap-1.5 flex-1">
                      {rowCells.map((cell) => {
                        const isSelected =
                          selectedCell?.likelihood === cell.likelihood &&
                          selectedCell?.impact === cell.impact
                        return (
                          <button
                            key={`${cell.likelihood}-${cell.impact}`}
                            type="button"
                            onClick={() => onSelectCell?.(cell)}
                            title={`L${cell.likelihood} × I${cell.impact} (Score: ${cell.score}) · ${cell.count} risks [${cell.severity}]`}
                            className={getCellSeverityClasses(cell.severity, isSelected)}
                            style={{ height: '38px' }}
                          >
                            <span className="text-sm font-bold tabular-nums">
                              {cell.count}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* X-axis labels under columns */}
            <div className="flex items-center gap-2 mt-2">
              <div className="w-20 shrink-0" />
              <div className="grid grid-cols-5 gap-1.5 flex-1 text-center">
                {IMPACT_LABELS.map((imp) => (
                  <span
                    key={imp.level}
                    className="font-caption text-[10px] text-[var(--color-text-muted)] truncate"
                    title={imp.label}
                  >
                    I{imp.level}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Selected cell hint or legend */}
        <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-2.5 text-xs text-[var(--color-text-muted)]">
          {selectedCell ? (
            <div className="flex items-center gap-2 text-[var(--color-text-primary)]">
              <Grid3X3 className="size-3.5 text-[var(--color-primary)]" />
              <span className="font-medium">
                L{selectedCell.likelihood} × I{selectedCell.impact} (Score {selectedCell.score}):
              </span>
              <span className="font-bold">{selectedCell.count} risks</span>
              <span className="capitalize text-[var(--color-text-muted)]">({selectedCell.severity})</span>
            </div>
          ) : (
            <span className="font-caption text-[11px]">
              Dense risk concentration at L3/I2 (22 risks) & L3/I3 (21 risks)
            </span>
          )}

          <button
            type="button"
            onClick={onNavigateMatrix}
            className="font-caption font-semibold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Full 5×5 Matrix</span>
            <ArrowRight className="size-3" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
