import { useState } from 'react'
import { Button, ConfirmDialog } from '@/components/ui'
import {
  UserCheck,
  Building,
  RefreshCw,
  Play,
  Download,
  Archive,
  X,
} from 'lucide-react'
import type { UserRolePermission } from '../risk-register-data'

interface BulkActionToolbarProps {
  selectedCount: number
  onClearSelection: () => void
  userRole: UserRolePermission
  onAssignOwner?: () => void
  onAssignDepartment?: () => void
  onChangeStatus?: () => void
  onStartAssessment?: () => void
  onExportSelected?: () => void
  onArchiveSelected?: () => void
}

export function BulkActionToolbar({
  selectedCount,
  onClearSelection,
  userRole,
  onAssignOwner,
  onAssignDepartment,
  onChangeStatus,
  onStartAssessment,
  onExportSelected,
  onArchiveSelected,
}: BulkActionToolbarProps) {
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false)

  if (selectedCount === 0) return null

  return (
    <>
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[var(--z-sticky,100)] flex items-center gap-3 rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-4 py-2.5 shadow-[var(--shadow-xl)] animate-in fade-in slide-in-from-bottom-3 duration-200 max-w-4xl w-[92vw]">
        {/* Count badge & clear */}
        <div className="flex items-center gap-2 border-r border-[var(--color-border)] pr-3">
          <span className="flex size-6 items-center justify-center rounded-full bg-[var(--color-primary)] text-white text-xs font-bold tabular-nums">
            {selectedCount}
          </span>
          <span className="font-label text-xs font-semibold text-[var(--color-text-primary)] hidden sm:inline">
            Selected
          </span>
          <button
            type="button"
            onClick={onClearSelection}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] cursor-pointer p-1 rounded"
            title="Deselect all"
            aria-label="Deselect all"
          >
            <X className="size-3.5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-1 flex-wrap items-center gap-1.5 overflow-x-auto">
          {userRole !== 'executive' && (
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={onAssignOwner}
                className="h-8 gap-1.5 text-xs whitespace-nowrap"
              >
                <UserCheck className="size-3.5" />
                <span className="hidden md:inline">Assign</span> Owner
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={onAssignDepartment}
                className="h-8 gap-1.5 text-xs whitespace-nowrap"
              >
                <Building className="size-3.5" />
                <span className="hidden md:inline">Assign</span> Dept
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={onChangeStatus}
                className="h-8 gap-1.5 text-xs whitespace-nowrap"
              >
                <RefreshCw className="size-3.5" />
                <span>Change Status</span>
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={onStartAssessment}
                className="h-8 gap-1.5 text-xs whitespace-nowrap"
              >
                <Play className="size-3.5 text-[var(--color-primary)]" />
                <span>Assess</span>
              </Button>
            </>
          )}

          <Button
            variant="secondary"
            size="sm"
            onClick={onExportSelected}
            className="h-8 gap-1.5 text-xs whitespace-nowrap"
          >
            <Download className="size-3.5" />
            <span>Export</span>
          </Button>

          {userRole === 'manager' && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setArchiveDialogOpen(true)}
              className="h-8 gap-1.5 text-xs whitespace-nowrap ml-auto"
            >
              <Archive className="size-3.5" />
              <span>Archive</span>
            </Button>
          )}
        </div>
      </div>

      {/* Confirmation Dialog for Archiving */}
      <ConfirmDialog
        open={archiveDialogOpen}
        onClose={() => setArchiveDialogOpen(false)}
        onConfirm={() => {
          setArchiveDialogOpen(false)
          onArchiveSelected?.()
        }}
        title={`Archive ${selectedCount} Selected Risks`}
        description={`Are you sure you want to archive ${selectedCount} selected risk items? They will be removed from operational monitoring views into audit archives.`}
        confirmLabel="Archive Risks"
        destructive
      />
    </>
  )
}

