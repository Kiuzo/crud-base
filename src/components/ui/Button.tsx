'use client'
// ============================================
// COMPONENTE: Button
// Botão reutilizável com variantes e estados
// ============================================

import React from 'react';
import { ButtonProps } from '@/types';
import { cn } from '@/lib/utils';

const variantStyles = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-slate-200 hover:bg-slate-300 text-slate-700',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700',
};

const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
};

export function Button({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    className,
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Carregando...
                </>
            ) : (
                <>
                    {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
                    {children}
                    {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
                </>
            )}
        </button>
    );
}
