import { useState, useMemo } from 'react'
import {
  Activity,
  AlertTriangle,
  Clock,
  Flame,
  ArrowUpRight,
  Server,
  ShieldCheck,
  Download,
  ChevronRight,
  Search,
  Plus,
  RefreshCw,
  CheckCircle2,
  Play,
  AlertCircle,
  X,
  Cpu,
} from 'lucide-react'
import { Button } from '@/components/ui'

interface OperationalDashboardProps {
  onNavigate?: (routeId: string) => void
}

interface IncidentItem {
  id: string
  title: string
  severity: string
  severityBadge: string
  dotColor: string
  status: 'Mitigating' | 'Investigating' | 'Resolved'
  department: string
  started: string
  linkedRiskId: string
  lead: string
}

interface ResilienceUnit {
  name: string
  rto: string
  actualRto: string
  rpo: string
  status: 'Healthy' | 'Degraded' | 'Drill Passed'
  score: string
  lastDrill: string
}

export function OperationalDashboard({ onNavigate }: OperationalDashboardProps) {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [incidentFilter, setIncidentFilter] = useState<'all' | 'active' | 'resolved'>('all')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [refreshNotification, setRefreshNotification] = useState<string | null>(null)

  // Modals state
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false)
  const [isDrillModalOpen, setIsDrillModalOpen] = useState(false)
  const [selectedDrillService, setSelectedDrillService] = useState<string>('Core Clearing Engine')
  const [drillSuccessNote, setDrillSuccessNote] = useState<string | null>(null)

  // New incident form state
  const [newIncidentTitle, setNewIncidentTitle] = useState('')
  const [newIncidentSeverity, setNewIncidentSeverity] = useState('P1')
  const [newIncidentDept, setNewIncidentDept] = useState('IT Infrastructure')
  const [newIncidentLead, setNewIncidentLead] = useState('')
  const [newIncidentRiskId, setNewIncidentRiskId] = useState('RSK-1042')

  const [operationalKRIs, setOperationalKRIs] = useState([
    {
      id: 'KRI-OPS-01',
      name: 'Unplanned Core Processing Downtime',
      value: '18 mins',
      threshold: 'Max 30 mins / mo',
      status: 'Normal',
      statusType: 'success' as const,
      trend: '-12% vs last month',
      category: 'Infrastructure',
      acknowledged: false,
    },
    {
      id: 'KRI-OPS-02',
      name: 'Failed Settlement Batch Rate',
      value: '0.42%',
      threshold: 'Max 0.25%',
      status: 'Breached',
      statusType: 'danger' as const,
      trend: '+0.18% spike today',
      category: 'Payment Systems',
      acknowledged: false,
    },
    {
      id: 'KRI-OPS-03',
      name: 'Critical CVE Patching Backlog (>14d)',
      value: '7 servers',
      threshold: 'Max 2 servers',
      status: 'Breached',
      statusType: 'danger' as const,
      trend: '+3 unpatched hosts',
      category: 'Cybersecurity',
      acknowledged: false,
    },
    {
      id: 'KRI-OPS-04',
      name: 'Privileged Access Elevation Violations',
      value: '2 events',
      threshold: '0 tolerance',
      status: 'Warning',
      statusType: 'warning' as const,
      trend: 'Isolated & quarantined',
      category: 'Identity & Access',
      acknowledged: false,
    },
  ])

  const [liveIncidents, setLiveIncidents] = useState<IncidentItem[]>([
    {
      id: 'INC-2026-88',
      title: 'Payment Gateway Clearing Latency Spike',
      severity: 'P1 · High',
      severityBadge: 'bg-rose-50 text-rose-700 border-rose-200/80',
      dotColor: 'bg-rose-500',
      status: 'Mitigating',
      department: 'Operations',
      started: '2 hrs ago',
      linkedRiskId: 'RSK-1042',
      lead: 'Sarah Chen',
    },
    {
      id: 'INC-2026-87',
      title: 'Third-Party SMS Gateway Throttling',
      severity: 'P2 · Moderate',
      severityBadge: 'bg-amber-50 text-amber-700 border-amber-200/80',
      dotColor: 'bg-amber-500',
      status: 'Investigating',
      department: 'IT Infrastructure',
      started: '5 hrs ago',
      linkedRiskId: 'RSK-1011',
      lead: 'Michael Brown',
    },
    {
      id: 'INC-2026-86',
      title: 'Failed Overnight Database Replica Sync',
      severity: 'P3 · Low',
      severityBadge: 'bg-sky-50 text-sky-700 border-sky-200/80',
      dotColor: 'bg-sky-500',
      status: 'Resolved',
      department: 'Database Engineering',
      started: '14 hrs ago',
      linkedRiskId: 'RSK-1015',
      lead: 'David Kim',
    },
  ])

  const [resilienceUnits, setResilienceUnits] = useState<ResilienceUnit[]>([
    {
      name: 'Core Clearing Engine',
      rto: '15 mins',
      actualRto: '8 mins',
      rpo: '1 min',
      status: 'Healthy',
      score: '99.98%',
      lastDrill: 'Sep 14, 2026',
    },
    {
      name: 'Customer Account Portal',
      rto: '30 mins',
      actualRto: '18 mins',
      rpo: '5 mins',
      status: 'Healthy',
      score: '99.94%',
      lastDrill: 'Aug 22, 2026',
    },
    {
      name: 'Fraud Scoring API',
      rto: '5 mins',
      actualRto: '6.2 mins',
      rpo: '0 mins',
      status: 'Degraded',
      score: '99.82%',
      lastDrill: 'Sep 29, 2026',
    },
    {
      name: 'Treasury Wire Interface',
      rto: '60 mins',
      actualRto: '22 mins',
      rpo: '15 mins',
      status: 'Healthy',
      score: '100.0%',
      lastDrill: 'Oct 01, 2026',
    },
  ])

  // Live telemetry refresh simulation
  const handleTelemetryRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      setRefreshNotification('Telemetry refreshed: 12 datastreams synced, API latency nominal (38ms)')
      setTimeout(() => setRefreshNotification(null), 4000)
    }, 700)
  }

  // Acknowledge KRI breach
  const handleAcknowledgeKRI = (kriId: string) => {
    setOperationalKRIs((prev) =>
      prev.map((k) =>
        k.id === kriId
          ? { ...k, acknowledged: true, trend: 'Remediation plan acknowledged & tracked' }
          : k
      )
    )
  }

  // Resolve an incident
  const handleResolveIncident = (incidentId: string) => {
    setLiveIncidents((prev) =>
      prev.map((inc) =>
        inc.id === incidentId
          ? {
              ...inc,
              status: 'Resolved',
              severityBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
              dotColor: 'bg-emerald-500',
            }
          : inc
      )
    )
  }

  // Create Incident
  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newIncidentTitle.trim()) return

    const severityConfig: Record<string, { badge: string; dot: string; label: string }> = {
      P1: { badge: 'bg-rose-50 text-rose-700 border-rose-200/80', dot: 'bg-rose-500', label: 'P1 · Critical' },
      P2: { badge: 'bg-amber-50 text-amber-700 border-amber-200/80', dot: 'bg-amber-500', label: 'P2 · Moderate' },
      P3: { badge: 'bg-sky-50 text-sky-700 border-sky-200/80', dot: 'bg-sky-500', label: 'P3 · Low' },
    }

    const conf = severityConfig[newIncidentSeverity] || severityConfig.P2

    const item: IncidentItem = {
      id: `INC-2026-${Math.floor(89 + Math.random() * 20)}`,
      title: newIncidentTitle.trim(),
      severity: conf.label,
      severityBadge: conf.badge,
      dotColor: conf.dot,
      status: 'Investigating',
      department: newIncidentDept,
      started: 'Just now',
      linkedRiskId: newIncidentRiskId,
      lead: newIncidentLead.trim() || 'Ops Lead',
    }

    setLiveIncidents((prev) => [item, ...prev])
    setIsIncidentModalOpen(false)
    setNewIncidentTitle('')
    setNewIncidentLead('')
  }

  // Run Failover Drill
  const handleExecuteDrill = () => {
    setResilienceUnits((prev) =>
      prev.map((unit) =>
        unit.name === selectedDrillService
          ? {
              ...unit,
              status: 'Drill Passed',
              actualRto: '5.4 mins',
              lastDrill: 'Oct 11, 2026 (Live Drill Passed)',
              score: '99.99%',
            }
          : unit
      )
    )
    setDrillSuccessNote(`Failover drill completed for ${selectedDrillService}. New verified RTO: 5.4 mins.`)
    setTimeout(() => {
      setIsDrillModalOpen(false)
      setDrillSuccessNote(null)
    }, 1500)
  }

  // Filtered incidents
  const filteredIncidents = useMemo(() => {
    return liveIncidents.filter((inc) => {
      const matchSearch =
        searchQuery === '' ||
        inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inc.lead.toLowerCase().includes(searchQuery.toLowerCase())

      const matchDept =
        selectedDepartment === 'All' || inc.department === selectedDepartment

      const matchFilter =
        incidentFilter === 'all' ||
        (incidentFilter === 'active' && inc.status !== 'Resolved') ||
        (incidentFilter === 'resolved' && inc.status === 'Resolved')

      return matchSearch && matchDept && matchFilter
    })
  }, [liveIncidents, searchQuery, selectedDepartment, incidentFilter])

  // Filtered KRIs
  const filteredKRIs = useMemo(() => {
    return operationalKRIs.filter((kri) => {
      const matchSearch =
        searchQuery === '' ||
        kri.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        kri.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        kri.category.toLowerCase().includes(searchQuery.toLowerCase())

      return matchSearch
    })
  }, [operationalKRIs, searchQuery])

  const activeIncidentsCount = liveIncidents.filter((i) => i.status !== 'Resolved').length
  const breachedKRIsCount = operationalKRIs.filter((k) => k.status === 'Breached' && !k.acknowledged).length

  return (
    <div className="space-y-6 pb-12">
      {/* ── Toast notification ── */}
      {refreshNotification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900 text-white shadow-xl text-xs font-medium animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="size-4 text-emerald-400" />
          <span>{refreshNotification}</span>
        </div>
      )}

      {/* ── Page Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <nav className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
            <span>Overview</span>
            <ChevronRight className="size-3.5 text-slate-400" />
            <span>Dashboard</span>
            <ChevronRight className="size-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold">Operational Risk</span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Operational Risk & Resilience
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Real-time monitoring of operational resilience, KRI thresholds, system incidents, and service SLAs.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {/* Segmented Time Range Control */}
          <div className="inline-flex items-center gap-1 p-1 bg-slate-100/90 rounded-xl border border-slate-200/60 text-xs">
            {(['24h', '7d', '30d'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  timeRange === r
                    ? 'bg-white text-slate-900 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Refresh Telemetry */}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleTelemetryRefresh}
            disabled={isRefreshing}
            className="gap-1.5 text-xs font-semibold border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-xs"
          >
            <RefreshCw className={`size-3.5 text-slate-500 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Sync Telemetry'}</span>
          </Button>

          {/* Report Incident CTA */}
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsIncidentModalOpen(true)}
            className="gap-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-xs"
          >
            <Plus className="size-3.5" />
            <span>+ Report Incident</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => window.print()}
            className="gap-1.5 text-xs font-semibold border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-xs hidden sm:inline-flex"
          >
            <Download className="size-3.5 text-slate-500" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* ── 4 KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200/80 bg-white p-4.5 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Core Uptime SLA</span>
            <div className="size-7 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Server className="size-3.5 text-emerald-600" />
            </div>
          </div>
          <div className="font-mono text-2xl font-bold tracking-tight text-emerald-600 mt-2">
            99.94%
          </div>
          <p className="mt-1.5 text-xs text-slate-500 flex items-center gap-1.5">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700">
              +0.04%
            </span>
            Target: 99.90%
          </p>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-4.5 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Active Incidents</span>
            <div className="size-7 rounded-lg bg-rose-50 flex items-center justify-center">
              <Flame className="size-3.5 text-rose-600" />
            </div>
          </div>
          <div className="font-mono text-2xl font-bold tracking-tight text-rose-600 mt-2">
            {activeIncidentsCount} Open
          </div>
          <p className="mt-1.5 text-xs text-rose-600 font-medium">
            {activeIncidentsCount > 0 ? 'Requires operational response' : 'All incidents resolved'}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-4.5 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">KRI Threshold Breaches</span>
            <div className="size-7 rounded-lg bg-amber-50 flex items-center justify-center">
              <AlertTriangle className="size-3.5 text-amber-600" />
            </div>
          </div>
          <div className="font-mono text-2xl font-bold tracking-tight text-amber-600 mt-2">
            {breachedKRIsCount} Breached
          </div>
          <p className="mt-1.5 text-xs text-amber-700 font-medium">
            Settlement batch & patching SLA
          </p>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-4.5 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Incident MTTR</span>
            <div className="size-7 rounded-lg bg-blue-50 flex items-center justify-center">
              <Clock className="size-3.5 text-blue-600" />
            </div>
          </div>
          <div className="font-mono text-2xl font-bold tracking-tight text-slate-900 mt-2">
            14.2h
          </div>
          <p className="mt-1.5 text-xs text-slate-500">
            Mean resolution time (SLA &lt; 24h)
          </p>
        </div>
      </div>

      {/* ── Filter Toolbar ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search KRIs, incidents, services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Department:</span>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="All">All Departments</option>
              <option value="Operations">Operations</option>
              <option value="IT Infrastructure">IT Infrastructure</option>
              <option value="Payment Systems">Payment Systems</option>
              <option value="Database Engineering">Database Engineering</option>
              <option value="Cybersecurity">Cybersecurity</option>
            </select>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsDrillModalOpen(true)}
            className="gap-1 text-xs font-semibold text-slate-700 border-slate-200 bg-white hover:bg-slate-50 shadow-2xs"
          >
            <Play className="size-3 text-emerald-600" />
            <span>Launch Failover Drill</span>
          </Button>
        </div>
      </div>

      {/* ── Key Risk Indicators (KRIs) ── */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="size-7 rounded-lg bg-blue-50 flex items-center justify-center">
              <Activity className="size-4 text-blue-600" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Operational Key Risk Indicators (KRIs)
              </h2>
              <p className="text-xs text-slate-500">Continuous telemetry and threshold monitoring</p>
            </div>
          </div>
          <span className="text-xs font-medium text-slate-500">
            {filteredKRIs.length} monitored streams
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredKRIs.map((kri) => (
            <div
              key={kri.id}
              className={`p-4 rounded-xl border transition-all ${
                kri.statusType === 'danger' && !kri.acknowledged
                  ? 'border-rose-200 bg-rose-50/25'
                  : kri.statusType === 'warning'
                  ? 'border-amber-200 bg-amber-50/25'
                  : 'border-slate-200/80 bg-slate-50/40'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-mono text-[11px] text-slate-500 font-medium">
                    {kri.id} · {kri.category}
                  </span>
                  <h3 className="font-medium text-xs text-slate-900 mt-0.5">
                    {kri.name}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                      kri.acknowledged
                        ? 'bg-slate-100 text-slate-700 border-slate-200'
                        : kri.statusType === 'danger'
                        ? 'bg-rose-50 text-rose-700 border-rose-200/70'
                        : kri.statusType === 'warning'
                        ? 'bg-amber-50 text-amber-700 border-amber-200/70'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200/70'
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${
                        kri.acknowledged
                          ? 'bg-slate-500'
                          : kri.statusType === 'danger'
                          ? 'bg-rose-500'
                          : kri.statusType === 'warning'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                    />
                    {kri.acknowledged ? 'Acknowledged' : kri.status}
                  </span>
                </div>
              </div>

              <div className="flex items-baseline justify-between mt-3.5 pt-3 border-t border-slate-200/60 text-xs">
                <div>
                  <span className="text-[11px] text-slate-500 block">Current value</span>
                  <span className="font-mono text-base font-bold text-slate-900">
                    {kri.value}
                  </span>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="text-[11px] text-slate-500 block">Threshold: {kri.threshold}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-medium text-slate-600">{kri.trend}</span>
                    {kri.statusType === 'danger' && !kri.acknowledged && (
                      <button
                        type="button"
                        onClick={() => handleAcknowledgeKRI(kri.id)}
                        className="text-[10px] font-semibold text-rose-700 bg-rose-100/70 hover:bg-rose-200/80 px-2 py-0.5 rounded transition-colors"
                      >
                        Acknowledge
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Active Incidents Feed & Resiliency Matrix ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Incidents */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="size-7 rounded-lg bg-rose-50 flex items-center justify-center">
                <AlertTriangle className="size-4 text-rose-600" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Live Incident Response Feed
                </h2>
                <p className="text-[11px] text-slate-500">Operational events requiring containment</p>
              </div>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[11px]">
              <button
                type="button"
                onClick={() => setIncidentFilter('all')}
                className={`px-2 py-0.5 rounded-md font-medium transition-all ${
                  incidentFilter === 'all'
                    ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({liveIncidents.length})
              </button>
              <button
                type="button"
                onClick={() => setIncidentFilter('active')}
                className={`px-2 py-0.5 rounded-md font-medium transition-all ${
                  incidentFilter === 'active'
                    ? 'bg-white text-rose-700 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Active ({activeIncidentsCount})
              </button>
              <button
                type="button"
                onClick={() => setIncidentFilter('resolved')}
                className={`px-2 py-0.5 rounded-md font-medium transition-all ${
                  incidentFilter === 'resolved'
                    ? 'bg-white text-emerald-700 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Resolved ({liveIncidents.filter((i) => i.status === 'Resolved').length})
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredIncidents.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-slate-200 rounded-xl text-xs text-slate-500">
                No incidents matching the current search and filters.
              </div>
            ) : (
              filteredIncidents.map((inc) => (
                <div
                  key={inc.id}
                  className="p-3.5 rounded-xl border border-slate-200/80 hover:border-blue-300 transition-all bg-white space-y-2.5 shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-blue-600">{inc.id}</span>
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium border ${inc.severityBadge}`}>
                          <span className={`size-1.5 rounded-full ${inc.dotColor}`} />
                          {inc.severity}
                        </span>
                      </div>
                      <h3 className="font-medium text-xs text-slate-900 mt-1">
                        {inc.title}
                      </h3>
                    </div>
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-md shrink-0 border ${
                        inc.status === 'Resolved'
                          ? 'text-emerald-700 bg-emerald-50 border-emerald-200/60'
                          : inc.status === 'Mitigating'
                          ? 'text-rose-700 bg-rose-50 border-rose-200/60'
                          : 'text-amber-700 bg-amber-50 border-amber-200/60'
                      }`}
                    >
                      {inc.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500 flex-wrap gap-2">
                    <span>
                      Lead: <strong className="font-medium text-slate-700">{inc.lead}</strong> ({inc.department})
                    </span>
                    <div className="flex items-center gap-2.5">
                      <span>{inc.started}</span>
                      <button
                        type="button"
                        onClick={() => onNavigate?.(`risk-${inc.linkedRiskId}`)}
                        className="font-mono text-xs text-blue-600 hover:underline flex items-center gap-0.5"
                      >
                        <span>{inc.linkedRiskId}</span>
                        <ArrowUpRight className="size-3" />
                      </button>
                      {inc.status !== 'Resolved' && (
                        <button
                          type="button"
                          onClick={() => handleResolveIncident(inc.id)}
                          className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-semibold transition-colors"
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Operational Resilience Matrix */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="size-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                <ShieldCheck className="size-4 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Business Service Resilience (RTO / RPO)
                </h2>
                <p className="text-[11px] text-slate-500">ISO 22301 & DORA operational disruption SLAs</p>
              </div>
            </div>
            <span className="text-xs text-slate-400 font-mono">DORA · ISO 22301</span>
          </div>

          <div className="space-y-3">
            {resilienceUnits.map((unit) => (
              <div
                key={unit.name}
                className="p-3.5 rounded-xl border border-slate-200/80 bg-white space-y-2 shadow-2xs hover:border-slate-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="size-3.5 text-slate-400" />
                    <span className="font-semibold text-xs text-slate-900">
                      {unit.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono text-xs font-semibold px-2 py-0.5 rounded-md border ${
                        unit.status === 'Degraded'
                          ? 'text-amber-700 bg-amber-50 border-amber-200/70'
                          : 'text-emerald-700 bg-emerald-50 border-emerald-200/60'
                      }`}
                    >
                      {unit.score} Uptime
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 text-xs text-slate-600">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Target RTO</span>
                    <strong className="text-slate-800 font-semibold">{unit.rto}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Tested RTO</span>
                    <strong className="text-emerald-700 font-semibold">{unit.actualRto}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Target RPO</span>
                    <strong className="text-slate-800 font-semibold">{unit.rpo}</strong>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 flex items-center justify-between">
                  <span>Last verified drill: {unit.lastDrill}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDrillService(unit.name)
                      setIsDrillModalOpen(true)
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium hover:underline cursor-pointer"
                  >
                    Run drill test &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Report Incident Modal ── */}
      {isIncidentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-rose-50 flex items-center justify-center">
                  <Flame className="size-4 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Report Operational Incident</h3>
                  <p className="text-xs text-slate-500">Log an active event for containment & post-mortem</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsIncidentModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleCreateIncident} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Incident Title / Summary</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ACH Wire Transfer Settlement Queue Stalled"
                  value={newIncidentTitle}
                  onChange={(e) => setNewIncidentTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Severity Tier</label>
                  <select
                    value={newIncidentSeverity}
                    onChange={(e) => setNewIncidentSeverity(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                  >
                    <option value="P1">P1 · Critical (Customer Impact)</option>
                    <option value="P2">P2 · High (Degraded Performance)</option>
                    <option value="P3">P3 · Moderate / Low</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Department</label>
                  <select
                    value={newIncidentDept}
                    onChange={(e) => setNewIncidentDept(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                  >
                    <option value="IT Infrastructure">IT Infrastructure</option>
                    <option value="Operations">Operations</option>
                    <option value="Payment Systems">Payment Systems</option>
                    <option value="Database Engineering">Database Engineering</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Incident Commander / Lead</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={newIncidentLead}
                    onChange={(e) => setNewIncidentLead(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Linked Residual Risk</label>
                  <select
                    value={newIncidentRiskId}
                    onChange={(e) => setNewIncidentRiskId(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono"
                  >
                    <option value="RSK-1042">RSK-1042 · Cybersecurity Breach</option>
                    <option value="RSK-1011">RSK-1011 · Cloud Outage</option>
                    <option value="RSK-1015">RSK-1015 · Data Leakage</option>
                    <option value="RSK-1020">RSK-1020 · Payment Gateway API</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsIncidentModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-rose-600 hover:bg-rose-700 text-white font-semibold"
                >
                  Create & Dispatch Alert
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Failover Drill Modal ── */}
      {isDrillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <Play className="size-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Run Business Continuity Drill</h3>
                  <p className="text-xs text-slate-500">Live automated failover test for RTO/RPO SLAs</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDrillModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="size-4" />
              </button>
            </div>

            {drillSuccessNote ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>{drillSuccessNote}</span>
              </div>
            ) : (
              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Target Service</label>
                  <select
                    value={selectedDrillService}
                    onChange={(e) => setSelectedDrillService(e.target.value)}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
                  >
                    {resilienceUnits.map((u) => (
                      <option key={u.name} value={u.name}>
                        {u.name} (Target RTO: {u.rto})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-slate-600 text-xs leading-relaxed space-y-1.5">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                    <AlertCircle className="size-3.5 text-blue-600" />
                    <span>Automated Chaos & Failover Procedure</span>
                  </div>
                  <p>
                    This test simulates primary availability zone loss in AWS us-east-1 and activates hot standby replica in us-west-2 while verifying 0 data loss (RPO).
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsDrillModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={handleExecuteDrill}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-semibold"
                  >
                    Execute Automated Drill
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
