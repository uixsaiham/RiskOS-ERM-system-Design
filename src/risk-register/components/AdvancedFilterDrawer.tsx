import { useState } from 'react'
import { Drawer, Button, Select } from '@/components/ui'
import { RotateCcw, Check } from 'lucide-react'
import { RISK_OWNERS } from '../risk-register-data'

export interface AdvancedFilterState {
  minResidualScore?: number
  maxResidualScore?: number
  minInherentScore?: number
  maxInherentScore?: number
  likelihood?: number | null
  impact?: number | null
  controlEffectiveness?: 'effective' | 'partially_effective' | 'ineffective' | null
  owner?: string | null
  tag?: string | null
}

interface AdvancedFilterDrawerProps {
  open: boolean
  onClose: () => void
  filters: AdvancedFilterState
  onApplyFilters: (f: AdvancedFilterState) => void
  onResetFilters: () => void
}

export function AdvancedFilterDrawer({
  open,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
}: AdvancedFilterDrawerProps) {
  const [localFilters, setLocalFilters] = useState<AdvancedFilterState>(filters)
  const [prevOpen, setPrevOpen] = useState(open)

  if (prevOpen !== open) {
    setPrevOpen(open)
    if (open) {
      setLocalFilters(filters)
    }
  }

  const handleApply = () => {
    onApplyFilters(localFilters)
    onClose()
  };

  const handleReset = () => {
    onResetFilters()
    setLocalFilters({})
    onClose()
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Advanced Risk Filters"
      description="Fine-tune criteria across scoring thresholds, control efficacy, and audit dimensions."
      size="md"
      footer={
        <div className="flex w-full items-center justify-between gap-2">
          <Button variant="ghost" size="sm" onClick={handleReset} className="gap-1.5 text-xs">
            <RotateCcw className="size-3.5" />
            <span>Reset All</span>
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleApply} className="gap-1.5 shadow-xs">
              <Check className="size-3.5" />
              <span>Apply Filters</span>
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-5 text-sm">
        {/* Residual Score Threshold */}
        <div className="space-y-1.5">
          <label className="font-label text-xs font-semibold text-[var(--color-text-primary)] block">
            Residual Risk Score Range (1–25)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="font-caption text-[11px] text-[var(--color-text-muted)] block mb-1">
                Min Score
              </span>
              <Select
                value={String(localFilters.minResidualScore ?? 1)}
                onChange={(e) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    minResidualScore: Number(e.target.value),
                  }))
                }
                className="h-8.5 text-xs"
              >
                {[1, 5, 10, 15, 17, 20].map((n) => (
                  <option key={n} value={n}>
                    Score ≥ {n}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <span className="font-caption text-[11px] text-[var(--color-text-muted)] block mb-1">
                Max Score
              </span>
              <Select
                value={String(localFilters.maxResidualScore ?? 25)}
                onChange={(e) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    maxResidualScore: Number(e.target.value),
                  }))
                }
                className="h-8.5 text-xs"
              >
                {[25, 20, 16, 12, 9, 4].map((n) => (
                  <option key={n} value={n}>
                    Score ≤ {n}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        {/* Likelihood Pill Selector (1..5) */}
        <div className="space-y-1.5">
          <label className="font-label text-xs font-semibold text-[var(--color-text-primary)] block">
            Residual Likelihood
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {[1, 2, 3, 4, 5].map((lvl) => {
              const isSelected = localFilters.likelihood === lvl
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      likelihood: prev.likelihood === lvl ? null : lvl,
                    }))
                  }
                  className={`py-1.5 text-xs font-semibold rounded border text-center transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                      : 'bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:bg-[var(--color-border)]'
                  }`}
                >
                  L{lvl}
                </button>
              )
            })}
          </div>
        </div>

        {/* Impact Pill Selector (1..5) */}
        <div className="space-y-1.5">
          <label className="font-label text-xs font-semibold text-[var(--color-text-primary)] block">
            Residual Impact
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {[1, 2, 3, 4, 5].map((lvl) => {
              const isSelected = localFilters.impact === lvl
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      impact: prev.impact === lvl ? null : lvl,
                    }))
                  }
                  className={`py-1.5 text-xs font-semibold rounded border text-center transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                      : 'bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:bg-[var(--color-border)]'
                  }`}
                >
                  I{lvl}
                </button>
              )
            })}
          </div>
        </div>

        {/* Control Effectiveness */}
        <div className="space-y-1.5">
          <label className="font-label text-xs font-semibold text-[var(--color-text-primary)] block">
            Mitigation Control Health
          </label>
          <Select
            value={localFilters.controlEffectiveness ?? 'all'}
            onChange={(e) =>
              setLocalFilters((prev) => ({
                ...prev,
                controlEffectiveness:
                  e.target.value === 'all'
                    ? null
                    : (e.target.value as 'effective' | 'partially_effective' | 'ineffective'),
              }))
            }
            className="h-8.5 text-xs"
          >
            <option value="all">Any Effectiveness</option>
            <option value="effective">Effective (Green)</option>
            <option value="partially_effective">Partially Effective (Yellow)</option>
            <option value="ineffective">Ineffective (Red)</option>
          </Select>
        </div>

        {/* Risk Owner multi-select */}
        <div className="space-y-1.5">
          <label className="font-label text-xs font-semibold text-[var(--color-text-primary)] block">
            Assigned Risk Owner
          </label>
          <Select
            value={localFilters.owner ?? 'all'}
            onChange={(e) =>
              setLocalFilters((prev) => ({
                ...prev,
                owner: e.target.value === 'all' ? null : e.target.value,
              }))
            }
            className="h-8.5 text-xs"
          >
            <option value="all">All Risk Owners</option>
            {RISK_OWNERS.map((o) => (
              <option key={o.name} value={o.name}>
                {o.name} ({o.role})
              </option>
            ))}
          </Select>
        </div>

        {/* Tag Filter */}
        <div className="space-y-1.5">
          <label className="font-label text-xs font-semibold text-[var(--color-text-primary)] block">
            Risk Tag / Classification
          </label>
          <Select
            value={localFilters.tag ?? 'all'}
            onChange={(e) =>
              setLocalFilters((prev) => ({
                ...prev,
                tag: e.target.value === 'all' ? null : e.target.value,
              }))
            }
            className="h-8.5 text-xs"
          >
            <option value="all">All Tags</option>
            <option value="Escalated">Escalated</option>
            <option value="BoardReview">BoardReview</option>
            <option value="PCI-DSS">PCI-DSS</option>
            <option value="DORA">DORA</option>
            <option value="GenAI">GenAI</option>
            <option value="VendorRisk">VendorRisk</option>
            <option value="ActiveDirectory">ActiveDirectory</option>
            <option value="BaselIII">BaselIII</option>
          </Select>
        </div>
      </div>
    </Drawer>
  )
}
