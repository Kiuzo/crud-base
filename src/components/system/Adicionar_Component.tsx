import { useState } from 'react';
import { User, Mail, Lock, UserPlus, CheckCircle } from 'lucide-react';

export function AdicionarComponent() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        console.log('Dados do formulário:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12 px-4 lg:px-8">
            <div className="max-w-2xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4 shadow-lg">
                        <UserPlus className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">Adicionar Usuário</h1>
                    <p className="text-slate-600">Preencha os dados para criar uma nova conta</p>
                </div>

                {/* Card do Formulário */}
                <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-slate-200">
                    
                    {/* Mensagem de Sucesso */}
                    {submitted && (
                        <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <p className="text-green-700 font-semibold">Usuário criado com sucesso!</p>
                        </div>
                    )}

                    <div className="space-y-6">
                        
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
                                required
                                placeholder="Digite seu nome completo"
                                className="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-3.5 px-4 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300"
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
                                required
                                placeholder="seu@email.com"
                                className="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-3.5 px-4 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300"
                            />
                        </div>

                        {/* Campo Senha */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Lock className="w-4 h-4" />
                                Senha
                            </label>
                            <input
                                type="password"
                                name="senha"
                                value={formData.senha}
                                onChange={handleChange}
                                required
                                placeholder="Mínimo 8 caracteres"
                                className="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-3.5 px-4 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300"
                            />
                        </div>

                        {/* Botão Submit */}
                        <button
                            onClick={handleSubmit}
                            type="button"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] mt-8 flex items-center justify-center gap-2"
                        >
                            <UserPlus className="w-5 h-5" />
                            Criar Conta
                        </button>

                      
                    </div>
                </div>

              
            </div>
        </section>
    );
}