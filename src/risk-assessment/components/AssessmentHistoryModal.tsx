import { useState } from 'react'
import { History, ArrowRight, X, ChevronRight } from 'lucide-react'
import { Button, Badge } from '@/components/ui'
import {
  HISTORICAL_ASSESSMENTS,
  calculateScore,
  type HistoricalAssessmentItem,
  type RiskAssessmentFormData,
} from '../risk-assessment-data'

interface AssessmentHistoryModalProps {
  open: boolean
  onClose: () => void
  currentData: RiskAssessmentFormData
}

export function AssessmentHistoryModal({
  open,
  onClose,
  currentData,
}: AssessmentHistoryModalProps) {
  const [selectedRecord, setSelectedRecord] = useState<HistoricalAssessmentItem>(
    HISTORICAL_ASSESSMENTS[0]
  )

  if (!open) return null

  const currentInherent = calculateScore(currentData.inherentLikelihood, currentData.inherentImpact)
  const currentResidual = calculateScore(currentData.residualLikelihood, currentData.residualImpact)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4 bg-[var(--color-surface-secondary)]/50 shrink-0">
          <div className="flex items-center gap-2">
            <History className="size-4 text-[var(--color-primary)]" />
            <div>
              <h3 className="font-h3 text-base font-bold text-[var(--color-text-primary)]">
                Assessment History & Longitudinal Comparison
              </h3>
              <p className="text-[11px] text-[var(--color-text-muted)] font-mono">
                {currentData.riskId} · {currentData.riskTitle}
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

        {/* Content Body: Two columns */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column: Historical List (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Historical Assessment Cycles
            </h4>

            <div className="space-y-2">
              {HISTORICAL_ASSESSMENTS.map((item) => {
                const isSelected = selectedRecord.id === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedRecord(item)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      isSelected
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)]/30 ring-1 ring-[var(--color-primary)] shadow-xs'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-secondary)]/70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[var(--color-text-primary)]">
                        {item.assessmentDate}
                      </span>
                      <Badge variant="success" size="sm">
                        {item.reviewStatus}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between mt-2 text-xs">
                      <span className="text-[var(--color-text-muted)]">Residual:</span>
                      <span className="font-mono font-bold text-[var(--color-text-primary)]">
                        {item.residualScore} / 25 ({item.residualSeverity})
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-1 text-[11px] text-[var(--color-text-muted)]">
                      <span>Assessor: {item.assessor}</span>
                      <ChevronRight className="size-3 text-[var(--color-text-muted)]" />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Column: Comparative Side-by-Side (7 cols) */}
          <div className="md:col-span-7 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Side-by-Side Assessment Delta
            </h4>

            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-secondary)]/30 p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-[var(--color-border)] text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-text-muted)]">
                    Previous: {selectedRecord.assessmentDate}
                  </span>
                  <div className="mt-1 font-semibold text-[var(--color-text-primary)]">
                    By {selectedRecord.assessor}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-primary)]">
                    Current Draft (In Progress)
                  </span>
                  <div className="mt-1 font-semibold text-[var(--color-text-primary)]">
                    By {currentData.owner}
                  </div>
                </div>
              </div>

              {/* Metric comparison rows */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-[var(--color-border)]/50">
                  <span className="text-[var(--color-text-muted)]">Inherent Score:</span>
                  <div className="flex items-center gap-3 font-mono font-bold">
                    <span className="text-rose-600">{selectedRecord.inherentScore} / 25</span>
                    <ArrowRight className="size-3 text-[var(--color-text-muted)]" />
                    <span className="text-rose-600">{currentInherent} / 25</span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-[var(--color-border)]/50">
                  <span className="text-[var(--color-text-muted)]">Residual Score:</span>
                  <div className="flex items-center gap-3 font-mono font-bold">
                    <span className="text-blue-600">{selectedRecord.residualScore} / 25</span>
                    <ArrowRight className="size-3 text-[var(--color-text-muted)]" />
                    <span className="text-blue-600">{currentResidual} / 25</span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-[var(--color-border)]/50">
                  <span className="text-[var(--color-text-muted)]">Net Exposure Delta:</span>
                  <span className="font-mono font-bold text-emerald-600">
                    {currentResidual - selectedRecord.residualScore < 0
                      ? `${currentResidual - selectedRecord.residualScore} points lower`
                      : currentResidual - selectedRecord.residualScore === 0
                      ? 'No variance (Identical)'
                      : `+${currentResidual - selectedRecord.residualScore} points higher`}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-[var(--color-border)]/50">
                  <span className="text-[var(--color-text-muted)]">Approver / Reviewer:</span>
                  <span className="font-medium">{selectedRecord.reviewer}</span>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-text-muted)]">
                    Previous Assessment Findings
                  </span>
                  <p className="mt-1 text-xs text-[var(--color-text-secondary)] leading-relaxed italic">
                    "{selectedRecord.notes}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-[var(--color-border)] px-6 py-3.5 bg-[var(--color-surface-secondary)]/30 shrink-0">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close History
          </Button>
        </div>
      </div>
    </div>
  )
}
