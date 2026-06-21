import React, { useState } from 'react';
import { dataService } from '../lib/dataService';
import { Receipt, Save, RefreshCw, BookmarkCheck, LayoutGrid, Award, Calculator, TrendingUp } from 'lucide-react';

export default function VatPage() {
  const [amount, setAmount] = useState<number | ''>(150);
  const [vatRate, setVatRate] = useState<number>(5); // Standard Oman 5%
  const [isInclusive, setIsInclusive] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  const computeVAT = () => {
    const inputVal = amount || 0;
    const rate = vatRate || 0;
    
    let netAmount = 0;
    let vatAmount = 0;
    let totalAmount = 0;

    if (isInclusive) {
      // Amount includes VAT (Gross)
      totalAmount = inputVal;
      netAmount = totalAmount / (1 + (rate / 100));
      vatAmount = totalAmount - netAmount;
    } else {
      // Amount excludes VAT (Net)
      netAmount = inputVal;
      vatAmount = netAmount * (rate / 100);
      totalAmount = netAmount + vatAmount;
    }

    return {
      netAmount: Number(netAmount.toFixed(3)),
      vatAmount: Number(vatAmount.toFixed(3)),
      totalAmount: Number(totalAmount.toFixed(3)),
    };
  };

  const results = computeVAT();

  const handleSaveCalculation = async () => {
    const calcTitle = title.trim() || `VAT Calc for ${amount} OMR @ ${vatRate}%`;
    const { data, error } = await dataService.saveCalculation(
      'vat',
      calcTitle,
      { amount, vatRate, isInclusive },
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
      
      {/* Visual Header */}
      <div className="relative bg-white border border-slate-200/60 rounded-3xl p-6 shadow-xs overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/15">
            <Receipt className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-space font-bold text-slate-900 text-xl">VAT Calculator 🧾</h1>
            <p className="text-xs text-slate-500">Calculate 5% standard VAT inside the Sultanate of Oman or GCC region</p>
          </div>
        </div>
        
        {/* Quick Oman flag seal */}
        <div className="self-start md:self-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">
          <span className="text-sm">🇴🇲</span>
          <span>Sultanate Compliant (5%)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Input Configuration Panel */}
        <div className="bg-white border border-slate-200/60 p-6 rounded-3xl md:col-span-3 space-y-6">
          <h3 className="font-space font-extrabold text-slate-900 text-base">Core Inputs</h3>
          
          {/* Inclusive vs Exclusive Switcher */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide block">Calculation Method</span>
            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200/50">
              <button
                type="button"
                onClick={() => setIsInclusive(false)}
                className={`py-2 px-3 rounded-lg text-xs font-bold text-center transition-all ${
                  !isInclusive
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/30'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Add VAT (Exclusive Amount)
              </button>
              <button
                type="button"
                onClick={() => setIsInclusive(true)}
                className={`py-2 px-3 rounded-lg text-xs font-bold text-center transition-all ${
                  isInclusive
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/30'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Extract VAT (Inclusive Amount)
              </button>
            </div>
          </div>

          {/* Amount In OMR */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide block">
              Base Amount ({isInclusive ? 'Gross / Total' : 'Net / Price'})
            </label>
            <div className="relative rounded-xl">
              <input
                type="number"
                min="0"
                step="0.001"
                value={amount}
                onChange={(e) => setAmount(e.target.value === '' ? '' : parseFloat(e.target.value))}
                className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-base font-medium placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900"
                placeholder="0.000"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400 text-xs font-bold">
                OMR
              </div>
            </div>
          </div>

          {/* Tax Rate % */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                VAT Tax Rate (%)
              </label>
              <span className="text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                {vatRate}%
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={vatRate}
              onChange={(e) => setVatRate(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>1% (GCC Low)</span>
              <span>5% (Oman Standard)</span>
              <span>15% (KSA Standard)</span>
              <span>20%</span>
            </div>
          </div>

          {/* Save calculation name input optional */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="font-space font-extrabold text-slate-900 text-xs uppercase tracking-wider">Save Result to Dashboard</h4>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Optional calculation title (e.g., Muscat office utility)"
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
                    Save Calculation
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Results Screen Panel */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="bg-slate-900 text-white p-6 rounded-3xl flex-1 flex flex-col justify-between shadow-xl relative overflow-hidden border border-slate-800">
            <div className="absolute right-0 bottom-0 w-44 h-44 bg-blue-600/10 rounded-full blur-2xl"></div>

            <h3 className="font-space font-extrabold text-slate-300 text-xs uppercase tracking-wide">Breakdown Metric</h3>

            <div className="space-y-6 mt-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Calculated Gross Total</span>
                <p className="font-space text-3xl font-extrabold text-white">
                  {results.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 3 })} <span className="text-sm font-sans font-medium text-slate-400">OMR</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-4 text-xs font-semibold">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Base Net Price</span>
                  <span className="text-slate-200 font-space text-base">{results.netAmount.toLocaleString('en-US', { minimumFractionDigits: 3 })} OMR</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Computed Tax (VAT)</span>
                  <span className="text-emerald-400 font-space text-base">+{results.vatAmount.toLocaleString('en-US', { minimumFractionDigits: 3 })} OMR</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-3 bg-slate-950/50 rounded-xl border border-slate-800/80 text-[10px] text-slate-400 font-medium leading-relaxed">
              *VAT values are formatted to 3 decimal places (Baisas / 1000th OMR) which is the absolute legal requirement for commerce inside Oman.
            </div>
          </div>

          {/* Quick Explainer Cards */}
          <div className="bg-white border border-slate-200/60 p-5 rounded-3xl text-xs space-y-3">
            <h4 className="font-space font-bold text-slate-900">Tax compliance guidelines</h4>
            <p className="text-slate-500 leading-relaxed">
              Corporate entities must supply complete descriptions with 5% VAT specified in standard baisas fields inside Muscat & regional municipalities.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
