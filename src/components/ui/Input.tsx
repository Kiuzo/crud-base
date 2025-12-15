'use client'
// ============================================
// COMPONENTE: Input
// Input field reutilizável com label e validação
// ============================================

import React from 'react';
import { InputProps } from '@/types';
import { cn } from '@/lib/utils';

export function Input({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    className,
    ...props
}: InputProps) {
    return (
        <div className="w-full space-y-2">
            {label && (
                <label className="block text-sm font-semibold text-slate-700">
                    {label}
                    {props.required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {leftIcon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        {leftIcon}
                    </div>
                )}

                <input
                    className={cn(
                        'w-full bg-slate-50 border-2 border-slate-200',
                        'focus:border-blue-500 focus:bg-white',
                        'rounded-xl py-3 px-4',
                        'outline-none transition-all duration-200',
                        'placeholder:text-slate-400',
                        'hover:border-slate-300',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        error && 'border-red-500 focus:border-red-500',
                        leftIcon && 'pl-10',
                        rightIcon && 'pr-10',
                        className
                    )}
                    {...props}
                />

                {rightIcon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                        {rightIcon}
                    </div>
                )}
            </div>

            {error && (
                <p className="text-sm text-red-600 font-medium">{error}</p>
            )}

            {helperText && !error && (
                <p className="text-sm text-slate-500">{helperText}</p>
            )}
        </div>
    );
}
