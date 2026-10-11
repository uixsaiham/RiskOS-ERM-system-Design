import { useId } from 'react'
import type { SeverityBand } from '../risk-matrix-data'

interface SeverityDistributionBarProps {
  distribution: {
    critical: { count: number; percentage: number }
    high: { count: number; percentage: number }
    moderate: { count: number; percentage: number }
    low: { count: number; percentage: number }
    total: number
  }
  selectedSeverity: SeverityBand | 'all'
  onSelectSeverity: (severity: SeverityBand | 'all') => void
  viewMode: 'inherent' | 'residual'
}

export function SeverityDistributionBar({
  distribution,
  selectedSeverity,
  onSelectSeverity,
  viewMode,
}: SeverityDistributionBarProps) {
  const barId = useId()

  const segments: Array<{
    key: SeverityBand
    label: string
    count: number
    percentage: number
    barBg: string
    activeRing: string
    badgeClass: string
    dotClass: string
  }> = [
    {
      key: 'critical',
      label: 'Critical',
      count: distribution.critical.count,
      percentage: distribution.critical.percentage,
      barBg: 'bg-rose-500 hover:bg-rose-600',
      activeRing: 'ring-2 ring-rose-500 ring-offset-2',
      badgeClass: 'text-rose-700 bg-rose-50 border-rose-200',
      dotClass: 'bg-rose-500',
    },
    {
      key: 'high',
      label: 'High',
      count: distribution.high.count,
      percentage: distribution.high.percentage,
      barBg: 'bg-amber-500 hover:bg-amber-600',
      activeRing: 'ring-2 ring-amber-500 ring-offset-2',
      badgeClass: 'text-amber-700 bg-amber-50 border-amber-200',
      dotClass: 'bg-amber-500',
    },
    {
      key: 'moderate',
      label: 'Moderate',
      count: distribution.moderate.count,
      percentage: distribution.moderate.percentage,
      barBg: 'bg-yellow-400 hover:bg-yellow-500',
      activeRing: 'ring-2 ring-yellow-400 ring-offset-2',
      badgeClass: 'text-yellow-800 bg-yellow-50 border-yellow-200',
      dotClass: 'bg-yellow-500',
    },
    {
      key: 'low',
      label: 'Low',
      count: distribution.low.count,
      percentage: distribution.low.percentage,
      barBg: 'bg-emerald-500 hover:bg-emerald-600',
      activeRing: 'ring-2 ring-emerald-500 ring-offset-2',
      badgeClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      dotClass: 'bg-emerald-500',
    },
  ]

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-900">
              Severity Distribution Breakdown
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium capitalize">
              {viewMode} Exposure
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any segment or badge to toggle filter by risk severity tier ({distribution.total} total risks evaluated)
          </p>
        </div>

        {selectedSeverity !== 'all' && (
          <button
            type="button"
            onClick={() => onSelectSeverity('all')}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            Clear severity filter
          </button>
        )}
      </div>

      {/* Segmented Bar */}
      <div
        id={barId}
        role="group"
        aria-label="Severity distribution bar"
        className="h-4 w-full flex rounded-lg overflow-hidden bg-slate-100 p-0.5 gap-0.5"
      >
        {segments.map((s) => {
          if (distribution.total === 0 || s.percentage === 0) return null
          const isSelected = selectedSeverity === s.key
          const isDimmed = selectedSeverity !== 'all' && !isSelected

          return (
            <button
              key={s.key}
              type="button"
              onClick={() => onSelectSeverity(isSelected ? 'all' : s.key)}
              title={`${s.label}: ${s.count} (${s.percentage}%) - click to filter`}
              style={{ width: `${s.percentage}%` }}
              className={`h-full transition-all duration-150 cursor-pointer rounded-xs focus:outline-hidden ${s.barBg} ${
                isSelected ? 'ring-2 ring-slate-900 z-10' : ''
              } ${isDimmed ? 'opacity-35' : 'opacity-100'}`}
              aria-pressed={isSelected}
            />
          )
        })}
      </div>

      {/* Legend & Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-3 border-t border-slate-100">
        {segments.map((s) => {
          const isSelected = selectedSeverity === s.key
          const isDimmed = selectedSeverity !== 'all' && !isSelected

          return (
            <button
              key={s.key}
              type="button"
              onClick={() => onSelectSeverity(isSelected ? 'all' : s.key)}
              className={`flex items-center justify-between p-2 rounded-lg border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'border-slate-900 bg-slate-50/80 shadow-xs'
                  : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 bg-white'
              } ${isDimmed ? 'opacity-50' : 'opacity-100'}`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${s.dotClass}`} />
                <span className="text-xs font-medium text-slate-700 truncate">{s.label}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                <span className="text-xs font-bold text-slate-900">{s.count}</span>
                <span className="text-[11px] text-slate-400">({s.percentage}%)</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

