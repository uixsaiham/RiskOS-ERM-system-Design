import { useState } from 'react'
import {
  Plus,
  Download,
  HelpCircle,
  FileSpreadsheet,
  Printer,
  ChevronDown,
  Shield,
  X,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui'

interface ControlLibraryHeaderProps {
  totalCount: number
  onCreateControl: () => void
  onExportCsv: () => void
}

export function ControlLibraryHeader({
  totalCount,
  onCreateControl,
  onExportCsv,
}: ControlLibraryHeaderProps) {
  const [exportOpen, setExportOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)

  const handlePrint = () => {
    setExportOpen(false)
    window.print()
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        {/* Left: Breadcrumb, Title & Subtitle */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span>Controls</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-medium">Control Library</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
              <span className="size-1.5 rounded-full bg-blue-500" />
              {totalCount} active controls
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Control Library
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            Central repository of preventive, detective, and corrective controls governing enterprise risk posture.
          </p>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Methodology Pill Button */}
          <button
            type="button"
            onClick={() => setHelpOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/80 shadow-xs transition-colors cursor-pointer"
          >
            <HelpCircle className="size-3.5 text-slate-400" />
            <span>Control Guide</span>
          </button>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setExportOpen(!exportOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/80 shadow-xs transition-colors cursor-pointer"
            >
              <Download className="size-3.5 text-slate-500" />
              <span>Export</span>
              <ChevronDown className="size-3 text-slate-400" />
            </button>

            {exportOpen && (
              <div
                className="absolute right-0 mt-1.5 w-48 rounded-xl border border-slate-200 bg-white p-1 shadow-lg z-30 text-xs animate-in fade-in"
                role="menu"
              >
                <button
                  type="button"
                  onClick={() => {
                    setExportOpen(false)
                    onExportCsv()
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left hover:bg-slate-50 text-slate-700 font-medium cursor-pointer"
                >
                  <FileSpreadsheet className="size-4 text-emerald-600" />
                  <span>Export to CSV (.csv)</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left hover:bg-slate-50 text-slate-700 font-medium cursor-pointer"
                >
                  <Printer className="size-4 text-blue-600" />
                  <span>Print Summary</span>
                </button>
              </div>
            )}
          </div>

          {/* Primary CTA */}
          <Button
            variant="primary"
            size="sm"
            onClick={onCreateControl}
            className="gap-1.5 font-medium shadow-xs cursor-pointer bg-slate-900 hover:bg-slate-800 text-white rounded-lg px-3.5"
          >
            <Plus className="size-3.5" />
            <span>Create Control</span>
          </Button>
        </div>
      </div>

      {/* Control Methodology Modal */}
      {helpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Shield className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Control Architecture & Classification
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Standard definitions for enterprise internal controls
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setHelpOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                Controls are documented policies, technical safeguards, and operational checks deployed to mitigate inherent risks down to acceptable tolerance levels.
              </p>

              <div className="grid grid-cols-3 gap-2.5 py-1">
                <div className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50">
                  <span className="font-semibold text-slate-900 block mb-1 text-xs text-sky-700">
                    Preventive
                  </span>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Preempts risk events before execution (e.g. MFA, principle of least privilege).
                  </p>
                </div>
                <div className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50">
                  <span className="font-semibold text-slate-900 block mb-1 text-xs text-indigo-700">
                    Detective
                  </span>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Identifies deviations or anomalies in real time (e.g. SIEM alerts, EDR telemetry).
                  </p>
                </div>
                <div className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50">
                  <span className="font-semibold text-slate-900 block mb-1 text-xs text-amber-700">
                    Corrective
                  </span>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Mitigates loss and restores operations post-event (e.g. Disaster recovery, backups).
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-blue-50/60 p-3 border border-blue-100 text-[11px] text-slate-600 flex items-start gap-2">
                <Sparkles className="size-3.5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-semibold block mb-0.5">
                    Effectiveness & Gap Lifecycle
                  </strong>
                  Controls are periodically tested for design and operational effectiveness. Deficiencies marked as <em>Needs Improvement</em> or <em>Ineffective</em> are automatically tracked as enterprise control gaps.
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setHelpOpen(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 border-transparent text-xs"
              >
                Close guide
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
