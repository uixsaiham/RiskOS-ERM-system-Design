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
    <div className="flex flex-col justify-between gap-4 border-b border-[var(--color-border)] pb-6 lg:flex-row lg:items-center">
      <div>
        <p className="font-overline font-semibold uppercase tracking-wider text-[var(--color-primary)]">
          RISK OVERVIEW
        </p>
        <h1 className="mt-1 font-h1 text-[var(--color-text-primary)] tracking-tight">
          Executive Risk Dashboard
        </h1>
        <p className="mt-1 max-w-3xl font-body-md text-[var(--color-text-secondary)]">
          Monitor enterprise-wide risk exposure, emerging threats, control effectiveness, and mitigation progress.
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
          className="gap-2 shrink-0 shadow-xs"
        >
          <Download className="size-4" />
          <span>Export Report</span>
        </Button>
      </div>
    </div>
  )
}
