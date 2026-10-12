import { KpiCard } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EXECUTIVE_KPIS } from '../dashboard-data'

interface PrimaryKpisProps {
  onKpiClick?: (kpiId: string) => void
}

export function PrimaryKpis({ onKpiClick }: PrimaryKpisProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 items-stretch">
      {EXECUTIVE_KPIS.map((kpi) => (
        <div
          key={kpi.id}
          onClick={() => onKpiClick?.(kpi.id)}
          className="cursor-pointer transition-transform hover:-translate-y-0.5 h-full flex flex-col"
        >
          <KpiCard
            className="h-full"
            title={kpi.label}
            value={kpi.value}
            trend={{
              value: kpi.delta,
              direction: kpi.trend,
              positive: kpi.positive,
            }}
            supporting={kpi.comparison}
            status={
              <Badge
                variant={
                  kpi.status === 'attention'
                    ? 'error'
                    : kpi.status === 'good'
                      ? 'success'
                      : 'neutral'
                }
                size="sm"
              >
                {kpi.status === 'attention'
                  ? 'Attention'
                  : kpi.status === 'good'
                    ? 'On track'
                    : 'Stable'}
              </Badge>
            }
          />
        </div>
      ))}
    </div>
  )
}
