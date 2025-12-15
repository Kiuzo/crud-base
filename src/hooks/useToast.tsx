'use client'
import { useState, useCallback, createContext, useContext } from 'react';
import { Toast, ToastType, ToastContextType } from '@/types';
import { TOAST_CONFIG } from '@/constants';

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (type: ToastType, message: string, duration?: number) => {
      const id = Math.random().toString(36).substring(2, 9);
      const toast: Toast = {
        id,
        type,
        message,
        duration: duration || TOAST_CONFIG.DEFAULT_DURATION,
      };
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        removeToast(id);
      }, toast.duration);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback(
    (message: string, duration?: number) => {
      addToast('success', message, duration || TOAST_CONFIG.SUCCESS_DURATION);
    },
    [addToast]
  );

  const error = useCallback(
    (message: string, duration?: number) => {
      addToast('error', message, duration || TOAST_CONFIG.ERROR_DURATION);
    },
    [addToast]
  );

  const warning = useCallback(
    (message: string, duration?: number) => {
      addToast('warning', message, duration || TOAST_CONFIG.WARNING_DURATION);
    },
    [addToast]
  );

  const info = useCallback(
    (message: string, duration?: number) => {
      addToast('info', message, duration || TOAST_CONFIG.INFO_DURATION);
    },
    [addToast]
  );

  const value: ToastContextType = {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  };

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
