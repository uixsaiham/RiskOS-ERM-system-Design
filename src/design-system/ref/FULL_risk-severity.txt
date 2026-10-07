import { cn } from '@/lib/utils'
import {
  getRiskSeverity,
  riskSeverityBands,
  type RiskSeverity,
} from '@/tokens'
import { AlertTriangle, ShieldAlert, ShieldCheck, Shield } from 'lucide-react'

const severityStyles: Record<
  RiskSeverity,
  {
    bg: string
    text: string
    border: string
    dot: string
    solid: string
  }
> = {
  low: {
    bg: 'bg-[var(--color-risk-low-subtle)]',
    text: 'text-[var(--color-risk-low-foreground)]',
    border: 'border-[var(--color-risk-low-border)]',
    dot: 'bg-[var(--color-risk-low)]',
    solid: 'bg-[var(--color-risk-low)] text-white',
  },
  moderate: {
    bg: 'bg-[var(--color-risk-moderate-subtle)]',
    text: 'text-[var(--color-risk-moderate-foreground)]',
    border: 'border-[var(--color-risk-moderate-border)]',
    dot: 'bg-[var(--color-risk-moderate)]',
    solid: 'bg-[var(--color-risk-moderate)] text-white',
  },
  high: {
    bg: 'bg-[var(--color-risk-high-subtle)]',
    text: 'text-[var(--color-risk-high-foreground)]',
    border: 'border-[var(--color-risk-high-border)]',
    dot: 'bg-[var(--color-risk-high)]',
    solid: 'bg-[var(--color-risk-high)] text-white',
  },
  critical: {
    bg: 'bg-[var(--color-risk-critical-subtle)]',
    text: 'text-[var(--color-risk-critical-foreground)]',
    border: 'border-[var(--color-risk-critical-border)]',
    dot: 'bg-[var(--color-risk-critical)]',
    solid: 'bg-[var(--color-risk-critical)] text-white',
  },
}

const severityIcons: Record<RiskSeverity, React.ElementType> = {
  low: ShieldCheck,
  moderate: Shield,
  high: ShieldAlert,
  critical: AlertTriangle,
}

export interface RiskSeverityBadgeProps {
  severity?: RiskSeverity
  score?: number
  showRange?: boolean
  showIcon?: boolean
  size?: 'sm' | 'md'
  className?: string
}

export function RiskSeverityBadge({
  severity,
  score,
  showRange = false,
  showIcon = false,
  size = 'md',
  className,
}: RiskSeverityBadgeProps) {
  const resolved = severity ?? (score != null ? getRiskSeverity(score) : 'low')
  const band = riskSeverityBands[resolved]
  const styles = severityStyles[resolved]
  const Icon = severityIcons[resolved]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md border font-caption font-medium whitespace-nowrap',
        size === 'sm' ? 'px-1.5 py-0 text-[11px]' : 'px-2 py-0.5',
        styles.bg,
        styles.text,
        styles.border,
        className,
      )}
      title={`${band.label}${showRange ? ` · ${band.scoreRange}` : ''}`}
    >
      {showIcon && <Icon className="size-3 shrink-0" aria-hidden />}
      <span
        className={cn('size-1.5 rounded-full shrink-0', styles.dot)}
        aria-hidden
      />
      <span>
        {band.label}
        {showRange && (
          <span className="opacity-70"> · {band.scoreRange}</span>
        )}
      </span>
    </span>
  )
}

export interface RiskScoreProps {
  score: number
  maxScore?: number
  likelihood?: number
  impact?: number
  variant?: 'inherent' | 'residual' | 'default'
  size?: 'sm' | 'md' | 'lg'
  showSeverity?: boolean
  className?: string
}

export function RiskScore({
  score,
  maxScore = 25,
  likelihood,
  impact,
  variant = 'default',
  size = 'md',
  showSeverity = true,
  className,
}: RiskScoreProps) {
  const severity = getRiskSeverity(score)
  const band = riskSeverityBands[severity]
  const styles = severityStyles[severity]

  const sizeClasses = {
    sm: 'text-[12px] gap-1',
    md: 'text-[13px] gap-1.5',
    lg: 'text-sm gap-2',
  }

  const scoreSize = {
    sm: 'font-semibold tabular-nums',
    md: 'font-semibold tabular-nums text-sm',
    lg: 'font-semibold tabular-nums text-base',
  }

  return (
    <div
      className={cn(
        'inline-flex items-center flex-wrap',
        sizeClasses[size],
        className,
      )}
      role="group"
      aria-label={`${variant !== 'default' ? variant + ' ' : ''}risk score ${score} out of ${maxScore}, ${band.label}`}
    >
      {variant !== 'default' && (
        <span className="font-overline text-[var(--color-text-muted)] mr-0.5">
          {variant === 'inherent' ? 'Inherent' : 'Residual'}
        </span>
      )}
      <span className={cn(scoreSize[size], styles.text)}>
        {score}
        <span className="text-[var(--color-text-muted)] font-normal">
          {' '}
          / {maxScore}
        </span>
      </span>
      {showSeverity && (
        <RiskSeverityBadge severity={severity} size={size === 'lg' ? 'md' : 'sm'} />
      )}
      {(likelihood != null || impact != null) && (
        <span className="font-caption text-[var(--color-text-muted)]">
          {likelihood != null && `L${likelihood}`}
          {likelihood != null && impact != null && ' · '}
          {impact != null && `I${impact}`}
        </span>
      )}
    </div>
  )
}

export function RiskSeveritySwatch({
  severity,
  className,
}: {
  severity: RiskSeverity
  className?: string
}) {
  const styles = severityStyles[severity]
  const band = riskSeverityBands[severity]
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg border p-3',
        styles.bg,
        styles.border,
        className,
      )}
    >
      <div className={cn('size-10 rounded-md', styles.solid)} />
      <div>
        <div className={cn('font-label', styles.text)}>{band.label}</div>
        <div className="font-caption text-[var(--color-text-muted)]">
          Score {band.scoreRange}
        </div>
      </div>
    </div>
  )
}

export { severityStyles }
