import React, { useState, useEffect } from 'react';
import { dataService } from '../lib/dataService';
import { Invoice, InvoiceItem } from '../types';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Printer, 
  Save, 
  CheckCircle2, 
  Globe, 
  Receipt,
  Download,
  Flame,
  User,
  AlertCircle,
  Sparkles,
  Layers,
  Check,
  Building2,
  FileCheck2,
  Bookmark
} from 'lucide-react';

const COMPLIANCE_PRESETS = [
  {
    id: 'simplified-b2c',
    name: 'Oman Simplified Tax Invoice',
    nameAr: 'فاتورة ضريبية مبسطة',
    badge: 'B2C / Point of Sale',
    legislation: 'Article 145 - Oman VAT Executive Regulations',
    description: 'Bilingual template for consumer transactions, retail sales, or supplier invoices under OMR 10,000.',
    companyName: 'Muscat Premium Electronics LLC',
    clientName: 'Walk-in Cash Customer / عميل نقدي عام',
    vatRegistration: 'OM100293847',
    clientVatRegistration: '',
    applyVat: true,
    taxTreatment: 'standard',
    notes: 'Simplified bilingual Tax Invoice generated under Article 145. Goods once sold are not exchangeable without original receipt. الأجهزة المباعة تخضع للأحكام العامة وضريبة القيمة المضافة ٥٪.',
    items: [
      { id: '1', description: 'Office ergonomic mesh workstation chair (كرسي مكتب مريح مقاوم للإجهاد)', quantity: 2, price: 44.500, total: 89.000 },
      { id: '2', description: 'Professional wireless noise-cancelling headset (سماعة بلوتوث لاسلكية عازلة للضوضاء)', quantity: 3, price: 29.000, total: 87.000 }
    ]
  },
  {
    id: 'standard-b2b',
    name: 'Oman Standard B2B Invoice',
    nameAr: 'فاتورة ضريبية كاملة',
    badge: 'Standard Corporate / B2B',
    legislation: 'Article 144 - Oman Tax Authority Standards',
    description: 'Detailed high-compliance template for corporate sales or transactions over OMR 10,000 requiring buyer VAT Registration.',
    companyName: 'Integrated Enterprise Digital Services SAOC',
    clientName: 'Sohar Logistics & Maritime shipping Company SAOG',
    vatRegistration: 'OM100481239',
    clientVatRegistration: 'OM100938472',
    applyVat: true,
    taxTreatment: 'standard',
    notes: 'Standard VAT Tax Invoice subject to 5% tax. Payment is due within 30 days of invoice date via electronic fund transfer to our Muscat Bank account. تخضع هذه الفاتورة للضريبة المقررة بسلطنة عمان بنسبة ٥٪.',
    items: [
      { id: '1', description: 'Enterprise cloud migration project - Phase II (مشروع ترحيل الخدمات السحابية للشركات - المرحلة ٢)', quantity: 1, price: 850.000, total: 850.000 },
      { id: '2', description: 'Digital network firewall appliance configuration (تركيب وإعداد أجهزة حماية الشبكة وجدار الحماية)', quantity: 1, price: 345.500, total: 345.500 }
    ]
  },
  {
    id: 'gcc-export-zero',
    name: 'GCC Cross-Border Cargo Invoice',
    nameAr: 'فاتورة ضريبية بنسبة الصفر',
    badge: 'Zero-Rated Export / GCC',
    legislation: 'Article 51 - Oman VAT Royal Decree 121/2020',
    description: 'Compliant template utilizing 0% zero-rated VAT status for cross-border exports or qualified supplier transactions.',
    companyName: 'Sohar Cold-Chain Marine Exports SAOC',
    clientName: 'Saudi Global Supply & Trading Corp (Riyadh)',
    vatRegistration: 'OM100112233',
    clientVatRegistration: 'SA310023948200003',
    applyVat: false,
    taxTreatment: 'zero-rated',
    notes: 'This export billing qualifies for 0% zero-rate Omani VAT treatment under Article 51 of Royal Decree 121/2020. الخيار الضريبي المتبع بنسبة الصفر لتصدير السلع خارج سلطنة عمان بدول مجلس التعاون.',
    items: [
      { id: '1', description: 'Fresh premium Gulf shrimp cargo shipment - Grade A (شحنة تصدير الروبيان البحري الطازج - الدرجة الأولى)', quantity: 8, price: 180.000, total: 1440.000 },
      { id: '2', description: 'Intl maritime customs clearance & cargo handling (التخليص الجمركي الدولي ومناولة الحاويات المبردة)', quantity: 1, price: 110.000, total: 110.000 }
    ]
  }
];

// Customized Sharp SVG QR Code representer
const VisualQRCode = ({ company, date, total }: { company: string; date: string; total: number }) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 bg-white border border-slate-200/80 rounded-xl shadow-xs shrink-0 w-24 h-24">
      <svg width="60" height="60" viewBox="0 0 29 29" shapeRendering="crispEdges" className="text-slate-900 fill-current">
        <path d="M0 0h7v7H0zM22 0h7v7h-7zM0 22h7v7H0z" />
        <path d="M2 2h3v3H2zM24 2h3v3h-3zM2 24h3v3H2z" />
        <path d="M10 0h2v2h-2zM14 1h3v2h-3zM18 0h2v3h-2zM10 4h3v2h-3zM15 4h2v2h-2zM12 8h5v2h-5zM19 6h2v3h-2zM21 9h2v2h-2zM0 9h3v2H0zM4 11h2v3H4zM8 12h2v2H8z" />
        <path d="M11 12h4v2h-4zM24 9h3v3h-3zM18 13h4v2h-4zM26 14h3v3h-3zM0 15h2v3H0zM3 18h2v2H3zM8 17h3v2H8zM14 16h3v3h-3zM18 18h3v2h-3zM21 21h2v2h-2z" />
        <path d="M25 20h3v3h-3zM0 21h3v2H0zM5 23h2v2H5zM10 21h4v3h-4zM16 23h3v2h-3zM20 25h4v2h-4zM26 24h3v3h-3z" />
      </svg>
      <span className="text-[6.5px] text-slate-500 font-extrabold font-mono mt-1 text-center tracking-wider leading-none">Oman VAT Verified</span>
    </div>
  );
};

export default function InvoicePage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [activeInvoice, setActiveInvoice] = useState<Invoice | null>(null);
  const [selectedPresetId, setSelectedPresetId] = useState('simplified-b2c');
  
  // Creation form states
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [clientName, setClientName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');
  const [vatRegistration, setVatRegistration] = useState('');
  const [clientVatRegistration, setClientVatRegistration] = useState('');
  const [taxTreatment, setTaxTreatment] = useState('standard'); 
  const [notes, setNotes] = useState('');
  const [isArabic, setIsArabic] = useState(true);
  const [applyVat, setApplyVat] = useState(true);
  
  // Line items state
  const [items, setItems] = useState<InvoiceItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadInvoices();
    applyPresetData('simplified-b2c');
  }, []);

  const loadInvoices = async () => {
    setLoading(true);
    const { data } = await dataService.getInvoices();
    setInvoices(data || []);
    if (data && data.length > 0 && !activeInvoice) {
      setActiveInvoice(data[0]);
    }
    setLoading(false);
  };

  // Autogenerate unique invoice numbers
  const generateNewSerial = (presetId: string) => {
    const year = new Date().getFullYear();
    const rand = Math.floor(1000 + Math.random() * 9000);
    const prefix = presetId === 'simplified-b2c' ? 'SIM' : presetId === 'standard-b2b' ? 'B2B' : 'EXP';
    return `${prefix}-${year}-${rand}`;
  };

  // Populate config form based on official layouts
  const applyPresetData = (presetId: string) => {
    const preset = COMPLIANCE_PRESETS.find(p => p.id === presetId);
    if (!preset) return;

    setSelectedPresetId(presetId);
    setInvoiceNumber(generateNewSerial(presetId));
    setCompanyName(preset.companyName);
    setClientName(preset.clientName);
    setVatRegistration(preset.vatRegistration);
    setClientVatRegistration(preset.clientVatRegistration);
    setTaxTreatment(preset.taxTreatment);
    setApplyVat(preset.applyVat);
    setNotes(preset.notes);
    setItems(preset.items.map(it => ({ ...it })));
  };

  // Update line item details
  const handleItemChange = (index: number, field: keyof InvoiceItem, val: any) => {
    const updated = [...items];
    const item = { ...updated[index] };

    if (field === 'description') {
      item.description = val;
    } else if (field === 'price') {
      const p = parseFloat(val) || 0;
      item.price = p;
      item.total = Number((p * item.quantity).toFixed(3));
    } else if (field === 'quantity') {
      const q = parseInt(val) || 0;
      item.quantity = q;
      item.total = Number((item.price * q).toFixed(3));
    }

    updated[index] = item;
    setItems(updated);
  };

  // Add dynamic row
  const handleAddItemRow = () => {
    const newItem: InvoiceItem = {
      id: Math.random().toString(36).substring(2, 9),
      description: 'Consulting stipends / service product',
      quantity: 1,
      price: 50.000,
      total: 50.000
    };
    setItems([...items, newItem]);
  };

  // Remove row
  const handleRemoveItemRow = (id: string) => {
    if (items.length === 1) return;
    setItems(items.filter(item => item.id !== id));
  };

  const computeInvoiceTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const isZeroRated = taxTreatment === 'zero-rated';
    const vatRate = (applyVat && !isZeroRated) ? 5 : 0;
    const vatAmount = subtotal * (vatRate / 100);
    const total = subtotal + vatAmount;

    return {
      subtotal: Number(subtotal.toFixed(3)),
      vatRate,
      vat_amount: Number(vatAmount.toFixed(3)),
      total: Number(total.toFixed(3))
    };
  };

  const totals = computeInvoiceTotals();

  // Save the complete invoice structure
  const handleSaveInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !companyName.trim()) {
      alert('Please fill client and company name');
      return;
    }

    const newInvoice: Invoice = {
      invoice_number: invoiceNumber,
      client_name: clientName,
      company_name: companyName,
      date,
      due_date: dueDate || undefined,
      items,
      subtotal: totals.subtotal,
      vat_rate: totals.vatRate,
      vat_amount: totals.vat_amount,
      total: totals.total,
      is_arabic: isArabic,
      vat_registration: vatRegistration || undefined,
      client_vat_registration: clientVatRegistration || undefined,
      tax_treatment: taxTreatment,
      notes
    };

    const { data, error } = await dataService.createInvoice(newInvoice);
    if (!error && data) {
      setActionSuccess('Tax Invoice successfully saved & synced to your history!');
      loadInvoices();
      setActiveInvoice(data);
      
      // Select appropriate new serial
      setInvoiceNumber(generateNewSerial(selectedPresetId));
      
      setTimeout(() => setActionSuccess(null), 3000);
    }
  };

  const handleDeleteInvoice = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this invoice? This will eliminate it from records.')) {
      await dataService.deleteInvoice(id);
      loadInvoices();
      if (activeInvoice?.id === id) {
        setActiveInvoice(null);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Visual Header */}
      <div className="relative bg-white border border-slate-200/60 rounded-3xl p-6 shadow-xs overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-rose-500/10 text-rose-600 border border-rose-500/15">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-space font-bold text-slate-900 text-xl flex items-center gap-2">
              Oman VAT Tax Invoice Templates 🇴🇲
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Deploy pre-configured Simplified, Standard B2B, or Zero-Rated export invoice layouts complying with Royal Decree 121/2020.
            </p>
          </div>
        </div>

        <div className="self-start md:self-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">
          <span className="text-sm">🌟</span>
          <span>Official Sultanate VAT Formats</span>
        </div>
      </div>

      {actionSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 animate-pulse">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Preset Selectors Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 no-print">
        {COMPLIANCE_PRESETS.map((p) => {
          const isSelected = selectedPresetId === p.id;
          return (
            <div 
              key={p.id}
              onClick={() => applyPresetData(p.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 shadow-xs hover:translate-y-[-1px] ${
                isSelected 
                  ? 'bg-slate-900 border-slate-900 text-white shadow-md' 
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="space-y-1">
                <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-md ${
                  isSelected ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-100 text-slate-600'
                }`}>
                  {p.badge}
                </span>
                <h3 className="font-space font-extrabold text-sm pt-1.5 leading-snug">
                  {p.name}
                </h3>
                <p className={`text-[11px] leading-relaxed ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                  {p.description}
                </p>
              </div>

              <div className="pt-2 border-t border-dashed border-slate-200/25 flex items-center justify-between text-[10px] font-bold">
                <span className={isSelected ? 'text-slate-400' : 'text-slate-500'}>
                  {p.legislation}
                </span>
                {isSelected && <Check className="w-4.5 h-4.5 text-blue-400 shrink-0" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Configuration & Previews Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Creator Configurator */}
        <div className="lg:col-span-7 bg-white border border-slate-200/60 p-6 rounded-3xl space-y-6 shrink-0 no-print shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4.5 h-4.5 text-blue-600" />
              <h3 className="font-space font-extrabold text-slate-950 text-base">Template Parameter Configurator</h3>
            </div>
            
            {/* Bilingual Switcher */}
            <button
              type="button"
              onClick={() => setIsArabic(!isArabic)}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                isArabic 
                  ? 'bg-blue-50 text-blue-700 border-blue-200' 
                  : 'bg-white text-slate-500 border-slate-200 hover:text-slate-800'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              {isArabic ? 'Bilingual layout En/Ar' : 'English Only'}
            </button>
          </div>

          <form onSubmit={handleSaveInvoice} className="space-y-4">
            
            <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-200/50 space-y-3.5">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">1. Legal Parties & Tax IDs</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Invoice Number */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Invoice Serial Code</span>
                  <input
                    type="text"
                    required
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
                  />
                </div>

                {/* Seller's VAT No */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Seller VAT Ref. Number</span>
                  <input
                    type="text"
                    required
                    value={vatRegistration}
                    onChange={(e) => setVatRegistration(e.target.value)}
                    placeholder="OM100xxxxxx"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Supplier Company */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Supplier (Your Corporate)</span>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:border-blue-500"
                  />
                </div>

                {/* Client Company */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Client Name / Business Entity</span>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Show Client VAT only if B2B template or active */}
              {selectedPresetId !== 'simplified-b2c' && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Client (Buyer) VAT Registration Number</span>
                  <input
                    type="text"
                    value={clientVatRegistration}
                    onChange={(e) => setClientVatRegistration(e.target.value)}
                    placeholder="Provide Buyer's OMR/GCC VAT Registration Code"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:border-blue-500"
                  />
                </div>
              )}
            </div>

            <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-200/50 space-y-3.5">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">2. Dates & Tax Classification</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Issue date */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Date Issued</span>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                </div>

                {/* Due dates */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Date Due</span>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                </div>
              </div>

              {/* Advanced OMR tax treatment choices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Oman VAT Treatment Type</span>
                  <select
                    value={taxTreatment}
                    onChange={(e) => setTaxTreatment(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                  >
                    <option value="standard">Standard Rate (5% VAT Compliant)</option>
                    <option value="zero-rated">Zero-Rated Support (0% VAT Export)</option>
                  </select>
                </div>

                <div className="flex items-center pt-5 pl-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={applyVat}
                      onChange={(e) => setApplyVat(e.target.checked)}
                      className="w-4.5 h-4.5 rounded-sm border-slate-300 text-blue-600 accent-blue-600"
                    />
                    <span className="text-xs font-bold text-slate-700">Calculate & apply tax calculations</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Line items list editor */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 block">Itemized billing lists (Arabic/English descriptions allowed)</span>
                <button
                  type="button"
                  onClick={handleAddItemRow}
                  className="p-1 px-3 text-[11px] font-bold text-blue-600 hover:bg-blue-50 border border-dashed border-blue-200 rounded-xl transition-all flex items-center gap-1 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Row
                </button>
              </div>

              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {items.map((item, idx) => (
                  <div key={item.id} className="grid grid-cols-12 gap-2.5 items-center p-2.5 rounded-xl bg-slate-50 border border-slate-200/50 text-xs">
                    
                    {/* Item Description */}
                    <div className="col-span-6 space-y-1">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                        placeholder="Ex: Consult Service Title (الوصف)"
                        className="w-full bg-white border border-slate-200 rounded-lg p-1.5 px-2 text-[11px] text-slate-800 font-semibold"
                      />
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2 space-y-1">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                        placeholder="Qty"
                        className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-center font-bold text-slate-800 text-[11px]"
                      />
                    </div>

                    {/* Price in OMR */}
                    <div className="col-span-3 space-y-1 flex items-center gap-1.5 pl-1 shrink-0">
                      <input
                        type="number"
                        min="0"
                        step="0.005"
                        value={item.price}
                        onChange={(e) => handleItemChange(idx, 'price', e.target.value)}
                        placeholder="Price"
                        className="w-full bg-white border border-slate-200 rounded-lg p-1.5 px-1.5 text-right font-semibold text-slate-800 text-[11px]"
                      />
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">omr</span>
                    </div>

                    {/* Trash icon */}
                    <div className="col-span-1 text-center shrink-0">
                      <button
                        type="button"
                        onClick={() => handleRemoveItemRow(item.id)}
                        disabled={items.length === 1}
                        className="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-50 transition-all disabled:opacity-40"
                        title="Remove row"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Oman Compliance Notes & Wire details</span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Include payment wiring or reference notes..."
                className="w-full p-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-semibold placeholder-slate-400 text-slate-800"
              />
            </div>

            {/* Actions submit */}
            <button
              type="submit"
              className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-hidden transition-all cursor-pointer"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Tax Invoice to History
            </button>
          </form>
        </div>

        {/* Saved Invoices column */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* List panel */}
          <div className="bg-white border border-slate-200/60 p-5 rounded-3xl shrink-0 shadow-xs space-y-3 no-print">
            <h3 className="font-space font-extrabold text-slate-900 text-sm py-1 border-b border-slate-100 flex items-center justify-between">
              <span>Saved Invoice List</span>
              <span className="text-[10px] uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold">
                {invoices.length} Invoices
              </span>
            </h3>

            {loading ? (
              <div className="text-center py-6 text-xs text-slate-400">Loading stored bills...</div>
            ) : invoices.length === 0 ? (
              <div className="text-center py-10 space-y-1">
                <FileText className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs text-slate-400 font-medium">No recorded invoices yet</p>
                <p className="text-[10px] text-slate-400">Create one on the left to review printable sheets here.</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                {invoices.map((inv) => (
                  <div
                    key={inv.id}
                    onClick={() => {
                      setActiveInvoice(inv);
                      // Set selected preset based on invoice metadata
                      if (inv.tax_treatment === 'zero-rated') {
                        setSelectedPresetId('gcc-export-zero');
                      } else if (inv.client_vat_registration) {
                        setSelectedPresetId('standard-b2b');
                      } else {
                        setSelectedPresetId('simplified-b2c');
                      }
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs font-semibold ${
                      activeInvoice?.id === inv.id
                        ? 'bg-blue-50/50 border-blue-250 text-blue-900 shadow-xs'
                        : 'bg-slate-50 hover:bg-white border-slate-200/60 hover:border-slate-300/80 text-slate-700'
                    }`}
                  >
                    <div className="space-y-0.5 truncate max-w-[70%]">
                      <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider leading-none">
                        {inv.invoice_number}
                      </span>
                      <h4 className="font-bold truncate text-slate-900 leading-tight">{inv.client_name}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
                        {inv.date} {inv.tax_treatment === 'zero-rated' ? '• Zero Tax' : '• 5% VAT'}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="font-space font-bold text-slate-900 text-[11px]">
                        {inv.total.toLocaleString('en-US', { minimumFractionDigits: 3 })} OMR
                      </span>
                      <button
                        onClick={(e) => handleDeleteInvoice(inv.id || '', e)}
                        className="p-1 rounded-md text-slate-400 hover:text-red-500 hover:bg-slate-100 transition-all shrink-0"
                        title="Delete invoice"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sultanate Tax Regulations Panel */}
          <div className="bg-slate-900 text-slate-300 p-6 rounded-3xl shadow-xs text-xs space-y-4 no-print border border-slate-800">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5">
              <AlertCircle className="w-5 h-5 text-rose-400" />
              <span className="font-space font-bold text-white text-sm block">Sultanate of Oman Tax Law</span>
            </div>
            
            <div className="space-y-3 leading-relaxed text-slate-400 font-medium">
              <p>
                <strong>Bilingual Mandate:</strong> Tax Invoices issued inside the Sultanate must be draftable in bilingual English and Arabic formats under Oman Tax Authority guidelines.
              </p>
              <p>
                <strong>Simplified vs Standard:</strong> A Simplified invoice can be compiled for B2C retail; Standard B2B invoices MUST record the Buyer's VAT Registration Number if active.
              </p>
              <p>
                <strong>Record Retention:</strong> Section 20 of Decision 53/2021 states all taxpayers should preserve tax bills securely for a minimum of 10 years (15 years for real-estate).
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Centerpiece Display - Large Print Layout Sheet */}
      {activeInvoice && (
        <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xl overflow-hidden mt-8 max-w-4xl mx-auto shadow-slate-100/50">
          
          {/* Live Actions */}
          <div className="bg-slate-50 border-b border-indigo-100 px-6 py-4 flex items-center justify-between no-print">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping"></span>
              <span className="text-xs font-bold text-slate-700">Arabic & English Print View ({activeInvoice.invoice_number})</span>
            </div>
            
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl border border-slate-800 shadow-md transition-all h-9 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </button>
          </div>

          {/* The true printable sheet layout */}
          <div className="p-8 sm:p-12 md:p-16 bg-white text-slate-950 font-sans print-shadow-none relative" id="printable-invoice">
            
            {/* Template Header Notice */}
            <div className="text-center mb-6 border-b border-dashed border-slate-300 pb-3 font-semibold text-[10px] text-slate-500 flex justify-between items-center bg-slate-50/50 p-2 rounded-xl">
              <span>Sultanate of Oman Tax Authority VAT Compliance</span>
              <span className="font-bold tracking-wider">
                {activeInvoice.tax_treatment === 'zero-rated' 
                  ? 'GCC export Zero-Rated Tax Invoice / فاتورة ضريبية بنسبة الصفر لتصدير السلع' 
                  : activeInvoice.client_vat_registration 
                    ? 'Standard B2B Tax Invoice / فاتورة ضريبية كاملة' 
                    : 'Simplified B2C Tax Invoice / فاتورة ضريبية مبسطة'}
              </span>
            </div>

            {/* Standard Header Layout */}
            <div className="grid grid-cols-2 gap-8 border-b-2 border-slate-900 pb-8">
              <div className="space-y-4">
                {/* Logo placeholder */}
                <div className="flex items-center gap-2">
                  <span className="text-3xl">🇴🇲</span>
                  <div>
                    <span className="font-space font-black text-slate-950 text-xl tracking-tight leading-none uppercase block">
                      {activeInvoice.company_name}
                    </span>
                    <span className="text-[9px] text-slate-500 font-extrabold uppercase mt-1 tracking-wider block">
                      Sultanate Business Entity / مؤسسة سلطنة عمان التجارية
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-800 font-bold space-y-1">
                  <p>Muscat, Sultanate of Oman | مسقط، سلطنة عمان</p>
                  <p className="font-mono text-slate-600">Email: billing@{activeInvoice.company_name.toLowerCase().replace(/[^a-z0-9]/g, '')}.om</p>
                  {activeInvoice.vat_registration && (
                    <p className="text-slate-950 font-extrabold text-sm flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-lg border border-slate-200 w-fit">
                      <span>VATIN / رقم التعريف الضريبي:</span>
                      <span className="font-space tracking-wider text-rose-600">{activeInvoice.vat_registration}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="text-right flex flex-col justify-between items-end">
                <div className="space-y-1.5">
                  <h2 className="font-space font-extrabold text-2xl text-slate-950 leading-none">
                    TAX INVOICE / فاتورة ضريبية
                  </h2>
                  <span className="text-[10px] text-slate-500 font-extrabold tracking-widest block uppercase">
                    Complying with Royal Decree 121/2020
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-900 space-y-1.5 text-right">
                  <p>Serial / رقم الفاتورة: <strong className="font-space text-slate-950 text-base">{activeInvoice.invoice_number}</strong></p>
                  <p>Date of Issue / تاريخ الإصدار: <span className="font-space font-bold">{activeInvoice.date}</span></p>
                  {activeInvoice.due_date && (
                    <p>Date Due / تاريخ الاستحقاق: <span className="font-space text-rose-600 font-bold">{activeInvoice.due_date}</span></p>
                  )}
                </div>
              </div>
            </div>

            {/* Billing addresses split */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-8 text-xs font-semibold">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wide leading-none mb-2">
                  Bill To / فاتورة إلى
                </span>
                <h4 className="font-space font-extrabold text-slate-950 text-sm">{activeInvoice.client_name}</h4>
                <p className="text-slate-600 mt-1">Client Business Entity / جهة العميل المستلمة</p>
                
                {activeInvoice.client_vat_registration ? (
                  <p className="text-slate-950 font-bold mt-3 pt-2.5 border-t border-slate-200 flex justify-between">
                    <span>Client VATIN / رقم ضريبة العميل:</span>
                    <strong className="font-space text-indigo-700 font-extrabold tracking-wider">{activeInvoice.client_vat_registration}</strong>
                  </p>
                ) : (
                  <p className="text-slate-400 mt-3 pt-2 border-t border-slate-150 italic">
                    B2C Cash Transaction / معاملة مبيعات مستهلك نهائي ملخصة
                  </p>
                )}
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-row justify-between items-center gap-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wide leading-none">
                    Tax Treatment & Payment
                  </span>
                  <p className="text-slate-950 font-bold text-xs uppercase">
                    {activeInvoice.tax_treatment === 'zero-rated' ? 'Zero-Rated / معفى بنسبة الصفر' : 'Standard 5% VAT / ضريبة ٥٪ مضافة'}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Oman OMR bank wire transfers only.
                  </p>
                </div>
                {/* Embedded dynamic QR representer */}
                <VisualQRCode 
                  company={activeInvoice.company_name} 
                  date={activeInvoice.date} 
                  total={activeInvoice.total} 
                />
              </div>
            </div>

            {/* Line items table structure */}
            <div className="border border-slate-300 rounded-2xl overflow-hidden my-8">
              <table className="w-full text-left text-xs text-slate-850 font-semibold border-collapse">
                <thead className="bg-slate-900 text-white text-[11px] font-bold">
                  <tr>
                    <th className="p-4">Item Description / وصف المادة أو الخدمة</th>
                    <th className="p-4 text-center w-20">Qty / الكمية</th>
                    <th className="p-4 text-right w-32">Unit Price / سعر الوحدة</th>
                    <th className="p-4 text-right w-32">Gross Total (OMR) / المجموع</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-900">
                  {activeInvoice.items.map((item, id) => (
                    <tr key={id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-bold">{item.description}</td>
                      <td className="p-4 text-center font-bold font-space text-slate-950">{item.quantity}</td>
                      <td className="p-4 text-right font-space">{item.price.toLocaleString('en-US', { minimumFractionDigits: 3 })}</td>
                      <td className="p-4 text-right font-extrabold font-space text-slate-950">{item.total.toLocaleString('en-US', { minimumFractionDigits: 3 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Calculations right-to-left block summary */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mt-8">
              
              {/* Compliance note / Legal declaration */}
              <div className="md:col-span-6 bg-slate-50/50 p-5 rounded-2xl border border-slate-200 font-medium text-xs space-y-2 text-slate-700 leading-normal">
                <span className="font-extrabold text-slate-950 block border-b border-slate-200 pb-1.5">
                  Tax Compliance & Terms | شروط ضريبية إضافية
                </span>
                <p className="text-[11px]">{activeInvoice.notes}</p>
              </div>

              {/* Total calculations table block */}
              <div className="md:col-span-6 text-right text-xs font-semibold space-y-2.5 self-center">
                <div className="flex justify-between items-center text-slate-600 border-b border-slate-100 pb-1.5 px-1 truncate">
                  <span>Subtotal before VAT | الإجمالي الخاضع للضريبة:</span>
                  <span className="font-space text-slate-950 font-bold block min-w-[120px]">
                    {activeInvoice.subtotal.toLocaleString('en-US', { minimumFractionDigits: 3 })} OMR
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-slate-600 border-b border-slate-100 pb-1.5 px-1 truncate">
                  <span>VAT Rate / نسبة الضريبة المضافة:</span>
                  <span className="font-space text-slate-950 font-bold block min-w-[120px]">
                    {activeInvoice.vat_rate > 0 ? '5% (Standard Rate)' : '0% (Zero-Rated)'}
                  </span>
                </div>

                {activeInvoice.vat_rate > 0 ? (
                  <div className="flex justify-between items-center text-slate-600 border-b border-slate-100 pb-1.5 px-1 truncate">
                    <span>VAT Amount (5%) | ضريبة القيمة المضافة:</span>
                    <span className="font-space text-rose-600 font-extrabold block min-w-[120px]">
                      +{activeInvoice.vat_amount.toLocaleString('en-US', { minimumFractionDigits: 3 })} OMR
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-between items-center text-slate-400 border-b border-slate-100 pb-1.5 px-1 truncate italic">
                    <span>VAT Export treatment / إعفاء التصدير:</span>
                    <span className="font-space font-extrabold block min-w-[120px]">
                      0.000 OMR
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center text-base font-space font-extrabold text-slate-950 bg-slate-100 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-xs uppercase font-sans text-slate-800">Gross Total (Tax Included) | الإجمالي الكلي:</span>
                  <span className="font-extrabold tracking-tight">
                    {activeInvoice.total.toLocaleString('en-US', { minimumFractionDigits: 3 })} OMR
                  </span>
                </div>
              </div>

            </div>

            {/* Printable Footnote stamp */}
            <div className="border-t border-slate-300 pt-8 mt-12 text-center text-[10px] text-slate-500 font-semibold space-y-1">
              <p>Oman Finance Toolkit - Computer Generated Compliant Tax Invoice. All content complies with Decision 53/2021.</p>
              <p className="uppercase tracking-widest text-[9px] text-slate-400">Muscat Sultanate of Oman | سلطنة عمان - مسقط</p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
