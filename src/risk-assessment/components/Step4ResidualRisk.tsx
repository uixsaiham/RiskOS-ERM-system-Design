import { useState } from 'react'
import {
  Scale,
  TrendingDown,
  TrendingUp,
  Minus,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  Paperclip,
} from 'lucide-react'
import { Button, Badge, RiskSeverityBadge } from '@/components/ui'
import {
  LIKELIHOOD_DEFINITIONS,
  IMPACT_DEFINITIONS,
  calculateScore,
  getSeverityBand,
  getAppetiteStatus,
  APPETITE_THRESHOLD,
  type RiskAssessmentFormData,
  type LikelihoodLevel,
  type ImpactLevel,
  type AssessmentEvidenceItem,
} from '../risk-assessment-data'
import { Matrix5x5 } from './Matrix5x5'
import { AddEvidenceModal } from './AddEvidenceModal'

interface Step4ResidualRiskProps {
  data: RiskAssessmentFormData
  onChange: (fields: Partial<RiskAssessmentFormData>) => void
  onNext: () => void
  onPrev: () => void
}

export function Step4ResidualRisk({
  data,
  onChange,
  onNext,
  onPrev,
}: Step4ResidualRiskProps) {
  const [addEvidenceModalOpen, setAddEvidenceModalOpen] = useState(false)

  const inherentScore = calculateScore(data.inherentLikelihood, data.inherentImpact)
  const inherentSeverity = getSeverityBand(inherentScore)

  const residualScore = calculateScore(data.residualLikelihood, data.residualImpact)
  const residualSeverity = getSeverityBand(residualScore)

  const deltaScore = residualScore - inherentScore
  const appetite = getAppetiteStatus(residualScore)

  const handleResidualLikelihoodSelect = (level: LikelihoodLevel) => {
    onChange({ residualLikelihood: level })
  }

  const handleResidualImpactSelect = (level: ImpactLevel) => {
    onChange({ residualImpact: level })
  }

  const handleAddEvidenceItem = (item: AssessmentEvidenceItem) => {
    onChange({ evidenceList: [...data.evidenceList, item] })
  }

  const handleRemoveEvidenceItem = (id: string) => {
    onChange({ evidenceList: data.evidenceList.filter((e) => e.id !== id) })
  }

  return (
    <div className="space-y-6">
      {/* ── Guidance Banner ── */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20 p-4 text-xs">
        <Scale className="size-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-blue-950 dark:text-blue-200">
            Residual Risk Evaluation & Appetite Alignment
          </p>
          <p className="text-blue-900/80 dark:text-blue-300/80 leading-relaxed">
            Evaluate residual likelihood and impact accounting for the tested effectiveness of controls in Step 3.
            Controls do not automatically reduce risk scores; you must formulate and defend the residual judgment.
          </p>
        </div>
      </div>

      {/* ── Two-Card Comparison Strip: Inherent vs. Residual ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Inherent Score Card */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-caption text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Inherent Risk (Gross)
            </span>
            <RiskSeverityBadge severity={inherentSeverity} size="sm" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-3xl font-extrabold text-[var(--color-text-primary)]">
              {inherentScore}
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">/ 25</span>
          </div>
          <p className="text-[11px] text-[var(--color-text-secondary)]">
            L{data.inherentLikelihood} ({LIKELIHOOD_DEFINITIONS[data.inherentLikelihood].label}) × I
            {data.inherentImpact} ({IMPACT_DEFINITIONS[data.inherentImpact].label})
          </p>
        </div>

        {/* Residual Score Card */}
        <div className="rounded-xl border-2 border-blue-500/40 bg-[var(--color-surface)] p-4 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-caption text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
              Residual Risk (Net)
            </span>
            <RiskSeverityBadge severity={residualSeverity} size="sm" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-3xl font-extrabold text-blue-600 dark:text-blue-400">
              {residualScore}
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">/ 25</span>
          </div>
          <p className="text-[11px] text-[var(--color-text-secondary)]">
            L{data.residualLikelihood} ({LIKELIHOOD_DEFINITIONS[data.residualLikelihood].label}) × I
            {data.residualImpact} ({IMPACT_DEFINITIONS[data.residualImpact].label})
          </p>
        </div>

        {/* Delta & Appetite Card */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-caption text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Risk Appetite Delta
            </span>
            <Badge
              variant={appetite.tone === 'success' ? 'success' : appetite.tone === 'warning' ? 'warning' : 'error'}
              size="sm"
            >
              {appetite.status}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-2xl font-extrabold text-[var(--color-text-primary)]">
              {deltaScore < 0 ? deltaScore : deltaScore === 0 ? '0' : `+${deltaScore}`} pts
            </span>
            {deltaScore < 0 ? (
              <span className="inline-flex items-center text-emerald-600 text-xs font-bold gap-0.5">
                <TrendingDown className="size-4" /> Reduced
              </span>
            ) : deltaScore === 0 ? (
              <span className="inline-flex items-center text-slate-500 text-xs font-bold gap-0.5">
                <Minus className="size-4" /> Unchanged
              </span>
            ) : (
              <span className="inline-flex items-center text-rose-600 text-xs font-bold gap-0.5">
                <TrendingUp className="size-4" /> Increased
              </span>
            )}
          </div>

          <p className="text-[11px] text-[var(--color-text-secondary)]">
            Approved ceiling: <span className="font-mono font-bold">{APPETITE_THRESHOLD} / 25</span> (
            {appetite.variance > 0 ? `+${appetite.variance} variance` : `${appetite.variance} within`})
          </p>
        </div>
      </div>

      {/* ── Selection Grids for Residual Likelihood & Residual Impact ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Residual Likelihood */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
            <div>
              <span className="font-caption text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Mitigated Probability
              </span>
              <h3 className="font-h3 text-base font-bold text-[var(--color-text-primary)]">
                Residual Likelihood (1–5) *
              </h3>
            </div>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              Level {data.residualLikelihood} / 5
            </span>
          </div>

          <div className="space-y-2">
            {([1, 2, 3, 4, 5] as LikelihoodLevel[]).map((level) => {
              const def = LIKELIHOOD_DEFINITIONS[level]
              const isSelected = data.residualLikelihood === level

              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => handleResidualLikelihoodSelect(level)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-2 ring-blue-500/40 shadow-xs'
                      : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-secondary)]/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`size-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
                        }`}
                      >
                        {level}
                      </span>
                      <span className="font-label text-xs font-bold text-[var(--color-text-primary)]">
                        {def.label}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-[var(--color-text-muted)]">
                      {def.probability}
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] text-[var(--color-text-secondary)] pl-8 leading-snug">
                    {def.description}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Residual Impact */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
            <div>
              <span className="font-caption text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Mitigated Consequence
              </span>
              <h3 className="font-h3 text-base font-bold text-[var(--color-text-primary)]">
                Residual Impact (1–5) *
              </h3>
            </div>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              Level {data.residualImpact} / 5
            </span>
          </div>

          <div className="space-y-2">
            {([1, 2, 3, 4, 5] as ImpactLevel[]).map((level) => {
              const def = IMPACT_DEFINITIONS[level]
              const isSelected = data.residualImpact === level

              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => handleResidualImpactSelect(level)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-2 ring-blue-500/40 shadow-xs'
                      : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-secondary)]/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`size-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
                        }`}
                      >
                        {level}
                      </span>
                      <span className="font-label text-xs font-bold text-[var(--color-text-primary)]">
                        {def.label}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-[var(--color-text-muted)]">
                      {def.financial}
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] text-[var(--color-text-secondary)] pl-8 leading-snug">
                    {def.description}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── 5x5 Comparison Matrix & Residual Rationale Panel ── */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-xs space-y-6">
        <div className="border-b border-[var(--color-border)] pb-3">
          <h2 className="font-h3 text-base font-bold text-[var(--color-text-primary)]">
            Residual Risk Analysis & Comparison Matrix
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Visualize the reduction vector from Inherent ('I') to Residual ('R') across the 5×5 grid.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Matrix Comparison (5 cols) */}
          <div className="lg:col-span-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-secondary)]/30 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--color-text-primary)]">
                Inherent vs. Residual Grid
              </span>
              <span className="font-mono text-[11px] text-[var(--color-text-muted)]">
                [{data.inherentLikelihood},{data.inherentImpact}] → [{data.residualLikelihood},
                {data.residualImpact}]
              </span>
            </div>

            <Matrix5x5
              inherentLikelihood={data.inherentLikelihood}
              inherentImpact={data.inherentImpact}
              residualLikelihood={data.residualLikelihood}
              residualImpact={data.residualImpact}
              mode="comparison"
              size="sm"
            />
          </div>

          {/* Right: Residual Rationale (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center justify-between">
                <span>Residual Risk Rationale & Defense *</span>
                <span className="text-[11px] text-[var(--color-text-muted)] font-normal lowercase">
                  Required for approval
                </span>
              </label>
              <textarea
                rows={5}
                required
                value={data.residualRationale}
                onChange={(e) => onChange({ residualRationale: e.target.value })}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-xs text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 leading-relaxed"
                placeholder="Explain why controls reduce or do not reduce likelihood or impact to the selected levels..."
              />
            </div>

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 p-3 text-xs text-amber-900 dark:text-amber-200">
              <strong>Appetite Benchmark:</strong> {appetite.description}
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 10: Supporting Evidence Catalog & Documentation ── */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border)] pb-3">
          <div>
            <h3 className="font-h3 text-base font-bold text-[var(--color-text-primary)]">
              Supporting Evidence & Attached Documentation ({data.evidenceList.length})
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
              Attach independent audit findings, telemetry exports, red-team reports, and control tests.
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setAddEvidenceModalOpen(true)}
            className="gap-1.5 text-xs font-semibold"
          >
            <Plus className="size-3.5" />
            <span>Add Evidence</span>
          </Button>
        </div>

        {/* Evidence Items List */}
        <div className="space-y-3">
          {data.evidenceList.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[var(--color-border)] p-6 text-center text-xs text-[var(--color-text-muted)]">
              No evidence documents attached yet. Click "Add Evidence" above to attach audit findings.
            </div>
          ) : (
            data.evidenceList.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-secondary)]/30 hover:border-[var(--color-primary)]/30 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[var(--color-primary)]">
                      {item.id}
                    </span>
                    <span className="font-bold text-xs text-[var(--color-text-primary)]">
                      {item.title}
                    </span>
                    <Badge variant="neutral" size="sm">
                      {item.type}
                    </Badge>
                  </div>

                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {item.notes}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-[var(--color-text-muted)] pt-0.5">
                    <span>Source: <strong className="font-mono">{item.sourceReference}</strong></span>
                    <span>·</span>
                    <span>Collected: {item.dateCollected}</span>
                    {item.attachedFileName && (
                      <>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1 text-[var(--color-primary)] font-mono">
                          <Paperclip className="size-3" />
                          {item.attachedFileName} ({item.attachedFileSize})
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveEvidenceItem(item.id)}
                    className="h-7 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 p-1.5"
                    title="Remove evidence item"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs">
        <Button variant="secondary" size="md" onClick={onPrev} className="gap-2 font-semibold">
          <ArrowLeft className="size-4" />
          <span>Back to Controls</span>
        </Button>

        <Button variant="primary" size="md" onClick={onNext} className="gap-2 font-semibold shadow-xs">
          <span>Continue to Review & Submit</span>
          <ArrowRight className="size-4" />
        </Button>
      </div>

      {/* Add Evidence Modal */}
      <AddEvidenceModal
        open={addEvidenceModalOpen}
        onClose={() => setAddEvidenceModalOpen(false)}
        onAddEvidence={handleAddEvidenceItem}
      />
    </div>
  )
}
