import { useState, useEffect } from 'react'
import {
  CheckCircle2,
  ChevronRight,
  Download,
  Building2,
  Scale,
  Users,
  Cpu,
  Settings,
  FolderTree,
  Bell,
  KeyRound,
  Sliders,
  ShieldCheck,
  Save,
  RefreshCw,
  Layers,
  Plus,
  X,
  SlidersHorizontal,
} from 'lucide-react'
import { Button, Avatar } from '@/components/ui'

interface OrgAdminWorkspaceProps {
  routeId?: string
  onNavigate?: (routeId: string) => void
}

type TabKey = 'entities' | 'taxonomy' | 'appetite' | 'people' | 'integrations' | 'settings'
type SettingsSubTab = 'general' | 'scoring' | 'notifications' | 'security'

interface EntityItem {
  code: string
  name: string
  jurisdiction: string
  lob: string
  riskRating: string
  risksCount: string
}

interface PersonItem {
  name: string
  role: string
  email: string
  department: string
  ownedRisks: number
  status: string
}

interface AppetiteBandItem {
  category: string
  appetiteStatement: string
  thresholdScore: number
  currentResidual: number
  status: string
  isBreached: boolean
}

export function OrgAdminWorkspace({ routeId, onNavigate: _onNavigate }: OrgAdminWorkspaceProps) {
  const getTabFromRoute = (id?: string): TabKey => {
    if (id === 'people') return 'people'
    if (id === 'integrations') return 'integrations'
    if (id?.startsWith('settings')) return 'settings'
    if (id === 'org-taxonomy') return 'taxonomy'
    if (id === 'org-appetite') return 'appetite'
    return 'entities'
  }

  const getSettingsSubTabFromRoute = (id?: string): SettingsSubTab => {
    if (id === 'settings-scoring') return 'scoring'
    if (id === 'settings-notifications') return 'notifications'
    if (id === 'settings-security') return 'security'
    return 'general'
  }

  const [activeTab, setActiveTab] = useState<TabKey>(() => getTabFromRoute(routeId))
  const [settingsSubTab, setSettingsSubTab] = useState<SettingsSubTab>(() => getSettingsSubTabFromRoute(routeId))

  useEffect(() => {
    setActiveTab(getTabFromRoute(routeId))
    if (routeId?.startsWith('settings')) {
      setSettingsSubTab(getSettingsSubTabFromRoute(routeId))
    }
  }, [routeId])

  // Modals state
  const [addEntityOpen, setAddEntityOpen] = useState(false)
  const [addPersonOpen, setAddPersonOpen] = useState(false)
  const [editAppetiteBand, setEditAppetiteBand] = useState<AppetiteBandItem | null>(null)
  const [tempThreshold, setTempThreshold] = useState<number>(12)

  // Settings Save State
  const [saveSuccess, setSaveSuccess] = useState(false)
  const handleSaveSettings = () => {
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2500)
  }

  // Master Data State
  const [entitiesList, setEntitiesList] = useState<EntityItem[]>([
    {
      code: 'ENT-001',
      name: 'Northstar Financial Holdings Corp (Global Parent)',
      jurisdiction: 'United States (Delaware)',
      lob: 'Enterprise Group',
      riskRating: 'Moderate (11.4)',
      risksCount: '248 risks',
    },
    {
      code: 'ENT-002',
      name: 'Northstar Retail Banking & Clearing NA',
      jurisdiction: 'United States (Federal Reserve)',
      lob: 'Consumer & Commercial Banking',
      riskRating: 'High (13.8)',
      risksCount: '112 risks',
    },
    {
      code: 'ENT-003',
      name: 'Northstar European Payments Ltd',
      jurisdiction: 'European Union (ECB / DORA Supervised)',
      lob: 'Digital Payments & Treasury',
      riskRating: 'High (14.2)',
      risksCount: '86 risks',
    },
    {
      code: 'ENT-004',
      name: 'Northstar APAC Markets & Brokerage Pte Ltd',
      jurisdiction: 'Singapore (MAS)',
      lob: 'Institutional Securities',
      riskRating: 'Moderate (9.8)',
      risksCount: '50 risks',
    },
  ])

  const [appetiteBands, setAppetiteBands] = useState<AppetiteBandItem[]>([
    {
      category: 'Strategic Risks',
      appetiteStatement: 'Moderate appetite for calculated market expansion and fintech partnerships with strict M&A diligence.',
      thresholdScore: 14,
      currentResidual: 11,
      status: 'Within Appetite',
      isBreached: false,
    },
    {
      category: 'Cybersecurity & Tech',
      appetiteStatement: 'Low appetite for core system disruption, unauthorized access, or unencrypted sensitive customer data exposure.',
      thresholdScore: 12,
      currentResidual: 16,
      status: 'Breached (Variance: +4)',
      isBreached: true,
    },
    {
      category: 'Regulatory Compliance',
      appetiteStatement: 'Zero tolerance for willful or systemic non-compliance with AML, sanctions, or capital adequacy mandates.',
      thresholdScore: 10,
      currentResidual: 12,
      status: 'Breached (Variance: +2)',
      isBreached: true,
    },
    {
      category: 'Operational Risk',
      appetiteStatement: 'Moderate appetite for minor operational friction; low tolerance for payment clearing interruptions exceeding 15 minutes.',
      thresholdScore: 12,
      currentResidual: 10,
      status: 'Within Appetite',
      isBreached: false,
    },
  ])

  const [peopleList, setPeopleList] = useState<PersonItem[]>([
    {
      name: 'Priya Nair',
      role: 'Head of Operational Risk (2nd Line)',
      email: 'priya.nair@riskos.example',
      department: 'Enterprise Risk Management',
      ownedRisks: 14,
      status: 'Active Administrator',
    },
    {
      name: 'James Wilson',
      role: 'Head of IT & Infrastructure (1st Line)',
      email: 'j.wilson@riskos.example',
      department: 'IT',
      ownedRisks: 8,
      status: 'Risk & Control Owner',
    },
    {
      name: 'Sarah Chen',
      role: 'Security Operations Lead (1st Line)',
      email: 's.chen@riskos.example',
      department: 'IT',
      ownedRisks: 6,
      status: 'Control Tester',
    },
    {
      name: 'Marcus Vance',
      role: 'Head of Treasury (1st Line)',
      email: 'm.vance@riskos.example',
      department: 'Finance',
      ownedRisks: 5,
      status: 'Risk Owner',
    },
    {
      name: 'Elena Rostova',
      role: 'Chief Compliance Officer (2nd Line)',
      email: 'e.rostova@riskos.example',
      department: 'Legal & Compliance',
      ownedRisks: 7,
      status: 'Risk Approver',
    },
  ])

  const taxonomyCategories = [
    {
      code: 'TAX-CYB',
      l1: 'Cybersecurity & Technology Risk',
      description: 'Threats to information assets, core digital platforms, cloud architecture, and network perimeter security.',
      lead: 'James Wilson, Head of IT',
      appetiteLimit: 12,
      activeRisksCount: 52,
      avgResidualScore: 16.2,
      subcategories: [
        { code: 'CYB-01', name: 'External Cyber Attack, Ransomware & Advanced Threats', count: 18 },
        { code: 'CYB-02', name: 'Identity & Access Abuse, Credential Compromise', count: 14 },
        { code: 'CYB-03', name: 'Cloud Infrastructure & High-Availability Outages', count: 12 },
        { code: 'CYB-04', name: 'Sensitive Data Exfiltration & PII Leakage', count: 8 },
      ],
    },
    {
      code: 'TAX-OPS',
      l1: 'Operational & Execution Risk',
      description: 'Inadequate or failed internal processes, human error, transaction failures, and business disruption.',
      lead: 'Priya Nair, Head of Operational Risk',
      appetiteLimit: 12,
      activeRisksCount: 68,
      avgResidualScore: 10.8,
      subcategories: [
        { code: 'OPS-01', name: 'Core Payment Clearing & Transaction Settlement Latency', count: 24 },
        { code: 'OPS-02', name: 'Critical Third-Party Vendor & Supplier Failure', count: 22 },
        { code: 'OPS-03', name: 'Manual Process Breakdowns & Reconciliation Errors', count: 14 },
        { code: 'OPS-04', name: 'Physical Asset, Power & Data Center Resiliency', count: 8 },
      ],
    },
    {
      code: 'TAX-REG',
      l1: 'Regulatory, Legal & Compliance',
      description: 'Non-compliance with laws, statutory supervisory orders, sanctions, AML/KYC requirements, or licensing.',
      lead: 'Elena Rostova, Chief Compliance Officer',
      appetiteLimit: 10,
      activeRisksCount: 44,
      avgResidualScore: 12.4,
      subcategories: [
        { code: 'REG-01', name: 'Anti-Money Laundering (AML) & Sanctions Non-Compliance', count: 16 },
        { code: 'REG-02', name: 'EU DORA & Cross-Border ICT Operational Directives', count: 14 },
        { code: 'REG-03', name: 'Data Privacy Regulations (GDPR, CCPA, CPRA)', count: 8 },
        { code: 'REG-04', name: 'Consumer Financial Protection & Market Conduct', count: 6 },
      ],
    },
    {
      code: 'TAX-FIN',
      l1: 'Financial & Capital Risk',
      description: 'Liquidity shortfalls, market volatility, foreign exchange instability, counterparty default, and credit risk.',
      lead: 'Marcus Vance, Head of Treasury',
      appetiteLimit: 14,
      activeRisksCount: 38,
      avgResidualScore: 11.0,
      subcategories: [
        { code: 'FIN-01', name: 'Intraday Liquidity Squeeze & Cash Buffer Depletion', count: 14 },
        { code: 'FIN-02', name: 'Foreign Exchange (FX) & Cross-Currency Basis Swaps', count: 12 },
        { code: 'FIN-03', name: 'Institutional Counterparty Default & Exposure Limits', count: 12 },
      ],
    },
    {
      code: 'TAX-STR',
      l1: 'Strategic & Governance Risk',
      description: 'Adverse business decisions, competitive disruption, macroeconomic shock, and reputational contagion.',
      lead: 'David Kim, VP Strategy',
      appetiteLimit: 14,
      activeRisksCount: 46,
      avgResidualScore: 9.5,
      subcategories: [
        { code: 'STR-01', name: 'Fintech M&A Integration Delays & Technical Debt', count: 16 },
        { code: 'STR-02', name: 'Adverse Media Publicity & Brand Damage Contagion', count: 15 },
        { code: 'STR-03', name: 'Talent Retention & Key Executive Departure Risk', count: 15 },
      ],
    },
  ]

  const integrations = [
    {
      name: 'Jira Software & Service Management',
      type: 'Issue & Remediation Tracker',
      status: 'Connected',
      syncInterval: 'Every 15 mins',
      details: 'Syncs remediation action tickets directly to engineering sprints.',
    },
    {
      name: 'ServiceNow GRC & CMDB',
      type: 'Asset & Incident Ingestion',
      status: 'Connected',
      syncInterval: 'Real-time Webhook',
      details: 'Ingests infrastructure assets and operational P1/P2 incident events.',
    },
    {
      name: 'Okta Enterprise SSO & SCIM',
      type: 'Identity & Access Management',
      status: 'Connected',
      syncInterval: 'Continuous',
      details: 'Provisions risk owners and provides live MFA compliance telemetry for CTL-001.',
    },
    {
      name: 'AWS Security Hub & GuardDuty',
      type: 'Cloud Threat Telemetry',
      status: 'Connected',
      syncInterval: 'Hourly',
      details: 'Feeds vulnerability telemetry directly into KRI-02 metrics.',
    },
  ]

  // Form states
  const [newEntCode, setNewEntCode] = useState('ENT-005')
  const [newEntName, setNewEntName] = useState('')
  const [newEntJurisdiction, setNewEntJurisdiction] = useState('United Kingdom (FCA / PRA)')
  const [newEntLob, setNewEntLob] = useState('Institutional Wealth Management')

  const [newPersonName, setNewPersonName] = useState('')
  const [newPersonEmail, setNewPersonEmail] = useState('')
  const [newPersonDept, setNewPersonDept] = useState('IT')
  const [newPersonRole, setNewPersonRole] = useState('Risk & Control Owner')

  const handleCreateEntity = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEntName.trim()) return
    const item: EntityItem = {
      code: newEntCode,
      name: newEntName.trim(),
      jurisdiction: newEntJurisdiction,
      lob: newEntLob,
      riskRating: 'Moderate (10.5)',
      risksCount: '24 risks',
    }
    setEntitiesList([...entitiesList, item])
    setNewEntName('')
    setAddEntityOpen(false)
  }

  const handleCreatePerson = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPersonName.trim()) return
    const item: PersonItem = {
      name: newPersonName.trim(),
      email: newPersonEmail || `${newPersonName.toLowerCase().replace(/\s+/g, '.')}@riskos.example`,
      department: newPersonDept,
      role: newPersonRole,
      ownedRisks: 2,
      status: 'Active User',
    }
    setPeopleList([...peopleList, item])
    setNewPersonName('')
    setNewPersonEmail('')
    setAddPersonOpen(false)
  }

  const handleOpenAppetiteModal = (band: AppetiteBandItem) => {
    setEditAppetiteBand(band)
    setTempThreshold(band.thresholdScore)
  }

  const handleSaveAppetiteThreshold = () => {
    if (!editAppetiteBand) return
    setAppetiteBands((prev) =>
      prev.map((b) => {
        if (b.category !== editAppetiteBand.category) return b
        const isBreached = b.currentResidual > tempThreshold
        const variance = b.currentResidual - tempThreshold
        return {
          ...b,
          thresholdScore: tempThreshold,
          isBreached,
          status: isBreached ? `Breached (Variance: +${variance})` : 'Within Appetite',
        }
      })
    )
    setEditAppetiteBand(null)
  }

  return (
    <div className="space-y-6 pb-12">
      {/* ── Page Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <nav className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
            <span>Organization</span>
            <ChevronRight className="size-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold">
              {activeTab === 'people'
                ? 'People & Roles'
                : activeTab === 'integrations'
                ? 'Integrations'
                : activeTab === 'taxonomy'
                ? 'Risk Taxonomy'
                : activeTab === 'appetite'
                ? 'Risk Appetite'
                : activeTab === 'settings'
                ? 'Settings'
                : 'Legal Entities'}
            </span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {activeTab === 'people'
              ? 'People, Risk Owners & RACI Governance'
              : activeTab === 'integrations'
              ? 'Enterprise GRC & Cloud Integrations'
              : activeTab === 'taxonomy'
              ? 'Enterprise Risk Taxonomy & Classification'
              : activeTab === 'appetite'
              ? 'Board Risk Appetite & Tolerance Framework'
              : activeTab === 'settings'
              ? 'Workspace Configuration & Preferences'
              : 'Legal Entities & Business Units'}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            {activeTab === 'taxonomy'
              ? 'Standardized hierarchy of enterprise risk categories, subcategories, and governance ownership.'
              : activeTab === 'settings'
              ? 'Configure scoring methodology, matrix thresholds, automated alerts, and SSO security.'
              : 'Manage organizational boundaries, board risk appetite limits, role assignments, and system connectors.'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {activeTab === 'entities' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setAddEntityOpen(true)}
              className="gap-1.5 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-xs"
            >
              <Plus className="size-3.5" />
              <span>Add Entity</span>
            </Button>
          )}

          {activeTab === 'people' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setAddPersonOpen(true)}
              className="gap-1.5 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-xs"
            >
              <Plus className="size-3.5" />
              <span>Add Team Member</span>
            </Button>
          )}

          {activeTab === 'settings' ? (
            <Button
              variant="primary"
              size="sm"
              onClick={handleSaveSettings}
              className="gap-1.5 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-xs"
            >
              <Save className="size-3.5" />
              <span>{saveSuccess ? 'Changes Saved!' : 'Save Configuration'}</span>
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => window.print()}
              className="gap-1.5 text-xs font-semibold border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-xs"
            >
              <Download className="size-3.5 text-slate-500" />
              <span>Export Record</span>
            </Button>
          )}
        </div>
      </div>

      {/* ── Modern Segmented Tabs ── */}
      <div className="inline-flex items-center gap-1 p-1 bg-slate-100/90 rounded-xl border border-slate-200/60 text-xs overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('entities')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'entities'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Building2 className="size-3.5" />
          <span>Legal Entities ({entitiesList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('taxonomy')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'taxonomy'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FolderTree className="size-3.5" />
          <span>Risk Taxonomy ({taxonomyCategories.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('appetite')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'appetite'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Scale className="size-3.5" />
          <span>Risk Appetite Framework</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('people')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'people'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="size-3.5" />
          <span>People & Roles ({peopleList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('integrations')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'integrations'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Cpu className="size-3.5" />
          <span>Integrations ({integrations.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'settings'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Settings className="size-3.5" />
          <span>System Settings</span>
        </button>
      </div>

      {/* ── Content: Entities ── */}
      {activeTab === 'entities' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {entitiesList.map((ent) => (
            <div
              key={ent.code}
              className="p-5 rounded-xl border border-slate-200/80 bg-white shadow-xs space-y-3.5 hover:border-slate-300 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-blue-600">{ent.code}</span>
                <span className="text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200/60 px-2 py-0.5 rounded-md">
                  {ent.risksCount}
                </span>
              </div>
              <h3 className="font-semibold text-sm text-slate-900">{ent.name}</h3>
              <p className="text-xs text-slate-500">{ent.lob} · {ent.jurisdiction}</p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Average Residual Exposure:</span>
                <strong className="text-slate-800 font-semibold">{ent.riskRating}</strong>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Content: Risk Taxonomy ── */}
      {activeTab === 'taxonomy' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-blue-200/80 bg-blue-50/40 text-xs text-blue-900 flex items-center justify-between">
            <div>
              <strong>Enterprise Risk Taxonomy (ISO 31000 & Basel II Compliant):</strong> Standardized L1 categories and L2 sub-risk classifications mapped across all organizational legal entities.
            </div>
            <span className="text-blue-700 font-mono font-semibold shrink-0 ml-4">5 L1 Categories · 19 L2 Branches</span>
          </div>

          <div className="space-y-4">
            {taxonomyCategories.map((cat) => (
              <div
                key={cat.code}
                className="p-5 rounded-xl border border-slate-200/80 bg-white shadow-xs space-y-4 hover:border-slate-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-md">
                      {cat.code}
                    </span>
                    <div>
                      <h3 className="font-semibold text-sm text-slate-900">{cat.l1}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{cat.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs shrink-0">
                    <span className="text-slate-500">
                      Appetite Ceiling: <strong className="text-slate-900">{cat.appetiteLimit} / 25</strong>
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-blue-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md font-mono">
                      {cat.activeRisksCount} active risks
                    </span>
                  </div>
                </div>

                {/* Subcategories (L2) */}
                <div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    L2 Sub-Risk Classifications
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {cat.subcategories.map((sub) => (
                      <div
                        key={sub.code}
                        className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200/70 bg-slate-50/60 text-xs hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] font-semibold text-slate-500">{sub.code}</span>
                          <span className="font-medium text-slate-800">{sub.name}</span>
                        </div>
                        <span className="font-mono text-[11px] text-slate-600 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs">
                          {sub.count} risks
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                  <span>Assigned 2nd-Line Governance Lead: <strong className="text-slate-800 font-medium">{cat.lead}</strong></span>
                  <span>Average Residual Score: <strong className={cat.avgResidualScore > cat.appetiteLimit ? 'text-rose-600 font-semibold' : 'text-slate-800 font-semibold'}>{cat.avgResidualScore}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Content: Appetite Framework ── */}
      {activeTab === 'appetite' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-blue-200/80 bg-blue-50/40 text-xs text-blue-900 leading-relaxed">
            <strong>Board-Approved Risk Appetite Statement (2026):</strong> RiskOS enforces automatic escalation when any operational or cybersecurity threat score exceeds designated risk tolerance thresholds.
          </div>

          <div className="space-y-3.5">
            {appetiteBands.map((band) => (
              <div
                key={band.category}
                className="p-5 rounded-xl border border-slate-200/80 bg-white shadow-xs space-y-2.5 hover:border-slate-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-semibold text-sm text-slate-900">{band.category}</h3>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium border ${
                        band.isBreached
                          ? 'bg-rose-50 text-rose-700 border-rose-200/70'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200/70'
                      }`}
                    >
                      <span className={`size-1.5 rounded-full ${band.isBreached ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                      {band.status}
                    </span>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleOpenAppetiteModal(band)}
                      className="text-xs h-6.5 px-2 font-medium"
                    >
                      <SlidersHorizontal className="size-3" />
                      <span>Calibrate</span>
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{band.appetiteStatement}</p>
                <div className="flex items-center gap-6 pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <span>Approved Ceiling Score: <strong className="text-slate-800 font-semibold">{band.thresholdScore} / 25</strong></span>
                  <span>Current Portfolio Residual: <strong className="text-rose-600 font-semibold">{band.currentResidual} / 25</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Content: People ── */}
      {activeTab === 'people' && (
        <div className="rounded-xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200/70 bg-slate-50/75 text-[11px] font-semibold text-slate-500">
                <th className="py-3 px-4">User & Identity</th>
                <th className="py-3 px-4">Organization Role</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Assigned Risks</th>
                <th className="py-3 px-4 text-right">Governance Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {peopleList.map((user) => (
                <tr key={user.email} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={user.name} size="sm" />
                      <div>
                        <div className="font-semibold text-slate-900">{user.name}</div>
                        <span className="text-[11px] text-slate-400 font-mono">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{user.role}</td>
                  <td className="py-3 px-4 text-slate-600">{user.department}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-blue-600">{user.ownedRisks} items</td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200/60">
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Content: Integrations ── */}
      {activeTab === 'integrations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((item) => (
            <div
              key={item.name}
              className="p-5 rounded-xl border border-slate-200/80 bg-white shadow-xs space-y-3.5 hover:border-slate-300 transition-all"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-slate-900">{item.name}</h3>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="size-3 text-emerald-600" />
                  {item.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{item.details}</p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>{item.type}</span>
                <span className="font-mono text-slate-500">{item.syncInterval}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Content: System Settings ── */}
      {activeTab === 'settings' && (
        <div className="space-y-5">
          {/* Settings Sub-Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <button
              type="button"
              onClick={() => setSettingsSubTab('general')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                settingsSubTab === 'general'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sliders className="size-3.5" />
              <span>General Workspace</span>
            </button>
            <button
              type="button"
              onClick={() => setSettingsSubTab('scoring')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                settingsSubTab === 'scoring'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="size-3.5" />
              <span>Scoring Methodology</span>
            </button>
            <button
              type="button"
              onClick={() => setSettingsSubTab('notifications')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                settingsSubTab === 'notifications'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Bell className="size-3.5" />
              <span>Notifications & Escalations</span>
            </button>
            <button
              type="button"
              onClick={() => setSettingsSubTab('security')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                settingsSubTab === 'security'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <KeyRound className="size-3.5" />
              <span>Security & SSO</span>
            </button>
          </div>

          {/* Sub-Tab: General Settings */}
          {settingsSubTab === 'general' && (
            <div className="p-5 rounded-xl border border-slate-200/80 bg-white shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-semibold text-sm text-slate-900">Workspace & Currency Calibration</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Enterprise organization properties and review intervals</p>
                </div>
                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Production Mode
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Enterprise Entity Legal Name</label>
                  <input
                    type="text"
                    defaultValue="Northstar Financial Holdings Corp"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50 text-slate-900 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Primary Reporting Currency</label>
                  <select
                    defaultValue="USD"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50 text-slate-900 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="USD">USD ($) — United States Dollar</option>
                    <option value="EUR">EUR (€) — Euro</option>
                    <option value="GBP">GBP (£) — British Pound</option>
                    <option value="SGD">SGD ($) — Singapore Dollar</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Critical Risk Mandatory Review Cycle</label>
                  <select
                    defaultValue="90"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50 text-slate-900 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="30">Every 30 Days (High Velocity)</option>
                    <option value="90">Every 90 Days (Quarterly — Standard)</option>
                    <option value="180">Every 180 Days (Semi-Annual)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Automated Risk ID Sequence Format</label>
                  <input
                    type="text"
                    defaultValue="RSK-[0-9]{4}"
                    disabled
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-100 text-slate-500 font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Sub-Tab: Scoring Methodology */}
          {settingsSubTab === 'scoring' && (
            <div className="p-5 rounded-xl border border-slate-200/80 bg-white shadow-xs space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="font-semibold text-sm text-slate-900">5×5 Multiplicative Scoring Model</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  RiskOS evaluates risk magnitude via: <strong className="text-slate-800 font-semibold">Magnitude = Likelihood (1–5) × Impact (1–5)</strong>
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/70">
                  <span className="font-semibold text-emerald-800 block">Low Severity</span>
                  <span className="text-[11px] text-emerald-700">Scores 1 – 4 (Appetite: Accepted)</span>
                </div>
                <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/70">
                  <span className="font-semibold text-amber-800 block">Moderate Severity</span>
                  <span className="text-[11px] text-amber-700">Scores 5 – 9 (Appetite: Monitored)</span>
                </div>
                <div className="p-3.5 rounded-xl bg-orange-50/70 border border-orange-200/70">
                  <span className="font-semibold text-orange-800 block">High Severity</span>
                  <span className="text-[11px] text-orange-700">Scores 10 – 15 (Appetite: Escalated)</span>
                </div>
                <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200/70">
                  <span className="font-semibold text-rose-800 block">Critical Severity</span>
                  <span className="text-[11px] text-rose-700">Scores 16 – 25 (Appetite: Breached)</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200/60 leading-relaxed">
                <strong>Residual Risk Control Mitigation Formula:</strong> Control effectiveness degrades inherent impact & likelihood scores by 20% to 50% depending on design rating and operational testing outcomes.
              </div>
            </div>
          )}

          {/* Sub-Tab: Notifications & Escalations */}
          {settingsSubTab === 'notifications' && (
            <div className="p-5 rounded-xl border border-slate-200/80 bg-white shadow-xs space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="font-semibold text-sm text-slate-900">Automated Alert Triggers & Notification Channels</h3>
                <p className="text-xs text-slate-500 mt-0.5">Control email delivery schedules, webhook broadcasts, and executive summaries</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200/70 bg-slate-50/50">
                  <div>
                    <div className="font-semibold text-slate-800">Critical Risk Above Appetite Instant Alert</div>
                    <p className="text-slate-500 text-[11px]">Notify CISO, Head of Operational Risk, and Risk Owner immediately via Email & Slack</p>
                  </div>
                  <input type="checkbox" defaultChecked className="size-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200/70 bg-slate-50/50">
                  <div>
                    <div className="font-semibold text-slate-800">Key Risk Indicator (KRI) Red Threshold Breach</div>
                    <p className="text-slate-500 text-[11px]">Dispatch urgent pager notification to designated first-line metric owners</p>
                  </div>
                  <input type="checkbox" defaultChecked className="size-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200/70 bg-slate-50/50">
                  <div>
                    <div className="font-semibold text-slate-800">Weekly Executive Risk Digest</div>
                    <p className="text-slate-500 text-[11px]">Send weekly PDF summary of overdue actions, KRI movements, and new assessments every Monday 08:00 UTC</p>
                  </div>
                  <input type="checkbox" defaultChecked className="size-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer" />
                </div>
              </div>
            </div>
          )}

          {/* Sub-Tab: Security & SSO */}
          {settingsSubTab === 'security' && (
            <div className="p-5 rounded-xl border border-slate-200/80 bg-white shadow-xs space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="font-semibold text-sm text-slate-900">Enterprise SSO & Role-Based Access Control (RBAC)</h3>
                <p className="text-xs text-slate-500 mt-0.5">Identity authentication, session security, and directory synchronization</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl border border-emerald-200/80 bg-emerald-50/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-emerald-800">SAML 2.0 / Okta SSO</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                      <ShieldCheck className="size-3 text-emerald-600" />
                      Active & Enforced
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px]">All RiskOS employees authenticate via central identity provider. Password authentication disabled.</p>
                </div>

                <div className="p-4 rounded-xl border border-blue-200/80 bg-blue-50/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-blue-800">SCIM 2.0 User Provisioning</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200">
                      <RefreshCw className="size-3 text-blue-600" />
                      Continuous Sync
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px]">User departments, risk ownership eligibility, and role permissions synced automatically from Okta.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3 text-xs">
                <div className="font-semibold text-slate-800">Session Security Parameters</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-600">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Inactivity Auto-Logout:</span>
                    <span className="font-semibold text-slate-800">30 minutes</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">MFA Enforcement:</span>
                    <span className="font-semibold text-slate-800">Hardware FIDO2 Security Keys / WebAuthn</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Modal: Add Legal Entity ── */}
      {addEntityOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Add Legal Entity / Operating Subsidiary</h3>
              <button
                type="button"
                onClick={() => setAddEntityOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEntity} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Entity Code</label>
                  <input
                    type="text"
                    value={newEntCode}
                    onChange={(e) => setNewEntCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
                <div className="col-span-2 space-y-1">
                  <label className="font-semibold text-slate-700">Entity Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Northstar UK Private Wealth Ltd"
                    value={newEntName}
                    onChange={(e) => setNewEntName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Regulatory Jurisdiction</label>
                <input
                  type="text"
                  value={newEntJurisdiction}
                  onChange={(e) => setNewEntJurisdiction(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Line of Business (LOB)</label>
                <input
                  type="text"
                  value={newEntLob}
                  onChange={(e) => setNewEntLob(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setAddEntityOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Create Entity
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal: Add Person ── */}
      {addPersonOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Provision Team Member & Risk Owner</h3>
              <button
                type="button"
                onClick={() => setAddPersonOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePerson} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rachel Sterling"
                  value={newPersonName}
                  onChange={(e) => setNewPersonName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Corporate Email</label>
                  <input
                    type="email"
                    placeholder="r.sterling@riskos.example"
                    value={newPersonEmail}
                    onChange={(e) => setNewPersonEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Department</label>
                  <select
                    value={newPersonDept}
                    onChange={(e) => setNewPersonDept(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  >
                    <option value="IT">IT & Cybersecurity</option>
                    <option value="Enterprise Risk Management">Enterprise Risk Management</option>
                    <option value="Finance">Treasury & Finance</option>
                    <option value="Operations">Operations</option>
                    <option value="Legal & Compliance">Legal & Compliance</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Role Designation</label>
                <input
                  type="text"
                  value={newPersonRole}
                  onChange={(e) => setNewPersonRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setAddPersonOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save Person
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal: Calibrate Appetite Threshold ── */}
      {editAppetiteBand && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="font-mono text-xs font-semibold text-blue-600">Board Appetite Ceiling</span>
                <h3 className="font-bold text-base text-slate-900">Calibrate {editAppetiteBand.category}</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditAppetiteBand(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-slate-600 leading-relaxed">{editAppetiteBand.appetiteStatement}</p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between font-semibold text-slate-800">
                  <span>Approved Ceiling Score</span>
                  <span className="font-mono text-lg text-blue-600">{tempThreshold} / 25</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="20"
                  step="1"
                  value={tempThreshold}
                  onChange={(e) => setTempThreshold(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Score 4 (Low Appetite)</span>
                  <span>Score 12</span>
                  <span>Score 20 (High Appetite)</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-200 text-slate-700 leading-relaxed">
                Current Portfolio Residual Exposure is <strong>{editAppetiteBand.currentResidual} / 25</strong>. Setting ceiling to <strong>{tempThreshold}</strong> will classify this category as{' '}
                <strong className={editAppetiteBand.currentResidual > tempThreshold ? 'text-rose-600' : 'text-emerald-600'}>
                  {editAppetiteBand.currentResidual > tempThreshold ? 'Breached' : 'Within Appetite'}
                </strong>.
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setEditAppetiteBand(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveAppetiteThreshold}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Update Board Ceiling
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
