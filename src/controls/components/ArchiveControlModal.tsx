import { AlertTriangle, Archive, X } from 'lucide-react'
import { Button } from '@/components/ui'
import type { ControlItem } from '../controls-data'

interface ArchiveControlModalProps {
  control?: ControlItem | null
  bulkIds?: string[]
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function ArchiveControlModal({
  control,
  bulkIds,
  open,
  onClose,
  onConfirm,
}: ArchiveControlModalProps) {
  if (!open) return null

  const isBulk = Boolean(bulkIds && bulkIds.length > 0)
  const count = bulkIds?.length || 1

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <Archive className="size-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                {isBulk ? `Archive ${count} Controls?` : `Archive Control ${control?.id}?`}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isBulk
                  ? 'Selected controls will be archived from active library views.'
                  : control?.name}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Warning Note */}
        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200 leading-relaxed flex items-start gap-2.5">
          <AlertTriangle className="size-4 shrink-0 mt-0.5 text-amber-600" />
          <div>
            <strong>Operational Impact Warning:</strong>
            <p className="mt-0.5">
              Archiving removes this control from active testing schedules and risk mitigation calculations.
              Linked risks will indicate reduced control coverage.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className="gap-1.5"
          >
            <Archive className="size-3.5" />
            <span>Confirm Archive</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

