import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/ui/status'
import { OVERDUE_ACTIONS, type OverdueAction } from '../dashboard-data'
import { ArrowRight, AlertTriangle, Calendar } from 'lucide-react'

interface OverdueActionsTableProps {
  onNavigateActions?: () => void
  onSelectAction?: (action: OverdueAction) => void
}

export function OverdueActionsTable({
  onNavigateActions,
  onSelectAction,
}: OverdueActionsTableProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle>Overdue Mitigation Actions</CardTitle>
            <Badge variant="error" size="sm" className="gap-1 font-semibold">
              <AlertTriangle className="size-3" />
              17 Overdue (6 Critical)
            </Badge>
          </div>
          <CardDescription className="mt-1">
            Mitigation milestones that have breached agreed completion commitments
          </CardDescription>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onNavigateActions}
          className="gap-1.5 text-xs text-[var(--color-primary)] hover:underline shrink-0"
        >
          <span>View All Actions</span>
          <ArrowRight className="size-3.5" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-2 pt-1">
        <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
          <table className="w-full text-left font-body-sm">
            <thead className="border-b border-[var(--color-border)] bg-[var(--color-surface-secondary)] text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              <tr>
                <th scope="col" className="px-3.5 py-2.5">
                  Action
                </th>
                <th scope="col" className="px-3 py-2.5">
                  Risk
                </th>
                <th scope="col" className="px-3 py-2.5">
                  Owner
                </th>
                <th scope="col" className="px-3 py-2.5">
                  Due Date
                </th>
                <th scope="col" className="px-3 py-2.5 text-right">
                  Days Overdue
                </th>
                <th scope="col" className="px-3.5 py-2.5 text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] bg-[var(--color-surface)]">
              {OVERDUE_ACTIONS.map((action) => (
                <tr
                  key={action.id}
                  onClick={() => onSelectAction?.(action)}
                  className="cursor-pointer hover:bg-[var(--color-surface-secondary)] transition-colors"
                >
                  <td className="px-3.5 py-2.5 font-medium text-[var(--color-text-primary)]">
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-xs text-[var(--color-primary)] font-semibold shrink-0 mt-0.5">
                        {action.id}
                      </span>
                      <span className="font-medium hover:underline text-sm leading-tight">
                        {action.actionTitle}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-[var(--color-text-secondary)]">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs text-[var(--color-text-muted)]">
                        {action.riskId}
                      </span>
                      <span className="text-xs truncate max-w-[140px]" title={action.riskName}>
                        {action.riskName}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-[var(--color-text-primary)] text-xs font-medium">
                    {action.owner}
                  </td>
                  <td className="px-3 py-2.5 text-[var(--color-text-secondary)] text-xs">
                    <div className="flex items-center gap-1">
                      <Calendar className="size-3 text-[var(--color-text-muted)]" />
                      <span>{action.dueDate}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono font-bold text-xs text-[var(--color-risk-critical-foreground)]">
                    {action.daysOverdue} days overdue
                  </td>
                  <td className="px-3.5 py-2.5 text-center">
                    <StatusBadge status="overdue" size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between pt-1 text-xs text-[var(--color-text-muted)]">
          <span>Showing top 5 critical escalations out of 17 overdue tasks</span>
          <button
            type="button"
            onClick={onNavigateActions}
            className="font-caption font-semibold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View All Actions</span>
            <ArrowRight className="size-3" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
