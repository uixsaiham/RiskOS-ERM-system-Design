import * as React from 'react'
import { DesignSystemShowcase } from '@/design-system/Showcase'
import { AppShell } from '@/navigation'

type AppView = 'shell' | 'showcase'

function App() {
  const [view, setView] = React.useState<AppView>('shell')

  if (view === 'showcase') {
    return (
      <div className="relative min-h-dvh">
        <div className="sticky top-0 z-[var(--z-overlay,300)] flex items-center justify-between gap-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 px-4 py-2 backdrop-blur">
          <p className="font-caption text-[var(--color-text-muted)]">
            Design system showcase · Step 01
          </p>
          <button
            type="button"
            className="rounded-md bg-[var(--color-primary)] px-3 py-1.5 font-button text-[var(--color-primary-foreground)] hover:opacity-90"
            onClick={() => setView('shell')}
          >
            Open navigation shell
          </button>
        </div>
        <DesignSystemShowcase />
      </div>
    )
  }

  return <AppShell onOpenShowcase={() => setView('showcase')} />
}

export default App
