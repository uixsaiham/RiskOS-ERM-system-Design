import { Drawer, Button, Badge, Avatar } from '@/components/ui'
import { RiskSeverityBadge, RiskScore } from '@/components/ui/risk-severity'
import { StatusBadge, ControlEffectiveness } from '@/components/ui/status'
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Building,
  Mail,
  Tag,
} from 'lucide-react'
import type { RiskRegisterItem } from '../risk-register-data'

interface RegisterRiskDetailDrawerProps {
  risk: RiskRegisterItem | null
  open: boolean
  onClose: () => void
  onNavigateToRisk?: (riskId: string) => void
}

export function RegisterRiskDetailDrawer({
  risk,
  open,
  onClose,
  onNavigateToRisk,
}: RegisterRiskDetailDrawerProps) {
  if (!risk) return null

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={`${risk.id} · Operational Risk Record`}
      description={`Risk Management / Risk Register / ${risk.id}`}
      size="lg"
      footer={
        <div className="flex w-full items-center justify-between gap-3">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                alert(`Exporting risk dossier ${risk.id}...`)
              }}
            >
              Export Dossier
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                onClose()
                onNavigateToRisk?.(risk.id)
              }}
            >
              <span>Open Dedicated View</span>
              <ArrowRight className="size-4 ml-1.5" />
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Risk Title & Status Pills */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="font-mono text-xs font-bold text-[var(--color-primary)]">
              {risk.id}
            </span>
            <RiskSeverityBadge severity={risk.residualSeverity} size="md" />
            <Badge variant="neutral">{risk.category}</Badge>
            <Badge variant="neutral">{risk.department}</Badge>
            <StatusBadge status={risk.status} size="sm" />
            {risk.appetiteStatus === 'breached' && (
              <Badge variant="error" size="sm" className="gap-1 font-semibold">
                <ShieldAlert className="size-3" />
                Above Appetite
              </Badge>
            )}
          </div>

          <h2 className="font-h2 text-[var(--color-text-primary)] leading-tight">
            {risk.title}
          </h2>

          <p className="mt-2 font-body-md text-[var(--color-text-secondary)] leading-relaxed">
            {risk.description}
          </p>
        </div>

        {/* Inherent vs Residual Comparison (Section 14) */}
        <div className="grid gap-3 sm:grid-cols-2">
          {/* Inherent Card */}
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-caption uppercase tracking-wider text-[var(--color-text-muted)] text-[11px] font-semibold">
                Inherent Risk (Unmitigated)
              </span>
              <span className="font-caption text-xs text-[var(--color-text-muted)]">
                Pre-Controls
              </span>
            </div>
            <div className="mt-1">
              <RiskScore
                score={risk.inherentScore}
                likelihood={risk.inherentLikelihood}
                impact={risk.inherentImpact}
                variant="inherent"
                size="lg"
              />
            </div>
            <p className="font-caption text-xs text-[var(--color-text-muted)] pt-1">
              Likelihood {risk.inherentLikelihood} / 5 × Impact {risk.inherentImpact} / 5
            </p>
          </div>

          {/* Residual Card */}
          <div
            className={`rounded-lg border p-4 space-y-2 ${
              risk.appetiteStatus === 'breached'
                ? 'border-[var(--color-risk-critical-border)] bg-[var(--color-risk-critical-subtle)]/40'
                : 'border-[var(--color-border)] bg-[var(--color-surface)]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-caption uppercase tracking-wider text-[var(--color-text-muted)] text-[11px] font-semibold">
                Residual Risk (Remaining)
              </span>
              <span className="font-caption text-xs font-medium text-[var(--color-text-muted)]">
                {risk.appetiteThreshold}
              </span>
            </div>
            <div className="mt-1">
              <RiskScore
                score={risk.residualScore}
                likelihood={risk.residualLikelihood}
                impact={risk.residualImpact}
                variant="residual"
                size="lg"
              />
            </div>
            <p className="font-caption text-xs text-[var(--color-text-secondary)] pt-1">
              Mitigated by {risk.linkedControlsCount} internal controls
            </p>
          </div>
        </div>

        {/* Governance & Mitigation Hygiene */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 space-y-4">
          <p className="font-label text-sm text-[var(--color-text-primary)] font-semibold">
            Mitigation Controls & Assessment Hygiene
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <span className="font-caption text-[11px] text-[var(--color-text-muted)] block mb-1">
                Internal Control Health
              </span>
              <div className="flex items-center gap-2">
                <ControlEffectiveness value={risk.controlEffectiveness} />
                <span className="font-caption text-xs text-[var(--color-text-secondary)]">
                  {risk.linkedControlsCount} linked controls
                </span>
              </div>
            </div>

            <div>
              <span className="font-caption text-[11px] text-[var(--color-text-muted)] block mb-1">
                Next Reassessment Due
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-primary)]">
                <Calendar className="size-3.5 text-[var(--color-text-muted)]" />
                <span className="font-medium">{risk.nextReviewDate}</span>
                {risk.isReviewOverdue && (
                  <Badge variant="error" size="sm" className="ml-1">
                    Overdue ({risk.daysOverdue ?? 7}d)
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {risk.mitigationActionTitle && (
            <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-3">
              <p className="font-caption text-[var(--color-text-muted)] font-semibold uppercase tracking-wider text-[11px]">
                Active Remediation Milestone
              </p>
              <p className="mt-1 font-body-sm text-[var(--color-text-primary)] font-medium">
                {risk.mitigationActionTitle}
              </p>
              <div className="mt-2 flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                {risk.isReviewOverdue ? (
                  <span className="text-[var(--color-error)] font-semibold flex items-center gap-1">
                    <Clock className="size-3.5" />
                    SLA breached by {risk.daysOverdue ?? 6} days
                  </span>
                ) : (
                  <span className="text-[var(--color-success)] flex items-center gap-1">
                    <CheckCircle2 className="size-3.5" />
                    Mitigation tracking on schedule
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Ownership & Accountability */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 space-y-3">
          <p className="font-label text-sm text-[var(--color-text-primary)] font-semibold">
            Ownership & Departmental Accountability
          </p>
          <div className="flex items-center gap-3">
            <Avatar name={risk.owner} size="lg" />
            <div className="space-y-0.5">
              <p className="font-label text-sm text-[var(--color-text-primary)] font-semibold">
                {risk.owner}
              </p>
              <p className="font-body-sm text-xs text-[var(--color-text-secondary)]">
                {risk.ownerRole}
              </p>
              <div className="flex items-center gap-3 font-caption text-[11px] text-[var(--color-text-muted)] pt-0.5">
                <span className="flex items-center gap-1">
                  <Building className="size-3" />
                  {risk.department}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="size-3" />
                  {risk.ownerEmail}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        {risk.tags && risk.tags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <Tag className="size-3.5 text-[var(--color-text-muted)]" />
            {risk.tags.map((t) => (
              <span
                key={t}
                className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-text-secondary)]"
              >
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>
    </Drawer>
  )
}
