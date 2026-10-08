import { Button } from '@/components/ui'
import { X, RotateCcw } from 'lucide-react'
import type {
  RiskSeverity,
  RegisterRiskStatus,
  RiskCategoryName,
  DepartmentName,
  RiskAppetiteStatus,
} from '../risk-register-data'

export interface FilterChipItem {
  id: string
  label: string
  onRemove: () => void
}

interface ActiveFilterChipsProps {
  searchQuery: string
  onClearSearch: () => void
  selectedSeverity: RiskSeverity | null
  onClearSeverity: () => void
  selectedStatus: RegisterRiskStatus | null
  onClearStatus: () => void
  selectedCategory: RiskCategoryName | null
  onClearCategory: () => void
  selectedDepartment: DepartmentName | null
  onClearDepartment: () => void
  selectedAppetite: RiskAppetiteStatus | null
  onClearAppetite: () => void
  isOverdueOnly: boolean
  onClearOverdue: () => void
  onClearAll: () => void
  filteredCount: number
  totalCount: number
}

export function ActiveFilterChips({
  searchQuery,
  onClearSearch,
  selectedSeverity,
  onClearSeverity,
  selectedStatus,
  onClearStatus,
  selectedCategory,
  onClearCategory,
  selectedDepartment,
  onClearDepartment,
  selectedAppetite,
  onClearAppetite,
  isOverdueOnly,
  onClearOverdue,
  onClearAll,
  filteredCount,
  totalCount,
}: ActiveFilterChipsProps) {
  const chips: FilterChipItem[] = []

  if (searchQuery.trim()) {
    chips.push({
      id: 'search',
      label: `Search: "${searchQuery}"`,
      onRemove: onClearSearch,
    })
  }

  if (selectedSeverity) {
    chips.push({
      id: 'severity',
      label: `Severity: ${selectedSeverity.charAt(0).toUpperCase() + selectedSeverity.slice(1)}`,
      onRemove: onClearSeverity,
    })
  }

  if (selectedStatus) {
    const formatted = selectedStatus
      .split('_')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
    chips.push({
      id: 'status',
      label: `Status: ${formatted}`,
      onRemove: onClearStatus,
    })
  }

  if (selectedCategory) {
    chips.push({
      id: 'category',
      label: `Category: ${selectedCategory}`,
      onRemove: onClearCategory,
    })
  }

  if (selectedDepartment) {
    chips.push({
      id: 'department',
      label: `Department: ${selectedDepartment}`,
      onRemove: onClearDepartment,
    })
  }

  if (selectedAppetite) {
    const formatted =
      selectedAppetite === 'breached'
        ? 'Above Appetite'
        : selectedAppetite === 'near_threshold'
          ? 'Near Threshold'
          : 'Within Appetite'
    chips.push({
      id: 'appetite',
      label: `Appetite: ${formatted}`,
      onRemove: onClearAppetite,
    })
  }

  if (isReviewOverdueFilter(isOverdueOnly)) {
    chips.push({
      id: 'overdue',
      label: 'Review: Overdue',
      onRemove: onClearOverdue,
    })
  }

  function isReviewOverdueFilter(val: boolean) {
    return val
  }

  const hasFilters = chips.length > 0

  return (
    <div className="flex flex-wrap items-center justify-between gap-2.5 py-1">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-caption font-semibold text-xs text-[var(--color-text-secondary)]">
          {filteredCount} {filteredCount === 1 ? 'risk' : 'risks'} found
          {filteredCount !== totalCount && ` of ${totalCount} total`}
        </span>

        {chips.map((chip) => (
          <span
            key={chip.id}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary-subtle)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-primary)]"
          >
            <span>{chip.label}</span>
            <button
              type="button"
              onClick={chip.onRemove}
              className="hover:bg-[var(--color-primary)]/15 rounded-full p-0.5 cursor-pointer transition-colors"
              aria-label={`Remove filter: ${chip.label}`}
            >
              <X className="size-3" />
            </button>
          </span>
        ))}

        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="h-6 gap-1 px-2 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
          >
            <RotateCcw className="size-3" />
            <span>Clear All</span>
          </Button>
        )}
      </div>
    </div>
  )
}

