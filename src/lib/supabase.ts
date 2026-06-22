import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

// Quick check if Supabase is fully configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * SQL Schema Instructions for the user's Supabase database.
 * They can run this in their Supabase SQL Editor to provision the exact tables:
 * 
 * -- Create invoices table
 * create table public.invoices (
 *   id uuid default gen_random_uuid() primary key,
 *   user_id uuid references auth.users(id) on delete cascade,
 *   invoice_number text not null,
 *   client_name text not null,
 *   company_name text not null,
 *   date date not null default current_date,
 *   due_date date,
 *   items jsonb not null default '[]'::jsonb,
 *   subtotal numeric(12, 3) not null,
 *   vat_rate numeric(5, 2) not null,
 *   vat_amount numeric(12, 3) not null,
 *   total numeric(12, 3) not null,
 *   is_arabic boolean default false,
 *   vat_registration text,
 *   notes text,
 *   created_at timestamp with time zone default timezone('utc'::text, now()) not null
 * );
 * 
 * -- Enable RLS
 * alter table public.invoices enable row level security;
 * 
 * -- Create RLS policies
 * create policy "Users can view their own invoices" on public.invoices
 *   for select using (auth.uid() = user_id);
 * 
 * create policy "Users can insert their own invoices" on public.invoices
 *   for insert with check (auth.uid() = user_id);
 * 
 * create policy "Users can update their own invoices" on public.invoices
 *   for update using (auth.uid() = user_id);
 * 
 * create policy "Users can delete their own invoices" on public.invoices
 *   for delete using (auth.uid() = user_id);
 */
