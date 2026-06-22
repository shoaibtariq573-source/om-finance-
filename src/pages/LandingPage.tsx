import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Receipt, 
  Coins, 
  TrendingUp, 
  Award, 
  FileText, 
  ArrowRight, 
  TrendingDown, 
  ShieldCheck, 
  FileCheck2,
  BookOpen
} from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      title: 'Oman VAT Calculator (5%)',
      description: 'Quick calculations of 5% standard VAT rate with itemized gross, net, and tax deductions compatible with Sultanate guidelines.',
      icon: Receipt,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      badge: '🇴🇲 Oman VAT Compliant'
    },
    {
      title: 'Salary & Pension Planner',
      description: 'Break down basic pays, allowances, and automatic Omani pension (PASI) deductions cleanly for Omani and expat employees.',
      icon: Coins,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      badge: '💼 Includes PASI/Pension'
    },
    {
      title: 'Tax Invoice Templates (Ar/En)',
      description: 'Instantly deploy pre-designed Simplified and Standard Tax Invoices with integrated bilingual headers and QR code structures.',
      icon: FileCheck2,
      color: 'bg-rose-50 text-rose-600 border-rose-100',
      badge: '📄 Official Tax Templates'
    },
    {
      title: 'Omani End of Service Gratuity',
      description: 'Compute exact gratuity allowances under the latest Sultanate Labour Law structure (15 days/yr first 3 years, 30 days/yr after).',
      icon: Award,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
      badge: '⚖️ Oman Labour Law'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Navigation Topbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇴🇲</span>
            <div>
              <h1 className="font-space font-bold text-lg text-slate-900 tracking-tight leading-none">Oman Finance</h1>
              <span className="text-[10px] text-slate-500 font-semibold tracking-widest">TOOLKIT</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-blue-600 px-3 py-2 transition-all">
              Log In
            </Link>
            <Link 
              to="/signup" 
              className="text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-xl shadow-md shadow-blue-500/10 transition-all hover:scale-[1.02]"
            >
              Sign Up For Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-linear-to-b from-blue-50/40 via-white to-slate-50 relative overflow-hidden">
        {/* Decorative Grid Patterns */}
        <div className="absolute inset-0 z-0 opacity-40pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/50 text-xs font-semibold mb-6">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
            Comprehensive Finance App for Oman & GCC
          </div>
          
          <h2 className="font-space text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
            Smart Finance Tool Suite for <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-emerald-600">Oman Businesses</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Eliminate operational guesswork. Automatically calculate VAT regulations, process salary slips with pension deductions, compute gratuities, and generate compliant bilingual tax invoice templates instantly.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/signup" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 border border-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-all shadow-lg hover:scale-[1.01]"
            >
              Get Started Instantly
              <ArrowRight className="w-4.5 h-4.5" />
            </Link>
            <Link 
              to="/login" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-semibold px-6 py-3.5 rounded-xl text-sm transition-all shadow-sm hover:scale-[1.01]"
            >
              Explore Sandbox Dashboard
            </Link>
          </div>

          <div className="mt-6 text-xs text-slate-500 flex items-center justify-center gap-4">
            <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Free Sandbox Access</span>
            <span className="flex items-center gap-1"><FileCheck2 className="w-4 h-4 text-blue-500" /> Oman Labour & Tax Law Ready</span>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="font-space text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Everything you need to run your finance work in Muscat & GCC</h3>
            <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              Standardized tools built with precise calculations, designed for SMEs, accountants, HR staff, and entrepreneurs in Oman.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-slate-50/50 hover:bg-white border border-slate-200/60 hover:border-blue-500/20 hover:shadow-xl hover:shadow-slate-100 p-6 sm:p-8 rounded-2xl transition-all flex flex-col group"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-3.5 rounded-xl border ${feat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider bg-slate-100 border border-slate-200/50 rounded-full px-3 py-1">
                      {feat.badge}
                    </span>
                  </div>
                  <h4 className="font-space text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3">
                    {feat.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mini How-To/Guide Section */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
            {/* Background elements */}
            <div className="absolute right-0 bottom-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 max-w-2xl">
              <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">Quick Deployment</span>
              <h3 className="font-space text-2xl sm:text-3xl font-bold mt-3 text-white tracking-tight">How to connect Supabase in 2 minutes</h3>
              <p className="mt-4 text-slate-300 text-sm leading-relaxed">
                Want persistent cloud records, real user sign-ups, and live invoices?
                Open the <strong>Secrets</strong> panel inside your AI Studio Workspace and paste your Supabase Credentials:
              </p>
              
              <div className="mt-6 bg-slate-950 font-mono text-xs text-slate-300 p-4 rounded-xl border border-slate-800 space-y-2">
                <div><span className="text-blue-400"># Set these in your Secrets tab:</span></div>
                <div><span className="text-emerald-400">VITE_SUPABASE_URL</span>="https://your-project.supabase.co"</div>
                <div><span className="text-emerald-400">VITE_SUPABASE_ANON_KEY</span>="your-anon-key..."</div>
              </div>

              <div className="mt-8 flex gap-4">
                <Link 
                  to="/login" 
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl shadow-md transition-all"
                >
                  Enter Sandbox
                </Link>
                <a 
                  href="https://supabase.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl border border-slate-700 transition-all flex items-center gap-1.5"
                >
                  Create Supabase DB
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl">🇴🇲</span>
            <span className="font-space font-bold text-white tracking-tight">Oman Finance Toolkit</span>
          </div>
          <p className="max-w-md mx-auto text-xs text-slate-500">
            A secure finance management suite compliant with Sultanate tax regulations and corporate guidelines.
          </p>
          <div className="pt-4 border-t border-slate-800 text-xs text-slate-600">
            © {new Date().getFullYear()} Oman Finance Toolkit. All rights reserved. Made in GCC.
          </div>
        </div>
      </footer>
    </div>
  );
}
