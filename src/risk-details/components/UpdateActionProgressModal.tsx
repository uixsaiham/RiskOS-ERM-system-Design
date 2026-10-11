import { useState } from 'react'
import { Sliders, X } from 'lucide-react'
import { Button } from '@/components/ui'
import type { MitigationPlanItem } from '../risk-details-data'

interface UpdateActionProgressModalProps {
  open: boolean
  onClose: () => void
  action: MitigationPlanItem | null
  onSave: (updatedAction: MitigationPlanItem) => void
}

const STATUS_CHOICES: MitigationPlanItem['status'][] = [
  'Not Started',
  'In Progress',
  'Overdue',
  'Completed',
]

export function UpdateActionProgressModal({
  open,
  onClose,
  action,
  onSave,
}: UpdateActionProgressModalProps) {
  if (!open || !action) return null

  return <UpdateActionProgressModalInner action={action} onClose={onClose} onSave={onSave} />
}

function UpdateActionProgressModalInner({
  action,
  onClose,
  onSave,
}: {
  action: MitigationPlanItem
  onClose: () => void
  onSave: (updatedAction: MitigationPlanItem) => void
}) {
  const [progress, setProgress] = useState<number>(action.progressPercent)
  const [status, setStatus] = useState<MitigationPlanItem['status']>(action.status)
  const [dueDate, setDueDate] = useState<string>(action.dueDate)
  const [owner, setOwner] = useState<string>(action.owner)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...action,
      progressPercent: progress,
      status: progress === 100 ? 'Completed' : status,
      dueDate,
      owner,
    })
    onClose()
  }

  const handleSliderChange = (newVal: number) => {
    setProgress(newVal)
    if (newVal === 100) {
      setStatus('Completed')
    } else if (newVal > 0 && status === 'Not Started') {
      setStatus('In Progress')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4 bg-[var(--color-surface-secondary)]/50">
          <div className="flex items-center gap-2">
            <Sliders className="size-4 text-[var(--color-primary)]" />
            <div>
              <h3 className="font-h3 text-base font-bold text-[var(--color-text-primary)]">
                Update Action Progress
              </h3>
              <p className="text-[11px] text-[var(--color-text-muted)] font-mono">{action.id}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <h4 className="font-label text-xs font-bold text-[var(--color-text-primary)]">
              {action.title}
            </h4>
            <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">
              Assigned to: <span className="font-semibold">{action.owner}</span>
            </p>
          </div>

          {/* Progress Percent Slider */}
          <div className="space-y-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-secondary)]/30 p-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Execution Progress
              </label>
              <span className="font-mono text-base font-extrabold text-[var(--color-primary)]">
                {progress}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={progress}
              onChange={(e) => handleSliderChange(Number(e.target.value))}
              className="w-full accent-[var(--color-primary)] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[var(--color-text-muted)] font-mono">
              <span>0% (Not Started)</span>
              <span>50%</span>
              <span>100% (Completed)</span>
            </div>
          </div>

          {/* Status Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Action Status
            </label>
            <div className="grid grid-cols-2 gap-2">
              {STATUS_CHOICES.map((st) => (
                <button
                  type="button"
                  key={st}
                  onClick={() => {
                    setStatus(st)
                    if (st === 'Completed') setProgress(100)
                    if (st === 'Not Started') setProgress(0)
                  }}
                  className={`px-3 py-2 rounded-lg border text-xs font-semibold text-left transition-all ${
                    status === st
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)]/30 text-[var(--color-primary)] ring-1 ring-[var(--color-primary)]'
                      : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Assignee & Due Date */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Assignee
              </label>
              <input
                type="text"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                required
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Due Date
              </label>
              <input
                type="text"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
                placeholder="e.g. October 20, 2026"
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-2 border-t border-[var(--color-border)] pt-4">
            <Button variant="secondary" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Update Progress
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

