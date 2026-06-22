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

  const [showDeploymentPanel, setShowDeploymentPanel] = useState(true);
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
      {/* Side Navigation - Desktop */}
      <aside className="no-print w-64 bg-slate-900 text-white shrink-0 hidden md:flex flex-col border-r border-slate-800 transition-all">
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
                <span className="text-[10px] text-slate-400 font-medium select-none">
                  Offline Secure Session
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
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-semibold text-slate-800 select-none">
                Secure Device Storage
              </span>
            </div>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* Collapsible Connection & Domain Hub on top */}
          {false && (
            <div className="no-print mb-6">
            {!showDeploymentPanel ? (
              <div 
                onClick={() => setShowDeploymentPanel(true)}
                className="bg-slate-900 border border-slate-800 text-white rounded-2xl px-5 py-3.5 shadow-md flex items-center justify-between cursor-pointer hover:bg-slate-800 transition-all"
              >

                      <div className="md:col-span-4 bg-slate-50 p-4 border border-slate-200 rounded-2xl flex flex-col justify-between shrink-0">
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider leading-none">Vite Static Folder</span>
                          <p className="font-space font-bold text-slate-950 text-xs text-slate-800 leading-tight">Build once, run anywhere</p>
                          <p className="text-[11px] text-slate-500 leading-normal">
                            Running <code className="bg-white p-1 rounded-md border border-slate-200 font-mono text-[10px]">npm run build</code> generates a high-performance <code className="font-mono bg-white border border-slate-200 rounded px-1 text-slate-700">dist/</code> directory containing static files ready to be dragged & dropped directly onto shared hosts or CDNs.
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-200 text-[10px] text-slate-400 font-medium">
                          No server required for basic calculator usage.
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'github' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      <div className="md:col-span-7 space-y-4">
                        <h4 className="font-bold text-slate-900 text-sm">Setup Local Repo & Connect Remote GitHub</h4>
                        <p className="text-slate-500 leading-relaxed text-[11px]">
                          Push this clean folder layout into any remote GitHub repository which then integrates to hosting providers like Vercel with automatic continuous deployments.
                        </p>

                        <div className="bg-slate-950 text-slate-205 p-4 rounded-xl font-mono text-[10px] space-y-1 relative group">
                          <button
                            type="button"
                            onClick={() => handleCopyText(`git init\ngit add .\ngit commit -m "Deploying Oman Financial Toolkit"\ngit branch -M main\ngit remote add origin Remote_URL\ngit push -u origin main`, 'git')}
                            className="absolute top-2.5 right-2.5 p-1.5 bg-slate-800 hover:bg-slate-750 hover:text-white border border-slate-700 rounded-lg text-slate-400 transition-all flex items-center gap-1.5 cursor-pointer font-sans"
                          >
                            {copiedText === 'git' ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-[9px] font-bold text-emerald-400">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span className="text-[9px] font-bold">Copy commands</span>
                              </>
                            )}
                          </button>
                          
                          <p className="text-slate-500"># Initialise local repository</p>
                          <p><span className="text-blue-400">git</span> init</p>
                          <p><span className="text-blue-400">git</span> add .</p>
                          <p><span className="text-blue-400">git</span> commit -m <span className="text-emerald-300">"Deploying Oman Financial Toolkit"</span></p>
                          <p><span className="text-slate-500"># Link with newly created repository and push</span></p>
                          <p><span className="text-blue-400">git</span> remote add origin &lt;YOUR_REPO_URL&gt;</p>
                          <p><span className="text-blue-400">git</span> push -u origin main</p>
                        </div>
                      </div>

                      <div className="md:col-span-5 bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-3.5">
                        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block leading-none">Continuous Delivery Settings</span>
                        
                        <div className="space-y-4 font-semibold text-slate-850">
                          <div className="flex gap-2 items-center text-[10px] text-slate-500">
                            <Server className="w-4 h-4 text-blue-500" />
                            <span>Recommended Build Configurations:</span>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-[11px]">
                            <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                              <span className="text-[9px] text-slate-400 uppercase block tracking-wider font-extrabold pb-0.5">Build Command</span>
                              <code className="font-mono text-slate-900 font-bold text-[9.5px]">npm run build</code>
                            </div>
                            <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                              <span className="text-[9px] text-slate-400 uppercase block tracking-wider font-extrabold pb-0.5">Output Folder</span>
                              <code className="font-mono text-slate-900 font-bold text-[9.5px]">dist</code>
                            </div>
                          </div>

                          <p className="text-[10px] text-slate-400 font-medium">
                            Once connected, every time you push to GitHub, Vercel/Netlify will compile and make your site live immediately!
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'domain' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      <div className="md:col-span-8 space-y-4">
                        <h4 className="font-bold text-slate-900 text-sm">Register Domain Name (.om) & Setup DNS Parameters</h4>
                        <p className="text-slate-500 leading-relaxed text-[11px]">
                          To link your company domain name (example: <code className="font-mono bg-slate-100 px-1 rounded">finance.om</code> or <code className="font-mono bg-slate-100 px-1 rounded">yourcom.com</code>) to your online web app, copy these settings to your DNS Registrar (such as Tra.om local registrars, GoDaddy, or Cloudflare):
                        </p>

                        <div className="border border-slate-250 rounded-xl overflow-hidden shadow-xs">
                          <table className="w-full text-left font-semibold text-slate-800 bg-white border-none">
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] font-bold">
                              <tr>
                                <th className="p-2.5 px-4">DNS Record Type</th>
                                <th className="p-2.5">Name / Host</th>
                                <th className="p-2.5">Target Web Host IP / Address</th>
                                <th className="p-2.5 text-right px-4">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-150 text-[11px]">
                              <tr>
                                <td className="p-2.5 px-4 font-bold text-blue-600"><span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase">A Record</span></td>
                                <td className="p-2.5 font-mono">@</td>
                                <td className="p-2.5 font-mono text-slate-900">76.76.21.21 <span className="text-slate-400 text-[9px] font-sans font-medium">(Standard Vercel host IP)</span></td>
                                <td className="p-2.5 text-right px-4">
                                  <button onClick={() => handleCopyText('76.76.21.21', 'dns')} className="text-[10px] text-blue-600 hover:underline">
                                    Copy IP
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td className="p-2.5 px-4 font-bold text-purple-600"><span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase">CNAME</span></td>
                                <td className="p-2.5 font-mono">www</td>
                                <td className="p-2.5 font-mono text-slate-900">cname.vercel-dns.com</td>
                                <td className="p-2.5 text-right px-4">
                                  <button onClick={() => handleCopyText('cname.vercel-dns.com', 'dns')} className="text-[10px] text-blue-600 hover:underline">
                                    Copy Link
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="md:col-span-4 bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col justify-between">
                        <div className="space-y-3">
                          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block leading-none">Database Credentials Note</span>
                          <p className="font-space font-bold text-slate-900 text-xs">Interactive Cloud Synchronization</p>
                          <p className="text-[11px] text-slate-500 leading-normal">
                            To persist your invoices and calculations across sessions, provide your live credentials in the project configuration:
                          </p>
                          <div className="bg-slate-900 text-slate-200 p-3.5 rounded-xl border border-slate-800 font-mono text-[10.5px] space-y-1 shrink-0 select-all leading-normal">
                            <div className="text-slate-500"># Set these in your Secrets tab:</div>
                            <div>VITE_SUPABASE_URL="https://your-project.supabase.co"</div>
                            <div>VITE_SUPABASE_ANON_KEY="your-anon-key..."</div>
                          </div>
                        </div>

                        {copiedText === 'dns' && (
                          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] p-2 rounded-lg font-bold text-center mt-3">
                            ✅ IP copied successfully!
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === 'cloudflare' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-fade-in">
                      <div className="md:col-span-8 space-y-5">
                        <div className="space-y-1.5">
                          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
                            Cloudflare Pages Configuration Guides ☄️
                          </h4>
                          <p className="text-slate-600 leading-relaxed text-[11px] font-medium">
                            Cloudflare Pages delivers ultra-fast worldwide edge hosting. Because this Oman Finance Toolkit is built using modern Vite, it compiles into highly optimized static pages.
                          </p>
                        </div>

                        {/* Critical troubleshooting callout for the exact ENOENT packaging error */}
                        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-5 space-y-3.5 shadow-sm">
                          <div className="flex items-center gap-2 text-amber-950 font-bold text-xs">
                            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 animate-bounce" />
                            <span>Fixing Your Cloudflare Build Error: "Could not read package.json (ENOENT)" ⚠️</span>
                          </div>
                          
                          <div className="text-[12px] text-amber-900 leading-relaxed space-y-3">
                            <p className="font-semibold">
                              Your logs show: <code className="font-mono bg-red-100 text-red-700 px-1 rounded text-[11px]">Could not read package.json: Error: ENOENT: no such file or directory, open '/opt/buildhome/repo/package.json'</code>
                            </p>
                            
                            <p className="text-slate-700 text-[11.5px]">
                              Excellent news: <strong>your code is completely perfect and error-free!</strong> This build error only happens because of how files are uploaded to GitHub. Cloudflare expects <code className="font-mono text-slate-900 bg-amber-100/50 px-1 rounded font-semibold text-[10.5px]">package.json</code> to be directly on the front page of your repository. If files are uploaded inside a subfolder, Cloudflare cannot find them.
                            </p>

                            <div className="bg-white/95 rounded-xl border border-amber-200 p-4 space-y-4">
                              <div>
                                <h5 className="font-bold text-slate-900 text-xs flex items-center gap-1.5 border-b border-slate-100 pb-1.5 mb-2">
                                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] font-bold">✓</span>
                                  Solution 1: Fix inside Cloudflare (Easiest - 10 Seconds)
                                </h5>
                                <p className="text-[11px] text-slate-650 leading-relaxed">
                                  You do not need to re-upload or change your GitHub repository! Just point Cloudflare to your folder:
                                </p>
                                <ol className="list-decimal pl-4.5 space-y-1.5 text-[11px] text-slate-755 font-medium mt-1.5">
                                  <li>Go to your <strong>Cloudflare Pages Dashboard</strong> &rarr; Select your Project.</li>
                                  <li>Click the tab <strong>Settings</strong> &rarr; Then select <strong>Builds & deployments</strong> from the sidebar.</li>
                                  <li>Under <strong>Build Settings</strong>, click the <strong>Edit settings</strong> button.</li>
                                  <li>Locate the <strong>Root directory</strong> field and enter your folder name: <code className="font-mono font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded text-[11px]">om-finance-</code></li>
                                  <li>Save, then go to the <strong>Deployments</strong> tab and click <strong>Retry deployment</strong>!</li>
                                </ol>
                              </div>

                              <div>
                                <h5 className="font-bold text-slate-900 text-xs flex items-center gap-1.5 border-b border-slate-100 pb-1.5 mb-2">
                                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold">✓</span>
                                  Solution 2: Correct GitHub Structure (Best Long-term)
                                </h5>
                                <p className="text-[11px] text-slate-650 leading-relaxed">
                                  If you want a standard, clean direct deployment without configuring any settings, make sure files are uploaded directly to your GitHub homepage (no wrapper folders):
                                </p>
                                <div className="grid grid-cols-2 gap-4 mt-2 font-mono text-[10px] leading-relaxed text-center">
                                  <div className="bg-rose-50/50 p-2 rounded-lg border border-rose-100">
                                    <div className="text-rose-700 font-extrabold text-[11px] mb-1">❌ Incompatible Upload (Current)</div>
                                    <div className="text-slate-500 text-left pl-2">
                                      📁 your-repository/<br/>
                                      &nbsp;&nbsp;📁 <span className="text-rose-600 font-semibold underline">om-finance/</span> &larr; <span className="text-[9px] text-rose-500">nested folder wrapper</span><br/>
                                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 package.json<br/>
                                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 index.html
                                    </div>
                                  </div>
                                  <div className="bg-emerald-50/50 p-2 rounded-lg border border-emerald-100">
                                    <div className="text-emerald-700 font-extrabold text-[11px] mb-1">✓ Correct Direct Upload</div>
                                    <div className="text-slate-500 text-left pl-2">
                                      📁 your-repository/<br/>
                                      &nbsp;&nbsp;📄 <span className="text-emerald-700 font-bold">package.json</span> &larr; <span className="text-[9px] text-emerald-600">at the root level!</span><br/>
                                      &nbsp;&nbsp;📄 index.html<br/>
                                      &nbsp;&nbsp;📁 src/
                                    </div>
                                  </div>
                                </div>
                                <p className="text-[10.5px] text-slate-500 mt-2 leading-relaxed">
                                  To fix the upload: Open your folder locally on your computer, <strong>select all contents inside the folder</strong> (not the folder itself), and drag and drop those direct files into your GitHub repository screen.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="border border-slate-205 rounded-xl overflow-hidden shadow-xs bg-white">
                          <table className="w-full text-left font-semibold text-slate-800 border-none">
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] font-bold">
                              <tr>
                                <th className="p-3 px-4">Deployment Parameter</th>
                                <th className="p-3">Required Input Value</th>
                                <th className="p-3 text-right px-4">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-150 text-[11px]">
                              <tr>
                                <td className="p-3 px-4 font-bold text-slate-900">Framework Preset</td>
                                <td className="p-3 font-mono text-indigo-600">Vite / React</td>
                                <td className="p-3 text-right px-4 text-slate-400 font-medium font-sans">Auto-detected</td>
                              </tr>
                              <tr>
                                <td className="p-3 px-4 font-bold text-slate-900">Build Command</td>
                                <td className="p-3 font-mono text-slate-950 bg-slate-50/50 rounded max-w-fit px-1.5 border border-slate-200">npm run build</td>
                                <td className="p-3 text-right px-4">
                                  <button type="button" onClick={() => handleCopyText('npm run build', 'cf')} className="text-[10px] text-orange-600 font-bold hover:underline cursor-pointer">
                                    Copy Command
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td className="p-3 px-4 font-bold text-slate-900">Build Output Directory</td>
                                <td className="p-3 font-mono text-slate-950 bg-slate-50/50 rounded max-w-fit px-1.5 border border-slate-200">dist</td>
                                <td className="p-3 text-right px-4">
                                  <button type="button" onClick={() => handleCopyText('dist', 'cf')} className="text-[10px] text-orange-600 font-bold hover:underline cursor-pointer">
                                    Copy Path
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td className="p-3 px-4 font-bold text-slate-900">Root Directory</td>
                                <td className="p-3 font-mono text-slate-500">/ <span className="text-[10px] text-slate-400 font-sans font-medium">(or your subfolder name)</span></td>
                                <td className="p-3 text-right px-4 text-slate-400 font-medium font-sans">Customise if nested</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Wrangler manual CLI command alternative */}
                        <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-[10px] space-y-2 relative group animate-fade-in">
                          <button
                            type="button"
                            onClick={() => handleCopyText('npx wrangler pages deploy dist', 'cf')}
                            className="absolute top-2.5 right-2.5 p-1.5 bg-slate-800 hover:bg-slate-750 hover:text-white border border-slate-700 rounded-lg text-slate-400 transition-all flex items-center gap-1.5 cursor-pointer font-sans"
                          >
                            {copiedText === 'cf' ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-[9px] font-bold text-emerald-400">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 text-orange-400" />
                                <span className="text-[9px] font-bold">Copy Wrangler Command</span>
                              </>
                            )}
                          </button>
                          
                          <p className="text-slate-500"># Alternative: Instantly publish directly via Cloudflare CLI (Wrangler)</p>
                          <p><span className="text-orange-400">npx</span> wrangler pages deploy <span className="text-blue-300">dist</span></p>
                        </div>
                      </div>

                      <div className="md:col-span-4 bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col justify-between">
                        <div className="space-y-3.5">
                          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block leading-none">Cloudflare Best Practice</span>
                          <p className="font-space font-bold text-slate-900 text-xs">Continuous Git deployments</p>
                          <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                            Every time you commit changes to your connected GitHub branch, Cloudflare automatically triggers an optimized production build globally on their edge network in seconds.
                          </p>
                          <p className="text-[11px] text-slate-405 font-medium">
                            Configure your custom <strong className="text-slate-600">.om</strong> domain under the "Custom Domains" tab inside your Cloudflare Pages dashboard.
                          </p>
                        </div>

                        {copiedText === 'cf' && (
                          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] p-2.5 rounded-lg font-bold text-center mt-3">
                            ✅ Copied setup parameter to Clipboard!
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          )}

          <Outlet />
        </main>
      </div>
    </div>
  );
}
