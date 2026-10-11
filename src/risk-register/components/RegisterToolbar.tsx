import { Input, Select, Button, Badge } from '@/components/ui'
import {
  Search,
  X,
  SlidersHorizontal,
  Columns,
  LayoutGrid,
  List,
  Maximize2,
  Minimize2,
} from 'lucide-react'
import {
  RISK_CATEGORIES,
  DEPARTMENTS,
  type RiskSeverity,
  type RegisterRiskStatus,
  type RiskCategoryName,
  type DepartmentName,
  type RiskAppetiteStatus,
} from '../risk-register-data'

interface RegisterToolbarProps {
  searchQuery: string
  onSearchChange: (q: string) => void
  selectedSeverity: RiskSeverity | null
  onSeverityChange: (s: RiskSeverity | null) => void
  selectedStatus: RegisterRiskStatus | null
  onStatusChange: (s: RegisterRiskStatus | null) => void
  selectedCategory: RiskCategoryName | null
  onCategoryChange: (c: RiskCategoryName | null) => void
  selectedDepartment: DepartmentName | null
  onDepartmentChange: (d: DepartmentName | null) => void
  selectedAppetite: RiskAppetiteStatus | null
  onAppetiteChange: (a: RiskAppetiteStatus | null) => void
  isOverdueOnly: boolean
  onToggleOverdue: () => void
  onOpenAdvancedFilters: () => void
  advancedFilterCount: number
  tableDensity: 'comfortable' | 'compact'
  onToggleDensity: () => void
  onOpenColumnManager: () => void
  viewMode: 'table' | 'cards'
  onViewModeChange: (mode: 'table' | 'cards') => void
}

export function RegisterToolbar({
  searchQuery,
  onSearchChange,
  selectedSeverity,
  onSeverityChange,
  selectedStatus,
  onStatusChange,
  selectedCategory,
  onCategoryChange,
  selectedDepartment,
  onDepartmentChange,
  selectedAppetite,
  onAppetiteChange,
  isOverdueOnly,
  onToggleOverdue,
  onOpenAdvancedFilters,
  advancedFilterCount,
  tableDensity,
  onToggleDensity,
  onOpenColumnManager,
  viewMode,
  onViewModeChange,
}: RegisterToolbarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200/80 bg-white p-3 shadow-xs">
      {/* Top row: Search + Primary filters */}
      <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
        {/* Search input */}
        <div className="relative flex-1 min-w-[260px] max-w-md">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search risks by ID, name, owner, category..."
            className="pl-8.5 pr-8 h-8.5 text-xs rounded-lg border-slate-200/90"
            aria-label="Search risks by ID, name, owner, category"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              aria-label="Clear search query"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {/* Quick Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Severity Filter */}
          <div className="w-32">
            <Select
              value={selectedSeverity ?? 'all'}
              onChange={(e) =>
                onSeverityChange(e.target.value === 'all' ? null : (e.target.value as RiskSeverity))
              }
              className="h-8.5 text-xs rounded-lg border-slate-200/90"
              aria-label="Filter by Severity"
            >
              <option value="all">Severity: All</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="moderate">Moderate</option>
              <option value="low">Low</option>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="w-34">
            <Select
              value={selectedStatus ?? 'all'}
              onChange={(e) =>
                onStatusChange(
                  e.target.value === 'all' ? null : (e.target.value as RegisterRiskStatus),
                )
              }
              className="h-8.5 text-xs rounded-lg border-slate-200/90"
              aria-label="Filter by Status"
            >
              <option value="all">Status: All</option>
              <option value="open">Open</option>
              <option value="under_review">Under Review</option>
              <option value="mitigating">Mitigating</option>
              <option value="accepted">Accepted</option>
              <option value="closed">Closed</option>
            </Select>
          </div>

          {/* Department Filter */}
          <div className="w-36">
            <Select
              value={selectedDepartment ?? 'all'}
              onChange={(e) =>
                onDepartmentChange(
                  e.target.value === 'all' ? null : (e.target.value as DepartmentName),
                )
              }
              className="h-8.5 text-xs rounded-lg border-slate-200/90"
              aria-label="Filter by Department"
            >
              <option value="all">Dept: All</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </Select>
          </div>

          {/* Category Filter */}
          <div className="w-36">
            <Select
              value={selectedCategory ?? 'all'}
              onChange={(e) =>
                onCategoryChange(
                  e.target.value === 'all' ? null : (e.target.value as RiskCategoryName),
                )
              }
              className="h-8.5 text-xs rounded-lg border-slate-200/90"
              aria-label="Filter by Category"
            >
              <option value="all">Category: All</option>
              {RISK_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
          </div>

          {/* Appetite Filter */}
          <div className="w-36">
            <Select
              value={selectedAppetite ?? 'all'}
              onChange={(e) =>
                onAppetiteChange(
                  e.target.value === 'all' ? null : (e.target.value as RiskAppetiteStatus),
                )
              }
              className="h-8.5 text-xs rounded-lg border-slate-200/90"
              aria-label="Filter by Appetite"
            >
              <option value="all">Appetite: All</option>
              <option value="within">Within Appetite</option>
              <option value="near_threshold">Near Threshold</option>
              <option value="breached">Above Appetite</option>
            </Select>
          </div>

          {/* Overdue quick toggle */}
          <button
            type="button"
            onClick={onToggleOverdue}
            className={`h-8.5 px-3 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
              isOverdueOnly
                ? 'bg-rose-50 text-rose-700 border-rose-200 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200/90 hover:bg-slate-50'
            }`}
            aria-pressed={isOverdueOnly}
          >
            Overdue only
          </button>
        </div>
      </div>

      {/* Bottom row: More filters, columns, density, and views */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[var(--color-border)] text-xs text-[var(--color-text-muted)]">
        <div className="flex items-center gap-2">
          {/* More Filters button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenAdvancedFilters}
            className="h-7.5 gap-1.5 text-xs"
          >
            <SlidersHorizontal className="size-3.5" />
            <span>More Filters</span>
            {advancedFilterCount > 0 && (
              <Badge variant="primary" size="sm" className="ml-0.5 px-1.5 py-0 text-[10px]">
                {advancedFilterCount}
              </Badge>
            )}
          </Button>

          {/* Columns button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenColumnManager}
            className="h-7.5 gap-1.5 text-xs"
          >
            <Columns className="size-3.5" />
            <span>Columns</span>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {/* Table Density Toggle */}
          <div className="flex items-center gap-1 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-0.5">
            <button
              type="button"
              onClick={onToggleDensity}
              title={
                tableDensity === 'comfortable'
                  ? 'Switch to Compact density'
                  : 'Switch to Comfortable density'
              }
              className={`flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium cursor-pointer transition-colors ${
                tableDensity === 'compact'
                  ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-2xs'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              <Minimize2 className="size-3" />
              <span>Compact</span>
            </button>
            <button
              type="button"
              onClick={onToggleDensity}
              className={`flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium cursor-pointer transition-colors ${
                tableDensity === 'comfortable'
                  ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-2xs'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              <Maximize2 className="size-3" />
              <span>Comfortable</span>
            </button>
          </div>

          {/* View mode toggle (Table vs Cards) */}
          <div className="flex items-center gap-0.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-0.5">
            <button
              type="button"
              onClick={() => onViewModeChange('table')}
              className={`p-1 rounded cursor-pointer transition-colors ${
                viewMode === 'table'
                  ? 'bg-[var(--color-surface)] text-[var(--color-primary)] shadow-2xs'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
              }`}
              title="Table view"
              aria-label="Table view"
            >
              <List className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('cards')}
              className={`p-1 rounded cursor-pointer transition-colors ${
                viewMode === 'cards'
                  ? 'bg-[var(--color-surface)] text-[var(--color-primary)] shadow-2xs'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
              }`}
              title="Card view (Mobile/Tablet)"
              aria-label="Card view"
            >
              <LayoutGrid className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
