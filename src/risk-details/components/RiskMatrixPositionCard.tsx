import { useMemo } from 'react'
import { Grid, ArrowDownLeft, Shield } from 'lucide-react'
import type { ComprehensiveRiskDetail } from '../risk-details-data'

interface RiskMatrixPositionCardProps {
  detail: ComprehensiveRiskDetail
}

const LIKELIHOOD_LABELS: Record<number, string> = {
  5: '5 - Almost Certain',
  4: '4 - Likely',
  3: '3 - Possible',
  2: '2 - Unlikely',
  1: '1 - Rare',
}

const IMPACT_LABELS: Record<number, string> = {
  1: '1 - Negligible',
  2: '2 - Minor',
  3: '3 - Moderate',
  4: '4 - Major',
  5: '5 - Catastrophic',
}

function getCellSeverity(score: number): 'low' | 'moderate' | 'high' | 'critical' {
  if (score >= 16) return 'critical'
  if (score >= 10) return 'high'
  if (score >= 5) return 'moderate'
  return 'low'
}

function getCellColorClass(score: number): string {
  const sev = getCellSeverity(score)
  switch (sev) {
    case 'critical':
      return 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-300/40 dark:border-rose-900/40'
    case 'high':
      return 'bg-amber-500/20 text-amber-800 dark:text-amber-200 border-amber-300/40 dark:border-amber-900/40'
    case 'moderate':
      return 'bg-yellow-400/20 text-yellow-800 dark:text-yellow-200 border-yellow-300/40 dark:border-yellow-900/40'
    case 'low':
      return 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 border-emerald-300/40 dark:border-emerald-900/40'
  }
}

export function RiskMatrixPositionCard({ detail }: RiskMatrixPositionCardProps) {
  const { base } = detail
  const {
    inherentLikelihood,
    inherentImpact,
    inherentScore,
    residualLikelihood,
    residualImpact,
    residualScore,
  } = base

  const matrixRows = useMemo(() => [5, 4, 3, 2, 1], [])
  const matrixCols = useMemo(() => [1, 2, 3, 4, 5], [])

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
        <div className="flex items-center gap-2">
          <Grid className="size-4 text-[var(--color-primary)]" />
          <h3 className="font-h3 text-sm font-bold text-[var(--color-text-primary)]">
            5 × 5 Risk Heat Matrix Positioning
          </h3>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-rose-600 ring-2 ring-rose-200" />
            <span className="font-medium text-[var(--color-text-secondary)]">Inherent ({inherentScore})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-blue-600 ring-2 ring-blue-200" />
            <span className="font-medium text-[var(--color-text-secondary)]">Residual ({residualScore})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-xs border border-dashed border-slate-500 bg-slate-100 dark:bg-slate-800" />
            <span className="font-medium text-[var(--color-text-muted)]">Appetite (≤12)</span>
          </div>
        </div>
      </div>

      {/* Grid container with axes */}
      <div className="relative">
        {/* Y Axis Label */}
        <div className="flex">
          <div className="w-24 shrink-0 flex items-center justify-center -rotate-90 text-[10px] uppercase font-bold tracking-wider text-[var(--color-text-muted)] select-none">
            Likelihood
          </div>

          <div className="flex-1 space-y-1">
            {matrixRows.map((rowLikelihood) => (
              <div key={rowLikelihood} className="flex items-center gap-1.5">
                {/* Row label */}
                <span className="w-16 shrink-0 text-right font-mono text-[11px] text-[var(--color-text-muted)] font-medium pr-1 select-none">
                  L{rowLikelihood}
                </span>

                {/* Cells in row */}
                <div className="grid grid-cols-5 gap-1.5 flex-1">
                  {matrixCols.map((colImpact) => {
                    const cellScore = rowLikelihood * colImpact
                    const isInherent =
                      rowLikelihood === inherentLikelihood && colImpact === inherentImpact
                    const isResidual =
                      rowLikelihood === residualLikelihood && colImpact === residualImpact
                    const isWithinAppetite = cellScore <= 12

                    return (
                      <div
                        key={colImpact}
                        className={`relative h-12 rounded-lg border flex flex-col items-center justify-center transition-all ${getCellColorClass(
                          cellScore
                        )} ${
                          isWithinAppetite
                            ? 'ring-1 ring-inset ring-slate-400/30'
                            : ''
                        }`}
                        title={`L${rowLikelihood} × I${colImpact} = Score ${cellScore} (${getCellSeverity(
                          cellScore
                        )})`}
                      >
                        {/* Score number */}
                        <span className="font-mono text-xs font-semibold opacity-75 select-none">
                          {cellScore}
                        </span>

                        {/* Inherent Marker */}
                        {isInherent && (
                          <div
                            className={`absolute inset-x-1 top-1 flex items-center justify-center rounded bg-rose-600 text-white text-[9px] font-bold py-0.5 shadow-sm ring-1 ring-white ${
                              isResidual ? 'opacity-70' : ''
                            }`}
                          >
                            INHERENT
                          </div>
                        )}

                        {/* Residual Marker */}
                        {isResidual && (
                          <div className="absolute inset-x-1 bottom-1 flex items-center justify-center rounded bg-blue-600 text-white text-[9px] font-bold py-0.5 shadow-sm ring-1 ring-white">
                            RESIDUAL
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {/* X Axis Columns Label */}
            <div className="flex items-center gap-1.5 pt-1">
              <span className="w-16 shrink-0" />
              <div className="grid grid-cols-5 gap-1.5 flex-1 text-center font-mono text-[11px] text-[var(--color-text-muted)] font-medium">
                {matrixCols.map((col) => (
                  <span key={col} className="select-none">
                    I{col}
                  </span>
                ))}
              </div>
            </div>

            {/* Impact Axis Label */}
            <div className="text-center text-[10px] uppercase font-bold tracking-wider text-[var(--color-text-muted)] select-none pt-1">
              Impact (Severity)
            </div>
          </div>
        </div>
      </div>

      {/* Trajectory Banner */}
      <div className="rounded-lg bg-[var(--color-surface-secondary)] p-3 border border-[var(--color-border)] text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
          <ArrowDownLeft className="size-4 text-emerald-600" />
          <span>
            Risk mitigation path:{' '}
            <strong className="text-[var(--color-text-primary)]">
              {LIKELIHOOD_LABELS[inherentLikelihood]} / {IMPACT_LABELS[inherentImpact]}
            </strong>{' '}
            →{' '}
            <strong className="text-blue-600 dark:text-blue-400">
              {LIKELIHOOD_LABELS[residualLikelihood]} / {IMPACT_LABELS[residualImpact]}
            </strong>
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-medium text-[var(--color-text-muted)]">
          <Shield className="size-3.5" />
          <span>Target Appetite: Score ≤ 12</span>
        </div>
      </div>
    </div>
  )
}

