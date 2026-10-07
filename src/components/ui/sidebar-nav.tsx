import * as React from 'react'
import { ChevronDown, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tooltip } from './tooltip'

export interface NavChild {
  id: string
  label: string
  href?: string
  badge?: number | string
}

export interface NavItem {
  id: string
  label: string
  icon: LucideIcon
  href?: string
  badge?: number | string
  children?: NavChild[]
}

export function SidebarNavItem({
  item,
  active,
  activeChildId,
  collapsed,
  expanded,
  onToggle,
  onSelect,
}: {
  item: NavItem
  active?: boolean
  /** When a nested child is the current route */
  activeChildId?: string
  collapsed?: boolean
  expanded?: boolean
  onToggle?: () => void
  onSelect?: (id: string) => void
}) {
  const Icon = item.icon
  const hasChildren = !!item.children?.length
  const childActive = !!activeChildId && item.children?.some((c) => c.id === activeChildId)
  const parentActive = !!active && !childActive

  const button = (
    <button
      type="button"
      onClick={() => {
        if (hasChildren && !collapsed) {
          onToggle?.()
          return
        }
        onSelect?.(item.id)
      }}
      className={cn(
        'group flex w-full items-center gap-3 rounded-md px-3 py-2 font-body-md font-medium transition-colors duration-150',
        'focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]',
        collapsed && 'justify-center px-0',
        parentActive || (collapsed && (active || childActive))
          ? 'bg-[var(--color-sidebar-active)] text-[var(--color-sidebar-active-fg)]'
          : childActive
            ? 'text-white'
            : 'text-[var(--color-sidebar-fg)] hover:bg-[var(--color-sidebar-hover)] hover:text-white',
      )}
      aria-current={parentActive ? 'page' : undefined}
      aria-expanded={hasChildren ? expanded : undefined}
    >
      <Icon className="size-5 shrink-0 opacity-90" aria-hidden />
      {!collapsed && (
        <>
          <span className="flex-1 truncate text-left">{item.label}</span>
          {item.badge != null && (
            <span
              className={cn(
                'min-w-[20px] rounded-full px-1.5 py-0 text-center text-[11px] font-semibold tabular-nums',
                parentActive || childActive
                  ? 'bg-white/20 text-white'
                  : 'bg-[var(--color-sidebar-hover)] text-[var(--color-sidebar-fg)]',
              )}
            >
              {item.badge}
            </span>
          )}
          {hasChildren && (
            <ChevronDown
              className={cn(
                'size-4 shrink-0 opacity-70 transition-transform duration-150',
                expanded && 'rotate-180',
              )}
              aria-hidden
            />
          )}
        </>
      )}
    </button>
  )

  return (
    <div>
      {collapsed ? (
        <Tooltip content={item.label} side="right">
          {button}
        </Tooltip>
      ) : (
        button
      )}
      {hasChildren && expanded && !collapsed && (
        <div className="mt-0.5 ml-4 space-y-0.5 border-l border-[var(--color-sidebar-border)] pl-3">
          {item.children!.map((child) => {
            const isChildActive = activeChildId === child.id
            return (
              <button
                key={child.id}
                type="button"
                onClick={() => onSelect?.(child.id)}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 font-body-sm transition-colors',
                  'focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]',
                  isChildActive
                    ? 'bg-[var(--color-sidebar-active)] text-[var(--color-sidebar-active-fg)]'
                    : 'text-[var(--color-sidebar-fg-muted)] hover:bg-[var(--color-sidebar-hover)] hover:text-white',
                )}
                aria-current={isChildActive ? 'page' : undefined}
              >
                <span className="flex-1 truncate text-left">{child.label}</span>
                {child.badge != null && (
                  <span className="text-[11px] tabular-nums opacity-70">{child.badge}</span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

/** Alias used by showcase and app shell */
export const NavItemButton = SidebarNavItem

export function NavSection({
  label,
  collapsed,
  children,
  className,
}: {
  label?: string
  collapsed?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('space-y-1', className)}>
      {label && !collapsed && (
        <p className="px-3 pb-1 pt-3 font-caption font-semibold uppercase tracking-wide text-[var(--color-sidebar-fg-muted)]">
          {label}
        </p>
      )}
      {collapsed && label && (
        <div
          className="mx-auto my-2 h-px w-6 bg-[var(--color-sidebar-border)]"
          aria-hidden
        />
      )}
      <div className="space-y-0.5">{children}</div>
    </div>
  )
}

export function Sidebar({
  collapsed,
  onCollapsedChange,
  logo,
  children,
  footer,
  className,
}: {
  collapsed?: boolean
  onCollapsedChange?: (v: boolean) => void
  logo?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
}) {
  return (
    <aside
      className={cn(
        'flex h-full flex-col bg-[var(--color-sidebar-bg)] text-[var(--color-sidebar-fg)] transition-[width] duration-200',
        collapsed ? 'w-16' : 'w-64',
        className,
      )}
      data-collapsed={collapsed || undefined}
    >
      <div
        className={cn(
          'flex h-16 shrink-0 items-center border-b border-[var(--color-sidebar-border)]',
          collapsed ? 'justify-center px-2' : 'gap-3 px-4',
        )}
      >
        {logo}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-3" aria-label="Primary">
        {children}
      </nav>

      {footer && (
        <div
          className={cn(
            'shrink-0 border-t border-[var(--color-sidebar-border)] p-2',
            collapsed && 'flex justify-center',
          )}
        >
          {footer}
        </div>
      )}

      {onCollapsedChange && (
        <button
          type="button"
          className="sr-only"
          onClick={() => onCollapsedChange(!collapsed)}
        >
          Toggle sidebar
        </button>
      )}
    </aside>
  )
}
