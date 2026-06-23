import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Receipt, 
  Coins, 
  Award, 
  ArrowRight, 
  ShieldCheck, 
  FileCheck2,
  BookOpen,
  Clock,
  Calendar,
  User,
  X
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

  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  const blogPosts = [
    {
      id: 'vat-guide-oman',
      title: "Understanding Oman's 5% VAT: A Comprehensive Guide for Businesses",
      excerpt: "Learn how the standard Value Added Tax (VAT) rate applies to Omani corporations, thresholds for mandatory registration, and VAT-exempt categories under the Tax Authority guidelines.",
      content: `
        <p class="mb-4 text-slate-600 leading-relaxed">The Sultanate of Oman introduced Value Added Tax (VAT) at a standard rate of 5% in April 2021 under Royal Decree No. 121/2020.</p>
        <h3 class="text-slate-900 font-bold text-base mt-6 mb-2">Who Must Register for VAT in Oman?</h3>
        <ul class="list-disc pl-5 mb-4 space-y-1.5 text-slate-650 text-sm">
          <li><strong>Mandatory Registration Threshold:</strong> Annual supplies exceeding <strong>OMR 38,500</strong>.</li>
          <li><strong>Voluntary Registration Threshold:</strong> Annual supplies exceeding <strong>OMR 19,250</strong>.</li>
        </ul>
        <h3 class="text-slate-900 font-bold text-base mt-6 mb-2">VAT Exemptions in Oman</h3>
        <ul class="list-disc pl-5 mb-4 space-y-1.5 text-slate-650 text-sm">
          <li>Basic food items (around 488 listed items).</li>
          <li>Healthcare services and associated medical goods.</li>
          <li>Educational services.</li>
          <li>Financial services and public transport.</li>
        </ul>
      `,
      tag: 'Taxation & VAT',
      date: 'June 20, 2026',
      readTime: '5 min read',
      author: 'Oman Finance Advisory Team'
    },
    {
      id: 'pasi-pension-calculations',
      title: "Social Insurance and pension breakdowns for Employees in Oman",
      excerpt: "A guide to understanding how PASI is deducted from basic salary and allowances for Omani nationals versus expat staff.",
      content: `
        <p class="mb-4 text-slate-600 leading-relaxed">The Public Authority for Social Insurance (PASI) manages retirement benefits for Omani nationals in the private sector.</p>
        <h3 class="text-slate-900 font-bold text-base mt-6 mb-2">Deduction Breakdown</h3>
        <ul class="list-disc pl-5 mb-4 space-y-1.5 text-slate-650 text-sm">
          <li><strong>Employee Contribution:</strong> 7% of total monthly basic salary.</li>
          <li><strong>Employer Contribution:</strong> 11.5% - 12.5%.</li>
          <li><strong>Government Contribution:</strong> 1%.</li>
        </ul>
      `,
      tag: 'Payroll & Pension',
      date: 'May 14, 2026',
      readTime: '4 min read',
      author: 'HR Consulting Group Muscat'
    },
    {
      id: 'gratuity-calculation-guide',
      title: "Omani Labour Law: How to accurately compute End of Service Gratuity",
      excerpt: "Step-by-step methodology under Oman's Royal Decrees to compute expatriate gratuity packages.",
      content: `
        <p class="mb-4 text-slate-600 leading-relaxed">Non-Omani workers are eligible for end of service benefits (gratuity) at the end of their contracts.</p>
        <h3 class="text-slate-900 font-bold text-base mt-6 mb-2">The Two-Tier Calculation Formula</h3>
        <ul class="list-disc pl-5 mb-4 space-y-1.5 text-slate-650 text-sm">
          <li><strong>First 3 Years:</strong> 15 days of basic pay per year.</li>
          <li><strong>4th Year and Beyond:</strong> 30 days of basic pay per year.</li>
        </ul>
      `,
      tag: 'Labour Law',
      date: 'May 02, 2026',
      readTime: '6 min read',
      author: 'Oman Legal Partners'
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

      {/* Blog Section */}
      <section id="blog-section" className="py-20 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-blue-600 tracking-widest uppercase flex items-center gap-1.5 mb-2">
                <BookOpen className="w-4 h-4 shrink-0" />
                Sultanate Finance Learning Hub
              </span>
              <h3 className="font-space text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Latest Financial & Corporate Advice 🇴🇲
              </h3>
              <p className="text-slate-500 text-sm mt-2 max-w-xl">
                Read deep-dives on regulations, corporate taxes, and retirement benefit schemas provided directly by our consulting partners.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div 
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:border-blue-500/20 transition-all duration-300 flex flex-col group"
              >
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-md border border-blue-100">
                      {post.tag}
                    </span>
                    <span className="text-slate-400 text-[11px] flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <h4 className="font-space font-bold text-base text-slate-900 group-hover:text-blue-600 leading-snug transition-colors mb-2">
                    {post.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium mb-6 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="border-t border-slate-100 pt-4 mt-auto flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="text-blue-600 font-bold group-hover:underline">Read Article →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-100 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setSelectedPost(null)}>
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-150 flex items-start justify-between gap-4 bg-slate-50">
              <div>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2.5 py-1 rounded-md border border-blue-200 uppercase tracking-wider block w-max mb-2">
                  {selectedPost.tag}
                </span>
                <h4 className="font-space font-extrabold text-xl text-slate-900 leading-snug">{selectedPost.title}</h4>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 mt-2 font-medium">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-400" /> {selectedPost.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> {selectedPost.readTime}</span>
                  <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-slate-400" /> {selectedPost.author}</span>
                </div>
              </div>
              <button onClick={() => setSelectedPost(null)} className="text-slate-400 hover:text-slate-700 p-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-8 overflow-y-auto text-sm text-slate-700 leading-relaxed">
              <div className="prose max-w-none text-slate-600 text-[13px] leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-150 flex justify-end">
              <button onClick={() => setSelectedPost(null)} className="bg-slate-900 text-white font-semibold hover:bg-slate-800 px-5 py-2.5 rounded-xl text-xs transition-all">
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl">🇴🇲</span>
            <span className="font-space font-bold text-white tracking-tight">Oman Finance Toolkit</span>
          </div>
          <p className="max-w-md mx-auto text-xs text-slate-500">
            A secure finance management suite compliant with Sultanate tax regulations and corporate guidelines.
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link to="/about" className="text-xs text-slate-400 hover:text-white transition-all">About Us</Link>
            <Link to="/privacy" className="text-xs text-slate-400 hover:text-white transition-all">Privacy Policy</Link>
            <Link to="/contact" className="text-xs text-slate-400 hover:text-white transition-all">Contact Us</Link>
          </div>
          <div className="pt-4 border-t border-slate-800 text-xs text-slate-600">
            © {new Date().getFullYear()} Oman Finance Toolkit. All rights reserved. Made in GCC.
          </div>
        </div>
      </footer>
    </div>
  );
}