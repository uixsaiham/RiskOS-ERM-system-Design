import { ShieldCheck, Calendar, User, Tag, X } from 'lucide-react'
import { Button, Badge } from '@/components/ui'
import type { AssessmentControlItem } from '../risk-assessment-data'

interface ControlDetailsModalProps {
  open: boolean
  onClose: () => void
  control: AssessmentControlItem | null
}

export function ControlDetailsModal({ open, onClose, control }: ControlDetailsModalProps) {
  if (!open || !control) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4 bg-[var(--color-surface-secondary)]/50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-[var(--color-primary)]" />
            <div>
              <h3 className="font-h3 text-base font-bold text-[var(--color-text-primary)]">
                Control Details
              </h3>
              <p className="text-[11px] font-mono text-[var(--color-primary)] font-semibold">
                {control.id}
              </p>
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

        {/* Content Body */}
        <div className="p-6 space-y-4 text-xs">
          <div>
            <h4 className="font-label text-sm font-bold text-[var(--color-text-primary)]">
              {control.name}
            </h4>
            <p className="text-[var(--color-text-secondary)] mt-1 leading-relaxed">
              {control.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-secondary)]/30 p-3.5">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Control Type
              </span>
              <div className="flex items-center gap-1.5 font-semibold text-[var(--color-text-primary)]">
                <Tag className="size-3 text-[var(--color-text-muted)]" />
                <span>{control.type} Control</span>
              </div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Implementation State
              </span>
              <div>
                <Badge variant="neutral" size="sm">
                  {control.implementationStatus}
                </Badge>
              </div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Assigned Owner
              </span>
              <div className="flex items-center gap-1.5 font-medium text-[var(--color-text-primary)]">
                <User className="size-3 text-[var(--color-text-muted)]" />
                <span>{control.owner}</span>
              </div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Testing Cadence
              </span>
              <div className="flex items-center gap-1.5 font-mono text-[var(--color-text-secondary)]">
                <Calendar className="size-3 text-[var(--color-text-muted)]" />
                <span>{control.testFrequency}</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Assessor's Effectiveness Evidence & Notes
            </span>
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-[var(--color-text-secondary)] leading-relaxed">
              {control.evidenceComment || 'No comments recorded.'}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-[var(--color-border)] px-6 py-3.5 bg-[var(--color-surface-secondary)]/30">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
