import { useState, useMemo, useCallback } from 'react'
import {
  type ControlItem,
  type ControlFilters,
  type ControlSavedViewId,
  DEFAULT_CONTROL_FILTERS,
  ENTERPRISE_CONTROLS_DATA,
  calculateControlKPIs,
  filterEnterpriseControls,
  exportControlsToCsv,
} from './controls-data'
import { ControlLibraryHeader } from './components/ControlLibraryHeader'
import { ControlSummaryMetrics } from './components/ControlSummaryMetrics'
import { ControlSavedViews } from './components/ControlSavedViews'
import { ControlFilterToolbar } from './components/ControlFilterToolbar'
import { ControlTable } from './components/ControlTable'
import { ControlDetailsDrawer } from './components/ControlDetailsDrawer'
import { CreateEditControlModal } from './components/CreateEditControlModal'
import { LinkRiskModal } from './components/LinkRiskModal'
import { ArchiveControlModal } from './components/ArchiveControlModal'

interface ControlLibraryWorkspaceProps {
  onNavigate?: (routeId: string) => void
}

export function ControlLibraryWorkspace({ onNavigate }: ControlLibraryWorkspaceProps) {
  // ── 1. Master State ──
  const [controlsList, setControlsList] = useState<ControlItem[]>(() => [...ENTERPRISE_CONTROLS_DATA])
  const [filters, setFilters] = useState<ControlFilters>(DEFAULT_CONTROL_FILTERS)
  const [savedView, setSavedView] = useState<ControlSavedViewId>('all')

  // Modals & Drawers State
  const [selectedControlForDetails, setSelectedControlForDetails] = useState<ControlItem | null>(null)
  const [isCreateEditModalOpen, setIsCreateEditModalOpen] = useState(false)
  const [controlToEdit, setControlToEdit] = useState<ControlItem | null>(null)
  const [controlToLinkRisk, setControlToLinkRisk] = useState<ControlItem | null>(null)
  const [controlToArchive, setControlToArchive] = useState<ControlItem | null>(null)
  const [bulkArchiveIds, setBulkArchiveIds] = useState<string[]>([])
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false)

  const currentUserName = 'James Wilson'

  // ── 2. Computed Metrics & Filtered Data ──
  const kpis = useMemo(() => {
    return calculateControlKPIs(controlsList)
  }, [controlsList])

  const filteredControls = useMemo(() => {
    return filterEnterpriseControls(controlsList, filters, savedView, currentUserName)
  }, [controlsList, filters, savedView])

  // Extract distinct owners & risk IDs for dropdowns
  const availableOwners = useMemo(() => {
    const set = new Set<string>()
    controlsList.forEach((c) => set.add(c.owner))
    return Array.from(set).sort()
  }, [controlsList])

  const availableRiskIds = useMemo(() => {
    const set = new Set<string>()
    controlsList.forEach((c) => c.linkedRiskIds.forEach((r) => set.add(r)))
    return Array.from(set).sort()
  }, [controlsList])

  const savedViewCounts = useMemo(() => {
    const active = controlsList.filter((c) => !c.isArchived)
    return {
      all: active.length,
      myControls: active.filter((c) => c.owner === currentUserName).length,
      effective: active.filter((c) => c.effectiveness === 'Effective').length,
      needsImprovement: active.filter((c) => c.effectiveness === 'Needs Improvement').length,
      ineffective: active.filter((c) => c.effectiveness === 'Ineffective').length,
      notImplemented: active.filter((c) => c.implementationStatus === 'Not Implemented').length,
      controlGaps: active.filter(
        (c) =>
          c.effectiveness === 'Ineffective' ||
          c.effectiveness === 'Not Tested' ||
          c.implementationStatus === 'Not Implemented'
      ).length,
    }
  }, [controlsList])

  // ── 3. Action Handlers ──
  const handleFilterChange = useCallback(
    <K extends keyof ControlFilters>(key: K, value: ControlFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_CONTROL_FILTERS)
  }, [])

  const handleCreateControl = useCallback(() => {
    setControlToEdit(null)
    setIsCreateEditModalOpen(true)
  }, [])

  const handleEditControl = useCallback((control: ControlItem) => {
    setControlToEdit(control)
    setIsCreateEditModalOpen(true)
  }, [])

  const handleSaveControl = useCallback((control: ControlItem) => {
    setControlsList((prev) => {
      const idx = prev.findIndex((c) => c.id === control.id)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = control
        return next
      }
      return [control, ...prev]
    })

    // If currently inspecting this control in drawer, update it
    setSelectedControlForDetails((curr) => (curr?.id === control.id ? control : curr))
  }, [])

  const handleOpenLinkRisk = useCallback((control: ControlItem) => {
    setControlToLinkRisk(control)
  }, [])

  const handleUpdateLinkedRisks = useCallback((controlId: string, updatedRiskIds: string[]) => {
    setControlsList((prev) =>
      prev.map((c) => (c.id === controlId ? { ...c, linkedRiskIds: updatedRiskIds } : c))
    )

    // Update active drawer if matching
    setSelectedControlForDetails((curr) =>
      curr?.id === controlId ? { ...curr, linkedRiskIds: updatedRiskIds } : curr
    )
    setControlToLinkRisk((curr) =>
      curr?.id === controlId ? { ...curr, linkedRiskIds: updatedRiskIds } : curr
    )
  }, [])

  const handleArchiveSingle = useCallback((control: ControlItem) => {
    setControlToArchive(control)
    setBulkArchiveIds([])
    setIsArchiveModalOpen(true)
  }, [])

  const handleBulkArchive = useCallback((ids: string[]) => {
    setBulkArchiveIds(ids)
    setControlToArchive(null)
    setIsArchiveModalOpen(true)
  }, [])

  const handleConfirmArchive = useCallback(() => {
    const idsToArchive = bulkArchiveIds.length > 0 ? bulkArchiveIds : controlToArchive ? [controlToArchive.id] : []

    setControlsList((prev) =>
      prev.map((c) => (idsToArchive.includes(c.id) ? { ...c, isArchived: true } : c))
    )

    if (selectedControlForDetails && idsToArchive.includes(selectedControlForDetails.id)) {
      setSelectedControlForDetails(null)
    }

    setBulkArchiveIds([])
    setControlToArchive(null)
  }, [bulkArchiveIds, controlToArchive, selectedControlForDetails])

  const handleExportCsv = useCallback(() => {
    exportControlsToCsv(filteredControls)
  }, [filteredControls])

  const handleBulkExport = useCallback((ids: string[]) => {
    const toExport = controlsList.filter((c) => ids.includes(c.id))
    exportControlsToCsv(toExport)
  }, [controlsList])

  const handleNavigateToRisk = useCallback(
    (riskId: string) => {
      onNavigate?.(`risk-${riskId}`)
    },
    [onNavigate]
  )

  return (
    <div className="space-y-4 pb-16">
      {/* ── 1. Page Header ── */}
      <ControlLibraryHeader
        totalCount={kpis.total}
        onCreateControl={handleCreateControl}
        onExportCsv={handleExportCsv}
      />

      {/* ── 2. Summary KPI Strip ── */}
      <ControlSummaryMetrics
        total={kpis.total}
        effective={kpis.effective}
        needsImprovement={kpis.needsImprovement}
        controlGaps={kpis.controlGaps}
        activeSavedView={savedView}
        onSelectSavedView={setSavedView}
      />

      {/* ── 3. Saved Views Bar ── */}
      <ControlSavedViews
        activeView={savedView}
        onSelectView={setSavedView}
        counts={savedViewCounts}
      />

      {/* ── 4. Search and Filter Toolbar ── */}
      <ControlFilterToolbar
        filters={filters}
        onChangeFilter={handleFilterChange}
        onResetFilters={handleResetFilters}
        totalCount={controlsList.length}
        filteredCount={filteredControls.length}
        availableOwners={availableOwners}
        availableRiskIds={availableRiskIds}
      />

      {/* ── 5. Enterprise Data Table ── */}
      <ControlTable
        controls={filteredControls}
        onSelectControl={setSelectedControlForDetails}
        onEditControl={handleEditControl}
        onLinkRisk={handleOpenLinkRisk}
        onArchiveControl={handleArchiveSingle}
        onBulkArchive={handleBulkArchive}
        onBulkExport={handleBulkExport}
        onNavigateToRisk={handleNavigateToRisk}
      />

      {/* ── 6. Contextual Control Details Drawer ── */}
      <ControlDetailsDrawer
        control={selectedControlForDetails}
        open={Boolean(selectedControlForDetails)}
        onClose={() => setSelectedControlForDetails(null)}
        onEditControl={handleEditControl}
        onLinkRisk={handleOpenLinkRisk}
        onArchiveControl={handleArchiveSingle}
        onNavigateToRisk={handleNavigateToRisk}
      />

      {/* ── 7. Create / Edit Control Modal ── */}
      <CreateEditControlModal
        open={isCreateEditModalOpen}
        onClose={() => setIsCreateEditModalOpen(false)}
        onSave={handleSaveControl}
        initialControl={controlToEdit}
        existingControlCount={controlsList.length}
      />

      {/* ── 8. Link Risk Modal ── */}
      <LinkRiskModal
        control={controlToLinkRisk}
        open={Boolean(controlToLinkRisk)}
        onClose={() => setControlToLinkRisk(null)}
        onUpdateLinkedRisks={handleUpdateLinkedRisks}
      />

      {/* ── 9. Archive Control Confirmation Dialog ── */}
      <ArchiveControlModal
        control={controlToArchive}
        bulkIds={bulkArchiveIds}
        open={isArchiveModalOpen}
        onClose={() => setIsArchiveModalOpen(false)}
        onConfirm={handleConfirmArchive}
      />
    </div>
  )
}
export default ControlLibraryWorkspace

