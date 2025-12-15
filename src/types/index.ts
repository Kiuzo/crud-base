// ============================================
// TIPOS E INTERFACES COMPARTILHADAS
// ============================================

import React from 'react';


/**
 * Interface principal de usuário
 * Usada em todos os componentes do sistema
 */
export interface Usuario {
    id: string;
    user_id: string;
    nome: string;
    email: string;
    cargo: string;
    departamento?: string;
    telefone?: string;
    ativo: boolean;
    created_at?: string;
    updated_at?: string;
}

/**
 * Dados do formulário de criação/edição de usuário
 */
export interface UsuarioFormData {
    nome: string;
    email: string;
    cargo: string;
    departamento: string;
    telefone: string;
    senha: string;
}

/**
 * Resposta padrão do Supabase
 */
export interface SupabaseResponse<T> {
    data: T | null;
    error: Error | null;
}

/**
 * Estados de loading
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Tipos de toast/notificação
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * Interface de Toast
 */
export interface Toast {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}

/**
 * Enums para valores predefinidos
 */
export enum Cargo {
    ADMINISTRADOR = 'Administrador',
    GERENTE = 'Gerente',
    USUARIO = 'Usuário',
    DESENVOLVEDOR = 'Desenvolvedor',
    ANALISTA = 'Analista',
    SUPORTE = 'Suporte',
}

export enum Departamento {
    TI = 'TI',
    RH = 'RH',
    VENDAS = 'Vendas',
    MARKETING = 'Marketing',
    FINANCEIRO = 'Financeiro',
    OPERACOES = 'Operações',
    SUPORTE = 'Suporte',
}

/**
 * Props de componentes comuns
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showCloseButton?: boolean;
}

/**
 * Contexto de autenticação
 */
export interface AuthContextType {
    user: Usuario | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

/**
 * Contexto de Toast
 */
export interface ToastContextType {
    toasts: Toast[];
    addToast: (type: ToastType, message: string, duration?: number) => void;
    removeToast: (id: string) => void;
    success: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    warning: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
}
