import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  Coins, 
  TrendingUp, 
  Award, 
  FileText, 
  LogOut, 
  Menu, 
  X, 
  User,
  AlertCircle,
  Database,
  Github,
  Download,
  Globe,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  ExternalLink,
  Settings,
  Server
} from 'lucide-react';
import { dataService } from '../lib/dataService';
import { UserProfile } from '../types';

export default function DashboardLayout() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isConfigured = dataService.isConfigured();

 const [showDeploymentPanel, setShowDeploymentPanel] = useState(false);
  const [activeTab, setActiveTab] = useState<'download' | 'github' | 'domain' | 'cloudflare'>('download');
  const [copiedText, setCopiedText] = useState<'git' | 'vercel' | 'dns' | 'cf' | null>(null);

  const handleCopyText = (text: string, key: 'git' | 'vercel' | 'dns' | 'cf') => {
    navigator.clipboard.writeText(text);
    setCopiedText(key);
    setTimeout(() => setCopiedText(null), 2000);
  };

  useEffect(() => {
    // Sync authenticated user status
    const unsubscribe = dataService.onAuthStateChange((currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser && !loading) {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await dataService.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-600 text-sm font-medium">Loading Oman Finance Toolkit...</p>
      </div>
    );
  }

  const menuItems = [
    { name: 'Dashboard Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'VAT Calculator (5%) 🧾', path: '/vat', icon: Receipt },
    { name: 'Salary Calculator 💰', path: '/salary', icon: Coins },
    { name: 'End of Service Gratuity 🇴🇲', path: '/end-of-service', icon: Award },
    { name: 'Tax Invoice Templates 🧾', path: '/invoice', icon: FileText }
  ];

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex">
      {/* Sandbox Warning Ribbon */}
      {!isConfigured && (
        <div className="no-print fixed top-0 left-0 right-0 z-50 bg-amber-500 bg-linear-to-r from-amber-500 to-orange-600 text-white px-4 py-1.5 text-center text-xs font-semibold shadow-md flex items-center justify-center gap-1.5">
          <AlertCircle className="w-4.5 h-4.5" />
          <span>Running in <strong>Sandbox Mode</strong> (Local Storage). To enable real-time cloud sync, insert Supabase credentials in Secrets.</span>
          <Link to="/login" className="underline hover:text-amber-100 ml-2">Configuration Guide</Link>
        </div>
      )}

      {/* Side Navigation - Desktop */}
      <aside className={`no-print w-64 bg-slate-900 text-white shrink-0 hidden md:flex flex-col border-r border-slate-800 transition-all ${!isConfigured ? 'pt-8' : ''}`}>
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇴🇲</span>
            <div>
              <h1 className="font-space font-bold text-lg tracking-tight text-white leading-tight">Oman Finance</h1>
              <span className="text-xs text-slate-400 font-medium tracking-wide">TOOLKIT</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 truncate">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="truncate">
                <p className="text-xs text-white font-semibold truncate leading-none">{user?.email}</p>
                <span className="text-[10px] text-slate-500 font-medium">
                  {isConfigured ? 'Supabase Secure' : 'Sandbox Session'}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white hover:bg-red-500/15 hover:border-red-500/20 border border-transparent rounded-lg transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar overlay */}
      {mobileOpen && (
        <div className="no-print fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs md:hidden" onClick={() => setMobileOpen(false)}>
          <aside className="w-64 max-w-[80vw] h-full bg-slate-900 text-white flex flex-col p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇴🇲</span>
                <div>
                  <h1 className="font-space font-bold text-base text-white">Oman Finance</h1>
                  <span className="text-[10px] text-slate-400 tracking-wider">TOOLKIT</span>
                </div>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2.5 mb-3 truncate">
                <User className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-slate-300 truncate font-medium">{user?.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg text-xs font-semibold bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header - Desktop & Mobile */}
        <header className={`no-print bg-white border-b border-slate-200/80 px-4 md:px-8 py-4 flex items-center justify-between shrink-0 sticky top-0 z-30 transition-all ${(!isConfigured && window.innerWidth >= 768) ? 'mt-8' : ''}`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 md:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:block">
              <h2 className="font-space font-semibold text-slate-900 text-base md:text-lg">
                {menuItems.find(item => item.path === location.pathname)?.name.replace(/🇴🇲|🧾|💰|📈/, '').trim() || 'Finance Tools'}
              </h2>
              <p className="text-xs text-slate-500">Calculators and finance tools specialized for Oman businesses</p>
            </div>
            {/* Minimal Mobile Header Logo */}
            <div className="flex items-center gap-2 md:hidden">
              <span className="text-xl">🇴🇲</span>
              <span className="font-space font-bold text-slate-900">Oman Finance</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/50">
              {currentDate}
            </span>
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${isConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}></div>
              <span className="text-xs font-semibold text-slate-600">
                {isConfigured ? 'Supabase Safe' : 'Sandbox (Offline)'}
              </span>
            </div>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
     
        </main>
      </div>
    </div>
  );
}
