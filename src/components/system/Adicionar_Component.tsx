'use client'
import { useState } from 'react';
import { UserPlus, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export function AdicionarUsuario() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMensagem('');
        setErro('');

        try {
            // 1. Criar usuário no Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: email,
                password: senha,
            });

            if (authError) throw authError;

            // 2. Inserir na tabela administradores
            const { error: dbError } = await supabase
                .from('administradores')
                .insert([{
                    user_id: authData.user?.id,
                    nome: nome,
                    email: email,
                    cargo: 'Usuário',
                    ativo: true
                }]);

            if (dbError) throw dbError;

            // Sucesso!
            setMensagem('Usuário criado com sucesso! ✅');
            setNome('');
            setEmail('');
            setSenha('');

        } catch (error: any) {
            console.error('Erro:', error);
            setErro(error.message || 'Erro ao criar usuário');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-md mx-auto">
                
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full mb-3">
                            <UserPlus className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold">Adicionar Usuário</h1>
                    </div>

                    {/* Mensagens */}
                    {mensagem && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-green-700">{mensagem}</span>
                        </div>
                    )}

                    {erro && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                            <span className="text-red-700">{erro}</span>
                        </div>
                    )}

                    {/* Formulário */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        <div>
                            <label className="block text-sm font-medium mb-1">Nome</label>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Nome completo"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="email@exemplo.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Senha</label>
                            <input
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                                minLength={8}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Mínimo 8 caracteres"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                        >
                            {loading ? 'Criando...' : 'Criar Usuário'}
                        </button>

                    </form>
                </div>

            </div>
        </div>
    );
}