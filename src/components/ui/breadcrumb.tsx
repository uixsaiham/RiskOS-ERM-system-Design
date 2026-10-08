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
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1', className)}>
      <ol className="flex items-center gap-1 flex-wrap">
        <li>
          {onHomeClick ? (
            <button
              type="button"
              onClick={onHomeClick}
              className="inline-flex items-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)] rounded"
              aria-label="Home"
            >
              <Home className="size-3.5" />
            </button>
          ) : (
            <a
              href="#"
              className="inline-flex items-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              aria-label="Home"
            >
              <Home className="size-3.5" />
            </a>
          )}
        </li>
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.label} className="inline-flex items-center gap-1">
              <ChevronRight className="size-3.5 text-[var(--color-text-disabled)]" aria-hidden />
              {last || (!item.href && !item.onClick) ? (
                <span
                  className={cn(
                    'font-body-sm',
                    last
                      ? 'text-[var(--color-text-primary)] font-medium'
                      : 'text-[var(--color-text-muted)]',
                  )}
                  aria-current={last ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : item.onClick ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="font-body-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)] rounded"
                >
                  {item.label}
                </button>
              ) : (
                <a
                  href={item.href}
                  className="font-body-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
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
