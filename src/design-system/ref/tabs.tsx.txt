import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TabItem {
  id: string
  label: string
  count?: number
  disabled?: boolean
}

export interface TabsProps {
  items: TabItem[]
  value: string
  onChange: (id: string) => void
  className?: string
  size?: 'sm' | 'md'
}

export function Tabs({ items, value, onChange, className, size = 'md' }: TabsProps) {
  return (
    <div
      role="tablist"
      className={cn(
        'flex items-center gap-0 border-b border-[var(--color-border)]',
        className,
      )}
    >
      {items.map((item) => {
        const active = item.id === value
        return (
          <button
            key={item.id}
            role="tab"
            type="button"
            aria-selected={active}
            disabled={item.disabled}
            onClick={() => onChange(item.id)}
            className={cn(
              'relative inline-flex items-center gap-1.5 font-button transition-colors duration-150',
              'focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)] rounded-t-md',
              'disabled:opacity-50 disabled:pointer-events-none',
              size === 'sm' ? 'px-3 py-2 text-[13px]' : 'px-4 py-2.5',
              active
                ? 'text-[var(--color-primary)]'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]',
            )}
          >
            {item.label}
            {item.count != null && (
              <span
                className={cn(
                  'rounded-full px-1.5 py-0 text-[11px] font-medium tabular-nums',
                  active
                    ? 'bg-[var(--color-primary-subtle)] text-[var(--color-primary)]'
                    : 'bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)]',
                )}
              >
                {item.count}
              </span>
            )}
            {active && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)] rounded-t-full" />
            )}
          </button>
        )
      })}
    </div>
  )
}
