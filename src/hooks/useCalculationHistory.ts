import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { 
  getUserCalculations, 
  saveCalculation, 
  deleteCalculation,
  getCalculationStats,
  type CalculationRecord,
  type SaveCalculationParams 
} from '../services/calculationService'

export function useCalculationHistory() {
  const { user } = useAuth()
  const [calculations, setCalculations] = useState<CalculationRecord[]>([])
  const [stats, setStats] = useState<{
    totalCalculations: number
    mostUsedCurrency: string | null
    averageBillAmount: number
    lastCalculationDate: string | null
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch calculations when user changes
  useEffect(() => {
    if (user) {
      fetchCalculations()
      fetchStats()
    } else {
      setCalculations([])
      setStats(null)
    }
  }, [user])

  const fetchCalculations = async () => {
    if (!user) return
    
    setLoading(true)
    setError(null)
    
    try {
      const data = await getUserCalculations(user.id)
      setCalculations(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch calculations')
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    if (!user) return
    
    try {
      const statsData = await getCalculationStats(user.id)
      setStats(statsData)
    } catch (err) {
      console.error('Failed to fetch stats:', err)
    }
  }

  const addCalculation = async (params: Omit<SaveCalculationParams, 'userId'>) => {
    if (!user) throw new Error('User not authenticated')
    
    setError(null)
    
    try {
      const newCalculation = await saveCalculation({ ...params, userId: user.id })
      setCalculations(prev => [newCalculation, ...prev])
      await fetchStats() // Refresh stats
      return newCalculation
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save calculation'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const removeCalculation = async (id: string) => {
    if (!user) throw new Error('User not authenticated')
    
    setError(null)
    
    try {
      await deleteCalculation(id, user.id)
      setCalculations(prev => prev.filter(calc => calc.id !== id))
      await fetchStats() // Refresh stats
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete calculation'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const refreshCalculations = () => {
    fetchCalculations()
    fetchStats()
  }

  return {
    calculations,
    stats,
    loading,
    error,
    addCalculation,
    removeCalculation,
    refreshCalculations
  }
}
