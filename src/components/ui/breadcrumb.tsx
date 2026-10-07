import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export function Breadcrumb({
  items,
  className,
}: {
  items: BreadcrumbItem[]
  className?: string
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1', className)}>
      <ol className="flex items-center gap-1 flex-wrap">
        <li>
          <a
            href="#"
            className="inline-flex items-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            aria-label="Home"
          >
            <Home className="size-3.5" />
          </a>
        </li>
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.label} className="inline-flex items-center gap-1">
              <ChevronRight className="size-3.5 text-[var(--color-text-disabled)]" aria-hidden />
              {last || !item.href ? (
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
