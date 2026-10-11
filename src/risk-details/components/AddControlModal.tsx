import { useState } from 'react'
import { ShieldCheck, X } from 'lucide-react'
import { Button } from '@/components/ui'
import type { AssociatedControlItem } from '../risk-details-data'

interface AddControlModalProps {
  open: boolean
  onClose: () => void
  onAddControl: (control: AssociatedControlItem) => void
}

const EFFECTIVENESS_OPTIONS: AssociatedControlItem['effectiveness'][] = [
  'Effective',
  'Partially Effective',
  'Ineffective',
]

const STATUS_OPTIONS: AssociatedControlItem['status'][] = [
  'Active',
  'Needs Improvement',
  'Improvement Required',
]

export function AddControlModal({
  open,
  onClose,
  onAddControl,
}: AddControlModalProps) {
  const [controlId, setControlId] = useState(() => `CTRL-${Math.floor(100 + Math.random() * 900)}`)
  const [name, setName] = useState('')
  const [owner, setOwner] = useState('Identity & Access Team')
  const [effectiveness, setEffectiveness] = useState<AssociatedControlItem['effectiveness']>('Effective')
  const [status, setStatus] = useState<AssociatedControlItem['status']>('Active')
  const [lastTested, setLastTested] = useState('October 10, 2026')

  if (!open) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    onAddControl({
      id: controlId.trim() || `CTRL-${Math.floor(100 + Math.random() * 900)}`,
      name: name.trim(),
      owner: owner.trim(),
      effectiveness,
      status,
      lastTested: lastTested.trim(),
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4 bg-[var(--color-surface-secondary)]/50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-[var(--color-primary)]" />
            <h3 className="font-h3 text-base font-bold text-[var(--color-text-primary)]">
              Associate Internal Control
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Control ID
              </label>
              <input
                type="text"
                value={controlId}
                onChange={(e) => setControlId(e.target.value)}
                required
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs font-mono font-semibold text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
              />
            </div>

            <div className="col-span-2 space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Control Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Privileged Access Management (PAM)"
                required
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Control Owner / Team
            </label>
            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              required
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
            />
          </div>

          {/* Effectiveness & Status */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Design Effectiveness
              </label>
              <select
                value={effectiveness}
                onChange={(e) => setEffectiveness(e.target.value as AssociatedControlItem['effectiveness'])}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
              >
                {EFFECTIVENESS_OPTIONS.map((eff) => (
                  <option key={eff} value={eff}>
                    {eff}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Operational Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as AssociatedControlItem['status'])}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
              >
                {STATUS_OPTIONS.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Last Tested Date
            </label>
            <input
              type="text"
              value={lastTested}
              onChange={(e) => setLastTested(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
              placeholder="e.g. October 10, 2026"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 border-t border-[var(--color-border)] pt-4">
            <Button variant="secondary" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Associate Control
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
