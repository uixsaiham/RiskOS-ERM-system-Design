import { KpiCard, Badge } from '@/components/ui'
import { REGISTER_SUMMARY_METRICS } from '../risk-register-data'
import type { RiskSeverity } from '@/tokens'

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
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
      {/* Total Risks */}
      <div
        onClick={onClearQuickFilters}
        className={`cursor-pointer transition-all rounded-lg ${
          isTotalActive
            ? 'ring-2 ring-[var(--color-primary)] ring-offset-1 shadow-xs'
            : 'hover:-translate-y-0.5'
        }`}
      >
        <KpiCard
          title="Total Risks"
          value={String(counts.total)}
          trend={{ value: '+12', direction: 'up', positive: false }}
          supporting="this quarter"
          status={
            <Badge variant={isTotalActive ? 'primary' : 'neutral'} size="sm" className="mt-1">
              {isTotalActive ? 'Active View' : 'All Inventory'}
            </Badge>
          }
        />
      </div>

      {/* Critical */}
      <div
        onClick={() => onSelectSeverity(activeSeverityFilter === 'critical' ? null : 'critical')}
        className={`cursor-pointer transition-all rounded-lg ${
          activeSeverityFilter === 'critical'
            ? 'ring-2 ring-[var(--color-risk-critical)] ring-offset-1 shadow-xs'
            : 'hover:-translate-y-0.5'
        }`}
      >
        <KpiCard
          title="Critical"
          value={String(counts.critical)}
          trend={{ value: '+3', direction: 'up', positive: false }}
          supporting="new this month"
          status={
            <Badge
              variant={activeSeverityFilter === 'critical' ? 'error' : 'neutral'}
              size="sm"
              className="mt-1"
            >
              {activeSeverityFilter === 'critical' ? 'Filtered' : 'Score 17–25'}
            </Badge>
          }
        />
      </div>

      {/* High */}
      <div
        onClick={() => onSelectSeverity(activeSeverityFilter === 'high' ? null : 'high')}
        className={`cursor-pointer transition-all rounded-lg ${
          activeSeverityFilter === 'high'
            ? 'ring-2 ring-[var(--color-risk-high)] ring-offset-1 shadow-xs'
            : 'hover:-translate-y-0.5'
        }`}
      >
        <KpiCard
          title="High"
          value={String(counts.high)}
          trend={{ value: '−5', direction: 'down', positive: true }}
          supporting="vs last quarter"
          status={
            <Badge
              variant={activeSeverityFilter === 'high' ? 'warning' : 'neutral'}
              size="sm"
              className="mt-1"
            >
              {activeSeverityFilter === 'high' ? 'Filtered' : 'Score 10–16'}
            </Badge>
          }
        />
      </div>

      {/* Moderate */}
      <div
        onClick={() => onSelectSeverity(activeSeverityFilter === 'moderate' ? null : 'moderate')}
        className={`cursor-pointer transition-all rounded-lg ${
          activeSeverityFilter === 'moderate'
            ? 'ring-2 ring-[var(--color-risk-moderate)] ring-offset-1 shadow-xs'
            : 'hover:-translate-y-0.5'
        }`}
      >
        <KpiCard
          title="Moderate"
          value={String(counts.moderate)}
          trend={{ value: '34%', direction: 'flat', positive: true }}
          supporting="of portfolio"
          status={
            <Badge
              variant={activeSeverityFilter === 'moderate' ? 'info' : 'neutral'}
              size="sm"
              className="mt-1"
            >
              {activeSeverityFilter === 'moderate' ? 'Filtered' : 'Score 5–9'}
            </Badge>
          }
        />
      </div>

      {/* Low */}
      <div
        onClick={() => onSelectSeverity(activeSeverityFilter === 'low' ? null : 'low')}
        className={`cursor-pointer transition-all rounded-lg ${
          activeSeverityFilter === 'low'
            ? 'ring-2 ring-[var(--color-risk-low)] ring-offset-1 shadow-xs'
            : 'hover:-translate-y-0.5'
        }`}
      >
        <KpiCard
          title="Low"
          value={String(counts.low)}
          trend={{ value: '46%', direction: 'flat', positive: true }}
          supporting="controlled"
          status={
            <Badge
              variant={activeSeverityFilter === 'low' ? 'success' : 'neutral'}
              size="sm"
              className="mt-1"
            >
              {activeSeverityFilter === 'low' ? 'Filtered' : 'Score 1–4'}
            </Badge>
          }
        />
      </div>

      {/* Overdue Reviews */}
      <div
        onClick={onToggleOverdue}
        className={`cursor-pointer transition-all rounded-lg ${
          activeOverdueFilter
            ? 'ring-2 ring-[var(--color-error)] ring-offset-1 shadow-xs'
            : 'hover:-translate-y-0.5'
        }`}
      >
        <KpiCard
          title="Overdue Reviews"
          value={String(counts.overdueReviews)}
          trend={{ value: '6 critical', direction: 'up', positive: false }}
          supporting="past SLA"
          status={
            <Badge
              variant={activeOverdueFilter ? 'error' : 'neutral'}
              size="sm"
              className="mt-1"
            >
              {activeOverdueFilter ? 'Filtered' : 'Action Required'}
            </Badge>
          }
        />
      </div>
    </div>
  )
}

