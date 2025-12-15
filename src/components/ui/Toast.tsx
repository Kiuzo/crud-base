'use client'
// ============================================
// COMPONENTE: Toast
// Sistema de notificações toast
// ============================================

import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { Toast as ToastType } from '@/types';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';

const toastIcons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
};

const toastStyles = {
    success: 'bg-green-50 border-green-200 text-green-700',
    error: 'bg-red-50 border-red-200 text-red-700',
    warning: 'bg-amber-50 border-amber-200 text-amber-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700',
};

const iconStyles = {
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-amber-600',
    info: 'text-blue-600',
};

/**
 * Componente individual de Toast
 */
function ToastItem({ toast, onRemove }: { toast: ToastType; onRemove: (id: string) => void }) {
    const Icon = toastIcons[toast.type];

    return (
        <div
            className={cn(
                'flex items-center gap-3 p-4 rounded-lg border-2 shadow-lg',
                'animate-slideInRight',
                'min-w-[300px] max-w-md',
                toastStyles[toast.type]
            )}
            role="alert"
        >
            <Icon className={cn('w-5 h-5 flex-shrink-0', iconStyles[toast.type])} />
            <p className="flex-1 font-medium text-sm">{toast.message}</p>
            <button
                onClick={() => onRemove(toast.id)}
                className="p-1 hover:bg-black/10 rounded transition-colors flex-shrink-0"
                aria-label="Fechar notificação"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}

/**
 * Container de Toasts
 */
export function ToastContainer() {
    const { toasts, removeToast } = useToast();

    if (toasts.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
            <div className="flex flex-col gap-3 pointer-events-auto">
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
                ))}
            </div>
        </div>
    );
}
