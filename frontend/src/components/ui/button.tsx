import * as React from 'react'
import { cn } from '@/lib/utils'

export type ButtonVariant = 'default' | 'outline' | 'ghost' | 'soft' | 'danger'
export type ButtonSize = 'default' | 'sm' | 'icon'

const variantStyles: Record<ButtonVariant, string> = {
  default: 'bg-red-600 text-white shadow-[0_8px_18px_rgba(220, 38, 38,0.25)] hover:bg-red-700',
  outline: 'border border-slate-200 bg-white text-slate-950 shadow-sm hover:bg-slate-50',
  ghost: 'text-slate-700 hover:bg-slate-100',
  soft: 'bg-slate-100 text-slate-950 shadow-sm hover:bg-slate-200',
  danger: 'text-orange-600 hover:bg-orange-50',
}

const sizeStyles: Record<ButtonSize, string> = {
  default: 'h-11 px-4 py-2',
  sm: 'h-9 px-3',
  icon: 'h-11 w-11',
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({ className, variant = 'default', size = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:pointer-events-none disabled:opacity-50',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  )
}
