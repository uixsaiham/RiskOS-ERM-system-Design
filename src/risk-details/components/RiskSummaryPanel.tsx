import {
  ShieldAlert,
  Layers,
  TrendingUp,
  Scale,
  User,
} from 'lucide-react'
import { RiskSeverityBadge, Avatar, Badge } from '@/components/ui'
import type { ComprehensiveRiskDetail } from '../risk-details-data'

interface RiskSummaryPanelProps {
  detail: ComprehensiveRiskDetail
}

export function RiskSummaryPanel({ detail }: RiskSummaryPanelProps) {
  const { base } = detail

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* ── 1. Inherent Risk ── */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-4.5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <Layers className="size-3.5 text-rose-500" />
              <span>Inherent risk</span>
            </div>
            <RiskSeverityBadge severity={base.inherentSeverity} size="sm" />
          </div>

          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="font-mono text-3xl font-extrabold tracking-tight text-slate-900">
              {base.inherentScore}
            </span>
            <span className="text-xs text-slate-400 font-mono font-medium">/ 25</span>
          </div>
        </div>

        <p className="mt-3 text-xs text-slate-500 border-t border-slate-100 pt-2.5 leading-snug">
          Exposure before controls and mitigations.
        </p>
      </div>

      {/* ── 2. Residual Risk ── */}
      <div className="rounded-xl border border-amber-300/80 bg-amber-50/15 p-4.5 shadow-xs flex flex-col justify-between relative overflow-hidden hover:border-amber-400 transition-all">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800">
              <ShieldAlert className="size-3.5 text-amber-600" />
              <span>Residual risk</span>
            </div>
            <RiskSeverityBadge severity={base.residualSeverity} size="sm" />
          </div>

          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="font-mono text-3xl font-extrabold tracking-tight text-amber-700">
              {base.residualScore}
            </span>
            <span className="text-xs text-slate-400 font-mono font-medium">/ 25</span>
          </div>
        </div>

        <p className="mt-3 text-xs text-amber-800/80 border-t border-amber-200/60 pt-2.5 leading-snug font-medium">
          Remaining exposure after active controls.
        </p>
      </div>

      {/* ── 3. Risk Trend ── */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-4.5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <TrendingUp className="size-3.5 text-rose-500" />
              <span>Risk trend</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200/70">
              <span className="size-1.5 rounded-full bg-rose-500" />
              Increasing
            </span>
          </div>

          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="font-mono text-2xl font-bold tracking-tight text-rose-600 capitalize">
              {base.trend}
            </span>
          </div>
        </div>

        <p className="mt-3 text-xs text-slate-500 border-t border-slate-100 pt-2.5 leading-snug">
          Exposure increased over last 30 days.
        </p>
      </div>

      {/* ── 4. Risk Appetite ── */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-4.5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <Scale className="size-3.5 text-amber-500" />
              <span>Risk appetite</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200/70">
              <span className="size-1.5 rounded-full bg-rose-500" />
              Breached
            </span>
          </div>

          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="font-mono text-2xl font-bold tracking-tight text-rose-600">
              Above Appetite
            </span>
          </div>
        </div>

        <p className="mt-3 text-xs text-slate-500 border-t border-slate-100 pt-2.5 leading-snug">
          Current exposure exceeds tolerance.
        </p>
      </div>

      {/* ── 5. Risk Owner ── */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-4.5 shadow-xs flex flex-col justify-between col-span-1 sm:col-span-2 lg:col-span-1 hover:border-slate-300 transition-all">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <User className="size-3.5 text-blue-600" />
              <span>Risk owner</span>
            </div>
            <Badge variant="neutral" size="sm">Assigned</Badge>
          </div>

          <div className="flex items-center gap-2.5 mt-2">
            <Avatar name={base.owner} size="sm" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {base.owner}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {base.ownerRole}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs text-slate-500 border-t border-slate-100 pt-2.5 leading-snug">
          Accountable for mitigation delivery.
        </p>
      </div>
    </div>
  )
}
