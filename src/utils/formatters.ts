// ============================================
// FORMATADORES
// ============================================

/**
 * Formata data para padrão brasileiro
 */
export function formatDate(date: string | Date): string {
    if (!date) return '';

    const dateObj = typeof date === 'string' ? new Date(date) : date;

    return dateObj.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

/**
 * Formata data e hora para padrão brasileiro
 */
export function formatDateTime(date: string | Date): string {
    if (!date) return '';

    const dateObj = typeof date === 'string' ? new Date(date) : date;

    return dateObj.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

/**
 * Formata telefone brasileiro
 * Input: 11999999999 -> Output: (11) 99999-9999
 */
export function formatPhone(phone: string): string {
    if (!phone) return '';

    // Remove tudo que não é número
    const numbers = phone.replace(/\D/g, '');

    // Formata de acordo com o tamanho
    if (numbers.length === 11) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    } else if (numbers.length === 10) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    }

    return phone;
}

/**
 * Aplica máscara de telefone enquanto digita
 */
export function maskPhone(value: string): string {
    if (!value) return '';

    // Remove tudo que não é número
    let numbers = value.replace(/\D/g, '');

    // Limita a 11 dígitos
    numbers = numbers.slice(0, 11);

    // Aplica a máscara
    if (numbers.length <= 2) {
        return numbers;
    } else if (numbers.length <= 6) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 10) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    } else {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    }
}

/**
 * Remove máscara de telefone
 */
export function unmaskPhone(phone: string): string {
    return phone.replace(/\D/g, '');
}

/**
 * Formata moeda brasileira
 */
export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
}

/**
 * Trunca texto com reticências
 */
export function truncate(text: string, maxLength: number): string {
    if (!text || text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
}

/**
 * Capitaliza primeira letra
 */
export function capitalize(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Capitaliza primeira letra de cada palavra
 */
export function capitalizeWords(text: string): string {
    if (!text) return '';
    return text
        .split(' ')
        .map(word => capitalize(word))
        .join(' ');
}
