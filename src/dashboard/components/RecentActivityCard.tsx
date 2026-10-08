import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RECENT_ACTIVITIES, type RecentActivityItem } from '../dashboard-data'
import {
  Activity,
  ShieldCheck,
  ClipboardCheck,
  AlertTriangle,
  Scale,
  Clock,
  ArrowRight,
} from 'lucide-react'

interface RecentActivityCardProps {
  onNavigateAuditLog?: () => void
  onSelectActivity?: (act: RecentActivityItem) => void
}

export function RecentActivityCard({
  onNavigateAuditLog,
  onSelectActivity,
}: RecentActivityCardProps) {
  const getActivityIcon = (type: RecentActivityItem['type']) => {
    switch (type) {
      case 'score':
        return <Activity className="size-3.5 text-[var(--color-risk-critical-foreground)]" />
      case 'control':
        return <ShieldCheck className="size-3.5 text-[var(--color-success)]" />
      case 'assessment':
        return <ClipboardCheck className="size-3.5 text-[var(--color-primary)]" />
      case 'action':
        return <AlertTriangle className="size-3.5 text-[var(--color-warning)]" />
      case 'appetite':
        return <Scale className="size-3.5 text-[var(--color-info)]" />
      default:
        return <Clock className="size-3.5 text-[var(--color-text-muted)]" />
    }
  }

  const getActivityBadge = (type: RecentActivityItem['type']) => {
    switch (type) {
      case 'score':
        return <Badge variant="error" size="sm">Score</Badge>
      case 'control':
        return <Badge variant="success" size="sm">Control</Badge>
      case 'assessment':
        return <Badge variant="primary" size="sm">Assessment</Badge>
      case 'action':
        return <Badge variant="warning" size="sm">Action</Badge>
      case 'appetite':
        return <Badge variant="info" size="sm">Appetite</Badge>
      default:
        return <Badge variant="neutral" size="sm">Audit</Badge>
    }
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle>Recent Risk Activity</CardTitle>
            <Badge variant="neutral" size="sm">
              Live Audit Trail
            </Badge>
          </div>
          <CardDescription className="mt-1">
            Real-time feed of assessments, control additions, and severity revisions
          </CardDescription>
        </div>

        <button
          type="button"
          onClick={onNavigateAuditLog}
          className="font-caption font-semibold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1 cursor-pointer shrink-0"
        >
          <span>Audit Log</span>
          <ArrowRight className="size-3" />
        </button>
      </CardHeader>

      <CardContent className="space-y-3 pt-1">
        <div className="space-y-2.5">
          {RECENT_ACTIVITIES.map((act) => (
            <div
              key={act.id}
              onClick={() => onSelectActivity?.(act)}
              className="flex items-start gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-2.5 hover:bg-[var(--color-surface-secondary)] cursor-pointer transition-colors"
            >
              <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-[var(--color-surface-secondary)] border border-[var(--color-border)]">
                {getActivityIcon(act.type)}
              </div>

              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-label text-xs font-semibold text-[var(--color-text-primary)]">
                      {act.title}
                    </span>
                    {getActivityBadge(act.type)}
                  </div>
                  <span className="font-caption text-[11px] text-[var(--color-text-muted)] shrink-0 font-medium">
                    {act.timeAgo}
                  </span>
                </div>

                <p className="font-caption text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {act.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-2 text-xs text-[var(--color-text-muted)]">
          <span>Immutable ERM governance log cryptographically signed</span>
          <button
            type="button"
            onClick={onNavigateAuditLog}
            className="font-caption font-semibold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Full System Activity</span>
            <ArrowRight className="size-3" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
