import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Opens default mail client with pre-filled details
    const mailtoLink = `mailto:contact@om-finance.pages.dev?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
  };

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
      <section className="pt-32 pb-12 bg-gradient-to-b from-blue-50/40 via-white to-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-space font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="text-slate-600 text-base max-w-xl mx-auto leading-relaxed">
            Have a question, suggestion, or found an issue with our tools? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Contact Info */}
          <div className="space-y-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
              <h2 className="font-space font-bold text-base text-slate-900">Get in Touch</h2>

              <div className="flex gap-3 items-start">
                <div className="p-2.5 bg-blue-50 rounded-lg border border-blue-100 shrink-0">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 mb-0.5">Email</p>
                  <p className="text-xs text-slate-500">contact@om-finance.pages.dev</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-100 shrink-0">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 mb-0.5">Location</p>
                  <p className="text-xs text-slate-500">Muscat, Sultanate of Oman 🇴🇲</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-100 shrink-0">
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 mb-0.5">Response Time</p>
                  <p className="text-xs text-slate-500">Within 24-48 hours (Sun–Thu)</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
              <h3 className="font-bold text-blue-900 text-xs mb-2">Quick Links</h3>
              <div className="space-y-2 text-xs">
                <Link to="/about" className="block text-blue-700 hover:underline">→ About Us</Link>
                <Link to="/privacy" className="block text-blue-700 hover:underline">→ Privacy Policy</Link>
                <Link to="/signup" className="block text-blue-700 hover:underline">→ Create Free Account</Link>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            {submitted ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-4 h-full">
                <div className="p-4 bg-emerald-50 rounded-full border border-emerald-100">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-space font-bold text-xl text-slate-900">Message Sent!</h3>
                <p className="text-sm text-slate-500 max-w-sm">Your email client should have opened. We'll get back to you within 24-48 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-sm text-blue-600 hover:underline font-semibold"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-8">
                <h2 className="font-space font-bold text-base text-slate-900 mb-6">Send us a Message</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Your Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})}
                        placeholder="Ahmed Al-Rashdi"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm({...form, email: e.target.value})}
                        placeholder="ahmed@company.om"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Subject</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={e => setForm({...form, subject: e.target.value})}
                      placeholder="Question about VAT calculator"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Message</label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={e => setForm({...form, message: e.target.value})}
                      placeholder="Tell us how we can help you..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>

                  <p className="text-xs text-slate-400 text-center">
                    By submitting this form you agree to our <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Oman Finance Toolkit. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
