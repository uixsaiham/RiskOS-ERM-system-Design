import { AlertTriangle, X } from 'lucide-react'
import { Button } from '@/components/ui'

interface DiscardConfirmModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DiscardConfirmModal({
  open,
  onClose,
  onConfirm,
}: DiscardConfirmModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-sm rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4 bg-[var(--color-surface-secondary)]/50">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-4 text-rose-600" />
            <h3 className="font-h3 text-base font-bold text-[var(--color-text-primary)]">
              Discard Unsaved Changes?
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

        {/* Body */}
        <div className="p-5 text-xs text-[var(--color-text-secondary)] leading-relaxed">
          You have an active assessment draft in progress. Discarding will revert changes made during this
          editing session and return to the Risk Details view.
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-[var(--color-border)] px-5 py-3.5 bg-[var(--color-surface-secondary)]/30">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Continue Editing
          </Button>
          <Button variant="destructive" size="sm" onClick={onConfirm}>
            Discard & Exit
          </Button>
        </div>
      </div>
    </div>
  )
}

