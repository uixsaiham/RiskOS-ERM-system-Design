import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { ORGANIZATIONS, REPORTING_PERIODS } from '../dashboard-data'
import { Download, RefreshCw } from 'lucide-react'

interface DashboardHeaderProps {
  organization: string
  onOrganizationChange: (org: string) => void
  period: string
  onPeriodChange: (period: string) => void
  isRefreshing?: boolean
  onRefresh?: () => void
  onExport?: () => void
}

export function DashboardHeader({
  organization,
  onOrganizationChange,
  period,
  onPeriodChange,
  isRefreshing = false,
  onRefresh,
  onExport,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-slate-200/80 pb-5 lg:flex-row lg:items-center">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <span>Overview</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-medium">Executive Dashboard</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Live portfolio
          </span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Executive Risk Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-3xl">
          Enterprise-wide risk exposure, emerging threats, control effectiveness, and mitigation progress.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {/* Organization selector */}
        <div className="w-52">
          <Select
            value={organization}
            onChange={(e) => onOrganizationChange(e.target.value)}
            aria-label="Select Organization"
          >
            {ORGANIZATIONS.map((org) => (
              <option key={org} value={org}>
                {org}
              </option>
            ))}
          </Select>
        </div>

        {/* Reporting Period selector */}
        <div className="w-40">
          <Select
            value={period}
            onChange={(e) => onPeriodChange(e.target.value)}
            aria-label="Select Reporting Period"
          >
            {REPORTING_PERIODS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </Select>
        </div>

        {/* Refresh button */}
        <Button
          variant="secondary"
          size="sm"
          onClick={onRefresh}
          disabled={isRefreshing}
          aria-label="Refresh dashboard data"
          className="gap-1.5"
        >
          <RefreshCw className={`size-4 ${isRefreshing ? 'animate-spin text-[var(--color-primary)]' : ''}`} />
          <span className="hidden sm:inline">Refresh</span>
        </Button>

        {/* Export Report button */}
        <Button
          variant="primary"
          size="sm"
          onClick={onExport}
          className="gap-2 shrink-0 shadow-xs bg-slate-900 hover:bg-slate-800 text-white rounded-lg"
        >
          <Download className="size-4" />
          <span>Export Report</span>
        </Button>
      </div>
    </div>
  )
}
