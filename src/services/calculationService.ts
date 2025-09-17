import { supabase, type Database } from '../lib/supabase'
import { type PaymentCalculatorData } from '../components/PaymentCalculatorCard'

export type CalculationRecord = Database['public']['Tables']['calculations']['Row']
export type CreateCalculationData = Database['public']['Tables']['calculations']['Insert']

interface CalculationResult {
  personAPayment: number
  personBPayment: number
  personAPercentage: number
  personBPercentage: number
}

export interface SaveCalculationParams {
  calculationData: PaymentCalculatorData
  result: CalculationResult
  userId: string
}

// Save a new calculation to the database
export async function saveCalculation({ 
  calculationData, 
  result, 
  userId 
}: SaveCalculationParams): Promise<CalculationRecord> {
  const calculationRecord: CreateCalculationData = {
    user_id: userId,
    person_a_name: calculationData.personAName,
    person_b_name: calculationData.personBName,
    person_a_income: parseFloat(calculationData.personAIncome),
    person_b_income: parseFloat(calculationData.personBIncome),
    person_a_currency: calculationData.personACurrency,
    person_b_currency: calculationData.personBCurrency,
    total_bill: parseFloat(calculationData.totalBill),
    bill_currency: calculationData.billCurrency,
    person_a_payment: result.personAPayment,
    person_b_payment: result.personBPayment,
    person_a_percentage: result.personAPercentage,
    person_b_percentage: result.personBPercentage
  }

  const { data, error } = await supabase
    .from('calculations')
    .insert(calculationRecord)
    .select()
    .single()

  if (error) {
    console.error('Error saving calculation:', error)
    throw new Error('Failed to save calculation')
  }

  return data
}

// Get user's calculation history
export async function getUserCalculations(userId: string): Promise<CalculationRecord[]> {
  const { data, error } = await supabase
    .from('calculations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching calculations:', error)
    throw new Error('Failed to fetch calculations')
  }

  return data || []
}

// Delete a calculation
export async function deleteCalculation(id: string, userId: string): Promise<void> {
  const { error } = await supabase
    .from('calculations')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)

  if (error) {
    console.error('Error deleting calculation:', error)
    throw new Error('Failed to delete calculation')
  }
}

// Get calculation statistics for a user
export async function getCalculationStats(userId: string) {
  const { data, error } = await supabase
    .from('calculations')
    .select('*')
    .eq('user_id', userId)

  if (error) {
    console.error('Error fetching calculation stats:', error)
    throw new Error('Failed to fetch calculation statistics')
  }

  const calculations = data || []
  
  return {
    totalCalculations: calculations.length,
    mostUsedCurrency: getMostUsedCurrency(calculations),
    averageBillAmount: getAverageBillAmount(calculations),
    lastCalculationDate: calculations.length > 0 ? calculations[0].created_at : null
  }
}

function getMostUsedCurrency(calculations: CalculationRecord[]): string | null {
  if (calculations.length === 0) return null
  
  const currencyCount: Record<string, number> = {}
  calculations.forEach(calc => {
    currencyCount[calc.bill_currency] = (currencyCount[calc.bill_currency] || 0) + 1
  })
  
  return Object.entries(currencyCount).reduce((a, b) => 
    currencyCount[a[0]] > currencyCount[b[0]] ? a : b
  )[0]
}

function getAverageBillAmount(calculations: CalculationRecord[]): number {
  if (calculations.length === 0) return 0
  
  const total = calculations.reduce((sum, calc) => sum + calc.total_bill, 0)
  return total / calculations.length
}
