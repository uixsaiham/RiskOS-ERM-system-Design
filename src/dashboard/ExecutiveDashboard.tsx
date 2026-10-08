import { useState, useCallback, useMemo } from 'react'
import {
  Badge,
  Button,
  Input,
  Select,
} from '@/components/ui'
import {
  TOP_RISKS_ATTENTION,
  type ExecutiveRisk,
  type MatrixPreviewCell,
} from './dashboard-data'

import { DashboardHeader } from './components/DashboardHeader'
import { ExecutiveSummaryCard } from './components/ExecutiveSummaryCard'
import { PrimaryKpis } from './components/PrimaryKpis'
import { OverallRiskPosture } from './components/OverallRiskPosture'
import { RiskExposureTrend } from './components/RiskExposureTrend'
import { RiskSeverityDistribution } from './components/RiskSeverityDistribution'
import { RiskMatrixPreview } from './components/RiskMatrixPreview'
import { CategoryExposureTable } from './components/CategoryExposureTable'
import { DepartmentExposureTable } from './components/DepartmentExposureTable'
import { TopRisksAttention } from './components/TopRisksAttention'
import { RiskAppetiteCard } from './components/RiskAppetiteCard'
import { OverdueActionsTable } from './components/OverdueActionsTable'
import { ControlEffectivenessCard } from './components/ControlEffectivenessCard'
import { EmergingRisksCard } from './components/EmergingRisksCard'
import { RecentActivityCard } from './components/RecentActivityCard'
import { RiskDetailDrawer } from './components/RiskDetailDrawer'
import { BoardPackModal } from './components/BoardPackModal'

import {
  Search,
  X,
  RotateCcw,
} from 'lucide-react'

interface ExecutiveDashboardProps {
  onNavigate?: (routeId: string) => void
}

export function ExecutiveDashboard({ onNavigate }: ExecutiveDashboardProps) {
  // Global Header filter states
  const [selectedOrg, setSelectedOrg] = useState<string>('All Organizations')
  const [selectedPeriod, setSelectedPeriod] = useState<string>('q4_2026')
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Secondary Filter Toolbar states
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null)
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Modal & Drawer inspection states
  const [inspectingRisk, setInspectingRisk] = useState<ExecutiveRisk | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [boardPackOpen, setBoardPackOpen] = useState(false)

  // Matrix cell selection
  const [selectedMatrixCell, setSelectedMatrixCell] = useState<MatrixPreviewCell | null>(null)

  // Simulated data refresh
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 600)
  }, [])

  // Inspection drawer triggers
  const handleOpenRisk = useCallback((risk: ExecutiveRisk) => {
    setInspectingRisk(risk)
    setDrawerOpen(true)
  }, [])

  const handleOpenRiskById = useCallback(
    (riskId: string) => {
      const found = TOP_RISKS_ATTENTION.find((r) => r.id === riskId)
      if (found) {
        handleOpenRisk(found)
      } else {
        onNavigate?.('risks')
      }
    },
    [handleOpenRisk, onNavigate],
  )

  // Filter handlers
  const handleSeverityFilter = useCallback((sev: string) => {
    setSelectedSeverity((prev) => (prev === sev ? null : sev))
  }, [])

  const handleCategoryFilter = useCallback((cat: string) => {
    setSelectedCategory((prev) => (prev === cat ? null : cat))
  }, [])

  const handleClearFilters = useCallback(() => {
    setSearchQuery('')
    setSelectedSeverity(null)
    setSelectedDepartment('All')
    setSelectedCategory(null)
    setSelectedMatrixCell(null)
  }, [])

  const hasActiveFilters = Boolean(
    searchQuery.trim() ||
      selectedSeverity ||
      selectedDepartment !== 'All' ||
      selectedCategory ||
      selectedMatrixCell,
  )

  // Filtered attention risks for search & severity
  const filteredAttentionRisks = useMemo(() => {
    return TOP_RISKS_ATTENTION.filter((r) => {
      if (selectedSeverity && r.severity !== selectedSeverity) {
        return false
      }
      if (selectedDepartment !== 'All' && r.department !== selectedDepartment) {
        return false
      }
      if (selectedCategory && !r.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
        return false
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchesId = r.id.toLowerCase().includes(q)
        const matchesTitle = r.title.toLowerCase().includes(q)
        const matchesOwner = r.owner.toLowerCase().includes(q)
        const matchesCat = r.category.toLowerCase().includes(q)
        const matchesDept = r.department.toLowerCase().includes(q)
        if (!matchesId && !matchesTitle && !matchesOwner && !matchesCat && !matchesDept) {
          return false
        }
      }
      return true
    })
  }, [selectedSeverity, selectedDepartment, selectedCategory, searchQuery])

  // Scroll to attention section helper
  const handleScrollToAttention = useCallback(() => {
    const el = document.getElementById('attention-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <div className="space-y-6 pb-16">
      {/* ── 1. Page Header ── */}
      <DashboardHeader
        organization={selectedOrg}
        onOrganizationChange={setSelectedOrg}
        period={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
        onExport={() => setBoardPackOpen(true)}
      />

      {/* ── Filter Toolbar ── */}
      <div className="flex flex-col gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 sm:flex-row sm:items-center sm:justify-between shadow-2xs">
        <div className="flex flex-1 flex-wrap items-center gap-2.5">
          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-[var(--color-text-muted)]" />
            <Input
              type="text"
              placeholder="Search risks, owners, IDs…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8.5 h-8.5 text-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] cursor-pointer"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Department Quick Filter */}
          <div className="w-40">
            <Select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="h-8.5 text-xs"
              aria-label="Filter by department"
            >
              <option value="All">All Departments</option>
              <option value="IT">IT</option>
              <option value="Operations">Operations</option>
              <option value="Procurement">Procurement</option>
              <option value="Finance">Finance</option>
              <option value="Legal">Legal</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
            </Select>
          </div>

          {/* Severity Badges Filter */}
          <div className="flex items-center gap-1">
            {(['critical', 'high', 'moderate', 'low'] as const).map((sev) => {
              const isSelected = selectedSeverity === sev
              return (
                <button
                  key={sev}
                  type="button"
                  onClick={() => handleSeverityFilter(sev)}
                  className={`capitalize px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-2xs'
                      : 'bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-text-primary)]'
                  }`}
                >
                  {sev}
                </button>
              )
            })}
          </div>
        </div>

        {/* Clear filters button */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 self-end sm:self-center">
            <Badge variant="primary" size="sm">
              Filtered
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="h-7 text-xs gap-1 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            >
              <RotateCcw className="size-3" />
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Simulated refresh loading state */}
      {isRefreshing ? (
        <div className="space-y-6 animate-pulse py-8 text-center">
          <div className="h-28 rounded-xl bg-[var(--color-surface-secondary)]" />
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-24 rounded-lg bg-[var(--color-surface-secondary)]" />
            ))}
          </div>
          <div className="h-48 rounded-xl bg-[var(--color-surface-secondary)]" />
        </div>
      ) : (
        <>
          {/* ── 2. Executive Summary ── */}
          <ExecutiveSummaryCard onFocusAttention={handleScrollToAttention} />

          {/* ── 3. Primary KPI Cards (6 metrics) ── */}
          <PrimaryKpis
            onKpiClick={(kpiId) => {
              if (kpiId === 'kpi-overdue-actions') {
                const el = document.getElementById('overdue-actions-section')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              } else if (kpiId === 'kpi-critical-risks' || kpiId === 'kpi-high-risks') {
                handleScrollToAttention()
              } else if (kpiId === 'kpi-control-effectiveness') {
                const el = document.getElementById('controls-section')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          />

          {/* ── 4. Overall Risk Posture ── */}
          <OverallRiskPosture
            onSeverityClick={handleSeverityFilter}
            selectedSeverity={selectedSeverity}
          />

          {/* ── Level 2: Risk Concentration ── */}
          {/* 5. Risk Exposure Trend & Severity Distribution */}
          <div className="grid gap-6 lg:grid-cols-2">
            <RiskExposureTrend />
            <RiskSeverityDistribution
              onSelectSeverity={handleSeverityFilter}
              activeSeverity={selectedSeverity}
            />
          </div>

          {/* 6. 5×5 Matrix Preview & Category Exposure */}
          <div className="grid gap-6 lg:grid-cols-2">
            <RiskMatrixPreview
              onNavigateMatrix={() => onNavigate?.('matrix')}
              onSelectCell={setSelectedMatrixCell}
              selectedCell={selectedMatrixCell}
            />
            <CategoryExposureTable
              onCategoryFilter={handleCategoryFilter}
              activeCategory={selectedCategory}
            />
          </div>

          {/* 7. Department Exposure Table */}
          <DepartmentExposureTable
            onNavigateDepartments={() => onNavigate?.('departments')}
            onDepartmentSelect={setSelectedDepartment}
            selectedDepartment={selectedDepartment === 'All' ? null : selectedDepartment}
          />

          {/* ── Level 3: Action & Attention ── */}
          {/* 8. Risks Requiring Attention */}
          <div id="attention-section">
            <TopRisksAttention
              risks={filteredAttentionRisks}
              onInspectRisk={handleOpenRisk}
              onNavigateAllRisks={() => onNavigate?.('risks')}
            />
          </div>

          {/* 9. Risk Appetite Monitoring & Overdue Mitigation Actions */}
          <div className="grid gap-6 lg:grid-cols-2" id="overdue-actions-section">
            <RiskAppetiteCard
              onCategoryClick={handleCategoryFilter}
              onNavigateAppetite={() => onNavigate?.('appetite')}
            />
            <OverdueActionsTable
              onNavigateActions={() => onNavigate?.('actions')}
              onSelectAction={(action) => handleOpenRiskById(action.riskId)}
            />
          </div>

          {/* ── Level 4: Control & Context ── */}
          {/* 10. Control Effectiveness & Emerging Risks */}
          <div className="grid gap-6 lg:grid-cols-2" id="controls-section">
            <ControlEffectivenessCard
              onNavigateControls={() => onNavigate?.('controls')}
            />
            <EmergingRisksCard
              onNavigateHorizonScanning={() => onNavigate?.('horizon')}
            />
          </div>

          {/* 11. Recent Risk Activity */}
          <RecentActivityCard
            onNavigateAuditLog={() => onNavigate?.('audit')}
          />
        </>
      )}

      {/* ── Inspection Drawer ── */}
      <RiskDetailDrawer
        risk={inspectingRisk}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigateToRisk={(riskId) => onNavigate?.(`risk-${riskId}`)}
      />

      {/* ── Export Report / Board Pack Modal ── */}
      <BoardPackModal
        open={boardPackOpen}
        onClose={() => setBoardPackOpen(false)}
      />
    </div>
  )
}
