import { useState } from 'react'
import { Edit3, X } from 'lucide-react'
import { Button } from '@/components/ui'
import type { ComprehensiveRiskDetail } from '../risk-details-data'
import type { RiskCategoryName, DepartmentName } from '@/risk-register'

interface EditRiskDetailsModalProps {
  open: boolean
  onClose: () => void
  detail: ComprehensiveRiskDetail
  onSave: (data: {
    title: string
    description: string
    category: RiskCategoryName
    department: DepartmentName
  }) => void
}

const CATEGORIES: RiskCategoryName[] = [
  'Cybersecurity',
  'Technology',
  'Operational',
  'Financial',
  'Compliance',
  'Strategic',
  'Reputational',
  'People',
  'Third-Party',
]

const DEPARTMENTS: DepartmentName[] = [
  'IT',
  'Finance',
  'Operations',
  'Legal',
  'Procurement',
  'HR',
  'Sales',
  'Marketing',
]

export function EditRiskDetailsModal({
  open,
  onClose,
  detail,
  onSave,
}: EditRiskDetailsModalProps) {
  const { base, overviewDetails } = detail

  const [title, setTitle] = useState(base.title)
  const [description, setDescription] = useState(overviewDetails.description)
  const [category, setCategory] = useState<RiskCategoryName>(base.category)
  const [department, setDepartment] = useState<DepartmentName>(base.department)

  if (!open) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      title,
      description,
      category,
      department,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl overflow-hidden my-8">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4 bg-[var(--color-surface-secondary)]/50">
          <div className="flex items-center gap-2">
            <Edit3 className="size-4 text-[var(--color-primary)]" />
            <h3 className="font-h3 text-base font-bold text-[var(--color-text-primary)]">
              Edit Risk: {base.id}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--color-text-primary)]">
              Risk Name & Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--color-text-primary)]">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as RiskCategoryName)}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-2 text-xs text-[var(--color-text-primary)]"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--color-text-primary)]">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as DepartmentName)}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-2 text-xs text-[var(--color-text-primary)]"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--color-text-primary)]">
              Risk Description *
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-2.5 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[var(--color-border)]">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
