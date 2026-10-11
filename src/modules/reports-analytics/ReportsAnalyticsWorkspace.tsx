import { useState, useEffect } from 'react'
import {
  Download,
  TrendingUp,
  ChevronRight,
  FileSpreadsheet,
  PieChart,
  Cpu,
  Bookmark,
  FileCheck2,
  Calendar,
  Plus,
  CheckCircle2,
  X,
  FileText,
} from 'lucide-react'
import { Button } from '@/components/ui'

interface ReportsAnalyticsWorkspaceProps {
  routeId?: string
  onNavigate?: (routeId: string) => void
}

type ReportTabKey = 'board' | 'rcsa' | 'regulatory' | 'saved' | 'analytics' | 'workflow'

interface WorkflowRule {
  id: string
  name: string
  trigger: string
  action: string
  status: 'Active (Automated)' | 'Paused'
}

interface SavedViewItem {
  id: string
  title: string
  description: string
  frequency: string
  format: string
  lastRun: string
  recipient: string
}

export function ReportsAnalyticsWorkspace({
  routeId,
  onNavigate: _onNavigate,
}: ReportsAnalyticsWorkspaceProps) {
  const getTabFromRoute = (id?: string): ReportTabKey => {
    if (id === 'analytics') return 'analytics'
    if (id === 'workflow') return 'workflow'
    if (id === 'reports-rcsa') return 'rcsa'
    if (id === 'reports-regulatory') return 'regulatory'
    if (id === 'reports-saved') return 'saved'
    return 'board'
  }

  const [activeTab, setActiveTab] = useState<ReportTabKey>(() => getTabFromRoute(routeId))

  useEffect(() => {
    setActiveTab(getTabFromRoute(routeId))
  }, [routeId])

  // Modals state
  const [reportPreviewOpen, setReportPreviewOpen] = useState(false)
  const [createWorkflowOpen, setCreateWorkflowOpen] = useState(false)
  const [exportNotice, setExportNotice] = useState<string | null>(null)

  const showExportNotice = (title: string) => {
    setExportNotice(`Generated & Downloaded: ${title}`)
    setTimeout(() => setExportNotice(null), 3000)
  }

  // Master Data State
  const boardPackSections = [
    {
      title: '1. Executive ERM Summary & Appetite Posture',
      summary: '248 Active Enterprise Risks evaluated. 12 Critical, 38 High. 27 risks exceed approved board appetite tolerance ceilings.',
      metrics: 'Portfolio Inherent: 18.4 · Residual: 11.2',
    },
    {
      title: '2. Top 5 Enterprise Escalations (Requiring Board Action)',
      summary: 'RSK-1042 (Cybersecurity Breach), RSK-1002 (DORA Regulatory Sanctions), RSK-1011 (Payment Engine Outage), RSK-1015 (Liquidity Squeeze), RSK-1024 (Third-Party Cloud Solvency).',
      metrics: 'Capital at Risk: $38.4M',
    },
    {
      title: '3. Internal Control Environment Effectiveness',
      summary: '186 Enterprise Controls registered. 124 Effective (67%), 38 Needs Improvement (20%), 24 Control Gaps (13%). Remediation plans active for all critical gaps.',
      metrics: 'Coverage Ratio: 88.4%',
    },
    {
      title: '4. Key Risk Indicator (KRI) Early-Warning Telemetry',
      summary: '2 KRI Breaches flagged in October: Critical CVE Patching Backlog (11 hosts vs 5 ceiling) and Failed Payment Batch Rate.',
      metrics: 'Mean MTTR: 14.2 Hours',
    },
  ]

  const savedViews: SavedViewItem[] = [
    {
      id: 'SAVED-01',
      title: 'Q4 Critical Cybersecurity Threat Heatmap Extract',
      description: 'Pre-filtered matrix of all IT and Cybersecurity threats with residual risk >= 16.',
      frequency: 'Monthly automated schedule',
      format: 'PDF Presentation & CSV Data',
      lastRun: 'Oct 10, 2026 · 09:30 UTC',
      recipient: 'Board Audit Committee & CISO',
    },
    {
      id: 'SAVED-02',
      title: 'EU DORA Operational Resiliency Third-Party Register',
      description: 'Critical ICT suppliers, contractual SLAs, concentration risk scores, and failover test results.',
      frequency: 'Bi-weekly automated export',
      format: 'XLSX Spreadsheet',
      lastRun: 'Oct 08, 2026 · 14:15 UTC',
      recipient: 'European Regulatory Affairs & CRO',
    },
    {
      id: 'SAVED-03',
      title: 'Board Risk Appetite Exceedance & Variance Log',
      description: 'All 27 active enterprise risks operating above approved board tolerance boundaries.',
      frequency: 'Weekly Monday briefing',
      format: 'Executive Summary PDF',
      lastRun: 'Oct 06, 2026 · 08:00 UTC',
      recipient: 'Executive Committee & ERM PMO',
    },
    {
      id: 'SAVED-04',
      title: 'SOX Section 404 Control Testing Deficiency Tracker',
      description: 'Active design and operational testing failures with linked remediation action owners.',
      frequency: 'Daily 06:00 UTC sync',
      format: 'CSV Export',
      lastRun: 'Today · 06:00 UTC',
      recipient: 'Internal Audit & External Audit Leads',
    },
  ]

  const [workflowRules, setWorkflowRules] = useState<WorkflowRule[]>([
    {
      id: 'WF-RULE-01',
      name: 'Critical Risk Above Appetite Escalation Rule',
      trigger: 'When Residual Risk Score >= 16 AND Appetite Status == "Breached"',
      action: 'Automatically notify Chief Risk Officer, create remediation action item, and add to Board Audit Agenda within 24 hours.',
      status: 'Active (Automated)',
    },
    {
      id: 'WF-RULE-02',
      name: 'KRI Red Threshold Breach SLA',
      trigger: 'When any KRI value enters Red Threshold status',
      action: 'Send urgent Slack and Email notification to Risk Owner and Department Manager; require formal response within 48 hours.',
      status: 'Active (Automated)',
    },
    {
      id: 'WF-RULE-03',
      name: 'Quarterly Risk Review Cadence Generator',
      trigger: '30 days prior to nextReviewDate',
      action: 'Generate draft assessment review task and assign to designated 1st-Line Risk Assessor.',
      status: 'Active (Automated)',
    },
  ])

  // New Workflow Form
  const [newWfName, setNewWfName] = useState('')
  const [newWfTrigger, setNewWfTrigger] = useState('When Control Testing Fails (Status == "Deficient")')
  const [newWfAction, setNewWfAction] = useState('Create high-priority Jira remediation ticket and notify Control Owner')

  const handleCreateWorkflow = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newWfName.trim()) return
    const newId = `WF-RULE-0${workflowRules.length + 1}`
    const rule: WorkflowRule = {
      id: newId,
      name: newWfName.trim(),
      trigger: newWfTrigger,
      action: newWfAction,
      status: 'Active (Automated)',
    }
    setWorkflowRules([...workflowRules, rule])
    setNewWfName('')
    setCreateWorkflowOpen(false)
  }

  const handleToggleWorkflow = (id: string) => {
    setWorkflowRules((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: r.status.includes('Active') ? 'Paused' : 'Active (Automated)',
            }
          : r
      )
    )
  }

  return (
    <div className="space-y-6 pb-12">
      {/* ── Toast notification ── */}
      {exportNotice && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-xs font-semibold text-emerald-800 shadow-xl animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* ── Page Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <nav className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
            <span>Insights</span>
            <ChevronRight className="size-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold">
              {activeTab === 'analytics'
                ? 'Analytics & Trends'
                : activeTab === 'workflow'
                ? 'Workflows & Automation'
                : activeTab === 'saved'
                ? 'Saved Views'
                : 'Executive Reports'}
            </span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {activeTab === 'analytics'
              ? 'Portfolio Risk Analytics & Trends'
              : activeTab === 'workflow'
              ? 'Workflow Engine & Automation'
              : activeTab === 'saved'
              ? 'Saved Views & Scheduled Extracts'
              : 'Board Risk Packs & Regulatory Extracts'}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            {activeTab === 'analytics'
              ? 'Portfolio risk distribution, department concentration, and control coverage telemetry.'
              : activeTab === 'workflow'
              ? 'Event-driven triggers, escalation paths, and automated remediation workflow rules.'
              : activeTab === 'saved'
              ? 'Recurring automated executive extracts and customized register queries.'
              : 'Executive presentation packs, RCSA summaries, and supervisory regulatory filings.'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {activeTab === 'workflow' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setCreateWorkflowOpen(true)}
              className="gap-1.5 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-xs"
            >
              <Plus className="size-3.5" />
              <span>Create Workflow Rule</span>
            </Button>
          )}

          <Button
            variant="primary"
            size="sm"
            onClick={() => setReportPreviewOpen(true)}
            className="gap-1.5 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 shadow-xs"
          >
            <Download className="size-3.5" />
            <span>Generate Executive Deck</span>
          </Button>
        </div>
      </div>

      {/* ── Modern Segmented Tabs ── */}
      <div className="inline-flex items-center gap-1 p-1 bg-slate-100/90 rounded-xl border border-slate-200/60 text-xs overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('board')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'board'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileSpreadsheet className="size-3.5" />
          <span>Board Risk Pack (Q4 2026)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('rcsa')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'rcsa'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileCheck2 className="size-3.5" />
          <span>RCSA Portfolio Summary</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('regulatory')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'regulatory'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileSpreadsheet className="size-3.5" />
          <span>Regulatory Filings (DORA / EBA)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'saved'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bookmark className="size-3.5" />
          <span>Saved Views ({savedViews.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'analytics'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <PieChart className="size-3.5" />
          <span>Risk Analytics</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('workflow')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'workflow'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Cpu className="size-3.5" />
          <span>Automated Workflows ({workflowRules.length})</span>
        </button>
      </div>

      {/* ── Content: Board Report ── */}
      {activeTab === 'board' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-blue-200/80 bg-blue-50/40 text-xs text-blue-900 leading-relaxed">
            <strong>Board Risk Committee Reporting Pack (Q4 2026):</strong> Prepared for the Board of Directors Risk & Audit Committee. Contains aggregated enterprise risk profile, material risk events, control effectiveness, and capital adequacy assessments.
          </div>

          <div className="space-y-3.5">
            {boardPackSections.map((sec) => (
              <div
                key={sec.title}
                className="p-5 rounded-xl border border-slate-200/80 bg-white shadow-xs space-y-2 hover:border-slate-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-semibold text-sm text-slate-900">{sec.title}</h3>
                  <span className="font-mono text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded-md">
                    {sec.metrics}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{sec.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Content: Saved Views ── */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedViews.map((view) => (
              <div
                key={view.id}
                className="p-5 rounded-xl border border-slate-200/80 bg-white shadow-xs space-y-3 hover:border-slate-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-blue-600">{view.id}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                    <Calendar className="size-3" />
                    {view.frequency}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-slate-900">{view.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{view.description}</p>
                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Format: <strong className="text-slate-800">{view.format}</strong></span>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => showExportNotice(view.title)}
                    className="text-xs font-semibold h-7 px-2.5 border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    Run Export
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Content: Analytics ── */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl border border-slate-200/80 bg-white shadow-xs space-y-3">
              <span className="text-xs font-medium text-slate-500">
                Department Concentration
              </span>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">Information Technology</span>
                    <strong className="text-rose-600 font-semibold">38%</strong>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '38%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">Finance & Treasury</span>
                    <strong className="text-amber-600 font-semibold">24%</strong>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '24%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">Operations & Payments</span>
                    <strong className="text-blue-600 font-semibold">20%</strong>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '20%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-200/80 bg-white shadow-xs space-y-2">
              <span className="text-xs font-medium text-slate-500">
                Control Effectiveness Ratio
              </span>
              <div className="text-center py-3">
                <span className="font-mono text-4xl font-extrabold text-emerald-600">67%</span>
                <p className="text-xs text-slate-500 mt-1">124 of 186 controls rated Effective</p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-md">
                  <TrendingUp className="size-3" />
                  <span>+4.2% improvement vs Q2</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-200/80 bg-white shadow-xs space-y-2">
              <span className="text-xs font-medium text-slate-500">
                Risk Velocity Index
              </span>
              <div className="text-center py-3">
                <span className="font-mono text-4xl font-extrabold text-amber-600">High</span>
                <p className="text-xs text-slate-500 mt-1">Threat onset speed (&lt; 24h impact)</p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200/60 px-2.5 py-0.5 rounded-md">
                  <span>Cyber & Geopolitical vectors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Content: Workflows ── */}
      {activeTab === 'workflow' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3.5">
            {workflowRules.map((wf) => (
              <div
                key={wf.id}
                className="p-5 rounded-xl border border-slate-200/80 bg-white shadow-xs space-y-3 hover:border-slate-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-blue-600">{wf.id}</span>
                    <h3 className="font-semibold text-sm text-slate-900">{wf.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                        wf.status.includes('Active')
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          wf.status.includes('Active') ? 'bg-emerald-500' : 'bg-slate-400'
                        }`}
                      />
                      {wf.status}
                    </span>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleToggleWorkflow(wf.id)}
                      className="text-xs h-6.5 px-2 font-medium"
                    >
                      {wf.status.includes('Active') ? 'Pause' : 'Activate'}
                    </Button>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70 text-xs space-y-2">
                  <div>
                    <span className="text-slate-400 font-semibold uppercase text-[10px] block">Trigger Condition</span>
                    <code className="text-blue-700 font-mono text-xs">{wf.trigger}</code>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold uppercase text-[10px] block">Automated Action</span>
                    <p className="text-slate-700 text-xs">{wf.action}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Content: RCSA or Regulatory ── */}
      {(activeTab === 'rcsa' || activeTab === 'regulatory') && (
        <div className="p-6 rounded-xl border border-slate-200/80 bg-white shadow-xs space-y-3.5 text-xs leading-relaxed">
          <h3 className="font-semibold text-sm text-slate-900">
            {activeTab === 'rcsa' ? 'Risk and Control Self-Assessment (RCSA) Summary' : 'DORA & Regulatory Compliance Disclosures'}
          </h3>
          <p className="text-slate-600">
            {activeTab === 'rcsa'
              ? 'This report consolidates operational unit evaluations across all 8 enterprise departments. Residual scores reflect weighted testing evidence and management certifications.'
              : 'Standardized regulatory extract formatted for financial market supervisory authorities (EBA, ECB, FinCEN, SEC). Includes ICT concentration, key third-party service provider registers, and major operational incident statistics.'}
          </p>
          <div className="pt-2 flex gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => showExportNotice('Official Regulatory Filing Package (PDF)')}
              className="text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 shadow-xs"
            >
              Download Official Regulatory Package (.PDF)
            </Button>
          </div>
        </div>
      )}

      {/* ── Modal: Report Preview & PDF Generation ── */}
      {reportPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="size-5 text-blue-600" />
                <h3 className="font-bold text-base text-slate-900">Executive Board Risk Deck Generator</h3>
              </div>
              <button
                type="button"
                onClick={() => setReportPreviewOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-semibold text-slate-800">Included Deck Sections:</div>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-blue-600 size-3.5" />
                    <span>Executive ERM Summary</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-blue-600 size-3.5" />
                    <span>Top 5 Escalations Dossier</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-blue-600 size-3.5" />
                    <span>Control Effectiveness Ratios</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-blue-600 size-3.5" />
                    <span>KRI Telemetry & Breaches</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Reporting Quarter</label>
                  <select defaultValue="q4_2026" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50 text-slate-900 focus:outline-none">
                    <option value="q4_2026">Q4 2026 (Annual Review)</option>
                    <option value="q3_2026">Q3 2026</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Executive Sign-Off</label>
                  <input
                    type="text"
                    defaultValue="Priya Nair, CRO"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setReportPreviewOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setReportPreviewOpen(false)
                  showExportNotice('Official Board Risk Deck (PDF)')
                }}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Download Official PDF Deck
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Create Workflow ── */}
      {createWorkflowOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Configure Automated Escalation Workflow</h3>
              <button
                type="button"
                onClick={() => setCreateWorkflowOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleCreateWorkflow} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Workflow Rule Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Instant Control Deficiency Pager Escalation"
                  value={newWfName}
                  onChange={(e) => setNewWfName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Trigger Condition</label>
                <input
                  type="text"
                  value={newWfTrigger}
                  onChange={(e) => setNewWfTrigger(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Automated Dispatch Action</label>
                <textarea
                  rows={2}
                  value={newWfAction}
                  onChange={(e) => setNewWfAction(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setCreateWorkflowOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save & Activate Rule
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
