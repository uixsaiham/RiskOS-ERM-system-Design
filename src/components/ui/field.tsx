import * as React from 'react'
import { cn } from '@/lib/utils'
import { Label } from './label'

export interface FieldProps {
  label?: string
  htmlFor?: string
  required?: boolean
  optional?: boolean
  helperText?: string
  error?: string
  className?: string
  children: React.ReactNode
}

export function Field({
  label,
  htmlFor,
  required,
  optional,
  helperText,
  error,
  className,
  children,
}: FieldProps) {
  const helperId = htmlFor ? `${htmlFor}-helper` : undefined
  const errorId = htmlFor ? `${htmlFor}-error` : undefined

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <Label htmlFor={htmlFor} required={required} optional={optional}>
          {label}
        </Label>
      )}
      {children}
      {error ? (
        <p id={errorId} className="font-caption text-[var(--color-error)]" role="alert">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="font-caption text-[var(--color-text-muted)]">
          {helperText}
        </p>
      ) : null}
    </div>
  )
}
