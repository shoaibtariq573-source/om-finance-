import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { dataService } from '../lib/dataService';
import { Mail, Lock, AlertCircle, Sparkles, Building2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isConfigured = dataService.isConfigured();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { user, error: authError } = await dataService.signIn(email, password);
      if (authError) {
        setError(authError.message);
      } else if (user) {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const { user, error: authError } = await dataService.signIn('admin@omanfinance.om', 'admin123');
      if (authError) {
        setError(authError.message);
      } else if (user) {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to authenticate demo user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <div className="inline-flex items-center justify-center p-3.5 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-500/10 mb-5">
          <span className="text-3xl">🇴🇲</span>
        </div>
        <h2 className="font-space text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-none">Oman Finance Toolkit</h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-500">
          Simplify calculations, salaries, VAT and invoice generation
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl shadow-xl shadow-slate-100 border border-slate-200/60">
          
          {/* Environment Banner */}
          <div className={`mb-6 p-4 rounded-xl border ${
            isConfigured 
              ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
              : 'bg-indigo-50 border-indigo-100 text-indigo-800'
          } text-xs text-center flex items-center justify-center gap-2`}>
            {isConfigured ? (
              <span>🔒 <strong>Cloud Sync Connected</strong> via Supabase Database API</span>
            ) : (
              <span className="leading-relaxed">⚡ <strong>Sandbox Mode Active</strong>. Test the app immediately below or use standard demo keys.</span>
            )}
          </div>

          <form className="space-y-4.5" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-3.5 rounded-xl text-xs flex items-start gap-2 animate-shake">
                <AlertCircle className="w-4.5 h-4.5 text-red-500 shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Email Address
              </label>
              <div className="mt-1.5 relative rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.om"
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  Password
                </label>
              </div>
              <div className="mt-1.5 relative rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="minimum 6 characters"
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-xs text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Sign In'}
              </button>
            </div>
          </form>

          {/* Quick Sandbox Demolink */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-slate-400 font-medium">Test instantly</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-dashed border-slate-300 hover:border-blue-600 bg-linear-to-r from-blue-50/50 to-indigo-50/50 text-blue-700 hover:text-blue-800 rounded-xl text-xs font-bold transition-all"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              One-Click Quick Login (Demo Session)
            </button>
          </div>

          <div className="mt-6 text-center text-xs">
            <span className="text-slate-500">Don't have an account yet? </span>
            <Link to="/signup" className="font-bold text-blue-600 hover:text-blue-700">
              Sign Up For Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
