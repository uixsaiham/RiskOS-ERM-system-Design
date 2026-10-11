import { Button, Select } from '@/components/ui'
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
    <div className="flex flex-col justify-between gap-4 border-b border-slate-200/80 pb-4 lg:flex-row lg:items-center">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <span>Risk Management</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-medium">Risk Register</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
            <span className="size-1.5 rounded-full bg-blue-500" />
            {totalRisks} enterprise risks
          </span>
          <span className="hidden sm:inline text-slate-400">• Synced {lastSyncTime}</span>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Risk Register
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-3xl">
          Identify, assess, monitor, and manage enterprise risks and mitigation plans across all business lines.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 shrink-0">
        {/* Role permission preview selector */}
        <div className="flex items-center gap-1.5 rounded-lg border border-slate-200/90 bg-white px-2.5 py-1 shadow-xs">
          {userRole === 'manager' && <Shield className="size-3.5 text-blue-600" />}
          {userRole === 'owner' && <UserCheck className="size-3.5 text-emerald-600" />}
          {userRole === 'executive' && <Eye className="size-3.5 text-amber-600" />}
          <span className="text-xs text-slate-500 mr-1 font-medium">Role:</span>
          <Select
            value={userRole}
            onChange={(e) => onRoleChange(e.target.value as UserRolePermission)}
            className="h-7 border-0 bg-transparent text-xs font-medium text-slate-800 focus:ring-0 p-0 pr-6 cursor-pointer"
            aria-label="Current Role Permission"
          >
            <option value="manager">Risk Manager (Full)</option>
            <option value="owner">Risk Owner (Assigned)</option>
            <option value="executive">Executive (Read-Only)</option>
          </Select>
        </div>

        {/* Refresh button */}
        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/80 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          aria-label="Refresh Risk Register"
        >
          <RefreshCw className={`size-3.5 ${isRefreshing ? 'animate-spin text-blue-600' : 'text-slate-400'}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>

        {/* Export button */}
        <button
          type="button"
          onClick={onExport}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/80 shadow-xs transition-colors cursor-pointer"
        >
          <Download className="size-3.5 text-slate-400" />
          <span>Export</span>
        </button>

        {/* Create Risk CTA */}
        {userRole !== 'executive' && (
          <Button
            variant="primary"
            size="sm"
            onClick={onCreateRisk}
            className="gap-1.5 font-medium shadow-xs cursor-pointer bg-slate-900 hover:bg-slate-800 text-white rounded-lg px-3.5"
          >
            <Plus className="size-3.5" />
            <span>Create Risk</span>
          </Button>
        )}
      </div>
    </div>
  )
}
