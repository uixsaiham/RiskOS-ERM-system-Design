import { OVERALL_POSTURE } from '../dashboard-data'
import { AlertCircle, TrendingDown, ArrowRight } from 'lucide-react'

interface ExecutiveSummaryCardProps {
  onFocusAttention?: () => void
}

export function ExecutiveSummaryCard({ onFocusAttention }: ExecutiveSummaryCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-gradient-to-r from-white via-white to-blue-50/25 p-5 shadow-xs">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-semibold text-slate-500">
              Executive Assessment
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200/70">
              <AlertCircle className="size-3" />
              Posture: {OVERALL_POSTURE.status}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
              <TrendingDown className="size-3.5" />
              Exposure {OVERALL_POSTURE.exposureReductionPct} vs Q3
            </span>
          </div>

          <p className="text-base font-semibold text-slate-900 leading-snug">
            Overall risk exposure is moderately elevated.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Critical technology and third-party risks require immediate executive attention, while overall residual exposure has decreased 8% compared with the previous quarter through verified mitigation controls.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 shrink-0 border-t lg:border-t-0 lg:border-l border-slate-100 pt-3 lg:pt-0 lg:pl-6">
          <div className="text-left lg:text-right">
            <p className="text-xs font-medium text-slate-400">
              Priority focus area
            </p>
            <p className="text-xs font-semibold text-rose-600 mt-0.5">
              {OVERALL_POSTURE.recommendedFocus}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {OVERALL_POSTURE.importantChange}
            </p>
          </div>

          {onFocusAttention && (
            <button
              type="button"
              onClick={onFocusAttention}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
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
