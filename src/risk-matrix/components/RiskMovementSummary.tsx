import { ShieldCheck, ArrowRight, TrendingDown, Minus, TrendingUp } from 'lucide-react'

interface RiskMovementSummaryProps {
  movement: {
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
  }
}

export function RiskMovementSummary({ movement }: RiskMovementSummaryProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs">
      {/* Title */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Risk Movement & Control Effectiveness
            </h3>
            <p className="text-xs text-slate-500">
              Shift in risk exposure from Inherent (pre-control) to Residual (post-control) state
            </p>
          </div>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-800 flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4 text-emerald-600" />
              Mitigated by Controls
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded">
              {movement.mitigatedPct}%
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            {movement.mitigated}
            <span className="text-xs font-normal text-slate-500 ml-1">risks reduced</span>
          </div>
          <p className="text-[11px] text-emerald-700 mt-1">
            Exposure reduced below original inherent severity
          </p>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
              <Minus className="w-4 h-4 text-slate-500" />
              Unchanged Exposure
            </span>
            <span className="text-xs font-bold text-slate-700 bg-slate-200/70 px-1.5 py-0.5 rounded">
              {movement.unchangedPct}%
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            {movement.unchanged}
            <span className="text-xs font-normal text-slate-500 ml-1">risks stable</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Controls ineffective or newly identified risks
          </p>
        </div>

        <div className="p-3 rounded-lg bg-rose-50/50 border border-rose-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-rose-800 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-rose-600" />
              Increased / Emerging
            </span>
            <span className="text-xs font-bold text-rose-700 bg-rose-100/70 px-1.5 py-0.5 rounded">
              {movement.increasedPct}%
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            {movement.increased}
            <span className="text-xs font-normal text-slate-500 ml-1">risks heightened</span>
          </div>
          <p className="text-[11px] text-rose-700 mt-1">
            Control degradation or increasing external threat
          </p>
        </div>
      </div>

      {/* Migration Pathways Breakdown */}
      <div>
        <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
          Significant Severity Transitions
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/40 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1 text-[11px] font-medium text-slate-600">
                <span className="text-rose-600 font-semibold">Critical</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
                <span className="text-amber-600 font-semibold">High</span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">Control mitigation</div>
            </div>
            <span className="text-sm font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
              {movement.critToHigh}
            </span>
          </div>

          <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/40 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1 text-[11px] font-medium text-slate-600">
                <span className="text-rose-600 font-semibold">Critical</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
                <span className="text-yellow-600 font-semibold">Moderate</span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">High control impact</div>
            </div>
            <span className="text-sm font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
              {movement.critToMod}
            </span>
          </div>

          <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/40 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1 text-[11px] font-medium text-slate-600">
                <span className="text-amber-600 font-semibold">High</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
                <span className="text-yellow-600 font-semibold">Moderate</span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">Operational controls</div>
            </div>
            <span className="text-sm font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
              {movement.highToMod}
            </span>
          </div>

          <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/40 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1 text-[11px] font-medium text-slate-600">
                <span className="text-amber-600 font-semibold">High</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
                <span className="text-emerald-600 font-semibold">Low</span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">Robust containment</div>
            </div>
            <span className="text-sm font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
              {movement.highToLow}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

