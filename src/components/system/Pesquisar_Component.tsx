import { useState } from 'react';
import { Search, User, Mail, Briefcase, Building2, Phone, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { useUsers } from '@/hooks/useUsers';
import { Usuario } from '@/types';

export function PesquisarUsuario() {
    const [busca, setBusca] = useState('');
    const [usuariosEncontrados, setUsuariosEncontrados] = useState<Usuario[]>([]);
    const [buscou, setBuscou] = useState(false);
    const { searchUser, loading } = useUsers(); // Usando o hook

    const handleBuscar = async () => {
        if (!busca.trim()) return;

        if (busca.trim().length < 3) {
            // Feedback simples (pode ser melhorado com Toast)
            alert('Digite pelo menos 3 caracteres para pesquisar.');
            return;
        }

        setBuscou(true);
        const resultados = await searchUser(busca);
        setUsuariosEncontrados(resultados);
    };

    const formatarData = (data: string) => {
        // Fallback para data atual se inválida, ou tratar como string
        if (!data) return '-';
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
                    <p className="text-gray-600">Busque por nome ou email (mínimo 3 caracteres)</p>
                </div>

                {/* Card de Busca */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleBuscar()}
                            placeholder="Digite o nome ou email..."
                            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <button
                            onClick={handleBuscar}
                            disabled={loading === 'loading' || busca.trim().length < 3}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center gap-2"
                        >
                            <Search className="w-4 h-4" />
                            {loading === 'loading' ? 'Buscando...' : 'Buscar'}
                        </button>
                    </div>
                    {busca.length > 0 && busca.length < 3 && (
                        <p className="text-xs text-amber-600 mt-2 ml-1">
                            ⚠️ Digite pelo menos 3 letras
                        </p>
                    )}
                </div>

                {/* Lista de Resultados */}
                {buscou && usuariosEncontrados.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-700 px-1">
                            {usuariosEncontrados.length} usuário(s) encontrado(s)
                        </h2>
                        {usuariosEncontrados.map((usuario) => (
                            <div key={usuario.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 transition-all hover:shadow-lg">
                                <div className="flex items-center gap-3 mb-4 pb-2 border-b border-gray-100">
                                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                                        <User className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800">{usuario.nome}</h3>
                                        <p className="text-sm text-gray-500">{usuario.email}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    {usuario.cargo && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Briefcase className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-600">Cargo:</span>
                                            <span className="font-medium">{usuario.cargo}</span>
                                        </div>
                                    )}

                                    {usuario.departamento && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Building2 className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-600">Dep:</span>
                                            <span className="font-medium">{usuario.departamento}</span>
                                        </div>
                                    )}

                                    {usuario.telefone && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Phone className="w-4 h-4 text-gray-400" />
                                            <span className="font-medium">{usuario.telefone}</span>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-600">Cadastro:</span>
                                        <span className="font-medium">{formatarData((usuario as any).created_at)}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm md:col-span-2 mt-2">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${(usuario as any).ativo !== false // Assumindo true se undefined
                                            ? 'bg-green-50 text-green-700 border-green-200'
                                            : 'bg-red-50 text-red-700 border-red-200'
                                            }`}>
                                            {(usuario as any).ativo !== false ? (
                                                <CheckCircle className="w-3 h-3" />
                                            ) : (
                                                <XCircle className="w-3 h-3" />
                                            )}
                                            {(usuario as any).ativo !== false ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Não Encontrado */}
                {buscou && usuariosEncontrados.length === 0 && (
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center animate-fadeIn">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-bold mb-2 text-gray-700">Nenhum resultado</h2>
                        <p className="text-gray-500">
                            Não encontramos ninguém com o termo "<span className="font-semibold text-gray-700">{busca}</span>"
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                            Tente buscar por nome completo ou email
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}