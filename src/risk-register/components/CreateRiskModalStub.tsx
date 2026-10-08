import { useState } from 'react'
import { Modal, Button, Input, Select, Textarea } from '@/components/ui'
import {
  RISK_CATEGORIES,
  DEPARTMENTS,
  RISK_OWNERS,
  type RiskRegisterItem,
  type RiskCategoryName,
  type DepartmentName,
} from '../risk-register-data'
import { getRiskSeverity } from '@/tokens'

interface CreateRiskModalStubProps {
  open: boolean
  onClose: () => void
  onCreateRisk: (newRisk: RiskRegisterItem) => void
}

export function CreateRiskModalStub({
  open,
  onClose,
  onCreateRisk,
}: CreateRiskModalStubProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<RiskCategoryName>('Cybersecurity')
  const [department, setDepartment] = useState<DepartmentName>('IT')
  const [owner, setOwner] = useState(RISK_OWNERS[0].name)
  const [inherentLikelihood, setInherentLikelihood] = useState(4)
  const [inherentImpact, setInherentImpact] = useState(4)
  const [residualLikelihood, setResidualLikelihood] = useState(3)
  const [residualImpact, setResidualImpact] = useState(3)
  const [mitigationPlan, setMitigationPlan] = useState('')
  const [nextReviewDate, setNextReviewDate] = useState('Nov 30, 2026')

  const inherentScore = inherentLikelihood * inherentImpact
  const residualScore = residualLikelihood * residualImpact

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const selectedOwnerObj = RISK_OWNERS.find((o) => o.name === owner) ?? RISK_OWNERS[0]
    const inherentSev = getRiskSeverity(inherentScore)
    const residualSev = getRiskSeverity(residualScore)

    const newRisk: RiskRegisterItem = {
      id: `RSK-${Math.floor(1200 + Math.random() * 800)}`,
      title: title.trim(),
      description: description.trim() || 'Newly created risk requiring scheduled assessment.',
      category,
      department,
      owner: selectedOwnerObj.name,
      ownerRole: selectedOwnerObj.role,
      ownerEmail: selectedOwnerObj.email,
      inherentScore,
      inherentSeverity: inherentSev,
      inherentLikelihood,
      inherentImpact,
      residualScore,
      residualSeverity: residualSev,
      residualLikelihood,
      residualImpact,
      trend: 'stable',
      trendDeltaText: 'Newly registered baseline score.',
      appetiteStatus: residualScore > 16 ? 'breached' : residualScore > 12 ? 'near_threshold' : 'within',
      appetiteThreshold: 'Tolerance Cap: Score ≤ 14',
      status: 'open',
      nextReviewDate,
      isReviewOverdue: false,
      lastUpdated: 'Just now',
      createdDate: 'Oct 08, 2026',
      controlEffectiveness: 'partially_effective',
      linkedControlsCount: 2,
      mitigationActionTitle: mitigationPlan.trim() || undefined,
      tags: ['NewRisk', 'OperationalRegister'],
    }

    onCreateRisk(newRisk)
    // Reset form
    setTitle('')
    setDescription('')
    setMitigationPlan('')
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create New Risk"
      description="Register an operational threat or strategic vulnerability into the enterprise inventory."
      size="lg"
      footer={
        <div className="flex items-center justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="shadow-xs"
          >
            Create Risk Item
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="font-label text-xs font-semibold text-[var(--color-text-primary)] block mb-1">
            Risk Title / Threat Name *
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Critical Zero-Day Vulnerability in Web Ingress Gateway"
            required
            autoFocus
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-label text-xs font-semibold text-[var(--color-text-primary)] block mb-1">
            Detailed Description & Impact Scope
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Context regarding threat vectors, affected business operations, and financial implications..."
            rows={2}
          />
        </div>

        {/* Category & Department */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="font-label text-xs font-semibold text-[var(--color-text-primary)] block mb-1">
              Risk Category *
            </label>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value as RiskCategoryName)}
            >
              {RISK_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="font-label text-xs font-semibold text-[var(--color-text-primary)] block mb-1">
              Department / Business Unit *
            </label>
            <Select
              value={department}
              onChange={(e) => setDepartment(e.target.value as DepartmentName)}
            >
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Owner & Review Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="font-label text-xs font-semibold text-[var(--color-text-primary)] block mb-1">
              Assigned Risk Owner *
            </label>
            <Select value={owner} onChange={(e) => setOwner(e.target.value)}>
              {RISK_OWNERS.map((o) => (
                <option key={o.name} value={o.name}>
                  {o.name} ({o.role})
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="font-label text-xs font-semibold text-[var(--color-text-primary)] block mb-1">
              Next Review Date
            </label>
            <Input
              value={nextReviewDate}
              onChange={(e) => setNextReviewDate(e.target.value)}
              placeholder="e.g. Nov 30, 2026"
            />
          </div>
        </div>

        {/* Scoring Matrix Preview: Inherent & Residual */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-3">
          {/* Inherent scoring */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-caption uppercase tracking-wider text-[var(--color-text-muted)] text-[11px] font-semibold">
                Inherent Exposure (Unmitigated)
              </span>
              <span className="font-mono text-xs font-bold text-[var(--color-text-primary)]">
                Score: {inherentScore} / 25
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[11px] text-[var(--color-text-secondary)] block">Likelihood (1–5)</label>
                <Select
                  value={String(inherentLikelihood)}
                  onChange={(e) => setInherentLikelihood(Number(e.target.value))}
                  className="h-8 text-xs"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      L{n}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="text-[11px] text-[var(--color-text-secondary)] block">Impact (1–5)</label>
                <Select
                  value={String(inherentImpact)}
                  onChange={(e) => setInherentImpact(Number(e.target.value))}
                  className="h-8 text-xs"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      I{n}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          {/* Residual scoring */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-caption uppercase tracking-wider text-[var(--color-text-muted)] text-[11px] font-semibold">
                Residual Exposure (With Controls)
              </span>
              <span className="font-mono text-xs font-bold text-[var(--color-primary)]">
                Score: {residualScore} / 25
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[11px] text-[var(--color-text-secondary)] block">Likelihood (1–5)</label>
                <Select
                  value={String(residualLikelihood)}
                  onChange={(e) => setResidualLikelihood(Number(e.target.value))}
                  className="h-8 text-xs"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      L{n}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="text-[11px] text-[var(--color-text-secondary)] block">Impact (1–5)</label>
                <Select
                  value={String(residualImpact)}
                  onChange={(e) => setResidualImpact(Number(e.target.value))}
                  className="h-8 text-xs"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      I{n}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Mitigation action */}
        <div>
          <label className="font-label text-xs font-semibold text-[var(--color-text-primary)] block mb-1">
            Initial Remediation Plan / Mitigation Commitment
          </label>
          <Input
            value={mitigationPlan}
            onChange={(e) => setMitigationPlan(e.target.value)}
            placeholder="e.g. Enforce hardware-backed MFA and audit API boundary filters"
          />
        </div>
      </form>
    </Modal>
  )
}

