'use client'
import { useState } from 'react';
import { Search, User, Mail, Briefcase, Building2, Phone, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Usuario {
    id: string;
    nome: string;
    email: string;
    cargo?: string;
    departamento?: string;
    telefone?: string;
    ativo: boolean;
    created_at: string;
}

export function PesquisarUsuario() {
    const [busca, setBusca] = useState('');
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(false);
    const [naoEncontrado, setNaoEncontrado] = useState(false);

    const handleBuscar = async () => {
        if (!busca.trim()) return;

        setLoading(true);
        setUsuario(null);
        setNaoEncontrado(false);

        try {
            const { data, error } = await supabase
                .from('administradores')
                .select('*')
                .ilike('nome', `%${busca}%`)
                .limit(1);

            if (error) throw error;

            if (data && data.length > 0) {
                setUsuario(data[0]);
            } else {
                setNaoEncontrado(true);
            }

        } catch (error) {
            console.error('Erro ao buscar:', error);
            setNaoEncontrado(true);
        } finally {
            setLoading(false);
        }
    };

    const formatarData = (data: string) => {
        return new Date(data).toLocaleDateString('pt-BR');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full mb-3">
                        <Search className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold">Pesquisar Usuário</h1>
                    <p className="text-gray-600">Digite o nome para buscar</p>
                </div>

                {/* Card de Busca */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleBuscar()}
                            placeholder="Digite o nome do usuário"
                            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <button
                            onClick={handleBuscar}
                            disabled={loading || !busca.trim()}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center gap-2"
                        >
                            <Search className="w-4 h-4" />
                            {loading ? 'Buscando...' : 'Buscar'}
                        </button>
                    </div>
                </div>

                {/* Resultado */}
                {usuario && (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Usuário Encontrado</h2>
                                <p className="text-sm text-gray-600">Informações do cadastro</p>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            
                            {/* Nome */}
                            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                <User className="w-5 h-5 text-blue-500 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-600">Nome</p>
                                    <p className="font-bold">{usuario.nome}</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                <Mail className="w-5 h-5 text-blue-500 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-600">Email</p>
                                    <p className="font-bold">{usuario.email}</p>
                                </div>
                            </div>

                            {/* Cargo */}
                            {usuario.cargo && (
                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                    <Briefcase className="w-5 h-5 text-blue-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-600">Cargo</p>
                                        <p className="font-bold">{usuario.cargo}</p>
                                    </div>
                                </div>
                            )}

                            {/* Departamento */}
                            {usuario.departamento && (
                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                    <Building2 className="w-5 h-5 text-blue-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-600">Departamento</p>
                                        <p className="font-bold">{usuario.departamento}</p>
                                    </div>
                                </div>
                            )}

                            {/* Telefone */}
                            {usuario.telefone && (
                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                    <Phone className="w-5 h-5 text-blue-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-600">Telefone</p>
                                        <p className="font-bold">{usuario.telefone}</p>
                                    </div>
                                </div>
                            )}

                            {/* Data de Cadastro */}
                            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                <Calendar className="w-5 h-5 text-blue-500 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-600">Cadastrado em</p>
                                    <p className="font-bold">{formatarData(usuario.created_at)}</p>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                {usuario.ativo ? (
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                                ) : (
                                    <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                                )}
                                <div>
                                    <p className="text-sm text-gray-600">Status</p>
                                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                                        usuario.ativo 
                                            ? 'bg-green-100 text-green-700' 
                                            : 'bg-red-100 text-red-700'
                                    }`}>
                                        {usuario.ativo ? 'Ativo' : 'Inativo'}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

                {/* Não Encontrado */}
                {naoEncontrado && (
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <XCircle className="w-8 h-8 text-red-600" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">Usuário Não Encontrado</h2>
                        <p className="text-gray-600">
                            Nenhum usuário encontrado com o nome "<span className="font-semibold">{busca}</span>"
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Tente pesquisar com outro termo
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
}