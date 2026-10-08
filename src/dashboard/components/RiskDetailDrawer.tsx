import { Drawer } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { RiskSeverityBadge, RiskScore } from '@/components/ui/risk-severity'
import { StatusBadge, ControlEffectiveness } from '@/components/ui/status'
import type { ExecutiveRisk } from '../dashboard-data'
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
} from 'lucide-react'

interface RiskDetailDrawerProps {
  risk: ExecutiveRisk | null
  open: boolean
  onClose: () => void
  onNavigateToRisk?: (riskId: string) => void
}

export function RiskDetailDrawer({
  risk,
  open,
  onClose,
  onNavigateToRisk,
}: RiskDetailDrawerProps) {
  if (!risk) return null

  const departmentDisplay = risk.businessUnit ?? risk.department
  const actionStatusVal = risk.actionStatus ?? (risk.actionDaysOverdue ? 'overdue' : 'in_progress')

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={`${risk.id} · Executive Summary`}
      description={`${risk.category} Risk · ${departmentDisplay}`}
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
                alert(`Risk ${risk.id} flagged for Risk Committee agenda review.`)
              }}
            >
              Flag for Committee
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                onClose()
                onNavigateToRisk?.(risk.id)
              }}
            >
              Open Full Register
              <ArrowRight className="size-4 ml-1.5" />
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Title and appetite banner */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <RiskSeverityBadge severity={risk.severity} size="md" />
            {risk.isBreached && (
              <Badge variant="error" className="gap-1">
                <AlertTriangle className="size-3" />
                Appetite Breach (Tolerance: {risk.appetiteThreshold})
              </Badge>
            )}
            <Badge variant="neutral">{departmentDisplay}</Badge>
          </div>
          <h2 className="font-h2 text-[var(--color-text-primary)]">{risk.title}</h2>
          <p className="mt-2 font-body-md text-[var(--color-text-secondary)] leading-relaxed">
            {risk.executiveSummary}
          </p>
        </div>

        {/* Score comparison card */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-4">
            <div className="flex items-center justify-between">
              <span className="font-overline text-[var(--color-text-muted)]">Inherent Exposure</span>
              <span className="font-caption text-[var(--color-text-muted)]">Unmitigated ({risk.inherentExposure})</span>
            </div>
            <div className="mt-2">
              <RiskScore
                score={risk.inherentScore}
                likelihood={risk.inherentLikelihood ?? 5}
                impact={risk.inherentImpact ?? 5}
                variant="inherent"
                size="lg"
              />
            </div>
            <p className="mt-2 font-caption text-[var(--color-text-muted)]">
              Likelihood {risk.inherentLikelihood ?? 5} / 5 × Impact {risk.inherentImpact ?? 5} / 5
            </p>
          </div>

          <div
            className={`rounded-lg border p-4 ${
              risk.isBreached
                ? 'border-[var(--color-risk-critical-border)] bg-[var(--color-risk-critical-subtle)]'
                : 'border-[var(--color-border)] bg-[var(--color-surface)]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-overline text-[var(--color-text-muted)]">Residual Exposure</span>
              <span className="font-caption font-medium text-[var(--color-text-muted)]">
                Tolerance Cap: {risk.appetiteThreshold}
              </span>
            </div>
            <div className="mt-2">
              <RiskScore
                score={risk.riskScore}
                likelihood={risk.residualLikelihood ?? 4}
                impact={risk.residualImpact ?? 5}
                variant="residual"
                size="lg"
              />
            </div>
            <p className="mt-2 font-caption text-[var(--color-text-secondary)]">
              Residual Exposure: {risk.residualExposure} · Mitigated by {risk.linkedControlsCount ?? 6} controls
            </p>
          </div>
        </div>

        {/* Controls & Action Status */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 space-y-4">
          <p className="font-label text-[var(--color-text-primary)]">Governance & Mitigation Hygiene</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <span className="font-caption text-[var(--color-text-muted)] block mb-1">
                Internal Control Effectiveness
              </span>
              <div className="flex items-center gap-2">
                <ControlEffectiveness value={risk.controlEffectiveness} />
                <span className="font-caption text-[var(--color-text-secondary)]">
                  {risk.linkedControlsCount ?? 6} linked controls
                </span>
              </div>
            </div>

            <div>
              <span className="font-caption text-[var(--color-text-muted)] block mb-1">
                Remediation Action Status
              </span>
              <div className="flex items-center gap-2">
                {actionStatusVal === 'overdue' ? (
                  <StatusBadge
                    status="overdue"
                    label={`Overdue (${risk.actionDaysOverdue ?? 5}d)`}
                  />
                ) : (
                  <StatusBadge status={actionStatusVal} />
                )}
                <span className="font-caption text-[var(--color-text-secondary)]">
                  Due {risk.nextActionDue}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-3">
            <p className="font-caption text-[var(--color-text-muted)] font-semibold uppercase tracking-wider">
              Priority Remediation Plan
            </p>
            <p className="mt-1 font-body-sm text-[var(--color-text-primary)] font-medium">
              {risk.nextActionTitle}
            </p>
            <div className="mt-2 flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1">
                <Calendar className="size-3.5" />
                Target: {risk.nextActionDue}
              </span>
              {risk.actionDaysOverdue ? (
                <span className="text-[var(--color-error)] font-semibold flex items-center gap-1">
                  <Clock className="size-3.5" />
                  {risk.actionDaysOverdue} days past SLA
                </span>
              ) : (
                <span className="text-[var(--color-success)] flex items-center gap-1">
                  <CheckCircle2 className="size-3.5" />
                  On track
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Ownership & Accountability */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <p className="font-label text-[var(--color-text-primary)] mb-3">Ownership & Escalation Path</p>
          <div className="flex items-center gap-3">
            <Avatar name={risk.owner} size="lg" />
            <div>
              <p className="font-label text-[var(--color-text-primary)]">{risk.owner}</p>
              <p className="font-body-sm text-[var(--color-text-secondary)]">{risk.ownerRole}</p>
              <p className="font-caption text-[var(--color-text-muted)] mt-0.5">
                First line of defence owner · {departmentDisplay}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  )
}
