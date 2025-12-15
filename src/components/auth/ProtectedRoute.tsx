'use client'
// ============================================
// COMPONENTE: ProtectedRoute
// Protege rotas que requerem autenticação
// ============================================

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { LoadingScreen } from '@/components/ui/LoadingSpinner';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/auth/login');
        }
    }, [isAuthenticated, loading, router]);

    if (loading) {
        return <LoadingScreen message="Verificando autenticação..." />;
    }

    if (!isAuthenticated) {
        return <LoadingScreen message="Redirecionando..." />;
    }

    return <>{children}</>;
}
