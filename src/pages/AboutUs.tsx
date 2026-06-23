import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, FileCheck2, Award, Coins } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-2xl">🇴🇲</span>
            <div>
              <h1 className="font-space font-bold text-lg text-slate-900 tracking-tight leading-none">Oman Finance</h1>
              <span className="text-[10px] text-slate-500 font-semibold tracking-widest">TOOLKIT</span>
            </div>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-all">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50/40 via-white to-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-5xl mb-6 block">🇴🇲</span>
          <h1 className="font-space font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
            About Oman Finance Toolkit
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            A free, comprehensive finance tool suite built specifically for businesses, HR professionals, and entrepreneurs operating in the Sultanate of Oman.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-6 text-sm text-slate-600 leading-relaxed">

            <div>
              <h2 className="font-space font-bold text-xl text-slate-900 mb-3">Our Mission</h2>
              <p>Oman Finance Toolkit was created to simplify financial compliance for businesses in the Sultanate of Oman. We noticed that many SMEs, HR teams, and accountants in Muscat and across Oman struggled with accurate VAT calculations, salary processing, and gratuity computations — often relying on manual spreadsheets prone to errors.</p>
            </div>

            <div>
              <h2 className="font-space font-bold text-xl text-slate-900 mb-3">What We Offer</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {[
                  { icon: FileCheck2, color: 'text-emerald-600 bg-emerald-50 border-emerald-100', title: 'VAT Calculator', desc: 'Accurate 5% Oman VAT calculations compliant with Oman Tax Authority guidelines.' },
                  { icon: Coins, color: 'text-blue-600 bg-blue-50 border-blue-100', title: 'Salary Calculator', desc: 'Full salary breakdown with PASI pension deductions for Omani and expat employees.' },
                  { icon: Award, color: 'text-amber-600 bg-amber-50 border-amber-100', title: 'Gratuity Calculator', desc: 'End of service gratuity computed under the latest Oman Labour Law.' },
                  { icon: ShieldCheck, color: 'text-rose-600 bg-rose-50 border-rose-100', title: 'Tax Invoices', desc: 'Bilingual Arabic/English tax invoice templates ready for printing and sharing.' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 flex gap-3">
                      <div className={`p-2.5 rounded-lg border ${item.color} shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-xs mb-1">{item.title}</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="font-space font-bold text-xl text-slate-900 mb-3">Who We Serve</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Small and medium enterprises (SMEs) registered in Oman</li>
                <li>HR managers and payroll professionals in Muscat and across GCC</li>
                <li>Accountants and finance consultants handling Omani clients</li>
                <li>Expatriate workers calculating their end of service benefits</li>
                <li>Entrepreneurs and startup founders managing their own finances</li>
              </ul>
            </div>

            <div>
              <h2 className="font-space font-bold text-xl text-slate-900 mb-3">Our Commitment</h2>
              <p>All calculations are based on the latest Sultanate of Oman regulations including Royal Decree No. 121/2020 (VAT Law), the Oman Labour Law, and PASI social insurance guidelines. We update our tools whenever regulations change to ensure accuracy and compliance.</p>
            </div>

            <div>
              <h2 className="font-space font-bold text-xl text-slate-900 mb-3">Privacy & Security</h2>
              <p>Your financial data is processed locally on your device in Sandbox mode and is never shared with third parties. We take data privacy seriously and are committed to keeping your information secure. Read our full <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link> for more details.</p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-space font-bold text-2xl mb-4">Start Using Our Free Tools Today</h2>
          <p className="text-slate-400 text-sm mb-8">No credit card required. Free forever for basic use.</p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all shadow-lg"
          >
            Get Started Free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Oman Finance Toolkit. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
