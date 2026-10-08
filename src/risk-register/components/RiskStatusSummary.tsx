import { REGISTER_STATUS_COUNTS, type RegisterRiskStatus } from '../risk-register-data'
import { StatusDot } from '@/components/ui'

interface RiskStatusSummaryProps {
  activeStatusFilter: RegisterRiskStatus | null
  onSelectStatus: (status: RegisterRiskStatus | null) => void
  counts?: typeof REGISTER_STATUS_COUNTS
}

const STATUS_ITEMS: { status: RegisterRiskStatus; label: string; countKey: keyof typeof REGISTER_STATUS_COUNTS }[] = [
  { status: 'open', label: 'Open', countKey: 'open' },
  { status: 'under_review', label: 'Under Review', countKey: 'under_review' },
  { status: 'mitigating', label: 'Mitigating', countKey: 'mitigating' },
  { status: 'accepted', label: 'Accepted', countKey: 'accepted' },
  { status: 'closed', label: 'Closed', countKey: 'closed' },
]

export function RiskStatusSummary({
  activeStatusFilter,
  onSelectStatus,
  counts = REGISTER_STATUS_COUNTS,
}: RiskStatusSummaryProps) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0)

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-caption uppercase tracking-wider text-[var(--color-text-muted)] text-[11px] font-semibold">
          Risk Lifecycle Status Distribution
        </span>
        <span className="font-caption text-xs text-[var(--color-text-muted)]">
          Click any status to filter register
        </span>
      </div>

      {/* Segmented bar */}
      <div className="flex h-3 w-full overflow-hidden rounded-md bg-[var(--color-surface-secondary)] border border-[var(--color-border)] p-0.5 gap-0.5">
        {STATUS_ITEMS.map((item) => {
          const count = counts[item.countKey]
          const pct = (count / total) * 100
          const isSelected = activeStatusFilter === item.status
          return (
            <button
              key={item.status}
              type="button"
              onClick={() => onSelectStatus(isSelected ? null : item.status)}
              style={{ width: `${pct}%` }}
              title={`${item.label}: ${count} risks (${pct.toFixed(1)}%)`}
              className={`h-full rounded-xs transition-all cursor-pointer ${
                item.status === 'open'
                  ? 'bg-[var(--color-info)]'
                  : item.status === 'under_review'
                    ? 'bg-[var(--color-warning)]'
                    : item.status === 'mitigating'
                      ? 'bg-[var(--color-primary)]'
                      : item.status === 'accepted'
                        ? 'bg-[var(--color-text-muted)]'
                        : 'bg-[var(--color-success)]'
              } ${isSelected ? 'ring-2 ring-[var(--color-text-primary)] ring-offset-1 z-10 scale-y-110' : 'hover:opacity-85'}`}
            />
          )
        })}
      </div>

      {/* Clickable pill buttons */}
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-5 pt-1">
        {STATUS_ITEMS.map((item) => {
          const count = counts[item.countKey]
          const isSelected = activeStatusFilter === item.status

          return (
            <button
              key={item.status}
              type="button"
              onClick={() => onSelectStatus(isSelected ? null : item.status)}
              className={`flex items-center justify-between rounded-md border px-2.5 py-1.5 text-left transition-colors cursor-pointer ${
                isSelected
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)] text-[var(--color-primary)] ring-1 ring-[var(--color-primary)] shadow-2xs'
                  : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)]'
              }`}
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <StatusDot status={item.status} withLabel={false} />
                <span className="font-caption text-xs font-medium truncate">
                  {item.label}
                </span>
              </div>
              <span className="font-caption font-bold tabular-nums text-xs ml-1">
                {count}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

