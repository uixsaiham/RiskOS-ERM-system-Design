import { DEFAULT_SAVED_VIEWS, type SavedViewConfig } from '../risk-register-data'

interface SavedViewsSelectorProps {
  activeViewId: string
  onSelectView: (view: SavedViewConfig) => void
  onSaveNewView?: (newView: SavedViewConfig) => void
  customViews?: SavedViewConfig[]
}

export function SavedViewsSelector({
  activeViewId,
  onSelectView,
  customViews = [],
}: SavedViewsSelectorProps) {
  const allViews = [...DEFAULT_SAVED_VIEWS, ...customViews]

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
      <div className="flex items-center gap-1 p-1 bg-slate-100/90 rounded-xl border border-slate-200/80 shrink-0">
        {allViews.map((view) => {
          const isActive = activeViewId === view.id
          return (
            <button
              key={view.id}
              type="button"
              onClick={() => onSelectView(view)}
              title={view.description}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span>{view.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
