import { useState } from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Avatar,
  Badge,
  StatusBadge,
  ConfirmDialog,
} from '@/components/ui'
import { Checkbox } from '@/components/ui/checkbox'
import { RiskSeverityBadge } from '@/components/ui/risk-severity'
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  TrendingDown,
  Minus,
  MoreVertical,
  ExternalLink,
  Edit2,
  ShieldCheck,
  Download,
  Archive,
  Calendar,
  AlertTriangle,
  Play,
} from 'lucide-react'
import type { RiskRegisterItem, UserRolePermission } from '../risk-register-data'
import type { ColumnVisibilityState } from './ColumnManagerModal'

interface RiskRegisterTableProps {
  risks: RiskRegisterItem[]
  selectedIds: string[]
  onToggleSelectRow: (id: string) => void
  onToggleSelectAll: () => void
  isAllSelected: boolean
  sortField: keyof RiskRegisterItem
  sortDirection: 'asc' | 'desc'
  onSort: (field: keyof RiskRegisterItem) => void
  onInspectRisk: (risk: RiskRegisterItem) => void
  onOpenFullRisk?: (risk: RiskRegisterItem) => void
  density: 'comfortable' | 'compact'
  visibility: ColumnVisibilityState
  userRole: UserRolePermission
  onArchiveRisk?: (risk: RiskRegisterItem) => void
  onEditRisk?: (risk: RiskRegisterItem) => void
}

export function RiskRegisterTable({
  risks,
  selectedIds,
  onToggleSelectRow,
  onToggleSelectAll,
  isAllSelected,
  sortField,
  sortDirection,
  onSort,
  onInspectRisk,
  onOpenFullRisk,
  density,
  visibility,
  userRole,
  onArchiveRisk,
  onEditRisk,
}: RiskRegisterTableProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null)
  const [riskToArchive, setRiskToArchive] = useState<RiskRegisterItem | null>(null)

  const cellPadding = density === 'compact' ? 'px-2.5 py-1.5 text-xs' : 'px-3.5 py-3 text-sm'
  const headerPadding = density === 'compact' ? 'px-2.5 py-2 text-[11px]' : 'px-3.5 py-2.5 text-xs'

  const renderSortHeader = (field: keyof RiskRegisterItem, label: string) => {
    const isCurrent = sortField === field
    return (
      <button
        type="button"
        onClick={() => onSort(field)}
        className="flex items-center gap-1.5 font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] cursor-pointer group uppercase tracking-wider text-[11px]"
      >
        <span>{label}</span>
        {isCurrent ? (
          sortDirection === 'asc' ? (
            <ArrowUp className="size-3 text-[var(--color-primary)]" />
          ) : (
            <ArrowDown className="size-3 text-[var(--color-primary)]" />
          )
        ) : (
          <ArrowUpDown className="size-3 opacity-0 group-hover:opacity-60 transition-opacity" />
        )}
      </button>
    )
  }

  const getTrendIcon = (trend: RiskRegisterItem['trend']) => {
    switch (trend) {
      case 'increasing':
        return (
          <span
            className="inline-flex items-center gap-1 text-[var(--color-risk-critical-foreground)] font-semibold"
            title="Risk score trending upwards over past 30 days"
          >
            <TrendingUp className="size-3.5" />
            <span className="text-[11px]">Increasing</span>
          </span>
        )
      case 'decreasing':
        return (
          <span
            className="inline-flex items-center gap-1 text-[var(--color-success)] font-semibold"
            title="Risk score trending downwards due to verified controls"
          >
            <TrendingDown className="size-3.5" />
            <span className="text-[11px]">Decreasing</span>
          </span>
        )
      case 'stable':
      default:
        return (
          <span
            className="inline-flex items-center gap-1 text-[var(--color-text-muted)]"
            title="Risk score stable over past 60 days"
          >
            <Minus className="size-3.5" />
            <span className="text-[11px]">Stable</span>
          </span>
        )
    }
  }

  const getAppetiteBadge = (appetite: RiskRegisterItem['appetiteStatus']) => {
    switch (appetite) {
      case 'breached':
        return (
          <Badge variant="error" size="sm" className="font-semibold gap-1 whitespace-nowrap">
            <span className="size-1.5 rounded-full bg-current" />
            Above appetite
          </Badge>
        )
      case 'near_threshold':
        return (
          <Badge variant="warning" size="sm" className="font-semibold gap-1 whitespace-nowrap">
            <span className="size-1.5 rounded-full bg-current" />
            Near threshold
          </Badge>
        )
      case 'within':
      default:
        return (
          <Badge variant="neutral" size="sm" className="whitespace-nowrap">
            Within
          </Badge>
        )
    }
  }

  return (
    <>
      <div className="relative overflow-x-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs">
        <Table>
          <TableHeader className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)]">
            <TableRow className="hover:bg-transparent">
              {/* Checkbox column */}
              <TableHead className="w-10 px-3 py-2 text-center">
                <Checkbox
                  checked={isAllSelected}
                  onChange={onToggleSelectAll}
                  aria-label="Select all rows on current page"
                />
              </TableHead>

              {/* Risk ID */}
              {visibility.id && (
                <TableHead className={headerPadding}>
                  {renderSortHeader('id', 'Risk ID')}
                </TableHead>
              )}

              {/* Title & Description */}
              {visibility.title && (
                <TableHead className={`${headerPadding} min-w-[240px]`}>
                  {renderSortHeader('title', 'Risk Name')}
                </TableHead>
              )}

              {/* Category */}
              {visibility.category && (
                <TableHead className={headerPadding}>
                  {renderSortHeader('category', 'Category')}
                </TableHead>
              )}

              {/* Owner */}
              {visibility.owner && (
                <TableHead className={`${headerPadding} min-w-[140px]`}>
                  {renderSortHeader('owner', 'Owner')}
                </TableHead>
              )}

              {/* Department */}
              {visibility.department && (
                <TableHead className={headerPadding}>
                  {renderSortHeader('department', 'Dept')}
                </TableHead>
              )}

              {/* Inherent Risk */}
              {visibility.inherentRisk && (
                <TableHead className={`${headerPadding} text-right`}>
                  <div className="flex justify-end">
                    {renderSortHeader('inherentScore', 'Inherent')}
                  </div>
                </TableHead>
              )}

              {/* Residual Risk */}
              {visibility.residualRisk && (
                <TableHead className={`${headerPadding} text-right`}>
                  <div className="flex justify-end">
                    {renderSortHeader('residualScore', 'Residual')}
                  </div>
                </TableHead>
              )}

              {/* Trend */}
              {visibility.trend && (
                <TableHead className={headerPadding}>
                  {renderSortHeader('trend', 'Trend')}
                </TableHead>
              )}

              {/* Appetite */}
              {visibility.appetite && (
                <TableHead className={headerPadding}>
                  {renderSortHeader('appetiteStatus', 'Appetite')}
                </TableHead>
              )}

              {/* Status */}
              {visibility.status && (
                <TableHead className={headerPadding}>
                  {renderSortHeader('status', 'Status')}
                </TableHead>
              )}

              {/* Next Review */}
              {visibility.nextReview && (
                <TableHead className={headerPadding}>
                  {renderSortHeader('nextReviewDate', 'Next Review')}
                </TableHead>
              )}

              {/* Last Updated */}
              {visibility.lastUpdated && (
                <TableHead className={headerPadding}>
                  {renderSortHeader('lastUpdated', 'Updated')}
                </TableHead>
              )}

              {/* Row Action Menu */}
              <TableHead className="w-10 px-2 py-2 text-right">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-[var(--color-border)]">
            {risks.map((risk) => {
              const isSelected = selectedIds.includes(risk.id)
              const isMenuOpen = activeMenuId === risk.id

              return (
                <TableRow
                  key={risk.id}
                  onClick={() => onInspectRisk(risk)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[var(--color-primary-subtle)]/45'
                      : 'hover:bg-[var(--color-surface-secondary)]/80'
                  }`}
                >
                  {/* Row Checkbox */}
                  <TableCell
                    className="w-10 px-3 py-2 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      checked={isSelected}
                      onChange={() => onToggleSelectRow(risk.id)}
                      aria-label={`Select risk ${risk.id}`}
                    />
                  </TableCell>

                  {/* Risk ID */}
                  {visibility.id && (
                    <TableCell className={cellPadding}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (onOpenFullRisk) {
                            onOpenFullRisk(risk)
                          } else {
                            onInspectRisk(risk)
                          }
                        }}
                        className="font-mono text-xs font-bold text-[var(--color-primary)] hover:underline focus:outline-none text-left"
                        title={`Open dedicated workspace for ${risk.id}`}
                      >
                        {risk.id}
                      </button>
                    </TableCell>
                  )}

                  {/* Title & Description */}
                  {visibility.title && (
                    <TableCell className={cellPadding}>
                      <div className="space-y-0.5">
                        <p className="font-label text-sm font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors leading-snug">
                          {risk.title}
                        </p>
                        <p className="font-caption text-xs text-[var(--color-text-muted)] line-clamp-1">
                          {risk.description}
                        </p>
                      </div>
                    </TableCell>
                  )}

                  {/* Category */}
                  {visibility.category && (
                    <TableCell className={cellPadding}>
                      <Badge variant="neutral" size="sm" className="whitespace-nowrap">
                        {risk.category}
                      </Badge>
                    </TableCell>
                  )}

                  {/* Owner */}
                  {visibility.owner && (
                    <TableCell className={cellPadding}>
                      <div className="flex items-center gap-2">
                        <Avatar name={risk.owner} size="sm" />
                        <div className="min-w-0">
                          <p className="font-body-sm font-medium text-[var(--color-text-primary)] truncate text-xs">
                            {risk.owner}
                          </p>
                          <p className="font-caption text-[11px] text-[var(--color-text-muted)] truncate hidden md:block">
                            {risk.ownerRole}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  )}

                  {/* Department */}
                  {visibility.department && (
                    <TableCell className={cellPadding}>
                      <span className="font-caption font-medium text-xs text-[var(--color-text-secondary)]">
                        {risk.department}
                      </span>
                    </TableCell>
                  )}

                  {/* Inherent Risk */}
                  {visibility.inherentRisk && (
                    <TableCell className={`${cellPadding} text-right`}>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-bold tabular-nums text-[var(--color-text-secondary)]">
                            {risk.inherentScore}
                          </span>
                          <span className="text-[10px] text-[var(--color-text-muted)]">/ 25</span>
                        </div>
                        <RiskSeverityBadge severity={risk.inherentSeverity} size="sm" />
                      </div>
                    </TableCell>
                  )}

                  {/* Residual Risk */}
                  {visibility.residualRisk && (
                    <TableCell className={`${cellPadding} text-right`}>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-bold tabular-nums text-[var(--color-text-primary)]">
                            {risk.residualScore}
                          </span>
                          <span className="text-[10px] text-[var(--color-text-muted)]">/ 25</span>
                        </div>
                        <RiskSeverityBadge severity={risk.residualSeverity} size="sm" />
                      </div>
                    </TableCell>
                  )}

                  {/* Trend */}
                  {visibility.trend && (
                    <TableCell className={cellPadding}>
                      {getTrendIcon(risk.trend)}
                    </TableCell>
                  )}

                  {/* Appetite */}
                  {visibility.appetite && (
                    <TableCell className={cellPadding}>
                      {getAppetiteBadge(risk.appetiteStatus)}
                    </TableCell>
                  )}

                  {/* Status */}
                  {visibility.status && (
                    <TableCell className={cellPadding}>
                      <StatusBadge status={risk.status} size="sm" />
                    </TableCell>
                  )}

                  {/* Next Review */}
                  {visibility.nextReview && (
                    <TableCell className={cellPadding}>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
                          <Calendar className="size-3 text-[var(--color-text-muted)] shrink-0" />
                          <span className="whitespace-nowrap">{risk.nextReviewDate}</span>
                        </div>
                        {risk.isReviewOverdue && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--color-risk-critical-foreground)] whitespace-nowrap">
                            <AlertTriangle className="size-3" />
                            Overdue ({risk.daysOverdue ?? 7}d)
                          </span>
                        )}
                      </div>
                    </TableCell>
                  )}

                  {/* Last Updated */}
                  {visibility.lastUpdated && (
                    <TableCell className={cellPadding}>
                      <span className="font-caption text-xs text-[var(--color-text-muted)] whitespace-nowrap">
                        {risk.lastUpdated}
                      </span>
                    </TableCell>
                  )}

                  {/* Three-dot Actions Menu */}
                  <TableCell
                    className="w-10 px-2 py-2 text-right relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveMenuId(isMenuOpen ? null : risk.id)}
                      className="p-1 rounded text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)] cursor-pointer"
                      aria-label={`Actions for risk ${risk.id}`}
                    >
                      <MoreVertical className="size-4" />
                    </button>

                    {/* Popover Action Menu */}
                    {isMenuOpen && (
                      <div
                        role="menu"
                        className="absolute right-3 top-8 z-[var(--z-dropdown,300)] w-48 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] py-1 shadow-lg animate-in fade-in zoom-in-95 text-left text-xs"
                      >
                        {onOpenFullRisk && (
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => {
                              setActiveMenuId(null)
                              onOpenFullRisk(risk)
                            }}
                            className="flex w-full items-center gap-2 px-3 py-1.5 font-semibold text-[var(--color-primary)] hover:bg-[var(--color-surface-secondary)]"
                          >
                            <ExternalLink className="size-3.5" />
                            <span>Open Full Workspace</span>
                          </button>
                        )}

                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => {
                            setActiveMenuId(null)
                            onInspectRisk(risk)
                          }}
                          className="flex w-full items-center gap-2 px-3 py-1.5 text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]"
                        >
                          <ExternalLink className="size-3.5 opacity-70" />
                          <span>Quick Preview Drawer</span>
                        </button>

                        {userRole !== 'executive' && (
                          <>
                            <button
                              type="button"
                              role="menuitem"
                              onClick={() => {
                                setActiveMenuId(null)
                                onEditRisk?.(risk)
                              }}
                              className="flex w-full items-center gap-2 px-3 py-1.5 text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]"
                            >
                              <Edit2 className="size-3.5 opacity-70" />
                              <span>Edit Risk</span>
                            </button>

                            <button
                              type="button"
                              role="menuitem"
                              onClick={() => {
                                setActiveMenuId(null)
                                alert(`Assessment cycle initiated for ${risk.id}.`)
                              }}
                              className="flex w-full items-center gap-2 px-3 py-1.5 text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]"
                            >
                              <Play className="size-3.5 text-[var(--color-primary)]" />
                              <span>Start Assessment</span>
                            </button>

                            <button
                              type="button"
                              role="menuitem"
                              onClick={() => {
                                setActiveMenuId(null)
                                alert(`Control review scheduled for ${risk.id}.`)
                              }}
                              className="flex w-full items-center gap-2 px-3 py-1.5 text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]"
                            >
                              <ShieldCheck className="size-3.5 opacity-70" />
                              <span>Review Controls</span>
                            </button>

                            <button
                              type="button"
                              role="menuitem"
                              onClick={() => {
                                setActiveMenuId(null)
                                alert(`Mitigation task created for ${risk.id}.`)
                              }}
                              className="flex w-full items-center gap-2 px-3 py-1.5 text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]"
                            >
                              <Calendar className="size-3.5 opacity-70" />
                              <span>Add Mitigation</span>
                            </button>
                          </>
                        )}

                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => {
                            setActiveMenuId(null)
                            alert(`Exporting risk dossier ${risk.id}...`)
                          }}
                          className="flex w-full items-center gap-2 px-3 py-1.5 text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]"
                        >
                          <Download className="size-3.5 opacity-70" />
                          <span>Export Risk</span>
                        </button>

                        {userRole === 'manager' && (
                          <>
                            <div className="border-t border-[var(--color-border)] my-1" />
                            <button
                              type="button"
                              role="menuitem"
                              onClick={() => {
                                setActiveMenuId(null)
                                setRiskToArchive(risk)
                              }}
                              className="flex w-full items-center gap-2 px-3 py-1.5 text-[var(--color-error)] hover:bg-[var(--color-risk-critical-subtle)]"
                            >
                              <Archive className="size-3.5" />
                              <span>Archive Risk</span>
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Single Risk Archive Confirmation Dialog */}
      <ConfirmDialog
        open={Boolean(riskToArchive)}
        onClose={() => setRiskToArchive(null)}
        onConfirm={() => {
          if (riskToArchive) {
            onArchiveRisk?.(riskToArchive)
            setRiskToArchive(null)
          }
        }}
        title={`Archive ${riskToArchive?.id}`}
        description={`Are you sure you want to archive "${riskToArchive?.title}"? It will be removed from operational monitoring views.`}
        confirmLabel="Archive Risk"
        destructive
      />
    </>
  )
}
