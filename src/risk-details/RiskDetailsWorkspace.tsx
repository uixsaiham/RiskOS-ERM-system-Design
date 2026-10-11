import { useState, useMemo } from 'react'
import {
  FileText,
  SlidersHorizontal,
  ShieldCheck,
  ListTodo,
  History,
  CheckCircle2,
} from 'lucide-react'
import { ENTERPRISE_RISK_REGISTER, type RiskSeverity, type RegisterRiskStatus } from '@/risk-register'
import {
  getComprehensiveRiskDetail,
  type ComprehensiveRiskDetail,
  type AssociatedControlItem,
  type MitigationPlanItem,
  type TreatmentStrategyDetails,
  type AssessmentHistoryRecord,
  type ActivityTimelineItem,
} from './risk-details-data'

import { RiskDetailsHeader } from './components/RiskDetailsHeader'
import { RiskSummaryPanel } from './components/RiskSummaryPanel'
import { RiskOverviewTab } from './components/RiskOverviewTab'
import { RiskAssessmentTab } from './components/RiskAssessmentTab'
import { RiskControlsTab } from './components/RiskControlsTab'
import { RiskMitigationTab } from './components/RiskMitigationTab'
import { RiskHistoryTab } from './components/RiskHistoryTab'

import { EditRiskDetailsModal } from './components/EditRiskDetailsModal'
import { ChangeOwnerModal } from './components/ChangeOwnerModal'
import { ChangeStatusModal } from './components/ChangeStatusModal'
import { ReassessRiskModal } from './components/ReassessRiskModal'
import { AddControlModal } from './components/AddControlModal'
import { AddMitigationModal } from './components/AddMitigationModal'
import { UpdateActionProgressModal } from './components/UpdateActionProgressModal'
import { EditTreatmentStrategyModal } from './components/EditTreatmentStrategyModal'
import { ConfirmDialog } from '@/components/ui'

interface RiskDetailsWorkspaceProps {
  riskId: string
  onNavigate?: (routeId: string) => void
}

type TabKey = 'overview' | 'assessment' | 'controls' | 'actions' | 'history'

function calculateSeverity(score: number): RiskSeverity {
  if (score >= 16) return 'critical'
  if (score >= 10) return 'high'
  if (score >= 5) return 'moderate'
  return 'low'
}

export function RiskDetailsWorkspace({
  riskId,
  onNavigate,
}: RiskDetailsWorkspaceProps) {
  // Find risk from full enterprise register or fallback to RSK-1042
  const baseRisk = useMemo(() => {
    const found = ENTERPRISE_RISK_REGISTER.find((r) => r.id === riskId)
    return found || ENTERPRISE_RISK_REGISTER.find((r) => r.id === 'RSK-1042') || ENTERPRISE_RISK_REGISTER[0]
  }, [riskId])

  // Initialize state with rich detail
  const [detail, setDetail] = useState<ComprehensiveRiskDetail>(() =>
    getComprehensiveRiskDetail(baseRisk)
  )

  const [activeTab, setActiveTab] = useState<TabKey>('overview')
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [reassessModalOpen, setReassessModalOpen] = useState(false)
  const [changeOwnerModalOpen, setChangeOwnerModalOpen] = useState(false)
  const [changeStatusModalOpen, setChangeStatusModalOpen] = useState(false)
  const [archiveConfirmOpen, setArchiveConfirmOpen] = useState(false)
  const [addControlModalOpen, setAddControlModalOpen] = useState(false)
  const [addMitigationModalOpen, setAddMitigationModalOpen] = useState(false)
  const [editTreatmentModalOpen, setEditTreatmentModalOpen] = useState(false)
  const [selectedActionForProgress, setSelectedActionForProgress] = useState<MitigationPlanItem | null>(null)
  const [updateProgressModalOpen, setUpdateProgressModalOpen] = useState(false)

  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  // 1. Handle Reassessment submission
  const handleSaveReassessment = (data: {
    inherentLikelihood: number
    inherentImpact: number
    residualLikelihood: number
    residualImpact: number
    notes: string
  }) => {
    const newInherentScore = data.inherentLikelihood * data.inherentImpact
    const newResidualScore = data.residualLikelihood * data.residualImpact

    const newInherentSeverity = calculateSeverity(newInherentScore)
    const newResidualSeverity = calculateSeverity(newResidualScore)
    const approvedThreshold = detail.appetiteDetails.approvedThreshold
    const isAboveAppetite = newResidualScore > approvedThreshold

    const newHistoryRecord: AssessmentHistoryRecord = {
      id: `ASH-0${detail.assessmentHistory.length + 1}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      inherentScore: newInherentScore,
      residualScore: newResidualScore,
      assessor: 'James Wilson',
      status: 'Approved',
    }

    const newActivity: ActivityTimelineItem = {
      id: `ACT-EVT-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      title: `Formal reassessment completed. Inherent: ${newInherentScore}, Residual: ${newResidualScore}.`,
      user: 'James Wilson',
      type: 'user',
    }

    setDetail((prev) => ({
      ...prev,
      base: {
        ...prev.base,
        inherentLikelihood: data.inherentLikelihood,
        inherentImpact: data.inherentImpact,
        inherentScore: newInherentScore,
        inherentSeverity: newInherentSeverity,
        residualLikelihood: data.residualLikelihood,
        residualImpact: data.residualImpact,
        residualScore: newResidualScore,
        residualSeverity: newResidualSeverity,
        appetiteStatus: isAboveAppetite ? 'breached' : 'within',
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      },
      assessmentSummary: {
        ...prev.assessmentSummary,
        likelihoodLabel: `${data.residualLikelihood} / 5 — Evaluated`,
        impactLabel: `${data.residualImpact} / 5 — Evaluated`,
        inherentScore: newInherentScore,
        inherentSeverity: newInherentSeverity.charAt(0).toUpperCase() + newInherentSeverity.slice(1),
        residualScore: newResidualScore,
        residualSeverity: newResidualSeverity.charAt(0).toUpperCase() + newResidualSeverity.slice(1),
        assessmentDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        assessor: 'James Wilson',
        methodologyNote: data.notes || prev.assessmentSummary.methodologyNote,
      },
      appetiteDetails: {
        ...prev.appetiteDetails,
        currentResidualScore: newResidualScore,
        variancePoints: Math.max(0, newResidualScore - approvedThreshold),
        status: isAboveAppetite ? 'Above Appetite' : 'Within Tolerance',
      },
      assessmentHistory: [newHistoryRecord, ...prev.assessmentHistory],
      activityTimeline: [newActivity, ...prev.activityTimeline],
    }))

    showToast(`Assessment saved. Residual score updated to ${newResidualScore}/25 (${newResidualSeverity}).`)
  }

  // 2. Handle Edit Profile Details
  const handleSaveEdit = (data: {
    title: string
    description: string
    category: ComprehensiveRiskDetail['base']['category']
    department: ComprehensiveRiskDetail['base']['department']
  }) => {
    setDetail((prev) => ({
      ...prev,
      base: {
        ...prev.base,
        title: data.title,
        category: data.category,
        department: data.department,
      },
      overviewDetails: {
        ...prev.overviewDetails,
        description: data.description,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      },
      activityTimeline: [
        {
          id: `ACT-EVT-${Date.now()}`,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          title: 'Risk overview profile and metadata updated.',
          user: 'James Wilson',
          type: 'user',
        },
        ...prev.activityTimeline,
      ],
    }))
    showToast('Risk profile updated successfully.')
  }

  // 3. Handle Duplicate Risk
  const handleDuplicateRisk = () => {
    const clonedId = `RSK-${Math.floor(1100 + Math.random() * 899)}`
    showToast(`Risk ${detail.base.id} duplicated successfully as ${clonedId}.`)
  }

  // 4. Handle Change Owner
  const handleChangeOwner = (newOwner: string, newRole: string) => {
    setDetail((prev) => ({
      ...prev,
      base: {
        ...prev.base,
        owner: newOwner,
        ownerRole: newRole,
      },
      treatmentStrategy: {
        ...prev.treatmentStrategy,
        responsibleOwner: newOwner,
      },
      activityTimeline: [
        {
          id: `ACT-EVT-${Date.now()}`,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          title: `Risk ownership reassigned to ${newOwner} (${newRole}).`,
          user: 'Current Administrator',
          type: 'user',
        },
        ...prev.activityTimeline,
      ],
    }))
    showToast(`Risk owner reassigned to ${newOwner}.`)
  }

  // 5. Handle Change Status
  const handleChangeStatus = (newStatus: RegisterRiskStatus) => {
    setDetail((prev) => ({
      ...prev,
      base: {
        ...prev.base,
        status: newStatus,
      },
      activityTimeline: [
        {
          id: `ACT-EVT-${Date.now()}`,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          title: `Risk lifecycle status updated to ${newStatus}.`,
          user: 'James Wilson',
          type: 'user',
        },
        ...prev.activityTimeline,
      ],
    }))
    showToast(`Lifecycle status changed to ${newStatus}.`)
  }

  // 6. Handle Archive Confirm
  const handleArchiveConfirm = () => {
    setArchiveConfirmOpen(false)
    setDetail((prev) => ({
      ...prev,
      base: {
        ...prev.base,
        status: 'closed',
      },
      activityTimeline: [
        {
          id: `ACT-EVT-${Date.now()}`,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          title: `Risk archived and closed by compliance administrator.`,
          user: 'Current Administrator',
          type: 'user',
        },
        ...prev.activityTimeline,
      ],
    }))
    showToast(`Risk ${detail.base.id} has been successfully archived.`)
  }

  // 7. Handle Add Control
  const handleAddControl = (newControl: AssociatedControlItem) => {
    setDetail((prev) => ({
      ...prev,
      associatedControls: [newControl, ...prev.associatedControls],
      activityTimeline: [
        {
          id: `ACT-EVT-${Date.now()}`,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          title: `Associated control added: ${newControl.id} - ${newControl.name}.`,
          user: 'James Wilson',
          type: 'user',
        },
        ...prev.activityTimeline,
      ],
    }))
    showToast(`Control ${newControl.id} linked successfully.`)
  }

  // 8. Handle Add Mitigation Plan
  const handleAddMitigation = (newAction: MitigationPlanItem) => {
    setDetail((prev) => ({
      ...prev,
      mitigationPlans: [newAction, ...prev.mitigationPlans],
      activityTimeline: [
        {
          id: `ACT-EVT-${Date.now()}`,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          title: `New mitigation action plan created: ${newAction.id} - ${newAction.title}.`,
          user: 'James Wilson',
          type: 'user',
        },
        ...prev.activityTimeline,
      ],
    }))
    showToast(`Mitigation plan ${newAction.id} created successfully.`)
  }

  // 9. Handle Save Action Progress
  const handleSaveActionProgress = (updatedAction: MitigationPlanItem) => {
    setDetail((prev) => ({
      ...prev,
      mitigationPlans: prev.mitigationPlans.map((a) => (a.id === updatedAction.id ? updatedAction : a)),
      activityTimeline: [
        {
          id: `ACT-EVT-${Date.now()}`,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          title: `Progress updated for ${updatedAction.id}: ${updatedAction.progressPercent}% (${updatedAction.status}).`,
          user: 'James Wilson',
          type: 'user',
        },
        ...prev.activityTimeline,
      ],
    }))
    showToast(`Updated progress for action ${updatedAction.id}.`)
  }

  // 10. Handle Save Treatment Strategy
  const handleSaveTreatmentStrategy = (updatedStrategy: TreatmentStrategyDetails) => {
    setDetail((prev) => ({
      ...prev,
      treatmentStrategy: updatedStrategy,
      activityTimeline: [
        {
          id: `ACT-EVT-${Date.now()}`,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          title: `Treatment strategy updated to ${updatedStrategy.strategy}. Target residual: ${updatedStrategy.targetResidual}.`,
          user: 'James Wilson',
          type: 'user',
        },
        ...prev.activityTimeline,
      ],
    }))
    showToast('Treatment strategy updated successfully.')
  }

  // Navigation tab definitions
  const tabs: { key: TabKey; label: string; icon: React.ReactNode; count?: number }[] = [
    {
      key: 'overview',
      label: 'Overview',
      icon: <FileText className="size-4" />,
    },
    {
      key: 'assessment',
      label: 'Assessment',
      icon: <SlidersHorizontal className="size-4" />,
    },
    {
      key: 'controls',
      label: 'Controls',
      icon: <ShieldCheck className="size-4" />,
      count: detail.associatedControls.length,
    },
    {
      key: 'actions',
      label: 'Actions',
      icon: <ListTodo className="size-4" />,
      count: detail.mitigationPlans.length,
    },
    {
      key: 'history',
      label: 'History',
      icon: <History className="size-4" />,
      count: detail.activityTimeline.length,
    },
  ]

  return (
    <div className="space-y-6 pb-12">
      {/* Toast notification banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-3 shadow-xl text-xs animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── 1. Page Header (Section 3) ── */}
      <RiskDetailsHeader
        detail={detail}
        onBack={() => onNavigate?.('risks')}
        onOpenEdit={() => setEditModalOpen(true)}
        onStartAssessment={() => onNavigate?.(`assess-${detail.base.id}`)}
        onDuplicateRisk={handleDuplicateRisk}
        onChangeOwner={() => setChangeOwnerModalOpen(true)}
        onChangeStatus={() => setChangeStatusModalOpen(true)}
        onArchiveRisk={() => setArchiveConfirmOpen(true)}
        onViewAuditHistory={() => setActiveTab('history')}
      />

      {/* ── 2. Summary Panel (Section 4) ── */}
      <RiskSummaryPanel detail={detail} />

      {/* ── 3. Tabs Navigation Bar (Section 5) ── */}
      <div className="border-b border-[var(--color-border)]">
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto scrollbar-none pb-0.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary-subtle)]/20 rounded-t-lg'
                    : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-slate-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-mono ${
                      isActive
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)]'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* ── 4. Tab Views Content ── */}
      <div>
        {activeTab === 'overview' && (
          <RiskOverviewTab
            detail={detail}
            onNavigateToTab={setActiveTab}
            onOpenEditOverview={() => setEditModalOpen(true)}
            onOpenAddControl={() => setAddControlModalOpen(true)}
            onOpenAddMitigation={() => setAddMitigationModalOpen(true)}
            onOpenEditTreatment={() => setEditTreatmentModalOpen(true)}
            onUpdateActionProgress={(action) => {
              setSelectedActionForProgress(action)
              setUpdateProgressModalOpen(true)
            }}
            onNavigateToRisk={(relId) => onNavigate?.(`risk-${relId}`)}
          />
        )}

        {activeTab === 'assessment' && (
          <RiskAssessmentTab
            detail={detail}
            onStartAssessment={() => onNavigate?.(`assess-${detail.base.id}`)}
          />
        )}

        {activeTab === 'controls' && (
          <RiskControlsTab
            controls={detail.associatedControls}
            onOpenAddControl={() => setAddControlModalOpen(true)}
            onTestControl={(id) => showToast(`Automated test initiated for control ${id}: PASSED.`)}
          />
        )}

        {activeTab === 'actions' && (
          <RiskMitigationTab
            actions={detail.mitigationPlans}
            onOpenAddModal={() => setAddMitigationModalOpen(true)}
            onUpdateProgress={(action) => {
              setSelectedActionForProgress(action)
              setUpdateProgressModalOpen(true)
            }}
            onReassignOwner={() => setChangeOwnerModalOpen(true)}
          />
        )}

        {activeTab === 'history' && <RiskHistoryTab detail={detail} />}
      </div>

      {/* ── Modals & Dialogs ── */}
      <EditRiskDetailsModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        detail={detail}
        onSave={handleSaveEdit}
      />

      <ReassessRiskModal
        open={reassessModalOpen}
        onClose={() => setReassessModalOpen(false)}
        detail={detail}
        onSaveReassessment={handleSaveReassessment}
      />

      <ChangeOwnerModal
        open={changeOwnerModalOpen}
        onClose={() => setChangeOwnerModalOpen(false)}
        currentOwner={detail.base.owner}
        currentRole={detail.base.ownerRole}
        onSave={handleChangeOwner}
      />

      <ChangeStatusModal
        open={changeStatusModalOpen}
        onClose={() => setChangeStatusModalOpen(false)}
        currentStatus={detail.base.status}
        onSave={handleChangeStatus}
      />

      <ConfirmDialog
        open={archiveConfirmOpen}
        onClose={() => setArchiveConfirmOpen(false)}
        onConfirm={handleArchiveConfirm}
        title={`Archive Risk ${detail.base.id}`}
        description="Are you sure you want to archive this risk? Archiving will remove it from the active risk register and freeze further mitigation actions."
        confirmLabel="Archive Risk"
        destructive={true}
      />

      <AddControlModal
        open={addControlModalOpen}
        onClose={() => setAddControlModalOpen(false)}
        onAddControl={handleAddControl}
      />

      <AddMitigationModal
        open={addMitigationModalOpen}
        onClose={() => setAddMitigationModalOpen(false)}
        onAddAction={handleAddMitigation}
      />

      <UpdateActionProgressModal
        open={updateProgressModalOpen}
        onClose={() => setUpdateProgressModalOpen(false)}
        action={selectedActionForProgress}
        onSave={handleSaveActionProgress}
      />

      <EditTreatmentStrategyModal
        open={editTreatmentModalOpen}
        onClose={() => setEditTreatmentModalOpen(false)}
        currentStrategy={detail.treatmentStrategy}
        onSave={handleSaveTreatmentStrategy}
      />
    </div>
  )
}
