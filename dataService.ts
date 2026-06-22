import { supabase, isSupabaseConfigured } from './supabase';
import { Invoice, SavedCalculation, UserProfile } from '../types';

type AuthListener = (user: UserProfile | null) => void;
const authListeners = new Set<AuthListener>();

// Initial local user if sandbox is active
let currentSandboxUser: UserProfile | null = null;
const SANDBOX_SESSION_KEY = 'oman_finance_user_session';
const SANDBOX_INVOICES_KEY = 'oman_finance_invoices';
const SANDBOX_CALCS_KEY = 'oman_finance_calculations';

// Initialize sandbox session from localStorage
if (!isSupabaseConfigured) {
  const cached = localStorage.getItem(SANDBOX_SESSION_KEY);
  if (cached) {
    try {
      currentSandboxUser = JSON.parse(cached);
    } catch {
      currentSandboxUser = null;
    }
  }
}

// Helper to notify listeners
function notifyAuthChange(user: UserProfile | null) {
  authListeners.forEach((listener) => listener(user));
}

// Watch Supabase auth events if connected
if (isSupabaseConfigured && supabase) {
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      const user: UserProfile = {
        id: session.user.id,
        email: session.user.email || '',
        created_at: session.user.created_at,
      };
      notifyAuthChange(user);
    } else {
      notifyAuthChange(null);
    }
  });
}

export const dataService = {
  isConfigured: (): boolean => {
    return isSupabaseConfigured;
  },

  // Auth Operations
  signUp: async (email: string, password: string): Promise<{ user: UserProfile | null; error: Error | null }> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) return { user: null, error };
      if (data.user) {
        return {
          user: { id: data.user.id, email: data.user.email || '', created_at: data.user.created_at },
          error: null,
        };
      }
      return { user: null, error: new Error('SignUp succeeded but returned no user profile') };
    } else {
      // Sandbox mode signup
      const users = JSON.parse(localStorage.getItem('oman_finance_registered_users') || '[]');
      if (users.some((u: any) => u.email === email)) {
        return { user: null, error: new Error('User already exists') };
      }
      const newUser = { id: Math.random().toString(36).substring(2, 9), email, created_at: new Date().toISOString() };
      users.push({ ...newUser, password });
      localStorage.setItem('oman_finance_registered_users', JSON.stringify(users));
      
      // Auto-login
      currentSandboxUser = newUser;
      localStorage.setItem(SANDBOX_SESSION_KEY, JSON.stringify(newUser));
      notifyAuthChange(newUser);
      return { user: newUser, error: null };
    }
  },

  signIn: async (email: string, password: string): Promise<{ user: UserProfile | null; error: Error | null }> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return { user: null, error };
      if (data.user) {
        return {
          user: { id: data.user.id, email: data.user.email || '', created_at: data.user.created_at },
          error: null,
        };
      }
      return { user: null, error: new Error('Login succeeded but returned no profile') };
    } else {
      // Sandbox mode login
      const users = JSON.parse(localStorage.getItem('oman_finance_registered_users') || '[]');
      const userMatch = users.find((u: any) => u.email === email && u.password === password);
      
      if (userMatch) {
        const profile = { id: userMatch.id, email: userMatch.email, created_at: userMatch.created_at };
        currentSandboxUser = profile;
        localStorage.setItem(SANDBOX_SESSION_KEY, JSON.stringify(profile));
        notifyAuthChange(profile);
        return { user: profile, error: null };
      } else {
        // Simple default credentials for easy developer testing
        if (email === 'admin@omanfinance.om' && password === 'admin123') {
          const defaultUser = { id: 'admin-id', email, created_at: new Date().toISOString() };
          currentSandboxUser = defaultUser;
          localStorage.setItem(SANDBOX_SESSION_KEY, JSON.stringify(defaultUser));
          notifyAuthChange(defaultUser);
          return { user: defaultUser, error: null };
        }
        return { user: null, error: new Error('Invalid credentials. (Hint: Use admin@omanfinance.om / admin123 to log in instantly!)') };
      }
    }
  },

  signOut: async (): Promise<{ error: Error | null }> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signOut();
      return { error };
    } else {
      currentSandboxUser = null;
      localStorage.removeItem(SANDBOX_SESSION_KEY);
      notifyAuthChange(null);
      return { error: null };
    }
  },

  getCurrentUser: async (): Promise<UserProfile | null> => {
    if (isSupabaseConfigured && supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        return { id: user.id, email: user.email || '', created_at: user.created_at };
      }
      return null;
    } else {
      return currentSandboxUser;
    }
  },

  onAuthStateChange: (callback: AuthListener) => {
    authListeners.add(callback);
    // Emit immediate current state
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          callback({ id: user.id, email: user.email || '', created_at: user.created_at });
        } else {
          callback(null);
        }
      });
    } else {
      callback(currentSandboxUser);
    }
    return () => {
      authListeners.delete(callback);
    };
  },

  // Invoice Operations
  getInvoices: async (): Promise<{ data: Invoice[]; error: Error | null }> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false });
      return { data: data || [], error };
    } else {
      const localInvoices = JSON.parse(localStorage.getItem(SANDBOX_INVOICES_KEY) || '[]');
      // Filter by current user in sandbox
      const userId = currentSandboxUser?.id || 'anonymous';
      const userInvoices = localInvoices.filter((inv: any) => inv.user_id === userId);
      return { data: userInvoices, error: null };
    }
  },

  createInvoice: async (invoice: Invoice): Promise<{ data: Invoice | null; error: Error | null }> => {
    const user = await dataService.getCurrentUser();
    const userId = user?.id || 'anonymous';
    const invoiceRecord = {
      ...invoice,
      id: Math.random().toString(36).substring(2, 9),
      user_id: userId,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      // Remove local client-side temporary ID so DB generates key if defaultUuid is setup
      const { id, ...supabaseInvoice } = invoiceRecord;
      const { data, error } = await supabase
        .from('invoices')
        .insert({ ...supabaseInvoice, user_id: userId })
        .select()
        .single();
      return { data, error };
    } else {
      const localInvoices = JSON.parse(localStorage.getItem(SANDBOX_INVOICES_KEY) || '[]');
      localInvoices.unshift(invoiceRecord);
      localStorage.setItem(SANDBOX_INVOICES_KEY, JSON.stringify(localInvoices));
      return { data: invoiceRecord, error: null };
    }
  },

  deleteInvoice: async (id: string): Promise<{ error: Error | null }> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('invoices')
        .delete()
        .eq('id', id);
      return { error };
    } else {
      const localInvoices = JSON.parse(localStorage.getItem(SANDBOX_INVOICES_KEY) || '[]');
      const filtered = localInvoices.filter((inv: any) => inv.id !== id);
      localStorage.setItem(SANDBOX_INVOICES_KEY, JSON.stringify(filtered));
      return { error: null };
    }
  },

  // Saved Calculation Operations
  getCalculations: async (): Promise<{ data: SavedCalculation[]; error: Error | null }> => {
    // We can also store calculation history in localStorage or Supabase
    const localCalcs = JSON.parse(localStorage.getItem(SANDBOX_CALCS_KEY) || '[]');
    const userId = currentSandboxUser?.id || 'anonymous';
    const userCalcs = localCalcs.filter((c: any) => c.user_id === userId);
    return { data: userCalcs, error: null };
  },

  saveCalculation: async (type: 'vat' | 'salary' | 'profit' | 'end-of-service', title: string, inputs: Record<string, any>, outputs: Record<string, any>): Promise<{ data: SavedCalculation | null; error: Error | null }> => {
    const user = await dataService.getCurrentUser();
    const userId = user?.id || 'anonymous';
    const record: SavedCalculation = {
      id: Math.random().toString(36).substring(2, 9),
      user_id: userId,
      type,
      title,
      inputs,
      outputs,
      created_at: new Date().toISOString(),
    };

    const localCalcs = JSON.parse(localStorage.getItem(SANDBOX_CALCS_KEY) || '[]');
    localCalcs.unshift(record);
    // Keep only last 20 calculations history
    if (localCalcs.length > 20) {
      localCalcs.pop();
    }
    localStorage.setItem(SANDBOX_CALCS_KEY, JSON.stringify(localCalcs));
    return { data: record, error: null };
  },

  deleteCalculation: async (id: string): Promise<{ error: Error | null }> => {
    const localCalcs = JSON.parse(localStorage.getItem(SANDBOX_CALCS_KEY) || '[]');
    const filtered = localCalcs.filter((c: any) => c.id !== id);
    localStorage.setItem(SANDBOX_CALCS_KEY, JSON.stringify(filtered));
    return { error: null };
  }
};
