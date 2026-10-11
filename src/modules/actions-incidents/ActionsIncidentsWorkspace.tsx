import { useState, useEffect } from 'react'
import {
  ListChecks,
  AlertTriangle,
  Flag,
  ChevronRight,
  Download,
  Plus,
  Search,
  CheckCircle2,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui'

interface ActionsIncidentsWorkspaceProps {
  routeId?: string
  onNavigate?: (routeId: string) => void
}

interface ActionItem {
  id: string
  title: string
  owner: string
  department: string
  dueDate: string
  status: 'In Progress' | 'Overdue' | 'Not Started' | 'Completed'
  progress: number
  cost: string
  riskId: string
  riskTitle: string
  isOverdue: boolean
}

interface IncidentItem {
  id: string
  title: string
  severity: string
  severityType: 'danger' | 'warning' | 'info'
  date: string
  duration: string
  loss: string
  owner: string
  linkedRiskId: string
  status: 'Investigating' | 'Mitigating' | 'Resolved'
}

interface IssueItem {
  id: string
  title: string
  source: string
  severity: string
  owner: string
  dueDate: string
  status: 'Open' | 'Remediating' | 'Closed'
  linkedRiskId: string
}

export function ActionsIncidentsWorkspace({
  routeId,
  onNavigate,
}: ActionsIncidentsWorkspaceProps) {
  const getTabFromRoute = (id?: string) => {
    if (id === 'incidents') return 'incidents'
    if (id === 'issues') return 'issues'
    return 'actions'
  }

  const [activeTab, setActiveTab] = useState<'actions' | 'incidents' | 'issues'>(() => getTabFromRoute(routeId))
  const [actionFilter, setActionFilter] = useState<'all' | 'open' | 'overdue' | 'completed'>(
    routeId === 'actions-overdue'
      ? 'overdue'
      : routeId === 'actions-completed'
      ? 'completed'
      : 'open'
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDept, setSelectedDept] = useState('All')

  // Synchronize routeId changes
  useEffect(() => {
    setActiveTab(getTabFromRoute(routeId))
    if (routeId === 'actions-overdue') setActionFilter('overdue')
    else if (routeId === 'actions-completed') setActionFilter('completed')
    else if (routeId === 'actions-open') setActionFilter('open')
  }, [routeId])

  // Modals state
  const [createActionOpen, setCreateActionOpen] = useState(false)
  const [reportIncidentOpen, setReportIncidentOpen] = useState(false)
  const [logIssueOpen, setLogIssueOpen] = useState(false)

  // Master Data State
  const [actionsList, setActionsList] = useState<ActionItem[]>([
    {
      id: 'ACT-0204',
      title: 'Implement Phishing-Resistant Authentication (FIDO2 WebAuthn)',
      owner: 'James Wilson',
      department: 'IT',
      dueDate: 'Oct 20, 2026',
      status: 'In Progress',
      progress: 65,
      cost: '$95,000',
      riskId: 'RSK-1042',
      riskTitle: 'Cybersecurity Breach',
      isOverdue: false,
    },
    {
      id: 'ACT-0209',
      title: 'Review Privileged Access Permissions & Eliminate Admin Creep',
      owner: 'Sarah Chen',
      department: 'IT',
      dueDate: 'Oct 14, 2026',
      status: 'Overdue',
      progress: 40,
      cost: '$45,000',
      riskId: 'RSK-1042',
      riskTitle: 'Cybersecurity Breach',
      isOverdue: true,
    },
    {
      id: 'ACT-0215',
      title: 'Conduct Targeted Phishing Simulation Drills for Finance Dept',
      owner: 'Emily Carter',
      department: 'HR',
      dueDate: 'Nov 05, 2026',
      status: 'Not Started',
      progress: 0,
      cost: '$25,000',
      riskId: 'RSK-1042',
      riskTitle: 'Cybersecurity Breach',
      isOverdue: false,
    },
    {
      id: 'ACT-0198',
      title: 'Update Primary Disaster Recovery Failover SOP for AWS Frankfurt',
      owner: 'Michael Brown',
      department: 'Operations',
      dueDate: 'Oct 28, 2026',
      status: 'In Progress',
      progress: 80,
      cost: '$12,000',
      riskId: 'RSK-1011',
      riskTitle: 'Cloud Service Interruption',
      isOverdue: false,
    },
    {
      id: 'ACT-0182',
      title: 'Upgrade Perimeter Next-Gen Firewall Cluster Firmware',
      owner: 'Sarah Chen',
      department: 'IT',
      dueDate: 'Sep 30, 2026',
      status: 'Completed',
      progress: 100,
      cost: '$18,000',
      riskId: 'RSK-1042',
      riskTitle: 'Cybersecurity Breach',
      isOverdue: false,
    },
  ])

  const [incidentsList, setIncidentsList] = useState<IncidentItem[]>([
    {
      id: 'INC-2026-88',
      title: 'Payment Gateway Clearing Latency Spike (EU Cluster)',
      severity: 'P1 · High',
      severityType: 'danger',
      date: 'Oct 11, 2026',
      duration: '42 mins',
      loss: '$120,000',
      owner: 'Sarah Chen',
      linkedRiskId: 'RSK-1042',
      status: 'Mitigating',
    },
    {
      id: 'INC-2026-87',
      title: 'Third-Party SMS Gateway Throttling Incident',
      severity: 'P2 · Moderate',
      severityType: 'warning',
      date: 'Oct 10, 2026',
      duration: '1 hr 15 mins',
      loss: '$15,000',
      owner: 'Michael Brown',
      linkedRiskId: 'RSK-1011',
      status: 'Investigating',
    },
    {
      id: 'INC-2026-82',
      title: 'Credential Stuffing Bot Attack on Customer Portal',
      severity: 'P1 · High',
      severityType: 'danger',
      date: 'Sep 26, 2026',
      duration: '3 hrs 20 mins',
      loss: '$45,000',
      owner: 'James Wilson',
      linkedRiskId: 'RSK-1042',
      status: 'Resolved',
    },
  ])

  const [issuesList, setIssuesList] = useState<IssueItem[]>([
    {
      id: 'ISS-041',
      title: 'Multi-Factor Authentication Bypass on Legacy SFTP Server',
      source: 'PwC Annual External Audit (ITGC)',
      severity: 'Critical Finding',
      owner: 'James Wilson',
      dueDate: 'Oct 25, 2026',
      status: 'Remediating',
      linkedRiskId: 'RSK-1042',
    },
    {
      id: 'ISS-039',
      title: 'Production Staging Database Access Reconciliation Gaps',
      source: 'Internal Audit Review (Q3)',
      severity: 'Moderate Finding',
      owner: 'Sarah Chen',
      dueDate: 'Nov 10, 2026',
      status: 'Open',
      linkedRiskId: 'RSK-1015',
    },
    {
      id: 'ISS-034',
      title: 'Cloud Storage Bucket Public Encryption Enforcement Missing',
      source: 'SOC 2 Type II Observation',
      severity: 'Moderate Finding',
      owner: 'David Kim',
      dueDate: 'Sep 15, 2026',
      status: 'Closed',
      linkedRiskId: 'RSK-1011',
    },
  ])

  // New item form states
  const [newActionTitle, setNewActionTitle] = useState('')
  const [newActionOwner, setNewActionOwner] = useState('James Wilson')
  const [newActionDept, setNewActionDept] = useState('IT')
  const [newActionDue, setNewActionDue] = useState('Nov 15, 2026')
  const [newActionCost, setNewActionCost] = useState('$35,000')

  const [newIncTitle, setNewIncTitle] = useState('')
  const [newIncSev, setNewIncSev] = useState<'P1 · High' | 'P2 · Moderate' | 'P3 · Low'>('P2 · Moderate')
  const [newIncLoss, setNewIncLoss] = useState('$25,000')
  const [newIncOwner, setNewIncOwner] = useState('Sarah Chen')

  const [newIssueTitle, setNewIssueTitle] = useState('')
  const [newIssueSev, setNewIssueSev] = useState('Critical Finding')
  const [newIssueSource, setNewIssueSource] = useState('Internal Audit 3rd Line')
  const [newIssueOwner, setNewIssueOwner] = useState('James Wilson')

  // Handlers
  const handleCreateAction = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newActionTitle.trim()) return
    const newId = `ACT-0${220 + actionsList.length}`
    const item: ActionItem = {
      id: newId,
      title: newActionTitle.trim(),
      owner: newActionOwner,
      department: newActionDept,
      dueDate: newActionDue,
      status: 'In Progress',
      progress: 15,
      cost: newActionCost || '$0',
      riskId: 'RSK-1042',
      riskTitle: 'Cybersecurity Breach',
      isOverdue: false,
    }
    setActionsList([item, ...actionsList])
    setNewActionTitle('')
    setCreateActionOpen(false)
  }

  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newIncTitle.trim()) return
    const newId = `INC-2026-${90 + incidentsList.length}`
    const item: IncidentItem = {
      id: newId,
      title: newIncTitle.trim(),
      severity: newIncSev,
      severityType: newIncSev.includes('P1') ? 'danger' : 'warning',
      date: 'Today · Just now',
      duration: 'Ongoing',
      loss: newIncLoss || '$0',
      owner: newIncOwner,
      linkedRiskId: 'RSK-1042',
      status: 'Investigating',
    }
    setIncidentsList([item, ...incidentsList])
    setNewIncTitle('')
    setReportIncidentOpen(false)
  }

  const handleCreateIssue = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newIssueTitle.trim()) return
    const newId = `ISS-0${45 + issuesList.length}`
    const item: IssueItem = {
      id: newId,
      title: newIssueTitle.trim(),
      source: newIssueSource,
      severity: newIssueSev,
      owner: newIssueOwner,
      dueDate: 'Nov 30, 2026',
      status: 'Open',
      linkedRiskId: 'RSK-1042',
    }
    setIssuesList([item, ...issuesList])
    setNewIssueTitle('')
    setLogIssueOpen(false)
  }

  const handleAdvanceProgress = (id: string) => {
    setActionsList((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a
        const nextProgress = Math.min(100, a.progress + 25)
        return {
          ...a,
          progress: nextProgress,
          status: nextProgress >= 100 ? 'Completed' : 'In Progress',
          isOverdue: false,
        }
      })
    )
  }

  const handleResolveIncident = (id: string) => {
    setIncidentsList((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, status: 'Resolved' } : inc))
    )
  }

  const handleResolveIssue = (id: string) => {
    setIssuesList((prev) =>
      prev.map((iss) => (iss.id === id ? { ...iss, status: 'Closed' } : iss))
    )
  }

  // Filtered Actions
  const filteredActions = actionsList.filter((a) => {
    if (actionFilter === 'open' && a.status === 'Completed') return false
    if (actionFilter === 'overdue' && !a.isOverdue) return false
    if (actionFilter === 'completed' && a.status !== 'Completed') return false
    if (selectedDept !== 'All' && a.department !== selectedDept) return false
    if (searchQuery && !a.title.toLowerCase().includes(searchQuery.toLowerCase()) && !a.id.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  // Filtered Incidents
  const filteredIncidents = incidentsList.filter((inc) => {
    if (searchQuery && !inc.title.toLowerCase().includes(searchQuery.toLowerCase()) && !inc.id.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  // Filtered Issues
  const filteredIssues = issuesList.filter((iss) => {
    if (searchQuery && !iss.title.toLowerCase().includes(searchQuery.toLowerCase()) && !iss.id.toLowerCase().includes(searchQuery.toLowerCase())) return false
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
              {activeTab === 'incidents'
                ? 'Incidents'
                : activeTab === 'issues'
                ? 'Issues & Findings'
                : 'Action Plans'}
            </span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {activeTab === 'incidents'
              ? 'Operational Incidents Log'
              : activeTab === 'issues'
              ? 'Issues & Audit Findings'
              : 'Risk Treatment & Action Plans'}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            {activeTab === 'incidents'
              ? 'Operational loss events and security incident triage linked to enterprise residual risk.'
              : activeTab === 'issues'
              ? 'Deficiencies and audit findings raised by internal assurance or supervisory regulators.'
              : 'Remediation programs, budget allocation, and milestone tracking to reduce exposure below appetite.'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {activeTab === 'actions' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setCreateActionOpen(true)}
              className="gap-1.5 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-xs"
            >
              <Plus className="size-3.5" />
              <span>Create Action Item</span>
            </Button>
          )}

          {activeTab === 'incidents' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setReportIncidentOpen(true)}
              className="gap-1.5 text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 shadow-xs"
            >
              <Plus className="size-3.5" />
              <span>Report Incident</span>
            </Button>
          )}

          {activeTab === 'issues' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setLogIssueOpen(true)}
              className="gap-1.5 text-xs font-semibold bg-amber-600 text-white hover:bg-amber-700 shadow-xs"
            >
              <Plus className="size-3.5" />
              <span>Log Audit Finding</span>
            </Button>
          )}

          <Button
            variant="secondary"
            size="sm"
            onClick={() => window.print()}
            className="gap-1.5 text-xs font-semibold border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-xs"
          >
            <Download className="size-3.5 text-slate-500" />
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      {/* ── Segmented Navigation Tabs ── */}
      <div className="inline-flex items-center gap-1 p-1 bg-slate-100/90 rounded-xl border border-slate-200/60 text-xs overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('actions')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'actions'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ListChecks className="size-3.5" />
          <span>Action Plans ({actionsList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('incidents')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'incidents'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <AlertTriangle className="size-3.5 text-rose-500" />
          <span>Operational Incidents ({incidentsList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('issues')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'issues'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Flag className="size-3.5 text-amber-500" />
          <span>Issues & Findings ({issuesList.length})</span>
        </button>
      </div>

      {/* ── Filter Toolbar ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-white border border-slate-200/80 rounded-xl shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 size-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID, title, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
          />
        </div>

        {activeTab === 'actions' && (
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <span className="text-xs text-slate-400 font-medium shrink-0">Filter:</span>
            <div className="inline-flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg text-xs">
              {(['all', 'open', 'overdue', 'completed'] as const).map((filterKey) => (
                <button
                  key={filterKey}
                  type="button"
                  onClick={() => setActionFilter(filterKey)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-all ${
                    actionFilter === filterKey
                      ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {filterKey}
                </button>
              ))}
            </div>

            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs bg-slate-50 text-slate-700 font-medium focus:outline-none"
            >
              <option value="All">All Departments</option>
              <option value="IT">IT Infrastructure</option>
              <option value="Operations">Operations</option>
              <option value="HR">Human Resources</option>
            </select>
          </div>
        )}
      </div>

      {/* ── Content: Action Plans ── */}
      {activeTab === 'actions' && (
        <div className="rounded-xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200/70 bg-slate-50/75 text-[11px] font-semibold text-slate-500">
                <th className="py-3 px-4">Action ID & Title</th>
                <th className="py-3 px-4">Owner & Dept</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Remediation Progress</th>
                <th className="py-3 px-4">Budget / Cost</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredActions.map((act) => (
                <tr key={act.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{act.title}</div>
                    <div className="flex items-center gap-2 text-[11px] mt-0.5">
                      <span className="font-mono text-blue-600 font-medium">{act.id}</span>
                      <span className="text-slate-400">·</span>
                      <button
                        type="button"
                        onClick={() => onNavigate?.(`risk-${act.riskId}`)}
                        className="text-slate-500 hover:text-blue-600 hover:underline"
                      >
                        {act.riskId}: {act.riskTitle}
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-slate-800 font-medium">{act.owner}</div>
                    <div className="text-slate-400 text-[11px]">{act.department}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={act.isOverdue ? 'font-semibold text-rose-600' : 'text-slate-600'}>
                      {act.dueDate}
                    </span>
                  </td>
                  <td className="py-3 px-4 w-48">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-500">Progress</span>
                        <span className="font-mono font-semibold text-slate-900">{act.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            act.progress >= 100
                              ? 'bg-emerald-500'
                              : act.isOverdue
                              ? 'bg-rose-500'
                              : 'bg-blue-600'
                          }`}
                          style={{ width: `${act.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-700">{act.cost}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                        act.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70'
                          : act.status === 'Overdue'
                          ? 'bg-rose-50 text-rose-700 border-rose-200/70'
                          : 'bg-blue-50 text-blue-700 border-blue-200/70'
                      }`}
                    >
                      {act.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {act.status !== 'Completed' ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleAdvanceProgress(act.id)}
                        className="text-xs h-7 px-2.5 font-semibold border-slate-200 text-slate-700 hover:bg-slate-50"
                      >
                        +25% Progress
                      </Button>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                        <CheckCircle2 className="size-3 text-emerald-600" />
                        Done
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Content: Incidents ── */}
      {activeTab === 'incidents' && (
        <div className="rounded-xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200/70 bg-slate-50/75 text-[11px] font-semibold text-slate-500">
                <th className="py-3 px-4">Incident ID & Summary</th>
                <th className="py-3 px-4">Severity Tier</th>
                <th className="py-3 px-4">Date / Duration</th>
                <th className="py-3 px-4">Financial Loss</th>
                <th className="py-3 px-4">Investigator Lead</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Mitigation Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredIncidents.map((inc) => (
                <tr key={inc.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{inc.title}</div>
                    <div className="flex items-center gap-2 text-[11px] mt-0.5">
                      <span className="font-mono text-rose-600 font-semibold">{inc.id}</span>
                      <span className="text-slate-400">·</span>
                      <button
                        type="button"
                        onClick={() => onNavigate?.(`risk-${inc.linkedRiskId}`)}
                        className="text-slate-500 hover:text-blue-600 hover:underline"
                      >
                        Root Risk: {inc.linkedRiskId}
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                        inc.severityType === 'danger'
                          ? 'bg-rose-50 text-rose-700 border-rose-200/70'
                          : 'bg-amber-50 text-amber-700 border-amber-200/70'
                      }`}
                    >
                      <span className={`size-1.5 rounded-full ${inc.severityType === 'danger' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                      {inc.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    <div>{inc.date}</div>
                    <span className="text-[11px] text-slate-400">{inc.duration}</span>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-rose-600">{inc.loss}</td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{inc.owner}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                        inc.status === 'Resolved'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70'
                          : 'bg-blue-50 text-blue-700 border-blue-200/70'
                      }`}
                    >
                      {inc.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {inc.status !== 'Resolved' ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleResolveIncident(inc.id)}
                        className="text-xs h-7 px-2.5 font-semibold border-slate-200 text-slate-700 hover:bg-slate-50"
                      >
                        Mark Resolved
                      </Button>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                        <CheckCircle2 className="size-3 text-emerald-600" />
                        Closed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Content: Issues ── */}
      {activeTab === 'issues' && (
        <div className="rounded-xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200/70 bg-slate-50/75 text-[11px] font-semibold text-slate-500">
                <th className="py-3 px-4">Issue Ref & Finding Title</th>
                <th className="py-3 px-4">Audit / Supervisory Source</th>
                <th className="py-3 px-4">Finding Severity</th>
                <th className="py-3 px-4">Remediation Owner</th>
                <th className="py-3 px-4">SLA Due Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Governance Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredIssues.map((iss) => (
                <tr key={iss.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{iss.title}</div>
                    <div className="flex items-center gap-2 text-[11px] mt-0.5">
                      <span className="font-mono text-amber-700 font-semibold">{iss.id}</span>
                      <span className="text-slate-400">·</span>
                      <button
                        type="button"
                        onClick={() => onNavigate?.(`risk-${iss.linkedRiskId}`)}
                        className="text-slate-500 hover:text-blue-600 hover:underline"
                      >
                        Mapped Risk: {iss.linkedRiskId}
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-medium">{iss.source}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                        iss.severity.includes('Critical')
                          ? 'bg-rose-50 text-rose-700 border-rose-200/70'
                          : 'bg-amber-50 text-amber-700 border-amber-200/70'
                      }`}
                    >
                      {iss.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{iss.owner}</td>
                  <td className="py-3 px-4 text-slate-600">{iss.dueDate}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                        iss.status === 'Closed'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70'
                          : 'bg-blue-50 text-blue-700 border-blue-200/70'
                      }`}
                    >
                      {iss.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {iss.status !== 'Closed' ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleResolveIssue(iss.id)}
                        className="text-xs h-7 px-2.5 font-semibold border-slate-200 text-slate-700 hover:bg-slate-50"
                      >
                        Verify & Close
                      </Button>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                        <CheckCircle2 className="size-3 text-emerald-600" />
                        Remediated
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Modal: Create Action Item ── */}
      {createActionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Create Risk Remediation Action Plan</h3>
              <button
                type="button"
                onClick={() => setCreateActionOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAction} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Action Plan Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Deploy Endpoint Isolation Agent on Remote Laptops"
                  value={newActionTitle}
                  onChange={(e) => setNewActionTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Responsible Owner</label>
                  <input
                    type="text"
                    value={newActionOwner}
                    onChange={(e) => setNewActionOwner(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Department</label>
                  <select
                    value={newActionDept}
                    onChange={(e) => setNewActionDept(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  >
                    <option value="IT">IT Infrastructure</option>
                    <option value="Operations">Operations</option>
                    <option value="Finance">Finance</option>
                    <option value="HR">Human Resources</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Target Due Date</label>
                  <input
                    type="text"
                    value={newActionDue}
                    onChange={(e) => setNewActionDue(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Budgeted Cost</label>
                  <input
                    type="text"
                    value={newActionCost}
                    onChange={(e) => setNewActionCost(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setCreateActionOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save Action Plan
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal: Report Incident ── */}
      {reportIncidentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Report Operational Risk Incident</h3>
              <button
                type="button"
                onClick={() => setReportIncidentOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleCreateIncident} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Incident Event Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Denial of Service attack targeting Customer Wire API"
                  value={newIncTitle}
                  onChange={(e) => setNewIncTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Severity Tier</label>
                  <select
                    value={newIncSev}
                    onChange={(e) => setNewIncSev(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  >
                    <option value="P1 · High">P1 · High (Critical)</option>
                    <option value="P2 · Moderate">P2 · Moderate</option>
                    <option value="P3 · Low">P3 · Low</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Estimated Loss / Impact</label>
                  <input
                    type="text"
                    value={newIncLoss}
                    onChange={(e) => setNewIncLoss(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Lead Incident Responder</label>
                <input
                  type="text"
                  value={newIncOwner}
                  onChange={(e) => setNewIncOwner(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setReportIncidentOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-rose-600 text-white hover:bg-rose-700"
                >
                  Submit Incident Triage
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal: Log Audit Issue ── */}
      {logIssueOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Log Internal Audit or Regulatory Finding</h3>
              <button
                type="button"
                onClick={() => setLogIssueOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleCreateIssue} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Audit Finding Summary</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stale administrative access credentials detected during quarterly audit"
                  value={newIssueTitle}
                  onChange={(e) => setNewIssueTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Auditor Source</label>
                  <input
                    type="text"
                    value={newIssueSource}
                    onChange={(e) => setNewIssueSource(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Finding Severity</label>
                  <select
                    value={newIssueSev}
                    onChange={(e) => setNewIssueSev(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  >
                    <option value="Critical Finding">Critical Finding</option>
                    <option value="Moderate Finding">Moderate Finding</option>
                    <option value="Low Observation">Low Observation</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Remediation Owner</label>
                <input
                  type="text"
                  value={newIssueOwner}
                  onChange={(e) => setNewIssueOwner(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setLogIssueOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-amber-600 text-white hover:bg-amber-700"
                >
                  Log Finding
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
