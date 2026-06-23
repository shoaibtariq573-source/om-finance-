import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
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

      {/* Content */}
      <main className="pt-32 pb-20 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="font-space font-bold text-2xl text-slate-900">Privacy Policy</h1>
            <p className="text-sm text-slate-500">Last updated: June 2026</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-8 text-sm text-slate-600 leading-relaxed">

          <section>
            <h2 className="font-space font-bold text-base text-slate-900 mb-3">1. Introduction</h2>
            <p>Welcome to Oman Finance Toolkit ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website at <strong>om-finance.pages.dev</strong>.</p>
          </section>

          <section>
            <h2 className="font-space font-bold text-base text-slate-900 mb-3">2. Information We Collect</h2>
            <p className="mb-3">We may collect the following types of information:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Account Information:</strong> Email address when you sign up or log in.</li>
              <li><strong>Usage Data:</strong> Pages visited, tools used, and time spent on the site collected via Google Analytics.</li>
              <li><strong>Local Storage Data:</strong> Financial calculations you perform are stored locally on your device and are never transmitted to our servers in Sandbox mode.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-space font-bold text-base text-slate-900 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To provide and maintain our financial calculator services.</li>
              <li>To improve and personalize your experience on our platform.</li>
              <li>To analyze usage patterns and improve our tools.</li>
              <li>To communicate important updates about our service.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-space font-bold text-base text-slate-900 mb-3">4. Google Analytics</h2>
            <p>We use Google Analytics to understand how visitors interact with our website. Google Analytics collects information such as how often users visit the site, what pages they visit, and what other sites they used prior to coming to our site. We use this information to improve our services. Google's ability to use and share information collected by Google Analytics is restricted by the <a href="https://marketingplatform.google.com/about/analytics/terms/us/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Terms of Service</a>.</p>
          </section>

          <section>
            <h2 className="font-space font-bold text-base text-slate-900 mb-3">5. Data Security</h2>
            <p>We implement appropriate technical and organizational security measures to protect your information. In Sandbox mode, all financial data remains on your local device and is never sent to external servers. We use industry-standard encryption and secure connections (HTTPS) across our platform.</p>
          </section>

          <section>
            <h2 className="font-space font-bold text-base text-slate-900 mb-3">6. Third-Party Services</h2>
            <p>Our service may contain links to third-party websites. We are not responsible for the privacy practices of these sites and encourage you to review their privacy policies. We use the following third-party services:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li><strong>Google Analytics</strong> — for website traffic analysis</li>
              <li><strong>Cloudflare Pages</strong> — for website hosting and security</li>
              <li><strong>Supabase</strong> — for optional cloud data storage (when configured)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-space font-bold text-base text-slate-900 mb-3">7. Cookies</h2>
            <p>We use cookies and similar tracking technologies to improve your experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some parts of our service may not function properly.</p>
          </section>

          <section>
            <h2 className="font-space font-bold text-base text-slate-900 mb-3">8. Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access the personal information we hold about you.</li>
              <li>Request correction of inaccurate personal data.</li>
              <li>Request deletion of your personal data.</li>
              <li>Opt out of marketing communications at any time.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-space font-bold text-base text-slate-900 mb-3">9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page with an updated date. We encourage you to review this Privacy Policy periodically.</p>
          </section>

          <section>
            <h2 className="font-space font-bold text-base text-slate-900 mb-3">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us through our <Link to="/contact" className="text-blue-600 hover:underline">Contact page</Link>.</p>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Oman Finance Toolkit. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
