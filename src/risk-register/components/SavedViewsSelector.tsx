import { useState } from 'react'
import { Button, Modal, Input } from '@/components/ui'
import { Bookmark, Plus, Check } from 'lucide-react'
import { DEFAULT_SAVED_VIEWS, type SavedViewConfig } from '../risk-register-data'

interface SavedViewsSelectorProps {
  activeViewId: string
  onSelectView: (view: SavedViewConfig) => void
  onSaveNewView?: (newView: SavedViewConfig) => void
  customViews?: SavedViewConfig[]
}

export function SavedViewsSelector({
  activeViewId,
  onSelectView,
  onSaveNewView,
  customViews = [],
}: SavedViewsSelectorProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [newViewName, setNewViewName] = useState('')
  const [newViewDesc, setNewViewDesc] = useState('')

  const allViews = [...DEFAULT_SAVED_VIEWS, ...customViews]

  const handleSave = () => {
    if (!newViewName.trim()) return
    const id = `custom-${Date.now()}`
    const saved: SavedViewConfig = {
      id,
      label: newViewName.trim(),
      description: newViewDesc.trim() || 'Custom saved filter view',
      filters: {},
    }
    onSaveNewView?.(saved)
    onSelectView(saved)
    setNewViewName('')
    setNewViewDesc('')
    setModalOpen(false)
  }

  return (
    <>
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-1 text-[var(--color-text-muted)] shrink-0 mr-1">
          <Bookmark className="size-3.5" />
          <span className="font-caption uppercase tracking-wider text-[11px] font-semibold">
            Views:
          </span>
        </div>

        {allViews.map((view) => {
          const isActive = activeViewId === view.id
          return (
            <button
              key={view.id}
              type="button"
              onClick={() => onSelectView(view)}
              title={view.description}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[var(--color-primary)] text-white shadow-2xs'
                  : 'bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] hover:text-[var(--color-text-primary)] border border-transparent'
              }`}
            >
              {isActive && <Check className="size-3" />}
              <span>{view.label}</span>
            </button>
          )
        })}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setModalOpen(true)}
          className="h-6 gap-1 rounded-full px-2.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] shrink-0"
        >
          <Plus className="size-3" />
          <span>Save View</span>
        </Button>
      </div>

      {/* Save View Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Save Current View"
        description="Preserve current active filters, sorting preferences, and column visibility."
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave} disabled={!newViewName.trim()}>
              Save View
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="font-label text-xs font-semibold text-[var(--color-text-primary)] block mb-1.5">
              View Name *
            </label>
            <Input
              value={newViewName}
              onChange={(e) => setNewViewName(e.target.value)}
              placeholder="e.g. Q4 Cloud & Compliance Escapes"
              className="text-sm"
              autoFocus
            />
          </div>

          <div>
            <label className="font-label text-xs font-semibold text-[var(--color-text-primary)] block mb-1.5">
              Description (Optional)
            </label>
            <Input
              value={newViewDesc}
              onChange={(e) => setNewViewDesc(e.target.value)}
              placeholder="Context or criteria for this view"
              className="text-sm"
            />
          </div>

          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-3 text-xs text-[var(--color-text-secondary)]">
            <p className="font-medium text-[var(--color-text-primary)] mb-1">
              Currently captured state:
            </p>
            <ul className="list-disc list-inside space-y-0.5 font-caption">
              <li>Active search keyword & severity filters</li>
              <li>Department and category constraints</li>
              <li>Column arrangement & row density setting</li>
            </ul>
          </div>
        </div>
      </Modal>
    </>
  )
}
