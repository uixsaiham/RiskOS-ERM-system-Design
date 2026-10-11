import {
  FileText,
  AlertTriangle,
  Flame,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plus,
  Edit2,
  Scale,
  Building,
  History,
  ShieldAlert,
  Server,
  Layers,
  Activity,
  SlidersHorizontal,
  ExternalLink,
} from 'lucide-react'
import { Button, Badge, RiskSeverityBadge, Avatar } from '@/components/ui'
import type { ComprehensiveRiskDetail, MitigationPlanItem } from '../risk-details-data'

interface RiskOverviewTabProps {
  detail: ComprehensiveRiskDetail
  onNavigateToTab: (tab: 'overview' | 'assessment' | 'controls' | 'actions' | 'history') => void
  onOpenEditOverview: () => void
  onOpenAddControl: () => void
  onOpenAddMitigation: () => void
  onOpenEditTreatment: () => void
  onUpdateActionProgress: (action: MitigationPlanItem) => void
  onNavigateToRisk?: (riskId: string) => void
}

export function RiskOverviewTab({
  detail,
  onNavigateToTab,
  onOpenEditOverview,
  onOpenAddControl,
  onOpenAddMitigation,
  onOpenEditTreatment,
  onUpdateActionProgress,
  onNavigateToRisk,
}: RiskOverviewTabProps) {
  const {
    base,
    overviewDetails,
    assessmentSummary,
    appetiteDetails,
    associatedControls,
    mitigationPlans,
    treatmentStrategy,
    assessmentHistory,
    activityTimeline,
    relatedRecords,
  } = detail

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* ══════════════════════════════════════════════════════════════════
          MAIN COLUMN (Left — 8 cols on desktop)
          ══════════════════════════════════════════════════════════════════ */}
      <div className="lg:col-span-8 space-y-6">
        {/* ── 1. Risk Overview (Section 5) ── */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4 hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="size-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-slate-900">
                Risk Overview
              </h3>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={onOpenEditOverview}
              className="gap-1.5 h-7 text-xs font-medium border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs"
            >
              <Edit2 className="size-3 text-slate-500" />
              <span>Edit</span>
            </Button>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-500">
              Description
            </span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {overviewDetails.description}
            </p>
          </div>

          {/* Potential Causes & Business Impact Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* Potential Causes */}
            <div className="rounded-xl border border-amber-200/80 bg-amber-50/20 p-4 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800">
                <AlertTriangle className="size-3.5 text-amber-600" />
                <span>Potential Causes</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {overviewDetails.causes.map((cause, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold select-none">•</span>
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Consequences */}
            <div className="rounded-xl border border-rose-200/80 bg-rose-50/20 p-4 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-800">
                <Flame className="size-3.5 text-rose-600" />
                <span>Business Consequences</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {overviewDetails.businessImpacts.map((impact, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-bold select-none">•</span>
                    <span>{impact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Affected Business Units, Related Systems, Risk Source */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-100 pt-3.5 text-xs">
            <div>
              <span className="text-xs text-slate-400 font-medium block mb-1.5">
                Affected Business Units
              </span>
              <div className="flex flex-wrap gap-1">
                {overviewDetails.affectedUnits.map((unit, i) => (
                  <Badge key={i} variant="neutral" size="sm">
                    {unit}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-medium block mb-1.5">
                Related Systems
              </span>
              <div className="flex flex-wrap gap-1">
                {overviewDetails.relatedSystems.map((sys, i) => (
                  <Badge key={i} variant="neutral" size="sm" className="gap-1">
                    <Server className="size-2.5 text-slate-400" />
                    <span>{sys}</span>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-medium block mb-1.5">
                Risk Sources
              </span>
              <ul className="space-y-0.5 text-xs text-slate-600">
                {overviewDetails.riskSources.map((src, i) => (
                  <li key={i} className="truncate" title={src}>
                    • {src}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── 2. Risk Assessment Summary (Section 6) ── */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4 hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="size-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-slate-900">
                Risk Assessment Summary
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigateToTab('assessment')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
            >
              <span>View Assessment Details</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-3 space-y-1">
              <span className="text-xs font-medium text-slate-500">
                Likelihood Rating
              </span>
              <div className="font-mono text-xs font-semibold text-slate-900">
                {assessmentSummary.likelihoodLabel}
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-3 space-y-1">
              <span className="text-xs font-medium text-slate-500">
                Impact Rating
              </span>
              <div className="font-mono text-xs font-semibold text-slate-900">
                {assessmentSummary.impactLabel}
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-3 space-y-1">
              <span className="text-xs font-medium text-slate-500">
                Inherent Score
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-sm font-bold text-slate-900">
                  {assessmentSummary.inherentScore} / 25
                </span>
                <RiskSeverityBadge severity="critical" size="sm" />
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-3 space-y-1">
              <span className="text-xs font-medium text-slate-500">
                Residual Score
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-sm font-bold text-slate-900">
                  {assessmentSummary.residualScore} / 25
                </span>
                <RiskSeverityBadge severity="high" size="sm" />
              </div>
            </div>
          </div>

          {/* Weighted model explanation note */}
          <div className="rounded-xl bg-blue-50/50 border border-blue-200/60 p-3.5 text-xs space-y-1 text-slate-700">
            <div className="flex items-center gap-1.5 font-semibold text-blue-800">
              <Activity className="size-3.5 text-blue-600" />
              <span>Assessment Methodology & Weighted Model</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {assessmentSummary.methodologyNote} Stored score represents assessed severity of 22/25 (Critical). Last assessed by <strong className="text-slate-800">{assessmentSummary.assessor}</strong> on <strong className="text-slate-800">{assessmentSummary.assessmentDate}</strong>.
            </p>
          </div>
        </div>

        {/* ── 3. Associated Controls (Section 8) ── */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4 hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-slate-900">
                Associated Controls ({associatedControls.length})
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={onOpenAddControl}
                className="gap-1.5 h-7 text-xs font-medium border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs"
              >
                <Plus className="size-3" />
                <span>Add Control</span>
              </Button>
              <button
                type="button"
                onClick={() => onNavigateToTab('controls')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline ml-2"
              >
                <span>View All Controls</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {associatedControls.map((ctl) => (
              <div key={ctl.id} className="py-3.5 first:pt-0 last:pb-0 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-blue-600">{ctl.id}</span>
                    <h4 className="font-medium text-slate-900">{ctl.name}</h4>
                  </div>
                  <p className="text-xs text-slate-400">
                    Owner: {ctl.owner} · Last tested: {ctl.lastTested}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                      ctl.effectiveness === 'Effective'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70'
                        : 'bg-amber-50 text-amber-700 border-amber-200/70'
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${
                        ctl.effectiveness === 'Effective' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    />
                    {ctl.effectiveness}
                  </span>
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${
                      ctl.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70'
                        : 'bg-amber-50 text-amber-700 border-amber-200/70'
                    }`}
                  >
                    {ctl.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4. Mitigation Action Plans (Section 9) ── */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4 hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-slate-900">
                Mitigation & Action Plans ({mitigationPlans.length})
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={onOpenAddMitigation}
                className="gap-1.5 h-7 text-xs font-medium border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs"
              >
                <Plus className="size-3" />
                <span>Add Action</span>
              </Button>
              <button
                type="button"
                onClick={() => onNavigateToTab('actions')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline ml-2"
              >
                <span>View All Actions</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {mitigationPlans.map((action) => {
              const isOverdue = action.status === 'Overdue'
              return (
                <div
                  key={action.id}
                  className={`rounded-xl border p-4 space-y-2.5 bg-white shadow-2xs transition-all ${
                    isOverdue
                      ? 'border-rose-200 bg-rose-50/15'
                      : 'border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-blue-600">
                        {action.id}
                      </span>
                      <h4 className="text-xs font-semibold text-slate-900">
                        {action.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${
                          isOverdue
                            ? 'bg-rose-50 text-rose-700 border-rose-200/70'
                            : action.status === 'In Progress'
                            ? 'bg-blue-50 text-blue-700 border-blue-200/70'
                            : 'bg-slate-100 text-slate-700 border-slate-200/60'
                        }`}
                      >
                        {action.status}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onUpdateActionProgress(action)}
                        className="h-6 text-[11px] px-2 text-blue-600 font-medium"
                      >
                        Update Progress
                      </Button>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs text-slate-500">
                      <span>Owner: {action.owner} · Due: {action.dueDate}</span>
                      <span className="font-mono font-semibold text-slate-900">
                        {action.progressPercent}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isOverdue ? 'bg-rose-500' : 'bg-blue-600'
                        }`}
                        style={{ width: `${action.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── 5. Risk Treatment Strategy (Section 10) ── */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3.5 hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="size-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-slate-900">
                Risk Treatment Strategy
              </h3>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={onOpenEditTreatment}
              className="gap-1.5 h-7 text-xs font-medium border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs"
            >
              <Edit2 className="size-3 text-slate-500" />
              <span>Edit Treatment Strategy</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-3 space-y-1">
              <span className="text-xs font-medium text-slate-500">
                Selected Strategy
              </span>
              <div className="font-semibold text-xs text-blue-600">
                {treatmentStrategy.strategy}
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-3 space-y-1">
              <span className="text-xs font-medium text-slate-500">
                Target Residual Score
              </span>
              <div className="font-semibold text-xs text-emerald-600 font-mono">
                {treatmentStrategy.targetResidual}
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-3 space-y-1">
              <span className="text-xs font-medium text-slate-500">
                Target Completion Date
              </span>
              <div className="font-medium text-xs text-slate-800">
                {treatmentStrategy.targetCompletionDate}
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-50/70 p-3 rounded-lg border border-slate-200/60">
            "{treatmentStrategy.rationale}"
          </p>
        </div>

        {/* ── 6. Risk Assessment History (Section 11) ── */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3.5 hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <History className="size-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-slate-900">
                Risk Assessment History
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigateToTab('history')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
            >
              <span>View Full Assessment History</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200/70 bg-slate-50/75 text-slate-500 font-semibold text-[11px]">
                  <th className="py-2.5 pr-4">Assessment Date</th>
                  <th className="py-2.5 px-4 text-right">Inherent Score</th>
                  <th className="py-2.5 px-4 text-right">Residual Score</th>
                  <th className="py-2.5 px-4">Assessor</th>
                  <th className="py-2.5 pl-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {assessmentHistory.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 pr-4 font-medium text-slate-900">
                      {rec.date}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-semibold text-rose-600">
                      {rec.inherentScore} / 25
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-semibold text-amber-600">
                      {rec.residualScore} / 25
                    </td>
                    <td className="py-2.5 px-4 text-slate-600">
                      {rec.assessor}
                    </td>
                    <td className="py-2.5 pl-4 text-right">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                        {rec.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECONDARY COLUMN (Right — 4 cols on desktop)
          ══════════════════════════════════════════════════════════════════ */}
      <div className="lg:col-span-4 space-y-6">
        {/* ── 1. Risk Appetite & Tolerance (Section 7) ── */}
        <div className="rounded-xl border border-rose-200/80 bg-white p-5 shadow-xs space-y-3.5 hover:border-rose-300 transition-all">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Scale className="size-4 text-rose-600" />
              <h3 className="text-sm font-semibold text-slate-900">
                Risk Appetite & Tolerance
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200/70">
              <span className="size-1.5 rounded-full bg-rose-500" />
              Above Appetite
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-slate-500 font-medium">Approved Threshold:</span>
              <span className="font-mono font-semibold text-slate-900">
                {appetiteDetails.approvedThreshold} / 25
              </span>
            </div>

            <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-slate-500 font-medium">Current Residual:</span>
              <span className="font-mono font-semibold text-rose-600">
                {appetiteDetails.currentResidualScore} / 25
              </span>
            </div>

            <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-slate-500 font-medium">Threshold Variance:</span>
              <span className="font-mono font-bold text-rose-600">
                +{appetiteDetails.variancePoints} points
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-rose-50/70 border border-rose-200/80 p-3 text-xs text-rose-900 space-y-1">
            <span className="font-semibold block">Mandatory Required Response:</span>
            <p className="text-xs text-rose-800 leading-relaxed">
              "{appetiteDetails.requiredResponse}"
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigateToTab('assessment')}
            className="w-full text-center text-xs font-semibold text-blue-600 hover:underline pt-1 block"
          >
            View Appetite Details &rarr;
          </button>
        </div>

        {/* ── 2. Governance & Ownership ── */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3.5 hover:border-slate-300 transition-all">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
            <Building className="size-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-slate-900">
              Governance & Review SLA
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2.5">
              <Avatar name={base.owner} size="sm" />
              <div>
                <p className="font-semibold text-slate-900">{base.owner}</p>
                <p className="text-xs text-slate-400">{base.ownerRole}</p>
              </div>
            </div>

            <div className="space-y-2 border-t border-slate-100 pt-3">
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-slate-400">Department:</span>
                <span className="font-medium text-slate-800">{base.department}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-slate-400">Created Date:</span>
                <span className="font-medium text-slate-800">{base.createdDate}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-slate-400">Next Review SLA:</span>
                <span className="font-medium text-slate-800">{base.nextReviewDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. Recent Activity (Section 12) ── */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3.5 hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-slate-900">
                Recent Activity
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigateToTab('history')}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Full Audit Log
            </button>
          </div>

          <div className="space-y-3">
            {activityTimeline.map((item) => (
              <div key={item.id} className="text-xs space-y-0.5 border-l-2 border-slate-200 pl-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-medium text-slate-800">{item.date}</span>
                  <span className="capitalize">{item.type}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.title}
                </p>
                <p className="text-[11px] text-slate-400">By: {item.user}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4. Related Records (Section 13) ── */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3.5 hover:border-slate-300 transition-all">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
            <ShieldAlert className="size-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-slate-900">
              Related Information
            </h3>
          </div>

          {/* Related Risks */}
          <div className="space-y-2">
            <span className="text-xs font-medium text-slate-500 block">
              Related Enterprise Risks
            </span>
            <div className="space-y-1.5">
              {relatedRecords.relatedRisks.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onNavigateToRisk?.(rel.id)}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white hover:border-blue-400 cursor-pointer transition-colors text-xs shadow-2xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 font-mono font-semibold text-blue-600">
                      <span>{rel.id}</span>
                      <ExternalLink className="size-3" />
                    </div>
                    <p className="font-medium text-slate-800">{rel.title}</p>
                  </div>
                  <RiskSeverityBadge severity={rel.severity} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Associated Incidents */}
          {relatedRecords.associatedIncidents.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-medium text-slate-500 block">
                Associated Incidents
              </span>
              {relatedRecords.associatedIncidents.map((inc) => (
                <div key={inc.id} className="p-2.5 rounded-xl border border-slate-200 bg-white text-xs space-y-1 shadow-2xs">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-semibold text-blue-600">{inc.id}</span>
                    <Badge variant="warning" size="sm">{inc.severity}</Badge>
                  </div>
                  <p className="text-slate-800 font-medium">{inc.title}</p>
                  <p className="text-[11px] text-slate-400">{inc.date} · {inc.status}</p>
                </div>
              ))}
            </div>
          )}

          {/* Compliance Requirements */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <span className="text-xs font-medium text-slate-500 block">
              Compliance Requirements
            </span>
            <ul className="space-y-1 text-xs text-slate-600">
              {relatedRecords.complianceRequirements.map((req, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-blue-600" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
