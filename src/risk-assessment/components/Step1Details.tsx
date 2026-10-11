import {
  FileText,
  Calendar,
  User,
  Shield,
  Layers,
  Clock,
  ArrowRight,
  Info,
} from 'lucide-react'
import { Button } from '@/components/ui'
import type { RiskAssessmentFormData } from '../risk-assessment-data'

interface Step1DetailsProps {
  data: RiskAssessmentFormData
  onChange: (fields: Partial<RiskAssessmentFormData>) => void
  onNext: () => void
}

export function Step1Details({ data, onChange, onNext }: Step1DetailsProps) {
  return (
    <div className="space-y-6">
      {/* Informational Guidance Banner */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20 p-4 text-xs">
        <Info className="size-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-blue-900 dark:text-blue-200">
            Assessment Scope & Governance Calibration
          </p>
          <p className="text-blue-800/80 dark:text-blue-300/80 leading-relaxed">
            Specify the campaign parameters, review period, and accountability chain for evaluating{' '}
            <strong className="font-mono text-blue-900 dark:text-blue-100">{data.riskId}</strong>.
            Upon completion, this evaluation will be routed to the designated risk reviewer.
          </p>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-xs space-y-6">
        <div className="border-b border-[var(--color-border)] pb-3">
          <h2 className="font-h3 text-base font-bold text-[var(--color-text-primary)]">
            Step 1: Campaign Metadata & Scope
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Identify the trigger, boundaries, and assigned authorities for this risk evaluation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Assessment Name */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-1.5">
              <FileText className="size-3 text-[var(--color-primary)]" />
              <span>Assessment Title *</span>
            </label>
            <input
              type="text"
              required
              value={data.assessmentName}
              onChange={(e) => onChange({ assessmentName: e.target.value })}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 font-medium"
              placeholder="e.g. Q4 2026 Periodic Cybersecurity Assessment"
            />
          </div>

          {/* Assessment Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Assessment Type *
            </label>
            <select
              value={data.assessmentType}
              onChange={(e) =>
                onChange({
                  assessmentType: e.target.value as RiskAssessmentFormData['assessmentType'],
                })
              }
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
            >
              <option value="Periodic Review">Periodic Review (Scheduled ERM Cycle)</option>
              <option value="Initial Assessment">Initial Assessment (New Risk Induction)</option>
              <option value="Event-Triggered Review">Event-Triggered Review (Post-Incident / Audit)</option>
            </select>
          </div>

          {/* Assessment Period */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-1.5">
              <Clock className="size-3 text-[var(--color-text-muted)]" />
              <span>Assessment Period *</span>
            </label>
            <input
              type="text"
              required
              value={data.period}
              onChange={(e) => onChange({ period: e.target.value })}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 font-mono"
              placeholder="e.g. Q4 2026 (Oct 1 – Dec 31, 2026)"
            />
          </div>

          {/* Assessment Scope */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-1.5">
              <Layers className="size-3 text-[var(--color-text-muted)]" />
              <span>Organizational & Technical Scope *</span>
            </label>
            <input
              type="text"
              required
              value={data.scope}
              onChange={(e) => onChange({ scope: e.target.value })}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
              placeholder="e.g. Enterprise IT Infrastructure, Cloud Kubernetes Clusters, Payment Gateways"
            />
          </div>

          {/* Assessment Methodology */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-1.5">
              <Shield className="size-3 text-[var(--color-text-muted)]" />
              <span>Scoring Methodology</span>
            </label>
            <input
              type="text"
              value={data.methodology}
              onChange={(e) => onChange({ methodology: e.target.value })}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)]/50 px-3.5 py-2.5 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 font-mono"
            />
            <p className="text-[11px] text-[var(--color-text-muted)]">
              Using the standardized 5×5 Enterprise Likelihood × Impact scoring scale.
            </p>
          </div>

          {/* Due Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-1.5">
              <Calendar className="size-3 text-[var(--color-text-muted)]" />
              <span>Target Review Due Date *</span>
            </label>
            <input
              type="date"
              required
              value={data.dueDate}
              onChange={(e) => onChange({ dueDate: e.target.value })}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
            />
          </div>

          {/* Lead Assessor */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-1.5">
              <User className="size-3 text-[var(--color-text-muted)]" />
              <span>Assessor (Owner) *</span>
            </label>
            <input
              type="text"
              required
              value={data.owner}
              onChange={(e) => onChange({ owner: e.target.value })}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
            />
          </div>

          {/* Designated Reviewer */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-1.5">
              <User className="size-3 text-[var(--color-text-muted)]" />
              <span>Designated Reviewer (Approver) *</span>
            </label>
            <input
              type="text"
              required
              value={data.reviewer}
              onChange={(e) => onChange({ reviewer: e.target.value })}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
            />
          </div>

          {/* Notes & Context */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Assessment Scope Notes & Background Context
            </label>
            <textarea
              rows={3}
              value={data.notes}
              onChange={(e) => onChange({ notes: e.target.value })}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-xs text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 leading-relaxed"
              placeholder="Outline specific threat environment shifts, recent regulatory advisories, or perimeter changes motivating this assessment..."
            />
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-end border-t border-[var(--color-border)] pt-4">
          <Button
            variant="primary"
            size="md"
            onClick={onNext}
            className="gap-2 font-semibold shadow-xs"
          >
            <span>Continue to Likelihood & Impact</span>
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

