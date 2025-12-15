// ============================================
// CONSTANTES DO PROJETO
// ============================================

import { Cargo, Departamento } from '@/types';

/**
 * Lista de cargos disponíveis
 */
export const CARGOS_DISPONIVEIS = [
    Cargo.ADMINISTRADOR,
    Cargo.GERENTE,
    Cargo.USUARIO,
    Cargo.DESENVOLVEDOR,
    Cargo.ANALISTA,
    Cargo.SUPORTE,
];

/**
 * Lista de departamentos disponíveis
 */
export const DEPARTAMENTOS_DISPONIVEIS = [
    Departamento.TI,
    Departamento.RH,
    Departamento.VENDAS,
    Departamento.MARKETING,
    Departamento.FINANCEIRO,
    Departamento.OPERACOES,
    Departamento.SUPORTE,
];

/**
 * Configurações de validação
 */
export const VALIDATION_CONFIG = {
    PASSWORD_MIN_LENGTH: 8,
    PHONE_PATTERN: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
    NAME_MIN_LENGTH: 3,
    NAME_MAX_LENGTH: 100,
};

/**
 * Mensagens de erro padrão
 */
export const ERROR_MESSAGES = {
    REQUIRED_FIELD: 'Este campo é obrigatório',
    INVALID_PHONE: 'Telefone inválido. Use o formato (00) 00000-0000',
    PASSWORD_TOO_SHORT: `A senha deve ter no mínimo ${VALIDATION_CONFIG.PASSWORD_MIN_LENGTH} caracteres`,
    NAME_TOO_SHORT: `O nome deve ter no mínimo ${VALIDATION_CONFIG.NAME_MIN_LENGTH} caracteres`,
    NAME_TOO_LONG: `O nome deve ter no máximo ${VALIDATION_CONFIG.NAME_MAX_LENGTH} caracteres`,
    GENERIC_ERROR: 'Ocorreu um erro. Tente novamente.',
    NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
    UNAUTHORIZED: 'Você não tem permissão para esta ação.',
    USER_NOT_FOUND: 'Usuário não encontrado.',
    DUPLICATE_EMAIL: 'Este email já está cadastrado.',
};

/**
 * Mensagens de sucesso padrão
 */
export const SUCCESS_MESSAGES = {
    USER_CREATED: 'Usuário criado com sucesso! ✅',
    USER_UPDATED: 'Usuário atualizado com sucesso! ✅',
    USER_DELETED: 'Usuário removido com sucesso! ✅',
    LOGIN_SUCCESS: 'Login realizado com sucesso! ✅',
    LOGOUT_SUCCESS: 'Logout realizado com sucesso! ✅',
};

/**
 * Configurações de Toast
 */
export const TOAST_CONFIG = {
    DEFAULT_DURATION: 3000,
    SUCCESS_DURATION: 2000,
    ERROR_DURATION: 5000,
    WARNING_DURATION: 4000,
    INFO_DURATION: 3000,
};

/**
 * Configurações de paginação
 */
export const PAGINATION_CONFIG = {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
};

/**
 * Breakpoints responsivos (em pixels)
 */
export const BREAKPOINTS = {
    MOBILE: 375,
    TABLET: 768,
    DESKTOP: 1024,
    WIDE: 1920,
};

/**
 * Delays para debounce (em ms)
 */
export const DEBOUNCE_DELAYS = {
    SEARCH: 300,
    INPUT: 500,
    RESIZE: 150,
};
