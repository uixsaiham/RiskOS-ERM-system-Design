import { useState, useMemo } from 'react'
import {
  ArrowUpDown,
  MoreVertical,
  Eye,
  Edit2,
  Link2,
  Archive,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  ArrowUpRight,
} from 'lucide-react'
import { Avatar, Button } from '@/components/ui'
import type { ControlItem, ControlEffectiveness, ImplementationStatus } from '../controls-data'

interface ControlTableProps {
  controls: ControlItem[]
  onSelectControl: (control: ControlItem) => void
  onEditControl: (control: ControlItem) => void
  onLinkRisk: (control: ControlItem) => void
  onArchiveControl: (control: ControlItem) => void
  onBulkArchive: (controlIds: string[]) => void
  onBulkExport: (controlIds: string[]) => void
  onNavigateToRisk: (riskId: string) => void
}

type SortField = 'id' | 'name' | 'type' | 'category' | 'owner' | 'effectiveness' | 'lastReviewed'
type SortDirection = 'asc' | 'desc'

export function ControlTable({
  controls,
  onSelectControl,
  onEditControl,
  onLinkRisk,
  onArchiveControl,
  onBulkArchive,
  onBulkExport,
  onNavigateToRisk,
}: ControlTableProps) {
  // ── 1. Selection State ──
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // ── 2. Sorting State ──
  const [sortField, setSortField] = useState<SortField>('id')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  // ── 3. Pagination State ──
  const [pageSize, setPageSize] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(1)

  // ── 4. Action Menu Dropdown State ──
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  // ── 5. Sorting Logic ──
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedControls = useMemo(() => {
    return [...controls].sort((a, b) => {
      let valA: string = ''
      let valB: string = ''

      switch (sortField) {
        case 'id':
          valA = a.id
          valB = b.id
          break
        case 'name':
          valA = a.name
          valB = b.name
          break
        case 'type':
          valA = a.type
          valB = b.type
          break
        case 'category':
          valA = a.category
          valB = b.category
          break
        case 'owner':
          valA = a.owner
          valB = b.owner
          break
        case 'effectiveness':
          valA = a.effectiveness
          valB = b.effectiveness
          break
        case 'lastReviewed':
          valA = a.lastReviewed
          valB = b.lastReviewed
          break
      }

      const cmp = valA.localeCompare(valB)
      return sortDirection === 'asc' ? cmp : -cmp
    })
  }, [controls, sortField, sortDirection])

  // ── 6. Pagination Slice ──
  const totalPages = Math.max(1, Math.ceil(sortedControls.length / pageSize))
  const paginatedControls = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return sortedControls.slice(start, start + pageSize)
  }, [sortedControls, currentPage, pageSize])

  // ── 7. Selection Handlers ──
  const handleToggleSelectAll = () => {
    if (selectedIds.length === paginatedControls.length && paginatedControls.length > 0) {
      setSelectedIds([])
    } else {
      setSelectedIds(paginatedControls.map((c) => c.id))
    }
  }

  const handleToggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  // ── Badges ──
  const renderEffectivenessBadge = (eff: ControlEffectiveness) => {
    switch (eff) {
      case 'Effective':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/70">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Effective
          </span>
        )
      case 'Needs Improvement':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200/70">
            <span className="size-1.5 rounded-full bg-amber-500" />
            Needs review
          </span>
        )
      case 'Ineffective':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-800 border border-rose-200/70">
            <span className="size-1.5 rounded-full bg-rose-500" />
            Ineffective
          </span>
        )
      case 'Not Tested':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200/70">
            <span className="size-1.5 rounded-full bg-slate-400" />
            Not tested
          </span>
        )
    }
  }

  const renderStatusBadge = (st: ImplementationStatus) => {
    switch (st) {
      case 'Implemented':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200/70">
            Implemented
          </span>
        )
      case 'In Progress':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200/60">
            In progress
          </span>
        )
      case 'Planned':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-purple-50 text-purple-700 border border-purple-200/60">
            Planned
          </span>
        )
      case 'Not Implemented':
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-rose-50/70 text-rose-700 border border-rose-200/60">
            Not implemented
          </span>
        )
    }
  }

  const renderTypeBadge = (type: string) => {
    switch (type) {
      case 'Preventive':
        return (
          <span className="inline-flex px-2 py-0.5 rounded-md text-[11px] font-medium bg-sky-50 text-sky-700 border border-sky-200/60">
            Preventive
          </span>
        )
      case 'Detective':
        return (
          <span className="inline-flex px-2 py-0.5 rounded-md text-[11px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-200/60">
            Detective
          </span>
        )
      case 'Corrective':
        return (
          <span className="inline-flex px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200/60">
            Corrective
          </span>
        )
      default:
        return <span className="text-xs text-slate-600">{type}</span>
    }
  }

  return (
    <div className="rounded-xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
      {/* ── Bulk Actions Floating Toolbar ── */}
      {selectedIds.length > 0 && (
        <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between text-xs animate-in fade-in">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-blue-300">
              {selectedIds.length} control{selectedIds.length > 1 ? 's' : ''} selected
            </span>
            <button
              type="button"
              onClick={() => setSelectedIds([])}
              className="text-slate-400 hover:text-white underline cursor-pointer"
            >
              Deselect all
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onBulkExport(selectedIds)}
              className="h-7 text-xs bg-slate-800 text-white hover:bg-slate-700 border-slate-700"
            >
              Export selected
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onBulkArchive(selectedIds)}
              className="h-7 text-xs"
            >
              Archive selected
            </Button>
          </div>
        </div>
      )}

      {/* ── Main Data Table ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/70 text-[11px] font-medium text-slate-500 select-none">
              <th className="py-2.5 px-3 w-10 text-center">
                <input
                  type="checkbox"
                  aria-label="Select all controls on this page"
                  checked={
                    paginatedControls.length > 0 &&
                    selectedIds.length === paginatedControls.length
                  }
                  onChange={handleToggleSelectAll}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </th>

              <th
                className="py-2.5 px-3 cursor-pointer hover:text-slate-800 transition-colors"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center gap-1">
                  <span>Control ID</span>
                  <ArrowUpDown className="size-3 text-slate-400" />
                </div>
              </th>

              <th
                className="py-2.5 px-4 min-w-[220px] cursor-pointer hover:text-slate-800 transition-colors"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  <span>Control name</span>
                  <ArrowUpDown className="size-3 text-slate-400" />
                </div>
              </th>

              <th
                className="py-2.5 px-3 cursor-pointer hover:text-slate-800 transition-colors"
                onClick={() => handleSort('type')}
              >
                <div className="flex items-center gap-1">
                  <span>Type</span>
                  <ArrowUpDown className="size-3 text-slate-400" />
                </div>
              </th>

              <th
                className="py-2.5 px-3 cursor-pointer hover:text-slate-800 transition-colors"
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center gap-1">
                  <span>Category</span>
                  <ArrowUpDown className="size-3 text-slate-400" />
                </div>
              </th>

              <th
                className="py-2.5 px-3 cursor-pointer hover:text-slate-800 transition-colors"
                onClick={() => handleSort('owner')}
              >
                <div className="flex items-center gap-1">
                  <span>Owner & dept</span>
                  <ArrowUpDown className="size-3 text-slate-400" />
                </div>
              </th>

              <th className="py-2.5 px-3 min-w-[130px]">Linked risks</th>

              <th className="py-2.5 px-3">Frequency</th>

              <th className="py-2.5 px-3">Implementation</th>

              <th
                className="py-2.5 px-3 cursor-pointer hover:text-slate-800 transition-colors"
                onClick={() => handleSort('effectiveness')}
              >
                <div className="flex items-center gap-1">
                  <span>Effectiveness</span>
                  <ArrowUpDown className="size-3 text-slate-400" />
                </div>
              </th>

              <th
                className="py-2.5 px-3 cursor-pointer hover:text-slate-800 transition-colors"
                onClick={() => handleSort('lastReviewed')}
              >
                <div className="flex items-center gap-1">
                  <span>Last reviewed</span>
                  <ArrowUpDown className="size-3 text-slate-400" />
                </div>
              </th>

              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs">
            {paginatedControls.length === 0 ? (
              <tr>
                <td colSpan={12} className="py-12 text-center text-slate-400">
                  <ShieldAlert className="size-8 mx-auto mb-2 text-slate-300" />
                  <p className="font-semibold text-sm text-slate-700">
                    No controls found
                  </p>
                  <p className="text-xs mt-1 text-slate-500">
                    Try clearing active search filters or check your saved view criteria.
                  </p>
                </td>
              </tr>
            ) : (
              paginatedControls.map((control) => {
                const isSelected = selectedIds.includes(control.id)

                return (
                  <tr
                    key={control.id}
                    className={`hover:bg-slate-50/70 transition-colors group ${
                      isSelected ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3 px-3 text-center">
                      <input
                        type="checkbox"
                        aria-label={`Select control ${control.id}`}
                        checked={isSelected}
                        onChange={() => handleToggleSelectRow(control.id)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </td>

                    {/* ID */}
                    <td className="py-3 px-3 font-mono font-semibold">
                      <button
                        type="button"
                        onClick={() => onSelectControl(control)}
                        className="text-slate-800 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        {control.id}
                      </button>
                    </td>

                    {/* Name */}
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() => onSelectControl(control)}
                        className="font-medium text-slate-900 hover:text-blue-600 transition-colors text-left block leading-tight cursor-pointer"
                      >
                        {control.name}
                      </button>
                      <div className="text-[11px] text-slate-400 mt-0.5 truncate max-w-[280px]">
                        {control.framework || control.method}
                      </div>
                    </td>

                    {/* Type */}
                    <td className="py-3 px-3">{renderTypeBadge(control.type)}</td>

                    {/* Category */}
                    <td className="py-3 px-3">
                      <span className="text-slate-600 font-normal">
                        {control.category}
                      </span>
                    </td>

                    {/* Owner & Dept */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={control.owner} size="sm" />
                        <div>
                          <div className="font-medium text-slate-800 leading-tight">
                            {control.owner}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {control.department}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Linked Risks */}
                    <td className="py-3 px-3">
                      <div className="flex flex-wrap items-center gap-1">
                        {control.linkedRiskIds.length === 0 ? (
                          <span className="text-[11px] text-slate-400 italic">
                            None
                          </span>
                        ) : (
                          control.linkedRiskIds.map((rId) => (
                            <button
                              key={rId}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                onNavigateToRisk(rId)
                              }}
                              className="inline-flex items-center gap-0.5 font-mono text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-slate-200/70 transition-colors cursor-pointer"
                              title={`View Risk ${rId}`}
                            >
                              <span>{rId}</span>
                              <ArrowUpRight className="size-2.5 opacity-60" />
                            </button>
                          ))
                        )}
                      </div>
                    </td>

                    {/* Frequency */}
                    <td className="py-3 px-3 text-slate-600 font-normal">
                      {control.frequency}
                    </td>

                    {/* Implementation Status */}
                    <td className="py-3 px-3">{renderStatusBadge(control.implementationStatus)}</td>

                    {/* Effectiveness */}
                    <td className="py-3 px-3">{renderEffectivenessBadge(control.effectiveness)}</td>

                    {/* Last Reviewed */}
                    <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                      {control.lastReviewed}
                    </td>

                    {/* Action Menu */}
                    <td className="py-3 px-3 text-right relative">
                      <div className="inline-block text-left">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenuId(openMenuId === control.id ? null : control.id)
                          }
                          className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors"
                          aria-label={`Action menu for ${control.id}`}
                        >
                          <MoreVertical className="size-4" />
                        </button>

                        {openMenuId === control.id && (
                          <div
                            className="absolute right-3 top-8 w-44 rounded-xl border border-slate-200 bg-white p-1 shadow-lg z-30 text-xs animate-in fade-in"
                            onMouseLeave={() => setOpenMenuId(null)}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenuId(null)
                                onSelectControl(control)
                              }}
                              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left hover:bg-slate-50 text-slate-700 font-medium cursor-pointer"
                            >
                              <Eye className="size-3.5 text-blue-600" />
                              <span>View details</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenuId(null)
                                onEditControl(control)
                              }}
                              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left hover:bg-slate-50 text-slate-700 font-medium cursor-pointer"
                            >
                              <Edit2 className="size-3.5 text-slate-500" />
                              <span>Edit control</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenuId(null)
                                onLinkRisk(control)
                              }}
                              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left hover:bg-slate-50 text-slate-700 font-medium cursor-pointer"
                            >
                              <Link2 className="size-3.5 text-indigo-600" />
                              <span>Map to risks</span>
                            </button>

                            <div className="my-1 border-t border-slate-100" />

                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenuId(null)
                                onArchiveControl(control)
                              }}
                              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left hover:bg-rose-50 text-rose-600 font-medium cursor-pointer"
                            >
                              <Archive className="size-3.5" />
                              <span>Archive control</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Table Footer / Pagination ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-slate-200/80 bg-slate-50/50 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
              setCurrentPage(1)
            }}
            className="h-7 rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-700 font-medium cursor-pointer focus:outline-hidden"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="text-slate-400 ml-2">
            Showing {paginatedControls.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to{' '}
            {Math.min(currentPage * pageSize, sortedControls.length)} of {sortedControls.length}{' '}
            controls
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-colors cursor-pointer"
          >
            <ChevronLeft className="size-3.5" />
            <span>Previous</span>
          </button>

          <span className="px-2 font-mono text-slate-600">
            {currentPage} of {totalPages}
          </span>

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-colors cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
