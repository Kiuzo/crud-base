'use client'
import { useState, useEffect } from 'react';
import { UserX, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { useUsers } from '@/hooks/useUsers';
import { useToast } from '@/hooks/useToast';
import { Usuario } from '@/types';

export function RemoverUsuario() {
    const { users, loading: hookLoading, fetchUsers, deleteUser } = useUsers();
    const toast = useToast();

    const [showModal, setShowModal] = useState(false);
    const [userToRemove, setUserToRemove] = useState<Usuario | null>(null);
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');
    const [removendo, setRemovendo] = useState(false);

    // Buscar usuários ao carregar
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleRemoveClick = (user: Usuario) => {
        setUserToRemove(user);
        setShowModal(true);
        setMensagem('');
        setErro('');
    };

    const confirmRemove = async () => {
        if (!userToRemove) return;

        setRemovendo(true);
        setMensagem('');
        setErro('');

        try {
            const result = await deleteUser(userToRemove.id);

            if (result.success) {
                setMensagem(result.message);
                toast.success('Usuário removido com sucesso!');

                // Fechar modal após 1.5s
                setTimeout(() => {
                    cancelRemove();
                }, 1500);
            } else {
                setErro(result.message);
                toast.error(result.message);
            }

        } catch (error: any) {
            setErro('Erro inesperado ao remover.');
            toast.error('Erro inesperado ao remover.');
        } finally {
            setRemovendo(false);
        }
    };

    const cancelRemove = () => {
        setShowModal(false);
        setUserToRemove(null);
    };

    const isLoading = hookLoading === 'loading';

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-slate-100 py-12 px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-full mb-4 shadow-lg">
                        <UserX className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">Remover Usuário</h1>
                    <p className="text-slate-600">Gerencie e remova usuários do sistema</p>
                </div>

                {/* Feedback global opcional */}

                {/* Card da Tabela */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">

                    {/* Info Banner */}
                    <div className="bg-red-50 border-b-2 border-red-100 p-4 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <p className="text-sm text-red-700">
                            <span className="font-semibold">Atenção:</span> A remoção de usuários é permanente e não pode ser desfeita.
                        </p>
                    </div>

                    {/* Loading State */}
                    {isLoading && users.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="inline-block w-8 h-8 border-4 border-slate-300 border-t-red-500 rounded-full animate-spin mb-4"></div>
                            <p className="text-slate-500">Carregando usuários...</p>
                        </div>
                    ) : (
                        <>
                            {/* Tabela */}
                            {users.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-slate-50 border-b-2 border-slate-200">
                                                <th className="text-left py-4 px-6 text-sm font-bold text-slate-700">Nome</th>
                                                <th className="text-left py-4 px-6 text-sm font-bold text-slate-700">Email</th>
                                                <th className="text-left py-4 px-6 text-sm font-bold text-slate-700">Cargo</th>
                                                <th className="text-center py-4 px-6 text-sm font-bold text-slate-700">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user) => (
                                                <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                                    <td className="py-4 px-6 text-slate-700 font-medium">{user.nome}</td>
                                                    <td className="py-4 px-6 text-slate-600">{user.email}</td>
                                                    <td className="py-4 px-6 text-slate-600">{user.cargo || 'Usuário'}</td>
                                                    <td className="py-4 px-6 text-center">
                                                        <button
                                                            onClick={() => handleRemoveClick(user)}
                                                            className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg px-4 py-2 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            Remover
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                /* Empty State */
                                <div className="text-center py-12">
                                    <UserX className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                    <p className="text-slate-500 text-lg font-semibold">Nenhum usuário cadastrado</p>
                                    <p className="text-slate-400 text-sm mt-2">Não há usuários para remover</p>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Total de usuários */}
                {!isLoading && (
                    <p className="text-center text-sm text-slate-500 mt-6">
                        Total de usuários: <span className="font-semibold">{users.length}</span>
                    </p>
                )}
            </div>

            {/* Modal de Confirmação */}
            {showModal && userToRemove && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all duration-300">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 mb-4 border-b border-red-50 pb-4">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">Confirmar Remoção</h2>
                                <p className="text-sm text-slate-500">Ação irreversível</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-slate-600 mb-4">
                                Tem certeza que deseja remover este usuário?
                            </p>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <p className="text-xs uppercase tracking-wide text-slate-400 font-bold mb-1">Usuário Selecionado</p>
                                <p className="font-bold text-slate-800 text-lg">{userToRemove.nome}</p>
                                <p className="text-slate-500">{userToRemove.email}</p>
                            </div>
                        </div>

                        {/* Mensagens internas */}
                        {erro && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-red-600" />
                                <span className="text-red-700 text-sm font-medium">{erro}</span>
                            </div>
                        )}

                        {mensagem && (
                            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <span className="text-green-700 text-sm font-medium">{mensagem}</span>
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={cancelRemove}
                                disabled={removendo}
                                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmRemove}
                                disabled={removendo}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {removendo ? 'Removendo...' : 'Sim, Remover'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}