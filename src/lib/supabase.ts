// @ts-ignore: Let the bundler resolve '@supabase/supabase-js' types at build time
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

function createDisabledClient(): SupabaseClient {
  const error = new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  return new Proxy({} as SupabaseClient, {
    get() {
      throw error;
    },
  });
}

export const supabase: SupabaseClient =
  isSupabaseConfigured
    ? createClient(supabaseUrl as string, supabaseAnonKey as string)
    : (console.warn('[lib/supabase] Missing env vars. Supabase client disabled.'), createDisabledClient());

// Database types
export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          price: number;
          image: string;
          description: string | null;
          category: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          price: number;
          image: string;
          description?: string | null;
          category: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          price?: number;
          image?: string;
          description?: string | null;
          category?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          customer_name: string;
          customer_phone: string;
          customer_address: string;
          customer_notes: string | null;
          total_amount: number;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          customer_name: string;
          customer_phone: string;
          customer_address: string;
          customer_notes?: string | null;
          total_amount: number;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_number?: string;
          customer_name?: string;
          customer_phone?: string;
          customer_address?: string;
          customer_notes?: string | null;
          total_amount?: number;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          product_name: string;
          product_price: number;
          color_name: string;
          color_hex: string;
          size_name: string;
          design_name: string;
          design_type: string;
          design_price: number;
          quantity: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          product_name: string;
          product_price: number;
          color_name: string;
          color_hex: string;
          size_name: string;
          design_name: string;
          design_type: string;
          design_price: number;
          quantity: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          product_name?: string;
          product_price?: number;
          color_name?: string;
          color_hex?: string;
          size_name?: string;
          design_name?: string;
          design_type?: string;
          design_price?: number;
          quantity?: number;
          created_at?: string;
        };
      };
      admins: {
        Row: {
          id: string;
          username: string;
          email: string;
          password_hash: string;
          role: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          username: string;
          email: string;
          password_hash: string;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          email?: string;
          password_hash?: string;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}