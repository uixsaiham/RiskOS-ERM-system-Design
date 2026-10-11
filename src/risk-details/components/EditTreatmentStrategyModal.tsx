import { useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui'
import type { TreatmentStrategyDetails } from '../risk-details-data'

interface EditTreatmentStrategyModalProps {
  open: boolean
  onClose: () => void
  currentStrategy: TreatmentStrategyDetails
  onSave: (updated: TreatmentStrategyDetails) => void
}

const STRATEGIES: { value: TreatmentStrategyDetails['strategy']; label: string; description: string }[] = [
  {
    value: 'Mitigate',
    label: 'Mitigate (Remediate)',
    description: 'Implement administrative, physical, or technical controls to reduce likelihood or impact.',
  },
  {
    value: 'Avoid',
    label: 'Avoid (Terminate)',
    description: 'Eliminate the risk entirely by ceasing or modifying the underlying business activity.',
  },
  {
    value: 'Transfer',
    label: 'Transfer (Share)',
    description: 'Transfer financial or operational risk to third parties via cyber insurance or SLA contracts.',
  },
  {
    value: 'Accept',
    label: 'Accept (Tolerate)',
    description: 'Acknowledge and retain the residual risk within formal executive risk appetite limits.',
  },
]

export function EditTreatmentStrategyModal({
  open,
  onClose,
  currentStrategy,
  onSave,
}: EditTreatmentStrategyModalProps) {
  const [strategy, setStrategy] = useState<TreatmentStrategyDetails['strategy']>(currentStrategy.strategy)
  const [rationale, setRationale] = useState(currentStrategy.rationale)
  const [responsibleOwner, setResponsibleOwner] = useState(currentStrategy.responsibleOwner)
  const [targetResidual, setTargetResidual] = useState(currentStrategy.targetResidual)
  const [targetCompletionDate, setTargetCompletionDate] = useState(currentStrategy.targetCompletionDate)

  if (!open) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      strategy,
      rationale,
      responsibleOwner,
      targetResidual,
      targetCompletionDate,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4 bg-[var(--color-surface-secondary)]/50">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-4 text-[var(--color-primary)]" />
            <h3 className="font-h3 text-base font-bold text-[var(--color-text-primary)]">
              Edit Risk Treatment Strategy
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Strategy selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Core Response Strategy
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {STRATEGIES.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-all ${
                    strategy === opt.value
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)]/30 ring-1 ring-[var(--color-primary)]'
                      : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-secondary)]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="strategy"
                      value={opt.value}
                      checked={strategy === opt.value}
                      onChange={() => setStrategy(opt.value)}
                      className="text-[var(--color-primary)]"
                    />
                    <span className="font-label text-xs font-bold text-[var(--color-text-primary)]">
                      {opt.label}
                    </span>
                  </div>
                  <span className="mt-1 text-[11px] text-[var(--color-text-secondary)] pl-5">
                    {opt.description}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Rationale */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Treatment Rationale & Objectives
            </label>
            <textarea
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              rows={3}
              required
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 leading-relaxed"
              placeholder="Explain why this treatment path was chosen..."
            />
          </div>

          {/* Grid of Owner, Target Score, Target Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Responsible Lead
              </label>
              <input
                type="text"
                value={responsibleOwner}
                onChange={(e) => setResponsibleOwner(e.target.value)}
                required
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Target Residual Score
              </label>
              <input
                type="text"
                value={targetResidual}
                onChange={(e) => setTargetResidual(e.target.value)}
                required
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 font-mono"
                placeholder="10 / 25 — Moderate"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Target Completion Milestone
              </label>
              <input
                type="text"
                value={targetCompletionDate}
                onChange={(e) => setTargetCompletionDate(e.target.value)}
                required
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
                placeholder="March 31, 2027 (Q1 2027)"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 border-t border-[var(--color-border)] pt-4">
            <Button variant="secondary" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save Treatment Strategy
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

