import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface Database {
  public: {
    Tables: {
      calculations: {
        Row: {
          id: string
          user_id: string
          person_a_name: string
          person_b_name: string
          person_a_income: number
          person_b_income: number
          person_a_currency: string
          person_b_currency: string
          total_bill: number
          bill_currency: string
          person_a_payment: number
          person_b_payment: number
          person_a_percentage: number
          person_b_percentage: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          person_a_name: string
          person_b_name: string
          person_a_income: number
          person_b_income: number
          person_a_currency: string
          person_b_currency: string
          total_bill: number
          bill_currency: string
          person_a_payment: number
          person_b_payment: number
          person_a_percentage: number
          person_b_percentage: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          person_a_name?: string
          person_b_name?: string
          person_a_income?: number
          person_b_income?: number
          person_a_currency?: string
          person_b_currency?: string
          total_bill?: number
          bill_currency?: string
          person_a_payment?: number
          person_b_payment?: number
          person_a_percentage?: number
          person_b_percentage?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
