'use client'
import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Usuario, AuthContextType } from '@/types';
import { handleSupabaseError, logError } from '@/utils/supabase-helpers';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkSession();
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        await loadUserData(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await loadUserData(session.user.id);
      }
    } catch (err: any) {
      logError('AuthProvider.checkSession', err);
    } finally {
      setLoading(false);
    }
  };

  const loadUserData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('administradores')
        .select('*')
        .eq('user_id', userId)
        .single();
      if (error) throw error;
      setUser(data);
    } catch (err: any) {
      logError('AuthProvider.loadUserData', err, { userId });
      setUser(null);
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      await loadUserData(data.user.id);
      router.push('/system/inicio');
    } catch (err: any) {
      const errorMessage = handleSupabaseError(err);
      logError('AuthProvider.login', err);
      throw new Error(errorMessage);
    }
  }, [router]);

  const logout = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      router.push('/');
    } catch (err: any) {
      const errorMessage = handleSupabaseError(err);
      logError('AuthProvider.logout', err);
      throw new Error(errorMessage);
    }
  }, [router]);

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
