import { useState, useEffect } from 'react'

export interface CurrencyRate {
  moneda: string
  casa: string
  nombre: string
  compra: number
  venta: number
  fechaActualizacion: string
}

export interface CurrencyRates {
  ARS: number // Always 1 as base currency
  USD: number
  EUR: number
  BRL: number
  CLP: number
  UYU: number
}

export interface UseCurrencyRatesReturn {
  rates: CurrencyRates | null
  loading: boolean
  error: string | null
  lastUpdated: string | null
  refetch: () => Promise<void>
}

export function useCurrencyRates(): UseCurrencyRatesReturn {
  const [rates, setRates] = useState<CurrencyRates | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  const fetchRates = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log('🔄 Fetching currency rates from DolarAPI...')
      
      const response = await fetch('https://dolarapi.com/v1/cotizaciones')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data: CurrencyRate[] = await response.json()
      console.log('📊 Received currency data:', data)
      
      // Extract rates for all supported currencies (venta prices)
      const usdRate = data.find(item => item.moneda === 'USD')
      const eurRate = data.find(item => item.moneda === 'EUR')
      const brlRate = data.find(item => item.moneda === 'BRL')
      const clpRate = data.find(item => item.moneda === 'CLP')
      const uyuRate = data.find(item => item.moneda === 'UYU')
      
      if (!usdRate || !eurRate || !brlRate || !clpRate || !uyuRate) {
        throw new Error('Some required currency rates not found in API response')
      }
      
      const currencyRates: CurrencyRates = {
        ARS: 1, // Base currency
        USD: usdRate.venta,
        EUR: eurRate.venta,
        BRL: brlRate.venta,
        CLP: clpRate.venta,
        UYU: uyuRate.venta
      }
      
      console.log('✅ Processed currency rates:', currencyRates)
      
      setRates(currencyRates)
      setLastUpdated(usdRate.fechaActualizacion)
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      console.error('❌ Error fetching currency rates:', errorMessage)
      setError(errorMessage)
      
      // Set fallback rates if API fails
      console.log('⚠️ Using fallback currency rates')
      setRates({
        ARS: 1,
        USD: 1300,  // Fallback rate
        EUR: 1550,  // Fallback rate
        BRL: 244,   // Fallback rate
        CLP: 1.37,  // Fallback rate
        UYU: 33.06  // Fallback rate
      })
      setLastUpdated(new Date().toISOString())
    } finally {
      setLoading(false)
    }
  }

  const refetch = async () => {
    await fetchRates()
  }

  useEffect(() => {
    fetchRates()
  }, [])

  return {
    rates,
    loading,
    error,
    lastUpdated,
    refetch
  }
}
