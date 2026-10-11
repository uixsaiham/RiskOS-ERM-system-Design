import { useState, useMemo, useCallback, useEffect } from 'react'
import {
  Pagination,
  Button,
  EmptyState,
} from '@/components/ui'
import {
  FileWarning,
  RotateCcw,
  AlertCircle,
  FileText,
} from 'lucide-react'

import {
  ENTERPRISE_RISK_REGISTER,
  DEFAULT_SAVED_VIEWS,
  type RiskRegisterItem,
  type RiskSeverity,
  type RegisterRiskStatus,
  type RiskCategoryName,
  type DepartmentName,
  type RiskAppetiteStatus,
  type UserRolePermission,
  type SavedViewConfig,
} from './risk-register-data'

import { RegisterHeader } from './components/RegisterHeader'
import { ExecutiveSummaryStrip } from './components/ExecutiveSummaryStrip'
import { RiskStatusSummary } from './components/RiskStatusSummary'
import { SavedViewsSelector } from './components/SavedViewsSelector'
import { RegisterToolbar } from './components/RegisterToolbar'
import { ActiveFilterChips } from './components/ActiveFilterChips'
import { RiskRegisterTable } from './components/RiskRegisterTable'
import { RiskRegisterCardView } from './components/RiskRegisterCardView'
import { BulkActionToolbar } from './components/BulkActionToolbar'
import {
  ColumnManagerModal,
  DEFAULT_COLUMN_VISIBILITY,
  type ColumnVisibilityState,
} from './components/ColumnManagerModal'
import { AdvancedFilterDrawer, type AdvancedFilterState } from './components/AdvancedFilterDrawer'
import { CreateRiskModalStub } from './components/CreateRiskModalStub'
import { RegisterRiskDetailDrawer } from './components/RegisterRiskDetailDrawer'
import { RegisterSkeleton } from './components/RegisterSkeleton'

interface RiskRegisterWorkspaceProps {
  initialFilter?: {
    severity?: RiskSeverity
    category?: RiskCategoryName
    appetite?: RiskAppetiteStatus
    overdueOnly?: boolean
    search?: string
  }
  onNavigate?: (routeId: string) => void
  routeId?: string
}

export function RiskRegisterWorkspace({
  initialFilter,
  onNavigate,
  routeId,
}: RiskRegisterWorkspaceProps) {
  // In-memory working copy of enterprise risks
  const [risks, setRisks] = useState<RiskRegisterItem[]>(ENTERPRISE_RISK_REGISTER)

  // User permission role state
  const [userRole, setUserRole] = useState<UserRolePermission>('manager')

  // Resolve initial view configuration from routeId if applicable
  const initialViewConfig = useMemo(() => {
    if (routeId === 'risks-emerging') return DEFAULT_SAVED_VIEWS.find((v) => v.id === 'emerging-risks' || v.id === 'emerging')
    if (routeId === 'risks-by-owner' || routeId === 'risks-owner') return DEFAULT_SAVED_VIEWS.find((v) => v.id === 'my-risks')
    if (routeId === 'risks-by-category' || routeId === 'risks-category') return DEFAULT_SAVED_VIEWS.find((v) => v.id === 'all')
    if (routeId === 'risks-heat-map' || routeId === 'risks-heatmap') return DEFAULT_SAVED_VIEWS.find((v) => v.id === 'high-exposure')
    return undefined
  }, [routeId])

  // Search & Filter states initialized directly
  const [searchQuery, setSearchQuery] = useState<string>(
    () => initialFilter?.search ?? initialViewConfig?.filters.search ?? '',
  )
  const [selectedSeverity, setSelectedSeverity] = useState<RiskSeverity | null>(
    () => initialFilter?.severity ?? initialViewConfig?.filters.severity?.[0] ?? null,
  )
  const [selectedStatus, setSelectedStatus] = useState<RegisterRiskStatus | null>(
    () => initialViewConfig?.filters.status?.[0] ?? null,
  )
  const [selectedCategory, setSelectedCategory] = useState<RiskCategoryName | null>(
    () => initialFilter?.category ?? (routeId === 'risks-by-category' || routeId === 'risks-category' ? 'Cybersecurity' : initialViewConfig?.filters.category?.[0] ?? null),
  )
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentName | null>(
    () => initialViewConfig?.filters.department?.[0] ?? null,
  )
  const [selectedAppetite, setSelectedAppetite] = useState<RiskAppetiteStatus | null>(
    () => initialFilter?.appetite ?? initialViewConfig?.filters.appetite?.[0] ?? null,
  )
  const [isOverdueOnly, setIsOverdueOnly] = useState<boolean>(
    () => initialFilter?.overdueOnly ?? initialViewConfig?.filters.reviewStatus === 'overdue',
  )
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilterState>({})

  // Saved views state
  const [activeViewId, setActiveViewId] = useState<string>(() => initialViewConfig?.id ?? 'all')
  const [customViews, setCustomViews] = useState<SavedViewConfig[]>([])

  // Dynamic reaction when routeId changes while remaining on register workspace
  useEffect(() => {
    if (routeId === 'risks-emerging') {
      const v = DEFAULT_SAVED_VIEWS.find((x) => x.id === 'emerging-risks' || x.id === 'emerging')
      if (v) setActiveViewId(v.id)
      setSelectedCategory(null)
      setSelectedSeverity(null)
    } else if (routeId === 'risks-by-owner' || routeId === 'risks-owner') {
      const v = DEFAULT_SAVED_VIEWS.find((x) => x.id === 'my-risks')
      if (v) setActiveViewId(v.id)
    } else if (routeId === 'risks-by-category' || routeId === 'risks-category') {
      setSelectedCategory('Cybersecurity')
      setActiveViewId('all')
    } else if (routeId === 'risks-all') {
      setActiveViewId('all')
      setSelectedCategory(null)
      setSelectedSeverity(null)
      setSelectedStatus(null)
      setSelectedDepartment(null)
      setSelectedAppetite(null)
      setIsOverdueOnly(false)
      setSearchQuery('')
    }
  }, [routeId])

  // Layout & Density states
  const [tableDensity, setTableDensity] = useState<'comfortable' | 'compact'>('compact')
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibilityState>(
    DEFAULT_COLUMN_VISIBILITY,
  )
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')

  // Sorting state (Default: Critical / Highest Residual Risk first)
  const [sortField, setSortField] = useState<keyof RiskRegisterItem>('residualScore')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  // Pagination state
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(25)

  // Selection state
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // Modal & Drawer states
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [advancedDrawerOpen, setAdvancedDrawerOpen] = useState(false)
  const [columnModalOpen, setColumnModalOpen] = useState(false)
  const [inspectingRisk, setInspectingRisk] = useState<RiskRegisterItem | null>(null)
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false)

  // Loading & Error states
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isSimulatedError, setIsSimulatedError] = useState(false)

  // Last synchronized timestamp
  const [lastSyncTime] = useState('5 minutes ago')

  // Simulated Refresh
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 600)
  }, [])

  // Clear all filters
  const handleClearAllFilters = useCallback(() => {
    setSearchQuery('')
    setSelectedSeverity(null)
    setSelectedStatus(null)
    setSelectedCategory(null)
    setSelectedDepartment(null)
    setSelectedAppetite(null)
    setIsOverdueOnly(false)
    setAdvancedFilters({})
    setActiveViewId('all')
    setPage(1)
  }, [])

  // Saved View Selection Handler
  const handleSelectSavedView = useCallback((view: SavedViewConfig) => {
    setActiveViewId(view.id)
    setPage(1)

    // Reset primary filters
    setSearchQuery(view.filters.search ?? '')
    setSelectedSeverity(view.filters.severity?.[0] ?? null)
    setSelectedStatus(view.filters.status?.[0] ?? null)
    setSelectedCategory(view.filters.category?.[0] ?? null)
    setSelectedDepartment(view.filters.department?.[0] ?? null)
    setSelectedAppetite(view.filters.appetite?.[0] ?? null)
    setIsOverdueOnly(view.filters.reviewStatus === 'overdue')

    if (view.sortField) {
      setSortField(view.sortField)
      setSortDirection(view.sortDirection ?? 'desc')
    }
  }, [])

  // Role Change Handler
  const handleRoleChange = useCallback(
    (role: UserRolePermission) => {
      setUserRole(role)
      setSelectedIds([])
      if (role === 'owner') {
        // Automatically switch to "My Risks" view
        setSearchQuery('')
        setSelectedSeverity(null)
        setSelectedStatus(null)
        setActiveViewId('my-risks')
      } else {
        setActiveViewId('all')
      }
    },
    [],
  )

  // Filter Pipeline
  const filteredRisks = useMemo(() => {
    return risks.filter((r) => {
      // Role permission filtering
      if (userRole === 'owner' && activeViewId === 'my-risks' && r.owner !== 'Priya Nair') {
        return false
      }

      // Quick search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchesId = r.id.toLowerCase().includes(q)
        const matchesTitle = r.title.toLowerCase().includes(q)
        const matchesDesc = r.description.toLowerCase().includes(q)
        const matchesOwner = r.owner.toLowerCase().includes(q)
        const matchesDept = r.department.toLowerCase().includes(q)
        const matchesCat = r.category.toLowerCase().includes(q)
        const matchesTags = r.tags.some((t) => t.toLowerCase().includes(q))
        if (
          !matchesId &&
          !matchesTitle &&
          !matchesDesc &&
          !matchesOwner &&
          !matchesDept &&
          !matchesCat &&
          !matchesTags
        ) {
          return false
        }
      }

      // Severity filter
      if (selectedSeverity && r.residualSeverity !== selectedSeverity) {
        return false
      }

      // Status filter
      if (selectedStatus && r.status !== selectedStatus) {
        return false
      }

      // Category filter
      if (selectedCategory && r.category !== selectedCategory) {
        return false
      }

      // Department filter
      if (selectedDepartment && r.department !== selectedDepartment) {
        return false
      }

      // Appetite filter
      if (selectedAppetite && r.appetiteStatus !== selectedAppetite) {
        return false
      }

      // Overdue review filter
      if (isOverdueOnly && !r.isReviewOverdue) {
        return false
      }

      // Saved view specific filter: High Exposure
      if (activeViewId === 'high-exposure' && r.residualScore < 10) {
        return false
      }

      // Saved view specific filter: Appetite Breaches
      if (activeViewId === 'appetite-breaches' && r.appetiteStatus !== 'breached') {
        return false
      }

      // Advanced filters
      if (
        advancedFilters.minResidualScore &&
        r.residualScore < advancedFilters.minResidualScore
      ) {
        return false
      }
      if (
        advancedFilters.maxResidualScore &&
        r.residualScore > advancedFilters.maxResidualScore
      ) {
        return false
      }
      if (
        advancedFilters.likelihood &&
        r.residualLikelihood !== advancedFilters.likelihood
      ) {
        return false
      }
      if (
        advancedFilters.impact &&
        r.residualImpact !== advancedFilters.impact
      ) {
        return false
      }
      if (
        advancedFilters.controlEffectiveness &&
        r.controlEffectiveness !== advancedFilters.controlEffectiveness
      ) {
        return false
      }
      if (advancedFilters.owner && r.owner !== advancedFilters.owner) {
        return false
      }
      if (advancedFilters.tag && !r.tags.includes(advancedFilters.tag)) {
        return false
      }

      return true
    })
  }, [
    risks,
    userRole,
    activeViewId,
    searchQuery,
    selectedSeverity,
    selectedStatus,
    selectedCategory,
    selectedDepartment,
    selectedAppetite,
    isOverdueOnly,
    advancedFilters,
  ])

  // Sort Pipeline
  const sortedRisks = useMemo(() => {
    return [...filteredRisks].sort((a, b) => {
      let comparison = 0
      const aVal = a[sortField]
      const bVal = b[sortField]

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        comparison = aVal.localeCompare(bVal)
      } else if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal
      } else if (typeof aVal === 'boolean' && typeof bVal === 'boolean') {
        comparison = aVal === bVal ? 0 : aVal ? 1 : -1
      }
      return sortDirection === 'asc' ? comparison : -comparison
    })
  }, [filteredRisks, sortField, sortDirection])

  // Pagination Pipeline
  const paginatedRisks = useMemo(() => {
    const startIndex = (page - 1) * pageSize
    return sortedRisks.slice(startIndex, startIndex + pageSize)
  }, [sortedRisks, page, pageSize])

  // Counts for strip & lifecycle
  const summaryCounts = useMemo(() => {
    return {
      total: risks.length,
      critical: risks.filter((r) => r.residualSeverity === 'critical').length,
      high: risks.filter((r) => r.residualSeverity === 'high').length,
      moderate: risks.filter((r) => r.residualSeverity === 'moderate').length,
      low: risks.filter((r) => r.residualSeverity === 'low').length,
      overdueReviews: risks.filter((r) => r.isReviewOverdue).length,
    }
  }, [risks])

  const statusCounts = useMemo(() => {
    return {
      open: risks.filter((r) => r.status === 'open').length,
      under_review: risks.filter((r) => r.status === 'under_review').length,
      mitigating: risks.filter((r) => r.status === 'mitigating').length,
      accepted: risks.filter((r) => r.status === 'accepted').length,
      closed: risks.filter((r) => r.status === 'closed').length,
    }
  }, [risks])

  // Selection handlers
  const isAllCurrentPageSelected =
    paginatedRisks.length > 0 &&
    paginatedRisks.every((r) => selectedIds.includes(r.id))

  const handleToggleSelectRow = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    )
  }, [])

  const handleToggleSelectAll = useCallback(() => {
    if (isAllCurrentPageSelected) {
      const pageIds = new Set(paginatedRisks.map((r) => r.id))
      setSelectedIds((prev) => prev.filter((id) => !pageIds.has(id)))
    } else {
      const pageIds = paginatedRisks.map((r) => r.id)
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])))
    }
  }, [isAllCurrentPageSelected, paginatedRisks])

  // Sorting Handler
  const handleSort = useCallback(
    (field: keyof RiskRegisterItem) => {
      if (sortField === field) {
        setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
      } else {
        setSortField(field)
        setSortDirection(field === 'residualScore' || field === 'inherentScore' ? 'desc' : 'asc')
      }
    },
    [sortField],
  )

  // Risk Inspection
  const handleInspectRisk = useCallback((risk: RiskRegisterItem) => {
    setInspectingRisk(risk)
    setDetailDrawerOpen(true)
  }, [])

  // Risk Creation
  const handleCreateRisk = useCallback((newRisk: RiskRegisterItem) => {
    setRisks((prev) => [newRisk, ...prev])
    setSelectedIds([])
    setPage(1)
  }, [])

  // Risk Archival (Single)
  const handleArchiveRisk = useCallback((risk: RiskRegisterItem) => {
    setRisks((prev) => prev.filter((r) => r.id !== risk.id))
    setSelectedIds((prev) => prev.filter((i) => i !== risk.id))
  }, [])

  // Bulk Archival
  const handleBulkArchive = useCallback(() => {
    const toRemove = new Set(selectedIds)
    setRisks((prev) => prev.filter((r) => !toRemove.has(r.id)))
    setSelectedIds([])
  }, [selectedIds])

  // Advanced Filters Count
  const advancedFilterCount = Object.keys(advancedFilters).filter(
    (k) => advancedFilters[k as keyof AdvancedFilterState] !== undefined && advancedFilters[k as keyof AdvancedFilterState] !== null,
  ).length

  return (
    <div className="space-y-5 pb-20">
      {/* ── 1. Page Header ── */}
      <RegisterHeader
        totalRisks={risks.length}
        lastSyncTime={lastSyncTime}
        userRole={userRole}
        onRoleChange={handleRoleChange}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
        onExport={() => alert(`Exporting complete register (${risks.length} records)...`)}
        onCreateRisk={() => setCreateModalOpen(true)}
      />

      {/* ── 2. Executive Summary Strip ── */}
      <ExecutiveSummaryStrip
        activeSeverityFilter={selectedSeverity}
        activeOverdueFilter={isOverdueOnly}
        onSelectSeverity={(sev) => {
          setSelectedSeverity(sev)
          setIsOverdueOnly(false)
          setPage(1)
        }}
        onToggleOverdue={() => {
          setIsOverdueOnly((prev) => !prev)
          setSelectedSeverity(null)
          setPage(1)
        }}
        onClearQuickFilters={() => {
          setSelectedSeverity(null)
          setIsOverdueOnly(false)
          setPage(1)
        }}
        counts={summaryCounts}
      />

      {/* ── 3. Lifecycle Status Summary ── */}
      <RiskStatusSummary
        activeStatusFilter={selectedStatus}
        onSelectStatus={(status) => {
          setSelectedStatus(status)
          setPage(1)
        }}
        counts={statusCounts}
      />

      {/* ── 4. Saved Views System ── */}
      <SavedViewsSelector
        activeViewId={activeViewId}
        onSelectView={handleSelectSavedView}
        customViews={customViews}
        onSaveNewView={(newView) => setCustomViews((prev) => [...prev, newView])}
      />

      {/* ── 5. Main Toolbar ── */}
      <RegisterToolbar
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q)
          setPage(1)
        }}
        selectedSeverity={selectedSeverity}
        onSeverityChange={(s) => {
          setSelectedSeverity(s)
          setPage(1)
        }}
        selectedStatus={selectedStatus}
        onStatusChange={(s) => {
          setSelectedStatus(s)
          setPage(1)
        }}
        selectedCategory={selectedCategory}
        onCategoryChange={(c) => {
          setSelectedCategory(c)
          setPage(1)
        }}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={(d) => {
          setSelectedDepartment(d)
          setPage(1)
        }}
        selectedAppetite={selectedAppetite}
        onAppetiteChange={(a) => {
          setSelectedAppetite(a)
          setPage(1)
        }}
        isOverdueOnly={isOverdueOnly}
        onToggleOverdue={() => {
          setIsOverdueOnly((prev) => !prev)
          setPage(1)
        }}
        onOpenAdvancedFilters={() => setAdvancedDrawerOpen(true)}
        advancedFilterCount={advancedFilterCount}
        tableDensity={tableDensity}
        onToggleDensity={() =>
          setTableDensity((prev) => (prev === 'comfortable' ? 'compact' : 'comfortable'))
        }
        onOpenColumnManager={() => setColumnModalOpen(true)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* ── 6. Active Filter Chips ── */}
      <ActiveFilterChips
        searchQuery={searchQuery}
        onClearSearch={() => setSearchQuery('')}
        selectedSeverity={selectedSeverity}
        onClearSeverity={() => setSelectedSeverity(null)}
        selectedStatus={selectedStatus}
        onClearStatus={() => setSelectedStatus(null)}
        selectedCategory={selectedCategory}
        onClearCategory={() => setSelectedCategory(null)}
        selectedDepartment={selectedDepartment}
        onClearDepartment={() => setSelectedDepartment(null)}
        selectedAppetite={selectedAppetite}
        onClearAppetite={() => setSelectedAppetite(null)}
        isOverdueOnly={isOverdueOnly}
        onClearOverdue={() => setIsOverdueOnly(false)}
        onClearAll={handleClearAllFilters}
        filteredCount={filteredRisks.length}
        totalCount={risks.length}
      />

      {/* ── 7. Data Workspace Presentation ── */}
      {isRefreshing ? (
        <RegisterSkeleton />
      ) : isSimulatedError ? (
        /* Error State (Section 29) */
        <div className="rounded-lg border border-[var(--color-error)]/30 bg-[var(--color-risk-critical-subtle)] p-6 text-center">
          <AlertCircle className="size-8 mx-auto text-[var(--color-error)] mb-2" />
          <h3 className="font-h3 text-[var(--color-text-primary)]">Unable to Load Risks</h3>
          <p className="font-body-md text-[var(--color-text-secondary)] mt-1">
            Something went wrong while synchronizing the enterprise Risk Register.
          </p>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsSimulatedError(false)}
            className="mt-4 gap-1.5"
          >
            <RotateCcw className="size-3.5" />
            <span>Try Again</span>
          </Button>
        </div>
      ) : risks.length === 0 ? (
        /* Complete Empty State (Section 26) */
        <div className="rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-8">
          <EmptyState
            icon={FileWarning}
            title="No risks have been added yet."
            description="Create your first organizational risk to begin assessing and monitoring enterprise exposure."
            action={
              <Button onClick={() => setCreateModalOpen(true)}>Create Risk</Button>
            }
          />
        </div>
      ) : filteredRisks.length === 0 ? (
        /* Filtered Empty State (Section 27) */
        <div className="rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
          <EmptyState
            icon={FileText}
            title="No risks match your current filters."
            description="Try removing one or more active filters or broadening your search criteria."
            action={
              <Button variant="secondary" onClick={handleClearAllFilters}>
                Clear Filters
              </Button>
            }
          />
        </div>
      ) : (
        <>
          {viewMode === 'table' ? (
            <RiskRegisterTable
              risks={paginatedRisks}
              selectedIds={selectedIds}
              onToggleSelectRow={handleToggleSelectRow}
              onToggleSelectAll={handleToggleSelectAll}
              isAllSelected={isAllCurrentPageSelected}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              onInspectRisk={handleInspectRisk}
              onOpenFullRisk={(r) => onNavigate?.(`risk-${r.id}`)}
              density={tableDensity}
              visibility={columnVisibility}
              userRole={userRole}
              onArchiveRisk={handleArchiveRisk}
              onEditRisk={handleInspectRisk}
            />
          ) : (
            <RiskRegisterCardView
              risks={paginatedRisks}
              selectedIds={selectedIds}
              onToggleSelectRow={handleToggleSelectRow}
              onInspectRisk={handleInspectRisk}
            />
          )}

          {/* ── 8. Pagination (Section 23) ── */}
          <Pagination
            page={page}
            pageSize={pageSize}
            total={filteredRisks.length}
            onPageChange={setPage}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize)
              setPage(1)
            }}
            pageSizeOptions={[10, 25, 50, 100]}
          />
        </>
      )}

      {/* ── Bulk Actions Floating Toolbar (Section 19) ── */}
      <BulkActionToolbar
        selectedCount={selectedIds.length}
        onClearSelection={() => setSelectedIds([])}
        userRole={userRole}
        onAssignOwner={() => alert(`Assign owner to ${selectedIds.length} risks.`)}
        onAssignDepartment={() => alert(`Assign department to ${selectedIds.length} risks.`)}
        onChangeStatus={() => alert(`Change lifecycle status for ${selectedIds.length} risks.`)}
        onStartAssessment={() => alert(`Launch assessment campaigns for ${selectedIds.length} risks.`)}
        onExportSelected={() => alert(`Exporting ${selectedIds.length} selected risk items.`)}
        onArchiveSelected={handleBulkArchive}
      />

      {/* ── Risk Details Drawer (Section 33) ── */}
      <RegisterRiskDetailDrawer
        risk={inspectingRisk}
        open={detailDrawerOpen}
        onClose={() => setDetailDrawerOpen(false)}
        onNavigateToRisk={(rId) => onNavigate?.(`risk-${rId}`)}
      />

      {/* ── Create Risk Modal Stub (Section 24) ── */}
      <CreateRiskModalStub
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreateRisk={handleCreateRisk}
      />

      {/* ── Advanced Filters Drawer (Section 7) ── */}
      <AdvancedFilterDrawer
        open={advancedDrawerOpen}
        onClose={() => setAdvancedDrawerOpen(false)}
        filters={advancedFilters}
        onApplyFilters={setAdvancedFilters}
        onResetFilters={() => setAdvancedFilters({})}
      />

      {/* ── Customize Columns Modal (Section 21) ── */}
      <ColumnManagerModal
        open={columnModalOpen}
        onClose={() => setColumnModalOpen(false)}
        visibility={columnVisibility}
        onChangeVisibility={setColumnVisibility}
        onResetToDefaults={() => setColumnVisibility(DEFAULT_COLUMN_VISIBILITY)}
      />
    </div>
  )
}
