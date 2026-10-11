import {
  Flame,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
} from 'lucide-react'
import { Button, RiskSeverityBadge } from '@/components/ui'
import {
  LIKELIHOOD_DEFINITIONS,
  IMPACT_DEFINITIONS,
  calculateScore,
  getSeverityBand,
  type RiskAssessmentFormData,
  type LikelihoodLevel,
  type ImpactLevel,
} from '../risk-assessment-data'
import { Matrix5x5 } from './Matrix5x5'

interface Step2LikelihoodImpactProps {
  data: RiskAssessmentFormData
  onChange: (fields: Partial<RiskAssessmentFormData>) => void
  onNext: () => void
  onPrev: () => void
}

export function Step2LikelihoodImpact({
  data,
  onChange,
  onNext,
  onPrev,
}: Step2LikelihoodImpactProps) {
  const inherentScore = calculateScore(data.inherentLikelihood, data.inherentImpact)
  const inherentSeverity = getSeverityBand(inherentScore)

  const handleLikelihoodSelect = (level: LikelihoodLevel) => {
    onChange({ inherentLikelihood: level })
  }

  const handleImpactSelect = (level: ImpactLevel) => {
    onChange({ inherentImpact: level })
  }

  return (
    <div className="space-y-6">
      {/* ── Guidance Banner ── */}
      <div className="flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-50/50 dark:bg-rose-950/20 p-4 text-xs">
        <Flame className="size-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-rose-950 dark:text-rose-200">
            Inherent Risk Evaluation (Pre-Control Baseline)
          </p>
          <p className="text-rose-900/80 dark:text-rose-300/80 leading-relaxed">
            Evaluate the gross operational threat posed by{' '}
            <strong className="font-mono text-rose-950 dark:text-rose-100">{data.riskId}</strong>{' '}
            assuming no internal controls, firewalls, or mitigation measures are currently in place.
          </p>
        </div>
      </div>

      {/* ── Two Primary Selection Cards: Likelihood & Impact ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── 1. Likelihood Level Selector ── */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
            <div>
              <span className="font-caption text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Frequency Analysis
              </span>
              <h3 className="font-h3 text-base font-bold text-[var(--color-text-primary)]">
                Inherent Likelihood (1–5)
              </h3>
            </div>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[var(--color-primary-subtle)] text-[var(--color-primary)]">
              Level {data.inherentLikelihood} / 5
            </span>
          </div>

          <p className="text-xs text-[var(--color-text-secondary)]">
            Estimate probability of threat realization without protective safeguards:
          </p>

          <div className="space-y-2">
            {([1, 2, 3, 4, 5] as LikelihoodLevel[]).map((level) => {
              const def = LIKELIHOOD_DEFINITIONS[level]
              const isSelected = data.inherentLikelihood === level

              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => handleLikelihoodSelect(level)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)]/30 ring-2 ring-[var(--color-primary)]/40 shadow-xs'
                      : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-secondary)]/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`size-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                          isSelected
                            ? 'bg-[var(--color-primary)] text-white'
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

                  <p className="mt-1.5 text-[11px] text-[var(--color-text-secondary)] pl-8 leading-snug">
                    {def.description}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── 2. Impact Level Selector ── */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
            <div>
              <span className="font-caption text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Consequence Analysis
              </span>
              <h3 className="font-h3 text-base font-bold text-[var(--color-text-primary)]">
                Inherent Impact (1–5)
              </h3>
            </div>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[var(--color-primary-subtle)] text-[var(--color-primary)]">
              Level {data.inherentImpact} / 5
            </span>
          </div>

          <p className="text-xs text-[var(--color-text-secondary)]">
            Estimate potential financial, operational, and regulatory blast radius:
          </p>

          <div className="space-y-2">
            {([1, 2, 3, 4, 5] as ImpactLevel[]).map((level) => {
              const def = IMPACT_DEFINITIONS[level]
              const isSelected = data.inherentImpact === level

              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => handleImpactSelect(level)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)]/30 ring-2 ring-[var(--color-primary)]/40 shadow-xs'
                      : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-secondary)]/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`size-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                          isSelected
                            ? 'bg-[var(--color-primary)] text-white'
                            : 'bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
                        }`}
                      >
                        {level}
                      </span>
                      <span className="font-label text-xs font-bold text-[var(--color-text-primary)]">
                        {def.label}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono font-medium text-[var(--color-text-muted)]">
                      {def.financial}
                    </span>
                  </div>

                  <p className="mt-1.5 text-[11px] text-[var(--color-text-secondary)] pl-8 leading-snug">
                    {def.description}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── 3. Inherent Risk Evaluation & 5x5 Matrix Panel (Section 7) ── */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border)] pb-3">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="size-4 text-rose-600" />
              <h3 className="font-h3 text-base font-bold text-[var(--color-text-primary)]">
                Inherent Risk — Before Controls
              </h3>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
              Gross exposure calculated as Likelihood ({data.inherentLikelihood}) × Impact ({data.inherentImpact}).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--color-text-muted)]">Severity Classification:</span>
            <RiskSeverityBadge severity={inherentSeverity} size="md" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Score Card & Rationale (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* KPI Strip */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-secondary)]/50 p-3.5 text-center">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-text-muted)]">
                  Likelihood
                </span>
                <div className="font-mono text-xl font-extrabold text-[var(--color-text-primary)] mt-1">
                  {data.inherentLikelihood} / 5
                </div>
                <span className="text-[11px] font-semibold text-[var(--color-text-secondary)]">
                  {LIKELIHOOD_DEFINITIONS[data.inherentLikelihood].label}
                </span>
              </div>

              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-secondary)]/50 p-3.5 text-center">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-text-muted)]">
                  Impact
                </span>
                <div className="font-mono text-xl font-extrabold text-[var(--color-text-primary)] mt-1">
                  {data.inherentImpact} / 5
                </div>
                <span className="text-[11px] font-semibold text-[var(--color-text-secondary)]">
                  {IMPACT_DEFINITIONS[data.inherentImpact].label}
                </span>
              </div>

              <div className="rounded-xl border-2 border-rose-500/40 bg-rose-50/20 dark:bg-rose-950/20 p-3.5 text-center">
                <span className="text-[10px] uppercase font-bold tracking-wider text-rose-700 dark:text-rose-400">
                  Gross Score
                </span>
                <div className="font-mono text-2xl font-black text-rose-600 dark:text-rose-300 mt-0.5">
                  {inherentScore}
                  <span className="text-xs text-[var(--color-text-muted)] font-normal font-sans ml-1">
                    / 25
                  </span>
                </div>
                <span className="text-[11px] font-bold uppercase text-rose-700 dark:text-rose-400">
                  {inherentSeverity}
                </span>
              </div>
            </div>

            {/* Rationale Textarea */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center justify-between">
                <span>Inherent Risk Rationale & Context *</span>
                <span className="text-[11px] text-[var(--color-text-muted)] font-normal lowercase">
                  Required for auditability
                </span>
              </label>
              <textarea
                rows={4}
                required
                value={data.inherentRationale}
                onChange={(e) => onChange({ inherentRationale: e.target.value })}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-xs text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 leading-relaxed"
                placeholder="Explain the technical and operational assumptions leading to this inherent score..."
              />
            </div>
          </div>

          {/* Right: 5x5 Matrix Position Highlight (5 cols) */}
          <div className="lg:col-span-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-secondary)]/30 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-label text-xs font-bold text-[var(--color-text-primary)]">
                Inherent Matrix Coordinate
              </span>
              <span className="font-mono text-xs font-bold text-rose-600">
                Cell [{data.inherentLikelihood}, {data.inherentImpact}]
              </span>
            </div>

            <Matrix5x5
              inherentLikelihood={data.inherentLikelihood}
              inherentImpact={data.inherentImpact}
              mode="inherent"
              size="sm"
            />
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4">
          <Button variant="secondary" size="md" onClick={onPrev} className="gap-2 font-semibold">
            <ArrowLeft className="size-4" />
            <span>Back to Details</span>
          </Button>

          <Button variant="primary" size="md" onClick={onNext} className="gap-2 font-semibold shadow-xs">
            <span>Continue to Control Effectiveness</span>
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
