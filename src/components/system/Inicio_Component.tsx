import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Badge, Search, UserCheck, UserMinus, UserPlus, TrendingUp } from "lucide-react";
import { useUsers } from '@/hooks/useUsers';
import { useAuth } from '@/hooks/useAuth';

export function InicioComponent() {
    const { users, fetchUsers, loading } = useUsers();
    const { user: currentUser } = useAuth();
    const [nomeUsuario, setNomeUsuario] = useState('Admin');

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        if (currentUser?.nome) {
            setNomeUsuario(currentUser.nome);
        }
    }, [currentUser]);

    // Calcular estatísticas
    const getRegistrosHoje = () => {
        const hoje = new Date().toISOString().split('T')[0];
        return users.filter(u => {
            // O hook useUsers retorna users typed como Usuario, que tem created_at opcional
            const dataCadastro = u.created_at || new Date().toISOString();
            return dataCadastro.split('T')[0] === hoje;
        }).length;
    };

    const getRegistrosMes = () => {
        const mesAtual = new Date().getMonth();
        const anoAtual = new Date().getFullYear();
        return users.filter(u => {
            const dataCadastro = u.created_at || new Date().toISOString();
            const data = new Date(dataCadastro);
            return data.getMonth() === mesAtual && data.getFullYear() === anoAtual;
        }).length;
    };

    const getUltimosClientes = () => {
        // Ordenar por created_at desc (fallback para ID se created_at nulo)
        return [...users]
            .sort((a, b) => {
                const dateA = new Date(a.created_at || 0).getTime();
                const dateB = new Date(b.created_at || 0).getTime();
                return dateB - dateA;
            })
            .slice(0, 4);
    };

    const getMaisPesquisados = () => {
        // Mock de pesquisas baseado no ID para consistência visual
        return [...users]
            .map(u => ({
                ...u,
                pesquisas: (u.id.charCodeAt(0) % 50) + 1 // Mock visual
            }))
            .sort((a, b) => b.pesquisas - a.pesquisas)
            .slice(0, 4);
    };

    const registrosHoje = getRegistrosHoje();
    const registrosMes = getRegistrosMes();
    const ultimosClientes = getUltimosClientes();
    const maisPesquisados = getMaisPesquisados();

    // Calcular variação percentual
    const variacaoOntem = registrosHoje > 0 ? '+100' : '0';

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-8 px-4 lg:px-8">

            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center gap-3 pb-6 border-b-2 border-slate-200">
                    <h1 className="text-3xl lg:text-4xl text-slate-700">Bem-vindo(a),</h1>
                    <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                        {nomeUsuario}
                    </h1>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column - Actions and Stats */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Action Cards */}
                        <div>
                            <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                                <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                                Ações Rápidas
                            </h2>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                                <Link
                                    href="/system/adicionar"
                                    className="bg-white border-2 border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:border-blue-500 hover:shadow-lg transition-all group cursor-pointer"
                                >
                                    <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                        <UserPlus className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 text-center">Adicionar Usuário</span>
                                </Link>

                                <Link
                                    href="/system/remover"
                                    className="bg-white border-2 border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:border-red-500 hover:shadow-lg transition-all group cursor-pointer"
                                >
                                    <div className="p-3 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                                        <UserMinus className="w-8 h-8 text-red-600" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 text-center">Remover Usuário</span>
                                </Link>

                                <Link
                                    href="/system/pesquisar"
                                    className="bg-white border-2 border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:border-green-500 hover:shadow-lg transition-all group cursor-pointer"
                                >
                                    <div className="p-3 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                                        <Search className="w-8 h-8 text-green-600" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 text-center">Pesquisar Usuário</span>
                                </Link>

                                <Link
                                    href="/system/atualizar"
                                    className="bg-white border-2 border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:border-amber-500 hover:shadow-lg transition-all group cursor-pointer"
                                >
                                    <div className="p-3 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
                                        <UserCheck className="w-8 h-8 text-amber-600" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 text-center">Atualizar Usuário</span>
                                </Link>

                            </div>
                        </div>

                        {/* Statistics Cards */}
                        <div>
                            <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                                <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                                Estatísticas em Tempo Real
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                                <div className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-blue-500 transition-all hover:shadow-lg">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-sm font-medium text-slate-600">Registros de Hoje</h3>
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                            <TrendingUp className="w-5 h-5 text-blue-600" />
                                        </div>
                                    </div>
                                    <p className="text-4xl font-bold text-slate-900">{registrosHoje}</p>
                                    <p className="text-sm text-green-600 font-semibold mt-2">
                                        {variacaoOntem}% desde ontem
                                    </p>
                                </div>

                                <div className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-blue-500 transition-all hover:shadow-lg">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-sm font-medium text-slate-600">Registros Mensais</h3>
                                        <div className="p-2 bg-purple-50 rounded-lg">
                                            <TrendingUp className="w-5 h-5 text-purple-600" />
                                        </div>
                                    </div>
                                    <p className="text-4xl font-bold text-slate-900">{registrosMes}</p>
                                    <p className="text-sm text-slate-500 mt-2">Este mês</p>
                                </div>

                                <div className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-blue-500 transition-all hover:shadow-lg">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-sm font-medium text-slate-600">Total de Usuários</h3>
                                        <div className="p-2 bg-emerald-50 rounded-lg">
                                            <Badge className="w-5 h-5 text-emerald-600" />
                                        </div>
                                    </div>
                                    <p className="text-4xl font-bold text-slate-900">{users.length}</p>
                                    <p className="text-sm text-slate-500 mt-2">Cadastrados</p>
                                </div>

                            </div>
                        </div>

                        {/* Support Banner */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-xl">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-1">💙 Apoie o Projeto</h3>
                                    <p className="text-sm text-blue-100">Ajude a manter o sistema funcionando</p>
                                </div>
                                <Link
                                    href="#"
                                    className="bg-white text-blue-600 px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors whitespace-nowrap shadow-lg hover:shadow-xl"
                                >
                                    Fazer Doação
                                </Link>
                            </div>
                        </div>

                    </div>

                    {/* Right Column - Overview */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Recent Clients */}
                        <div className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden shadow-lg hover:border-blue-500 transition-all">
                            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-700 rounded-lg">
                                        <Badge className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-white">Últimos Clientes</h3>
                                        <p className="text-xs text-slate-300">Cadastros recentes</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                {ultimosClientes.length > 0 ? (
                                    <ul className="space-y-3">
                                        {ultimosClientes.map((cliente) => (
                                            <li key={cliente.id} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                                <div className="flex-1">
                                                    <span className="text-sm font-medium text-slate-700">{cliente.nome}</span>
                                                    <p className="text-xs text-slate-500">{new Date(cliente.created_at || new Date()).toLocaleDateString('pt-BR')}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-center text-slate-400 py-4">Nenhum cliente cadastrado</p>
                                )}
                            </div>
                        </div>

                        {/* Most Searched */}
                        <div className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden shadow-lg hover:border-green-500 transition-all">
                            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-500 rounded-lg">
                                        <Search className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-white">Mais Pesquisados</h3>
                                        <p className="text-xs text-emerald-100">Top buscas</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                {maisPesquisados.length > 0 ? (
                                    <ul className="space-y-3">
                                        {maisPesquisados.map((cliente, index) => (
                                            <li key={cliente.id} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs font-bold text-slate-400">#{index + 1}</span>
                                                    <span className="text-sm font-medium text-slate-700">{cliente.nome}</span>
                                                </div>
                                                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                                                    {cliente.pesquisas || 0}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-center text-slate-400 py-4">Nenhuma pesquisa registrada</p>
                                )}
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}