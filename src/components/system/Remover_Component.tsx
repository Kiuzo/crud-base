import { useState } from 'react';
import { UserX, Trash2, AlertCircle } from 'lucide-react';

export function RemoverComponent() {
    const [users, setUsers] = useState([
        { id: 1, nome: 'Ana Silva', email: 'ana@email.com' },
        { id: 2, nome: 'Paulo Santos', email: 'paulo@email.com' },
        { id: 3, nome: 'Maria Oliveira', email: 'maria@email.com' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [userToRemove, setUserToRemove] = useState<number | null>(null);

    const handleRemoveClick = (userId: number) => {
        setUserToRemove(userId);
        setShowModal(true);
    };

    const confirmRemove = () => {
        if (userToRemove) {
            setUsers(users.filter(user => user.id !== userToRemove));
            setShowModal(false);
            setUserToRemove(null);
        }
    };

    const cancelRemove = () => {
        setShowModal(false);
        setUserToRemove(null);
    };

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

                {/* Card da Tabela */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">

                    {/* Info Banner */}
                    <div className="bg-red-50 border-b-2 border-red-100 p-4 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <p className="text-sm text-red-700">
                            <span className="font-semibold">Atenção:</span> A remoção de usuários é permanente e não pode ser desfeita.
                        </p>
                    </div>

                    {/* Tabela */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 border-b-2 border-slate-200">
                                    <th className="text-left py-4 px-6 text-sm font-bold text-slate-700">Nome</th>
                                    <th className="text-left py-4 px-6 text-sm font-bold text-slate-700">Email</th>
                                    <th className="text-center py-4 px-6 text-sm font-bold text-slate-700">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="py-4 px-6 text-slate-700 font-medium">{user.nome}</td>
                                        <td className="py-4 px-6 text-slate-600">{user.email}</td>
                                        <td className="py-4 px-6 text-center">
                                            <button
                                                onClick={() => handleRemoveClick(user.id)}
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

                    {/* Empty State */}
                    {users.length === 0 && (
                        <div className="text-center py-12">
                            <UserX className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-500 text-lg font-semibold">Nenhum usuário cadastrado</p>
                            <p className="text-slate-400 text-sm mt-2">Todos os usuários foram removidos</p>
                        </div>
                    )}
                </div>

                {/* Total de usuários */}
                <p className="text-center text-sm text-slate-500 mt-6">
                    Total de usuários: <span className="font-semibold">{users.length}</span>
                </p>
            </div>

            {/* Modal de Confirmação */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-red-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">Confirmar Remoção</h2>
                        </div>

                        <p className="text-slate-600 mb-6">
                            Tem certeza que deseja remover este usuário? Esta ação não pode ser desfeita.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={cancelRemove}
                                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 px-4 rounded-lg transition-all duration-200"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmRemove}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                Remover
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}