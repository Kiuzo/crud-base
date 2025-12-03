'use client'
import { useState } from 'react';
import { Search, User, Mail, Calendar, CheckCircle, XCircle, Briefcase, Building2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Usuario {
    id: string;
    nome: string;
    email?: string;
    cargo?: string;
    departamento?: string;
    telefone?: string;
    created_at: string;
    ativo: boolean;
}

export function PesquisarComponent() {
    const [searchTerm, setSearchTerm] = useState('');
    const [resultado, setResultado] = useState<Usuario | null>(null);
    const [searching, setSearching] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;

        setSearching(true);
        setNotFound(false);
        setResultado(null);
        setError('');

        try {
            // Buscar na tabela administradores
            const { data, error: searchError } = await supabase
                .from('administradores')
                .select(`
                    id,
                    nome,
                    cargo,
                    departamento,
                    telefone,
                    ativo,
                    created_at,
                    user_id
                `)
                .ilike('nome', `%${searchTerm}%`)
                .limit(1)
                .single();

            if (searchError && searchError.code !== 'PGRST116') {
                throw searchError;
            }

            if (data) {
                // Buscar email do usuário na auth
                const { data: { user }, error: authError } = await supabase.auth.admin.getUserById(data.user_id);
                
                setResultado({
                    ...data,
                    email: user?.email || 'Email não disponível'
                });
            } else {
                setNotFound(true);
            }

        } catch (error: any) {
            console.error('Erro ao buscar usuário:', error);
            setError('Erro ao buscar usuário. Tente novamente.');
        } finally {
            setSearching(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const formatarData = (data: string) => {
        return new Date(data).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12 px-4 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4 shadow-lg">
                        <Search className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">Pesquisar Usuário</h1>
                    <p className="text-slate-600">Encontre informações de usuários cadastrados no sistema</p>
                </div>

                {/* Card de Pesquisa */}
                <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-slate-200">

                    <div className="space-y-6">
                        {/* Campo de Pesquisa */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Search className="w-4 h-4" />
                                Nome do Usuário
                            </label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Digite o nome do usuário"
                                className="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-3.5 px-4 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300"
                            />
                        </div>

                        {/* Mensagem de Erro */}
                        {error && (
                            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center gap-3">
                                <XCircle className="w-5 h-5 text-red-600" />
                                <p className="text-red-700 font-semibold">{error}</p>
                            </div>
                        )}

                        {/* Botão Pesquisar */}
                        <button
                            onClick={handleSearch}
                            disabled={!searchTerm.trim() || searching}
                            type="button"
                            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <Search className={`w-5 h-5 ${searching ? 'animate-pulse' : ''}`} />
                            {searching ? 'Pesquisando...' : 'Pesquisar'}
                        </button>
                    </div>
                </div>

                {/* Resultado da Pesquisa */}
                {resultado && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200 animate-fade-in">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">Usuário Encontrado</h2>
                                <p className="text-sm text-slate-600">Informações do cadastro</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Nome */}
                            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                                <User className="w-5 h-5 text-blue-500 mt-0.5" />
                                <div>
                                    <p className="text-sm font-semibold text-slate-500">Nome</p>
                                    <p className="text-lg font-bold text-slate-800">{resultado.nome}</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                                <Mail className="w-5 h-5 text-blue-500 mt-0.5" />
                                <div>
                                    <p className="text-sm font-semibold text-slate-500">Email</p>
                                    <p className="text-lg font-bold text-slate-800">{resultado.email}</p>
                                </div>
                            </div>

                            {/* Cargo */}
                            {resultado.cargo && (
                                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                                    <Briefcase className="w-5 h-5 text-blue-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold text-slate-500">Cargo</p>
                                        <p className="text-lg font-bold text-slate-800">{resultado.cargo}</p>
                                    </div>
                                </div>
                            )}

                            {/* Departamento */}
                            {resultado.departamento && (
                                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                                    <Building2 className="w-5 h-5 text-blue-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold text-slate-500">Departamento</p>
                                        <p className="text-lg font-bold text-slate-800">{resultado.departamento}</p>
                                    </div>
                                </div>
                            )}

                            {/* Data de Cadastro */}
                            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                                <Calendar className="w-5 h-5 text-blue-500 mt-0.5" />
                                <div>
                                    <p className="text-sm font-semibold text-slate-500">Data de Cadastro</p>
                                    <p className="text-lg font-bold text-slate-800">{formatarData(resultado.created_at)}</p>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                                {resultado.ativo ? (
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                                ) : (
                                    <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                                )}
                                <div>
                                    <p className="text-sm font-semibold text-slate-500">Status</p>
                                    <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-bold ${resultado.ativo
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                        }`}>
                                        {resultado.ativo ? 'Ativo' : 'Inativo'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Não Encontrado */}
                {notFound && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200 animate-fade-in">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <XCircle className="w-8 h-8 text-red-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">Usuário Não Encontrado</h2>
                            <p className="text-slate-600">
                                Não foi possível encontrar nenhum usuário com o nome &ldquo;<span className="font-semibold">{searchTerm}</span>&rdquo;
                            </p>
                            <p className="text-sm text-slate-500 mt-4">
                                Verifique se o nome está correto ou tente pesquisar por outro termo
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}