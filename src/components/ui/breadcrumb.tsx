import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
  onClick?: () => void
}

export function Breadcrumb({
  items,
  onHomeClick,
  className,
}: {
  items: BreadcrumbItem[]
  onHomeClick?: () => void
  className?: string
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1 min-w-0', className)}>
      <ol className="flex items-center gap-1 flex-nowrap whitespace-nowrap min-w-0">
        <li className="shrink-0 flex items-center">
          {onHomeClick ? (
            <button
              type="button"
              onClick={onHomeClick}
              className="inline-flex size-7 items-center justify-center rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 cursor-pointer"
              aria-label="Home"
              title="Return to Executive Overview"
            >
              <Home className="size-3.5" />
            </button>
          ) : (
            <a
              href="#"
              className="inline-flex size-7 items-center justify-center rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Home"
            >
              <Home className="size-3.5" />
            </a>
          )}
        </li>
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.label} className="inline-flex items-center gap-1 shrink-0">
              <ChevronRight className="size-3.5 text-slate-300 shrink-0" aria-hidden />
              {last || (!item.href && !item.onClick) ? (
                <span
                  className={cn(
                    'px-1.5 py-0.5 rounded text-xs sm:text-[13px] leading-tight select-none',
                    last
                      ? 'text-slate-900 font-semibold'
                      : 'text-slate-500 font-normal',
                  )}
                  aria-current={last ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : item.onClick ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="px-1.5 py-0.5 rounded-md text-xs sm:text-[13px] leading-tight font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 cursor-pointer"
                >
                  {item.label}
                </button>
              ) : (
                <a
                  href={item.href}
                  className="px-1.5 py-0.5 rounded-md text-xs sm:text-[13px] leading-tight font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  {item.label}
                </a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
