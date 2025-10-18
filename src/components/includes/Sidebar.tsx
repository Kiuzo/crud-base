import { useState } from 'react';
import { Home, UserPlus, UserX, Search, UserCog, LogOut, ChevronRight, Menu, X } from "lucide-react";

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* Botão Mobile Menu */}
            <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-50 lg:hidden bg-blue-500 text-white p-3 rounded-xl shadow-lg hover:bg-blue-600 transition-all"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay para mobile */}
            {isOpen && (
                <div
                    onClick={closeSidebar}
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed left-0 top-0 flex flex-col bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 text-white w-64 h-full shadow-2xl z-40 transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0
            `}>

                {/* Header com estilo moderno */}
                <div className="p-6 pb-8">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
                            <span className="text-2xl font-bold text-blue-600">C</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white leading-tight">
                                CrudBase
                            </h1>
                            <p className="text-xs text-blue-100">Sistema de Gestão</p>
                        </div>
                    </div>
                </div>

                {/* Navigation com visual aprimorado */}
                <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                    <div className="mb-4">
                        <p className="text-xs font-semibold text-blue-200 px-4 mb-2 uppercase tracking-wider">Menu Principal</p>
                    </div>

                    <a
                        href="../system/inicio"
                        onClick={closeSidebar}
                        className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all group shadow-lg border border-white/10"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-all">
                                <Home size={18} className="text-white" />
                            </div>
                            <span className="text-sm font-semibold">Home</span>
                        </div>
                        <ChevronRight size={16} className="text-blue-200 group-hover:text-white transition-colors" />
                    </a>

                    <div className="mb-4 mt-6">
                        <p className="text-xs font-semibold text-blue-200 px-4 mb-2 uppercase tracking-wider">Gerenciar Usuários</p>
                    </div>

                    <a
                        href="../system/adicionar"
                        onClick={closeSidebar}
                        className="flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-white/10 transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-transparent rounded-lg group-hover:bg-white/20 transition-all">
                                <UserPlus size={18} className="text-blue-100 group-hover:text-white transition-colors" />
                            </div>
                            <span className="text-sm font-medium text-blue-100 group-hover:text-white transition-colors">Adicionar</span>
                        </div>
                        <ChevronRight size={16} className="text-transparent group-hover:text-white transition-colors" />
                    </a>

                    <a
                        href="../system/pesquisar"
                        onClick={closeSidebar}
                        className="flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-white/10 transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-transparent rounded-lg group-hover:bg-white/20 transition-all">
                                <Search size={18} className="text-blue-100 group-hover:text-white transition-colors" />
                            </div>
                            <span className="text-sm font-medium text-blue-100 group-hover:text-white transition-colors">Pesquisar</span>
                        </div>
                        <ChevronRight size={16} className="text-transparent group-hover:text-white transition-colors" />
                    </a>

                    <a
                        href="../system/atualizar"
                        onClick={closeSidebar}
                        className="flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-white/10 transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-transparent rounded-lg group-hover:bg-white/20 transition-all">
                                <UserCog size={18} className="text-blue-100 group-hover:text-white transition-colors" />
                            </div>
                            <span className="text-sm font-medium text-blue-100 group-hover:text-white transition-colors">Atualizar</span>
                        </div>
                        <ChevronRight size={16} className="text-transparent group-hover:text-white transition-colors" />
                    </a>

                    <a
                        href="../system/remover"
                        onClick={closeSidebar}
                        className="flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-white/10 transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-transparent rounded-lg group-hover:bg-white/20 transition-all">
                                <UserX size={18} className="text-blue-100 group-hover:text-white transition-colors" />
                            </div>
                            <span className="text-sm font-medium text-blue-100 group-hover:text-white transition-colors">Remover</span>
                        </div>
                        <ChevronRight size={16} className="text-transparent group-hover:text-white transition-colors" />
                    </a>
                </nav>

                {/* Footer com separação visual */}
                <div className="p-4 space-y-1 border-t border-white/10 bg-black/10">
                    <a
                        href="/"
                        onClick={closeSidebar}
                        className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-red-500/20 transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg group-hover:bg-red-500/30 transition-all">
                                <LogOut size={18} className="text-blue-100 group-hover:text-red-300 transition-colors" />
                            </div>
                            <span className="text-sm font-medium text-blue-100 group-hover:text-red-300 transition-colors">Sair</span>
                        </div>
                    </a>
                </div>

            </aside>

            {/* Spacer para conteúdo principal em telas grandes */}
            <div className="hidden lg:block w-64" />
        </>
    );
}