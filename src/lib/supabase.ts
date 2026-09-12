// src/lib/supabase.ts
// Handles Supabase authentication, cloud sync, and fallback to local state

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConfigured: boolean;
}

export const getSupabaseConfig = (): SupabaseConfig => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  return {
    url,
    anonKey,
    isConfigured: Boolean(url && anonKey && url.startsWith('http')),
  };
};

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  isGuest: boolean;
}

// Local storage key for persistent session in guest mode
const GUEST_SESSION_KEY = 'liferpg_guest_session_v1';

export const getActiveUserSession = (): AuthUser => {
  if (typeof window === 'undefined') {
    return {
      id: 'usr_guest_seed',
      email: 'seeker@sanctuary.virtues',
      username: 'Virtue Seeker',
      isGuest: true,
    };
  }

  try {
    const raw = localStorage.getItem(GUEST_SESSION_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Failed to parse guest session from storage', err);
  }

  const defaultUser: AuthUser = {
    id: 'usr_seeker_' + Math.random().toString(36).substring(2, 9),
    email: 'seeker@sanctuary.virtues',
    username: 'Virtue Seeker',
    isGuest: true,
  };

  try {
    localStorage.setItem(GUEST_SESSION_KEY, JSON.stringify(defaultUser));
  } catch (e) {
    // Ignore storage errors in restricted contexts
  }

  return defaultUser;
};

export const saveUserSession = (user: AuthUser) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(GUEST_SESSION_KEY, JSON.stringify(user));
  }
};
