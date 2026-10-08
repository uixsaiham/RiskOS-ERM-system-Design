export function RegisterSkeleton() {
  return (
    <div className="space-y-4 animate-pulse" aria-label="Loading Risk Register workspace">
      {/* KPI Cards skeleton */}
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-24 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 space-y-2"
          >
            <div className="h-3.5 w-1/2 rounded bg-[var(--color-surface-secondary)]" />
            <div className="h-6 w-1/3 rounded bg-[var(--color-surface-secondary)]" />
            <div className="h-2.5 w-2/3 rounded bg-[var(--color-surface-secondary)]" />
          </div>
        ))}
      </div>

      {/* Status distribution skeleton */}
      <div className="h-16 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 space-y-2">
        <div className="h-3 w-1/4 rounded bg-[var(--color-surface-secondary)]" />
        <div className="h-4 w-full rounded bg-[var(--color-surface-secondary)]" />
      </div>

      {/* Toolbar skeleton */}
      <div className="h-20 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 space-y-2">
        <div className="flex justify-between gap-3">
          <div className="h-8.5 w-72 rounded bg-[var(--color-surface-secondary)]" />
          <div className="flex gap-2">
            <div className="h-8.5 w-28 rounded bg-[var(--color-surface-secondary)]" />
            <div className="h-8.5 w-28 rounded bg-[var(--color-surface-secondary)]" />
            <div className="h-8.5 w-28 rounded bg-[var(--color-surface-secondary)]" />
          </div>
        </div>
      </div>

      {/* Table rows skeleton */}
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
        <div className="h-10 border-b border-[var(--color-border)] bg-[var(--color-surface-secondary)]" />
        <div className="divide-y divide-[var(--color-border)]">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex items-center justify-between p-3.5 gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="size-4 rounded bg-[var(--color-surface-secondary)]" />
                <div className="h-4 w-20 rounded bg-[var(--color-surface-secondary)]" />
                <div className="h-4 w-56 rounded bg-[var(--color-surface-secondary)]" />
              </div>
              <div className="flex items-center gap-6">
                <div className="h-4 w-24 rounded bg-[var(--color-surface-secondary)]" />
                <div className="h-4 w-20 rounded bg-[var(--color-surface-secondary)]" />
                <div className="h-4 w-16 rounded bg-[var(--color-surface-secondary)]" />
                <div className="h-4 w-16 rounded bg-[var(--color-surface-secondary)]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

