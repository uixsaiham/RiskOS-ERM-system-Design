import { useState, useEffect } from 'react'
import {
  ArrowUpRight,
  ChevronRight,
  ClipboardCheck,
  CalendarCheck,
  AlertOctagon,
  Plus,
  Search,
  CheckCircle2,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui'

interface ControlOpsWorkspaceProps {
  routeId?: string
  onNavigate?: (routeId: string) => void
}

interface AssessmentCampaign {
  id: string
  title: string
  scope: string
  status: string
  progress: number
  effectiveCount: number
  deficientCount: number
  lead: string
  period: string
}

interface ScheduledTest {
  id: string
  controlId: string
  controlName: string
  testType: string
  sampleSize: string
  tester: string
  scheduledDate: string
  status: 'Scheduled' | 'In Progress' | 'Effective' | 'Deficient'
}

interface DeficiencyItem {
  id: string
  controlId: string
  controlName: string
  finding: string
  severity: 'Critical' | 'Moderate' | 'Low'
  remediationDue: string
  owner: string
  status: 'Remediating' | 'In Verification' | 'Resolved'
}

export function ControlOpsWorkspace({ routeId, onNavigate }: ControlOpsWorkspaceProps) {
  const getTabFromRoute = (id?: string) => {
    if (id === 'controls-testing') return 'testing'
    if (id === 'controls-deficiencies') return 'deficiencies'
    return 'assessments'
  }

  const [activeTab, setActiveTab] = useState<'assessments' | 'testing' | 'deficiencies'>(() =>
    getTabFromRoute(routeId)
  )
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setActiveTab(getTabFromRoute(routeId))
  }, [routeId])

  // Modals state
  const [scheduleTestOpen, setScheduleTestOpen] = useState(false)
  const [logDeficiencyOpen, setLogDeficiencyOpen] = useState(false)
  const [launchCampaignOpen, setLaunchCampaignOpen] = useState(false)

  // Master Data State
  const [campaignsList, setCampaignsList] = useState<AssessmentCampaign[]>([
    {
      id: 'CA-2026-H2',
      title: 'H2 2026 Core Financial & IT Controls Testing Cycle',
      scope: 'SOX 404 & ISO 27001 · 94 Controls Evaluated',
      status: 'In Progress',
      progress: 74,
      effectiveCount: 70,
      deficientCount: 4,
      lead: 'Priya Nair, Head of Operational Risk',
      period: 'Jul 01 – Dec 15, 2026',
    },
    {
      id: 'CA-2026-SOC2',
      title: 'SOC 2 Type II Annual Operating Effectiveness Audit',
      scope: 'Security, Availability & Confidentiality · 62 Controls',
      status: 'Fieldwork Underway',
      progress: 52,
      effectiveCount: 32,
      deficientCount: 0,
      lead: 'Sarah Chen, Security Operations Lead',
      period: 'Sep 01 – Nov 30, 2026',
    },
  ])

  const [testingList, setTestingList] = useState<ScheduledTest[]>([
    {
      id: 'TEST-104',
      controlId: 'CTL-001',
      controlName: 'Multi-Factor Authentication',
      testType: 'Automated Sample Test',
      sampleSize: '100% of Active IAM Accounts (1,420 accounts)',
      tester: 'James Wilson',
      scheduledDate: 'Oct 24, 2026',
      status: 'Scheduled',
    },
    {
      id: 'TEST-105',
      controlId: 'CTL-002',
      controlName: 'Endpoint Detection & Response',
      testType: 'Operational Re-Test',
      sampleSize: 'Random Sample of 50 Endpoints & 10 Staging Hosts',
      tester: 'Sarah Chen',
      scheduledDate: 'Oct 18, 2026',
      status: 'Scheduled',
    },
    {
      id: 'TEST-106',
      controlId: 'CTL-004',
      controlName: 'Incident Response Procedure',
      testType: 'Tabletop Simulation Drill',
      sampleSize: 'CSIRT Core Members & Executive Leadership',
      tester: 'Michael Brown',
      scheduledDate: 'Nov 22, 2026',
      status: 'Scheduled',
    },
    {
      id: 'TEST-107',
      controlId: 'CTL-003',
      controlName: 'Security Awareness Training',
      testType: 'Evidence Review',
      sampleSize: 'Q3 LMS Certificates & Repeat Failure Reports',
      tester: 'Emily Carter',
      scheduledDate: 'Dec 05, 2026',
      status: 'Scheduled',
    },
  ])

  const [deficienciesList, setDeficienciesList] = useState<DeficiencyItem[]>([
    {
      id: 'DEF-2026-04',
      controlId: 'CTL-002',
      controlName: 'Endpoint Detection & Response',
      finding: 'EDR coverage fell below 95% SLA in unmanaged staging VPCs.',
      severity: 'Moderate',
      remediationDue: 'Nov 15, 2026',
      owner: 'Sarah Chen',
      status: 'Remediating',
    },
    {
      id: 'DEF-2026-03',
      controlId: 'CTL-014',
      controlName: 'Production Database Backup Replication',
      finding: 'Frankfurt cross-region snapshot sync delayed by 45 minutes.',
      severity: 'Low',
      remediationDue: 'Oct 30, 2026',
      owner: 'David Kim',
      status: 'In Verification',
    },
  ])

  // New item form states
  const [newTestControlId, setNewTestControlId] = useState('CTL-001')
  const [newTestControlName, setNewTestControlName] = useState('Multi-Factor Authentication')
  const [newTestType, setNewTestType] = useState('Automated Sample Test')
  const [newTestTester, setNewTestTester] = useState('James Wilson')
  const [newTestDate, setNewTestDate] = useState('Nov 10, 2026')
  const [newTestSample, setNewTestSample] = useState('Sample of 100 User Accounts')

  const [newDefControlId, setNewDefControlId] = useState('CTL-001')
  const [newDefControlName, setNewDefControlName] = useState('Multi-Factor Authentication')
  const [newDefFinding, setNewDefFinding] = useState('')
  const [newDefSeverity, setNewDefSeverity] = useState<'Critical' | 'Moderate' | 'Low'>('Moderate')
  const [newDefOwner, setNewDefOwner] = useState('James Wilson')
  const [newDefDue, setNewDefDue] = useState('Nov 20, 2026')

  const [newCampTitle, setNewCampTitle] = useState('')
  const [newCampScope, setNewCampScope] = useState('All Business Units · Key Financial Controls')
  const [newCampLead, setNewCampLead] = useState('Priya Nair, Head of Operational Risk')

  // Form Handlers
  const handleScheduleTest = (e: React.FormEvent) => {
    e.preventDefault()
    const newId = `TEST-${108 + testingList.length}`
    const item: ScheduledTest = {
      id: newId,
      controlId: newTestControlId,
      controlName: newTestControlName,
      testType: newTestType,
      sampleSize: newTestSample,
      tester: newTestTester,
      scheduledDate: newTestDate,
      status: 'Scheduled',
    }
    setTestingList([item, ...testingList])
    setScheduleTestOpen(false)
  }

  const handleLogDeficiency = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDefFinding.trim()) return
    const newId = `DEF-2026-0${5 + deficienciesList.length}`
    const item: DeficiencyItem = {
      id: newId,
      controlId: newDefControlId,
      controlName: newDefControlName,
      finding: newDefFinding.trim(),
      severity: newDefSeverity,
      remediationDue: newDefDue,
      owner: newDefOwner,
      status: 'Remediating',
    }
    setDeficienciesList([item, ...deficienciesList])
    setNewDefFinding('')
    setLogDeficiencyOpen(false)
  }

  const handleLaunchCampaign = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCampTitle.trim()) return
    const newId = `CA-2026-Q${3 + campaignsList.length}`
    const item: AssessmentCampaign = {
      id: newId,
      title: newCampTitle.trim(),
      scope: newCampScope,
      status: 'Fieldwork Active',
      progress: 10,
      effectiveCount: 12,
      deficientCount: 1,
      lead: newCampLead,
      period: 'Nov 01 – Dec 31, 2026',
    }
    setCampaignsList([item, ...campaignsList])
    setNewCampTitle('')
    setLaunchCampaignOpen(false)
  }

  // Interactive Execution Actions
  const handleExecuteTest = (id: string, outcome: 'Effective' | 'Deficient') => {
    setTestingList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: outcome } : t))
    )
  }

  const handleResolveDeficiency = (id: string) => {
    setDeficienciesList((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'Resolved' } : d))
    )
  }

  // Filtered Lists
  const filteredTesting = testingList.filter((t) => {
    if (searchQuery && !t.controlName.toLowerCase().includes(searchQuery.toLowerCase()) && !t.controlId.toLowerCase().includes(searchQuery.toLowerCase()) && !t.id.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const filteredDeficiencies = deficienciesList.filter((d) => {
    if (searchQuery && !d.controlName.toLowerCase().includes(searchQuery.toLowerCase()) && !d.finding.toLowerCase().includes(searchQuery.toLowerCase()) && !d.id.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6 pb-12">
      {/* ── Page Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <nav className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
            <span>Controls</span>
            <ChevronRight className="size-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold">
              {activeTab === 'testing'
                ? 'Control Testing'
                : activeTab === 'deficiencies'
                ? 'Deficiencies'
                : 'Control Assessments'}
            </span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Control Assessments & Operating Effectiveness Testing
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Schedule periodic tests, evaluate control design and operating performance, and track deficiency remediation.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {activeTab === 'assessments' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setLaunchCampaignOpen(true)}
              className="gap-1.5 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-xs"
            >
              <Plus className="size-3.5" />
              <span>Launch Assessment Cycle</span>
            </Button>
          )}

          {activeTab === 'testing' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setScheduleTestOpen(true)}
              className="gap-1.5 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-xs"
            >
              <Plus className="size-3.5" />
              <span>Schedule Control Test</span>
            </Button>
          )}

          {activeTab === 'deficiencies' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setLogDeficiencyOpen(true)}
              className="gap-1.5 text-xs font-semibold bg-amber-600 text-white hover:bg-amber-700 shadow-xs"
            >
              <Plus className="size-3.5" />
              <span>Log Deficiency</span>
            </Button>
          )}

          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNavigate?.('controls')}
            className="gap-1.5 text-xs font-semibold border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-xs"
          >
            <span>Open Control Library</span>
            <ArrowUpRight className="size-3.5 text-slate-400" />
          </Button>
        </div>
      </div>

      {/* ── Modern Segmented Tabs ── */}
      <div className="inline-flex items-center gap-1 p-1 bg-slate-100/90 rounded-xl border border-slate-200/60 text-xs overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('assessments')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'assessments'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ClipboardCheck className="size-3.5" />
          <span>Assessment Campaigns ({campaignsList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('testing')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'testing'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CalendarCheck className="size-3.5" />
          <span>Testing Schedule ({testingList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('deficiencies')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'deficiencies'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <AlertOctagon className="size-3.5 text-amber-500" />
          <span>Deficiencies & Findings ({deficienciesList.length})</span>
        </button>
      </div>

      {/* ── Filter Toolbar ── */}
      <div className="flex items-center justify-between gap-3 p-3 bg-white border border-slate-200/80 rounded-xl shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 size-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search controls, tests, or owners..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
          />
        </div>
      </div>

      {/* ── Content: Campaigns ── */}
      {activeTab === 'assessments' && (
        <div className="space-y-4">
          {campaignsList.map((camp) => (
            <div
              key={camp.id}
              className="p-5 rounded-xl border border-slate-200/80 bg-white shadow-xs space-y-4 hover:border-slate-300 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-blue-600">{camp.id}</span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200/70">
                      <span className="size-1.5 rounded-full bg-blue-500" />
                      {camp.status}
                    </span>
                  </div>
                  <h3 className="font-semibold text-base text-slate-900 mt-1">
                    {camp.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{camp.scope}</p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs font-mono font-semibold text-blue-600">{camp.progress}% Completed</span>
                  <span className="text-[11px] text-slate-400 block">{camp.effectiveCount} effective · {camp.deficientCount} deficiencies</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${camp.progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                <span>Assessment Lead: <strong className="text-slate-700 font-medium">{camp.lead}</strong></span>
                <span>Testing Window: {camp.period}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Content: Testing Schedule ── */}
      {activeTab === 'testing' && (
        <div className="rounded-xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200/70 bg-slate-50/75 text-[11px] font-semibold text-slate-500">
                <th className="py-3 px-4">Test ID</th>
                <th className="py-3 px-4">Control Ref & Name</th>
                <th className="py-3 px-4">Testing Methodology</th>
                <th className="py-3 px-4">Assigned Tester</th>
                <th className="py-3 px-4">Scheduled Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Execute Test</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTesting.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-blue-600">{t.id}</td>
                  <td className="py-3 px-4">
                    <button
                      type="button"
                      onClick={() => onNavigate?.('controls')}
                      className="font-semibold text-slate-900 hover:underline hover:text-blue-600 block text-left"
                    >
                      {t.controlName}
                    </button>
                    <span className="font-mono text-[11px] text-slate-400">{t.controlId}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    <div className="font-medium text-slate-800">{t.testType}</div>
                    <span className="text-[11px] text-slate-400">{t.sampleSize}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{t.tester}</td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{t.scheduledDate}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                        t.status === 'Effective'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70'
                          : t.status === 'Deficient'
                          ? 'bg-rose-50 text-rose-700 border-rose-200/70'
                          : 'bg-blue-50 text-blue-700 border-blue-200/70'
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          t.status === 'Effective'
                            ? 'bg-emerald-500'
                            : t.status === 'Deficient'
                            ? 'bg-rose-500'
                            : 'bg-blue-500'
                        }`}
                      />
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {t.status === 'Scheduled' || t.status === 'In Progress' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleExecuteTest(t.id, 'Effective')}
                          className="text-xs h-6.5 px-2 font-semibold text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                        >
                          Pass
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleExecuteTest(t.id, 'Deficient')}
                          className="text-xs h-6.5 px-2 font-semibold text-rose-700 border-rose-200 hover:bg-rose-50"
                        >
                          Fail
                        </Button>
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                        <CheckCircle2 className="size-3 text-slate-400" />
                        Completed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Content: Deficiencies ── */}
      {activeTab === 'deficiencies' && (
        <div className="space-y-3.5">
          {filteredDeficiencies.map((d) => (
            <div
              key={d.id}
              className="p-5 rounded-xl border border-amber-200/80 bg-amber-50/15 space-y-3 shadow-xs hover:border-amber-300 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-amber-800">{d.id}</span>
                    <span className="font-mono text-xs font-medium text-slate-600">{d.controlId}</span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-100 text-amber-800 border border-amber-200">
                      <span className="size-1.5 rounded-full bg-amber-600" />
                      {d.severity} Finding
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm text-slate-900 mt-1">
                    {d.controlName}
                  </h3>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                    d.status === 'Resolved'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70'
                      : 'bg-blue-50 text-blue-700 border-blue-200/70'
                  }`}
                >
                  {d.status}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                Finding: {d.finding}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-amber-200/60 text-xs text-slate-500">
                <span>Remediation Owner: <strong className="text-slate-700 font-medium">{d.owner}</strong> (Due: {d.remediationDue})</span>
                {d.status !== 'Resolved' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleResolveDeficiency(d.id)}
                    className="text-xs h-7 px-2.5 font-semibold border-amber-300 text-amber-800 bg-white hover:bg-amber-50"
                  >
                    Verify & Close
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Modal: Schedule Test ── */}
      {scheduleTestOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Schedule Operating Effectiveness Test</h3>
              <button
                type="button"
                onClick={() => setScheduleTestOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleTest} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Control ID</label>
                  <input
                    type="text"
                    value={newTestControlId}
                    onChange={(e) => setNewTestControlId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Control Name</label>
                  <input
                    type="text"
                    value={newTestControlName}
                    onChange={(e) => setNewTestControlName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Test Methodology</label>
                  <select
                    value={newTestType}
                    onChange={(e) => setNewTestType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  >
                    <option value="Automated Sample Test">Automated Sample Test</option>
                    <option value="Operational Re-Test">Operational Re-Test</option>
                    <option value="Evidence Walkthrough">Evidence Walkthrough</option>
                    <option value="Tabletop Simulation Drill">Tabletop Simulation Drill</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Assigned Tester</label>
                  <input
                    type="text"
                    value={newTestTester}
                    onChange={(e) => setNewTestTester(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Scheduled Date</label>
                  <input
                    type="text"
                    value={newTestDate}
                    onChange={(e) => setNewTestDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Sample Size & Scope</label>
                  <input
                    type="text"
                    value={newTestSample}
                    onChange={(e) => setNewTestSample(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setScheduleTestOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Confirm Schedule
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal: Log Deficiency ── */}
      {logDeficiencyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Log Control Testing Deficiency</h3>
              <button
                type="button"
                onClick={() => setLogDeficiencyOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleLogDeficiency} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Control ID</label>
                  <input
                    type="text"
                    value={newDefControlId}
                    onChange={(e) => setNewDefControlId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Control Name</label>
                  <input
                    type="text"
                    value={newDefControlName}
                    onChange={(e) => setNewDefControlName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Deficiency / Exception Finding</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the control failure, sample exceptions, or operating gap..."
                  value={newDefFinding}
                  onChange={(e) => setNewDefFinding(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Severity</label>
                  <select
                    value={newDefSeverity}
                    onChange={(e) => setNewDefSeverity(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  >
                    <option value="Critical">Critical</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Remediation Owner</label>
                  <input
                    type="text"
                    value={newDefOwner}
                    onChange={(e) => setNewDefOwner(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Due Date</label>
                  <input
                    type="text"
                    value={newDefDue}
                    onChange={(e) => setNewDefDue(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setLogDeficiencyOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-amber-600 text-white hover:bg-amber-700"
                >
                  Log Deficiency
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal: Launch Campaign ── */}
      {launchCampaignOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Launch New Control Assessment Campaign</h3>
              <button
                type="button"
                onClick={() => setLaunchCampaignOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleLaunchCampaign} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Campaign Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q4 2026 Core Banking Cloud Security Assessment Cycle"
                  value={newCampTitle}
                  onChange={(e) => setNewCampTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Assessment Scope</label>
                <input
                  type="text"
                  value={newCampScope}
                  onChange={(e) => setNewCampScope(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Lead Assessment Coordinator</label>
                <input
                  type="text"
                  value={newCampLead}
                  onChange={(e) => setNewCampLead(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setLaunchCampaignOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Initiate Campaign
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
