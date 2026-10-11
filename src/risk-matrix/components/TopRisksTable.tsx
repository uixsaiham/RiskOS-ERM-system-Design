import { ArrowUpRight, TrendingUp, TrendingDown, Minus, AlertCircle, Clock } from 'lucide-react'
import type { RiskRegisterItem } from '@/risk-register'

interface TopRisksTableProps {
  risks: RiskRegisterItem[]
  onNavigateToRisk: (riskId: string) => void
}

export function TopRisksTable({ risks, onNavigateToRisk }: TopRisksTableProps) {
  const getSeverityBadge = (severity: string, score: number) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200/70">
            <span className="size-1.5 rounded-full bg-rose-500" />
            {score} · Critical
          </span>
        )
      case 'high':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200/70">
            <span className="size-1.5 rounded-full bg-amber-500" />
            {score} · High
          </span>
        )
      case 'moderate':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-yellow-50 text-yellow-800 border border-yellow-200/70">
            <span className="size-1.5 rounded-full bg-yellow-500" />
            {score} · Moderate
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/70">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            {score} · Low
          </span>
        )
    }
  }

  const getTrendIcon = (trend: string) => {
    if (trend === 'increasing') {
      return (
        <span className="inline-flex items-center gap-1 text-xs text-rose-600 font-medium">
          <TrendingUp className="w-3.5 h-3.5" />
          Increasing
        </span>
      )
    }
    if (trend === 'decreasing') {
      return (
        <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
          <TrendingDown className="w-3.5 h-3.5" />
          Decreasing
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
        <Minus className="w-3.5 h-3.5" />
        Stable
      </span>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Header with Prioritization Logic Explainer */}
      <div className="p-4 sm:p-5 border-b border-slate-200/70 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-900">
              Top Priority Risks Requiring Attention
            </h3>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium bg-rose-50 text-rose-700 rounded-md border border-rose-200/70">
              Action Required
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Prioritized by: <strong className="text-slate-700 font-medium">Critical Residual Severity</strong> &gt;{' '}
            <strong className="text-slate-700 font-medium">Appetite Breach</strong> &gt;{' '}
            <strong className="text-slate-700 font-medium">Score Magnitude</strong> &gt;{' '}
            <strong className="text-slate-700 font-medium">Review SLA</strong>
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-medium shadow-2xs">
            Showing top {risks.length} critical items
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/70 bg-slate-50/75 text-[11px] font-semibold text-slate-500">
              <th className="py-3 px-4">Risk Identifier & Title</th>
              <th className="py-3 px-4">Department & Category</th>
              <th className="py-3 px-4">Inherent Risk</th>
              <th className="py-3 px-4">Residual Risk</th>
              <th className="py-3 px-4">Risk Appetite</th>
              <th className="py-3 px-4">Trend</th>
              <th className="py-3 px-4">Risk Owner</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {risks.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-400">
                  No risks match the current priority criteria.
                </td>
              </tr>
            ) : (
              risks.map((risk) => (
                <tr
                  key={risk.id}
                  onClick={() => onNavigateToRisk(risk.id)}
                  className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4 font-medium text-slate-900">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-blue-600 group-hover:underline">
                        {risk.id}
                      </span>
                      {risk.isReviewOverdue && (
                        <span
                          title="Review SLA Overdue"
                          className="inline-flex items-center text-amber-600"
                        >
                          <Clock className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                    <div className="text-slate-800 font-medium text-xs mt-0.5 line-clamp-1 max-w-[260px]">
                      {risk.title}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-600">
                    <div className="font-medium text-slate-800">{risk.department}</div>
                    <div className="text-[11px] text-slate-400">{risk.category}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    {getSeverityBadge(risk.inherentSeverity, risk.inherentScore)}
                  </td>

                  <td className="py-3.5 px-4">
                    {getSeverityBadge(risk.residualSeverity, risk.residualScore)}
                  </td>

                  <td className="py-3.5 px-4">
                    {risk.appetiteStatus === 'breached' ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200/70">
                        <AlertCircle className="w-3 h-3 text-rose-600" />
                        Breached
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200/60">
                        Within Appetite
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    {getTrendIcon(risk.trend)}
                  </td>

                  <td className="py-3.5 px-4 text-slate-700">
                    <div className="font-medium">{risk.owner}</div>
                    <div className="text-[11px] text-slate-400 capitalize">{risk.status}</div>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onNavigateToRisk(risk.id)
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                    >
                      View
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
