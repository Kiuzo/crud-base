'use client'
// ============================================
// COMPONENTE: Modal
// Modal reutilizável com acessibilidade
// ============================================

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { ModalProps } from '@/types';
import { cn } from '@/lib/utils';

const sizeStyles = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
};

export function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    showCloseButton = true,
}: ModalProps) {
    // Fecha modal com ESC
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Previne scroll do body quando modal está aberto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 animate-fadeIn" />

            {/* Modal Content */}
            <div
                className={cn(
                    'relative bg-white rounded-2xl shadow-2xl w-full animate-scaleIn',
                    sizeStyles[size]
                )}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between p-6 border-b border-slate-200">
                        {title && <h2 className="text-2xl font-bold text-slate-800">{title}</h2>}
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                aria-label="Fechar modal"
                            >
                                <X className="w-5 h-5 text-slate-500" />
                            </button>
                        )}
                    </div>
                )}

                {/* Body */}
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}
