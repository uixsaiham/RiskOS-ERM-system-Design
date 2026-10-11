import { useState, useEffect } from 'react'
import { ArrowUpRight, ChevronRight, Download, ShieldCheck, FileText, CheckCircle2, Layers } from 'lucide-react'
import { Button } from '@/components/ui'

interface FrameworksPoliciesWorkspaceProps {
  routeId?: string
  onNavigate?: (routeId: string) => void
}

type FrameworkTabKey = 'iso27001' | 'soc2' | 'nist' | 'custom' | 'policies'

export function FrameworksPoliciesWorkspace({
  routeId,
  onNavigate,
}: FrameworksPoliciesWorkspaceProps) {
  const getTabFromRoute = (id?: string): FrameworkTabKey => {
    if (id === 'policies') return 'policies'
    if (id === 'frameworks-soc2') return 'soc2'
    if (id === 'frameworks-nist') return 'nist'
    if (id === 'frameworks-custom') return 'custom'
    return 'iso27001'
  }

  const [activeTab, setActiveTab] = useState<FrameworkTabKey>(() => getTabFromRoute(routeId))

  // Synchronize when routeId changes externally (e.g. sidebar navigation)
  useEffect(() => {
    setActiveTab(getTabFromRoute(routeId))
  }, [routeId])

  const frameworksData = {
    iso27001: {
      name: 'ISO/IEC 27001:2022 Information Security Management',
      complianceScore: 94,
      totalControls: 93,
      implemented: 88,
      inProgress: 5,
      clauses: [
        { id: 'A.5', name: 'Organizational Controls', count: '37 controls', status: 'Compliant (96%)' },
        { id: 'A.6', name: 'People Controls', count: '8 controls', status: 'Compliant (100%)' },
        { id: 'A.7', name: 'Physical Controls', count: '14 controls', status: 'Compliant (92%)' },
        { id: 'A.8', name: 'Technological Controls', count: '34 controls', status: 'Compliant (91%)' },
      ],
    },
    soc2: {
      name: 'AICPA SOC 2 Type II (Trust Services Criteria)',
      complianceScore: 89,
      totalControls: 68,
      implemented: 61,
      inProgress: 7,
      clauses: [
        { id: 'CC1-CC5', name: 'Control Environment & Governance', count: '18 controls', status: 'Compliant (94%)' },
        { id: 'CC6', name: 'Logical and Physical Access Controls', count: '22 controls', status: 'Compliant (88%)' },
        { id: 'CC7', name: 'System Operations & Incident Response', count: '16 controls', status: 'Compliant (85%)' },
        { id: 'CC8-CC9', name: 'Change Management & Risk Mitigation', count: '12 controls', status: 'Compliant (92%)' },
      ],
    },
    nist: {
      name: 'NIST Cybersecurity Framework (CSF v2.0)',
      complianceScore: 86,
      totalControls: 106,
      implemented: 91,
      inProgress: 15,
      clauses: [
        { id: 'GV', name: 'Govern (GOVERN)', count: '18 subcategories', status: 'Mature (90%)' },
        { id: 'ID', name: 'Identify (IDENTIFY)', count: '20 subcategories', status: 'Mature (88%)' },
        { id: 'PR', name: 'Protect (PROTECT)', count: '28 subcategories', status: 'Mature (85%)' },
        { id: 'DE', name: 'Detect (DETECT)', count: '16 subcategories', status: 'Developing (80%)' },
        { id: 'RS', name: 'Respond (RESPOND)', count: '14 subcategories', status: 'Mature (87%)' },
        { id: 'RC', name: 'Recover (RECOVER)', count: '10 subcategories', status: 'Mature (92%)' },
      ],
    },
    custom: {
      name: 'Northstar Enterprise Internal Controls Baseline (EICB v3)',
      complianceScore: 93,
      totalControls: 42,
      implemented: 39,
      inProgress: 3,
      clauses: [
        { id: 'EICB-1', name: 'Core Banking & Transaction Authorization Controls', count: '12 controls', status: 'Compliant (92%)' },
        { id: 'EICB-2', name: 'Customer Data Isolation & Cryptographic Key Management', count: '10 controls', status: 'Compliant (100%)' },
        { id: 'EICB-3', name: 'High-Availability Failover & Chaos Engineering', count: '10 controls', status: 'Compliant (90%)' },
        { id: 'EICB-4', name: 'Third-Party Cloud Vendor Telemetry & Operational SLAs', count: '10 controls', status: 'Compliant (90%)' },
      ],
    },
  }

  const policiesList = [
    {
      id: 'POL-SEC-01',
      title: 'Enterprise Information Security Policy',
      version: 'v4.2',
      owner: 'James Wilson',
      department: 'IT',
      status: 'Approved & Active',
      approvalDate: 'Aug 15, 2026',
      nextReview: 'Aug 15, 2027',
      acknowledgementRate: '98.6%',
    },
    {
      id: 'POL-IAM-03',
      title: 'Identity & Access Management (IAM) Standard',
      version: 'v3.0',
      owner: 'James Wilson',
      department: 'IT',
      status: 'Approved & Active',
      approvalDate: 'Jul 10, 2026',
      nextReview: 'Jul 10, 2027',
      acknowledgementRate: '99.1%',
    },
    {
      id: 'POL-BCP-02',
      title: 'Business Continuity & Disaster Recovery Policy',
      version: 'v2.8',
      owner: 'Michael Brown',
      department: 'Operations',
      status: 'Under Annual Review',
      approvalDate: 'Oct 05, 2025',
      nextReview: 'Oct 30, 2026',
      acknowledgementRate: '94.2%',
    },
    {
      id: 'POL-DAT-04',
      title: 'Data Classification & GDPR/Privacy Standards',
      version: 'v3.5',
      owner: 'Elena Rostova',
      department: 'Legal & Compliance',
      status: 'Approved & Active',
      approvalDate: 'May 20, 2026',
      nextReview: 'May 20, 2027',
      acknowledgementRate: '97.4%',
    },
  ]

  const currentFw =
    activeTab === 'soc2'
      ? frameworksData.soc2
      : activeTab === 'nist'
      ? frameworksData.nist
      : activeTab === 'custom'
      ? frameworksData.custom
      : frameworksData.iso27001

  return (
    <div className="space-y-6 pb-12">
      {/* ── Page Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <nav className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
            <span>Controls</span>
            <ChevronRight className="size-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold">
              {activeTab === 'policies' ? 'Policies & Standards' : 'Compliance Frameworks'}
            </span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {activeTab === 'policies'
              ? 'Corporate Policies & Standards'
              : 'Regulatory & Compliance Frameworks'}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Cross-walk internal controls to ISO 27001, SOC 2, NIST CSF, and govern organizational policy lifecycle.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => window.print()}
            className="gap-1.5 text-xs font-semibold border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-xs"
          >
            <Download className="size-3.5 text-slate-500" />
            <span>Download Audit Crosswalk</span>
          </Button>
        </div>
      </div>

      {/* ── Modern Segmented Tabs ── */}
      <div className="inline-flex items-center gap-1 p-1 bg-slate-100/90 rounded-xl border border-slate-200/60 text-xs overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('iso27001')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'iso27001'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="size-3.5" />
          <span>ISO 27001:2022</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('soc2')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'soc2'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CheckCircle2 className="size-3.5" />
          <span>SOC 2 Type II</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('nist')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'nist'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="size-3.5" />
          <span>NIST CSF v2.0</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('custom')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'custom'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="size-3.5" />
          <span>Custom Frameworks</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('policies')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeTab === 'policies'
              ? 'bg-white text-slate-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="size-3.5" />
          <span>Policies Catalog ({policiesList.length})</span>
        </button>
      </div>

      {/* ── Framework Views ── */}
      {activeTab !== 'policies' && (
        <div className="space-y-6">
          {/* Compliance Score Strip */}
          <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs font-semibold text-blue-600">Framework Standard</span>
              <h2 className="font-bold text-lg text-slate-900">{currentFw.name}</h2>
              <p className="text-xs text-slate-500 mt-1">
                {currentFw.implemented} of {currentFw.totalControls} requirements validated by operational controls.
              </p>
            </div>

            <div className="flex items-center gap-5 shrink-0">
              <div className="text-left md:text-right">
                <span className="text-[11px] text-slate-400 font-medium block">Compliance Score</span>
                <span className="font-mono text-3xl font-extrabold text-emerald-600">{currentFw.complianceScore}%</span>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => onNavigate?.('controls')}
                className="font-semibold text-xs bg-slate-900 text-white hover:bg-slate-800 shadow-xs"
              >
                View Mapped Controls
              </Button>
            </div>
          </div>

          {/* Clause Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentFw.clauses.map((clause) => (
              <div
                key={clause.id}
                className="p-5 rounded-xl border border-slate-200/80 bg-white shadow-xs space-y-3 hover:border-slate-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-blue-600">{clause.id}</span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="size-3 text-emerald-600" />
                    {clause.status}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-slate-900">{clause.name}</h3>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Scope: {clause.count}</span>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('controls')}
                    className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Controls</span>
                    <ArrowUpRight className="size-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Policies Catalog View ── */}
      {activeTab === 'policies' && (
        <div className="rounded-xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200/70 bg-slate-50/75 text-[11px] font-semibold text-slate-500">
                <th className="py-3 px-4">Policy Code & Title</th>
                <th className="py-3 px-4">Version</th>
                <th className="py-3 px-4">Owner & Dept</th>
                <th className="py-3 px-4">Approval Status</th>
                <th className="py-3 px-4">Annual Review Due</th>
                <th className="py-3 px-4 text-right">Acknowledgement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {policiesList.map((pol) => (
                <tr key={pol.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{pol.title}</div>
                    <span className="text-[11px] text-blue-600 font-mono font-medium">{pol.id}</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600">{pol.version}</td>
                  <td className="py-3 px-4">
                    <div className="text-slate-800 font-medium">{pol.owner}</div>
                    <div className="text-slate-400 text-[11px]">{pol.department}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                        pol.status.includes('Active')
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70'
                          : 'bg-amber-50 text-amber-700 border-amber-200/70'
                      }`}
                    >
                      <span className={`size-1.5 rounded-full ${pol.status.includes('Active') ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      {pol.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{pol.nextReview}</td>
                  <td className="py-3 px-4 text-right font-mono font-semibold text-slate-900">
                    {pol.acknowledgementRate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
