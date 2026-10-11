import { FileCheck2, Send, AlertCircle, X } from 'lucide-react'
import { Button } from '@/components/ui'
import type { RiskAssessmentFormData } from '../risk-assessment-data'

interface SubmitConfirmModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  data: RiskAssessmentFormData
  isSubmitting?: boolean
}

export function SubmitConfirmModal({
  open,
  onClose,
  onConfirm,
  data,
  isSubmitting = false,
}: SubmitConfirmModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4 bg-[var(--color-surface-secondary)]/50">
          <div className="flex items-center gap-2">
            <FileCheck2 className="size-4 text-[var(--color-primary)]" />
            <h3 className="font-h3 text-base font-bold text-[var(--color-text-primary)]">
              Submit Assessment for Formal Review
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
        <div className="p-6 space-y-4 text-xs">
          <p className="text-[var(--color-text-secondary)] leading-relaxed">
            You are about to formally submit the risk evaluation for{' '}
            <strong className="font-mono text-[var(--color-text-primary)]">{data.riskId} · {data.riskTitle}</strong>.
          </p>

          <div className="rounded-xl border border-blue-500/20 bg-blue-50/40 dark:bg-blue-950/20 p-3.5 space-y-2">
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">Designated Reviewer:</span>
              <span className="font-bold text-blue-900 dark:text-blue-200">{data.reviewer}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">Campaign:</span>
              <span className="font-medium">{data.assessmentName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">Inherent → Residual Score:</span>
              <span className="font-mono font-bold text-[var(--color-text-primary)]">
                {data.inherentLikelihood * data.inherentImpact} → {data.residualLikelihood * data.residualImpact} / 25
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 p-3 rounded-lg text-[11px] leading-relaxed">
            <AlertCircle className="size-4 shrink-0 mt-0.5" />
            <span>
              Once submitted, this assessment status will transition to <strong>Pending Review</strong> and
              cannot be modified until the reviewer completes their sign-off.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-[var(--color-border)] px-6 py-3.5 bg-[var(--color-surface-secondary)]/30">
          <Button variant="secondary" size="sm" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={onConfirm} loading={isSubmitting} className="gap-1.5 shadow-xs">
            <Send className="size-3.5" />
            <span>Confirm & Submit</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

