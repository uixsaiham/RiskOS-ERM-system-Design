import { useState } from 'react'
import {
  X,
  Edit2,
  Link2,
  Archive,
  ShieldCheck,
  AlertTriangle,
  ShieldAlert,
  ArrowUpRight,
  Calendar,
  FileText,
  Clock,
  CheckCircle2,
} from 'lucide-react'
import { Button, Avatar, RiskSeverityBadge } from '@/components/ui'
import { ENTERPRISE_RISK_REGISTER } from '@/risk-register'
import type { ControlItem, ControlEffectiveness } from '../controls-data'

interface ControlDetailsDrawerProps {
  control: ControlItem | null
  open: boolean
  onClose: () => void
  onEditControl: (control: ControlItem) => void
  onLinkRisk: (control: ControlItem) => void
  onArchiveControl: (control: ControlItem) => void
  onNavigateToRisk: (riskId: string) => void
}

export function ControlDetailsDrawer({
  control,
  open,
  onClose,
  onEditControl,
  onLinkRisk,
  onArchiveControl,
  onNavigateToRisk,
}: ControlDetailsDrawerProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'risks' | 'lifecycle' | 'docs' | 'history'>('overview')

  if (!open || !control) return null

  // Lookup linked risk records from the central risk register
  const linkedRisks = ENTERPRISE_RISK_REGISTER.filter((r) =>
    control.linkedRiskIds.includes(r.id)
  )

  const renderEffectivenessBadge = (eff: ControlEffectiveness) => {
    switch (eff) {
      case 'Effective':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200">
            <ShieldCheck className="size-3.5 text-emerald-600" />
            Effective
          </span>
        )
      case 'Needs Improvement':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200">
            <AlertTriangle className="size-3.5 text-amber-600" />
            Needs Improvement
          </span>
        )
      case 'Ineffective':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200">
            <ShieldAlert className="size-3.5 text-rose-600" />
            Ineffective
          </span>
        )
      case 'Not Tested':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <Clock className="size-3.5 text-slate-500" />
            Not Tested
          </span>
        )
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div
        className="w-full max-w-2xl h-full bg-[var(--color-surface)] border-l border-[var(--color-border)] shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="control-details-title"
      >
        {/* ── 1. Drawer Header ── */}
        <div className="p-6 border-b border-[var(--color-border)] bg-[var(--color-surface-secondary)]/30 shrink-0 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[var(--color-primary-subtle)] text-[var(--color-primary)]">
                {control.id}
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200">
                {control.type} Control
              </span>
              {renderEffectivenessBadge(control.effectiveness)}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] p-1 rounded-lg hover:bg-[var(--color-surface)] cursor-pointer"
              aria-label="Close drawer"
            >
              <X className="size-5" />
            </button>
          </div>

          <div>
            <h2 id="control-details-title" className="font-h2 text-xl font-bold text-[var(--color-text-primary)]">
              {control.name}
            </h2>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1 flex items-center gap-2">
              <span>{control.category}</span>
              <span>•</span>
              <span>{control.department} Department</span>
              {control.framework && (
                <>
                  <span>•</span>
                  <span className="font-mono font-medium">{control.framework}</span>
                </>
              )}
            </p>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-1 pt-2 border-t border-[var(--color-border)] text-xs overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === 'overview'
                  ? 'bg-[var(--color-primary)] text-white shadow-xs font-bold'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'
              }`}
            >
              Overview
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('risks')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === 'risks'
                  ? 'bg-[var(--color-primary)] text-white shadow-xs font-bold'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'
              }`}
            >
              Linked Risks ({linkedRisks.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('lifecycle')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === 'lifecycle'
                  ? 'bg-[var(--color-primary)] text-white shadow-xs font-bold'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'
              }`}
            >
              Lifecycle & Reviews
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('docs')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === 'docs'
                  ? 'bg-[var(--color-primary)] text-white shadow-xs font-bold'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'
              }`}
            >
              Documentation
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === 'history'
                  ? 'bg-[var(--color-primary)] text-white shadow-xs font-bold'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'
              }`}
            >
              Activity History
            </button>
          </div>
        </div>

        {/* ── 2. Scrollable Body Content ── */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Description */}
              <div className="space-y-1.5">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px]">
                  Control Description
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm bg-slate-50 dark:bg-slate-900/40 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  {control.description}
                </p>
              </div>

              {/* Objective */}
              {control.objective && (
                <div className="space-y-1.5">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px]">
                    Control Objective
                  </h3>
                  <div className="p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 text-blue-900 dark:text-blue-200 text-xs leading-relaxed">
                    {control.objective}
                  </div>
                </div>
              )}

              {/* Key Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
                    Execution Frequency
                  </span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-xs mt-1 block">
                    {control.frequency}
                  </span>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
                    Control Method
                  </span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-xs mt-1 block">
                    {control.method}
                  </span>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
                    Implementation Status
                  </span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-xs mt-1 block">
                    {control.implementationStatus}
                  </span>
                </div>
              </div>

              {/* Ownership & Accountability */}
              <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px]">
                  Ownership & Accountability
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                    <Avatar name={control.owner} size="md" />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                        {control.owner}
                      </div>
                      <div className="text-[11px] text-slate-500">{control.ownerRole}</div>
                      <div className="text-[10px] text-blue-600 font-mono mt-0.5">
                        {control.ownerEmail}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 font-medium uppercase">
                      Department & Team
                    </span>
                    <div className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                      {control.department} Department
                    </div>
                    {control.supportingTeam && (
                      <div className="text-[11px] text-slate-500">
                        Supporting: {control.supportingTeam}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LINKED RISKS */}
          {activeTab === 'risks' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                    Organizational Risks Mitigated
                  </h3>
                  <p className="text-slate-500 text-xs mt-0.5">
                    This control is deployed to reduce exposure for {linkedRisks.length} registered risks.
                  </p>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onLinkRisk(control)}
                  className="gap-1 text-xs"
                >
                  <Link2 className="size-3.5" />
                  <span>Link Risk</span>
                </Button>
              </div>

              {linkedRisks.length === 0 ? (
                <div className="p-8 text-center rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-400">
                  No risks currently linked to this control.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {linkedRisks.map((risk) => (
                    <div
                      key={risk.id}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-blue-400 transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-blue-600">
                            {risk.id}
                          </span>
                          <span className="text-[11px] font-medium text-slate-500">
                            {risk.department} • {risk.category}
                          </span>
                        </div>

                        <div className="font-semibold text-slate-900 dark:text-slate-100 text-xs truncate max-w-md">
                          {risk.title}
                        </div>

                        <div className="text-[11px] text-slate-500">
                          Owner: <strong className="text-slate-700 dark:text-slate-300">{risk.owner}</strong>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <div className="text-[10px] text-slate-400 font-medium uppercase">
                            Residual Risk
                          </div>
                          <RiskSeverityBadge severity={risk.residualSeverity} size="sm" />
                        </div>

                        <button
                          type="button"
                          onClick={() => onNavigateToRisk(risk.id)}
                          className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 cursor-pointer"
                          title="Open Risk Details"
                        >
                          <ArrowUpRight className="size-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: LIFECYCLE & REVIEWS */}
          {activeTab === 'lifecycle' && (
            <div className="space-y-5">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                Control Lifecycle Milestones
              </h3>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                    <Calendar className="size-3.5 text-slate-400" />
                    <span>Control Created</span>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {control.createdDate}
                  </div>
                  <p className="text-[10px] text-slate-400">Baseline registered</p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                    <CheckCircle2 className="size-3.5 text-emerald-500" />
                    <span>Implementation Date</span>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {control.implementationDate}
                  </div>
                  <p className="text-[10px] text-slate-400">Commissioned into production</p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                    <Clock className="size-3.5 text-blue-500" />
                    <span>Last Reviewed</span>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {control.lastReviewed}
                  </div>
                  <p className="text-[10px] text-slate-400">Attestation confirmed</p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                    <Calendar className="size-3.5 text-amber-500" />
                    <span>Next Review SLA</span>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {control.nextReviewDate}
                  </div>
                  <p className="text-[10px] text-slate-400">Scheduled effectiveness test</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/40 bg-blue-50/40 dark:bg-blue-950/20 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300">
                  Last Effectiveness Assessment
                </span>
                <p className="text-xs text-blue-800 dark:text-blue-200 font-medium">
                  Assessed: {control.lastEffectivenessAssessment} · Outcome:{' '}
                  <strong className="font-bold">{control.effectiveness}</strong>
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: DOCUMENTATION */}
          {activeTab === 'docs' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                  Procedure & Governance References
                </h3>
                <p className="text-slate-500 text-xs">
                  Standard Operating Procedures and evidentiary requirements for testing.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 space-y-1">
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-blue-600">
                  <FileText className="size-3.5" />
                  <span>{control.procedureReference}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-xs pt-1">
                  Primary standard operating procedure governing the execution and validation of this control.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wider">
                  Evidence Requirements
                </h4>
                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900/50">
                  {control.evidenceRequirements}
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wider">
                  Operational Instructions
                </h4>
                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900/50">
                  {control.instructions}
                </div>
              </div>

              {control.notes && (
                <div className="space-y-1.5">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wider">
                    Additional Notes
                  </h4>
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-500 italic bg-white dark:bg-slate-900/50">
                    {control.notes}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                Activity & Audit History
              </h3>

              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                {control.activityHistory.map((item) => (
                  <div key={item.id} className="relative space-y-0.5">
                    <span className="absolute -left-6 top-1 size-2 rounded-full bg-blue-600 ring-4 ring-white dark:ring-slate-950" />
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        {item.action}
                      </span>
                      <span className="text-slate-400 font-mono">{item.date}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-xs">{item.details}</p>
                    <p className="text-[10px] text-slate-400">By {item.user}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── 3. Drawer Actions Footer ── */}
        <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-surface-secondary)]/30 shrink-0 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onArchiveControl(control)}
              className="gap-1.5 text-xs"
            >
              <Archive className="size-3.5" />
              <span>Archive</span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onLinkRisk(control)}
              className="gap-1.5 text-xs font-semibold"
            >
              <Link2 className="size-3.5" />
              <span>Link Risk</span>
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => onEditControl(control)}
              className="gap-1.5 text-xs font-bold"
            >
              <Edit2 className="size-3.5" />
              <span>Edit Control</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
