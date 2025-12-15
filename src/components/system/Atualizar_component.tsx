'use client'
import { useState, useEffect } from 'react';
import { UserCog, Edit, AlertCircle, User, Mail, Lock, Check, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Usuario {
    id: string;
    user_id: string;
    nome: string;
    email: string;
    cargo: string;
    departamento?: string;
    telefone?: string;
    ativo: boolean;
}

export function AtualizarUsuario() {
    const [users, setUsers] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userToEdit, setUserToEdit] = useState<Usuario | null>(null);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        cargo: '',
        departamento: '',
        telefone: '',
        senha: ''
    });
    const [atualizando, setAtualizando] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');

    // Buscar usuários ao carregar
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('administradores')
                .select('*')
                .order('nome', { ascending: true });

            if (error) throw error;
            setUsers(data || []);
        } catch (error: any) {
            console.error('Erro ao buscar usuários:', error);
            setErro('Erro ao carregar usuários');
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (user: Usuario) => {
        setUserToEdit(user);
        setFormData({
            nome: user.nome,
            email: user.email,
            cargo: user.cargo || '',
            departamento: user.departamento || '',
            telefone: user.telefone || '',
            senha: ''
        });
        setShowModal(true);
        setMensagem('');
        setErro('');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const confirmUpdate = async () => {
        if (!userToEdit) return;

        setAtualizando(true);
        setMensagem('');
        setErro('');

        try {
            // 1. Atualizar dados na tabela administradores
            const updateData: any = {
                nome: formData.nome,
                email: formData.email,
                cargo: formData.cargo,
                departamento: formData.departamento,
                telefone: formData.telefone,
                updated_at: new Date().toISOString()
            };

            const { error: dbError } = await supabase
                .from('administradores')
                .update(updateData)
                .eq('id', userToEdit.id);

            if (dbError) throw dbError;

            // 2. Atualizar senha no Auth (opcional, se foi fornecida)
            if (formData.senha && formData.senha.trim() !== '') {
                // Nota: Atualizar senha de outro usuário requer privilégios especiais
                // Normalmente isso seria feito via API do servidor com service role
                // Por enquanto, vamos apenas atualizar os dados da tabela
            }

            // Atualizar lista local
            setUsers(users.map(user =>
                user.id === userToEdit.id
                    ? { ...user, ...updateData }
                    : user
            ));

            setMensagem('Usuário atualizado com sucesso! ✅');

            // Fechar modal após 1.5s
            setTimeout(() => {
                cancelUpdate();
            }, 1500);

        } catch (error: any) {
            console.error('Erro ao atualizar usuário:', error);
            setErro(error.message || 'Erro ao atualizar usuário');
        } finally {
            setAtualizando(false);
        }
    };

    const cancelUpdate = () => {
        setShowModal(false);
        setUserToEdit(null);
        setFormData({ nome: '', email: '', cargo: '', departamento: '', telefone: '', senha: '' });
        setMensagem('');
        setErro('');
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

                {/* Mensagens de feedback */}
                {mensagem && !showModal && (
                    <div className="mb-6 max-w-2xl mx-auto p-4 bg-green-50 border-2 border-green-200 rounded-lg flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-green-700 font-medium">{mensagem}</span>
                    </div>
                )}

                {erro && !showModal && (
                    <div className="mb-6 max-w-2xl mx-auto p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                        <span className="text-red-700 font-medium">{erro}</span>
                    </div>
                )}

                {/* Card da Tabela */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">

                    {/* Info Banner */}
                    <div className="bg-blue-50 border-b-2 border-blue-100 p-4 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600" />
                        <p className="text-sm text-blue-700">
                            <span className="font-semibold">Informação:</span> Clique em editar para atualizar os dados do usuário.
                        </p>
                    </div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block w-8 h-8 border-4 border-slate-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                            <p className="text-slate-500">Carregando usuários...</p>
                        </div>
                    ) : (
                        <>
                            {/* Tabela */}
                            {users.length > 0 && (
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
                            )}

                            {/* Empty State */}
                            {users.length === 0 && (
                                <div className="text-center py-12">
                                    <UserCog className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                    <p className="text-slate-500 text-lg font-semibold">Nenhum usuário cadastrado</p>
                                    <p className="text-slate-400 text-sm mt-2">Não há usuários para atualizar</p>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Total de usuários */}
                {!loading && (
                    <p className="text-center text-sm text-slate-500 mt-6">
                        Total de usuários: <span className="font-semibold">{users.length}</span>
                    </p>
                )}
            </div>

            {/* Modal de Edição */}
            {showModal && userToEdit && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <Edit className="w-6 h-6 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">Editar Usuário</h2>
                        </div>

                        {/* Mensagens dentro do modal */}
                        {mensagem && (
                            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <span className="text-green-700 text-sm font-medium">{mensagem}</span>
                            </div>
                        )}

                        {erro && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-red-600" />
                                <span className="text-red-700 text-sm font-medium">{erro}</span>
                            </div>
                        )}

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
                                    required
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
                                    required
                                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300"
                                />
                            </div>

                            {/* Campo Cargo */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">
                                    Cargo
                                </label>
                                <input
                                    type="text"
                                    name="cargo"
                                    value={formData.cargo}
                                    onChange={handleChange}
                                    placeholder="Ex: Administrador, Gerente..."
                                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300"
                                />
                            </div>

                            {/* Campo Departamento */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">
                                    Departamento
                                </label>
                                <input
                                    type="text"
                                    name="departamento"
                                    value={formData.departamento}
                                    onChange={handleChange}
                                    placeholder="Ex: TI, RH, Vendas..."
                                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300"
                                />
                            </div>

                            {/* Campo Telefone */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">
                                    Telefone
                                </label>
                                <input
                                    type="tel"
                                    name="telefone"
                                    value={formData.telefone}
                                    onChange={handleChange}
                                    placeholder="(00) 00000-0000"
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
                                    minLength={8}
                                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300"
                                />
                                {formData.senha && formData.senha.length < 8 && (
                                    <p className="text-xs text-red-600">A senha deve ter no mínimo 8 caracteres</p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={cancelUpdate}
                                disabled={atualizando}
                                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmUpdate}
                                disabled={atualizando || (formData.senha !== '' && formData.senha.length < 8)}
                                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {atualizando ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Salvando...
                                    </>
                                ) : (
                                    <>
                                        <Check className="w-5 h-5" />
                                        Salvar Alterações
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
} 