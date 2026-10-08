import * as React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CATEGORY_EXPOSURES, type CategoryExposureItem } from '../dashboard-data'
import {
  AlertTriangle,
  ArrowUpDown,
  TrendingDown,
  TrendingUp,
  Minus,
} from 'lucide-react'

interface CategoryExposureTableProps {
  onCategoryFilter?: (category: string) => void
  activeCategory?: string | null
}

type SortField = 'category' | 'riskCount' | 'criticalCount' | 'exposureValue'
type SortOrder = 'asc' | 'desc'

export function CategoryExposureTable({
  onCategoryFilter,
  activeCategory,
}: CategoryExposureTableProps) {
  const [sortField, setSortField] = React.useState<SortField>('exposureValue')
  const [sortOrder, setSortOrder] = React.useState<SortOrder>('desc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('desc')
    }
  }

  const sortedCategories = React.useMemo(() => {
    return [...CATEGORY_EXPOSURES].sort((a, b) => {
      let comparison = 0
      if (sortField === 'category') {
        comparison = a.category.localeCompare(b.category)
      } else {
        comparison = (a[sortField] as number) - (b[sortField] as number)
      }
      return sortOrder === 'asc' ? comparison : -comparison
    })
  }, [sortField, sortOrder])

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle>Risk Exposure by Category</CardTitle>
            <Badge variant="neutral" size="sm">
              9 Categories
            </Badge>
          </div>
          <CardDescription className="mt-1">
            Sortable exposure inventory with critical/high concentrations and attention flags
          </CardDescription>
        </div>

        <span className="font-caption text-[var(--color-text-muted)] text-right">
          Total: <strong className="text-[var(--color-text-primary)]">$4.8M</strong> residual
        </span>
      </CardHeader>

      <CardContent className="space-y-2 pt-1">
        <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
          <table className="w-full text-left font-body-sm">
            <thead className="border-b border-[var(--color-border)] bg-[var(--color-surface-secondary)] text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              <tr>
                <th
                  scope="col"
                  className="px-3.5 py-2.5 cursor-pointer hover:text-[var(--color-text-primary)]"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center gap-1.5">
                    <span>Category</span>
                    <ArrowUpDown className="size-3 opacity-60" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-3 py-2.5 text-right cursor-pointer hover:text-[var(--color-text-primary)]"
                  onClick={() => handleSort('riskCount')}
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Risks</span>
                    <ArrowUpDown className="size-3 opacity-60" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-3 py-2.5 text-right cursor-pointer hover:text-[var(--color-text-primary)]"
                  onClick={() => handleSort('criticalCount')}
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Crit / High</span>
                    <ArrowUpDown className="size-3 opacity-60" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-3.5 py-2.5 text-right cursor-pointer hover:text-[var(--color-text-primary)]"
                  onClick={() => handleSort('exposureValue')}
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Residual Exposure</span>
                    <ArrowUpDown className="size-3 opacity-60" />
                  </div>
                </th>
                <th scope="col" className="px-3 py-2.5 text-center">
                  Trend
                </th>
                <th scope="col" className="px-3 py-2.5 text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] bg-[var(--color-surface)]">
              {sortedCategories.map((cat: CategoryExposureItem) => {
                const isSelected = activeCategory === cat.category
                const TrendIcon =
                  cat.trend === 'up' ? TrendingUp : cat.trend === 'down' ? TrendingDown : Minus
                const trendColor =
                  cat.trend === 'up'
                    ? 'text-[var(--color-risk-critical-foreground)]'
                    : cat.trend === 'down'
                      ? 'text-[var(--color-success)]'
                      : 'text-[var(--color-text-muted)]'

                return (
                  <tr
                    key={cat.category}
                    onClick={() => onCategoryFilter?.(cat.category)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[var(--color-primary-subtle)]/50 font-medium'
                        : cat.requiresAttention
                          ? 'hover:bg-[var(--color-surface-secondary)]/80'
                          : 'hover:bg-[var(--color-surface-secondary)]'
                    }`}
                  >
                    <td className="px-3.5 py-2.5 font-medium text-[var(--color-text-primary)]">
                      <div className="flex items-center gap-2">
                        {cat.requiresAttention && (
                          <span
                            className="size-1.5 rounded-full bg-[var(--color-risk-critical)] shrink-0"
                            title="Requires attention"
                          />
                        )}
                        <span>{cat.category}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-[var(--color-text-primary)] font-semibold">
                      {cat.riskCount}
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-[var(--color-text-secondary)]">
                      <span className="font-semibold text-[var(--color-risk-critical-foreground)]">
                        {cat.criticalCount}
                      </span>
                      <span className="text-[var(--color-text-muted)]"> / </span>
                      <span className="font-semibold text-[var(--color-risk-high-foreground)]">
                        {cat.highCount}
                      </span>
                    </td>
                    <td className="px-3.5 py-2.5 text-right font-mono font-bold tabular-nums text-[var(--color-text-primary)]">
                      {cat.residualExposure}
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className={`inline-flex items-center gap-1 font-caption ${trendColor}`}>
                        <TrendIcon className="size-3.5" />
                        <span className="capitalize text-[11px] font-medium">{cat.trend}</span>
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      {cat.requiresAttention ? (
                        <Badge variant="error" size="sm" className="gap-1 font-semibold">
                          <AlertTriangle className="size-3" />
                          Attention
                        </Badge>
                      ) : (
                        <Badge variant="neutral" size="sm">
                          Controlled
                        </Badge>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between pt-1 text-xs text-[var(--color-text-muted)]">
          <span>4 categories highlighted for elevated residual volatility</span>
          <span className="text-[11px]">Click row to filter dashboard</span>
        </div>
      </CardContent>
    </Card>
  )
}

