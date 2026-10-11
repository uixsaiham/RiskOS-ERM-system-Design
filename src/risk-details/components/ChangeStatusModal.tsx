import { useState } from 'react'
import { RefreshCw, X } from 'lucide-react'
import { Button } from '@/components/ui'
import type { RegisterRiskStatus } from '@/risk-register'

interface ChangeStatusModalProps {
  open: boolean
  onClose: () => void
  currentStatus: RegisterRiskStatus
  onSave: (status: RegisterRiskStatus) => void
}

const STATUS_OPTIONS: { status: RegisterRiskStatus; label: string; desc: string }[] = [
  { status: 'mitigating', label: 'Mitigating', desc: 'Active action items and controls are reducing residual score.' },
  { status: 'under_review', label: 'Under Review', desc: 'Assessment cycle or executive re-evaluation currently underway.' },
  { status: 'accepted', label: 'Accepted', desc: 'Formally approved risk acceptance within board tolerance limits.' },
  { status: 'open', label: 'Open', desc: 'Newly registered exposure awaiting mitigation plan formulation.' },
  { status: 'closed', label: 'Closed', desc: 'Risk has been eliminated or completely mitigated.' },
]

export function ChangeStatusModal({
  open,
  onClose,
  currentStatus,
  onSave,
}: ChangeStatusModalProps) {
  const [selected, setSelected] = useState<RegisterRiskStatus>(currentStatus)

  if (!open) return null

  const handleConfirm = () => {
    onSave(selected)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4 bg-[var(--color-surface-secondary)]/50">
          <div className="flex items-center gap-2">
            <RefreshCw className="size-4 text-[var(--color-primary)]" />
            <h3 className="font-h3 text-base font-bold text-[var(--color-text-primary)]">
              Change Lifecycle Status
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
          <div className="space-y-2">
            {STATUS_OPTIONS.map((opt) => (
              <label
                key={opt.status}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  selected === opt.status
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)]/30'
                    : 'border-[var(--color-border)] hover:bg-[var(--color-surface-secondary)]'
                }`}
              >
                <input
                  type="radio"
                  name="status"
                  checked={selected === opt.status}
                  onChange={() => setSelected(opt.status)}
                  className="mt-0.5 accent-[var(--color-primary)]"
                />
                <div className="space-y-0.5">
                  <span className="font-bold text-xs text-[var(--color-text-primary)] capitalize">
                    {opt.label}
                  </span>
                  <p className="text-[11px] text-[var(--color-text-muted)] leading-tight">
                    {opt.desc}
                  </p>
                </div>
              </label>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[var(--color-border)]">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              Update Status
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

