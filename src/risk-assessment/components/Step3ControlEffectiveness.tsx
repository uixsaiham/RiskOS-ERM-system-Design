import { useState } from 'react'
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Calendar,
  User,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Info,
} from 'lucide-react'
import { Button, Badge } from '@/components/ui'
import type {
  RiskAssessmentFormData,
  AssessmentControlItem,
  ControlEffectivenessRating,
} from '../risk-assessment-data'
import { ControlDetailsModal } from './ControlDetailsModal'

interface Step3ControlEffectivenessProps {
  data: RiskAssessmentFormData
  onChange: (fields: Partial<RiskAssessmentFormData>) => void
  onNext: () => void
  onPrev: () => void
}

const RATING_OPTIONS: { rating: ControlEffectivenessRating; label: string; desc: string }[] = [
  { rating: 'Effective', label: 'Effective', desc: 'Operating as designed with no material exceptions.' },
  { rating: 'Partially Effective', label: 'Partially Effective', desc: 'Operating but with gaps or minor findings.' },
  { rating: 'Ineffective', label: 'Ineffective', desc: 'Failed design or operational testing.' },
  { rating: 'Not Tested', label: 'Not Tested', desc: 'Pending testing cycle or untested.' },
]

export function Step3ControlEffectiveness({
  data,
  onChange,
  onNext,
  onPrev,
}: Step3ControlEffectivenessProps) {
  const [selectedControlForDetails, setSelectedControlForDetails] = useState<AssessmentControlItem | null>(null)

  const handleUpdateControlRating = (controlId: string, rating: ControlEffectivenessRating) => {
    const updated = data.controls.map((c) => (c.id === controlId ? { ...c, effectiveness: rating } : c))
    onChange({ controls: updated })
  }

  const handleUpdateControlComment = (controlId: string, comment: string) => {
    const updated = data.controls.map((c) => (c.id === controlId ? { ...c, evidenceComment: comment } : c))
    onChange({ controls: updated })
  }

  // Summary counts
  const effectiveCount = data.controls.filter((c) => c.effectiveness === 'Effective').length
  const partialCount = data.controls.filter((c) => c.effectiveness === 'Partially Effective').length
  const ineffectiveCount = data.controls.filter((c) => c.effectiveness === 'Ineffective').length
  const notTestedCount = data.controls.filter((c) => c.effectiveness === 'Not Tested').length

  return (
    <div className="space-y-6">
      {/* ── Guidance Banner ── */}
      <div className="flex items-start gap-3 rounded-xl border border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-950/20 p-4 text-xs">
        <Info className="size-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-indigo-950 dark:text-indigo-200">
            Control Environment Validation Principle
          </p>
          <p className="text-indigo-900/80 dark:text-indigo-300/80 leading-relaxed">
            Validate the operating health of each assigned control. A control's effectiveness directly
            informs the subsequent residual risk evaluation, but does <strong>not</strong> automatically or
            silently reduce the risk score. You will explicitly justify residual likelihood and impact in Step 4.
          </p>
        </div>
      </div>

      {/* ── Control Posture Summary Strip ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 shadow-xs">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="size-3.5" />
            <span>Effective</span>
          </div>
          <div className="font-mono text-2xl font-extrabold text-[var(--color-text-primary)] mt-1">
            {effectiveCount}
          </div>
          <span className="text-[11px] text-[var(--color-text-muted)]">Operating reliably</span>
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 shadow-xs">
          <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="size-3.5" />
            <span>Partially Effective</span>
          </div>
          <div className="font-mono text-2xl font-extrabold text-[var(--color-text-primary)] mt-1">
            {partialCount}
          </div>
          <span className="text-[11px] text-[var(--color-text-muted)]">Gaps identified</span>
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 shadow-xs">
          <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
            <XCircle className="size-3.5" />
            <span>Ineffective</span>
          </div>
          <div className="font-mono text-2xl font-extrabold text-[var(--color-text-primary)] mt-1">
            {ineffectiveCount}
          </div>
          <span className="text-[11px] text-[var(--color-text-muted)]">Failed test criteria</span>
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 shadow-xs">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="size-3.5" />
            <span>Not Tested</span>
          </div>
          <div className="font-mono text-2xl font-extrabold text-[var(--color-text-primary)] mt-1">
            {notTestedCount}
          </div>
          <span className="text-[11px] text-[var(--color-text-muted)]">Pending verification</span>
        </div>
      </div>

      {/* ── Main Controls Review List ── */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-xs space-y-6">
        <div className="border-b border-[var(--color-border)] pb-3">
          <h2 className="font-h3 text-base font-bold text-[var(--color-text-primary)]">
            Step 3: Internal Control Evaluation ({data.controls.length} controls)
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Evaluate design and operating effectiveness. Document findings and evidence notes for each control.
          </p>
        </div>

        <div className="space-y-4">
          {data.controls.map((control) => (
            <div
              key={control.id}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-secondary)]/30 p-5 space-y-4 hover:border-[var(--color-primary)]/40 transition-colors"
            >
              {/* Control Header & Identity */}
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[var(--color-primary)]">
                      {control.id}
                    </span>
                    <span className="text-[var(--color-border)]">·</span>
                    <h3 className="font-label text-sm font-bold text-[var(--color-text-primary)]">
                      {control.name}
                    </h3>
                    <Badge variant="neutral" size="sm">
                      {control.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {control.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedControlForDetails(control)}
                    className="gap-1.5 h-7 text-xs text-[var(--color-primary)] hover:underline"
                  >
                    <span>View Control Details</span>
                    <ExternalLink className="size-3" />
                  </Button>
                </div>
              </div>

              {/* Control Operational Attributes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs border-y border-[var(--color-border)]/60 py-2.5">
                <div className="flex items-center gap-1.5">
                  <User className="size-3 text-[var(--color-text-muted)]" />
                  <span className="text-[var(--color-text-muted)]">Owner:</span>
                  <span className="font-semibold text-[var(--color-text-primary)]">{control.owner}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Calendar className="size-3 text-[var(--color-text-muted)]" />
                  <span className="text-[var(--color-text-muted)]">Last Tested:</span>
                  <span className="font-mono font-medium text-[var(--color-text-primary)]">
                    {control.lastTested}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[var(--color-text-muted)]">Status:</span>
                  <span className="font-semibold text-[var(--color-text-primary)]">
                    {control.implementationStatus}
                  </span>
                </div>
              </div>

              {/* Rating Radio Buttons & Inline Evidence Comment */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                {/* Rating selection (5 cols) */}
                <div className="lg:col-span-5 space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Assessor Effectiveness Rating *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {RATING_OPTIONS.map((opt) => {
                      const isSelected = control.effectiveness === opt.rating
                      return (
                        <button
                          key={opt.rating}
                          type="button"
                          onClick={() => handleUpdateControlRating(control.id, opt.rating)}
                          className={`text-left p-2.5 rounded-lg border text-xs font-semibold transition-all ${
                            isSelected
                              ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)]/40 text-[var(--color-primary)] ring-1 ring-[var(--color-primary)]'
                              : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{opt.label}</span>
                            {isSelected && <CheckCircle2 className="size-3 text-[var(--color-primary)]" />}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Evidence & Comment (7 cols) */}
                <div className="lg:col-span-7 space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Test Results & Supporting Observations
                  </label>
                  <textarea
                    rows={2}
                    value={control.evidenceComment}
                    onChange={(e) => handleUpdateControlComment(control.id, e.target.value)}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 leading-relaxed"
                    placeholder="Document test metrics, telemetry percentages, or known gaps..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Control Environment Summary Notes */}
        <div className="space-y-1.5 pt-2 border-t border-[var(--color-border)]">
          <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
            Overall Control Environment Narrative
          </label>
          <textarea
            rows={3}
            value={data.controlEnvironmentNotes}
            onChange={(e) => onChange({ controlEnvironmentNotes: e.target.value })}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 leading-relaxed"
            placeholder="Summarize the defense-in-depth posture across all evaluated controls..."
          />
        </div>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4">
          <Button variant="secondary" size="md" onClick={onPrev} className="gap-2 font-semibold">
            <ArrowLeft className="size-4" />
            <span>Back to Likelihood & Impact</span>
          </Button>

          <Button variant="primary" size="md" onClick={onNext} className="gap-2 font-semibold shadow-xs">
            <span>Continue to Residual Risk</span>
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* Control Details Modal */}
      <ControlDetailsModal
        open={Boolean(selectedControlForDetails)}
        onClose={() => setSelectedControlForDetails(null)}
        control={selectedControlForDetails}
      />
    </div>
  )
}
