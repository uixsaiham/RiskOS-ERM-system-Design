import { useState } from 'react'
import { FileText, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui'
import type { AssessmentEvidenceItem } from '../risk-assessment-data'

interface AddEvidenceModalProps {
  open: boolean
  onClose: () => void
  onAddEvidence: (item: AssessmentEvidenceItem) => void
}

const EVIDENCE_TYPES: AssessmentEvidenceItem['type'][] = [
  'Audit Finding',
  'Security Assessment',
  'Telemetry Log',
  'Policy Doc',
  'Penetration Test',
]

export function AddEvidenceModal({
  open,
  onClose,
  onAddEvidence,
}: AddEvidenceModalProps) {
  const [title, setTitle] = useState('')
  const [type, setType] = useState<AssessmentEvidenceItem['type']>('Security Assessment')
  const [sourceReference, setSourceReference] = useState('')
  const [dateCollected, setDateCollected] = useState(() =>
    new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  )
  const [notes, setNotes] = useState('')
  const [mockFileName, setMockFileName] = useState('')

  if (!open) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const newItem: AssessmentEvidenceItem = {
      id: `EVD-0${Math.floor(10 + Math.random() * 90)}`,
      title: title.trim(),
      type,
      sourceReference: sourceReference.trim() || 'Internal ERM Record',
      dateCollected,
      notes: notes.trim(),
      attachedFileName: mockFileName.trim() || undefined,
      attachedFileSize: mockFileName.trim() ? '2.1 MB' : undefined,
    }

    onAddEvidence(newItem)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4 bg-[var(--color-surface-secondary)]/50">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-[var(--color-primary)]" />
            <h3 className="font-h3 text-base font-bold text-[var(--color-text-primary)]">
              Attach Supporting Evidence
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
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Evidence Document Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Q3 2026 Cloud Security Posture Telemetry"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Evidence Classification *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as AssessmentEvidenceItem['type'])}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
              >
                {EVIDENCE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Source Identifier / Reference
              </label>
              <input
                type="text"
                value={sourceReference}
                onChange={(e) => setSourceReference(e.target.value)}
                placeholder="e.g. AUD-2026-Q3-09"
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Collection Date
            </label>
            <input
              type="text"
              value={dateCollected}
              onChange={(e) => setDateCollected(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Findings & Verification Notes
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Outline specific findings, sampling size, or audit trail verification..."
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 leading-relaxed"
            />
          </div>

          {/* Clearly labeled file upload placeholder */}
          <div className="space-y-1.5 rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface-secondary)]/30 p-4 text-center">
            <Upload className="size-6 text-[var(--color-text-muted)] mx-auto mb-1" />
            <p className="text-xs font-semibold text-[var(--color-text-primary)]">
              Attach Artifact or Document
            </p>
            <p className="text-[11px] text-[var(--color-text-muted)]">
              PDF, CSV, JSON, or DOCX (Demo Storage Placeholder)
            </p>
            <input
              type="text"
              value={mockFileName}
              onChange={(e) => setMockFileName(e.target.value)}
              placeholder="Attach mock filename (e.g. AWS_Audit_Log_Q3.csv)"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs text-[var(--color-text-primary)] focus:outline-none text-center mt-2"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 border-t border-[var(--color-border)] pt-4">
            <Button variant="secondary" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Attach Evidence
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
