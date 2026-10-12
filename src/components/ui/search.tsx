import * as React from 'react'
import {
  Search as SearchIcon,
  FileWarning,
  Shield,
  Users,
  X,
  LayoutDashboard,
  AlertOctagon,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SearchItem {
  id: string
  title: string
  category: 'Views' | 'Risks' | 'Controls' | 'Incidents & KRIs' | 'Frameworks' | 'People'
  subtitle?: string
  routeId: string
  keywords?: string[]
}

const SEARCH_DATABASE: SearchItem[] = [
  // Views & Modules
  {
    id: 'view-exec',
    title: 'Executive Risk Dashboard',
    category: 'Views',
    subtitle: 'Portfolio heat, capital at risk, executive metrics & KRIs',
    routeId: 'dashboard-executive',
    keywords: ['dashboard', 'executive', 'kpi', 'heat', 'capital', 'board'],
  },
  {
    id: 'view-ops',
    title: 'Operational Risk Dashboard',
    category: 'Views',
    subtitle: 'Loss events, KRI thresholds, control failures & testing ops',
    routeId: 'dashboard-operations',
    keywords: ['operational', 'operations', 'kri', 'losses', 'telemetry'],
  },
  {
    id: 'view-my-work',
    title: 'My Work & Review Queue',
    category: 'Views',
    subtitle: '7 assigned items: 4 actions due, 2 reviews pending, 1 attestation',
    routeId: 'my-work',
    keywords: ['my work', 'tasks', 'actions due', 'reviews', 'queue'],
  },
  {
    id: 'view-matrix',
    title: '5×5 Risk Matrix & Heat Map',
    category: 'Views',
    subtitle: 'Inherent vs residual distribution, velocity overlays',
    routeId: 'risks-heat-map',
    keywords: ['matrix', 'heatmap', 'heat map', '5x5', 'distribution', 'severity'],
  },
  {
    id: 'view-register',
    title: 'Enterprise Risk Register',
    category: 'Views',
    subtitle: 'Full 248 enterprise risk inventory with owner assignments',
    routeId: 'risks-all',
    keywords: ['register', 'inventory', 'risks', 'all risks'],
  },
  {
    id: 'view-assessments',
    title: 'Risk Assessments Campaigns',
    category: 'Views',
    subtitle: 'Active campaigns, scoring templates, and historical reviews',
    routeId: 'assessments',
    keywords: ['assessments', 'campaigns', 'scoring', 'templates'],
  },
  {
    id: 'view-scenarios',
    title: 'Scenarios & Stress Testing',
    category: 'Views',
    subtitle: 'Simulated cyber breach, liquidity shock, failover drills',
    routeId: 'scenarios',
    keywords: ['scenarios', 'stress', 'simulation', 'testing', 'kri'],
  },
  {
    id: 'view-controls',
    title: 'Control Library & Testing',
    category: 'Views',
    subtitle: '84 preventive and detective controls mapped to frameworks',
    routeId: 'controls',
    keywords: ['controls', 'library', 'testing', 'deficiencies'],
  },
  {
    id: 'view-frameworks',
    title: 'Frameworks & Policies',
    category: 'Views',
    subtitle: 'ISO 27001, SOC 2 Type II, NIST CSF, and enterprise policies',
    routeId: 'frameworks',
    keywords: ['frameworks', 'iso', 'soc2', 'soc 2', 'nist', 'policies'],
  },
  {
    id: 'view-incidents',
    title: 'Incidents & Action Plans',
    category: 'Views',
    subtitle: 'P1/P2 operational incident tracking and mitigation actions',
    routeId: 'incidents',
    keywords: ['incidents', 'actions', 'loss events', 'p1', 'p2', 'remediation'],
  },
  {
    id: 'view-audits',
    title: 'Internal & External Audits',
    category: 'Views',
    subtitle: 'Fieldwork status, findings, audit workpapers, and sign-offs',
    routeId: 'audits',
    keywords: ['audits', 'internal audit', 'external audit', 'findings'],
  },
  {
    id: 'view-reports',
    title: 'Reports & Board Reporting Packs',
    category: 'Views',
    subtitle: 'Board risk summaries, compliance declarations, regulatory exports',
    routeId: 'reports',
    keywords: ['reports', 'board deck', 'export', 'pdf', 'analytics'],
  },
  {
    id: 'view-org',
    title: 'Organization, Users & Permissions',
    category: 'Views',
    subtitle: 'Entity hierarchy, RBAC roles, audit logs, and integrations',
    routeId: 'people',
    keywords: ['users', 'roles', 'permissions', 'organization', 'settings', 'rbac'],
  },

  // Risks
  {
    id: 'rsk-1042',
    title: 'RSK-1042: Third-Party Cloud Processor Data Breach',
    category: 'Risks',
    subtitle: 'Residual Score: 16 (High) · Technology & Cyber · Owner: Marcus Vance',
    routeId: 'assess-RSK-1042',
    keywords: ['rsk-1042', 'data breach', 'third party', 'cloud', 'cyber', 'vendor'],
  },
  {
    id: 'rsk-1089',
    title: 'RSK-1089: Core Payment Gateway Latency Spike',
    category: 'Risks',
    subtitle: 'Residual Score: 15 (High) · Operational · Owner: Sarah Chen',
    routeId: 'dashboard-operations',
    keywords: ['rsk-1089', 'payment', 'latency', 'gateway', 'operational', 'p1'],
  },
  {
    id: 'rsk-1014',
    title: 'RSK-1014: Cross-Border Regulatory Non-Compliance',
    category: 'Risks',
    subtitle: 'Residual Score: 12 (Medium) · Compliance · Owner: David K.',
    routeId: 'risks',
    keywords: ['rsk-1014', 'regulatory', 'cross-border', 'compliance', 'sec', 'finra'],
  },
  {
    id: 'rsk-1077',
    title: 'RSK-1077: Liquidity Buffer Depletion under High Volatility',
    category: 'Risks',
    subtitle: 'Residual Score: 20 (Critical) · Financial · Owner: CFO Desk',
    routeId: 'scenarios',
    keywords: ['rsk-1077', 'liquidity', 'financial', 'buffer', 'capital', 'breach'],
  },

  // Controls
  {
    id: 'ctl-sec-004',
    title: 'CTRL-SEC-004: Multi-Factor Authentication (MFA) Enforcement',
    category: 'Controls',
    subtitle: 'Preventive · SOC 2 CC6.1 · Status: Deficient (Remediation active)',
    routeId: 'controls-deficiencies',
    keywords: ['ctrl-sec-004', 'mfa', 'authentication', 'soc 2', 'deficiency'],
  },
  {
    id: 'ctl-bcp-001',
    title: 'CTRL-BCP-001: Cloud Multi-Region Failover & Warm Standby',
    category: 'Controls',
    subtitle: 'Corrective · ISO 27001 A.12 · Status: Effective (Tested Q3)',
    routeId: 'controls',
    keywords: ['ctrl-bcp-001', 'failover', 'disaster recovery', 'cloud', 'iso 27001'],
  },
  {
    id: 'ctl-221',
    title: 'CTL-221: Quarterly Privileged Access Review',
    category: 'Controls',
    subtitle: 'Detective · SOC 2 CC6.3 · Status: Effective (Owner: IAM Team)',
    routeId: 'controls',
    keywords: ['ctl-221', 'access review', 'iam', 'privileged', 'effective'],
  },

  // Incidents & KRIs
  {
    id: 'inc-8821',
    title: 'INC-8821: Payment Gateway Timeout Surge in EU Region',
    category: 'Incidents & KRIs',
    subtitle: 'Severity: P1 · €142k estimated impact · Status: Remediating',
    routeId: 'incidents',
    keywords: ['inc-8821', 'payment', 'p1', 'timeout', 'incident'],
  },
  {
    id: 'kri-ops-01',
    title: 'KRI-OPS-01: Payment API Failure Rate (> 0.25% Threshold)',
    category: 'Incidents & KRIs',
    subtitle: 'Current: 0.42% (Critical breach) · Trend: +0.18% past 24h',
    routeId: 'scenarios',
    keywords: ['kri-ops-01', 'kri', 'failure rate', 'threshold', 'breach'],
  },

  // People
  {
    id: 'user-priya',
    title: 'Priya Nair',
    category: 'People',
    subtitle: 'Head of Operational Risk · Executive Sponsor',
    routeId: 'people',
    keywords: ['priya nair', 'operational risk', 'head', 'owner'],
  },
  {
    id: 'user-marcus',
    title: 'Marcus Vance',
    category: 'People',
    subtitle: 'Chief Information Security Officer (CISO)',
    routeId: 'people',
    keywords: ['marcus vance', 'ciso', 'cyber', 'security'],
  },
  {
    id: 'user-sarah',
    title: 'Sarah Chen',
    category: 'People',
    subtitle: 'Senior Risk Manager · Payments & Infrastructure',
    routeId: 'people',
    keywords: ['sarah chen', 'risk manager', 'payments', 'owner'],
  },
]

const categoryIcons: Record<string, React.ElementType> = {
  Views: LayoutDashboard,
  Risks: FileWarning,
  Controls: Shield,
  'Incidents & KRIs': AlertOctagon,
  Frameworks: BookOpen,
  People: Users,
  default: SearchIcon,
}

export interface SearchCommandProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  placeholder?: string
  onSelect?: (routeId: string) => void
}

export function SearchCommand({
  open,
  onOpenChange,
  placeholder = 'Search risks, controls, actions…',
  onSelect,
}: SearchCommandProps) {
  const [query, setQuery] = React.useState('')
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)

  const handleClose = React.useCallback(() => {
    setQuery('')
    setSelectedIndex(0)
    onOpenChange(false)
  }, [onOpenChange])

  const filteredResults: SearchItem[] = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      // Default suggested items when empty
      return SEARCH_DATABASE.filter((item) =>
        ['view-exec', 'view-ops', 'view-matrix', 'rsk-1042', 'ctl-sec-004', 'inc-8821'].includes(item.id),
      )
    }
    return SEARCH_DATABASE.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q)
      const matchCat = item.category.toLowerCase().includes(q)
      const matchSub = item.subtitle?.toLowerCase().includes(q)
      const matchKeywords = item.keywords?.some((k) => k.toLowerCase().includes(q))
      return matchTitle || matchCat || matchSub || matchKeywords
    })
  }, [query])

  // Reset selected index when filtered results change
  React.useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Keyboard navigation
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1 < filteredResults.length ? prev + 1 : 0))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filteredResults.length - 1))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredResults[selectedIndex]) {
          const item = filteredResults[selectedIndex]
          handleClose()
          onSelect?.(item.routeId)
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, handleClose, filteredResults, selectedIndex, onSelect])

  // Focus input when opened
  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 15)
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[var(--z-modal,500)] flex items-start justify-center pt-[10vh] sm:pt-[12vh] px-3 sm:px-4">
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
        onClick={handleClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Global search"
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xl shadow-slate-900/15 animate-in zoom-in-95 duration-150"
      >
        {/* Search Input Bar */}
        <div className="flex h-14 items-center gap-3 border-b border-slate-200/90 px-4">
          <SearchIcon className="size-5 shrink-0 text-slate-400" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="h-full flex-1 bg-transparent text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
            aria-autocomplete="list"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="rounded-md p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X className="size-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] font-mono text-slate-500">
            ESC
          </kbd>
        </div>

        {/* Results Area */}
        <div ref={listRef} className="max-h-[380px] overflow-y-auto p-2 scrollbar-thin">
          {!query && (
            <div className="px-3 pt-2 pb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <Sparkles className="size-3 text-amber-500" />
                Suggested Views & Quick Navigation
              </span>
              <span className="text-[11px] text-slate-400 font-normal">Use ↑↓ to navigate</span>
            </div>
          )}

          {query && filteredResults.length === 0 && (
            <div className="px-4 py-12 text-center">
              <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-2.5">
                <SearchIcon className="size-5" />
              </div>
              <div className="text-[14px] font-semibold text-slate-800">No results found</div>
              <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                No matching risks, controls, or modules found for “{query}”. Try searching for “Executive”, “Heat Map”, “MFA”, or “P1”.
              </p>
            </div>
          )}

          {filteredResults.length > 0 && (
            <div className="space-y-1">
              {filteredResults.map((item, index) => {
                const Icon = categoryIcons[item.category] || categoryIcons.default
                const isSelected = index === selectedIndex

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      handleClose()
                      onSelect?.(item.routeId)
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all cursor-pointer',
                      isSelected
                        ? 'bg-blue-50/80 text-blue-900 ring-1 ring-blue-500/30'
                        : 'hover:bg-slate-50 text-slate-800',
                    )}
                  >
                    <div
                      className={cn(
                        'flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors',
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500',
                      )}
                    >
                      <Icon className="size-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-semibold truncate">{item.title}</span>
                        <span
                          className={cn(
                            'rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider',
                            item.category === 'Risks'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200/60'
                              : item.category === 'Controls'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                              : item.category === 'Incidents & KRIs'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                              : 'bg-slate-100 text-slate-600 border border-slate-200/60',
                          )}
                        >
                          {item.category}
                        </span>
                      </div>
                      {item.subtitle && (
                        <p
                          className={cn(
                            'text-xs truncate mt-0.5',
                            isSelected ? 'text-blue-700/80' : 'text-slate-500',
                          )}
                        >
                          {item.subtitle}
                        </p>
                      )}
                    </div>

                    <ArrowRight
                      className={cn(
                        'size-4 shrink-0 transition-transform',
                        isSelected
                          ? 'text-blue-600 translate-x-0.5 opacity-100'
                          : 'text-slate-300 opacity-0 group-hover:opacity-100',
                      )}
                    />
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 px-4 py-2.5 text-[11px] text-slate-500 font-medium">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-slate-200 bg-white px-1 py-0.5 font-mono text-[10px]">↑</kbd>
              <kbd className="rounded border border-slate-200 bg-white px-1 py-0.5 font-mono text-[10px]">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-slate-200 bg-white px-1 py-0.5 font-mono text-[10px]">↵</kbd>
              Open
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-slate-200 bg-white px-1 py-0.5 font-mono text-[10px]">ESC</kbd>
              Close
            </span>
          </div>
          <span className="text-slate-400">RiskOS ERM Search</span>
        </div>
      </div>
    </div>
  )
}

export function GlobalSearch({
  className,
  placeholder = 'Search risks, controls, actions…',
  onSelect,
}: {
  className?: string
  placeholder?: string
  onSelect?: (routeId: string) => void
}) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'group flex h-8.5 w-full items-center gap-2 rounded-lg border border-slate-200/90 bg-slate-50/90 px-3 text-left transition-all cursor-pointer shadow-2xs',
          'hover:border-slate-300 hover:bg-white hover:shadow-xs',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-400',
          className,
        )}
      >
        <SearchIcon className="size-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" aria-hidden />
        <span className="flex-1 truncate text-xs text-slate-400 group-hover:text-slate-600 font-normal transition-colors">
          {placeholder}
        </span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-slate-200/80 bg-white px-1.5 py-0.5 text-[10px] font-mono text-slate-400 font-medium shadow-2xs group-hover:border-slate-300 group-hover:text-slate-600 transition-all">
          ⌘K
        </kbd>
      </button>

      <SearchCommand open={open} onOpenChange={setOpen} placeholder={placeholder} onSelect={onSelect} />
    </>
  )
}
