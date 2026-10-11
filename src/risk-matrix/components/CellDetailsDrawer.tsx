import { X, ArrowRight } from 'lucide-react'
import { Button, Badge, RiskSeverityBadge, Avatar, StatusBadge } from '@/components/ui'
import type { MatrixCellData, MatrixViewMode } from '../risk-matrix-data'

interface CellDetailsDrawerProps {
  open: boolean
  onClose: () => void
  cellData: MatrixCellData | null
  viewMode: MatrixViewMode
  onNavigateToRisk: (riskId: string) => void
}

export function CellDetailsDrawer({
  open,
  onClose,
  cellData,
  viewMode,
  onNavigateToRisk,
}: CellDetailsDrawerProps) {
  if (!open || !cellData) return null

  const { likelihood, impact, score, severity, risks, count } = cellData

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div
        className="w-full max-w-xl h-full bg-[var(--color-surface)] border-l border-[var(--color-border)] shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cell-drawer-title"
      >
        {/* ── Drawer Header ── */}
        <div className="p-6 border-b border-[var(--color-border)] bg-[var(--color-surface-secondary)]/40 shrink-0 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[var(--color-primary-subtle)] text-[var(--color-primary)]">
                Cell [{likelihood}, {impact}]
              </span>
              <RiskSeverityBadge severity={severity} size="sm" />
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] p-1 rounded-lg hover:bg-[var(--color-surface)]"
              aria-label="Close contextual drawer"
            >
              <X className="size-5" />
            </button>
          </div>

          <div>
            <h3 id="cell-drawer-title" className="font-h3 text-lg font-bold text-[var(--color-text-primary)]">
              Likelihood {likelihood} × Impact {impact}
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
              Score: <strong className="font-mono text-[var(--color-text-primary)]">{score} / 25</strong> ({severity.toUpperCase()}) · Showing{' '}
              <strong className="font-mono text-[var(--color-primary)]">{count}</strong> risks in {viewMode} exposure
            </p>
          </div>
        </div>

        {/* ── Drawer Scrollable Body: Risks List ── */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3.5">
          {risks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[var(--color-border)] p-8 text-center text-xs text-[var(--color-text-muted)]">
              No risks currently match the active filters at this matrix coordinate.
            </div>
          ) : (
            risks.map((risk) => {
              const currentScore = viewMode === 'inherent' ? risk.inherentScore : risk.residualScore
              const currentSev = viewMode === 'inherent' ? risk.inherentSeverity : risk.residualSeverity

              return (
                <div
                  key={risk.id}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs space-y-3 hover:border-[var(--color-primary)]/40 transition-all group"
                >
                  {/* Top row: ID, Badges, Navigation CTA */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onNavigateToRisk(risk.id)}
                          className="font-mono text-xs font-bold text-[var(--color-primary)] hover:underline"
                        >
                          {risk.id}
                        </button>
                        <Badge variant="neutral" size="sm">
                          {risk.category}
                        </Badge>
                        <span className="text-[11px] font-semibold text-[var(--color-text-secondary)]">
                          {risk.department}
                        </span>
                      </div>

                      <h4
                        onClick={() => onNavigateToRisk(risk.id)}
                        className="font-label text-sm font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors cursor-pointer leading-snug"
                      >
                        {risk.title}
                      </h4>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <div className="flex items-center gap-1 font-mono text-xs font-bold">
                        <span className="text-sm font-extrabold text-[var(--color-text-primary)]">
                          {currentScore}
                        </span>
                        <span className="text-[10px] text-[var(--color-text-muted)]">/ 25</span>
                      </div>
                      <RiskSeverityBadge severity={currentSev} size="sm" />
                    </div>
                  </div>

                  <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
                    {risk.description}
                  </p>

                  {/* Owner and Governance Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--color-border)] text-xs">
                    <div className="flex items-center gap-2">
                      <Avatar name={risk.owner} size="sm" />
                      <div>
                        <p className="font-semibold text-[11px] text-[var(--color-text-primary)]">
                          {risk.owner}
                        </p>
                        <p className="text-[10px] text-[var(--color-text-muted)]">
                          {risk.ownerRole}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <StatusBadge status={risk.status} size="sm" />
                      <Badge
                        variant={risk.appetiteStatus === 'breached' ? 'error' : risk.appetiteStatus === 'near_threshold' ? 'warning' : 'success'}
                        size="sm"
                      >
                        {risk.appetiteStatus === 'breached' ? 'Above Appetite' : 'Within Appetite'}
                      </Badge>
                    </div>
                  </div>

                  {/* Open details action link */}
                  <div className="pt-1 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onNavigateToRisk(risk.id)}
                      className="h-7 text-xs text-[var(--color-primary)] gap-1 px-2"
                    >
                      <span>Open Risk Details</span>
                      <ArrowRight className="size-3" />
                    </Button>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* ── Drawer Footer ── */}
        <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-surface-secondary)]/30 shrink-0 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onClose} className="text-xs text-[var(--color-text-muted)]">
            Clear Cell Selection
          </Button>

          <Button variant="secondary" size="sm" onClick={onClose} className="text-xs font-semibold">
            Close Panel
          </Button>
        </div>
      </div>
    </div>
  )
}
