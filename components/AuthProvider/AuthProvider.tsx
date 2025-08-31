'use client';

import { getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect } from 'react';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    async function checkSession() {
      try {
        const user = await getMe();
        setUser(user); // User
      } catch {
        setUser(null); // теперь валидно
      }
    }
    checkSession();
  }, [setUser]);

  return <>{children}</>;
}
