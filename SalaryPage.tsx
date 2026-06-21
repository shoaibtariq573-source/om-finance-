import React, { useState } from 'react';
import { dataService } from '../lib/dataService';
import { Coins, Save, BookmarkCheck, LayoutGrid, Info, HelpCircle } from 'lucide-react';

export default function SalaryPage() {
  const [basicSalary, setBasicSalary] = useState<number | ''>(500);
  const [allowances, setAllowances] = useState<number | ''>(200);
  const [deductions, setDeductions] = useState<number | ''>(0);
  const [citizenship, setCitizenship] = useState<'omani' | 'expat'>('omani');
  
  // Custom PASI percentages (in Oman, standard is 7% employee, 11.5% employer)
  const [pasiEmployeeRate, setPasiEmployeeRate] = useState<number>(7);
  const [pasiEmployerRate, setPasiEmployerRate] = useState<number>(11.5);
  
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  const calculateSalary = () => {
    const basic = basicSalary || 0;
    const allow = allowances || 0;
    const deduct = deductions || 0;
    
    const grossTotal = basic + allow;
    
    let employeePasi = 0;
    let employerPasi = 0;

    if (citizenship === 'omani') {
      // In Oman, PASI is calculated as a percentage of Basic Salary + standard monthly allowances
      employeePasi = grossTotal * (pasiEmployeeRate / 100);
      employerPasi = grossTotal * (pasiEmployerRate / 100);
    }

    const totalDeductions = deduct + employeePasi;
    const netSalary = grossTotal - totalDeductions;
    const companyTotalCost = grossTotal + employerPasi;

    return {
      grossTotal: Number(grossTotal.toFixed(3)),
      pasiDeduction: Number(employeePasi.toFixed(3)),
      pasiEmployerContribution: Number(employerPasi.toFixed(3)),
      totalDeductions: Number(totalDeductions.toFixed(3)),
      netSalary: Number(netSalary.toFixed(3)),
      companyTotalCost: Number(companyTotalCost.toFixed(3)),
    };
  };

  const results = calculateSalary();

  const handleSaveCalculation = async () => {
    const calcTitle = title.trim() || `Salary Slip: ${citizenship === 'omani' ? 'Omani' : 'Expat'} (${basicSalary} Basic)`;
    const { data, error } = await dataService.saveCalculation(
      'salary',
      calcTitle,
      { basicSalary, allowances, deductions, citizenship, pasiEmployeeRate, pasiEmployerRate },
      results
    );

    if (!error) {
      setSavedSuccess(true);
      setTitle('');
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Page header */}
      <div className="relative bg-white border border-slate-200/60 rounded-3xl p-6 shadow-xs overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-blue-500/10 text-blue-600 border border-blue-500/15">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-space font-bold text-slate-900 text-xl">Salary & Payroll Calculator 💰</h1>
            <p className="text-xs text-slate-500">Calculate net salaries, custom deductions, and mandatory Omani citizen PASI pension rates</p>
          </div>
        </div>

        <div className="self-start md:self-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">
          <span className="text-sm">💼</span>
          <span>PASI Compliant (7% / 11.5%)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Input parameters */}
        <div className="bg-white border border-slate-200/60 p-6 rounded-3xl md:col-span-3 space-y-5">
          <h3 className="font-space font-extrabold text-slate-900 text-base">Salary Components</h3>

          {/* Citizen Toggle */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide block">Employee Citizenship</span>
            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200/50">
              <button
                type="button"
                onClick={() => setCitizenship('omani')}
                className={`py-2 px-3 rounded-lg text-xs font-bold text-center transition-all ${
                  citizenship === 'omani'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/30'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Omani National (Mandatory PASI)
              </button>
              <button
                type="button"
                onClick={() => setCitizenship('expat')}
                className={`py-2 px-3 rounded-lg text-xs font-bold text-center transition-all ${
                  citizenship === 'expat'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/30'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Expatriate Resident (No Social Pension)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Basic Salary */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide block">Basic Salary</label>
              <div className="relative rounded-xl">
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={basicSalary}
                  onChange={(e) => setBasicSalary(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold placeholder-slate-400 focus:outline-hidden"
                  placeholder="e.g. 500"
                />
                <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 text-xs font-medium">OMR</span>
              </div>
            </div>

            {/* Monthly Allowances */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide block">Total Allowances</label>
              <div className="relative rounded-xl">
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={allowances}
                  onChange={(e) => setAllowances(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold placeholder-slate-400 focus:outline-hidden"
                  placeholder="Housing, Transport etc"
                />
                <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 text-xs font-medium">OMR</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Other Deductions */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide block">Other Monthly Deductions</label>
              <div className="relative rounded-xl">
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={deductions}
                  onChange={(e) => setDeductions(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold placeholder-slate-400 focus:outline-hidden"
                  placeholder="unpaid leaves, logs"
                />
                <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 text-xs font-medium">OMR</span>
              </div>
            </div>

            {/* Informational display state only when Omani */}
            {citizenship === 'omani' && (
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-2.5 text-xs text-blue-800">
                <Info className="w-4.5 h-4.5 text-blue-500 shrink-0 mt-0.5" />
                <p className="leading-normal font-medium">
                  PASI deductions will apply <strong>{pasiEmployeeRate}%</strong> against total stipends. Your employer adds an extra <strong>{pasiEmployerRate}%</strong>.
                </p>
              </div>
            )}
          </div>

          {/* If Omani, optionally configure PASI parameters */}
          {citizenship === 'omani' && (
            <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl space-y-4">
              <span className="text-xs font-bold text-slate-900 block">Edit Social Insurance (PASI) Settings</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-500 font-semibold block">Employee Contribution Rate (%)</span>
                  <input
                    type="number"
                    step="0.5"
                    value={pasiEmployeeRate}
                    onChange={(e) => setPasiEmployeeRate(parseFloat(e.target.value) || 0)}
                    className="w-full border border-slate-200 bg-white rounded-lg p-2 text-xs font-semibold text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-500 font-semibold block">Employer Contribution Rate (%)</span>
                  <input
                    type="number"
                    step="0.5"
                    value={pasiEmployerRate}
                    onChange={(e) => setPasiEmployerRate(parseFloat(e.target.value) || 0)}
                    className="w-full border border-slate-200 bg-white rounded-lg p-2 text-xs font-semibold text-slate-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Saved calculation name input optional */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="font-space font-extrabold text-slate-900 text-xs uppercase tracking-wider">Save Result to Dashboard</h4>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Optional calculation title (e.g., June Pay: Salim)"
                className="flex-1 px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleSaveCalculation}
                className="px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all shrink-0"
              >
                {savedSuccess ? (
                  <>
                    <BookmarkCheck className="w-4 h-4" />
                    Saved Slip!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Payroll Calculation
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Results Screen */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="bg-slate-900 text-white p-6 rounded-3xl flex-1 flex flex-col justify-between shadow-xl relative overflow-hidden border border-slate-800">
            <div className="absolute right-0 bottom-0 w-44 h-44 bg-blue-600/10 rounded-full blur-2xl"></div>

            <h3 className="font-space font-extrabold text-slate-300 text-xs uppercase tracking-wide">Take-Home Compensation</h3>

            <div className="space-y-5 mt-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Calculated Net salary</span>
                <p className="font-space text-3xl font-extrabold text-white">
                  {results.netSalary.toLocaleString('en-US', { minimumFractionDigits: 3 })} <span className="text-sm font-sans font-medium text-slate-400">OMR</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-4 text-xs font-semibold">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Gross Pay (Basic + Allow)</span>
                  <span className="text-slate-200 font-space text-sm">{results.grossTotal.toLocaleString('en-US', { minimumFractionDigits: 3 })} OMR</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Monthly PASI Pension</span>
                  <span className="text-red-400 font-space text-sm">-{results.pasiDeduction.toLocaleString('en-US', { minimumFractionDigits: 3 })} OMR</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-800/60 pt-4 text-xs font-semibold">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Other Custom Deducts</span>
                  <span className="text-red-400 font-space text-sm">-{((deductions || 0)).toLocaleString('en-US', { minimumFractionDigits: 3 })} OMR</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Total Monthly Savings</span>
                  <span className="text-slate-200 font-space text-sm">{results.totalDeductions.toLocaleString('en-US', { minimumFractionDigits: 3 })} OMR</span>
                </div>
              </div>

              {/* Company Employer Cost */}
              {citizenship === 'omani' && (
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-[11px] space-y-1 mt-4">
                  <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Employer Cost Breakdown (Social Security)</span>
                  <div className="flex justify-between text-slate-300">
                    <span>Pension Contribution (11.5%):</span>
                    <strong className="text-emerald-400 font-space font-medium">+{results.pasiEmployerContribution} OMR</strong>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-1 mt-1 text-white">
                    <span>Total Real Company Cost:</span>
                    <strong className="font-space">{results.companyTotalCost} OMR</strong>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 text-[10px] text-slate-400 font-medium leading-relaxed">
              *All salaries are adjusted into Omani Baisas format (3rd decimals) to fit standard bank transfer file (WPS) formats compliant with local central banks.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
