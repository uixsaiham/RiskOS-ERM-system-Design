import { useState } from 'react'
import { X, ListTodo } from 'lucide-react'
import { Button } from '@/components/ui'
import type { MitigationPlanItem } from '../risk-details-data'

interface AddMitigationModalProps {
  open: boolean
  onClose: () => void
  onAddAction: (action: MitigationPlanItem) => void
}

export function AddMitigationModal({
  open,
  onClose,
  onAddAction,
}: AddMitigationModalProps) {
  const [title, setTitle] = useState('')
  const [owner, setOwner] = useState('James Wilson')
  const [dueDate, setDueDate] = useState('November 30, 2026')
  const [estimatedCost, setEstimatedCost] = useState('$65,000')
  const [progress, setProgress] = useState(15)

  if (!open) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const newAction: MitigationPlanItem = {
      id: `ACT-0${Math.floor(200 + Math.random() * 800)}`,
      title: title.trim(),
      owner: owner.trim(),
      dueDate: dueDate.trim(),
      status: progress >= 100 ? 'Completed' : progress > 0 ? 'In Progress' : 'Not Started',
      progressPercent: progress,
      estimatedCost: estimatedCost.trim() || undefined,
    }

    onAddAction(newAction)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4 bg-[var(--color-surface-secondary)]/50">
          <div className="flex items-center gap-2">
            <ListTodo className="size-4 text-[var(--color-primary)]" />
            <h3 className="font-h3 text-base font-bold text-[var(--color-text-primary)]">
              Create Mitigation Action Plan
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Action Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Implement Phishing-Resistant Authentication"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Assigned Owner
              </label>
              <input
                type="text"
                required
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Target Due Date
              </label>
              <input
                type="text"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="e.g. November 30, 2026"
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Estimated Budget / Cost
            </label>
            <input
              type="text"
              value={estimatedCost}
              onChange={(e) => setEstimatedCost(e.target.value)}
              placeholder="e.g. $65,000"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
            />
          </div>

          <div className="space-y-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-secondary)]/30 p-4">
            <div className="flex justify-between text-xs">
              <label className="font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Initial Progress
              </label>
              <span className="font-mono font-extrabold text-[var(--color-primary)]">{progress}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full accent-[var(--color-primary)] cursor-pointer"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[var(--color-border)]">
            <Button variant="secondary" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Create Action Plan
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
