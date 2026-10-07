import * as React from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Checkbox } from './checkbox'
import { Button } from './button'
import { Input } from './input'
import { Skeleton } from './progress'

export type TableDensity = 'comfortable' | 'compact'

export function TableToolbar({
  searchPlaceholder = 'Search…',
  searchValue,
  onSearchChange,
  children,
  className,
}: {
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (v: string) => void
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-wrap items-center justify-between gap-3 p-3', className)}>
      <div className="relative w-full max-w-xs">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
        <Input
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder={searchPlaceholder}
          className="pl-9 h-8"
          aria-label="Search table"
        />
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  )
}

export function Table({
  className,
  density = 'comfortable',
  children,
}: {
  className?: string
  density?: TableDensity
  children: React.ReactNode
}) {
  return (
    <div className={cn('w-full overflow-auto scrollbar-thin', className)}>
      <table
        data-density={density}
        className={cn(
          'w-full border-collapse text-left font-body-md',
          density === 'compact' ? '[&_th]:h-9 [&_td]:py-1.5' : '[&_th]:h-11 [&_td]:py-3',
        )}
      >
        {children}
      </table>
    </div>
  )
}

export function TableHeader({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <thead
      className={cn(
        'sticky top-0 z-10 bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)]',
        className,
      )}
    >
      {children}
    </thead>
  )
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="divide-y divide-[var(--color-border)]">{children}</tbody>
}

export function TableRow({
  className,
  selected,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement> & { selected?: boolean }) {
  return (
    <tr
      className={cn(
        'transition-colors duration-100 hover:bg-[var(--color-surface-secondary)]/80',
        selected && 'bg-[var(--color-primary-subtle)] hover:bg-[var(--color-primary-subtle)]',
        className,
      )}
      data-selected={selected || undefined}
      {...props}
    />
  )
}

export function TableHead({
  className,
  sortable,
  sorted,
  onSort,
  children,
  sticky,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement> & {
  sortable?: boolean
  sorted?: 'asc' | 'desc' | false
  onSort?: () => void
  sticky?: boolean
}) {
  const content = (
    <>
      <span>{children}</span>
      {sortable && (
        <span className="text-[var(--color-text-muted)]">
          {sorted === 'asc' ? (
            <ArrowUp className="size-3.5" />
          ) : sorted === 'desc' ? (
            <ArrowDown className="size-3.5" />
          ) : (
            <ArrowUpDown className="size-3.5 opacity-50" />
          )}
        </span>
      )}
    </>
  )

  return (
    <th
      className={cn(
        'px-3 font-label text-[var(--color-text-secondary)] whitespace-nowrap',
        sticky && 'sticky left-0 z-20 bg-[var(--color-surface-secondary)]',
        className,
      )}
      aria-sort={
        sortable
          ? sorted === 'asc'
            ? 'ascending'
            : sorted === 'desc'
              ? 'descending'
              : 'none'
          : undefined
      }
      {...props}
    >
      {sortable ? (
        <button
          type="button"
          onClick={onSort}
          className="inline-flex items-center gap-1 hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)] rounded"
        >
          {content}
        </button>
      ) : (
        <span className="inline-flex items-center gap-1">{content}</span>
      )}
    </th>
  )
}

export function TableCell({
  className,
  sticky,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement> & { sticky?: boolean }) {
  return (
    <td
      className={cn(
        'px-3 text-[var(--color-text-primary)] align-middle',
        sticky && 'sticky left-0 z-[5] bg-[var(--color-surface)]',
        className,
      )}
      {...props}
    />
  )
}

export function TableSelectCell({
  checked,
  indeterminate,
  onChange,
  ariaLabel,
}: {
  checked?: boolean
  indeterminate?: boolean
  onChange?: (checked: boolean) => void
  ariaLabel: string
}) {
  return (
    <TableCell className="w-10 px-3">
      <Checkbox
        checked={checked}
        indeterminate={indeterminate}
        onChange={(e) => onChange?.(e.target.checked)}
        aria-label={ariaLabel}
      />
    </TableCell>
  )
}

export function TableActionsCell({ children }: { children?: React.ReactNode }) {
  return (
    <TableCell className="w-12 text-right">
      {children ?? (
        <Button variant="ghost" size="icon-sm" aria-label="Row actions">
          <MoreHorizontal className="size-4" />
        </Button>
      )}
    </TableCell>
  )
}

export function TableEmpty({
  title = 'No results',
  description = 'Try adjusting filters or search.',
  action,
}: {
  title?: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <tr>
      <td colSpan={99} className="px-3 py-16 text-center">
        <div className="mx-auto max-w-sm">
          <div className="font-h4 text-[var(--color-text-primary)]">{title}</div>
          <p className="mt-1 font-body-md text-[var(--color-text-muted)]">{description}</p>
          {action && <div className="mt-4 flex justify-center">{action}</div>}
        </div>
      </td>
    </tr>
  )
}

export function TableLoading({ rows = 5, cols = 6 }: { rows?: number; cols?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, r) => (
        <TableRow key={r} className="hover:bg-transparent">
          {Array.from({ length: cols }).map((_, c) => (
            <TableCell key={c}>
              <Skeleton className="h-4 w-full max-w-[120px]" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}
