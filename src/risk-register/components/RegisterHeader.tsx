import { Button, Select, Badge } from '@/components/ui'
import { Plus, Download, RefreshCw, Shield, UserCheck, Eye } from 'lucide-react'
import type { UserRolePermission } from '../risk-register-data'

interface RegisterHeaderProps {
  totalRisks: number
  lastSyncTime: string
  userRole: UserRolePermission
  onRoleChange: (role: UserRolePermission) => void
  isRefreshing?: boolean
  onRefresh?: () => void
  onExport?: () => void
  onCreateRisk: () => void
}

export function RegisterHeader({
  totalRisks,
  lastSyncTime,
  userRole,
  onRoleChange,
  isRefreshing = false,
  onRefresh,
  onExport,
  onCreateRisk,
}: RegisterHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-[var(--color-border)] pb-5 lg:flex-row lg:items-center">
      <div>
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="font-h1 text-[var(--color-text-primary)] tracking-tight">
            Risk Register
          </h1>
          <Badge variant="primary" size="sm">
            Step 04 Live
          </Badge>
          <span className="font-caption text-[var(--color-text-muted)]">
            • {totalRisks} active risks • Last synchronized {lastSyncTime}
          </span>
        </div>
        <p className="mt-1 max-w-3xl font-body-md text-[var(--color-text-secondary)]">
          Identify, assess, monitor, and manage enterprise risks from a single workspace.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {/* Role permission preview selector */}
        <div className="flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1 shadow-2xs">
          {userRole === 'manager' && <Shield className="size-3.5 text-[var(--color-primary)]" />}
          {userRole === 'owner' && <UserCheck className="size-3.5 text-[var(--color-success)]" />}
          {userRole === 'executive' && <Eye className="size-3.5 text-[var(--color-warning)]" />}
          <span className="font-caption text-xs text-[var(--color-text-muted)] mr-1">Role:</span>
          <Select
            value={userRole}
            onChange={(e) => onRoleChange(e.target.value as UserRolePermission)}
            className="h-7 border-0 bg-transparent text-xs font-medium focus:ring-0 p-0 pr-6"
            aria-label="Current Role Permission"
          >
            <option value="manager">Risk Manager (Full)</option>
            <option value="owner">Risk Owner (Assigned)</option>
            <option value="executive">Executive (Read-Only)</option>
          </Select>
        </div>

        {/* Refresh button */}
        <Button
          variant="secondary"
          size="sm"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="gap-1.5"
          aria-label="Refresh Risk Register"
        >
          <RefreshCw className={`size-3.5 ${isRefreshing ? 'animate-spin text-[var(--color-primary)]' : ''}`} />
          <span className="hidden sm:inline">Refresh</span>
        </Button>

        {/* Export button */}
        <Button
          variant="secondary"
          size="sm"
          onClick={onExport}
          className="gap-1.5"
        >
          <Download className="size-3.5" />
          <span>Export</span>
        </Button>

        {/* Create Risk primary CTA */}
        {userRole !== 'executive' && (
          <Button
            variant="primary"
            size="sm"
            onClick={onCreateRisk}
            className="gap-1.5 shadow-xs shrink-0"
          >
            <Plus className="size-4" />
            <span>Create Risk</span>
          </Button>
        )}
      </div>
    </div>
  )
}

