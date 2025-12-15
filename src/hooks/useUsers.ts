'use client'
// ============================================
// HOOK: useUsers
// Gerencia todas as operações CRUD de usuários
// ============================================

import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Usuario, LoadingState } from '@/types';
import { handleSupabaseError, withRetry, logError } from '@/utils/supabase-helpers';
import { SUCCESS_MESSAGES } from '@/constants';

interface UseUsersReturn {
    users: Usuario[];
    loading: LoadingState;
    error: string | null;
    fetchUsers: () => Promise<void>;
    createUser: (userData: {
        nome: string;
        email: string;
        senha: string;
        cargo: string;
        departamento?: string;
        telefone?: string;
    }) => Promise<{ success: boolean; message: string }>;
    updateUser: (
        id: string,
        userData: {
            nome: string;
            email: string;
            cargo: string;
            departamento?: string;
            telefone?: string;
            senha?: string;
        }
    ) => Promise<{ success: boolean; message: string }>;
    deleteUser: (id: string) => Promise<{ success: boolean; message: string }>;
    searchUser: (searchTerm: string) => Promise<Usuario[]>;
    getUserById: (id: string) => Promise<Usuario | null>;
}

export function useUsers(): UseUsersReturn {
    const [users, setUsers] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState<LoadingState>('idle');
    const [error, setError] = useState<string | null>(null);

    /**
     * Busca todos os usuários
     */
    const fetchUsers = useCallback(async () => {
        setLoading('loading');
        setError(null);

        try {
            const { data, error: fetchError } = await withRetry(async () => {
                return await supabase
                    .from('administradores')
                    .select('*')
                    .order('nome', { ascending: true });
            });

            if (fetchError) throw fetchError;

            setUsers(data || []);
            setLoading('success');
        } catch (err: any) {
            const errorMessage = handleSupabaseError(err);
            setError(errorMessage);
            setLoading('error');
            logError('useUsers.fetchUsers', err);
        }
    }, []);

    /**
     * Cria novo usuário
     */
    const createUser = useCallback(
        async (userData: {
            nome: string;
            email: string;
            senha: string;
            cargo: string;
            departamento?: string;
            telefone?: string;
        }): Promise<{ success: boolean; message: string }> => {
            setLoading('loading');
            setError(null);

            try {
                // 1. Criar usuário no Auth
                const { data: authData, error: authError } = await supabase.auth.signUp({
                    email: userData.email,
                    password: userData.senha,
                });

                if (authError) throw authError;

                // 2. Inserir na tabela administradores
                const { error: dbError } = await supabase
                    .from('administradores')
                    .insert([
                        {
                            user_id: authData.user?.id,
                            nome: userData.nome,
                            email: userData.email,
                            cargo: userData.cargo,
                            departamento: userData.departamento || null,
                            telefone: userData.telefone || null,
                            ativo: true,
                        },
                    ]);

                if (dbError) throw dbError;

                // Atualizar lista local
                await fetchUsers();

                setLoading('success');
                return { success: true, message: SUCCESS_MESSAGES.USER_CREATED };
            } catch (err: any) {
                const errorMessage = handleSupabaseError(err);
                setError(errorMessage);
                setLoading('error');
                logError('useUsers.createUser', err, { userData: { ...userData, senha: '[REDACTED]' } });
                return { success: false, message: errorMessage };
            }
        },
        [fetchUsers]
    );

    /**
     * Atualiza usuário existente
     */
    const updateUser = useCallback(
        async (
            id: string,
            userData: {
                nome: string;
                email: string;
                cargo: string;
                departamento?: string;
                telefone?: string;
                senha?: string;
            }
        ): Promise<{ success: boolean; message: string }> => {
            setLoading('loading');
            setError(null);

            try {
                const updateData: any = {
                    nome: userData.nome,
                    email: userData.email,
                    cargo: userData.cargo,
                    departamento: userData.departamento || null,
                    telefone: userData.telefone || null,
                    updated_at: new Date().toISOString(),
                };

                const { error: dbError } = await supabase
                    .from('administradores')
                    .update(updateData)
                    .eq('id', id);

                if (dbError) throw dbError;

                // Atualizar senha se fornecida (nota: requer implementação server-side adequada)
                if (userData.senha && userData.senha.trim() !== '') {
                    // TODO: Implementar atualização de senha via API route
                }

                // Atualizar lista local
                setUsers((prevUsers) =>
                    prevUsers.map((user) => (user.id === id ? { ...user, ...updateData } : user))
                );

                setLoading('success');
                return { success: true, message: SUCCESS_MESSAGES.USER_UPDATED };
            } catch (err: any) {
                const errorMessage = handleSupabaseError(err);
                setError(errorMessage);
                setLoading('error');
                logError('useUsers.updateUser', err, { id, userData: { ...userData, senha: '[REDACTED]' } });
                return { success: false, message: errorMessage };
            }
        },
        []
    );

    /**
     * Deleta usuário
     */
    const deleteUser = useCallback(
        async (id: string): Promise<{ success: boolean; message: string }> => {
            setLoading('loading');
            setError(null);

            try {
                const { error: dbError } = await supabase
                    .from('administradores')
                    .delete()
                    .eq('id', id);

                if (dbError) throw dbError;

                // Atualizar lista local
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

                setLoading('success');
                return { success: true, message: SUCCESS_MESSAGES.USER_DELETED };
            } catch (err: any) {
                const errorMessage = handleSupabaseError(err);
                setError(errorMessage);
                setLoading('error');
                logError('useUsers.deleteUser', err, { id });
                return { success: false, message: errorMessage };
            }
        },
        []
    );

    /**
     * Busca usuário por nome ou email
     */
    const searchUser = useCallback(async (searchTerm: string): Promise<Usuario[]> => {
        if (!searchTerm.trim()) return [];
        if (searchTerm.trim().length < 3) return [];

        try {
            const { data, error: searchError } = await supabase
                .from('administradores')
                .select('*')
                .or(`nome.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`)
                .limit(10);

            if (searchError) throw searchError;

            return data || [];
        } catch (err: any) {
            logError('useUsers.searchUser', err, { searchTerm });
            return [];
        }
    }, []);

    /**
     * Busca usuário por ID
     */
    const getUserById = useCallback(async (id: string): Promise<Usuario | null> => {
        try {
            const { data, error: fetchError } = await supabase
                .from('administradores')
                .select('*')
                .eq('id', id)
                .single();

            if (fetchError) throw fetchError;

            return data;
        } catch (err: any) {
            logError('useUsers.getUserById', err, { id });
            return null;
        }
    }, []);

    return {
        users,
        loading,
        error,
        fetchUsers,
        createUser,
        updateUser,
        deleteUser,
        searchUser,
        getUserById,
    };
}
