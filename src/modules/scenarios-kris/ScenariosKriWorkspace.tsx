import { useState, useEffect } from 'react'
import {
  ChevronRight,
  Download,
  Flame,
  Activity,
  AlertTriangle,
  Play,
  Plus,
  Search,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui'

interface ScenariosKriWorkspaceProps {
  routeId?: string
  onNavigate?: (routeId: string) => void
}

interface ScenarioItem {
  id: string
  title: string
  description: string
  lossEstimate: string
  recoveryTime: string
  linkedRiskId: string
  riskTitle: string
  frequency: string
  status: string
  lastSimulatedLoss?: number
}

interface KriItem {
  id: string
  name: string
  current: string
  amberLimit: string
  redLimit: string
  status: string
  statusType: 'warning' | 'danger' | 'success'
  trend: string
  riskId: string
  owner: string
}

interface BreachItem {
  id: string
  kriId: string
  kriName: string
  currentValue: string
  breachedDate: string
  escalationLevel: string
  owner: string
  actionRequired: string
  status: 'Under Review' | 'Remediating' | 'Resolved'
}

export function ScenariosKriWorkspace({ routeId, onNavigate }: ScenariosKriWorkspaceProps) {
  const getTabFromRoute = (id?: string) => {
    if (id === 'scenarios-kris') return 'kris'
    if (id === 'scenarios-breaches') return 'breaches'
    return 'scenarios'
  }

  const [activeTab, setActiveTab] = useState<'scenarios' | 'kris' | 'breaches'>(() =>
    getTabFromRoute(routeId)
  )
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setActiveTab(getTabFromRoute(routeId))
  }, [routeId])

  // Modals state
  const [simulationModalOpen, setSimulationModalOpen] = useState(false)
  const [addKriOpen, setAddKriOpen] = useState(false)
  const [selectedScenarioForSim, setSelectedScenarioForSim] = useState<ScenarioItem | null>(null)

  // Simulation Sliders
  const [simOutageHours, setSimOutageHours] = useState(24)
  const [simThreatTier, setSimThreatTier] = useState<'moderate' | 'high' | 'severe'>('high')

  // Master Data State
  const [scenariosList, setScenariosList] = useState<ScenarioItem[]>([
    {
      id: 'SCN-01',
      title: 'Global Ransomware & Extortion Blast Radius',
      description: 'Sophisticated threat actor breaches perimeter via phishing, deploys locker malware, and demands $10M ransom.',
      lossEstimate: '$14.2M Estimated Loss',
      recoveryTime: '36 Hours RTO',
      linkedRiskId: 'RSK-1042',
      riskTitle: 'Cybersecurity Breach',
      frequency: '1-in-10 Year Event',
      status: 'Simulation Run Completed',
    },
    {
      id: 'SCN-02',
      title: 'European Clearing Gateway Blackout (DORA Scenario)',
      description: 'Major telecommunications fiber severance halting retail SEPA and SWIFT messaging during peak market hours.',
      lossEstimate: '$8.5M Estimated Loss',
      recoveryTime: '4 Hours RTO',
      linkedRiskId: 'RSK-1011',
      riskTitle: 'Cloud Service Interruption',
      frequency: '1-in-5 Year Event',
      status: 'Annual Stress Test Validated',
    },
    {
      id: 'SCN-03',
      title: 'Critical Third-Party Cloud Provider Bankruptcy / Sudden Insolvency',
      description: 'Primary core-banking SaaS hosting provider ceases operations overnight due to insolvency proceedings.',
      lossEstimate: '$18.0M Estimated Loss',
      recoveryTime: '72 Hours RTO',
      linkedRiskId: 'RSK-1024',
      riskTitle: 'Third-Party Vendor Failure',
      frequency: '1-in-25 Year Event',
      status: 'Playbook Drafted',
    },
  ])

  const [krisList, setKrisList] = useState<KriItem[]>([
    {
      id: 'KRI-01',
      name: 'Simulated Phishing Drill Failure Rate',
      current: '4.8%',
      amberLimit: '3.0%',
      redLimit: '5.0%',
      status: 'Near Limit',
      statusType: 'warning',
      trend: '+0.8% MoM',
      riskId: 'RSK-1042',
      owner: 'Emily Carter',
    },
    {
      id: 'KRI-02',
      name: 'Unpatched Critical Software Vulnerabilities (>14 Days)',
      current: '11 hosts',
      amberLimit: '3 hosts',
      redLimit: '5 hosts',
      status: 'Breached',
      statusType: 'danger',
      trend: '+6 hosts this week',
      riskId: 'RSK-1042',
      owner: 'James Wilson',
    },
    {
      id: 'KRI-03',
      name: 'Customer Authentication Latency P99',
      current: '340 ms',
      amberLimit: '400 ms',
      redLimit: '600 ms',
      status: 'Normal',
      statusType: 'success',
      trend: '-20 ms optimization',
      riskId: 'RSK-1011',
      owner: 'David Kim',
    },
    {
      id: 'KRI-04',
      name: 'High-Value Payment Exception Rate',
      current: '1.24%',
      amberLimit: '0.75%',
      redLimit: '1.00%',
      status: 'Breached',
      statusType: 'danger',
      trend: '+0.3% variance',
      riskId: 'RSK-1015',
      owner: 'Marcus Vance',
    },
  ])

  const [breachesList, setBreachesList] = useState<BreachItem[]>([
    {
      id: 'BRC-2026-12',
      kriId: 'KRI-02',
      kriName: 'Unpatched Critical Software Vulnerabilities (>14 Days)',
      currentValue: '11 hosts (Limit: 5 hosts)',
      breachedDate: 'Oct 08, 2026',
      escalationLevel: 'Board Risk Committee / CTO',
      owner: 'James Wilson',
      actionRequired: 'Emergency maintenance deployment window authorized for Saturday 02:00 UTC.',
      status: 'Remediating',
    },
    {
      id: 'BRC-2026-11',
      kriId: 'KRI-04',
      kriName: 'High-Value Payment Exception Rate',
      currentValue: '1.24% (Limit: 1.00%)',
      breachedDate: 'Oct 09, 2026',
      escalationLevel: 'Head of Treasury',
      owner: 'Marcus Vance',
      actionRequired: 'Manual wire dual-approval threshold lowered to $250K.',
      status: 'Under Review',
    },
  ])

  // New KRI form state
  const [newKriName, setNewKriName] = useState('')
  const [newKriCurrent, setNewKriCurrent] = useState('2.1%')
  const [newKriAmber, setNewKriAmber] = useState('3.0%')
  const [newKriRed, setNewKriRed] = useState('5.0%')
  const [newKriRisk, setNewKriRisk] = useState('RSK-1042')
  const [newKriOwner, setNewKriOwner] = useState('James Wilson')

  const handleOpenSimulation = (scn: ScenarioItem) => {
    setSelectedScenarioForSim(scn)
    setSimOutageHours(24)
    setSimThreatTier('high')
    setSimulationModalOpen(true)
  }

  // Calculate dynamic simulated loss
  const calculatedSimLoss = Math.round(
    simOutageHours *
      (simThreatTier === 'severe' ? 450000 : simThreatTier === 'high' ? 280000 : 150000)
  )

  const handleSaveSimulation = () => {
    if (!selectedScenarioForSim) return
    const formattedLoss = `$${(calculatedSimLoss / 1000000).toFixed(1)}M Estimated Loss`
    setScenariosList((prev) =>
      prev.map((s) =>
        s.id === selectedScenarioForSim.id
          ? {
              ...s,
              lossEstimate: formattedLoss,
              recoveryTime: `${simOutageHours} Hours RTO`,
              status: `Simulation Run: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
            }
          : s
      )
    )
    setSimulationModalOpen(false)
  }

  const handleCreateKri = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newKriName.trim()) return
    const newId = `KRI-0${5 + krisList.length}`
    const item: KriItem = {
      id: newId,
      name: newKriName.trim(),
      current: newKriCurrent,
      amberLimit: newKriAmber,
      redLimit: newKriRed,
      status: 'Normal',
      statusType: 'success',
      trend: '0% baseline established',
      riskId: newKriRisk,
      owner: newKriOwner,
    }
    setKrisList([...krisList, item])
    setNewKriName('')
    setAddKriOpen(false)
  }

  const handleAcknowledgeBreach = (id: string) => {
    setBreachesList((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'Resolved' } : b))
    )
  }

  // Filtered lists
  const filteredScenarios = scenariosList.filter((s) => {
    if (searchQuery && !s.title.toLowerCase().includes(searchQuery.toLowerCase()) && !s.id.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const filteredKris = krisList.filter((k) => {
    if (searchQuery && !k.name.toLowerCase().includes(searchQuery.toLowerCase()) && !k.id.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const filteredBreaches = breachesList.filter((b) => {
    if (searchQuery && !b.kriName.toLowerCase().includes(searchQuery.toLowerCase()) && !b.id.toLowerCase().includes(searchQuery.toLowerCase())) return false
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
              {activeTab === 'kris'
                ? 'Key Risk Indicators'
                : activeTab === 'breaches'
                ? 'Threshold Breaches'
                : 'Scenarios & Stress Testing'}
            </span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {activeTab === 'kris'
              ? 'Key Risk Indicators (KRI) Early-Warning Dashboard'
              : activeTab === 'breaches'
              ? 'KRI Threshold Breaches & Escalations'
              : 'Stress Scenarios & Threat Simulation'}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Model catastrophic tail-risk events, monitor continuous early-warning thresholds, and triage automated breach escalations.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {activeTab === 'scenarios' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleOpenSimulation(scenariosList[0])}
              className="gap-1.5 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-xs"
            >
              <Play className="size-3.5" />
              <span>Run Stress Simulation</span>
            </Button>
          )}

          {activeTab === 'kris' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setAddKriOpen(true)}
              className="gap-1.5 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-xs"
            >
              <Plus className="size-3.5" />
              <span>Add Key Risk Indicator</span>
            </Button>
          )}

          <Button
            variant="secondary"
            size="sm"
            onClick={() => window.print()}
            className="gap-1.5 text-xs font-semibold border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-xs"
          >
            <Download className="size-3.5 text-slate-500" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {/* ── Segmented Navigation Tabs ── */}
      <div className="inline-flex items-center gap-1 p-1 bg-slate-100/90 rounded-xl border border-slate-200/60 text-xs overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('scenarios')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'scenarios'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Flame className="size-3.5" />
          <span>Scenario Library ({scenariosList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('kris')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'kris'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Activity className="size-3.5" />
          <span>KRI Dashboard ({krisList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('breaches')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'breaches'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <AlertTriangle className="size-3.5 text-rose-500" />
          <span>Threshold Breaches ({breachesList.length})</span>
        </button>
      </div>

      {/* ── Search Toolbar ── */}
      <div className="flex items-center justify-between gap-3 p-3 bg-white border border-slate-200/80 rounded-xl shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 size-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search scenarios, KRIs, or breaches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
          />
        </div>
      </div>

      {/* ── Content: Scenarios ── */}
      {activeTab === 'scenarios' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredScenarios.map((scn) => (
            <div
              key={scn.id}
              className="p-5 rounded-xl border border-slate-200/80 bg-white shadow-xs space-y-3 flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-blue-600">{scn.id}</span>
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                    {scn.frequency}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-slate-900 leading-snug">{scn.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{scn.description}</p>
                <div className="pt-2 text-xs text-slate-600">
                  <span className="text-slate-400 block text-[11px]">Mapped Enterprise Risk:</span>
                  <button
                    type="button"
                    onClick={() => onNavigate?.(`risk-${scn.linkedRiskId}`)}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {scn.linkedRiskId}: {scn.riskTitle}
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-rose-600">{scn.lossEstimate}</span>
                  <span className="font-mono text-slate-500 text-[11px]">{scn.recoveryTime}</span>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleOpenSimulation(scn)}
                  className="gap-1.5 text-xs font-semibold border-slate-200 text-slate-700 hover:bg-slate-50 w-full"
                >
                  <Play className="size-3 text-blue-600" />
                  <span>Configure Stress Simulation</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Content: KRIs ── */}
      {activeTab === 'kris' && (
        <div className="rounded-xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200/70 bg-slate-50/75 text-[11px] font-semibold text-slate-500">
                <th className="py-3 px-4">KRI Code & Metric</th>
                <th className="py-3 px-4">Current Value</th>
                <th className="py-3 px-4">Amber Warning Ceiling</th>
                <th className="py-3 px-4">Red Breach Ceiling</th>
                <th className="py-3 px-4">Trend Telemetry</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Metric Owner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredKris.map((kri) => (
                <tr key={kri.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{kri.name}</div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span className="font-mono text-blue-600 font-medium">{kri.id}</span>
                      <span>·</span>
                      <button
                        type="button"
                        onClick={() => onNavigate?.(`risk-${kri.riskId}`)}
                        className="hover:underline hover:text-blue-600 font-mono"
                      >
                        {kri.riskId}
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-sm text-slate-900">{kri.current}</td>
                  <td className="py-3 px-4 font-mono text-amber-700">{kri.amberLimit}</td>
                  <td className="py-3 px-4 font-mono text-rose-700 font-semibold">{kri.redLimit}</td>
                  <td className="py-3 px-4 text-slate-600">{kri.trend}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                        kri.statusType === 'danger'
                          ? 'bg-rose-50 text-rose-700 border-rose-200/70'
                          : kri.statusType === 'warning'
                          ? 'bg-amber-50 text-amber-700 border-amber-200/70'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200/70'
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          kri.statusType === 'danger'
                            ? 'bg-rose-500'
                            : kri.statusType === 'warning'
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`}
                      />
                      {kri.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-slate-700 font-medium">{kri.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Content: Breaches ── */}
      {activeTab === 'breaches' && (
        <div className="space-y-3.5">
          {filteredBreaches.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-xl border border-rose-200/80 bg-rose-50/15 space-y-3 shadow-xs hover:border-rose-300 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-rose-800">{b.id}</span>
                    <span className="font-mono text-xs font-medium text-slate-600">{b.kriId}</span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-rose-100 text-rose-800 border border-rose-200">
                      <span className="size-1.5 rounded-full bg-rose-600" />
                      Critical Red Limit Exceeded
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm text-slate-900 mt-1">
                    {b.kriName}
                  </h3>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                    b.status === 'Resolved'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70'
                      : 'bg-blue-50 text-blue-700 border-blue-200/70'
                  }`}
                >
                  {b.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                <div>Current Telemetry: <strong className="text-rose-700 font-mono">{b.currentValue}</strong></div>
                <div>Escalation Level: <strong className="text-slate-800">{b.escalationLevel}</strong></div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed bg-white/80 p-2.5 rounded-lg border border-rose-200/60">
                Action Mandate: {b.actionRequired}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-rose-200/60 text-xs text-slate-500">
                <span>Metric Owner: <strong className="text-slate-700 font-medium">{b.owner}</strong> (Breached: {b.breachedDate})</span>
                {b.status !== 'Resolved' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleAcknowledgeBreach(b.id)}
                    className="text-xs h-7 px-2.5 font-semibold border-rose-300 text-rose-800 bg-white hover:bg-rose-50"
                  >
                    Acknowledge & Close
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Modal: Stress Testing Simulation Runner ── */}
      {simulationModalOpen && selectedScenarioForSim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="font-mono text-xs font-semibold text-blue-600">{selectedScenarioForSim.id}</span>
                <h3 className="font-bold text-base text-slate-900">Run Tail-Risk Stress Simulation</h3>
              </div>
              <button
                type="button"
                onClick={() => setSimulationModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="font-semibold text-slate-800">{selectedScenarioForSim.title}</div>
                <p className="text-slate-500 mt-0.5">{selectedScenarioForSim.description}</p>
              </div>

              {/* Sliders */}
              <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="space-y-1.5">
                  <div className="flex justify-between font-semibold text-slate-700">
                    <span>Simulated Outage Duration (Hours)</span>
                    <span className="font-mono text-blue-600">{simOutageHours} Hours</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="72"
                    step="1"
                    value={simOutageHours}
                    onChange={(e) => setSimOutageHours(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>1 Hour (Minor)</span>
                    <span>24 Hours</span>
                    <span>72 Hours (Severe)</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                  <label className="font-semibold text-slate-700 block">Threat Adversary Capability</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['moderate', 'high', 'severe'] as const).map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setSimThreatTier(tier)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-medium capitalize border transition-all ${
                          simThreatTier === tier
                            ? 'bg-white text-blue-700 border-blue-500 shadow-2xs font-semibold'
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {tier} Tier
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calculated Outputs */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-blue-50/50 border border-blue-200 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">Estimated Financial Loss:</span>
                  <span className="font-mono text-lg font-bold text-rose-600">
                    ${(calculatedSimLoss / 1000000).toFixed(2)}M
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Estimated Recovery Time (RTO):</span>
                  <span className="font-mono text-lg font-bold text-slate-900">
                    {simOutageHours} Hours
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSimulationModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveSimulation}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Execute Simulation & Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Add KRI ── */}
      {addKriOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Create New Key Risk Indicator (KRI)</h3>
              <button
                type="button"
                onClick={() => setAddKriOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleCreateKri} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Metric Indicator Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Percentage of Unencrypted Database Connections"
                  value={newKriName}
                  onChange={(e) => setNewKriName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Baseline Value</label>
                  <input
                    type="text"
                    value={newKriCurrent}
                    onChange={(e) => setNewKriCurrent(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Amber Warning Limit</label>
                  <input
                    type="text"
                    value={newKriAmber}
                    onChange={(e) => setNewKriAmber(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Red Breach Limit</label>
                  <input
                    type="text"
                    value={newKriRed}
                    onChange={(e) => setNewKriRed(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Linked Enterprise Risk</label>
                  <input
                    type="text"
                    value={newKriRisk}
                    onChange={(e) => setNewKriRisk(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Telemetry Owner</label>
                  <input
                    type="text"
                    value={newKriOwner}
                    onChange={(e) => setNewKriOwner(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setAddKriOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save KRI
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
