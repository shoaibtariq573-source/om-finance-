import { Invoice, SavedCalculation, UserProfile } from '../types';

type AuthListener = (user: UserProfile | null) => void;
const authListeners = new Set<AuthListener>();

// Initial local user session (No cloud, strictly local)
let currentSandboxUser: UserProfile | null = null;
const SANDBOX_SESSION_KEY = 'oman_finance_user_session';
const SANDBOX_INVOICES_KEY = 'oman_finance_invoices';
const SANDBOX_CALCS_KEY = 'oman_finance_calculations';

// Initialize session from localStorage
const cached = localStorage.getItem(SANDBOX_SESSION_KEY);
if (cached) {
  try {
    currentSandboxUser = JSON.parse(cached);
  } catch {
    currentSandboxUser = null;
  }
}

// Helper to notify listeners
function notifyAuthChange(user: UserProfile | null) {
  authListeners.forEach((listener) => listener(user));
}

export const dataService = {
  isConfigured: (): boolean => {
    // Return false to represent secure local operation (no external cloud needed)
    return false;
  },

  // Auth Operations
  signUp: async (email: string, password?: string, pin?: string): Promise<{ user: UserProfile | null; error: Error | null }> => {
    try {
      const users = JSON.parse(localStorage.getItem('oman_finance_registered_users') || '[]');
      if (users.some((u: any) => u.email.toLowerCase() === email.toLowerCase())) {
        return { user: null, error: new Error('User already exists with this email address.') };
      }
      
      const newUser = { 
        id: Math.random().toString(36).substring(2, 9), 
        email, 
        created_at: new Date().toISOString() 
      };
      
      users.push({ ...newUser, password: password || '', pin: pin || '' });
      localStorage.setItem('oman_finance_registered_users', JSON.stringify(users));
      
      // Auto-login newly registered user
      currentSandboxUser = newUser;
      localStorage.setItem(SANDBOX_SESSION_KEY, JSON.stringify(newUser));
      notifyAuthChange(newUser);
      return { user: newUser, error: null };
    } catch (err: any) {
      return { user: null, error: new Error(err?.message || 'Failed to complete local signup') };
    }
  },

  signIn: async (email: string, password?: string): Promise<{ user: UserProfile | null; error: Error | null }> => {
    try {
      const users = JSON.parse(localStorage.getItem('oman_finance_registered_users') || '[]');
      const userMatch = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === (password || ''));
      
      if (userMatch) {
        const profile = { id: userMatch.id, email: userMatch.email, created_at: userMatch.created_at };
        currentSandboxUser = profile;
        localStorage.setItem(SANDBOX_SESSION_KEY, JSON.stringify(profile));
        notifyAuthChange(profile);
        return { user: profile, error: null };
      } else {
        // Quick default credentials for easy developer testing
        if (email.toLowerCase() === 'admin@omanfinance.om' && password === 'admin123') {
          const defaultUser = { id: 'admin-id', email: 'admin@omanfinance.om', created_at: new Date().toISOString() };
          currentSandboxUser = defaultUser;
          localStorage.setItem(SANDBOX_SESSION_KEY, JSON.stringify(defaultUser));
          notifyAuthChange(defaultUser);
          return { user: defaultUser, error: null };
        }
        return { user: null, error: new Error('Invalid email or password. Please try again or use PIN code mode!') };
      }
    } catch (err: any) {
      return { user: null, error: new Error(err?.message || 'Login error occurred') };
    }
  },

  signInByPin: async (pin: string): Promise<{ user: UserProfile | null; error: Error | null }> => {
    try {
      const users = JSON.parse(localStorage.getItem('oman_finance_registered_users') || '[]');
      const userMatch = users.find((u: any) => u.pin === pin);
      
      if (userMatch) {
        const profile = { id: userMatch.id, email: userMatch.email, created_at: userMatch.created_at };
        currentSandboxUser = profile;
        localStorage.setItem(SANDBOX_SESSION_KEY, JSON.stringify(profile));
        notifyAuthChange(profile);
        return { user: profile, error: null };
      } else {
        // Master override: try demo PIN 1234
        if (pin === '1234') {
          const defaultUser = { id: 'admin-id', email: 'admin@omanfinance.om', created_at: new Date().toISOString() };
          currentSandboxUser = defaultUser;
          localStorage.setItem(SANDBOX_SESSION_KEY, JSON.stringify(defaultUser));
          notifyAuthChange(defaultUser);
          return { user: defaultUser, error: null };
        }
        return { user: null, error: new Error('Incorrect Security PIN. (Tip: Try the standard PIN: 1234)') };
      }
    } catch (err: any) {
      return { user: null, error: new Error(err?.message || 'PIN Authentication error') };
    }
  },

  signOut: async (): Promise<{ error: Error | null }> => {
    currentSandboxUser = null;
    localStorage.removeItem(SANDBOX_SESSION_KEY);
    notifyAuthChange(null);
    return { error: null };
  },

  getCurrentUser: async (): Promise<UserProfile | null> => {
    return currentSandboxUser;
  },

  onAuthStateChange: (callback: AuthListener) => {
    authListeners.add(callback);
    // Emit immediate current state
    callback(currentSandboxUser);
    return () => {
      authListeners.delete(callback);
    };
  },

  // Invoice Operations
  getInvoices: async (): Promise<{ data: Invoice[]; error: Error | null }> => {
    try {
      const localInvoices = JSON.parse(localStorage.getItem(SANDBOX_INVOICES_KEY) || '[]');
      const userId = currentSandboxUser?.id || 'anonymous';
      const userInvoices = localInvoices.filter((inv: any) => inv.user_id === userId);
      return { data: userInvoices, error: null };
    } catch (err: any) {
      return { data: [], error: new Error('Failed to fetch local invoices') };
    }
  },

  createInvoice: async (invoice: Invoice): Promise<{ data: Invoice | null; error: Error | null }> => {
    try {
      const user = await dataService.getCurrentUser();
      const userId = user?.id || 'anonymous';
      const invoiceRecord = {
        ...invoice,
        id: Math.random().toString(36).substring(2, 9),
        user_id: userId,
        created_at: new Date().toISOString(),
      };

      const localInvoices = JSON.parse(localStorage.getItem(SANDBOX_INVOICES_KEY) || '[]');
      localInvoices.unshift(invoiceRecord);
      localStorage.setItem(SANDBOX_INVOICES_KEY, JSON.stringify(localInvoices));
      return { data: invoiceRecord, error: null };
    } catch (err: any) {
      return { data: null, error: new Error('Failed to create local invoice') };
    }
  },

  deleteInvoice: async (id: string): Promise<{ error: Error | null }> => {
    try {
      const localInvoices = JSON.parse(localStorage.getItem(SANDBOX_INVOICES_KEY) || '[]');
      const filtered = localInvoices.filter((inv: any) => inv.id !== id);
      localStorage.setItem(SANDBOX_INVOICES_KEY, JSON.stringify(filtered));
      return { error: null };
    } catch (err: any) {
      return { error: new Error('Failed to delete local invoice') };
    }
  },

  // Saved Calculation Operations
  getCalculations: async (): Promise<{ data: SavedCalculation[]; error: Error | null }> => {
    try {
      const localCalcs = JSON.parse(localStorage.getItem(SANDBOX_CALCS_KEY) || '[]');
      const userId = currentSandboxUser?.id || 'anonymous';
      const userCalcs = localCalcs.filter((c: any) => c.user_id === userId);
      return { data: userCalcs, error: null };
    } catch (err: any) {
      return { data: [], error: new Error('Failed to load calculations') };
    }
  },

  saveCalculation: async (type: 'vat' | 'salary' | 'profit' | 'end-of-service', title: string, inputs: Record<string, any>, outputs: Record<string, any>): Promise<{ data: SavedCalculation | null; error: Error | null }> => {
    try {
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
    } catch (err: any) {
      return { data: null, error: new Error('Failed to save calculation') };
    }
  },

  deleteCalculation: async (id: string): Promise<{ error: Error | null }> => {
    try {
      const localCalcs = JSON.parse(localStorage.getItem(SANDBOX_CALCS_KEY) || '[]');
      const filtered = localCalcs.filter((c: any) => c.id !== id);
      localStorage.setItem(SANDBOX_CALCS_KEY, JSON.stringify(filtered));
      return { error: null };
    } catch (err: any) {
      return { error: new Error('Failed to delete calculation') };
    }
  }
};
