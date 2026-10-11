import { useState } from 'react'
import {
  User,
  Bot,
} from 'lucide-react'
import { Badge } from '@/components/ui'
import type { ComprehensiveRiskDetail } from '../risk-details-data'

interface RiskHistoryTabProps {
  detail: ComprehensiveRiskDetail
}

export function RiskHistoryTab({ detail }: RiskHistoryTabProps) {
  const { activityTimeline } = detail
  const [filter, setFilter] = useState<'all' | 'user' | 'system'>('all')

  const filteredTimeline = activityTimeline.filter((item) => {
    if (filter === 'all') return true
    return item.type === filter
  })

  return (
    <div className="space-y-6">
      {/* ── Top Bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-h3 text-base font-bold text-[var(--color-text-primary)]">
            Audit Trail & Activity Log
          </h3>
          <p className="font-body-md text-xs text-[var(--color-text-secondary)]">
            Immutable regulatory-grade record of assessments, review sign-offs, and system alerts.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-xs">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              filter === 'all'
                ? 'bg-[var(--color-primary)] text-white'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            All Activity ({activityTimeline.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('user')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              filter === 'user'
                ? 'bg-[var(--color-primary)] text-white'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            User Actions
          </button>
          <button
            type="button"
            onClick={() => setFilter('system')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              filter === 'system'
                ? 'bg-[var(--color-primary)] text-white'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            System Monitors
          </button>
        </div>
      </div>

      {/* ── Chronological Timeline ── */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-xs space-y-6">
        <div className="relative pl-6 sm:pl-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[var(--color-border)] space-y-6">
          {filteredTimeline.map((item) => {
            const isSystem = item.type === 'system'
            return (
              <div key={item.id} className="relative group">
                {/* Node icon */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-1 flex size-6 items-center justify-center rounded-full border shadow-xs ${
                    isSystem
                      ? 'border-amber-300 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:border-amber-800'
                      : 'border-blue-300 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:border-blue-800'
                  }`}
                >
                  {isSystem ? <Bot className="size-3.5" /> : <User className="size-3.5" />}
                </div>

                {/* Event Card */}
                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs space-y-1.5 hover:border-[var(--color-primary)]/40 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-h4 text-sm font-bold text-[var(--color-text-primary)]">
                      {item.title}
                    </span>
                    <span className="font-mono text-xs text-[var(--color-text-muted)]">
                      {item.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                    <span>Initiated by: </span>
                    <span className="font-semibold text-[var(--color-text-primary)]">{item.user}</span>
                    <Badge variant={isSystem ? 'warning' : 'neutral'} size="sm" className="capitalize">
                      {item.type}
                    </Badge>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
