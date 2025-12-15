// ============================================
// SUPABASE HELPERS
// ============================================

import { isConfigured } from '@/lib/supabase';
import { ERROR_MESSAGES } from '@/constants';

/**
 * Traduz erros do Supabase para mensagens user-friendly
 */
export function handleSupabaseError(error: any): string {
    if (!error) return ERROR_MESSAGES.GENERIC_ERROR;

    const errorMessage = error.message?.toLowerCase() || '';

    // Verifica se é erro de placeholder (configuração ausente)
    if (!isConfigured && (errorMessage.includes('fetch') || errorMessage.includes('network') || errorMessage.includes('url') || errorMessage.includes('apikey'))) {
        return 'Configuração do Supabase ausente. Verifique se o arquivo .env.local contém NEXT_PUBLIC_SUPABASE_URL e KEY válidos.';
    }

    // Erros de autenticação
    if (errorMessage.includes('invalid login credentials')) {
        return 'Email ou senha incorretos.';
    }

    if (errorMessage.includes('email not confirmed')) {
        return 'Por favor, confirme seu email antes de fazer login.';
    }

    if (errorMessage.includes('user already registered') || errorMessage.includes('already been registered')) {
        return ERROR_MESSAGES.DUPLICATE_EMAIL;
    }

    if (errorMessage.includes('password should be at least')) {
        return 'A senha deve ter no mínimo 6 caracteres.';
    }

    if (errorMessage.includes('unable to validate email') || errorMessage.includes('invalid email')) {
        return 'O email informado é inválido.';
    }

    // Erros de rede
    if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        return ERROR_MESSAGES.NETWORK_ERROR;
    }

    // Erros de permissão
    if (errorMessage.includes('permission') || errorMessage.includes('unauthorized')) {
        return ERROR_MESSAGES.UNAUTHORIZED;
    }

    // Erros de validação
    if (errorMessage.includes('unique')) {
        return 'Este registro já existe no sistema.';
    }
    if (errorMessage.includes('foreign key')) {
        return 'Não é possível realizar esta operação devido a dependências.';
    }

    // Rate Limit (Muitas tentativas)
    if (errorMessage.includes('too many requests') || errorMessage.includes('rate limit')) {
        return 'Muitas tentativas consecutivas. Aguarde alguns instantes e tente novamente.';
    }

    // Senha Fraca (outras variantes)
    if (errorMessage.includes('weak password') || errorMessage.includes('password is too short')) {
        return 'Sua senha é muito fraca. Escolha uma senha mais segura com no mínimo 6 caracteres.';
    }

    // Erros genéricos de Auth
    if (errorMessage.includes('auth') && errorMessage.includes('error')) {
        return 'Ocorreu um erro de autenticação. Tente novamente.';
    }

    // Timeout
    if (errorMessage.includes('timeout')) {
        return 'A operação demorou muito. Tente novamente.';
    }

    // Retorna mensagem original se não houver tradução
    return error.message || ERROR_MESSAGES.GENERIC_ERROR;
}

/**
 * Retry logic para operações do Supabase
 */
export async function withRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delayMs: number = 1000
): Promise<T> {
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await operation();
        } catch (error) {
            lastError = error;

            // Não fazer retry em erros de validação ou autenticação
            const errorMessage = (error as any)?.message?.toLowerCase() || '';
            if (
                errorMessage.includes('invalid') ||
                errorMessage.includes('unauthorized') ||
                errorMessage.includes('violates')
            ) {
                throw error;
            }

            // Se não é a última tentativa, aguarda antes de tentar novamente
            if (attempt < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, delayMs * attempt));
            }
        }
    }

    throw lastError;
}

/**
 * Verifica se o erro é de rede
 */
export function isNetworkError(error: any): boolean {
    const message = error?.message?.toLowerCase() || '';
    return message.includes('network') || message.includes('fetch') || message.includes('timeout');
}

/**
 * Verifica se o erro é de autenticação
 */
export function isAuthError(error: any): boolean {
    const message = error?.message?.toLowerCase() || '';
    return (
        message.includes('unauthorized') ||
        message.includes('invalid login') ||
        message.includes('not authenticated')
    );
}

/**
 * Log estruturado de erros
 */
export function logError(context: string, error: any, additionalData?: any): void {
    // Sanitizar o erro para evitar logar informações sensíveis (como chaves/URLs)
    const safeError = {
        message: error?.message || 'Unknown error',
        code: error?.code,
        details: error?.details,
        hint: error?.hint,
    };

    console.error(`[${context}]`, {
        ...safeError,
        timestamp: new Date().toISOString(),
        ...additionalData,
    });
}
