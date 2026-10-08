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
            <Badge variant="error" size="sm" className="gap-1 font-semibold">
              <AlertCircle className="size-3" />
              {displayRisks.length} Escalations
            </Badge>
          </div>
          <CardDescription className="mt-1">
            Critical and high exposures breaching tolerance thresholds or trending upwards
          </CardDescription>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onNavigateAllRisks}
          className="gap-1.5 text-xs text-[var(--color-primary)] hover:underline shrink-0"
        >
          <span>View Risk Register</span>
          <ArrowRight className="size-3.5" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-3 pt-1">
        {displayRisks.length === 0 ? (
          <div className="py-8 text-center text-sm text-[var(--color-text-muted)] border rounded-lg border-dashed">
            No risks match the current filter criteria.
          </div>
        ) : (
          <div className="divide-y divide-[var(--color-border)] rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
            {displayRisks.map((risk) => {
              const TrendIcon =
                risk.trend === 'increasing'
                  ? TrendingUp
                  : risk.trend === 'decreasing'
                    ? TrendingDown
                    : Minus
              const trendColor =
                risk.trend === 'increasing'
                  ? 'text-[var(--color-risk-critical-foreground)]'
                  : risk.trend === 'decreasing'
                    ? 'text-[var(--color-success)]'
                    : 'text-[var(--color-text-muted)]'

              return (
                <div
                  key={risk.id}
                  className="flex flex-col justify-between gap-3 p-3.5 sm:flex-row sm:items-center hover:bg-[var(--color-surface-secondary)]/70 transition-colors"
                >
                  {/* Risk identity & description */}
                  <div className="space-y-1.5 min-w-0 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[var(--color-primary)]">
                        {risk.id}
                      </span>
                      <RiskSeverityBadge severity={risk.severity} size="sm" />
                      <Badge variant="neutral" size="sm">
                        {risk.category}
                      </Badge>
                      <span className="font-caption text-[var(--color-text-muted)] text-[11px]">
                        Updated {risk.lastUpdated}
                      </span>
                    </div>

                    <h4 className="font-label text-sm font-semibold text-[var(--color-text-primary)] leading-tight truncate">
                      {risk.title}
                    </h4>

                    <p className="font-caption text-[var(--color-text-secondary)] line-clamp-1">
                      {risk.executiveSummary}
                    </p>
                  </div>

                  {/* Score, Owner, Trend & Action */}
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 shrink-0 self-end sm:self-center">
                    {/* Score */}
                    <div className="text-right">
                      <span className="font-caption text-[11px] text-[var(--color-text-muted)] block">
                        Residual Score
                      </span>
                      <div className="flex items-center justify-end gap-1.5">
                        <RiskScore score={risk.riskScore} maxScore={25} size="sm" />
                      </div>
                    </div>

                    {/* Owner */}
                    <div className="text-right hidden md:block min-w-[120px]">
                      <span className="font-caption text-[11px] text-[var(--color-text-muted)] block">
                        Owner
                      </span>
                      <span className="font-body-sm font-medium text-[var(--color-text-primary)] truncate block">
                        {risk.owner}
                      </span>
                    </div>

                    {/* Trend */}
                    <div className="text-right min-w-[80px]">
                      <span className="font-caption text-[11px] text-[var(--color-text-muted)] block">
                        Trend
                      </span>
                      <span className={`inline-flex items-center gap-1 font-caption font-semibold ${trendColor}`}>
                        <TrendIcon className="size-3.5" />
                        <span className="capitalize">{risk.trend}</span>
                      </span>
                    </div>

                    {/* CTA button */}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onInspectRisk(risk)}
                      className="gap-1.5 text-xs shrink-0"
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

        <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-2.5 text-xs text-[var(--color-text-muted)]">
          <span>Click any risk card to inspect residual breakdown, controls, and active owner escalations</span>
          <button
            type="button"
            onClick={onNavigateAllRisks}
            className="font-caption font-semibold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Open Risk Register</span>
            <ArrowRight className="size-3" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

