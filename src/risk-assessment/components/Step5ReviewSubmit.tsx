import {
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Scale,
  ShieldCheck,
  ArrowLeft,
  Save,
  Check,
  Send,
} from 'lucide-react'
import { Button, Badge, RiskSeverityBadge } from '@/components/ui'
import {
  calculateScore,
  getSeverityBand,
  getAppetiteStatus,
  APPETITE_THRESHOLD,
  type RiskAssessmentFormData,
} from '../risk-assessment-data'

interface Step5ReviewSubmitProps {
  data: RiskAssessmentFormData
  onPrev: () => void
  onSaveDraft: () => void
  onSubmitForReview: () => void
  onNavigateToRisk: (riskId: string) => void
  isSubmitting?: boolean
}

export function Step5ReviewSubmit({
  data,
  onPrev,
  onSaveDraft,
  onSubmitForReview,
  onNavigateToRisk,
  isSubmitting = false,
}: Step5ReviewSubmitProps) {
  const inherentScore = calculateScore(data.inherentLikelihood, data.inherentImpact)
  const inherentSeverity = getSeverityBand(inherentScore)

  const residualScore = calculateScore(data.residualLikelihood, data.residualImpact)
  const residualSeverity = getSeverityBand(residualScore)

  const deltaScore = residualScore - inherentScore
  const appetite = getAppetiteStatus(residualScore)

  // Validation checks
  const validationChecks = [
    {
      label: 'Assessment Title & Scope defined',
      passed: Boolean(data.assessmentName.trim() && data.scope.trim()),
      message: 'Assessment title or scope is empty.',
    },
    {
      label: 'Inherent Risk Likelihood & Impact evaluated',
      passed: Boolean(data.inherentLikelihood && data.inherentImpact),
      message: 'Inherent scoring is incomplete.',
    },
    {
      label: 'Inherent Risk Rationale documented',
      passed: Boolean(data.inherentRationale.trim().length >= 10),
      message: 'Inherent rationale requires at least 10 characters.',
    },
    {
      label: 'All Assigned Controls evaluated',
      passed: data.controls.every((c) => c.effectiveness !== 'Not Tested'),
      message: 'One or more controls are still marked as "Not Tested".',
    },
    {
      label: 'Residual Risk Likelihood & Impact evaluated',
      passed: Boolean(data.residualLikelihood && data.residualImpact),
      message: 'Residual scoring is incomplete.',
    },
    {
      label: 'Residual Risk Rationale documented',
      passed: Boolean(data.residualRationale.trim().length >= 10),
      message: 'Residual rationale requires at least 10 characters.',
    },
    {
      label: 'Supporting Evidence attached',
      passed: data.evidenceList.length > 0,
      message: 'At least one evidence document should be attached.',
    },
    {
      label: 'Designated Reviewer assigned',
      passed: Boolean(data.reviewer.trim()),
      message: 'No designated reviewer specified.',
    },
  ]

  const allPassed = validationChecks.every((c) => c.passed)
  const isSubmitted = data.status === 'pending_review' || data.status === 'approved'

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/20 p-8 text-center space-y-5 shadow-sm">
        <div className="size-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="size-8" />
        </div>

        <div className="space-y-1.5 max-w-lg mx-auto">
          <h2 className="font-h2 text-xl font-bold text-emerald-950 dark:text-emerald-100">
            Assessment Submitted for Review
          </h2>
          <p className="text-xs text-emerald-900/80 dark:text-emerald-300/80 leading-relaxed">
            The assessment for <strong className="font-mono">{data.riskId} · {data.riskTitle}</strong> has
            been formally committed and dispatched to{' '}
            <strong className="text-emerald-950 dark:text-emerald-200">{data.reviewer}</strong>.
          </p>
        </div>

        <div className="max-w-md mx-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-xs text-left space-y-2">
          <div className="flex justify-between">
            <span className="text-[var(--color-text-muted)]">Assessment State:</span>
            <Badge variant="warning" size="sm">Pending Review</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-text-muted)]">Inherent Score:</span>
            <span className="font-mono font-bold text-rose-600">{inherentScore} / 25 ({inherentSeverity})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-text-muted)]">Residual Score:</span>
            <span className="font-mono font-bold text-blue-600">{residualScore} / 25 ({residualSeverity})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-text-muted)]">Appetite Status:</span>
            <span className="font-semibold">{appetite.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-text-muted)]">Evidence Documents:</span>
            <span className="font-mono">{data.evidenceList.length} files attached</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button
            variant="secondary"
            onClick={() => onNavigateToRisk(data.riskId)}
            className="text-xs font-semibold"
          >
            <span>Return to Risk Details ({data.riskId})</span>
          </Button>
          <Button
            variant="primary"
            onClick={() => onNavigateToRisk('')}
            className="text-xs font-semibold"
          >
            <span>Return to Risk Register</span>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* ── Top Overview Banner ── */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20 p-4 text-xs">
        <FileCheck2 className="size-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-blue-950 dark:text-blue-200">
            Pre-Submission Audit & Verification Dossier
          </p>
          <p className="text-blue-900/80 dark:text-blue-300/80 leading-relaxed">
            Review the complete assessment dossier below. Verify scoring consistency, control evidence, and
            appetite variance before routing to{' '}
            <strong className="text-blue-950 dark:text-blue-100">{data.reviewer}</strong>.
          </p>
        </div>
      </div>

      {/* ── Comprehensive Summary Dossier Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Campaign Metadata */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-xs space-y-3.5">
          <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2.5">
            <FileText className="size-4 text-[var(--color-primary)]" />
            <h3 className="font-h3 text-sm font-bold text-[var(--color-text-primary)]">
              Assessment Metadata
            </h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-[var(--color-border)]/50">
              <span className="text-[var(--color-text-muted)]">Campaign Title:</span>
              <span className="font-semibold text-[var(--color-text-primary)] text-right">
                {data.assessmentName}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-[var(--color-border)]/50">
              <span className="text-[var(--color-text-muted)]">Type:</span>
              <span className="font-medium text-[var(--color-text-primary)]">{data.assessmentType}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-[var(--color-border)]/50">
              <span className="text-[var(--color-text-muted)]">Period:</span>
              <span className="font-mono text-[var(--color-text-primary)]">{data.period}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-[var(--color-border)]/50">
              <span className="text-[var(--color-text-muted)]">Assessor:</span>
              <span className="font-medium text-[var(--color-text-primary)]">{data.owner}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-[var(--color-border)]/50">
              <span className="text-[var(--color-text-muted)]">Reviewer:</span>
              <span className="font-bold text-[var(--color-primary)]">{data.reviewer}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-[var(--color-text-muted)]">Due Date:</span>
              <span className="font-mono text-[var(--color-text-primary)]">{data.dueDate}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Risk Scoring Summary */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-xs space-y-3.5">
          <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2.5">
            <Scale className="size-4 text-[var(--color-primary)]" />
            <h3 className="font-h3 text-sm font-bold text-[var(--color-text-primary)]">
              Scoring & Appetite Summary
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)]/50 p-3 text-center">
              <span className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]">
                Inherent Risk
              </span>
              <div className="font-mono text-2xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">
                {inherentScore} / 25
              </div>
              <RiskSeverityBadge severity={inherentSeverity} size="sm" />
              <p className="text-[10px] text-[var(--color-text-muted)] mt-1">
                L{data.inherentLikelihood} × I{data.inherentImpact}
              </p>
            </div>

            <div className="rounded-lg border-2 border-blue-500/40 bg-blue-50/20 dark:bg-blue-950/20 p-3 text-center">
              <span className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-400">
                Residual Risk
              </span>
              <div className="font-mono text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                {residualScore} / 25
              </div>
              <RiskSeverityBadge severity={residualSeverity} size="sm" />
              <p className="text-[10px] text-[var(--color-text-muted)] mt-1">
                L{data.residualLikelihood} × I{data.residualImpact}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)]/30 p-2.5 text-xs space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-[var(--color-text-muted)]">Net Exposure Reduction:</span>
              <span className="font-mono font-bold text-emerald-600">
                {deltaScore} points ({inherentScore} → {residualScore})
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[var(--color-text-muted)]">Appetite Threshold:</span>
              <span className="font-mono font-bold">{APPETITE_THRESHOLD} / 25</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[var(--color-text-muted)]">Tolerance Status:</span>
              <Badge
                variant={appetite.tone === 'success' ? 'success' : appetite.tone === 'warning' ? 'warning' : 'error'}
                size="sm"
              >
                {appetite.status}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* ── Control Posture & Evidence Overview Strip ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls Evaluation Breakdown */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2.5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-[var(--color-primary)]" />
              <h3 className="font-h3 text-sm font-bold text-[var(--color-text-primary)]">
                Control Posture ({data.controls.length})
              </h3>
            </div>
            <span className="text-[11px] text-[var(--color-text-muted)]">Step 3 Verified</span>
          </div>

          <div className="space-y-2">
            {data.controls.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)]/30 text-xs"
              >
                <div className="min-w-0 pr-2">
                  <span className="font-mono font-bold text-[var(--color-primary)] mr-2">{c.id}</span>
                  <span className="font-medium text-[var(--color-text-primary)] truncate">{c.name}</span>
                </div>
                <Badge
                  variant={c.effectiveness === 'Effective' ? 'success' : c.effectiveness === 'Partially Effective' ? 'warning' : 'error'}
                  size="sm"
                >
                  {c.effectiveness}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Evidence Documents Checklist */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2.5">
            <div className="flex items-center gap-2">
              <FileCheck2 className="size-4 text-[var(--color-primary)]" />
              <h3 className="font-h3 text-sm font-bold text-[var(--color-text-primary)]">
                Attached Evidence ({data.evidenceList.length})
              </h3>
            </div>
            <span className="text-[11px] text-[var(--color-text-muted)]">Step 4 Verified</span>
          </div>

          <div className="space-y-2">
            {data.evidenceList.map((e) => (
              <div
                key={e.id}
                className="flex items-center justify-between p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)]/30 text-xs"
              >
                <div className="min-w-0 pr-2">
                  <span className="font-mono font-bold text-[var(--color-primary)] mr-2">{e.id}</span>
                  <span className="font-medium text-[var(--color-text-primary)] truncate">{e.title}</span>
                </div>
                <Badge variant="neutral" size="sm">
                  {e.type}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Validation Checklist & Submission Gate ── */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2.5">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-[var(--color-primary)]" />
            <h3 className="font-h3 text-sm font-bold text-[var(--color-text-primary)]">
              Submission Readiness Checklist
            </h3>
          </div>
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded ${
              allPassed
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
            }`}
          >
            {allPassed ? 'Ready for Review' : 'Incomplete Fields Detected'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {validationChecks.map((chk, i) => (
            <div
              key={i}
              className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs ${
                chk.passed
                  ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/30 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200'
                  : 'border-amber-200 dark:border-amber-900/40 bg-amber-50/30 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200'
              }`}
            >
              {chk.passed ? (
                <Check className="size-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
              ) : (
                <AlertTriangle className="size-4 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="min-w-0">
                <p className="font-semibold">{chk.label}</p>
                {!chk.passed && (
                  <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-0.5 font-normal">
                    {chk.message}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer Navigation & Submit Actions ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs">
        <Button variant="secondary" size="md" onClick={onPrev} className="gap-2 font-semibold">
          <ArrowLeft className="size-4" />
          <span>Back to Residual Risk</span>
        </Button>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="md" onClick={onSaveDraft} className="gap-1.5 font-semibold">
            <Save className="size-4" />
            <span>Save Draft</span>
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={onSubmitForReview}
            loading={isSubmitting}
            disabled={!allPassed}
            className="gap-2 font-semibold shadow-xs"
          >
            <Send className="size-4" />
            <span>Submit for Review</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
