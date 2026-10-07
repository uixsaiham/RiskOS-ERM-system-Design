import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: string
  size?: 'sm' | 'md'
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      checked = false,
      onCheckedChange,
      disabled,
      label,
      size = 'md',
      id,
      ...props
    },
    ref,
  ) => {
    const toggleId = id || React.useId()
    return (
      <div className={cn('inline-flex items-center gap-2', className)}>
        <button
          ref={ref}
          id={toggleId}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => onCheckedChange?.(!checked)}
          className={cn(
            'relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)] disabled:cursor-not-allowed disabled:opacity-50',
            size === 'sm' ? 'h-5 w-9' : 'h-6 w-11',
            checked ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-surface-tertiary)]',
          )}
          {...props}
        >
          <span
            className={cn(
              'pointer-events-none absolute top-0.5 left-0.5 rounded-full bg-white shadow-[var(--shadow-sm)] transition-transform duration-150',
              size === 'sm' ? 'size-4' : 'size-5',
              checked && (size === 'sm' ? 'translate-x-4' : 'translate-x-5'),
            )}
          />
        </button>
        {label && (
          <label
            htmlFor={toggleId}
            className={cn(
              'font-body-md text-[var(--color-text-primary)] cursor-pointer',
              disabled && 'cursor-not-allowed opacity-50',
            )}
          >
            {label}
          </label>
        )}
      </div>
    )
  },
)
Toggle.displayName = 'Toggle'
