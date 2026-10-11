import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RiskSeverityBadge, RiskScore } from '@/components/ui/risk-severity'
import { TOP_RISKS_ATTENTION, type ExecutiveRisk } from '../dashboard-data'
import {
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Minus,
  AlertCircle,
  ExternalLink,
} from 'lucide-react'

interface TopRisksAttentionProps {
  risks?: ExecutiveRisk[]
  onInspectRisk: (risk: ExecutiveRisk) => void
  onNavigateAllRisks?: () => void
}

export function TopRisksAttention({
  risks = TOP_RISKS_ATTENTION,
  onInspectRisk,
  onNavigateAllRisks,
}: TopRisksAttentionProps) {
  const displayRisks = risks

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle>Risks Requiring Attention</CardTitle>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200/70">
              <AlertCircle className="size-3" />
              {displayRisks.length} Escalations
            </span>
          </div>
          <CardDescription className="mt-1">
            Critical and high exposures breaching tolerance thresholds or trending upwards
          </CardDescription>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onNavigateAllRisks}
          className="gap-1.5 text-xs text-blue-600 hover:text-blue-700 hover:underline shrink-0 font-medium"
        >
          <span>View Risk Register</span>
          <ArrowRight className="size-3.5" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-3 pt-1">
        {displayRisks.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400 border rounded-xl border-dashed">
            No risks match the current filter criteria.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 rounded-xl border border-slate-200/80 bg-white overflow-hidden">
            {displayRisks.map((risk) => {
              const TrendIcon =
                risk.trend === 'increasing'
                  ? TrendingUp
                  : risk.trend === 'decreasing'
                    ? TrendingDown
                    : Minus
              const trendColor =
                risk.trend === 'increasing'
                  ? 'text-rose-600'
                  : risk.trend === 'decreasing'
                    ? 'text-emerald-600'
                    : 'text-slate-400'

              return (
                <div
                  key={risk.id}
                  className="flex flex-col justify-between gap-3 p-3.5 sm:flex-row sm:items-center hover:bg-slate-50/70 transition-colors"
                >
                  {/* Risk identity & description */}
                  <div className="space-y-1.5 min-w-0 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-blue-600">
                        {risk.id}
                      </span>
                      <RiskSeverityBadge severity={risk.severity} size="sm" />
                      <Badge variant="neutral" size="sm">
                        {risk.category}
                      </Badge>
                      <span className="text-slate-400 text-[11px]">
                        Updated {risk.lastUpdated}
                      </span>
                    </div>

                    <h4 className="text-xs font-semibold text-slate-900 leading-snug truncate">
                      {risk.title}
                    </h4>

                    <p className="text-xs text-slate-500 line-clamp-1">
                      {risk.executiveSummary}
                    </p>
                  </div>

                  {/* Score, Owner, Trend & Action */}
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 shrink-0 self-end sm:self-center">
                    {/* Score */}
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 block font-medium">
                        Residual score
                      </span>
                      <div className="flex items-center justify-end gap-1.5 mt-0.5">
                        <RiskScore score={risk.riskScore} maxScore={25} size="sm" />
                      </div>
                    </div>

                    {/* Owner */}
                    <div className="text-right hidden md:block min-w-[120px]">
                      <span className="text-[11px] text-slate-400 block font-medium">
                        Owner
                      </span>
                      <span className="text-xs font-medium text-slate-800 truncate block mt-0.5">
                        {risk.owner}
                      </span>
                    </div>

                    {/* Trend */}
                    <div className="text-right min-w-[80px]">
                      <span className="text-[11px] text-slate-400 block font-medium">
                        Trend
                      </span>
                      <span className={`inline-flex items-center gap-1 text-xs font-medium mt-0.5 ${trendColor}`}>
                        <TrendIcon className="size-3.5" />
                        <span className="capitalize">{risk.trend}</span>
                      </span>
                    </div>

                    {/* CTA button */}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onInspectRisk(risk)}
                      className="gap-1.5 text-xs shrink-0 font-medium border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs"
                    >
                      <span>View Risk</span>
                      <ExternalLink className="size-3" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="flex items-center justify-between border-t border-slate-100 pt-2.5 text-xs text-slate-500">
          <span>Click any risk card to inspect residual breakdown, controls, and active owner escalations</span>
          <button
            type="button"
            onClick={onNavigateAllRisks}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Open Risk Register</span>
            <ArrowRight className="size-3" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
