import type { ControlSavedViewId } from '../controls-data'

interface ControlSavedViewsProps {
  activeView: ControlSavedViewId
  onSelectView: (view: ControlSavedViewId) => void
  counts: {
    all: number
    myControls: number
    effective: number
    needsImprovement: number
    ineffective: number
    notImplemented: number
    controlGaps: number
  }
}

export function ControlSavedViews({
  activeView,
  onSelectView,
  counts,
}: ControlSavedViewsProps) {
  const views: Array<{
    id: ControlSavedViewId
    label: string
    count?: number
  }> = [
    { id: 'all', label: 'All controls', count: counts.all },
    { id: 'my_controls', label: 'My controls', count: counts.myControls },
    { id: 'effective', label: 'Effective', count: counts.effective },
    { id: 'needs_improvement', label: 'Needs review', count: counts.needsImprovement },
    { id: 'ineffective', label: 'Ineffective', count: counts.ineffective },
    { id: 'not_implemented', label: 'Not implemented', count: counts.notImplemented },
    { id: 'control_gaps', label: 'Control gaps', count: counts.controlGaps },
    { id: 'recently_reviewed', label: 'Recently reviewed' },
  ]

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
      <div className="flex items-center gap-1 p-1 bg-slate-100/90 rounded-xl border border-slate-200/80 shrink-0">
        {views.map((v) => {
          const isActive = activeView === v.id
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onSelectView(v.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span>{v.label}</span>
              {v.count !== undefined && (
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono tabular-nums ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 font-bold'
                      : 'bg-slate-200/70 text-slate-600'
                  }`}
                >
                  {v.count}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
