'use client'
// ============================================
// COMPONENTE: Navbar
// Navbar responsiva com menu mobile
// ============================================

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Home, LogIn, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming cn is available, or I'll use template literals if not

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Fecha o menu ao redimensionar a tela para desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-blue-600 text-white z-50 shadow-lg">
            <div className="container mx-auto flex justify-between items-center p-4 relative z-50 bg-blue-600">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl md:text-3xl lg:text-4xl font-bold select-none hover:text-blue-100 transition-colors"
                    onClick={closeMenu}
                >
                    Crud Base
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:block">
                    <ul className="flex space-x-6">
                        <li>
                            <Link
                                href="/"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-500 transition-all duration-200 select-none"
                            >
                                <Home className="w-4 h-4" />
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/auth/login"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-500 transition-all duration-200 select-none"
                            >
                                <LogIn className="w-4 h-4" />
                                Fazer Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/auth/register"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-blue-600 hover:bg-blue-50 transition-all duration-200 select-none font-semibold shadow-md"
                            >
                                <UserPlus className="w-4 h-4" />
                                Criar Conta
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden p-2 rounded-lg hover:bg-blue-500 transition-colors focus:outline-none"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {/* Overlay - Only visible when open */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                style={{ top: '64px' }} // Start below header
                onClick={closeMenu}
                aria-hidden="true"
            />

            {/* Mobile Menu Content */}
            <nav
                className={`fixed top-[64px] left-0 w-full bg-blue-700 border-t border-blue-500 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-y-0 shadow-xl' : '-translate-y-full opacity-0 pointer-events-none'
                    }`}
            >
                <ul className="flex flex-col p-4 space-y-2">
                    <li>
                        <Link
                            href="/"
                            onClick={closeMenu}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-600 transition-all duration-200 select-none"
                        >
                            <Home className="w-5 h-5" />
                            <span className="font-medium">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/auth/login"
                            onClick={closeMenu}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-600 transition-all duration-200 select-none"
                        >
                            <LogIn className="w-5 h-5" />
                            <span className="font-medium">Fazer Login</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/auth/register"
                            onClick={closeMenu}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white text-blue-600 hover:bg-blue-50 transition-all duration-200 select-none font-semibold"
                        >
                            <UserPlus className="w-5 h-5" />
                            <span>Criar Conta</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
