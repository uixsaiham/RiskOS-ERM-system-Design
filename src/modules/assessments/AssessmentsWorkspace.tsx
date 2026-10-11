import { useState, useEffect } from 'react'
import {
  Play,
  ArrowUpRight,
  ChevronRight,
  Layers,
  FileSpreadsheet,
  History,
  Plus,
  Search,
  X,
  Eye,
} from 'lucide-react'
import { Button } from '@/components/ui'

interface AssessmentsWorkspaceProps {
  routeId?: string
  onNavigate?: (routeId: string) => void
}

interface CampaignItem {
  id: string
  title: string
  scope: string
  startDate: string
  dueDate: string
  progress: number
  completedCount: number
  totalCount: number
  status: 'Active' | 'In Progress' | 'Completed'
  leadAssessor: string
}

interface TemplateItem {
  id: string
  name: string
  description: string
  ratingBands: string
  standard: string
  criteriaDetails?: string[]
}

interface HistoryItem {
  id: string
  riskId: string
  riskTitle: string
  assessor: string
  date: string
  inherentScore: string
  residualScore: string
  outcome: string
}

export function AssessmentsWorkspace({ routeId, onNavigate }: AssessmentsWorkspaceProps) {
  const getTabFromRoute = (id?: string) => {
    if (id === 'assessments-templates') return 'templates'
    if (id === 'assessments-history') return 'history'
    return 'active'
  }

  const [activeTab, setActiveTab] = useState<'active' | 'templates' | 'history'>(() =>
    getTabFromRoute(routeId)
  )
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setActiveTab(getTabFromRoute(routeId))
  }, [routeId])

  // Modals state
  const [createCampaignOpen, setCreateCampaignOpen] = useState(false)
  const [inspectTemplate, setInspectTemplate] = useState<TemplateItem | null>(null)

  // Master Data State
  const [campaignsList, setCampaignsList] = useState<CampaignItem[]>([
    {
      id: 'CMP-2026-Q4',
      title: 'Q4 2026 Annual Enterprise Risk & Resilience Campaign',
      scope: 'All 8 Departments · 248 Enterprise Risks',
      startDate: 'Oct 01, 2026',
      dueDate: 'Nov 30, 2026',
      progress: 68,
      completedCount: 168,
      totalCount: 248,
      status: 'Active',
      leadAssessor: 'Priya Nair, Head of Operational Risk',
    },
    {
      id: 'CMP-CYBER-26',
      title: 'IT & Cybersecurity Critical Threat Assessment (DORA & NIS2)',
      scope: 'IT & Infrastructure · 34 High-Impact Risks',
      startDate: 'Sep 15, 2026',
      dueDate: 'Oct 31, 2026',
      progress: 88,
      completedCount: 30,
      totalCount: 34,
      status: 'Active',
      leadAssessor: 'James Wilson, Head of IT',
    },
    {
      id: 'CMP-THIRD-PARTY',
      title: 'Tier-1 Critical Cloud Vendor Supply Chain Assessment',
      scope: 'Procurement & Legal · 18 Vendor Risks',
      startDate: 'Oct 10, 2026',
      dueDate: 'Dec 15, 2026',
      progress: 22,
      completedCount: 4,
      totalCount: 18,
      status: 'In Progress',
      leadAssessor: 'Elena Rostova, Chief Compliance Officer',
    },
  ])

  const templates: TemplateItem[] = [
    {
      id: 'TMPL-5X5-ERM',
      name: 'Standard 5×5 Enterprise Likelihood & Impact Matrix',
      description: 'Standard ERM model evaluating Likelihood (1–5) and Financial/Operational Impact (1–5).',
      ratingBands: 'Low (1–4), Moderate (5–9), High (10–15), Critical (16–25)',
      standard: 'ISO 31000 & COSO ERM 2017',
      criteriaDetails: [
        'Likelihood: 1 (Rare, <5%), 2 (Unlikely, 5-20%), 3 (Possible, 21-50%), 4 (Likely, 51-80%), 5 (Almost Certain, >80%)',
        'Impact: 1 (Negligible <$50K), 2 (Minor <$250K), 3 (Moderate <$1M), 4 (Major <$5M), 5 (Catastrophic >$5M)',
        'Residual Formula: Inherent Score discounted by Control Design & Operational Testing Effectiveness',
      ],
    },
    {
      id: 'TMPL-DORA-ICT',
      name: 'DORA Article 6 ICT Risk Assessment Framework',
      description: 'European Digital Operational Resilience Act assessment for financial entities.',
      ratingBands: 'ICT Criticality Tier 1–4, Severe Outage Potential',
      standard: 'EU DORA (Regulation 2022/2554)',
      criteriaDetails: [
        'Classification of ICT services supporting critical or important functions',
        'RTO (Recovery Time Objective) and RPO (Recovery Point Objective) compliance',
        'Concentration risk assessment of single-point-of-failure cloud service providers',
      ],
    },
    {
      id: 'TMPL-RCSA-OPS',
      name: 'RCSA Operational Risk & Control Evaluation Matrix',
      description: 'Comprehensive risk and control self-assessment scoring residual vulnerability after testing.',
      ratingBands: 'Design Effectiveness + Operational Testing Score',
      standard: 'Basel Committee on Banking Supervision (BCBS)',
      criteriaDetails: [
        'Process identification and baseline risk mapping across 1st line business units',
        'Key control design gap validation against organizational policy standards',
        'Residual risk exposure sign-off by designated Line of Business executive',
      ],
    },
  ]

  const history: HistoryItem[] = [
    {
      id: 'EVL-2026-0928',
      riskId: 'RSK-1042',
      riskTitle: 'Cybersecurity Breach',
      assessor: 'James Wilson',
      date: 'Sep 28, 2026',
      inherentScore: '22 / 25 (Critical)',
      residualScore: '16 / 25 (High)',
      outcome: 'Mitigation Required · Above Appetite',
    },
    {
      id: 'EVL-2026-0914',
      riskId: 'RSK-1002',
      riskTitle: 'Regulatory Non-Compliance Penalty',
      assessor: 'Elena Rostova',
      date: 'Sep 14, 2026',
      inherentScore: '18 / 25 (Critical)',
      residualScore: '12 / 25 (High)',
      outcome: 'Within Appetite',
    },
    {
      id: 'EVL-2026-0830',
      riskId: 'RSK-1011',
      riskTitle: 'Cloud Service Interruption',
      assessor: 'Michael Brown',
      date: 'Aug 30, 2026',
      inherentScore: '15 / 25 (High)',
      residualScore: '8 / 25 (Moderate)',
      outcome: 'Mitigated by Controls',
    },
  ]

  // Form states
  const [newTitle, setNewTitle] = useState('')
  const [newScope, setNewScope] = useState('IT & Operations · 45 Risks')
  const [newDue, setNewDue] = useState('Dec 31, 2026')
  const [newLead, setNewLead] = useState('Priya Nair, Head of Operational Risk')

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    const newId = `CMP-2026-C${4 + campaignsList.length}`
    const item: CampaignItem = {
      id: newId,
      title: newTitle.trim(),
      scope: newScope,
      startDate: 'Today',
      dueDate: newDue,
      progress: 5,
      completedCount: 2,
      totalCount: 45,
      status: 'Active',
      leadAssessor: newLead,
    }
    setCampaignsList([item, ...campaignsList])
    setNewTitle('')
    setCreateCampaignOpen(false)
  }

  // Filtered lists
  const filteredCampaigns = campaignsList.filter((c) => {
    if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase()) && !c.id.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const filteredHistory = history.filter((h) => {
    if (searchQuery && !h.riskTitle.toLowerCase().includes(searchQuery.toLowerCase()) && !h.riskId.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6 pb-12">
      {/* ── Page Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <nav className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
            <span>Risk Management</span>
            <ChevronRight className="size-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold">
              {activeTab === 'templates'
                ? 'Assessment Templates'
                : activeTab === 'history'
                ? 'Assessment History'
                : 'Campaigns'}
            </span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Enterprise Risk Assessment Campaigns & Scoring
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Orchestrate recurring assessment cycles, calibrate inherent vs. residual exposure, and review historic evaluations.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {activeTab === 'active' && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCreateCampaignOpen(true)}
              className="gap-1.5 text-xs font-semibold border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-xs"
            >
              <Plus className="size-3.5 text-slate-500" />
              <span>Create Campaign</span>
            </Button>
          )}

          <Button
            variant="primary"
            size="sm"
            onClick={() => onNavigate?.('assess-RSK-1042')}
            className="gap-1.5 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-xs"
          >
            <Play className="size-3.5" />
            <span>Launch RSK-1042 Assessment</span>
          </Button>
        </div>
      </div>

      {/* ── Segmented Navigation Tabs ── */}
      <div className="inline-flex items-center gap-1 p-1 bg-slate-100/90 rounded-xl border border-slate-200/60 text-xs overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('active')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'active'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="size-3.5" />
          <span>Active Campaigns ({campaignsList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('templates')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'templates'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileSpreadsheet className="size-3.5" />
          <span>Assessment Templates ({templates.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'history'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <History className="size-3.5" />
          <span>Assessment History ({history.length})</span>
        </button>
      </div>

      {/* ── Search Toolbar ── */}
      <div className="flex items-center justify-between gap-3 p-3 bg-white border border-slate-200/80 rounded-xl shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 size-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search campaigns, risks, or templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
          />
        </div>
      </div>

      {/* ── Content: Active Campaigns ── */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredCampaigns.map((camp) => (
              <div
                key={camp.id}
                className="p-5 rounded-xl border border-slate-200/80 bg-white shadow-xs space-y-4 hover:border-slate-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-blue-600">{camp.id}</span>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                        {camp.status}
                      </span>
                    </div>
                    <h3 className="font-semibold text-base text-slate-900 mt-1">
                      {camp.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{camp.scope}</p>
                  </div>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onNavigate?.('assess-RSK-1042')}
                    className="gap-1.5 font-semibold text-xs border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs self-start sm:self-auto"
                  >
                    <span>Assess Next Risk</span>
                    <ArrowUpRight className="size-3.5" />
                  </Button>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      Campaign progress: <strong className="text-slate-900 font-semibold">{camp.completedCount} of {camp.totalCount} risks completed</strong>
                    </span>
                    <span className="font-mono font-semibold text-blue-600">{camp.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${camp.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <span>Lead Assessor: <strong className="text-slate-700 font-medium">{camp.leadAssessor}</strong></span>
                  <span>Timeline: {camp.startDate} – {camp.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Content: Templates ── */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templates.map((tmpl) => (
            <div
              key={tmpl.id}
              className="p-5 rounded-xl border border-slate-200/80 bg-white shadow-xs space-y-3 flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-blue-600">{tmpl.id}</span>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
                    {tmpl.standard}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-slate-900 leading-snug">{tmpl.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{tmpl.description}</p>
                <div className="pt-2 text-xs text-slate-600">
                  <span className="text-slate-400 block text-[11px]">Scoring Model:</span>
                  <strong className="text-slate-800">{tmpl.ratingBands}</strong>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setInspectTemplate(tmpl)}
                  className="gap-1.5 text-xs font-semibold border-slate-200 text-slate-700 hover:bg-slate-50 w-full"
                >
                  <Eye className="size-3.5 text-slate-400" />
                  <span>Inspect Methodology</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Content: Assessment History ── */}
      {activeTab === 'history' && (
        <div className="rounded-xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200/70 bg-slate-50/75 text-[11px] font-semibold text-slate-500">
                <th className="py-3 px-4">Evaluation ID & Risk</th>
                <th className="py-3 px-4">Assessor Lead</th>
                <th className="py-3 px-4">Date Completed</th>
                <th className="py-3 px-4">Inherent Score</th>
                <th className="py-3 px-4">Residual Score</th>
                <th className="py-3 px-4">Appetite & Outcome</th>
                <th className="py-3 px-4 text-right">View Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredHistory.map((h) => (
                <tr key={h.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{h.riskTitle}</div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span className="font-mono text-blue-600 font-medium">{h.id}</span>
                      <span>·</span>
                      <span className="font-mono">{h.riskId}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{h.assessor}</td>
                  <td className="py-3 px-4 text-slate-600">{h.date}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-800">{h.inherentScore}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-rose-600">{h.residualScore}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200/70">
                      {h.outcome}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onNavigate?.(`risk-${h.riskId}`)}
                      className="text-xs h-7 px-2.5 font-semibold border-slate-200 text-slate-700 hover:bg-slate-50"
                    >
                      Open Risk
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Modal: Create Campaign ── */}
      {createCampaignOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Initiate Risk Assessment Campaign</h3>
              <button
                type="button"
                onClick={() => setCreateCampaignOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Campaign Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q4 2026 Enterprise Risk Review Cycle"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Scope of Risks</label>
                  <input
                    type="text"
                    value={newScope}
                    onChange={(e) => setNewScope(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Completion Deadline</label>
                  <input
                    type="text"
                    value={newDue}
                    onChange={(e) => setNewDue(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Lead Risk Assessor</label>
                <input
                  type="text"
                  value={newLead}
                  onChange={(e) => setNewLead(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setCreateCampaignOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Launch Campaign
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal: Inspect Template ── */}
      {inspectTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="font-mono text-xs font-semibold text-blue-600">{inspectTemplate.id}</span>
                <h3 className="font-bold text-base text-slate-900">{inspectTemplate.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectTemplate(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-600 leading-relaxed">{inspectTemplate.description}</p>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-semibold text-slate-800">Scoring Bands & Formula:</span>
                <div className="text-slate-700 font-medium">{inspectTemplate.ratingBands}</div>
              </div>

              {inspectTemplate.criteriaDetails && (
                <div className="space-y-2">
                  <span className="font-semibold text-slate-800">Evaluation Criteria & Directives:</span>
                  <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                    {inspectTemplate.criteriaDetails.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setInspectTemplate(null)}
                className="bg-slate-900 text-white hover:bg-slate-800"
              >
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
