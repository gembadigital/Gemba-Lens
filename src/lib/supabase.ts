import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Safe localStorage accessor for fallback credentials
const getStoredCredential = (key: string): string => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key) || '';
    }
  } catch (e) {}
  return '';
};

export const getSupabaseConfig = () => {
  const url = import.meta.env.VITE_SUPABASE_URL || getStoredCredential('gp_supabase_url') || '';
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || getStoredCredential('gp_supabase_anon_key') || '';
  return { url, anonKey, isConfigured: Boolean(url && anonKey) };
};

let clientInstance: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient | null => {
  const { url, anonKey, isConfigured } = getSupabaseConfig();
  if (!isConfigured) return null;

  if (!clientInstance) {
    try {
      clientInstance = createClient(url, anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        }
      });
    } catch (err) {
      console.warn('[Supabase Init Error]', err);
      clientInstance = null;
    }
  }
  return clientInstance;
};

export const saveSupabaseCredentials = (url: string, anonKey: string): boolean => {
  try {
    const cleanUrl = url.trim();
    const cleanKey = anonKey.trim();

    if (typeof window !== 'undefined' && window.localStorage) {
      if (cleanUrl) window.localStorage.setItem('gp_supabase_url', cleanUrl);
      else window.localStorage.removeItem('gp_supabase_url');

      if (cleanKey) window.localStorage.setItem('gp_supabase_anon_key', cleanKey);
      else window.localStorage.removeItem('gp_supabase_anon_key');
    }
    
    // Reset instance to re-initialize with new credentials
    clientInstance = null;
    return Boolean(cleanUrl && cleanKey);
  } catch (e) {
    return false;
  }
};

export const isSupabaseConfigured = Boolean(getSupabaseConfig().isConfigured);
export const supabase = getSupabase();
