import { Search, X, RotateCcw, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui'
import {
  DEPARTMENTS,
  RISK_CATEGORIES,
  RISK_OWNERS,
  type DepartmentName,
  type RiskCategoryName,
  type RegisterRiskStatus,
  type RiskAppetiteStatus,
} from '@/risk-register'
import type { RiskMatrixFilters } from '../risk-matrix-data'

interface MatrixFilterToolbarProps {
  filters: RiskMatrixFilters
  onChangeFilter: <K extends keyof RiskMatrixFilters>(key: K, value: RiskMatrixFilters[K]) => void
  onResetFilters: () => void
  totalCount: number
  filteredCount: number
}

export function MatrixFilterToolbar({
  filters,
  onChangeFilter,
  onResetFilters,
  totalCount,
  filteredCount,
}: MatrixFilterToolbarProps) {
  const isFiltered =
    Boolean(filters.search.trim()) ||
    filters.department !== 'all' ||
    filters.category !== 'all' ||
    filters.owner !== 'all' ||
    filters.status !== 'all' ||
    filters.appetite !== 'all' ||
    filters.severity !== 'all'

  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-xs space-y-3">
      {/* ── Top Controls Bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search className="absolute left-3 top-2.5 size-3.5 text-slate-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onChangeFilter('search', e.target.value)}
            placeholder="Search by ID, title, owner..."
            className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-8 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => onChangeFilter('search', '')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Department */}
          <div className="relative">
            <select
              value={filters.department}
              onChange={(e) => onChangeFilter('department', e.target.value as DepartmentName | 'all')}
              className="appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-7 py-1.5 text-xs text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer shadow-2xs font-medium"
            >
              <option value="all">All departments</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-2.5 size-3 text-slate-400" />
          </div>

          {/* Category */}
          <div className="relative">
            <select
              value={filters.category}
              onChange={(e) => onChangeFilter('category', e.target.value as RiskCategoryName | 'all')}
              className="appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-7 py-1.5 text-xs text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer shadow-2xs font-medium"
            >
              <option value="all">All categories</option>
              {RISK_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-2.5 size-3 text-slate-400" />
          </div>

          {/* Owner */}
          <div className="relative">
            <select
              value={filters.owner}
              onChange={(e) => onChangeFilter('owner', e.target.value)}
              className="appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-7 py-1.5 text-xs text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer shadow-2xs font-medium"
            >
              <option value="all">All owners</option>
              {RISK_OWNERS.map((o) => (
                <option key={o.name} value={o.name}>
                  {o.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-2.5 size-3 text-slate-400" />
          </div>

          {/* Status */}
          <div className="relative">
            <select
              value={filters.status}
              onChange={(e) => onChangeFilter('status', e.target.value as RegisterRiskStatus | 'all')}
              className="appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-7 py-1.5 text-xs text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer shadow-2xs font-medium"
            >
              <option value="all">All statuses</option>
              <option value="open">Open</option>
              <option value="under_review">Under review</option>
              <option value="mitigating">Mitigating</option>
              <option value="accepted">Accepted</option>
              <option value="closed">Closed</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-2.5 size-3 text-slate-400" />
          </div>

          {/* Appetite */}
          <div className="relative">
            <select
              value={filters.appetite}
              onChange={(e) => onChangeFilter('appetite', e.target.value as RiskAppetiteStatus | 'all')}
              className="appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-7 py-1.5 text-xs text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer shadow-2xs font-medium"
            >
              <option value="all">All appetite states</option>
              <option value="within">Within appetite</option>
              <option value="near_threshold">Near threshold</option>
              <option value="breached">Above appetite</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-2.5 size-3 text-slate-400" />
          </div>

          {/* Clear All */}
          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onResetFilters}
              className="gap-1 h-8 text-xs text-slate-500 hover:text-rose-600 font-medium"
            >
              <RotateCcw className="size-3" />
              <span>Reset filters</span>
            </Button>
          )}
        </div>
      </div>

      {/* ── Active Filter Chips & Counter ── */}
      {isFiltered && (
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-medium text-slate-400 mr-1">
              Active:
            </span>

            {filters.search && (
              <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 border border-slate-200/70 px-2 py-0.5 text-xs font-medium text-slate-700">
                Query: "{filters.search}"
                <button type="button" onClick={() => onChangeFilter('search', '')} className="text-slate-400 hover:text-slate-600">
                  <X className="size-3" />
                </button>
              </span>
            )}

            {filters.department !== 'all' && (
              <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 border border-slate-200/70 px-2 py-0.5 text-xs font-medium text-slate-700">
                Dept: {filters.department}
                <button type="button" onClick={() => onChangeFilter('department', 'all')} className="text-slate-400 hover:text-slate-600">
                  <X className="size-3" />
                </button>
              </span>
            )}

            {filters.category !== 'all' && (
              <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 border border-slate-200/70 px-2 py-0.5 text-xs font-medium text-slate-700">
                Category: {filters.category}
                <button type="button" onClick={() => onChangeFilter('category', 'all')} className="text-slate-400 hover:text-slate-600">
                  <X className="size-3" />
                </button>
              </span>
            )}

            {filters.owner !== 'all' && (
              <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 border border-slate-200/70 px-2 py-0.5 text-xs font-medium text-slate-700">
                Owner: {filters.owner}
                <button type="button" onClick={() => onChangeFilter('owner', 'all')} className="text-slate-400 hover:text-slate-600">
                  <X className="size-3" />
                </button>
              </span>
            )}

            {filters.status !== 'all' && (
              <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 border border-slate-200/70 px-2 py-0.5 text-xs font-medium text-slate-700 capitalize">
                Status: {filters.status.replace('_', ' ')}
                <button type="button" onClick={() => onChangeFilter('status', 'all')} className="text-slate-400 hover:text-slate-600">
                  <X className="size-3" />
                </button>
              </span>
            )}

            {filters.appetite !== 'all' && (
              <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 border border-slate-200/70 px-2 py-0.5 text-xs font-medium text-slate-700">
                Appetite: {filters.appetite === 'breached' ? 'Above Appetite' : filters.appetite}
                <button type="button" onClick={() => onChangeFilter('appetite', 'all')} className="text-slate-400 hover:text-slate-600">
                  <X className="size-3" />
                </button>
              </span>
            )}

            {filters.severity !== 'all' && (
              <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 border border-slate-200/70 px-2 py-0.5 text-xs font-medium text-slate-700 capitalize">
                Severity: {filters.severity}
                <button type="button" onClick={() => onChangeFilter('severity', 'all')} className="text-slate-400 hover:text-slate-600">
                  <X className="size-3" />
                </button>
              </span>
            )}
          </div>

          <span className="text-xs font-mono text-slate-500 font-medium">
            Showing {filteredCount} of {totalCount} risks
          </span>
        </div>
      )}
    </div>
  )
}
