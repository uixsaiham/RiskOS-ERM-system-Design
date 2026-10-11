import { useState } from 'react'
import { X, Search, Link2, Trash2, Plus } from 'lucide-react'
import { Button, RiskSeverityBadge } from '@/components/ui'
import { ENTERPRISE_RISK_REGISTER } from '@/risk-register'
import type { ControlItem } from '../controls-data'

interface LinkRiskModalProps {
  control: ControlItem | null
  open: boolean
  onClose: () => void
  onUpdateLinkedRisks: (controlId: string, updatedRiskIds: string[]) => void
}

export function LinkRiskModal({
  control,
  open,
  onClose,
  onUpdateLinkedRisks,
}: LinkRiskModalProps) {
  const [search, setSearch] = useState('')

  if (!open || !control) return null

  const linkedIds = control.linkedRiskIds || []

  const linkedRisks = ENTERPRISE_RISK_REGISTER.filter((r) => linkedIds.includes(r.id))

  const unlinkedRisks = ENTERPRISE_RISK_REGISTER.filter((r) => {
    if (linkedIds.includes(r.id)) return false
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      r.id.toLowerCase().includes(q) ||
      r.title.toLowerCase().includes(q) ||
      r.department.toLowerCase().includes(q) ||
      r.owner.toLowerCase().includes(q)
    )
  }).slice(0, 8)

  const handleLink = (riskId: string) => {
    onUpdateLinkedRisks(control.id, [...linkedIds, riskId])
  }

  const handleUnlink = (riskId: string) => {
    onUpdateLinkedRisks(
      control.id,
      linkedIds.filter((id) => id !== riskId)
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-lg rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Link2 className="size-4 text-blue-600" />
              <span>Link Risks to {control.id}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">{control.name}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Currently Linked Risks */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Currently Linked Risks ({linkedRisks.length}):
          </span>

          {linkedRisks.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No risks linked yet.</p>
          ) : (
            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {linkedRisks.map((r) => (
                <div
                  key={r.id}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-mono font-bold text-blue-600">{r.id}</span>
                    <span className="ml-2 font-medium text-slate-800 dark:text-slate-200 truncate inline-block max-w-[200px] align-bottom">
                      {r.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RiskSeverityBadge severity={r.residualSeverity} size="sm" />
                    <button
                      type="button"
                      onClick={() => handleUnlink(r.id)}
                      className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded"
                      title="Unlink"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search & Link More Risks */}
        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Available Risks to Link:
          </span>

          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search risks to link..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-8 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 pl-8 pr-3 text-xs"
            />
          </div>

          <div className="space-y-1.5 max-h-48 overflow-y-auto pt-1">
            {unlinkedRisks.map((r) => (
              <div
                key={r.id}
                className="p-2 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-mono font-bold text-blue-600">{r.id}</span>
                  <span className="ml-2 font-medium text-slate-700 dark:text-slate-300 truncate inline-block max-w-[220px] align-bottom">
                    {r.title}
                  </span>
                  <span className="text-[10px] text-slate-400 block">{r.department}</span>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleLink(r.id)}
                  className="h-6 text-[11px] gap-1 px-2"
                >
                  <Plus className="size-3" />
                  <span>Link</span>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <Button variant="primary" size="sm" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  )
}
