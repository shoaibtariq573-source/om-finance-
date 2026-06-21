export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Invoice {
  id?: string;
  user_id?: string;
  invoice_number: string;
  client_name: string;
  company_name: string;
  date: string;
  due_date?: string;
  items: InvoiceItem[];
  subtotal: number;
  vat_rate: number; // e.g. 5
  vat_amount: number;
  total: number;
  is_arabic?: boolean;
  vat_registration?: string;
  client_vat_registration?: string;
  tax_treatment?: string; // 'standard' | 'zero' | 'exempt'
  notes?: string;
  created_at?: string;
}

export type CalculationType = 'vat' | 'salary' | 'profit' | 'end-of-service';

export interface SavedCalculation {
  id: string;
  user_id?: string;
  type: CalculationType;
  title: string;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  created_at?: string;
}
