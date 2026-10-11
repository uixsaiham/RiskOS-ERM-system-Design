import { useState } from 'react'
import {
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  User,
  Sliders,
  UserCheck,
} from 'lucide-react'
import { Button } from '@/components/ui'
import type { MitigationPlanItem } from '../risk-details-data'

interface RiskMitigationTabProps {
  actions: MitigationPlanItem[]
  onOpenAddModal: () => void
  onUpdateProgress: (action: MitigationPlanItem) => void
  onReassignOwner: (action: MitigationPlanItem) => void
}

export function RiskMitigationTab({
  actions,
  onOpenAddModal,
  onUpdateProgress,
  onReassignOwner,
}: RiskMitigationTabProps) {
  const [filter, setFilter] = useState<'all' | 'in_progress' | 'overdue' | 'not_started'>('all')

  const totalActions = actions.length
  const overdueActions = actions.filter((a) => a.status === 'Overdue').length
  const inProgressActions = actions.filter((a) => a.status === 'In Progress').length

  const filteredActions = actions.filter((a) => {
    if (filter === 'all') return true
    if (filter === 'in_progress') return a.status === 'In Progress'
    if (filter === 'overdue') return a.status === 'Overdue'
    if (filter === 'not_started') return a.status === 'Not Started'
    return true
  })

  return (
    <div className="space-y-4">
      {/* ── Top Bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Mitigation & Action Plans ({actions.length})
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Track planned treatments, milestone deadlines, and progress toward reducing residual exposure.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Segmented Filter Control */}
          <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200/60 text-xs">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                filter === 'all'
                  ? 'bg-white text-slate-900 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({totalActions})
            </button>
            <button
              type="button"
              onClick={() => setFilter('in_progress')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                filter === 'in_progress'
                  ? 'bg-white text-slate-900 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              In Progress ({inProgressActions})
            </button>
            <button
              type="button"
              onClick={() => setFilter('overdue')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                filter === 'overdue'
                  ? 'bg-white text-slate-900 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Overdue ({overdueActions})
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={onOpenAddModal}
            className="gap-1.5 h-8 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 shadow-xs"
          >
            <Plus className="size-3.5" />
            <span>Add Mitigation Action</span>
          </Button>
        </div>
      </div>

      {/* ── Actions List ── */}
      <div className="space-y-3.5">
        {filteredActions.map((action) => {
          const isOverdue = action.status === 'Overdue'

          return (
            <div
              key={action.id}
              className={`rounded-xl border p-5 space-y-3.5 bg-white shadow-xs transition-all ${
                isOverdue
                  ? 'border-rose-200 bg-rose-50/15'
                  : 'border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-semibold text-blue-600">
                    {action.id}
                  </span>
                  <h4 className="text-sm font-semibold text-slate-900">
                    {action.title}
                  </h4>
                  {isOverdue ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200/70">
                      <AlertCircle className="size-3 text-rose-600" />
                      Overdue
                    </span>
                  ) : action.status === 'In Progress' ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200/70">
                      <Clock className="size-3 text-blue-600" />
                      In Progress
                    </span>
                  ) : action.status === 'Completed' ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                      <CheckCircle2 className="size-3 text-emerald-600" />
                      Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200/60">
                      Not Started
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onUpdateProgress(action)}
                    className="h-7 text-xs font-medium border-slate-200 text-slate-700 hover:bg-slate-50 gap-1"
                  >
                    <Sliders className="size-3" />
                    <span>Update Progress</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onReassignOwner(action)}
                    className="h-7 text-xs font-medium text-slate-600 hover:text-slate-900 gap-1"
                  >
                    <UserCheck className="size-3" />
                    <span>Reassign</span>
                  </Button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">
                    Implementation completion
                  </span>
                  <span className="font-mono font-semibold text-slate-900">
                    {action.progressPercent}%
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isOverdue ? 'bg-rose-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${action.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Metadata row */}
              <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <User className="size-3 text-slate-400" />
                  <span className="font-medium text-slate-700">{action.owner}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Calendar className="size-3 text-slate-400" />
                  <span>Due Date: </span>
                  <span className={`font-mono font-medium ${isOverdue ? 'text-rose-600 font-semibold' : 'text-slate-800'}`}>
                    {action.dueDate}
                  </span>
                </div>

                {action.estimatedCost && (
                  <div>
                    <span className="text-slate-400">Estimated Cost: </span>
                    <span className="font-mono font-semibold text-slate-800">
                      {action.estimatedCost}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
