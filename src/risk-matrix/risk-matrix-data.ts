import type {
  RiskRegisterItem,
  RegisterRiskStatus,
  RiskAppetiteStatus,
  RiskCategoryName,
  DepartmentName,
} from '@/risk-register'

export type MatrixViewMode = 'inherent' | 'residual'

export type LikelihoodLevel = 1 | 2 | 3 | 4 | 5
export type ImpactLevel = 1 | 2 | 3 | 4 | 5
export type SeverityBand = 'critical' | 'high' | 'moderate' | 'low'

export interface LikelihoodAxisItem {
  level: LikelihoodLevel
  label: string
  probability: string
}

export interface ImpactAxisItem {
  level: ImpactLevel
  label: string
  lossDescription: string
}

export const LIKELIHOOD_AXIS: LikelihoodAxisItem[] = [
  { level: 5, label: 'Almost Certain', probability: '> 80% / Monthly' },
  { level: 4, label: 'Likely', probability: '50% – 80% / Multiple/yr' },
  { level: 3, label: 'Possible', probability: '20% – 50% / Annual' },
  { level: 2, label: 'Unlikely', probability: '5% – 20% / 2–5 yrs' },
  { level: 1, label: 'Rare', probability: '< 5% / 5+ yrs' },
]

export const IMPACT_AXIS: ImpactAxisItem[] = [
  { level: 1, label: 'Insignificant', lossDescription: '< $50K loss' },
  { level: 2, label: 'Minor', lossDescription: '$50K–$250K loss' },
  { level: 3, label: 'Moderate', lossDescription: '$250K–$1M loss' },
  { level: 4, label: 'Major', lossDescription: '$1M–$5M loss' },
  { level: 5, label: 'Severe', lossDescription: '> $5M loss' },
]

export interface MatrixCellData {
  likelihood: LikelihoodLevel
  impact: ImpactLevel
  score: number
  severity: SeverityBand
  risks: RiskRegisterItem[]
  count: number
}

export interface RiskMatrixFilters {
  search: string
  department: DepartmentName | 'all'
  category: RiskCategoryName | 'all'
  owner: string | 'all'
  status: RegisterRiskStatus | 'all'
  appetite: RiskAppetiteStatus | 'all'
  severity: SeverityBand | 'all'
  period: string
}

export const DEFAULT_MATRIX_FILTERS: RiskMatrixFilters = {
  search: '',
  department: 'all',
  category: 'all',
  owner: 'all',
  status: 'all',
  appetite: 'all',
  severity: 'all',
  period: 'Q4 2026',
}

export function getSeverityBandFromScore(score: number): SeverityBand {
  if (score >= 16) return 'critical'
  if (score >= 10) return 'high'
  if (score >= 5) return 'moderate'
  return 'low'
}

export function calculateMatrixScore(l: LikelihoodLevel, i: ImpactLevel): number {
  return l * i
}

export function filterMatrixRisks(
  risks: RiskRegisterItem[],
  filters: RiskMatrixFilters,
  viewMode: MatrixViewMode
): RiskRegisterItem[] {
  return risks.filter((item) => {
    // 1. Search (ID, title, description, owner)
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim()
      const match =
        item.id.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.owner.toLowerCase().includes(q) ||
        item.department.toLowerCase().includes(q)
      if (!match) return false
    }

    // 2. Department
    if (filters.department !== 'all' && item.department !== filters.department) {
      return false
    }

    // 3. Category
    if (filters.category !== 'all' && item.category !== filters.category) {
      return false
    }

    // 4. Owner
    if (filters.owner !== 'all' && item.owner !== filters.owner) {
      return false
    }

    // 5. Status
    if (filters.status !== 'all' && item.status !== filters.status) {
      return false
    }

    // 6. Appetite
    if (filters.appetite !== 'all' && item.appetiteStatus !== filters.appetite) {
      return false
    }

    // 7. Severity (evaluates against current viewMode's severity)
    if (filters.severity !== 'all') {
      const itemSev = viewMode === 'inherent' ? item.inherentSeverity : item.residualSeverity
      if (itemSev !== filters.severity) return false
    }

    return true
  })
}

export function buildMatrixGrid(
  risks: RiskRegisterItem[],
  viewMode: MatrixViewMode
): Record<string, MatrixCellData> {
  const grid: Record<string, MatrixCellData> = {}

  // Initialize all 25 cells (5 likelihood x 5 impact)
  for (let l = 1; l <= 5; l++) {
    for (let i = 1; i <= 5; i++) {
      const likelihood = l as LikelihoodLevel
      const impact = i as ImpactLevel
      const score = calculateMatrixScore(likelihood, impact)
      const severity = getSeverityBandFromScore(score)
      const key = `${likelihood}-${impact}`
      grid[key] = {
        likelihood,
        impact,
        score,
        severity,
        risks: [],
        count: 0,
      }
    }
  }

  // Populate risks into respective cell based on viewMode
  for (const risk of risks) {
    const l = (viewMode === 'inherent' ? risk.inherentLikelihood : risk.residualLikelihood) || 1
    const i = (viewMode === 'inherent' ? risk.inherentImpact : risk.residualImpact) || 1
    const clampedL = Math.max(1, Math.min(5, l)) as LikelihoodLevel
    const clampedI = Math.max(1, Math.min(5, i)) as ImpactLevel
    const key = `${clampedL}-${clampedI}`

    if (grid[key]) {
      grid[key].risks.push(risk)
      grid[key].count++
    }
  }

  return grid
}

export function calculateSeverityDistribution(
  risks: RiskRegisterItem[],
  viewMode: MatrixViewMode
): {
  critical: { count: number; percentage: number }
  high: { count: number; percentage: number }
  moderate: { count: number; percentage: number }
  low: { count: number; percentage: number }
  total: number
} {
  const total = risks.length
  let critical = 0
  let high = 0
  let moderate = 0
  let low = 0

  for (const r of risks) {
    const sev = viewMode === 'inherent' ? r.inherentSeverity : r.residualSeverity
    if (sev === 'critical') critical++
    else if (sev === 'high') high++
    else if (sev === 'moderate') moderate++
    else low++
  }

  const getPct = (cnt: number) => (total > 0 ? Math.round((cnt / total) * 100) : 0)

  return {
    critical: { count: critical, percentage: getPct(critical) },
    high: { count: high, percentage: getPct(high) },
    moderate: { count: moderate, percentage: getPct(moderate) },
    low: { count: low, percentage: getPct(low) },
    total,
  }
}

export function getSummaryKPIs(
  risks: RiskRegisterItem[],
  viewMode: MatrixViewMode
): {
  total: number
  critical: number
  high: number
  aboveAppetite: number
} {
  const total = risks.length
  let critical = 0
  let high = 0
  let aboveAppetite = 0

  for (const r of risks) {
    const sev = viewMode === 'inherent' ? r.inherentSeverity : r.residualSeverity
    if (sev === 'critical') critical++
    if (sev === 'high') high++
    if (r.appetiteStatus === 'breached') aboveAppetite++
  }

  return {
    total,
    critical,
    high,
    aboveAppetite,
  }
}

export function getTopPrioritizedRisks(
  risks: RiskRegisterItem[],
  limit = 6
): RiskRegisterItem[] {
  return [...risks]
    .sort((a, b) => {
      // 1. Prioritize critical residual severity
      if (a.residualSeverity === 'critical' && b.residualSeverity !== 'critical') return -1
      if (b.residualSeverity === 'critical' && a.residualSeverity !== 'critical') return 1

      // 2. Prioritize above-appetite status
      if (a.appetiteStatus === 'breached' && b.appetiteStatus !== 'breached') return -1
      if (b.appetiteStatus === 'breached' && a.appetiteStatus !== 'breached') return 1

      // 3. Higher residual score
      if (b.residualScore !== a.residualScore) return b.residualScore - a.residualScore

      // 4. Overdue review
      if (a.isReviewOverdue && !b.isReviewOverdue) return -1
      if (!a.isReviewOverdue && b.isReviewOverdue) return 1

      return 0
    })
    .slice(0, limit)
}

export function getRiskMovementTransitions(risks: RiskRegisterItem[]): {
  mitigated: number
  mitigatedPct: number
  unchanged: number
  unchangedPct: number
  increased: number
  increasedPct: number
  critToHigh: number
  critToMod: number
  highToMod: number
  highToLow: number
} {
  const total = risks.length
  let mitigated = 0
  let unchanged = 0
  let increased = 0
  let critToHigh = 0
  let critToMod = 0
  let highToMod = 0
  let highToLow = 0

  for (const r of risks) {
    if (r.residualScore < r.inherentScore) {
      mitigated++
      if (r.inherentSeverity === 'critical' && r.residualSeverity === 'high') critToHigh++
      if (r.inherentSeverity === 'critical' && r.residualSeverity === 'moderate') critToMod++
      if (r.inherentSeverity === 'high' && r.residualSeverity === 'moderate') highToMod++
      if (r.inherentSeverity === 'high' && r.residualSeverity === 'low') highToLow++
    } else if (r.residualScore > r.inherentScore) {
      increased++
    } else {
      unchanged++
    }
  }

  const getPct = (cnt: number) => (total > 0 ? Math.round((cnt / total) * 100) : 0)

  return {
    mitigated,
    mitigatedPct: getPct(mitigated),
    unchanged,
    unchangedPct: getPct(unchanged),
    increased,
    increasedPct: getPct(increased),
    critToHigh,
    critToMod,
    highToMod,
    highToLow,
  }
}

export function exportRisksToCsv(risks: RiskRegisterItem[], viewMode: MatrixViewMode): void {
  const headers = [
    'Risk ID',
    'Risk Title',
    'Category',
    'Department',
    'Owner',
    'Inherent Likelihood',
    'Inherent Impact',
    'Inherent Score',
    'Inherent Severity',
    'Residual Likelihood',
    'Residual Impact',
    'Residual Score',
    'Residual Severity',
    'Appetite Status',
    'Lifecycle Status',
    'Trend',
    'Next Review Date',
  ]

  const rows = risks.map((r) => [
    `"${r.id}"`,
    `"${r.title.replace(/"/g, '""')}"`,
    `"${r.category}"`,
    `"${r.department}"`,
    `"${r.owner}"`,
    r.inherentLikelihood,
    r.inherentImpact,
    r.inherentScore,
    `"${r.inherentSeverity}"`,
    r.residualLikelihood,
    r.residualImpact,
    r.residualScore,
    `"${r.residualSeverity}"`,
    `"${r.appetiteStatus}"`,
    `"${r.status}"`,
    `"${r.trend}"`,
    `"${r.nextReviewDate}"`,
  ])

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute(
    'download',
    `riskos-matrix-export-${viewMode}-${new Date().toISOString().split('T')[0]}.csv`
  )
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
