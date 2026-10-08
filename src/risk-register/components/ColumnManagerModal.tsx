import { Modal, Button } from '@/components/ui'
import { Checkbox } from '@/components/ui/checkbox'
import { RotateCcw } from 'lucide-react'
import {
  type ColumnVisibilityState,
  DEFAULT_COLUMN_VISIBILITY,
} from '../risk-register-data'
export type { ColumnVisibilityState }
export { DEFAULT_COLUMN_VISIBILITY }


const COLUMN_DEFINITIONS: { key: keyof ColumnVisibilityState; label: string; priority: 'primary' | 'secondary' | 'supporting' }[] = [
  { key: 'title', label: 'Risk Name & Title', priority: 'primary' },
  { key: 'residualRisk', label: 'Residual Risk Score', priority: 'primary' },
  { key: 'owner', label: 'Assigned Owner', priority: 'primary' },
  { key: 'status', label: 'Lifecycle Status', priority: 'primary' },
  { key: 'category', label: 'Risk Category', priority: 'secondary' },
  { key: 'department', label: 'Department / Unit', priority: 'secondary' },
  { key: 'inherentRisk', label: 'Inherent Risk Score', priority: 'secondary' },
  { key: 'trend', label: 'Risk Trend Velocity', priority: 'secondary' },
  { key: 'appetite', label: 'Appetite Boundary', priority: 'secondary' },
  { key: 'id', label: 'Risk ID (Code)', priority: 'supporting' },
  { key: 'nextReview', label: 'Next Review Date', priority: 'supporting' },
  { key: 'lastUpdated', label: 'Last Updated Timestamp', priority: 'supporting' },
]

interface ColumnManagerModalProps {
  open: boolean
  onClose: () => void
  visibility: ColumnVisibilityState
  onChangeVisibility: (next: ColumnVisibilityState) => void
  onResetToDefaults: () => void
}

export function ColumnManagerModal({
  open,
  onClose,
  visibility,
  onChangeVisibility,
  onResetToDefaults,
}: ColumnManagerModalProps) {
  const toggleColumn = (key: keyof ColumnVisibilityState) => {
    onChangeVisibility({
      ...visibility,
      [key]: !visibility[key],
    })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Customize Register Columns"
      description="Select columns to display in the main Risk Register workspace. Adjust visible density based on executive review requirements."
      footer={
        <div className="flex w-full items-center justify-between gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetToDefaults}
            className="gap-1.5 text-xs text-[var(--color-text-secondary)]"
          >
            <RotateCcw className="size-3.5" />
            <span>Reset to Default</span>
          </Button>
          <Button variant="primary" size="sm" onClick={onClose}>
            Done
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="divide-y divide-[var(--color-border)] rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
          {COLUMN_DEFINITIONS.map((col) => {
            const isChecked = visibility[col.key]
            return (
              <label
                key={col.key}
                className="flex items-center justify-between p-3 hover:bg-[var(--color-surface-secondary)] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Checkbox
                    checked={isChecked}
                    onChange={() => toggleColumn(col.key)}
                    aria-label={`Toggle column: ${col.label}`}
                  />
                  <span className="font-label text-sm text-[var(--color-text-primary)]">
                    {col.label}
                  </span>
                </div>

                <span
                  className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                    col.priority === 'primary'
                      ? 'bg-[var(--color-primary-subtle)] text-[var(--color-primary)]'
                      : col.priority === 'secondary'
                        ? 'bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)]'
                        : 'bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)]'
                  }`}
                >
                  {col.priority}
                </span>
              </label>
            )
          })}
        </div>

        <p className="font-caption text-xs text-[var(--color-text-muted)]">
          * Primary columns are strongly recommended for operational risk reviews.
        </p>
      </div>
    </Modal>
  )
}
