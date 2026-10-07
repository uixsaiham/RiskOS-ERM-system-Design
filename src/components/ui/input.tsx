import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, disabled, readOnly, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={error || undefined}
        className={cn(
          'flex h-9 w-full rounded-md border bg-[var(--color-surface)] px-3 py-2 font-body-md text-[var(--color-text-primary)] shadow-[var(--shadow-xs)] transition-colors duration-150',
          'placeholder:text-[var(--color-text-disabled)]',
          'hover:border-[var(--color-border-strong)]',
          'focus-visible:outline-none focus-visible:border-[var(--color-primary)] focus-visible:shadow-[var(--shadow-focus)]',
          'disabled:cursor-not-allowed disabled:bg-[var(--color-surface-secondary)] disabled:text-[var(--color-text-disabled)] disabled:opacity-70',
          'read-only:bg-[var(--color-surface-secondary)] read-only:focus-visible:shadow-none read-only:focus-visible:border-[var(--color-border)]',
          error
            ? 'border-[var(--color-error)] focus-visible:border-[var(--color-error)] focus-visible:shadow-[var(--shadow-focus-error)]'
            : 'border-[var(--color-border)]',
          className,
        )}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'
