import { useState } from 'react'
import { UserCheck, X } from 'lucide-react'
import { Button } from '@/components/ui'

interface ChangeOwnerModalProps {
  open: boolean
  onClose: () => void
  currentOwner: string
  currentRole: string
  onSave: (newOwner: string, newRole: string) => void
}

const CANDIDATES = [
  { name: 'James Wilson', role: 'Head of IT' },
  { name: 'Marcus Chen', role: 'VP Infrastructure Engineering' },
  { name: 'Elena Rostova', role: 'Lead SecOps Engineer' },
  { name: 'Sarah Jenkins', role: 'Head of Regulatory Compliance' },
  { name: 'Priya Nair', role: 'Chief Risk Officer' },
]

export function ChangeOwnerModal({
  open,
  onClose,
  currentOwner,
  onSave,
}: ChangeOwnerModalProps) {
  const [selectedName, setSelectedName] = useState(currentOwner)

  if (!open) return null

  const handleConfirm = () => {
    const found = CANDIDATES.find((c) => c.name === selectedName) ?? {
      name: selectedName,
      role: 'Risk Owner',
    }
    onSave(found.name, found.role)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4 bg-[var(--color-surface-secondary)]/50">
          <div className="flex items-center gap-2">
            <UserCheck className="size-4 text-[var(--color-primary)]" />
            <h3 className="font-h3 text-base font-bold text-[var(--color-text-primary)]">
              Reassign Risk Ownership
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

        <div className="p-6 space-y-4">
          <p className="text-xs text-[var(--color-text-secondary)]">
            Select the designated enterprise officer accountable for ongoing assessment and control efficacy.
          </p>

          <div className="space-y-2">
            {CANDIDATES.map((cand) => (
              <label
                key={cand.name}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedName === cand.name
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)]/30'
                    : 'border-[var(--color-border)] hover:bg-[var(--color-surface-secondary)]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="owner"
                    checked={selectedName === cand.name}
                    onChange={() => setSelectedName(cand.name)}
                    className="accent-[var(--color-primary)]"
                  />
                  <div>
                    <p className="font-bold text-xs text-[var(--color-text-primary)]">{cand.name}</p>
                    <p className="text-[11px] text-[var(--color-text-muted)]">{cand.role}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[var(--color-border)]">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              Confirm Reassignment
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

