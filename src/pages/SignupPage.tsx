import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { dataService } from '../lib/dataService';
import { Mail, Lock, AlertCircle, Sparkles, AlertTriangle } from 'lucide-react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (pin.length !== 4) {
      setError('Security PIN must be exactly 4 digits.');
      return;
    }

    setLoading(true);

    try {
      const { user, error: authError } = await dataService.signUp(email, password, pin);
      if (authError) {
        setError(authError.message);
      } else if (user) {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred during signup.');
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
        <h2 className="font-space text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-none">Create Your Account</h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-500">
          Muscat/GCC compliant offline financial dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl shadow-xl shadow-slate-100 border border-slate-200/60">
          
          <form className="space-y-4" onSubmit={handleSignup}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-3.5 rounded-xl text-xs flex items-start gap-2 animate-shake">
                <AlertCircle className="w-4.5 h-4.5 text-red-500 shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            <div className="bg-emerald-50 border border-emerald-150 text-emerald-800 p-3.5 rounded-xl text-xs flex items-start gap-2">
              <span className="leading-relaxed">
                🔒 <strong>100% Offline Security model:</strong> Your account profile, calculations, and generated invoices remain fully private. No cloud databases are ever used.
              </span>
            </div>

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
                  placeholder="name@company.com"
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Account Password
              </label>
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
                  placeholder="6+ characters"
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Confirm Password
              </label>
              <div className="mt-1.5 relative rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="confirm password"
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900"
                />
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4.5">
              <label htmlFor="signup-pin" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Create 4-Digit Security PIN
              </label>
              <p className="text-[11px] text-slate-400 mb-2 font-medium">Use this PIN to login is extremely easy and secure to remember.</p>
              
              <div className="relative rounded-lg w-32">
                <input
                  id="signup-pin"
                  name="pin"
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={4}
                  required
                  value={pin}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    setPin(val);
                  }}
                  placeholder="••••"
                  className="block w-full text-center text-lg tracking-[0.5em] font-extrabold py-2 bg-slate-50/50 border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-xl outline-hidden transition-all text-slate-900"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-xs text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-xs">
            <span className="text-slate-500">Already have an account? </span>
            <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
