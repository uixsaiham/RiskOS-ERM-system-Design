import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RiskScore } from '@/components/ui/risk-severity'
import { EMERGING_RISKS, type EmergingRiskItem } from '../dashboard-data'
import { TrendingUp, Flame, ArrowRight } from 'lucide-react'

interface EmergingRisksCardProps {
  onSelectEmergingRisk?: (item: EmergingRiskItem) => void
  onNavigateHorizonScanning?: () => void
}

export function EmergingRisksCard({
  onSelectEmergingRisk,
  onNavigateHorizonScanning,
}: EmergingRisksCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle>Emerging Risks</CardTitle>
            <Badge variant="warning" size="sm" className="gap-1 font-semibold">
              <Flame className="size-3" />
              High Velocity
            </Badge>
          </div>
          <CardDescription className="mt-1">
            Early radar signals showing rapid acceleration prior to formal critical scoring
          </CardDescription>
        </div>

        <button
          type="button"
          onClick={onNavigateHorizonScanning}
          className="font-caption font-semibold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1 cursor-pointer shrink-0"
        >
          <span>Horizon Radar</span>
          <ArrowRight className="size-3" />
        </button>
      </CardHeader>

      <CardContent className="space-y-2 pt-1">
        <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
          <table className="w-full text-left font-body-sm">
            <thead className="border-b border-[var(--color-border)] bg-[var(--color-surface-secondary)] text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              <tr>
                <th scope="col" className="px-3.5 py-2.5">
                  Emerging Threat
                </th>
                <th scope="col" className="px-3 py-2.5">
                  Category
                </th>
                <th scope="col" className="px-3 py-2.5 text-center">
                  Score
                </th>
                <th scope="col" className="px-3 py-2.5">
                  Trend Velocity
                </th>
                <th scope="col" className="px-3.5 py-2.5">
                  Owner
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] bg-[var(--color-surface)]">
              {EMERGING_RISKS.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onSelectEmergingRisk?.(item)}
                  className="cursor-pointer hover:bg-[var(--color-surface-secondary)] transition-colors"
                >
                  <td className="px-3.5 py-2.5 font-medium text-[var(--color-text-primary)]">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs text-[var(--color-primary)] font-semibold">
                          {item.id}
                        </span>
                        <span className="font-medium hover:underline text-sm">
                          {item.name}
                        </span>
                      </div>
                      <p className="font-caption text-[var(--color-text-muted)] text-[11px] line-clamp-1">
                        {item.summary}
                      </p>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-xs text-[var(--color-text-secondary)]">
                    <Badge variant="neutral" size="sm">
                      {item.category}
                    </Badge>
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <RiskScore score={item.score} maxScore={25} size="sm" />
                  </td>
                  <td className="px-3 py-2.5">
                    <span className="inline-flex items-center gap-1 font-caption font-semibold text-[var(--color-risk-critical-foreground)]">
                      <TrendingUp className="size-3.5" />
                      <span className="text-xs">{item.velocity}</span>
                    </span>
                  </td>
                  <td className="px-3.5 py-2.5 text-xs font-medium text-[var(--color-text-primary)]">
                    {item.owner}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between pt-1 text-xs text-[var(--color-text-muted)]">
          <span>Early warning signals reviewed bi-weekly with Department Risk Champions</span>
          <button
            type="button"
            onClick={onNavigateHorizonScanning}
            className="font-caption font-semibold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Scan Emerging Radar</span>
            <ArrowRight className="size-3" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
