import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200/70">
              <AlertTriangle className="size-3" />
              17 Overdue (6 Critical)
            </span>
          </div>
          <CardDescription className="mt-1">
            Mitigation milestones that have breached agreed completion commitments
          </CardDescription>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onNavigateActions}
          className="gap-1.5 text-xs text-blue-600 hover:text-blue-700 hover:underline shrink-0 font-medium"
        >
          <span>View All Actions</span>
          <ArrowRight className="size-3.5" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-2 pt-1">
        <div className="overflow-x-auto rounded-xl border border-slate-200/80">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200/70 bg-slate-50/75 text-[11px] font-semibold text-slate-500">
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
            <tbody className="divide-y divide-slate-100 bg-white">
              {OVERDUE_ACTIONS.map((action) => (
                <tr
                  key={action.id}
                  onClick={() => onSelectAction?.(action)}
                  className="cursor-pointer hover:bg-slate-50/70 transition-colors"
                >
                  <td className="px-3.5 py-2.5 font-medium text-slate-900">
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-xs text-blue-600 font-semibold shrink-0 mt-0.5">
                        {action.id}
                      </span>
                      <span className="font-medium hover:underline text-xs leading-snug">
                        {action.actionTitle}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs text-slate-400">
                        {action.riskId}
                      </span>
                      <span className="text-xs truncate max-w-[140px]" title={action.riskName}>
                        {action.riskName}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-slate-800 text-xs font-medium">
                    {action.owner}
                  </td>
                  <td className="px-3 py-2.5 text-slate-500 text-xs">
                    <div className="flex items-center gap-1">
                      <Calendar className="size-3 text-slate-400" />
                      <span>{action.dueDate}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono font-semibold text-xs text-rose-600">
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

        <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
          <span>Showing top 5 critical escalations out of 17 overdue tasks</span>
          <button
            type="button"
            onClick={onNavigateActions}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View All Actions</span>
            <ArrowRight className="size-3" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
