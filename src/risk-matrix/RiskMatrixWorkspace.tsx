import { useState, useMemo, useCallback } from 'react'
import {
  ENTERPRISE_RISK_REGISTER,
} from '@/risk-register'
import {
  type MatrixViewMode,
  type RiskMatrixFilters,
  type LikelihoodLevel,
  type ImpactLevel,
  type SeverityBand,
  DEFAULT_MATRIX_FILTERS,
  filterMatrixRisks,
  buildMatrixGrid,
  getSummaryKPIs,
  calculateSeverityDistribution,
  getTopPrioritizedRisks,
  getRiskMovementTransitions,
  exportRisksToCsv,
} from './risk-matrix-data'
import { RiskMatrixHeader } from './components/RiskMatrixHeader'
import { MatrixSummaryMetrics } from './components/MatrixSummaryMetrics'
import { MatrixFilterToolbar } from './components/MatrixFilterToolbar'
import { HeatmapGrid5x5 } from './components/HeatmapGrid5x5'
import { SeverityDistributionBar } from './components/SeverityDistributionBar'
import { RiskMovementSummary } from './components/RiskMovementSummary'
import { TopRisksTable } from './components/TopRisksTable'
import { CellDetailsDrawer } from './components/CellDetailsDrawer'

interface RiskMatrixWorkspaceProps {
  onNavigate?: (id: string) => void
}

export function RiskMatrixWorkspace({ onNavigate }: RiskMatrixWorkspaceProps) {
  // ── 1. View & Filter State ──
  const [viewMode, setViewMode] = useState<MatrixViewMode>('residual')
  const [filters, setFilters] = useState<RiskMatrixFilters>(DEFAULT_MATRIX_FILTERS)
  const [selectedCellKey, setSelectedCellKey] = useState<string | null>(null)

  // ── 2. Data Filtering & Calculations ──
  const filteredRisks = useMemo(() => {
    return filterMatrixRisks(ENTERPRISE_RISK_REGISTER, filters, viewMode)
  }, [filters, viewMode])

  const gridData = useMemo(() => {
    return buildMatrixGrid(filteredRisks, viewMode)
  }, [filteredRisks, viewMode])

  const kpis = useMemo(() => {
    return getSummaryKPIs(filteredRisks, viewMode)
  }, [filteredRisks, viewMode])

  const distribution = useMemo(() => {
    return calculateSeverityDistribution(filteredRisks, viewMode)
  }, [filteredRisks, viewMode])

  const topRisks = useMemo(() => {
    return getTopPrioritizedRisks(filteredRisks, 6)
  }, [filteredRisks])

  const movement = useMemo(() => {
    return getRiskMovementTransitions(filteredRisks)
  }, [filteredRisks])

  const selectedCellData = useMemo(() => {
    if (!selectedCellKey) return null
    return gridData[selectedCellKey] ?? null
  }, [selectedCellKey, gridData])

  // ── 3. Filter Actions ──
  const handleFilterChange = useCallback(
    <K extends keyof RiskMatrixFilters>(key: K, value: RiskMatrixFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_MATRIX_FILTERS)
    setSelectedCellKey(null)
  }, [])

  const handleToggleSeverity = useCallback(
    (sev: SeverityBand | 'all') => {
      setFilters((prev) => ({
        ...prev,
        severity: prev.severity === sev ? 'all' : sev,
      }))
    },
    []
  )

  const handleToggleAppetite = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      appetite: prev.appetite === 'breached' ? 'all' : 'breached',
    }))
  }, [])

  const handleSelectCell = useCallback(
    (likelihood: LikelihoodLevel, impact: ImpactLevel) => {
      const key = `${likelihood}-${impact}`
      setSelectedCellKey((prev) => (prev === key ? null : key))
    },
    []
  )

  const handleNavigateToRisk = useCallback(
    (riskId: string) => {
      onNavigate?.(`risk-${riskId}`)
    },
    [onNavigate]
  )

  const handleNavigateToRegister = useCallback(() => {
    onNavigate?.('risks')
  }, [onNavigate])

  const handleExportCsv = useCallback(() => {
    exportRisksToCsv(filteredRisks, viewMode)
  }, [filteredRisks, viewMode])

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  return (
    <div className="space-y-6 pb-12">
      {/* ── 1. Page Header ── */}
      <RiskMatrixHeader
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        selectedPeriod={filters.period}
        onChangePeriod={(p) => handleFilterChange('period', p)}
        onExportCsv={handleExportCsv}
        onPrint={handlePrint}
        totalCount={ENTERPRISE_RISK_REGISTER.length}
        onNavigateToRegister={handleNavigateToRegister}
      />

      {/* ── 2. Summary KPI Cards (Quick Filters) ── */}
      <MatrixSummaryMetrics
        total={kpis.total}
        critical={kpis.critical}
        high={kpis.high}
        aboveAppetite={kpis.aboveAppetite}
        activeSeverityFilter={filters.severity}
        activeAppetiteFilter={filters.appetite}
        onToggleSeverity={handleToggleSeverity}
        onToggleAppetite={handleToggleAppetite}
      />

      {/* ── 3. Multi-Filter Toolbar ── */}
      <MatrixFilterToolbar
        filters={filters}
        onChangeFilter={handleFilterChange}
        onResetFilters={handleResetFilters}
        totalCount={ENTERPRISE_RISK_REGISTER.length}
        filteredCount={filteredRisks.length}
      />

      {/* ── 4. Main 5×5 Matrix & Severity Distribution ── */}
      <div className="space-y-6">
        <HeatmapGrid5x5
          gridData={gridData}
          selectedCellKey={selectedCellKey}
          onSelectCell={handleSelectCell}
          viewMode={viewMode}
        />

        <SeverityDistributionBar
          distribution={distribution}
          selectedSeverity={filters.severity}
          onSelectSeverity={handleToggleSeverity}
          viewMode={viewMode}
        />
      </div>

      {/* ── 5. Inherent vs Residual Movement Transitions ── */}
      <RiskMovementSummary movement={movement} />

      {/* ── 6. Top Prioritized Risks Requiring Attention ── */}
      <TopRisksTable
        risks={topRisks}
        onNavigateToRisk={handleNavigateToRisk}
      />

      {/* ── 7. Interactive Cell Drill-Down Drawer ── */}
      <CellDetailsDrawer
        open={Boolean(selectedCellData)}
        onClose={() => setSelectedCellKey(null)}
        cellData={selectedCellData}
        viewMode={viewMode}
        onNavigateToRisk={handleNavigateToRisk}
      />
    </div>
  )
}
export default RiskMatrixWorkspace

