import { Search, X, RotateCcw, ChevronDown } from 'lucide-react'
import {
  type ControlFilters,
  CONTROL_TAXONOMY,
} from '../controls-data'

interface ControlFilterToolbarProps {
  filters: ControlFilters
  onChangeFilter: <K extends keyof ControlFilters>(key: K, value: ControlFilters[K]) => void
  onResetFilters: () => void
  totalCount: number
  filteredCount: number
  availableOwners: string[]
  availableRiskIds: string[]
}

export function ControlFilterToolbar({
  filters,
  onChangeFilter,
  onResetFilters,
  totalCount,
  filteredCount,
  availableOwners,
  availableRiskIds,
}: ControlFilterToolbarProps) {
  const isFiltered =
    Boolean(filters.search.trim()) ||
    filters.type !== 'all' ||
    filters.category !== 'all' ||
    filters.department !== 'all' ||
    filters.owner !== 'all' ||
    filters.implementationStatus !== 'all' ||
    filters.effectiveness !== 'all' ||
    filters.frequency !== 'all' ||
    filters.linkedRisk !== 'all'

  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-xs space-y-2.5">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[260px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onChangeFilter('search', e.target.value)}
            placeholder="Search by ID, name, owner, procedure, or framework…"
            className="w-full h-8.5 rounded-lg border border-slate-200/90 bg-white pl-8.5 pr-8 text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => onChangeFilter('search', '')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="size-3" />
            </button>
          )}
        </div>

        {/* Primary Filter Selects */}
        <div className="flex flex-wrap items-center gap-2">
          {/* 1. Type */}
          <div className="relative">
            <select
              value={filters.type}
              onChange={(e) => onChangeFilter('type', e.target.value as any)}
              className="h-8.5 appearance-none rounded-lg border border-slate-200/90 bg-white pl-2.5 pr-7 text-xs text-slate-700 font-medium hover:border-slate-300 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all cursor-pointer"
            >
              <option value="all">Type: All</option>
              {CONTROL_TAXONOMY.types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-3 text-slate-400" />
          </div>

          {/* 2. Effectiveness */}
          <div className="relative">
            <select
              value={filters.effectiveness}
              onChange={(e) => onChangeFilter('effectiveness', e.target.value as any)}
              className="h-8.5 appearance-none rounded-lg border border-slate-200/90 bg-white pl-2.5 pr-7 text-xs text-slate-700 font-medium hover:border-slate-300 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all cursor-pointer"
            >
              <option value="all">Effectiveness: All</option>
              {CONTROL_TAXONOMY.effectivenessRatings.map((eff) => (
                <option key={eff} value={eff}>
                  {eff}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-3 text-slate-400" />
          </div>

          {/* 3. Category */}
          <div className="relative">
            <select
              value={filters.category}
              onChange={(e) => onChangeFilter('category', e.target.value as any)}
              className="h-8.5 appearance-none rounded-lg border border-slate-200/90 bg-white pl-2.5 pr-7 text-xs text-slate-700 font-medium hover:border-slate-300 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all cursor-pointer"
            >
              <option value="all">Category: All</option>
              {CONTROL_TAXONOMY.categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-3 text-slate-400" />
          </div>

          {/* 4. Owner */}
          <div className="relative">
            <select
              value={filters.owner}
              onChange={(e) => onChangeFilter('owner', e.target.value as any)}
              className="h-8.5 appearance-none rounded-lg border border-slate-200/90 bg-white pl-2.5 pr-7 text-xs text-slate-700 font-medium hover:border-slate-300 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all cursor-pointer"
            >
              <option value="all">Owner: All</option>
              {availableOwners.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-3 text-slate-400" />
          </div>

          {/* 5. Linked Risk */}
          <div className="relative">
            <select
              value={filters.linkedRisk}
              onChange={(e) => onChangeFilter('linkedRisk', e.target.value as any)}
              className="h-8.5 appearance-none rounded-lg border border-slate-200/90 bg-white pl-2.5 pr-7 text-xs text-slate-700 font-medium hover:border-slate-300 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all cursor-pointer"
            >
              <option value="all">Linked risk: All</option>
              {availableRiskIds.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-3 text-slate-400" />
          </div>

          {/* Reset Filters */}
          {isFiltered && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="size-3" />
              <span>Reset</span>
            </button>
          )}

          {/* Result count */}
          <div className="text-xs text-slate-500 font-normal ml-auto pl-2 border-l border-slate-200">
            Showing <strong className="font-semibold text-slate-900">{filteredCount}</strong> of {totalCount}
          </div>
        </div>
      </div>
    </div>
  )
}
