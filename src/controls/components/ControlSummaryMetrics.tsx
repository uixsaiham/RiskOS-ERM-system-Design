import { Shield, ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react'
import type { ControlSavedViewId } from '../controls-data'

interface ControlSummaryMetricsProps {
  total: number
  effective: number
  needsImprovement: number
  controlGaps: number
  activeSavedView: ControlSavedViewId
  onSelectSavedView: (view: ControlSavedViewId) => void
}

export function ControlSummaryMetrics({
  total,
  effective,
  needsImprovement,
  controlGaps,
  activeSavedView,
  onSelectSavedView,
}: ControlSummaryMetricsProps) {
  const effectivePct = total > 0 ? Math.round((effective / total) * 100) : 0
  const needsImpPct = total > 0 ? Math.round((needsImprovement / total) * 100) : 0
  const gapsPct = total > 0 ? Math.round((controlGaps / total) * 100) : 0

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {/* ── 1. Total Controls ── */}
      <button
        type="button"
        onClick={() => onSelectSavedView('all')}
        className={`text-left rounded-xl border p-4 transition-all cursor-pointer group bg-white ${
          activeSavedView === 'all'
            ? 'border-blue-500/80 ring-1 ring-blue-500/20 shadow-xs'
            : 'border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700 transition-colors">
            Total controls
          </span>
          <div className="size-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
            <Shield className="size-3.5" />
          </div>
        </div>

        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-2xl font-semibold tracking-tight text-slate-900 tabular-nums">
            {total}
          </span>
        </div>

        <p className="mt-1.5 text-[11px] text-slate-400 truncate">
          Active baseline in enterprise catalog
        </p>
      </button>

      {/* ── 2. Effective Controls ── */}
      <button
        type="button"
        onClick={() => onSelectSavedView(activeSavedView === 'effective' ? 'all' : 'effective')}
        className={`text-left rounded-xl border p-4 transition-all cursor-pointer group bg-white ${
          activeSavedView === 'effective'
            ? 'border-emerald-500/80 ring-1 ring-emerald-500/20 shadow-xs'
            : 'border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700 transition-colors">
            Effective controls
          </span>
          <div className="size-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <ShieldCheck className="size-3.5" />
          </div>
        </div>

        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-2xl font-semibold tracking-tight text-slate-900 tabular-nums">
            {effective}
          </span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60 tabular-nums">
            {effectivePct}%
          </span>
        </div>

        <p className="mt-1.5 text-[11px] text-slate-400 truncate">
          Passing operating and design tests
        </p>
      </button>

      {/* ── 3. Needs Improvement ── */}
      <button
        type="button"
        onClick={() =>
          onSelectSavedView(activeSavedView === 'needs_improvement' ? 'all' : 'needs_improvement')
        }
        className={`text-left rounded-xl border p-4 transition-all cursor-pointer group bg-white ${
          activeSavedView === 'needs_improvement'
            ? 'border-amber-500/80 ring-1 ring-amber-500/20 shadow-xs'
            : 'border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700 transition-colors">
            Needs improvement
          </span>
          <div className="size-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <AlertTriangle className="size-3.5" />
          </div>
        </div>

        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-2xl font-semibold tracking-tight text-slate-900 tabular-nums">
            {needsImprovement}
          </span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200/60 tabular-nums">
            {needsImpPct}%
          </span>
        </div>

        <p className="mt-1.5 text-[11px] text-slate-400 truncate">
          Partial coverage or audit findings
        </p>
      </button>

      {/* ── 4. Control Gaps ── */}
      <button
        type="button"
        onClick={() =>
          onSelectSavedView(activeSavedView === 'control_gaps' ? 'all' : 'control_gaps')
        }
        className={`text-left rounded-xl border p-4 transition-all cursor-pointer group bg-white ${
          activeSavedView === 'control_gaps'
            ? 'border-rose-500/80 ring-1 ring-rose-500/20 shadow-xs'
            : 'border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700 transition-colors">
            Control gaps
          </span>
          <div className="size-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
            <ShieldAlert className="size-3.5" />
          </div>
        </div>

        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-2xl font-semibold tracking-tight text-slate-900 tabular-nums">
            {controlGaps}
          </span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-rose-50 text-rose-700 border border-rose-200/60 tabular-nums">
            {gapsPct}%
          </span>
        </div>

        <p className="mt-1.5 text-[11px] text-slate-400 truncate">
          Ineffective, untested, or missing
        </p>
      </button>
    </div>
  )
}
