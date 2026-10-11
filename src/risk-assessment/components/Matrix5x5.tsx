import { calculateScore, getSeverityBand, type LikelihoodLevel, type ImpactLevel } from '../risk-assessment-data'

interface Matrix5x5Props {
  inherentLikelihood?: LikelihoodLevel
  inherentImpact?: ImpactLevel
  residualLikelihood?: LikelihoodLevel
  residualImpact?: ImpactLevel
  onSelectCell?: (likelihood: LikelihoodLevel, impact: ImpactLevel) => void
  interactive?: boolean
  mode?: 'inherent' | 'residual' | 'comparison'
  size?: 'sm' | 'md' | 'lg'
}

export function Matrix5x5({
  inherentLikelihood,
  inherentImpact,
  residualLikelihood,
  residualImpact,
  onSelectCell,
  interactive = false,
  mode = 'inherent',
  size = 'md',
}: Matrix5x5Props) {
  // Y-axis: Likelihood levels descending: 5 down to 1
  const likelihoods: LikelihoodLevel[] = [5, 4, 3, 2, 1]
  // X-axis: Impact levels ascending: 1 up to 5
  const impacts: ImpactLevel[] = [1, 2, 3, 4, 5]

  const getCellBg = (score: number) => {
    const sev = getSeverityBand(score)
    switch (sev) {
      case 'critical':
        return 'bg-rose-500/20 text-rose-800 dark:text-rose-200 border-rose-400/40 hover:bg-rose-500/30'
      case 'high':
        return 'bg-amber-500/20 text-amber-800 dark:text-amber-200 border-amber-400/40 hover:bg-amber-500/30'
      case 'moderate':
        return 'bg-yellow-500/15 text-yellow-800 dark:text-yellow-200 border-yellow-400/40 hover:bg-yellow-500/25'
      case 'low':
      default:
        return 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 border-emerald-400/40 hover:bg-emerald-500/25'
    }
  }

  const cellSizeClasses = {
    sm: 'h-10 text-[11px]',
    md: 'h-12 text-xs',
    lg: 'h-14 text-sm',
  }[size]

  return (
    <div className="w-full select-none">
      {/* Matrix container with labeled axes */}
      <div className="flex gap-2.5 items-stretch">
        {/* Y-axis label */}
        <div className="flex flex-col justify-center items-center py-2 pr-1">
          <span className="font-caption text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] [writing-mode:vertical-lr] rotate-180 text-center">
            Likelihood (1–5)
          </span>
        </div>

        {/* Matrix Grid */}
        <div className="flex-1 space-y-1.5">
          <div className="grid grid-cols-5 gap-1.5">
            {likelihoods.map((l) =>
              impacts.map((i) => {
                const score = calculateScore(l, i)
                const isInherent = inherentLikelihood === l && inherentImpact === i
                const isResidual = residualLikelihood === l && residualImpact === i

                const isSelected =
                  (mode === 'inherent' && isInherent) ||
                  (mode === 'residual' && isResidual) ||
                  (mode === 'comparison' && (isInherent || isResidual))

                return (
                  <button
                    key={`${l}-${i}`}
                    type="button"
                    disabled={!interactive}
                    onClick={() => interactive && onSelectCell?.(l, i)}
                    aria-label={`Likelihood ${l}, Impact ${i}, Score ${score} (${getSeverityBand(score)})`}
                    className={`relative rounded-lg border p-1 font-mono font-bold flex flex-col items-center justify-center transition-all ${cellSizeClasses} ${getCellBg(
                      score
                    )} ${
                      isSelected
                        ? 'ring-2 ring-[var(--color-primary)] ring-offset-2 shadow-md z-10 scale-[1.03]'
                        : ''
                    } ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    <span className="opacity-75">{score}</span>

                    {/* Position Badges */}
                    {isInherent && (mode === 'inherent' || mode === 'comparison') && (
                      <span
                        title={`Inherent Position: L${l} × I${i} = ${score}`}
                        className={`absolute top-1 left-1 flex size-5 items-center justify-center rounded-full bg-rose-600 text-white text-[10px] font-extrabold shadow-sm ring-1 ring-white ${
                          isResidual ? 'left-1' : 'inset-auto'
                        }`}
                      >
                        I
                      </span>
                    )}

                    {isResidual && (mode === 'residual' || mode === 'comparison') && (
                      <span
                        title={`Residual Position: L${l} × I${i} = ${score}`}
                        className={`absolute bottom-1 right-1 flex size-5 items-center justify-center rounded-full bg-blue-600 text-white text-[10px] font-extrabold shadow-sm ring-1 ring-white ${
                          isInherent ? 'right-1' : 'inset-auto'
                        }`}
                      >
                        R
                      </span>
                    )}
                  </button>
                )
              })
            )}
          </div>

          {/* X-axis labels: Impact 1-5 */}
          <div className="grid grid-cols-5 gap-1.5 text-center pt-1">
            {impacts.map((i) => (
              <div key={i} className="text-[10px] font-bold text-[var(--color-text-muted)] font-mono">
                Impact {i}
              </div>
            ))}
          </div>

          <div className="text-center pt-0.5">
            <span className="font-caption text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Business Impact (1–5)
            </span>
          </div>
        </div>
      </div>

      {/* Legend strip */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--color-border)] pt-2 text-[11px] text-[var(--color-text-muted)]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-emerald-500" />
            <span>Low (1–4)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-yellow-500" />
            <span>Moderate (5–9)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-amber-500" />
            <span>High (10–15)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-rose-500" />
            <span>Critical (16–25)</span>
          </div>
        </div>

        {mode === 'comparison' && (
          <div className="flex items-center gap-3 font-semibold">
            <span className="flex items-center gap-1 text-rose-600">
              <span className="size-3.5 rounded-full bg-rose-600 text-white text-[9px] flex items-center justify-center font-bold">
                I
              </span>
              Inherent
            </span>
            <span className="flex items-center gap-1 text-blue-600">
              <span className="size-3.5 rounded-full bg-blue-600 text-white text-[9px] flex items-center justify-center font-bold">
                R
              </span>
              Residual
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
