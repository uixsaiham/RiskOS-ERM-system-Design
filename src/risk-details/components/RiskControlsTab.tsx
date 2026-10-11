import { useState } from 'react'
import {
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Play,
  User,
} from 'lucide-react'
import { Button } from '@/components/ui'
import type { AssociatedControlItem } from '../risk-details-data'

interface RiskControlsTabProps {
  controls: AssociatedControlItem[]
  onOpenAddControl: () => void
  onTestControl?: (controlId: string) => void
}

export function RiskControlsTab({
  controls,
  onOpenAddControl,
  onTestControl,
}: RiskControlsTabProps) {
  const [filter, setFilter] = useState<string>('all')

  const filteredControls = controls.filter((c) => {
    if (filter === 'all') return true
    if (filter === 'effective') return c.effectiveness === 'Effective'
    if (filter === 'partially_effective') return c.effectiveness === 'Partially Effective'
    return true
  })

  return (
    <div className="space-y-4">
      {/* ── Top Bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Associated Internal Controls ({controls.length})
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational and technical controls designed to prevent, detect, or mitigate this risk.
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
              All ({controls.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('effective')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                filter === 'effective'
                  ? 'bg-white text-slate-900 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Effective
            </button>
            <button
              type="button"
              onClick={() => setFilter('partially_effective')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                filter === 'partially_effective'
                  ? 'bg-white text-slate-900 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Needs Improvement
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={onOpenAddControl}
            className="gap-1.5 h-8 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 shadow-xs"
          >
            <Plus className="size-3.5" />
            <span>Add Control</span>
          </Button>
        </div>
      </div>

      {/* ── Controls Table ── */}
      <div className="rounded-xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-slate-200/70 bg-slate-50/75 text-slate-500 font-semibold text-[11px]">
              <th className="py-3 px-4">Control ID & Name</th>
              <th className="py-3 px-4">Owner</th>
              <th className="py-3 px-4">Effectiveness</th>
              <th className="py-3 px-4">Last Tested</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredControls.map((ctl) => (
              <tr key={ctl.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-blue-600">{ctl.id}</span>
                    <span className="font-medium text-slate-900">{ctl.name}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <User className="size-3 text-slate-400" />
                    <span>{ctl.owner}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                      ctl.effectiveness === 'Effective'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70'
                        : 'bg-amber-50 text-amber-700 border-amber-200/70'
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${
                        ctl.effectiveness === 'Effective' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    />
                    {ctl.effectiveness}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-600">
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <Calendar className="size-3 text-slate-400" />
                    <span>{ctl.lastTested}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-md border ${
                      ctl.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70'
                        : 'bg-amber-50 text-amber-700 border-amber-200/70'
                    }`}
                  >
                    {ctl.status === 'Active' ? (
                      <CheckCircle2 className="size-3 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="size-3 text-amber-600" />
                    )}
                    <span>{ctl.status}</span>
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onTestControl?.(ctl.id)}
                    className="h-7 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-1 font-semibold"
                  >
                    <Play className="size-3" />
                    <span>Test Control</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
