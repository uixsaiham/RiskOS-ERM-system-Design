import { REGISTER_SUMMARY_METRICS } from '../risk-register-data'
import type { RiskSeverity } from '@/tokens'
import { Shield, AlertTriangle, ShieldAlert, ShieldCheck, Clock } from 'lucide-react'

interface ExecutiveSummaryStripProps {
  activeSeverityFilter: RiskSeverity | null
  activeOverdueFilter: boolean
  onSelectSeverity: (severity: RiskSeverity | null) => void
  onToggleOverdue: () => void
  onClearQuickFilters: () => void
  counts?: {
    total: number
    critical: number
    high: number
    moderate: number
    low: number
    overdueReviews: number
  }
}

export function ExecutiveSummaryStrip({
  activeSeverityFilter,
  activeOverdueFilter,
  onSelectSeverity,
  onToggleOverdue,
  onClearQuickFilters,
  counts = REGISTER_SUMMARY_METRICS,
}: ExecutiveSummaryStripProps) {
  const isTotalActive = !activeSeverityFilter && !activeOverdueFilter

  return (
    <div className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
      {/* 1. Total Risks */}
      <button
        type="button"
        onClick={onClearQuickFilters}
        className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer bg-white group ${
          isTotalActive
            ? 'border-blue-500/80 ring-1 ring-blue-500/20 shadow-xs'
            : 'border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700 transition-colors">
            Total risks
          </span>
          <div className="size-6 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center">
            <Shield className="size-3" />
          </div>
        </div>
        <div className="mt-1.5 text-xl font-semibold tracking-tight text-slate-900 tabular-nums">
          {counts.total}
        </div>
        <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
          <span>Active portfolio</span>
          <span className="text-emerald-600 font-medium">+12 q/q</span>
        </div>
      </button>

      {/* 2. Critical Risks */}
      <button
        type="button"
        onClick={() => onSelectSeverity(activeSeverityFilter === 'critical' ? null : 'critical')}
        className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer bg-white group ${
          activeSeverityFilter === 'critical'
            ? 'border-rose-500/80 ring-1 ring-rose-500/20 shadow-xs'
            : 'border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700 transition-colors">
            Critical
          </span>
          <div className="size-6 rounded-md bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
            <AlertTriangle className="size-3" />
          </div>
        </div>
        <div className="mt-1.5 text-xl font-semibold tracking-tight text-slate-900 tabular-nums">
          {counts.critical}
        </div>
        <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
          <span>Score 17–25</span>
          <span className="text-rose-600 font-medium">+3 new</span>
        </div>
      </button>

      {/* 3. High Risks */}
      <button
        type="button"
        onClick={() => onSelectSeverity(activeSeverityFilter === 'high' ? null : 'high')}
        className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer bg-white group ${
          activeSeverityFilter === 'high'
            ? 'border-orange-500/80 ring-1 ring-orange-500/20 shadow-xs'
            : 'border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700 transition-colors">
            High
          </span>
          <div className="size-6 rounded-md bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100">
            <ShieldAlert className="size-3" />
          </div>
        </div>
        <div className="mt-1.5 text-xl font-semibold tracking-tight text-slate-900 tabular-nums">
          {counts.high}
        </div>
        <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
          <span>Score 10–16</span>
          <span className="text-emerald-600 font-medium">−5 q/q</span>
        </div>
      </button>

      {/* 4. Moderate Risks */}
      <button
        type="button"
        onClick={() => onSelectSeverity(activeSeverityFilter === 'moderate' ? null : 'moderate')}
        className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer bg-white group ${
          activeSeverityFilter === 'moderate'
            ? 'border-amber-500/80 ring-1 ring-amber-500/20 shadow-xs'
            : 'border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700 transition-colors">
            Moderate
          </span>
          <div className="size-6 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <Shield className="size-3" />
          </div>
        </div>
        <div className="mt-1.5 text-xl font-semibold tracking-tight text-slate-900 tabular-nums">
          {counts.moderate}
        </div>
        <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
          <span>Score 5–9</span>
          <span className="text-slate-500">Stable</span>
        </div>
      </button>

      {/* 5. Low Risks */}
      <button
        type="button"
        onClick={() => onSelectSeverity(activeSeverityFilter === 'low' ? null : 'low')}
        className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer bg-white group ${
          activeSeverityFilter === 'low'
            ? 'border-emerald-500/80 ring-1 ring-emerald-500/20 shadow-xs'
            : 'border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700 transition-colors">
            Low
          </span>
          <div className="size-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <ShieldCheck className="size-3" />
          </div>
        </div>
        <div className="mt-1.5 text-xl font-semibold tracking-tight text-slate-900 tabular-nums">
          {counts.low}
        </div>
        <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
          <span>Score 1–4</span>
          <span className="text-slate-500">Tolerable</span>
        </div>
      </button>

      {/* 6. Overdue Reviews */}
      <button
        type="button"
        onClick={onToggleOverdue}
        className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer bg-white group ${
          activeOverdueFilter
            ? 'border-rose-500/80 ring-1 ring-rose-500/20 shadow-xs'
            : 'border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700 transition-colors">
            Overdue reviews
          </span>
          <div className="size-6 rounded-md bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
            <Clock className="size-3" />
          </div>
        </div>
        <div className="mt-1.5 text-xl font-semibold tracking-tight text-slate-900 tabular-nums">
          {counts.overdueReviews}
        </div>
        <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
          <span>Action required</span>
          <span className="text-rose-600 font-medium">Urgent</span>
        </div>
      </button>
    </div>
  )
}
