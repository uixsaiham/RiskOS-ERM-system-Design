import * as React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DEPARTMENT_EXPOSURES, type DepartmentExposureItem } from '../dashboard-data'
import {
  ArrowRight,
  ArrowUpDown,
  TrendingDown,
  TrendingUp,
  Minus,
} from 'lucide-react'

interface DepartmentExposureTableProps {
  onNavigateDepartments?: () => void
  onDepartmentSelect?: (department: string) => void
  selectedDepartment?: string | null
}

type DeptSortField = 'department' | 'risks' | 'critical' | 'high' | 'exposureValue'
type SortOrder = 'asc' | 'desc'

export function DepartmentExposureTable({
  onNavigateDepartments,
  onDepartmentSelect,
  selectedDepartment,
}: DepartmentExposureTableProps) {
  const [sortField, setSortField] = React.useState<DeptSortField>('exposureValue')
  const [sortOrder, setSortOrder] = React.useState<SortOrder>('desc')

  const handleSort = (field: DeptSortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('desc')
    }
  }

  const sortedDepartments = React.useMemo(() => {
    return [...DEPARTMENT_EXPOSURES].sort((a, b) => {
      let comparison = 0
      if (sortField === 'department') {
        comparison = a.department.localeCompare(b.department)
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
            <CardTitle>Risk Exposure by Department</CardTitle>
            <Badge variant="neutral" size="sm">
              8 Departments
            </Badge>
          </div>
          <CardDescription className="mt-1">
            Enterprise division breakdown of operational concentration and severe threats
          </CardDescription>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onNavigateDepartments}
          className="gap-1.5 text-xs text-[var(--color-primary)] hover:underline shrink-0"
        >
          <span>View All Departments</span>
          <ArrowRight className="size-3.5" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-2 pt-1">
        <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
          <table className="w-full text-left font-body-sm">
            <thead className="border-b border-[var(--color-border)] bg-[var(--color-surface-secondary)] text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              <tr>
                <th
                  scope="col"
                  className="px-3.5 py-2.5 cursor-pointer hover:text-[var(--color-text-primary)]"
                  onClick={() => handleSort('department')}
                >
                  <div className="flex items-center gap-1.5">
                    <span>Department</span>
                    <ArrowUpDown className="size-3 opacity-60" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-3 py-2.5 text-right cursor-pointer hover:text-[var(--color-text-primary)]"
                  onClick={() => handleSort('risks')}
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Risks</span>
                    <ArrowUpDown className="size-3 opacity-60" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-3 py-2.5 text-right cursor-pointer hover:text-[var(--color-text-primary)]"
                  onClick={() => handleSort('critical')}
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Critical</span>
                    <ArrowUpDown className="size-3 opacity-60" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-3 py-2.5 text-right cursor-pointer hover:text-[var(--color-text-primary)]"
                  onClick={() => handleSort('high')}
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>High</span>
                    <ArrowUpDown className="size-3 opacity-60" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-3.5 py-2.5 text-right cursor-pointer hover:text-[var(--color-text-primary)]"
                  onClick={() => handleSort('exposureValue')}
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Exposure</span>
                    <ArrowUpDown className="size-3 opacity-60" />
                  </div>
                </th>
                <th scope="col" className="px-3 py-2.5 text-center">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] bg-[var(--color-surface)]">
              {sortedDepartments.map((dept: DepartmentExposureItem) => {
                const isSelected = selectedDepartment === dept.department
                const TrendIcon =
                  dept.trend === 'up' ? TrendingUp : dept.trend === 'down' ? TrendingDown : Minus
                const trendColor =
                  dept.trend === 'up'
                    ? 'text-[var(--color-risk-critical-foreground)]'
                    : dept.trend === 'down'
                      ? 'text-[var(--color-success)]'
                      : 'text-[var(--color-text-muted)]'

                return (
                  <tr
                    key={dept.department}
                    onClick={() => onDepartmentSelect?.(dept.department)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[var(--color-primary-subtle)]/50 font-medium'
                        : 'hover:bg-[var(--color-surface-secondary)]'
                    }`}
                  >
                    <td className="px-3.5 py-2.5 font-medium text-[var(--color-text-primary)]">
                      {dept.department}
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-[var(--color-text-primary)] font-semibold">
                      {dept.risks}
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums">
                      <span className="font-semibold text-[var(--color-risk-critical-foreground)]">
                        {dept.critical}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums">
                      <span className="font-semibold text-[var(--color-risk-high-foreground)]">
                        {dept.high}
                      </span>
                    </td>
                    <td className="px-3.5 py-2.5 text-right font-mono font-bold tabular-nums text-[var(--color-text-primary)]">
                      {dept.exposure}
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className={`inline-flex items-center gap-1 font-caption ${trendColor}`}>
                        <TrendIcon className="size-3.5" />
                        <span className="capitalize text-[11px] font-medium">{dept.trend}</span>
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between pt-1 text-xs text-[var(--color-text-muted)]">
          <span>IT and Operations drive 58% of enterprise exposure ($2.8M)</span>
          <button
            type="button"
            onClick={onNavigateDepartments}
            className="font-caption font-semibold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View All Departments</span>
            <ArrowRight className="size-3" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

