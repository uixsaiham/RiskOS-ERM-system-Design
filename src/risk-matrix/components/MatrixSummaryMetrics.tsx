import {
  Flame,
  AlertTriangle,
  Scale,
} from 'lucide-react'
import type { SeverityBand } from '../risk-matrix-data'

interface MatrixSummaryMetricsProps {
  total: number
  critical: number
  high: number
  aboveAppetite: number
  activeSeverityFilter: SeverityBand | 'all'
  activeAppetiteFilter: string
  onToggleSeverity: (sev: SeverityBand | 'all') => void
  onToggleAppetite: () => void
}

export function MatrixSummaryMetrics({
  total,
  critical,
  high,
  aboveAppetite,
  activeSeverityFilter,
  activeAppetiteFilter,
  onToggleSeverity,
  onToggleAppetite,
}: MatrixSummaryMetricsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* ── 1. Total Risks ── */}
      <button
        type="button"
        onClick={() => onToggleSeverity('all')}
        className={`text-left rounded-xl border p-4.5 shadow-xs transition-all cursor-pointer ${
          activeSeverityFilter === 'all' && activeAppetiteFilter === 'all'
            ? 'border-blue-600 bg-blue-50/20 ring-2 ring-blue-600/30'
            : 'border-slate-200/80 bg-white hover:border-slate-300'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">
            Total risks
          </span>
          <span className="size-2 rounded-full bg-blue-600" />
        </div>
        <div className="font-mono text-2xl font-bold tracking-tight text-slate-900 mt-2">
          {total}
        </div>
        <p className="mt-1 text-xs text-slate-500 truncate">
          Active portfolio inventory
        </p>
      </button>

      {/* ── 2. Critical Risks ── */}
      <button
        type="button"
        onClick={() => onToggleSeverity(activeSeverityFilter === 'critical' ? 'all' : 'critical')}
        className={`text-left rounded-xl border p-4.5 shadow-xs transition-all cursor-pointer ${
          activeSeverityFilter === 'critical'
            ? 'border-rose-500 bg-rose-50/30 ring-2 ring-rose-500/30'
            : 'border-slate-200/80 bg-white hover:border-slate-300'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">
            Critical risks
          </span>
          <div className="size-6 rounded-md bg-rose-50 flex items-center justify-center">
            <Flame className="size-3.5 text-rose-600" />
          </div>
        </div>
        <div className="font-mono text-2xl font-bold tracking-tight text-rose-600 mt-2">
          {critical}
        </div>
        <p className="mt-1 text-xs text-rose-600 truncate font-medium">
          Scores 16–25 · Board review
        </p>
      </button>

      {/* ── 3. High Risks ── */}
      <button
        type="button"
        onClick={() => onToggleSeverity(activeSeverityFilter === 'high' ? 'all' : 'high')}
        className={`text-left rounded-xl border p-4.5 shadow-xs transition-all cursor-pointer ${
          activeSeverityFilter === 'high'
            ? 'border-amber-500 bg-amber-50/30 ring-2 ring-amber-500/30'
            : 'border-slate-200/80 bg-white hover:border-slate-300'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">
            High risks
          </span>
          <div className="size-6 rounded-md bg-amber-50 flex items-center justify-center">
            <AlertTriangle className="size-3.5 text-amber-600" />
          </div>
        </div>
        <div className="font-mono text-2xl font-bold tracking-tight text-amber-600 mt-2">
          {high}
        </div>
        <p className="mt-1 text-xs text-amber-700 truncate font-medium">
          Scores 10–15 · Treatment planned
        </p>
      </button>

      {/* ── 4. Above Appetite ── */}
      <button
        type="button"
        onClick={onToggleAppetite}
        className={`text-left rounded-xl border p-4.5 shadow-xs transition-all cursor-pointer ${
          activeAppetiteFilter === 'breached'
            ? 'border-rose-600 bg-rose-50/40 ring-2 ring-rose-600/30'
            : 'border-slate-200/80 bg-white hover:border-slate-300'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">
            Above appetite
          </span>
          <div className="size-6 rounded-md bg-rose-50 flex items-center justify-center">
            <Scale className="size-3.5 text-rose-600" />
          </div>
        </div>
        <div className="font-mono text-2xl font-bold tracking-tight text-rose-600 mt-2">
          {aboveAppetite}
        </div>
        <p className="mt-1 text-xs text-rose-600 truncate font-medium">
          Exceeds tolerance ceiling (&gt; 12)
        </p>
      </button>
    </div>
  )
}
