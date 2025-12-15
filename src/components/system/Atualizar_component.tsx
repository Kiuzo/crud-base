'use client'
import { useState, useEffect } from 'react';
import { UserCog, Edit, AlertCircle, User, Mail, Lock, Check, CheckCircle, Briefcase, Building2, Phone } from 'lucide-react';
import { useUsers } from '@/hooks/useUsers';
import { useToast } from '@/hooks/useToast';
import { validateUserForm, sanitizeInput } from '@/utils/validators';
import { maskPhone } from '@/utils/formatters';
import { Usuario } from '@/types';

export function AtualizarUsuario() {
    const { users, loading: hookLoading, fetchUsers, updateUser } = useUsers();
    const toast = useToast();

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
    }, [fetchUsers]);

    const handleEditClick = (user: Usuario) => {
        setUserToEdit(user);
        setFormData({
            nome: user.nome,
            email: user.email,
            cargo: user.cargo || '',
            departamento: user.departamento || '',
            telefone: user.telefone || '',
            senha: '' // Senha sempre vazia ao editar
        });
        setShowModal(true);
        setMensagem('');
        setErro('');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'telefone') {
            setFormData(prev => ({ ...prev, [name]: maskPhone(value) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const confirmUpdate = async () => {
        if (!userToEdit) return;

        setAtualizando(true);
        setMensagem('');
        setErro('');

        // 1. Sanitização
        const sanitizedData = {
            ...formData,
            nome: sanitizeInput(formData.nome),
            cargo: sanitizeInput(formData.cargo),
            departamento: sanitizeInput(formData.departamento),
            // Email e senha não sanitizamos assim, pois validators cuidam do formato e senha pode ter chars especiais
        };

        // 2. Validação
        const validation = validateUserForm({
            nome: sanitizedData.nome,
            email: sanitizedData.email,
            senha: sanitizedData.senha || undefined, // Só valida se tiver senha
            telefone: sanitizedData.telefone || undefined
        });

        if (!validation.valid) {
            // Pega o primeiro erro encontrado
            const firstError = Object.values(validation.errors)[0];
            setErro(firstError);
            toast.error(firstError);
            setAtualizando(false);
            return;
        }

        try {
            const result = await updateUser(userToEdit.id, {
                nome: sanitizedData.nome,
                email: sanitizedData.email,
                cargo: sanitizedData.cargo,
                departamento: sanitizedData.departamento,
                telefone: sanitizedData.telefone,
                senha: sanitizedData.senha
            });

            if (result.success) {
                setMensagem(result.message);
                toast.success('Usuário atualizado com sucesso!');

                // Fechar modal após 1.5s
                setTimeout(() => {
                    cancelUpdate();
                }, 1500);
            } else {
                setErro(result.message);
                toast.error(result.message);
            }

        } catch (error: any) {
            // Erros não esperados
            setErro('Ocorreu um erro inesperado.');
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

    const isLoading = hookLoading === 'loading';

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

                {/* Feedback global (opcional, já que temos toast e modal feedback) */}

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
                    {isLoading && users.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="inline-block w-8 h-8 border-4 border-slate-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>
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
                            ) : (
                                /* Empty State */
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
                {!isLoading && (
                    <p className="text-center text-sm text-slate-500 mt-6">
                        Total de usuários: <span className="font-semibold">{users.length}</span>
                    </p>
                )}
            </div>

            {/* Modal de Edição */}
            {showModal && userToEdit && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all duration-300">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <Edit className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">Editar Usuário</h2>
                                <p className="text-slate-500 text-sm">Atualize os dados abaixo</p>
                            </div>
                        </div>

                        {/* Mensagens dentro do modal */}
                        {mensagem && (
                            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                <span className="text-green-700 text-sm font-medium">{mensagem}</span>
                            </div>
                        )}

                        {erro && (
                            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                <span className="text-red-700 text-sm font-medium">{erro}</span>
                            </div>
                        )}

                        <div className="space-y-5 mb-8">
                            {/* Campo Nome */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <User className="w-4 h-4 text-slate-400" />
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
                                    <Mail className="w-4 h-4 text-slate-400" />
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

                            <div className="grid grid-cols-2 gap-4">
                                {/* Campo Cargo */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                        <Briefcase className="w-4 h-4 text-slate-400" />
                                        Cargo
                                    </label>
                                    <input
                                        type="text"
                                        name="cargo"
                                        value={formData.cargo}
                                        onChange={handleChange}
                                        placeholder="Ex: Gerente"
                                        className="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300"
                                    />
                                </div>

                                {/* Campo Departamento */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                        <Building2 className="w-4 h-4 text-slate-400" />
                                        Depto.
                                    </label>
                                    <input
                                        type="text"
                                        name="departamento"
                                        value={formData.departamento}
                                        onChange={handleChange}
                                        placeholder="Ex: TI"
                                        className="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300"
                                    />
                                </div>
                            </div>

                            {/* Campo Telefone */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-slate-400" />
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
                            <div className="space-y-2 pt-2 border-t border-slate-100">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-slate-400" />
                                    Alterar Senha <span className="text-slate-400 text-xs font-normal">(opcional)</span>
                                </label>
                                <input
                                    type="password"
                                    name="senha"
                                    value={formData.senha}
                                    onChange={handleChange}
                                    placeholder="Nova senha (min. 8 caracteres)"
                                    minLength={8}
                                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300"
                                />
                                {formData.senha && formData.senha.length < 8 && (
                                    <p className="text-xs text-red-600 animate-pulse">A senha deve ter no mínimo 8 caracteres</p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={cancelUpdate}
                                disabled={atualizando}
                                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-sm"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmUpdate}
                                disabled={atualizando || (formData.senha !== '' && formData.senha.length < 8)}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {atualizando ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Salvando...
                                    </>
                                ) : (
                                    <>
                                        <Check className="w-5 h-5" />
                                        Salvar
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