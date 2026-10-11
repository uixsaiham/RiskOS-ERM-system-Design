import { useState, useMemo } from 'react'
import {
  CheckSquare,
  Clock,
  FileCheck,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Search,
  Plus,
  X,
  FileSpreadsheet,
} from 'lucide-react'
import { Button } from '@/components/ui'

interface MyWorkWorkspaceProps {
  routeId?: string
  onNavigate?: (routeId: string) => void
}

interface ActionItem {
  id: string
  title: string
  dueDate: string
  status: 'In Progress' | 'Overdue' | 'Not Started' | 'Completed'
  progress: number
  cost: string
  riskId: string
  riskTitle: string
  urgency: 'critical' | 'high' | 'medium' | 'low'
}

interface ReviewItem {
  id: string
  itemType: string
  targetId: string
  targetTitle: string
  dueDate: string
  status: 'Pending Review' | 'Review Required' | 'Approved' | 'Changes Requested'
  assignedRole: string
  lastAssessed: string
}

interface AttestationItem {
  id: string
  title: string
  framework: string
  dueDate: string
  signed: boolean
  signedDate: string | null
  scope: string
}

export function MyWorkWorkspace({ routeId, onNavigate }: MyWorkWorkspaceProps) {
  const initialTab =
    routeId === 'my-work-reviews'
      ? 'reviews'
      : routeId === 'my-work-attestations'
      ? 'attestations'
      : 'actions'

  const [activeTab, setActiveTab] = useState<'actions' | 'reviews' | 'attestations'>(initialTab)
  const [searchQuery, setSearchQuery] = useState('')
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all')

  // Modals
  const [isActionModalOpen, setIsActionModalOpen] = useState(false)
  const [isAttestationModalOpen, setIsAttestationModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // New action form state
  const [newActionTitle, setNewActionTitle] = useState('')
  const [newActionRiskId, setNewActionRiskId] = useState('RSK-1042')
  const [newActionDueDate, setNewActionDueDate] = useState('Nov 30, 2026')
  const [newActionCost, setNewActionCost] = useState('$50,000')
  const [newActionUrgency, setNewActionUrgency] = useState<'critical' | 'high' | 'medium' | 'low'>('high')

  // New attestation form state
  const [newAttTitle, setNewAttTitle] = useState('')
  const [newAttFramework, setNewAttFramework] = useState('SOC 2 Type II & ISO 27001')
  const [newAttScope, setNewAttScope] = useState('Cloud Infrastructure & Production Data Access')

  const [actionsList, setActionsList] = useState<ActionItem[]>([
    {
      id: 'ACT-0204',
      title: 'Implement Phishing-Resistant Authentication (FIDO2 Hardware Keys)',
      dueDate: 'Oct 20, 2026',
      status: 'In Progress',
      progress: 65,
      cost: '$95,000',
      riskId: 'RSK-1042',
      riskTitle: 'Cybersecurity Breach',
      urgency: 'high',
    },
    {
      id: 'ACT-0209',
      title: 'Review Privileged Access Permissions & Eliminate Orphaned Admin Roles',
      dueDate: 'Oct 14, 2026',
      status: 'Overdue',
      progress: 40,
      cost: '$45,000',
      riskId: 'RSK-1042',
      riskTitle: 'Cybersecurity Breach',
      urgency: 'critical',
    },
    {
      id: 'ACT-0215',
      title: 'Conduct Targeted Phishing Simulation Drills for Finance Dept',
      dueDate: 'Nov 05, 2026',
      status: 'Not Started',
      progress: 0,
      cost: '$25,000',
      riskId: 'RSK-1042',
      riskTitle: 'Cybersecurity Breach',
      urgency: 'medium',
    },
    {
      id: 'ACT-0198',
      title: 'Update Primary Disaster Recovery Failover SOP for AWS Frankfurt',
      dueDate: 'Oct 28, 2026',
      status: 'In Progress',
      progress: 80,
      cost: '$12,000',
      riskId: 'RSK-1011',
      riskTitle: 'Cloud Service Interruption',
      urgency: 'medium',
    },
  ])

  const [reviewsList, setReviewsList] = useState<ReviewItem[]>([
    {
      id: 'REV-084',
      itemType: 'Risk Assessment',
      targetId: 'RSK-1042',
      targetTitle: 'Cybersecurity Breach',
      dueDate: 'Nov 18, 2026',
      status: 'Pending Review',
      assignedRole: 'Head of IT Reviewer',
      lastAssessed: 'Sep 28, 2026',
    },
    {
      id: 'REV-089',
      itemType: 'Control Effectiveness Test',
      targetId: 'CTL-002',
      targetTitle: 'Endpoint Detection & Response',
      dueDate: 'Nov 15, 2026',
      status: 'Review Required',
      assignedRole: 'Control Owner Attestation',
      lastAssessed: 'Oct 02, 2026',
    },
  ])

  const [attestationsList, setAttestationsList] = useState<AttestationItem[]>([
    {
      id: 'ATT-Q3-2026',
      title: 'Q3 2026 SOX Section 404 & Access Control Attestation',
      framework: 'Sarbanes-Oxley & ISO 27001',
      dueDate: 'Oct 31, 2026',
      signed: false,
      signedDate: null,
      scope: '32 IT General Controls (ITGC) & Access Provisioning Records',
    },
  ])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const handleSignAttestation = (id: string) => {
    setAttestationsList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, signed: true, signedDate: 'Oct 11, 2026' } : a))
    )
    showToast('Attestation signed and timestamped with digital signature.')
  }

  const handleAdvanceProgress = (id: string) => {
    setActionsList((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextProg = Math.min(100, a.progress + 20)
          return {
            ...a,
            progress: nextProg,
            status: nextProg >= 100 ? 'Completed' : 'In Progress',
          }
        }
        return a
      })
    )
    showToast('Remediation progress updated (+20%).')
  }

  const handleCompleteAction = (id: string) => {
    setActionsList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, progress: 100, status: 'Completed' } : a))
    )
    showToast('Action marked as 100% completed.')
  }

  const handleApproveReview = (id: string) => {
    setReviewsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Approved' } : r))
    )
    showToast(`Review ${id} approved by user.`)
  }

  // Create Action
  const handleCreateAction = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newActionTitle.trim()) return

    const item: ActionItem = {
      id: `ACT-0${Math.floor(220 + Math.random() * 50)}`,
      title: newActionTitle.trim(),
      dueDate: newActionDueDate,
      status: 'In Progress',
      progress: 10,
      cost: newActionCost || '$30,000',
      riskId: newActionRiskId,
      riskTitle: newActionRiskId === 'RSK-1042' ? 'Cybersecurity Breach' : 'Cloud Interruption',
      urgency: newActionUrgency,
    }

    setActionsList((prev) => [item, ...prev])
    setIsActionModalOpen(false)
    setNewActionTitle('')
    showToast(`Action item ${item.id} created successfully.`)
  }

  // Create Attestation
  const handleCreateAttestation = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAttTitle.trim()) return

    const item: AttestationItem = {
      id: `ATT-Q4-${Math.floor(2026 + Math.random() * 10)}`,
      title: newAttTitle.trim(),
      framework: newAttFramework,
      dueDate: 'Dec 15, 2026',
      signed: false,
      signedDate: null,
      scope: newAttScope,
    }

    setAttestationsList((prev) => [item, ...prev])
    setIsAttestationModalOpen(false)
    setNewAttTitle('')
    showToast(`Attestation requirement ${item.id} scheduled.`)
  }

  // Filtered Actions
  const filteredActions = useMemo(() => {
    return actionsList.filter((a) => {
      const matchSearch =
        searchQuery === '' ||
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.riskId.toLowerCase().includes(searchQuery.toLowerCase())

      const matchUrgency =
        urgencyFilter === 'all' ||
        (urgencyFilter === 'critical' && a.urgency === 'critical') ||
        (urgencyFilter === 'high' && a.urgency === 'high') ||
        (urgencyFilter === 'overdue' && a.status === 'Overdue') ||
        (urgencyFilter === 'completed' && a.status === 'Completed')

      return matchSearch && matchUrgency
    })
  }, [actionsList, searchQuery, urgencyFilter])

  // Filtered Reviews
  const filteredReviews = useMemo(() => {
    return reviewsList.filter((r) => {
      return (
        searchQuery === '' ||
        r.targetTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.targetId.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })
  }, [reviewsList, searchQuery])

  const pendingActionsCount = actionsList.filter((a) => a.status !== 'Completed').length
  const pendingReviewsCount = reviewsList.filter((r) => r.status !== 'Approved').length
  const pendingAttestationsCount = attestationsList.filter((a) => !a.signed).length

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900 text-white shadow-xl text-xs font-medium animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="size-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── Page Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <nav className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
            <span>Overview</span>
            <ChevronRight className="size-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold">My Work</span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            My Action Items & Review Queue
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Track owned remediation actions, pending risk assessments, and quarterly compliance attestations.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60 shadow-2xs">
            <span className="size-1.5 rounded-full bg-blue-600 animate-pulse" />
            {pendingActionsCount + pendingReviewsCount + pendingAttestationsCount} Assigned Items
          </span>

          {activeTab === 'actions' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsActionModalOpen(true)}
              className="gap-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
            >
              <Plus className="size-3.5" />
              <span>+ Create Action Item</span>
            </Button>
          )}

          {activeTab === 'attestations' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsAttestationModalOpen(true)}
              className="gap-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
            >
              <Plus className="size-3.5" />
              <span>+ Add Attestation Cycle</span>
            </Button>
          )}
        </div>
      </div>

      {/* ── Filter & Navigation Toolbar ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
        {/* Modern Segmented Tabs */}
        <div className="inline-flex items-center gap-1 p-1 bg-slate-100/90 rounded-xl border border-slate-200/60 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('actions')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'actions'
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckSquare className="size-3.5" />
            <span>Actions Due ({pendingActionsCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'reviews'
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="size-3.5" />
            <span>Reviews Pending ({pendingReviewsCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('attestations')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'attestations'
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCheck className="size-3.5" />
            <span>Attestations ({pendingAttestationsCount})</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search items by ID or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* ── Tab Content: Actions ── */}
      {activeTab === 'actions' && (
        <div className="space-y-4">
          {/* Subfilter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-xs text-slate-400 font-medium mr-1">Filter:</span>
            {[
              { id: 'all', label: 'All Actions' },
              { id: 'overdue', label: 'Overdue' },
              { id: 'critical', label: 'Critical Urgency' },
              { id: 'high', label: 'High Urgency' },
              { id: 'completed', label: 'Completed' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setUrgencyFilter(f.id)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  urgencyFilter === f.id
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredActions.length === 0 ? (
              <div className="col-span-2 p-10 text-center border border-dashed border-slate-200 rounded-xl bg-white text-xs text-slate-500">
                No action items match the selected filter or search term.
              </div>
            ) : (
              filteredActions.map((action) => (
                <div
                  key={action.id}
                  className="p-5 rounded-xl border border-slate-200/80 bg-white shadow-xs space-y-3.5 hover:border-blue-300 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-blue-600">{action.id}</span>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                            action.status === 'Overdue'
                              ? 'bg-rose-50 text-rose-700 border-rose-200/70'
                              : action.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70'
                              : 'bg-blue-50 text-blue-700 border-blue-200/70'
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${
                              action.status === 'Overdue'
                                ? 'bg-rose-500'
                                : action.status === 'Completed'
                                ? 'bg-emerald-500'
                                : 'bg-blue-500'
                            }`}
                          />
                          {action.status}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                            action.urgency === 'critical'
                              ? 'bg-rose-100 text-rose-800'
                              : action.urgency === 'high'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {action.urgency}
                        </span>
                      </div>
                      <h3 className="font-semibold text-xs text-slate-900 mt-1.5 leading-snug">
                        {action.title}
                      </h3>
                    </div>

                    <span className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200/70 px-2 py-0.5 rounded-md shrink-0">
                      {action.cost}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Remediation progress</span>
                      <strong className="text-slate-900 font-semibold">{action.progress}%</strong>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 rounded-full ${
                          action.progress >= 100
                            ? 'bg-emerald-500'
                            : action.status === 'Overdue'
                            ? 'bg-rose-500'
                            : 'bg-blue-600'
                        }`}
                        style={{ width: `${action.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Risk Link & Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                    <button
                      type="button"
                      onClick={() => onNavigate?.(`risk-${action.riskId}`)}
                      className="flex items-center gap-1 font-mono text-xs text-blue-600 hover:underline"
                    >
                      <span>Linked: {action.riskId}</span>
                      <ArrowUpRight className="size-3" />
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Due: {action.dueDate}</span>
                      {action.status !== 'Completed' && (
                        <>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleAdvanceProgress(action.id)}
                            className="h-6.5 text-[11px] px-2.5 font-semibold border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs"
                          >
                            +20%
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleCompleteAction(action.id)}
                            className="h-6.5 text-[11px] px-2.5 font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs"
                          >
                            Complete
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ── Tab Content: Reviews ── */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200/70 bg-slate-50/75 text-[11px] font-semibold text-slate-500">
                  <th className="py-3 px-4">Review ID</th>
                  <th className="py-3 px-4">Subject & Item Type</th>
                  <th className="py-3 px-4">Assigned Role</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredReviews.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      No pending reviews found.
                    </td>
                  </tr>
                ) : (
                  filteredReviews.map((rev) => (
                    <tr key={rev.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono font-semibold text-blue-600">{rev.id}</td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">
                          {rev.targetTitle}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          {rev.targetId} · {rev.itemType}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{rev.assignedRole}</td>
                      <td className="py-3 px-4 font-medium text-amber-700">{rev.dueDate}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                            rev.status === 'Approved'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70'
                              : 'bg-amber-50 text-amber-700 border-amber-200/70'
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${
                              rev.status === 'Approved' ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                          />
                          {rev.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        {rev.status !== 'Approved' && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleApproveReview(rev.id)}
                            className="h-7 text-xs font-semibold text-emerald-700 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 shadow-xs"
                          >
                            Quick Approve
                          </Button>
                        )}
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() =>
                            onNavigate?.(rev.targetId.startsWith('RSK') ? `assess-${rev.targetId}` : 'controls')
                          }
                          className="h-7 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 shadow-xs"
                        >
                          Open Dossier &rarr;
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Tab Content: Attestations ── */}
      {activeTab === 'attestations' && (
        <div className="space-y-4">
          {attestationsList.map((att) => (
            <div
              key={att.id}
              className="p-5 rounded-xl border border-slate-200/80 bg-white shadow-xs space-y-3.5 hover:border-slate-300 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-blue-600">{att.id}</span>
                    <span className="text-xs text-slate-500 font-medium">({att.framework})</span>
                  </div>
                  <h3 className="font-semibold text-sm text-slate-900 mt-1">
                    {att.title}
                  </h3>
                </div>

                {att.signed ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                    <CheckCircle2 className="size-3.5 text-emerald-600" />
                    Signed on {att.signedDate}
                  </span>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleSignAttestation(att.id)}
                    className="font-semibold gap-1.5 bg-slate-900 text-white hover:bg-slate-800 shadow-xs text-xs"
                  >
                    <FileCheck className="size-3.5" />
                    <span>Sign Attestation</span>
                  </Button>
                )}
              </div>

              <p className="text-xs text-slate-600 bg-slate-50/70 p-3.5 rounded-lg border border-slate-200/70 leading-relaxed">
                Scope: {att.scope}. By signing, you certify that all internal controls within your assigned domain have been verified, operated in accordance with policies, and significant deficiencies have been documented.
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ── Create Action Item Modal ── */}
      {isActionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <CheckSquare className="size-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Create Remediation Action</h3>
                  <p className="text-xs text-slate-500">Assign a treatment task to mitigate enterprise risk</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsActionModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAction} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Action Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Conduct third-party penetration test on customer portal"
                  value={newActionTitle}
                  onChange={(e) => setNewActionTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Linked Risk</label>
                  <select
                    value={newActionRiskId}
                    onChange={(e) => setNewActionRiskId(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono"
                  >
                    <option value="RSK-1042">RSK-1042 · Cybersecurity Breach</option>
                    <option value="RSK-1011">RSK-1011 · Cloud Outage</option>
                    <option value="RSK-1015">RSK-1015 · Data Leakage</option>
                    <option value="RSK-1008">RSK-1008 · AML Non-Compliance</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Urgency Priority</label>
                  <select
                    value={newActionUrgency}
                    onChange={(e) => setNewActionUrgency(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                  >
                    <option value="critical">Critical (Immediate containment)</option>
                    <option value="high">High (Next release cycle)</option>
                    <option value="medium">Medium (Standard SLA)</option>
                    <option value="low">Low (Long-term hardening)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Target Due Date</label>
                  <input
                    type="text"
                    value={newActionDueDate}
                    onChange={(e) => setNewActionDueDate(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Estimated Budget / Cost</label>
                  <input
                    type="text"
                    placeholder="e.g. $40,000"
                    value={newActionCost}
                    onChange={(e) => setNewActionCost(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsActionModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  Create Action
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Create Attestation Modal ── */}
      {isAttestationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <FileSpreadsheet className="size-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Provision Attestation Cycle</h3>
                  <p className="text-xs text-slate-500">Configure regulatory or internal compliance certification</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAttestationModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAttestation} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Attestation Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q4 2026 SOC 2 Type II Security & Confidentiality Sign-off"
                  value={newAttTitle}
                  onChange={(e) => setNewAttTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Compliance Framework</label>
                <input
                  type="text"
                  required
                  value={newAttFramework}
                  onChange={(e) => setNewAttFramework(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Certification Scope & Evidence Package</label>
                <textarea
                  rows={2}
                  required
                  value={newAttScope}
                  onChange={(e) => setNewAttScope(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsAttestationModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold"
                >
                  Launch Attestation Requirement
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
