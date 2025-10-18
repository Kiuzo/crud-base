import { useState } from 'react';
import { UserCog, Edit, AlertCircle, User, Mail, Lock, Check } from 'lucide-react';

interface Usuario {
    id: number;
    nome: string;
    email: string;
}

export function AtualizarComponent() {
    const [users, setUsers] = useState<Usuario[]>([
        { id: 1, nome: 'Ana Silva', email: 'ana@email.com' },
        { id: 2, nome: 'Paulo Santos', email: 'paulo@email.com' },
        { id: 3, nome: 'Maria Oliveira', email: 'maria@email.com' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [userToEdit, setUserToEdit] = useState<Usuario | null>(null);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: ''
    });

    const handleEditClick = (user: Usuario) => {
        setUserToEdit(user);
        setFormData({
            nome: user.nome,
            email: user.email,
            senha: ''
        });
        setShowModal(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const confirmUpdate = () => {
        if (userToEdit) {
            setUsers(users.map(user => 
                user.id === userToEdit.id 
                    ? { ...user, nome: formData.nome, email: formData.email }
                    : user
            ));
            cancelUpdate();
        }
    };

    const cancelUpdate = () => {
        setShowModal(false);
        setUserToEdit(null);
        setFormData({ nome: '', email: '', senha: '' });
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12 px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4 shadow-lg">
                        <UserCog className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">Atualizar Usuário</h1>
                    <p className="text-slate-600">Edite as informações dos usuários cadastrados</p>
                </div>

                {/* Card da Tabela */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                    
                    {/* Info Banner */}
                    <div className="bg-blue-50 border-b-2 border-blue-100 p-4 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600" />
                        <p className="text-sm text-blue-700">
                            <span className="font-semibold">Informação:</span> Clique em editar para atualizar os dados do usuário.
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
                                                onClick={() => handleEditClick(user)}
                                                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                                            >
                                                <Edit className="w-4 h-4" />
                                                Editar
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
                            <UserCog className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-500 text-lg font-semibold">Nenhum usuário cadastrado</p>
                            <p className="text-slate-400 text-sm mt-2">Não há usuários para atualizar</p>
                        </div>
                    )}
                </div>

                {/* Total de usuários */}
                <p className="text-center text-sm text-slate-500 mt-6">
                    Total de usuários: <span className="font-semibold">{users.length}</span>
                </p>
            </div>

            {/* Modal de Edição */}
            {showModal && userToEdit && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 animate-fade-in">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <Edit className="w-6 h-6 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">Editar Usuário</h2>
                        </div>
                        
                        <div className="space-y-5 mb-6">
                            {/* Campo Nome */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Nome Completo
                                </label>
                                <input
                                    type="text"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    placeholder="Digite o nome completo"
                                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300"
                                />
                            </div>

                            {/* Campo Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="seu@email.com"
                                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300"
                                />
                            </div>

                            {/* Campo Senha */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Lock className="w-4 h-4" />
                                    Nova Senha <span className="text-slate-400 text-xs font-normal">(opcional)</span>
                                </label>
                                <input
                                    type="password"
                                    name="senha"
                                    value={formData.senha}
                                    onChange={handleChange}
                                    placeholder="Deixe em branco para manter a atual"
                                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={cancelUpdate}
                                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 px-4 rounded-lg transition-all duration-200"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmUpdate}
                                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                <Check className="w-5 h-5" />
                                Salvar Alterações
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}