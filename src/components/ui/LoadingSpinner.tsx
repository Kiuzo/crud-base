'use client'
// ============================================
// COMPONENTE: LoadingSpinner
// Spinner de loading consistente
// ============================================

import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: string;
    className?: string;
}

const sizeStyles = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
    xl: 'w-12 h-12 border-4',
};

export function LoadingSpinner({ size = 'md', color = 'border-blue-500', className }: LoadingSpinnerProps) {
    return (
        <div
            className={cn(
                'border-slate-300 border-t-transparent rounded-full animate-spin',
                sizeStyles[size],
                color,
                className
            )}
            role="status"
            aria-label="Carregando"
        />
    );
}

/**
 * Componente de loading para tela inteira
 */
export function LoadingScreen({ message = 'Carregando...' }: { message?: string }) {
    return (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-50">
            <LoadingSpinner size="xl" />
            <p className="mt-4 text-slate-600 font-medium">{message}</p>
        </div>
    );
}
