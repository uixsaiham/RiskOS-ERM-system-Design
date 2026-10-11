import { useState } from 'react'
import {
  Download,
  Printer,
  FileSpreadsheet,
  Calendar,
  ShieldCheck,
  ShieldAlert,
  Info,
  ChevronDown,
} from 'lucide-react'
import type { MatrixViewMode } from '../risk-matrix-data'

interface RiskMatrixHeaderProps {
  viewMode: MatrixViewMode
  onChangeViewMode: (mode: MatrixViewMode) => void
  selectedPeriod: string
  onChangePeriod: (period: string) => void
  onExportCsv: () => void
  onPrint: () => void
  totalCount: number
  onNavigateToRegister?: () => void
}

export function RiskMatrixHeader({
  viewMode,
  onChangeViewMode,
  selectedPeriod,
  onChangePeriod,
  onExportCsv,
  onPrint,
  totalCount,
  onNavigateToRegister,
}: RiskMatrixHeaderProps) {
  const [exportMenuOpen, setExportMenuOpen] = useState(false)

  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3.5">
      {/* ── Top Breadcrumbs & Actions Row ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Breadcrumb trace */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-slate-500">
          <button
            type="button"
            onClick={onNavigateToRegister}
            className="hover:text-slate-900 hover:underline font-medium text-slate-500 cursor-pointer"
          >
            Risk Management
          </button>
          <span className="text-slate-300 select-none">/</span>
          <span className="font-semibold text-slate-900">
            Risk Matrix & Heatmap
          </span>
        </div>

        {/* View Mode Segmented Control & Actions */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Inherent vs. Residual Toggle */}
          <div className="flex items-center p-1 rounded-xl border border-slate-200/80 bg-slate-100/90 text-xs font-medium">
            <button
              type="button"
              onClick={() => onChangeViewMode('inherent')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'inherent'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldAlert className="size-3.5 text-rose-500" />
              <span>Inherent risk</span>
            </button>

            <button
              type="button"
              onClick={() => onChangeViewMode('residual')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'residual'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="size-3.5 text-emerald-600" />
              <span>Residual risk</span>
            </button>
          </div>

          {/* Reporting Period Selector */}
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-2.5 py-1 text-xs">
            <Calendar className="size-3.5 text-slate-400 shrink-0" />
            <select
              value={selectedPeriod}
              onChange={(e) => onChangePeriod(e.target.value)}
              className="bg-transparent text-slate-800 font-medium text-xs focus:outline-none cursor-pointer pr-1"
            >
              <option value="Q4 2026">Q4 2026 (Active)</option>
              <option value="Q3 2026">Q3 2026</option>
              <option value="Q2 2026">Q2 2026</option>
              <option value="FY 2026">Full Year 2026</option>
              <option value="all">All Cycles</option>
            </select>
          </div>

          {/* Export Action Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/80 shadow-xs transition-colors cursor-pointer"
            >
              <Download className="size-3.5 text-slate-400" />
              <span>Export</span>
              <ChevronDown className="size-3 text-slate-400" />
            </button>

            {exportMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setExportMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-1.5 w-52 rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl z-50 text-xs">
                  <div className="px-3 py-1 font-medium text-slate-400 text-[10px]">
                    Export Options
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setExportMenuOpen(false)
                      onExportCsv()
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 cursor-pointer font-medium"
                  >
                    <FileSpreadsheet className="size-3.5 text-emerald-600" />
                    <span>Export Risk Data (CSV)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setExportMenuOpen(false)
                      onPrint()
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 cursor-pointer font-medium"
                  >
                    <Printer className="size-3.5 text-slate-400" />
                    <span>Print-Friendly View</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Title, Subtitle & Assessment Indicator Strip ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-t border-slate-100 pt-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
              Risk Matrix & Heatmap
            </h1>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                viewMode === 'inherent'
                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}
            >
              {viewMode === 'inherent' ? 'Pre-Control Inherent View' : 'Post-Control Residual View'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Visualize enterprise risk concentration, evaluate control effectiveness across the 5×5 severity matrix, and prioritize remediation.
          </p>
        </div>

        {/* Latest Assessment Indicator & Scope Note */}
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-secondary)]/50 px-4 py-2.5 text-xs">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-text-muted)]">
              Latest Assessment
            </span>
            <div className="font-mono font-bold text-[var(--color-text-primary)]">
              October 11, 2026
            </div>
          </div>

          <div className="h-6 w-px bg-[var(--color-border)] hidden sm:block" />

          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-text-muted)]">
              Filtered Population
            </span>
            <div className="font-mono font-bold text-[var(--color-primary)]">
              {totalCount} Active Risks
            </div>
          </div>
        </div>
      </div>

      {/* ── Scoring Model Explanatory Note ── */}
      <div className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)]/30 px-3 py-2 text-[11px] text-[var(--color-text-secondary)]">
        <Info className="size-3.5 text-[var(--color-primary)] shrink-0" />
        <span>
          <strong>Scoring Model:</strong> Standard 5×5 Matrix (Score = Likelihood × Impact, 1 to 25).
          Severity Bands: Low (1–4), Moderate (5–9), High (10–15), Critical (16–25).
          Appetite threshold set at <strong>12 / 25</strong>.
        </span>
      </div>
    </div>
  )
}
