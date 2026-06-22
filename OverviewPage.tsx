import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Receipt, 
  Coins, 
  TrendingUp, 
  Award, 
  FileText, 
  Plus, 
  Trash2, 
  History, 
  TrendingDown, 
  Building2, 
  FileCheck2, 
  Briefcase,
  ExternalLink
} from 'lucide-react';
import { dataService } from '../lib/dataService';
import { Invoice, SavedCalculation } from '../types';

export default function OverviewPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [calculations, setCalculations] = useState<SavedCalculation[]>([]);
  const [stats, setStats] = useState({
    totalInvoiced: 0,
    totalVat: 0,
    activeCount: 0,
    avgValue: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      try {
        const { data: invs } = await dataService.getInvoices();
        const { data: calcs } = await dataService.getCalculations();
        
        setInvoices(invs || []);
        setCalculations(calcs || []);

        // Compute dynamic business stats
        if (invs && invs.length > 0) {
          const totalInvoiced = invs.reduce((sum, item) => sum + item.total, 0);
          const totalVat = invs.reduce((sum, item) => sum + item.vat_amount, 0);
          const avgValue = totalInvoiced / invs.length;
          setStats({
            totalInvoiced,
            totalVat,
            activeCount: invs.length,
            avgValue
          });
        } else {
          setStats({
            totalInvoiced: 0,
            totalVat: 0,
            activeCount: 0,
            avgValue: 0
          });
        }
      } catch (err) {
        console.error('Failed to load overview data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleDeleteCalc = async (id: string) => {
    await dataService.deleteCalculation(id);
    setCalculations(prev => prev.filter(c => c.id !== id));
  };

  const formattedCurrency = (val: number) => {
    return val.toLocaleString('en-US', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }) + ' OMR';
  };

  const calculatorLinks = [
    { title: 'VAT Calculator 🧾', desc: 'Sultanate standard 5% VAT calculations', path: '/vat', icon: Receipt, color: 'text-emerald-500 bg-emerald-500/10' },
    { title: 'Salary Calculator 💰', desc: 'Salary slip deductions & PASI pension shares', path: '/salary', icon: Coins, color: 'text-blue-500 bg-blue-500/10' },
    { title: 'Tax Invoice Templates 🧾', desc: 'Select & build compliant bilingual Oman VAT bills', path: '/invoice', icon: FileText, color: 'text-rose-500 bg-rose-500/10' },
    { title: 'End Of Service Gratuity 🏆', desc: 'Sultanate Labour Law gratuity projections', path: '/end-of-service', icon: Award, color: 'text-amber-500 bg-amber-500/10' }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* SaaS Premium Welcome Back Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg border border-slate-800">
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">Sultanate of Oman</span>
            <h1 className="font-space text-2xl md:text-3xl font-bold tracking-tight text-white mt-1">
              Smart Finance Board <span className="text-3xl">🇴🇲</span>
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              Compute taxes, track payroll deductions and manage client invoices utilizing standardized GCC fintech rules and ratios.
            </p>
          </div>
          <Link
            to="/invoice"
            className="self-start md:self-center flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg shadow-blue-500/20 transition-all shrink-0 hover:scale-[1.01]"
          >
            <Plus className="w-4 h-4" />
            Create Client Invoice
          </Link>
        </div>
      </div>

      {/* Stats Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-200/60 shadow-xs p-6 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-semibold tracking-wide uppercase">Total Billable Sales</span>
            <p className="font-space text-lg sm:text-xl font-bold text-slate-900">{formattedCurrency(stats.totalInvoiced)}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 shadow-xs p-6 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-semibold tracking-wide uppercase">VAT Collected (5%)</span>
            <p className="font-space text-lg sm:text-xl font-bold text-slate-900">{formattedCurrency(stats.totalVat)}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <Receipt className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 shadow-xs p-6 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-semibold tracking-wide uppercase">Invoices Created</span>
            <p className="font-space text-lg sm:text-xl font-bold text-slate-900">{stats.activeCount} Invoices</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
            <FileCheck2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 shadow-xs p-6 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-semibold tracking-wide uppercase">Avg Invoice Size</span>
            <p className="font-space text-lg sm:text-xl font-bold text-slate-900">{formattedCurrency(stats.avgValue)}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Board Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Core Tools Quick Links */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-space font-bold text-slate-900 text-lg">Fintech Calculations</h3>
            <span className="text-xs text-slate-500">Launch any calculator instantly</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {calculatorLinks.map((link, i) => {
              const Icon = link.icon;
              return (
                <div 
                  key={i} 
                  onClick={() => navigate(link.path)}
                  className="bg-white hover:bg-slate-50/50 border border-slate-200/60 p-5 rounded-2xl cursor-pointer transition-all shadow-xs hover:shadow-md hover:border-slate-300/80 hover:translate-y-[-1px] group flex flex-col justify-between h-44"
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl ${link.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-slate-400 group-hover:text-blue-600 text-xs flex items-center gap-1 font-bold">
                      Open <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-space font-extrabold text-slate-900 text-base">{link.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{link.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Omani Business Regulations Quick Cheat Sheet */}
          <div className="bg-white border border-slate-200/60 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Building2 className="w-5 h-5 text-blue-600" />
              <h4 className="font-space font-bold text-slate-900 text-sm sm:text-base">Oman & GCC Business Rules Cheat Sheet</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-200/30">
                <span className="font-bold text-slate-900 text-xs block">🇴🇲 standard VAT</span>
                <p className="text-slate-600 leading-relaxed">
                  The standard VAT rate is <strong>5%</strong> on most goods and services as enforced by the Oman Tax Authority (OTA). Registrations require correct bilingual listings on Tax invoices.
                </p>
              </div>

              <div className="space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-200/30">
                <span className="font-bold text-slate-900 text-xs block">💼 Social Pension (PASI)</span>
                <p className="text-slate-600 leading-relaxed">
                  For Omani nationals: Employee payroll deduction is <strong>7%</strong> of the sum of (Basic + Allowance elements). Employers pay <strong>11.5%</strong>, and another 1% security is standard.
                </p>
              </div>

              <div className="space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-200/30">
                <span className="font-bold text-slate-900 text-xs block">🎓 End Of Service Gratuity</span>
                <p className="text-slate-600 leading-relaxed">
                  Omani Labor Law enforces: <strong>15 days</strong> of basic salary per year for first 3 years of service. Thereafter, <strong>30 days</strong> of basic salary for each following year of service.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Saved Calculation History Panel */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-space font-bold text-slate-900 text-lg flex items-center gap-1.5">
              <History className="w-4.5 h-4.5 text-blue-600" />
              Saved History
            </h3>
            <span className="text-xs text-slate-500">{calculations.length} stored</span>
          </div>

          <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-xs space-y-3 max-h-[500px] overflow-y-auto">
            {calculations.length === 0 ? (
              <div className="text-center py-10 space-y-2">
                <History className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs text-slate-500 font-medium">No saved calculations yet</p>
                <p className="text-[10px] text-slate-400">Compute VAT, Salaries, or Gratuity to save histories here.</p>
              </div>
            ) : (
              calculations.map((calc) => (
                <div key={calc.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 relative group hover:border-slate-300/80 transition-all">
                  <button 
                    onClick={() => handleDeleteCalc(calc.id)}
                    className="absolute right-3.5 top-3.5 p-1 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 border border-transparent transition-all"
                    title="Delete record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      {calc.type === 'vat' ? '🧾 VAT Calculation' :
                       calc.type === 'salary' ? '💰 Salary Calculation' : '🏆 Gratuity Computation'}
                    </span>
                    <h5 className="font-extrabold text-slate-900 max-w-[90%] truncate">{calc.title}</h5>
                    <p className="text-[10px] text-slate-400">
                      {new Date(calc.created_at).toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>

                    {/* Show quick outputs depending on type */}
                    <div className="mt-2.5 pt-2 border-t border-slate-200/60 grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-600">
                      {calc.type === 'vat' && (
                        <>
                          <div>VAT: <strong className="text-emerald-600">{calc.outputs.vat_amount} OMR</strong></div>
                          <div>Total: <strong className="text-slate-900">{calc.outputs.total_amount} OMR</strong></div>
                        </>
                      )}
                      {calc.type === 'salary' && (
                        <>
                          <div>Net Salary: <strong className="text-blue-600">{calc.outputs.net_salary} OMR</strong></div>
                          {calc.outputs.pasi_deduction && (
                            <div>PASI Dec: <strong className="text-red-500">{calc.outputs.pasi_deduction} OMR</strong></div>
                          )}
                        </>
                      )}
                      {calc.type === 'end-of-service' && (
                        <>
                          <div>Service: <strong className="text-slate-900">{calc.inputs.years_of_service} Yrs</strong></div>
                          <div>Gratuity: <strong className="text-amber-600">{calc.outputs.gratuity_total} OMR</strong></div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
