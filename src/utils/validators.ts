// ============================================
// VALIDADORES
// ============================================

import { VALIDATION_CONFIG, ERROR_MESSAGES } from '@/constants';

/**
 * Valida formato de telefone brasileiro
 * Aceita: (00) 0000-0000 ou (00) 00000-0000
 */
export function validatePhone(phone: string): { valid: boolean; message?: string } {
    if (!phone || phone.trim() === '') {
        return { valid: true }; // Telefone é opcional
    }

    const isValid = VALIDATION_CONFIG.PHONE_PATTERN.test(phone);

    return {
        valid: isValid,
        message: isValid ? undefined : ERROR_MESSAGES.INVALID_PHONE,
    };
}

/**
 * Valida senha
 */
export function validatePassword(password: string): { valid: boolean; message?: string } {
    if (!password || password.trim() === '') {
        return { valid: false, message: ERROR_MESSAGES.REQUIRED_FIELD };
    }

    if (password.length < VALIDATION_CONFIG.PASSWORD_MIN_LENGTH) {
        return { valid: false, message: ERROR_MESSAGES.PASSWORD_TOO_SHORT };
    }

    return { valid: true };
}

/**
 * Valida nome
 */
export function validateName(name: string): { valid: boolean; message?: string } {
    if (!name || name.trim() === '') {
        return { valid: false, message: ERROR_MESSAGES.REQUIRED_FIELD };
    }

    if (name.trim().length < VALIDATION_CONFIG.NAME_MIN_LENGTH) {
        return { valid: false, message: ERROR_MESSAGES.NAME_TOO_SHORT };
    }

    if (name.trim().length > VALIDATION_CONFIG.NAME_MAX_LENGTH) {
        return { valid: false, message: ERROR_MESSAGES.NAME_TOO_LONG };
    }

    return { valid: true };
}

/**
 * Sanitiza input removendo caracteres perigosos
 */
export function sanitizeInput(input: string): string {
    return input
        .trim()
        .replace(/[<>]/g, '') // Remove < e >
        .replace(/javascript:/gi, '') // Remove javascript:
        .replace(/on\w+=/gi, ''); // Remove event handlers
}

/**
 * Valida se campo está preenchido
 */
export function validateRequired(value: string, fieldName: string = 'Campo'): { valid: boolean; message?: string } {
    if (!value || value.trim() === '') {
        return { valid: false, message: ERROR_MESSAGES.REQUIRED_FIELD };
    }
    return { valid: true };
}

/**
 * Valida formulário completo de usuário
 */
export function validateUserForm(data: {
    nome: string;
    email: string;
    senha?: string;
    telefone?: string;
}): { valid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    // Validar nome
    const nameValidation = validateName(data.nome);
    if (!nameValidation.valid) {
        errors.nome = nameValidation.message!;
    }

    // Validar email (apenas se preenchido)
    if (!data.email || data.email.trim() === '') {
        errors.email = ERROR_MESSAGES.REQUIRED_FIELD;
    }

    // Validar senha (se fornecida)
    if (data.senha) {
        const passwordValidation = validatePassword(data.senha);
        if (!passwordValidation.valid) {
            errors.senha = passwordValidation.message!;
        }
    }

    // Validar telefone (se fornecido)
    if (data.telefone) {
        const phoneValidation = validatePhone(data.telefone);
        if (!phoneValidation.valid) {
            errors.telefone = phoneValidation.message!;
        }
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
}
