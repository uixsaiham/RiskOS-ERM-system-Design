import { useState, useEffect } from 'react'
import {
  ChevronRight,
  Download,
  FileSpreadsheet,
  Briefcase,
  FileCheck,
  Plus,
  Search,
  CheckCircle2,
  X,
  Upload,
} from 'lucide-react'
import { Button } from '@/components/ui'

interface AuditsWorkspaceProps {
  routeId?: string
  onNavigate?: (routeId: string) => void
}

interface AuditPlanItem {
  id: string
  title: string
  leadAuditor: string
  quarter: string
  status: 'In Fieldwork' | 'Planning' | 'Scheduled' | 'Completed'
  scope: string
  progress: number
}

interface EngagementItem {
  id: string
  name: string
  auditFirm: string
  startDate: string
  targetClose: string
  auditedLead: string
  sampleCount: string
  findingsCount: string
  status: 'Drafting Report' | 'Fieldwork Active' | 'Completed'
}

interface EvidenceItem {
  id: string
  engagementId: string
  title: string
  requestedBy: string
  assignee: string
  dueDate: string
  status: 'Submitted' | 'Pending Submission' | 'Accepted by Auditor'
  submittedDate: string | null
}

export function AuditsWorkspace({ routeId, onNavigate: _onNavigate }: AuditsWorkspaceProps) {
  const getTabFromRoute = (id?: string) => {
    if (id === 'audits-engagements') return 'engagements'
    if (id === 'audits-evidence') return 'evidence'
    return 'plan'
  }

  const [activeTab, setActiveTab] = useState<'plan' | 'engagements' | 'evidence'>(() =>
    getTabFromRoute(routeId)
  )
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setActiveTab(getTabFromRoute(routeId))
  }, [routeId])

  // Modals state
  const [newEngagementOpen, setNewEngagementOpen] = useState(false)
  const [requestEvidenceOpen, setRequestEvidenceOpen] = useState(false)
  const [submitEvidenceModalItem, setSubmitEvidenceModalItem] = useState<EvidenceItem | null>(null)

  // Master Data State
  const [auditPlanList] = useState<AuditPlanItem[]>([
    {
      id: 'AUD-2026-01',
      title: 'IT General Controls (ITGC) & Cloud Infrastructure Security Review',
      leadAuditor: 'PwC External Audit & Internal Audit 3rd Line',
      quarter: 'Q3 2026',
      status: 'In Fieldwork',
      scope: 'Access controls, change management, backup replication, and incident triage.',
      progress: 75,
    },
    {
      id: 'AUD-2026-02',
      title: 'Anti-Money Laundering (AML) & Sanctions Compliance Audit',
      leadAuditor: 'Global Internal Audit Group',
      quarter: 'Q4 2026',
      status: 'Planning',
      scope: 'Transaction monitoring, suspicious activity reporting (SAR), and KYC onboarding.',
      progress: 20,
    },
    {
      id: 'AUD-2026-03',
      title: 'Operational Resiliency & Business Continuity Readiness (DORA)',
      leadAuditor: 'Internal Operational Audit Team',
      quarter: 'Q4 2026',
      status: 'Scheduled',
      scope: 'Disaster recovery failover tests, critical third-party dependencies, RTO/RPO metrics.',
      progress: 0,
    },
  ])

  const [engagementsList, setEngagementsList] = useState<EngagementItem[]>([
    {
      id: 'ENG-CYBER-26',
      name: 'Cybersecurity Incident Response Playbook & Threat Telemetry Audit',
      auditFirm: 'Internal Audit Assurance (Third Line)',
      startDate: 'Sep 01, 2026',
      targetClose: 'Oct 31, 2026',
      auditedLead: 'James Wilson, Head of IT',
      sampleCount: '40 Artifacts Evaluated',
      findingsCount: '2 Findings Raised',
      status: 'Drafting Report',
    },
    {
      id: 'ENG-SOX-26',
      name: 'Sarbanes-Oxley 404 Financial Reporting Key Controls Walkthrough',
      auditFirm: 'Deloitte & Touche LLP',
      startDate: 'Aug 15, 2026',
      targetClose: 'Nov 15, 2026',
      auditedLead: 'Marcus Vance, Head of Treasury',
      sampleCount: '125 Journal Entries & Wire Approvals',
      findingsCount: '0 Findings',
      status: 'Fieldwork Active',
    },
  ])

  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>([
    {
      id: 'EVD-101',
      engagementId: 'ENG-CYBER-26',
      title: 'Okta MFA Enforcement Log for All Production Root & Admin Accounts',
      requestedBy: 'Senior Auditor (PwC)',
      assignee: 'James Wilson',
      dueDate: 'Oct 15, 2026',
      status: 'Submitted',
      submittedDate: 'Oct 10, 2026',
    },
    {
      id: 'EVD-102',
      engagementId: 'ENG-CYBER-26',
      title: 'Annual Red-Team Penetration Test Executive Summary and Remediation Plan',
      requestedBy: 'Internal Audit Director',
      assignee: 'Sarah Chen',
      dueDate: 'Oct 18, 2026',
      status: 'Pending Submission',
      submittedDate: null,
    },
    {
      id: 'EVD-103',
      engagementId: 'ENG-SOX-26',
      title: 'Quarterly Privileged Access Reconciliation Sign-Off Worksheets',
      requestedBy: 'SOX PMO Lead',
      assignee: 'James Wilson',
      dueDate: 'Oct 22, 2026',
      status: 'Accepted by Auditor',
      submittedDate: 'Oct 08, 2026',
    },
  ])

  // Form states
  const [newEngTitle, setNewEngTitle] = useState('')
  const [newEngFirm, setNewEngFirm] = useState('PwC Assurance Services')
  const [newEngLead, setNewEngLead] = useState('James Wilson, Head of IT')
  const [newEngClose, setNewEngClose] = useState('Dec 15, 2026')

  const [newEvdTitle, setNewEvdTitle] = useState('')
  const [newEvdEngId, setNewEvdEngId] = useState('ENG-CYBER-26')
  const [newEvdBy, setNewEvdBy] = useState('PwC Lead Auditor')
  const [newEvdAssignee, setNewEvdAssignee] = useState('James Wilson')
  const [newEvdDue, setNewEvdDue] = useState('Nov 05, 2026')

  const [evidenceFileName, setEvidenceFileName] = useState('')

  const handleCreateEngagement = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEngTitle.trim()) return
    const newId = `ENG-2026-${28 + engagementsList.length}`
    const item: EngagementItem = {
      id: newId,
      name: newEngTitle.trim(),
      auditFirm: newEngFirm,
      startDate: 'Today',
      targetClose: newEngClose,
      auditedLead: newEngLead,
      sampleCount: '25 Samples Planned',
      findingsCount: '0 Findings',
      status: 'Fieldwork Active',
    }
    setEngagementsList([item, ...engagementsList])
    setNewEngTitle('')
    setNewEngagementOpen(false)
  }

  const handleCreateEvidenceRequest = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEvdTitle.trim()) return
    const newId = `EVD-${104 + evidenceList.length}`
    const item: EvidenceItem = {
      id: newId,
      engagementId: newEvdEngId,
      title: newEvdTitle.trim(),
      requestedBy: newEvdBy,
      assignee: newEvdAssignee,
      dueDate: newEvdDue,
      status: 'Pending Submission',
      submittedDate: null,
    }
    setEvidenceList([item, ...evidenceList])
    setNewEvdTitle('')
    setRequestEvidenceOpen(false)
  }

  const handleSubmitEvidence = (e: React.FormEvent) => {
    e.preventDefault()
    if (!submitEvidenceModalItem) return
    setEvidenceList((prev) =>
      prev.map((evd) =>
        evd.id === submitEvidenceModalItem.id
          ? {
              ...evd,
              status: 'Submitted',
              submittedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            }
          : evd
      )
    )
    setSubmitEvidenceModalItem(null)
    setEvidenceFileName('')
  }

  const handleAcceptEvidence = (id: string) => {
    setEvidenceList((prev) =>
      prev.map((evd) => (evd.id === id ? { ...evd, status: 'Accepted by Auditor' } : evd))
    )
  }

  // Filtered lists
  const filteredPlan = auditPlanList.filter((p) => {
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !p.id.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const filteredEngagements = engagementsList.filter((e) => {
    if (searchQuery && !e.name.toLowerCase().includes(searchQuery.toLowerCase()) && !e.id.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const filteredEvidence = evidenceList.filter((ev) => {
    if (searchQuery && !ev.title.toLowerCase().includes(searchQuery.toLowerCase()) && !ev.id.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6 pb-12">
      {/* ── Page Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <nav className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
            <span>Response & Assurance</span>
            <ChevronRight className="size-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold">
              {activeTab === 'engagements'
                ? 'Engagements'
                : activeTab === 'evidence'
                ? 'Evidence Requests'
                : 'Audit Plan'}
            </span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Internal Audit Plan & Assurance Reviews
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Coordinate Third Line assurance engagements, audit fieldwork, and evidentiary testing requests.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {activeTab === 'engagements' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setNewEngagementOpen(true)}
              className="gap-1.5 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-xs"
            >
              <Plus className="size-3.5" />
              <span>New Engagement</span>
            </Button>
          )}

          {activeTab === 'evidence' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setRequestEvidenceOpen(true)}
              className="gap-1.5 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-xs"
            >
              <Plus className="size-3.5" />
              <span>Request Evidence</span>
            </Button>
          )}

          <Button
            variant="secondary"
            size="sm"
            onClick={() => window.print()}
            className="gap-1.5 text-xs font-semibold border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-xs"
          >
            <Download className="size-3.5 text-slate-500" />
            <span>Export Audit Pack</span>
          </Button>
        </div>
      </div>

      {/* ── Segmented Navigation Tabs ── */}
      <div className="inline-flex items-center gap-1 p-1 bg-slate-100/90 rounded-xl border border-slate-200/60 text-xs overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('plan')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'plan'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileSpreadsheet className="size-3.5" />
          <span>Annual Audit Plan ({auditPlanList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('engagements')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'engagements'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Briefcase className="size-3.5" />
          <span>Active Engagements ({engagementsList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('evidence')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'evidence'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileCheck className="size-3.5" />
          <span>Evidence Requests ({evidenceList.length})</span>
        </button>
      </div>

      {/* ── Search Toolbar ── */}
      <div className="flex items-center justify-between gap-3 p-3 bg-white border border-slate-200/80 rounded-xl shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 size-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search audits, evidence, or assignees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
          />
        </div>
      </div>

      {/* ── Content: Audit Plan ── */}
      {activeTab === 'plan' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredPlan.map((plan) => (
              <div
                key={plan.id}
                className="p-5 rounded-xl border border-slate-200/80 bg-white shadow-xs space-y-4 hover:border-slate-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-blue-600">{plan.id}</span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                        {plan.quarter}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200/70">
                        <span className="size-1.5 rounded-full bg-blue-500" />
                        {plan.status}
                      </span>
                    </div>
                    <h3 className="font-semibold text-base text-slate-900 mt-1">
                      {plan.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{plan.scope}</p>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <span className="font-mono font-semibold text-xs text-blue-600">{plan.progress}% Progress</span>
                  </div>
                </div>

                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${plan.progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <span>Assurance Team: <strong className="text-slate-800 font-medium">{plan.leadAuditor}</strong></span>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setActiveTab('engagements')}
                    className="text-xs h-7 px-2.5 font-semibold border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    View Engagements
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Content: Engagements ── */}
      {activeTab === 'engagements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEngagements.map((eng) => (
            <div
              key={eng.id}
              className="p-5 rounded-xl border border-slate-200/80 bg-white shadow-xs space-y-3.5 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-blue-600">{eng.id}</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200/70">
                    {eng.status}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-slate-900 leading-snug">{eng.name}</h3>
                <p className="text-xs text-slate-500">Assurance Firm: <strong className="text-slate-800">{eng.auditFirm}</strong></p>
                <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-slate-600">
                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">Testing Scope</span>
                    <strong>{eng.sampleCount}</strong>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">Findings Raised</span>
                    <strong className={eng.findingsCount.includes('0') ? 'text-slate-800' : 'text-amber-700'}>{eng.findingsCount}</strong>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Lead: {eng.auditedLead}</span>
                <span className="font-mono">{eng.startDate} – {eng.targetClose}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Content: Evidence Requests ── */}
      {activeTab === 'evidence' && (
        <div className="rounded-xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200/70 bg-slate-50/75 text-[11px] font-semibold text-slate-500">
                <th className="py-3 px-4">Evidence Item & Ref</th>
                <th className="py-3 px-4">Engagement Scope</th>
                <th className="py-3 px-4">Requested By</th>
                <th className="py-3 px-4">Assignee</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Submission Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEvidence.map((evd) => (
                <tr key={evd.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{evd.title}</div>
                    <span className="font-mono text-blue-600 text-[11px]">{evd.id}</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600">{evd.engagementId}</td>
                  <td className="py-3 px-4 text-slate-600">{evd.requestedBy}</td>
                  <td className="py-3 px-4 text-slate-800 font-medium">{evd.assignee}</td>
                  <td className="py-3 px-4 text-slate-600">{evd.dueDate}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                        evd.status === 'Accepted by Auditor'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70'
                          : evd.status === 'Submitted'
                          ? 'bg-blue-50 text-blue-700 border-blue-200/70'
                          : 'bg-amber-50 text-amber-700 border-amber-200/70'
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          evd.status === 'Accepted by Auditor'
                            ? 'bg-emerald-500'
                            : evd.status === 'Submitted'
                            ? 'bg-blue-500'
                            : 'bg-amber-500'
                        }`}
                      />
                      {evd.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {evd.status === 'Pending Submission' ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setSubmitEvidenceModalItem(evd)}
                        className="text-xs h-7 px-2.5 font-semibold border-blue-200 text-blue-700 bg-blue-50/60 hover:bg-blue-50"
                      >
                        Upload Artifact
                      </Button>
                    ) : evd.status === 'Submitted' ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleAcceptEvidence(evd.id)}
                        className="text-xs h-7 px-2.5 font-semibold border-emerald-200 text-emerald-700 bg-emerald-50/60 hover:bg-emerald-50"
                      >
                        Accept Artifact
                      </Button>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                        <CheckCircle2 className="size-3 text-emerald-600" />
                        Verified
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Modal: New Engagement ── */}
      {newEngagementOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Initiate Audit Engagement</h3>
              <button
                type="button"
                onClick={() => setNewEngagementOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEngagement} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Engagement Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q4 2026 Core Infrastructure & IAM Access Testing"
                  value={newEngTitle}
                  onChange={(e) => setNewEngTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Audit Assurance Firm</label>
                  <input
                    type="text"
                    value={newEngFirm}
                    onChange={(e) => setNewEngFirm(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Target Close Date</label>
                  <input
                    type="text"
                    value={newEngClose}
                    onChange={(e) => setNewEngClose(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Audited Lead</label>
                <input
                  type="text"
                  value={newEngLead}
                  onChange={(e) => setNewEngLead(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setNewEngagementOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Confirm Engagement
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal: Request Evidence ── */}
      {requestEvidenceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Issue Evidence Testing Request</h3>
              <button
                type="button"
                onClick={() => setRequestEvidenceOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvidenceRequest} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Requested Evidence Artifact Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS CloudTrail Multi-Region S3 Storage Logging Validation"
                  value={newEvdTitle}
                  onChange={(e) => setNewEvdTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Engagement ID</label>
                  <input
                    type="text"
                    value={newEvdEngId}
                    onChange={(e) => setNewEvdEngId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Due Date</label>
                  <input
                    type="text"
                    value={newEvdDue}
                    onChange={(e) => setNewEvdDue(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Requested By</label>
                  <input
                    type="text"
                    value={newEvdBy}
                    onChange={(e) => setNewEvdBy(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Assigned 1st-Line Owner</label>
                  <input
                    type="text"
                    value={newEvdAssignee}
                    onChange={(e) => setNewEvdAssignee(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setRequestEvidenceOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Send Evidence Request
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal: Submit Evidence Artifact ── */}
      {submitEvidenceModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="font-mono text-xs font-semibold text-blue-600">{submitEvidenceModalItem.id}</span>
                <h3 className="font-bold text-base text-slate-900">Upload Evidence Document</h3>
              </div>
              <button
                type="button"
                onClick={() => setSubmitEvidenceModalItem(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitEvidence} className="space-y-4 text-xs">
              <div>
                <span className="font-semibold text-slate-800">{submitEvidenceModalItem.title}</span>
                <p className="text-slate-500 mt-0.5">Assigned to: {submitEvidenceModalItem.assignee} (Due: {submitEvidenceModalItem.dueDate})</p>
              </div>

              {/* Upload Dropzone */}
              <div className="p-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/60 text-center space-y-2 hover:border-blue-400 transition-colors">
                <Upload className="size-6 text-slate-400 mx-auto" />
                <div className="text-slate-700 font-medium">
                  {evidenceFileName ? evidenceFileName : 'Drop audit evidence files here or click to browse'}
                </div>
                <p className="text-[11px] text-slate-400">Accepts PDF, XLSX, CSV, JSON, PNG (Max 50MB)</p>
                <input
                  type="file"
                  onChange={(e) => setEvidenceFileName(e.target.files?.[0]?.name || 'evidence_artifact_2026.pdf')}
                  className="hidden"
                  id="evidence-file-input"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => document.getElementById('evidence-file-input')?.click()}
                  className="text-xs h-7 font-semibold"
                >
                  Select File
                </Button>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Testing Notes & Auditor Context</label>
                <textarea
                  rows={2}
                  placeholder="Provide sample extraction methodology or system parameter details..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setSubmitEvidenceModalItem(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Submit for Auditor Review
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
