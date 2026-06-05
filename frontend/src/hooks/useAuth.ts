'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useSavedStore } from '@/stores/useSavedStore';

export function useAuth() {
  const { data: session, status } = useSession();
  const clearSaved = useSavedStore((s) => s.clear);

  const login = async (email: string, password: string) => {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      syncLocalSaved();
    }

    return result;
  };

  const loginWithGoogle = async () => {
    await signIn('google', { callbackUrl: '/' });
  };

  const logout = async () => {
    clearSaved();
    await signOut({ callbackUrl: '/' });
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Registration failed');
    }

    await signIn('credentials', { email, password, redirect: false });
    syncLocalSaved();
  };

  const syncLocalSaved = async () => {
    try {
      const localIds = JSON.parse(localStorage.getItem('edutrack-saved-colleges') || '{}');
      const ids: string[] = localIds?.state?.savedIds || [];
      if (ids.length > 0) {
        await Promise.all(
          ids.map((collegeId) =>
            fetch('/api/saved', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ collegeId }),
            })
          )
        );
        localStorage.removeItem('edutrack-saved-colleges');
        clearSaved();
      }
    } catch {
      // silently fail — localStorage sync is best-effort
    }
  };

  return {
    user: session?.user ?? null,
    isLoggedIn: status === 'authenticated',
    isLoading: status === 'loading',
    login,
    loginWithGoogle,
    logout,
    register,
  };
}
