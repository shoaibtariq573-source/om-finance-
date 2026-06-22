import React, { useState } from 'react';
import { dataService } from '../lib/dataService';
import { Award, Save, BookmarkCheck, Calendar, Info, RefreshCcw } from 'lucide-react';

export default function EndOfServicePage() {
  const [basicSalary, setBasicSalary] = useState<number | ''>(600);
  const [yearsOfService, setYearsOfService] = useState<number | ''>(4.5);
  
  // Date helpers for smart calculations
  const [useDates, setUseDates] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  // Auto calculate years from dates if selected
  const handleCalculateYearsFromDates = () => {
    if (!startDate || !endDate) return;
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (end < start) {
      alert('End date must be after start date!');
      return;
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const calculatedYears = Number((diffDays / 365.25).toFixed(3));
    
    setYearsOfService(calculatedYears);
  };

  const computeGratuity = () => {
    const basic = basicSalary || 0;
    const years = yearsOfService || 0;

    // Omani Labour Law calculation mechanism:
    // First 3 years of service: 15 days of wage for each year (basic salary)
    // Over 3 years: 30 days of wage for each subsequent year (basic salary)
    
    let totalGratuity = 0;
    let breakDownFirst = 0;
    let breakDownSubsequent = 0;

    const first3YearsRate = 15 / 30; // 15 days = 0.5 month
    const subsequentYearsRate = 30 / 30; // 30 days = 1.0 month

    if (years <= 3) {
      breakDownFirst = years * first3YearsRate * basic;
      totalGratuity = breakDownFirst;
    } else {
      breakDownFirst = 3 * first3YearsRate * basic; // Maximum 3 years worth
      breakDownSubsequent = (years - 3) * subsequentYearsRate * basic;
      totalGratuity = breakDownFirst + breakDownSubsequent;
    }

    return {
      gratuityFirst3: Number(breakDownFirst.toFixed(3)),
      gratuitySubsequent: Number(breakDownSubsequent.toFixed(3)),
      gratuityTotal: Number(totalGratuity.toFixed(3)),
      effectiveDays: Math.round(years * 365.25)
    };
  };

  const results = computeGratuity();

  const handleSaveCalculation = async () => {
    const calcTitle = title.trim() || `EOS Gratuity: ${yearsOfService} Yrs @ ${basicSalary} OMR`;
    const { data, error } = await dataService.saveCalculation(
      'end-of-service',
      calcTitle,
      { basicSalary, yearsOfService, useDates, startDate, endDate },
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
      
      {/* Header Panel */}
      <div className="relative bg-white border border-slate-200/60 rounded-3xl p-6 shadow-xs overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-500/15">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-space font-bold text-slate-900 text-xl">Omani End of Service Gratuity (EOS) 🇴🇲</h1>
            <p className="text-xs text-slate-500">Compute precise employee gratuity indemnities under the Sultanate of Oman Labour Code</p>
          </div>
        </div>

        <div className="self-start md:self-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">
          <span className="text-sm">⚖️</span>
          <span>Article 39 Legal Rules</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Input parameters panel */}
        <div className="bg-white border border-slate-200/60 p-6 rounded-3xl md:col-span-3 space-y-6">
          <h3 className="font-space font-extrabold text-slate-900 text-base">Gratuity Modifiers</h3>

          {/* Manual Years input vs Date range input switcher */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide block">Duration Entry Mode</span>
            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200/50">
              <button
                type="button"
                onClick={() => setUseDates(false)}
                className={`py-2 px-3 rounded-lg text-xs font-bold text-center transition-all ${
                  !useDates
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Direct Years Slider
              </button>
              <button
                type="button"
                onClick={() => setUseDates(true)}
                className={`py-2 px-3 rounded-lg text-xs font-bold text-center transition-all ${
                  useDates
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Start / End Date Helper
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-fadeIn">
            {/* Monthly basic salary */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide block">Monthly Basic Salary</label>
              <div className="relative rounded-xl">
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={basicSalary}
                  onChange={(e) => setBasicSalary(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold placeholder-slate-400 focus:outline-hidden"
                  placeholder="e.g. 600"
                />
                <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 text-xs font-semibold">OMR</span>
              </div>
            </div>

            {/* Manual Years slider if useDates is FALSE */}
            {!useDates ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  <label>Service Duration</label>
                  <span className="text-slate-900 font-bold bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                    {yearsOfService ? `${yearsOfService} Yrs` : '0 Yrs'}
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="range"
                    min="0.5"
                    max="25"
                    step="0.5"
                    value={yearsOfService || 0.5}
                    onChange={(e) => setYearsOfService(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>6 Months</span>
                  <span>10 Years</span>
                  <span>25 Years</span>
                </div>
              </div>
            ) : (
              /* Dates Inputs Helper if useDates is TRUE */
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide block">Duration of Service (Yrs)</label>
                <div className="relative rounded-xl">
                  <input
                    type="number"
                    step="0.01"
                    value={yearsOfService}
                    onChange={(e) => setYearsOfService(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-700 font-semibold focus:outline-hidden"
                  />
                  <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 text-xs font-semibold">Yrs</span>
                </div>
              </div>
            )}
          </div>

          {/* Start and end dates if useDates is true */}
          {useDates && (
            <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 animate-scaleUp">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">Contract Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border border-slate-200 bg-white rounded-lg p-2 text-xs font-semibold text-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">Contract End Date</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full border border-slate-200 bg-white rounded-lg p-2 text-xs font-semibold text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={handleCalculateYearsFromDates}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 text-xs font-semibold transition-all flex items-center justify-center shrink-0"
                    title="Calculate years relative to calendar dates"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Legal references inside Omani Labour Code */}
          <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-2xl space-y-2 text-[11px] leading-relaxed text-slate-600">
            <span className="font-bold text-slate-900 text-xs block flex items-center gap-1">
              <Info className="w-4.5 h-4.5 text-blue-600" />
              Sultanate Labour Law Code (Article 39)
            </span>
            <p>
              The End of Service indemnity (for contract types not participating in Omani PASI Social plans) is calculated on basic wage elements:
            </p>
            <p>
              • First 3 continuous years: <strong>15 Days of basic salary</strong> for each completed Year.
            </p>
            <p>
              • Years beyond 3: <strong>30 Days of basic salary</strong> (full month) for each subsequent Year.
            </p>
          </div>

          {/* Saved calculation name input optional */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="font-space font-extrabold text-slate-900 text-xs uppercase tracking-wider">Save Result to Dashboard</h4>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Optional calculation title (e.g., Salim EOS Gratuity)"
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
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save EOS Calculation
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

            <h3 className="font-space font-extrabold text-slate-300 text-xs uppercase tracking-wide">Gratuity Projections</h3>

            <div className="space-y-5 mt-6">
              
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estimated Gratuity Total</span>
                <p className="font-space text-3xl font-extrabold text-white">
                  {results.gratuityTotal.toLocaleString('en-US', { minimumFractionDigits: 3 })} <span className="text-sm font-sans font-medium text-slate-400">OMR</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-4 text-xs font-semibold">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">First 3 Yrs (15 days/yr)</span>
                  <span className="text-slate-200 font-space text-base">{results.gratuityFirst3.toLocaleString('en-US', { minimumFractionDigits: 3 })} OMR</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Later Yrs (30 days/yr)</span>
                  <span className="text-emerald-400 font-space text-base">{results.gratuitySubsequent.toLocaleString('en-US', { minimumFractionDigits: 3 })} OMR</span>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4 flex justify-between items-center text-xs text-slate-400 font-semibold">
                <span>Total Days of Service:</span>
                <span className="text-white font-space text-sm">{results.effectiveDays} Days</span>
              </div>

            </div>

            <div className="mt-8 text-[10px] text-slate-400 font-medium leading-relaxed">
              *Projections represent estimates calculated based on latest legislations and can serve inside legal arbitration briefs. Excludes custom employer-sponsored premium end benefits.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
