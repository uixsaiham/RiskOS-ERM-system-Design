import { useState, useMemo } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { Button, RiskSeverityBadge, Badge } from '@/components/ui'
import type { ComprehensiveRiskDetail } from '../risk-details-data'
import type { RiskSeverity } from '@/risk-register'

interface ReassessRiskModalProps {
  open: boolean
  onClose: () => void
  detail: ComprehensiveRiskDetail
  onSaveReassessment: (data: {
    inherentLikelihood: number
    inherentImpact: number
    residualLikelihood: number
    residualImpact: number
    notes: string
  }) => void
}

function calculateSeverity(score: number): RiskSeverity {
  if (score >= 16) return 'critical'
  if (score >= 10) return 'high'
  if (score >= 5) return 'moderate'
  return 'low'
}

const LIKELIHOOD_DESCRIPTIONS: Record<number, string> = {
  1: 'Rare (< 5% probability / once every 5+ years)',
  2: 'Unlikely (5–20% probability / once every 2–5 years)',
  3: 'Possible (20–50% probability / once every 1–2 years)',
  4: 'Likely (50–80% probability / multiple times per year)',
  5: 'Almost Certain (> 80% probability / monthly or continuous)',
}

const IMPACT_DESCRIPTIONS: Record<number, string> = {
  1: 'Negligible (< $50K loss, no regulatory breach)',
  2: 'Minor ($50K–$250K loss, internal disruption only)',
  3: 'Moderate ($250K–$1M loss, localized downtime)',
  4: 'Major ($1M–$5M loss, customer impact, reporting required)',
  5: 'Catastrophic (> $5M loss, systemic failure, regulatory sanctions)',
}

export function ReassessRiskModal({
  open,
  onClose,
  detail,
  onSaveReassessment,
}: ReassessRiskModalProps) {
  const { base } = detail

  const [inherentL, setInherentL] = useState<number>(base.inherentLikelihood)
  const [inherentI, setInherentI] = useState<number>(base.inherentImpact)
  const [residualL, setResidualL] = useState<number>(base.residualLikelihood)
  const [residualI, setResidualI] = useState<number>(base.residualImpact)
  const [notes, setNotes] = useState<string>('')
  const [attested, setAttested] = useState<boolean>(false)

  const inherentScore = inherentL * inherentI
  const inherentSeverity = useMemo(() => calculateSeverity(inherentScore), [inherentScore])

  const residualScore = residualL * residualI
  const residualSeverity = useMemo(() => calculateSeverity(residualScore), [residualScore])

  const targetScore = 12
  const isBreached = residualScore > targetScore

  if (!open) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!notes.trim()) {
      alert('Please provide a brief justification or note for this reassessment.')
      return
    }
    onSaveReassessment({
      inherentLikelihood: inherentL,
      inherentImpact: inherentI,
      residualLikelihood: residualL,
      residualImpact: residualI,
      notes,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-2xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4 bg-[var(--color-surface-secondary)]/50">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[var(--color-primary-subtle)] text-[var(--color-primary)]">
              <SlidersHorizontal className="size-4" />
            </div>
            <div>
              <h2 className="font-h2 text-base font-bold text-[var(--color-text-primary)]">
                Reassess Risk Exposure: {base.id}
              </h2>
              <p className="text-xs text-[var(--color-text-muted)]">
                Recalculate likelihood & impact metrics based on recent control testing evidence.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Live Preview Strip */}
          <div className="grid grid-cols-2 gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-secondary)]/40 p-4">
            {/* Inherent Preview */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Inherent Rating Preview
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-2xl font-bold text-[var(--color-text-primary)]">
                  {inherentScore}
                </span>
                <RiskSeverityBadge severity={inherentSeverity} size="sm" />
                <span className="text-xs text-[var(--color-text-muted)]">
                  (L{inherentL} × I{inherentI})
                </span>
              </div>
            </div>

            {/* Residual Preview */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-primary)]">
                Residual Rating Preview
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-2xl font-bold text-[var(--color-text-primary)]">
                  {residualScore}
                </span>
                <RiskSeverityBadge severity={residualSeverity} size="sm" />
                {isBreached ? (
                  <Badge variant="error" size="sm">Above Appetite</Badge>
                ) : (
                  <Badge variant="success" size="sm">Within Appetite</Badge>
                )}
              </div>
            </div>
          </div>

          {/* Section: Inherent Rating Adjustment */}
          <div className="space-y-3">
            <h3 className="font-h3 text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              1. Inherent Risk (Unmitigated Baseline)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Inherent Likelihood */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-medium text-[var(--color-text-primary)]">
                    Inherent Likelihood (1–5)
                  </label>
                  <span className="font-mono font-bold text-[var(--color-primary)]">
                    Level {inherentL}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={inherentL}
                  onChange={(e) => setInherentL(Number(e.target.value))}
                  className="w-full accent-[var(--color-primary)] cursor-pointer"
                />
                <p className="text-[11px] text-[var(--color-text-muted)] line-clamp-1">
                  {LIKELIHOOD_DESCRIPTIONS[inherentL]}
                </p>
              </div>

              {/* Inherent Impact */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-medium text-[var(--color-text-primary)]">
                    Inherent Impact (1–5)
                  </label>
                  <span className="font-mono font-bold text-[var(--color-primary)]">
                    Level {inherentI}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={inherentI}
                  onChange={(e) => setInherentI(Number(e.target.value))}
                  className="w-full accent-[var(--color-primary)] cursor-pointer"
                />
                <p className="text-[11px] text-[var(--color-text-muted)] line-clamp-1">
                  {IMPACT_DESCRIPTIONS[inherentI]}
                </p>
              </div>
            </div>
          </div>

          {/* Section: Residual Rating Adjustment */}
          <div className="space-y-3">
            <h3 className="font-h3 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
              2. Residual Risk (Current Mitigated Exposure)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Residual Likelihood */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-medium text-[var(--color-text-primary)]">
                    Residual Likelihood (1–5)
                  </label>
                  <span className="font-mono font-bold text-[var(--color-primary)]">
                    Level {residualL}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={residualL}
                  onChange={(e) => setResidualL(Number(e.target.value))}
                  className="w-full accent-[var(--color-primary)] cursor-pointer"
                />
                <p className="text-[11px] text-[var(--color-text-muted)] line-clamp-1">
                  {LIKELIHOOD_DESCRIPTIONS[residualL]}
                </p>
              </div>

              {/* Residual Impact */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-medium text-[var(--color-text-primary)]">
                    Residual Impact (1–5)
                  </label>
                  <span className="font-mono font-bold text-[var(--color-primary)]">
                    Level {residualI}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={residualI}
                  onChange={(e) => setResidualI(Number(e.target.value))}
                  className="w-full accent-[var(--color-primary)] cursor-pointer"
                />
                <p className="text-[11px] text-[var(--color-text-muted)] line-clamp-1">
                  {IMPACT_DESCRIPTIONS[residualI]}
                </p>
              </div>
            </div>
          </div>

          {/* Rationale / Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--color-text-primary)]">
              Reassessment Justification & Evidence Reference *
            </label>
            <textarea
              required
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Q4 eBPF micro-segmentation testing confirmed reduction in East-West lateral movement likelihood from Level 5 to Level 4..."
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-xs text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          {/* Attestation Checkbox */}
          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="attest"
              checked={attested}
              onChange={(e) => setAttested(e.target.checked)}
              className="mt-0.5 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
            />
            <label htmlFor="attest" className="text-xs text-[var(--color-text-secondary)] select-none">
              I certify that this assessment adheres to enterprise risk appetite criteria and is supported by audit-ready operational evidence.
            </label>
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-[var(--color-border)] pt-4">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={!attested}>
              Commit Reassessment
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
