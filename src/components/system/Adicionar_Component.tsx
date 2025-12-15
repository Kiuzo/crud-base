'use client'
// ============================================
// COMPONENTE: Adicionar Usuário
// Formulário completo para criação de usuários
// ============================================

import { useState } from 'react';
import { UserPlus, User, Mail, Lock, Briefcase, Building2, Phone } from 'lucide-react';
import { useUsers } from '@/hooks/useUsers';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { validateUserForm } from '@/utils/validators';
import { maskPhone } from '@/utils/formatters';
import { CARGOS_DISPONIVEIS, DEPARTAMENTOS_DISPONIVEIS } from '@/constants';

export function AdicionarUsuario() {
    const { createUser, loading } = useUsers();
    const toast = useToast();

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        cargo: '',
        departamento: '',
        telefone: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Aplicar máscara de telefone
        if (name === 'telefone') {
            setFormData((prev) => ({ ...prev, [name]: maskPhone(value) }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }

        // Limpar erro do campo quando usuário digita
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        // Validar formulário
        const validation = validateUserForm(formData);
        if (!validation.valid) {
            setErrors(validation.errors);
            toast.error('Por favor, corrija os erros no formulário');
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await createUser({
                nome: formData.nome,
                email: formData.email,
                senha: formData.senha,
                cargo: formData.cargo,
                departamento: formData.departamento || undefined,
                telefone: formData.telefone || undefined,
            });

            if (result.success) {
                toast.success(result.message);
                // Limpar formulário
                setFormData({
                    nome: '',
                    email: '',
                    senha: '',
                    cargo: '',
                    departamento: '',
                    telefone: '',
                });
            } else {
                toast.error(result.message);
            }
        } catch (error: any) {
            toast.error(error.message || 'Erro ao criar usuário');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4 shadow-lg">
                        <UserPlus className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">Adicionar Usuário</h1>
                    <p className="text-slate-600">Preencha os dados para criar um novo usuário</p>
                </div>

                {/* Card do Formulário */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nome */}
                        <Input
                            label="Nome Completo"
                            name="nome"
                            type="text"
                            value={formData.nome}
                            onChange={handleChange}
                            error={errors.nome}
                            placeholder="Digite o nome completo"
                            required
                            leftIcon={<User className="w-5 h-5" />}
                        />

                        {/* Email */}
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            placeholder="seu@email.com"
                            required
                            leftIcon={<Mail className="w-5 h-5" />}
                        />

                        {/* Senha */}
                        <Input
                            label="Senha"
                            name="senha"
                            type="password"
                            value={formData.senha}
                            onChange={handleChange}
                            error={errors.senha}
                            placeholder="Mínimo 8 caracteres"
                            required
                            minLength={8}
                            leftIcon={<Lock className="w-5 h-5" />}
                            helperText="A senha deve ter no mínimo 8 caracteres"
                        />

                        {/* Cargo */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-700">
                                Cargo
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <select
                                    name="cargo"
                                    value={formData.cargo}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-3 pl-10 pr-4 outline-none transition-all duration-200 hover:border-slate-300"
                                >
                                    <option value="">Selecione um cargo</option>
                                    {CARGOS_DISPONIVEIS.map((cargo) => (
                                        <option key={cargo} value={cargo}>
                                            {cargo}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {errors.cargo && <p className="text-sm text-red-600 font-medium">{errors.cargo}</p>}
                        </div>

                        {/* Departamento */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-700">
                                Departamento
                                <span className="text-slate-400 text-xs ml-1">(opcional)</span>
                            </label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <select
                                    name="departamento"
                                    value={formData.departamento}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-3 pl-10 pr-4 outline-none transition-all duration-200 hover:border-slate-300"
                                >
                                    <option value="">Selecione um departamento</option>
                                    {DEPARTAMENTOS_DISPONIVEIS.map((dept) => (
                                        <option key={dept} value={dept}>
                                            {dept}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Telefone */}
                        <Input
                            label="Telefone"
                            name="telefone"
                            type="tel"
                            value={formData.telefone}
                            onChange={handleChange}
                            error={errors.telefone}
                            placeholder="(00) 00000-0000"
                            leftIcon={<Phone className="w-5 h-5" />}
                            helperText="Formato: (00) 00000-0000"
                        />

                        {/* Botão de Submit */}
                        <div className="pt-4">
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                isLoading={isSubmitting || loading === 'loading'}
                                className="w-full"
                                leftIcon={<UserPlus className="w-5 h-5" />}
                            >
                                {isSubmitting ? 'Criando Usuário...' : 'Criar Usuário'}
                            </Button>
                        </div>
                    </form>

                    {/* Info adicional */}
                    <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-100 rounded-lg">
                        <p className="text-sm text-blue-700">
                            <span className="font-semibold">Dica:</span> Todos os campos marcados com{' '}
                            <span className="text-red-500">*</span> são obrigatórios. Os demais são opcionais.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}