import {
  Play,
  History,
  Activity,
} from 'lucide-react'
import { Button, Badge, RiskSeverityBadge } from '@/components/ui'
import type { ComprehensiveRiskDetail } from '../risk-details-data'
import { RiskMatrixPositionCard } from './RiskMatrixPositionCard'

interface RiskAssessmentTabProps {
  detail: ComprehensiveRiskDetail
  onStartAssessment: () => void
}

export function RiskAssessmentTab({
  detail,
  onStartAssessment,
}: RiskAssessmentTabProps) {
  const { assessmentSummary, assessmentHistory, appetiteDetails } = detail

  return (
    <div className="space-y-6">
      {/* ── Top Bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-h3 text-base font-bold text-[var(--color-text-primary)]">
            Risk Assessment & Scoring Details
          </h3>
          <p className="font-body-md text-xs text-[var(--color-text-secondary)]">
            Detailed evaluation of inherent severity, residual exposure, and appetite variance.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={onStartAssessment}
          className="gap-1.5 h-8 text-xs font-semibold shadow-xs"
        >
          <Play className="size-3.5" />
          <span>Launch New Assessment</span>
        </Button>
      </div>

      {/* ── 4 Key Scoring Metrics ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
            Likelihood Rating
          </span>
          <div className="font-mono text-2xl font-extrabold text-[var(--color-text-primary)]">
            {assessmentSummary.likelihoodLabel}
          </div>
          <p className="text-[11px] text-[var(--color-text-secondary)]">
            Frequency: Estimated multiple occurrences per annual cycle.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
            Impact Rating
          </span>
          <div className="font-mono text-2xl font-extrabold text-[var(--color-text-primary)]">
            {assessmentSummary.impactLabel}
          </div>
          <p className="text-[11px] text-[var(--color-text-secondary)]">
            Severity: Critical business disruption and regulatory disclosure required.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Inherent Score
            </span>
            <RiskSeverityBadge severity="critical" size="sm" />
          </div>
          <div className="font-mono text-2xl font-extrabold text-[var(--color-text-primary)]">
            {assessmentSummary.inherentScore} / 25
          </div>
          <p className="text-[11px] text-[var(--color-text-secondary)]">
            Baseline gross unmitigated exposure score.
          </p>
        </div>

        <div className="rounded-xl border-2 border-amber-500/40 bg-[var(--color-surface)] p-4 shadow-xs space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Residual Score
            </span>
            <RiskSeverityBadge severity="high" size="sm" />
          </div>
          <div className="font-mono text-2xl font-extrabold text-[var(--color-text-primary)]">
            {assessmentSummary.residualScore} / 25
          </div>
          <p className="text-[11px] text-[var(--color-text-secondary)]">
            Current net exposure after existing controls.
          </p>
        </div>
      </div>

      {/* ── 5x5 Heat Matrix + Methodology Card ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <RiskMatrixPositionCard detail={detail} />
        </div>

        <div className="lg:col-span-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2.5">
              <Activity className="size-4 text-[var(--color-primary)]" />
              <h3 className="font-h3 text-sm font-bold text-[var(--color-text-primary)]">
                Scoring Methodology & Criteria
              </h3>
            </div>

            <p className="font-body-md text-xs text-[var(--color-text-secondary)] leading-relaxed">
              {assessmentSummary.methodologyNote}
            </p>

            <div className="rounded-lg bg-[var(--color-surface-secondary)] border border-[var(--color-border)] p-3 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[var(--color-text-muted)]">Assessment Date:</span>
                <span className="font-medium text-[var(--color-text-primary)]">{assessmentSummary.assessmentDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--color-text-muted)]">Lead Assessor:</span>
                <span className="font-medium text-[var(--color-text-primary)]">{assessmentSummary.assessor}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--color-text-muted)]">Risk Appetite Threshold:</span>
                <span className="font-mono font-bold text-rose-600">
                  {appetiteDetails.approvedThreshold} / 25 (+{appetiteDetails.variancePoints} variance)
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 p-3 text-xs text-amber-900 dark:text-amber-200">
            <strong>Appetite Action Required:</strong> {appetiteDetails.requiredResponse}
          </div>
        </div>
      </div>

      {/* ── Assessment History ── */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-xs space-y-3.5">
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2.5">
          <History className="size-4 text-[var(--color-primary)]" />
          <h3 className="font-h3 text-base font-bold text-[var(--color-text-primary)]">
            Historical Assessment Cycles
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-[var(--color-text-muted)] font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-2.5 pr-4">Assessment Date</th>
                <th className="py-2.5 px-4 text-right">Inherent Score</th>
                <th className="py-2.5 px-4 text-right">Residual Score</th>
                <th className="py-2.5 px-4">Assessor</th>
                <th className="py-2.5 pl-4 text-right">Approval Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] font-body-sm">
              {assessmentHistory.map((rec) => (
                <tr key={rec.id} className="hover:bg-[var(--color-surface-secondary)]/40 transition-colors">
                  <td className="py-3 pr-4 font-semibold text-[var(--color-text-primary)]">
                    {rec.date}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-rose-600 dark:text-rose-400">
                    {rec.inherentScore} / 25
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-amber-600 dark:text-amber-400">
                    {rec.residualScore} / 25
                  </td>
                  <td className="py-3 px-4 text-[var(--color-text-secondary)]">
                    {rec.assessor}
                  </td>
                  <td className="py-3 pl-4 text-right">
                    <Badge variant="success" size="sm">{rec.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
