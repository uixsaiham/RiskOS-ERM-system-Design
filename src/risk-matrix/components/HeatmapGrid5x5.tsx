import { useState } from 'react'
import {
  LIKELIHOOD_AXIS,
  IMPACT_AXIS,
  calculateMatrixScore,
  getSeverityBandFromScore,
  type MatrixCellData,
  type LikelihoodLevel,
  type ImpactLevel,
  type MatrixViewMode,
} from '../risk-matrix-data'

interface HeatmapGrid5x5Props {
  gridData: Record<string, MatrixCellData>
  selectedCellKey: string | null
  onSelectCell: (likelihood: LikelihoodLevel, impact: ImpactLevel) => void
  viewMode: MatrixViewMode
}

export function HeatmapGrid5x5({
  gridData,
  selectedCellKey,
  onSelectCell,
  viewMode,
}: HeatmapGrid5x5Props) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)

  const getCellStyling = (score: number) => {
    const sev = getSeverityBandFromScore(score)
    switch (sev) {
      case 'critical':
        return {
          bg: 'bg-rose-500/20 hover:bg-rose-500/35 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 border-rose-400/50',
          textColor: 'text-rose-900 dark:text-rose-100',
          badgeBg: 'bg-rose-600 text-white',
          sevLabel: 'Critical',
        }
      case 'high':
        return {
          bg: 'bg-amber-500/20 hover:bg-amber-500/35 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 border-amber-400/50',
          textColor: 'text-amber-900 dark:text-amber-100',
          badgeBg: 'bg-amber-600 text-white',
          sevLabel: 'High',
        }
      case 'moderate':
        return {
          bg: 'bg-yellow-500/15 hover:bg-yellow-500/30 dark:bg-yellow-950/35 dark:hover:bg-yellow-900/45 border-yellow-400/40',
          textColor: 'text-yellow-900 dark:text-yellow-100',
          badgeBg: 'bg-yellow-600 text-white',
          sevLabel: 'Moderate',
        }
      case 'low':
      default:
        return {
          bg: 'bg-emerald-500/15 hover:bg-emerald-500/30 dark:bg-emerald-950/35 dark:hover:bg-emerald-900/45 border-emerald-400/40',
          textColor: 'text-emerald-900 dark:text-emerald-100',
          badgeBg: 'bg-emerald-600 text-white',
          sevLabel: 'Low',
        }
    }
  }

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-xs space-y-4">
      {/* Grid Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
        <div>
          <h2 className="font-h3 text-base font-bold text-[var(--color-text-primary)]">
            5×5 Risk Concentration Heatmap
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Click any cell to inspect the specific organizational risks mapped to that intersection.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-[var(--color-text-muted)] uppercase tracking-wider text-[10px]">
            Mode:
          </span>
          <span className="font-mono font-bold capitalize text-[var(--color-primary)]">
            {viewMode} Exposure
          </span>
        </div>
      </div>

      {/* Main Heatmap Container */}
      <div className="relative pt-2">
        <div className="flex gap-3 items-stretch">
          {/* Y-Axis: Likelihood Labels (Left Column) */}
          <div className="flex flex-col justify-between py-1 w-28 sm:w-36 shrink-0">
            {LIKELIHOOD_AXIS.map((axis) => (
              <div
                key={axis.level}
                className="h-16 sm:h-20 flex flex-col justify-center pr-2 text-right border-r-2 border-[var(--color-border)]"
              >
                <div className="font-label text-xs font-bold text-[var(--color-text-primary)] leading-tight">
                  <span className="font-mono font-extrabold text-[var(--color-primary)] mr-1">
                    {axis.level}
                  </span>
                  <span>{axis.label}</span>
                </div>
                <span className="text-[10px] text-[var(--color-text-muted)] font-mono truncate">
                  {axis.probability}
                </span>
              </div>
            ))}
          </div>

          {/* 5x5 Matrix Cell Grid */}
          <div className="flex-1 space-y-2">
            <div className="grid grid-cols-5 gap-2">
              {LIKELIHOOD_AXIS.map((axisL) =>
                IMPACT_AXIS.map((axisI) => {
                  const key = `${axisL.level}-${axisI.level}`
                  const cell = gridData[key] || {
                    likelihood: axisL.level,
                    impact: axisI.level,
                    score: calculateMatrixScore(axisL.level, axisI.level),
                    severity: getSeverityBandFromScore(calculateMatrixScore(axisL.level, axisI.level)),
                    risks: [],
                    count: 0,
                  }

                  const isSelected = selectedCellKey === key
                  const isHovered = hoveredKey === key
                  const styling = getCellStyling(cell.score)

                  return (
                    <div key={key} className="relative group">
                      <button
                        type="button"
                        onClick={() => onSelectCell(axisL.level, axisI.level)}
                        onMouseEnter={() => setHoveredKey(key)}
                        onMouseLeave={() => setHoveredKey(null)}
                        aria-label={`Likelihood ${axisL.level} (${axisL.label}), Impact ${axisI.level} (${axisI.label}), Score ${cell.score} (${styling.sevLabel}), ${cell.count} risks`}
                        className={`w-full h-16 sm:h-20 rounded-xl border p-2 flex flex-col justify-between items-stretch transition-all cursor-pointer ${
                          styling.bg
                        } ${styling.textColor} ${
                          isSelected
                            ? 'ring-3 ring-[var(--color-primary)] ring-offset-2 z-20 shadow-lg scale-[1.03] border-[var(--color-primary)]'
                            : isHovered
                            ? 'scale-[1.01] shadow-xs z-10'
                            : ''
                        }`}
                      >
                        {/* Cell Top: Score and Severity Tag */}
                        <div className="flex items-center justify-between text-[11px] leading-none">
                          <span className="font-mono font-extrabold opacity-80">
                            {cell.score}
                          </span>
                          <span className="font-caption text-[9px] uppercase tracking-wider font-bold opacity-70 hidden sm:inline">
                            {styling.sevLabel}
                          </span>
                        </div>

                        {/* Cell Center: Risk Count */}
                        <div className="flex items-center justify-center">
                          {cell.count > 0 ? (
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-xs sm:text-sm font-mono font-black shadow-xs ${styling.badgeBg}`}
                            >
                              {cell.count}
                            </span>
                          ) : (
                            <span className="text-[11px] font-mono text-[var(--color-text-muted)] opacity-40">
                              0
                            </span>
                          )}
                        </div>

                        {/* Cell Bottom: Coordinate reference */}
                        <div className="text-[9px] font-mono opacity-50 text-right">
                          L{axisL.level}×I{axisI.level}
                        </div>
                      </button>

                      {/* Accessible Hover Tooltip */}
                      {isHovered && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 rounded-xl border border-[var(--color-border)] bg-slate-900 text-white p-3 shadow-xl z-50 text-xs pointer-events-none animate-in fade-in zoom-in-95">
                          <div className="flex items-center justify-between border-b border-slate-700 pb-1.5 mb-1.5">
                            <span className="font-mono font-bold text-blue-400">
                              Cell [{axisL.level}, {axisI.level}]
                            </span>
                            <span className="font-mono font-extrabold text-amber-300">
                              Score: {cell.score} / 25
                            </span>
                          </div>
                          <div className="space-y-1 text-[11px]">
                            <p>
                              <strong className="text-slate-300">Likelihood:</strong> {axisL.label} ({axisL.level}/5)
                            </p>
                            <p>
                              <strong className="text-slate-300">Impact:</strong> {axisI.label} ({axisI.level}/5)
                            </p>
                            <p>
                              <strong className="text-slate-300">Severity:</strong> {styling.sevLabel}
                            </p>
                            <div className="border-t border-slate-700 pt-1 mt-1 text-emerald-400 font-bold">
                              {cell.count} {cell.count === 1 ? 'Risk Mapped' : 'Risks Mapped'}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>

            {/* X-Axis: Impact Labels (Bottom Row) */}
            <div className="grid grid-cols-5 gap-2 pt-2 border-t-2 border-[var(--color-border)] text-center">
              {IMPACT_AXIS.map((axis) => (
                <div key={axis.level} className="pt-1 px-1">
                  <div className="font-label text-xs font-bold text-[var(--color-text-primary)] leading-tight">
                    <span className="font-mono font-extrabold text-[var(--color-primary)] mr-1">
                      {axis.level}
                    </span>
                    <span>{axis.label}</span>
                  </div>
                  <span className="text-[10px] text-[var(--color-text-muted)] font-mono truncate block mt-0.5">
                    {axis.lossDescription}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center pt-1">
              <span className="font-caption text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Consequence / Business Impact Axis (1–5)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Matrix Severity Legend ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-border)] pt-3 text-xs text-[var(--color-text-secondary)]">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-md bg-emerald-500/30 border border-emerald-500/60" />
            <span className="font-medium">Low (Score 1–4)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-md bg-yellow-500/30 border border-yellow-500/60" />
            <span className="font-medium">Moderate (Score 5–9)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-md bg-amber-500/30 border border-amber-500/60" />
            <span className="font-medium">High (Score 10–15)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-md bg-rose-500/30 border border-rose-500/60" />
            <span className="font-medium">Critical (Score 16–25)</span>
          </div>
        </div>

        <span className="text-[11px] text-[var(--color-text-muted)] font-mono">
          Threshold: Likelihood × Impact
        </span>
      </div>
    </div>
  )
}

