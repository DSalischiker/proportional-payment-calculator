import ProportionalPaymentCalculator from '../components/ProportionalPaymentCalculator'
import CurrencyRatesCard from '../components/CurrencyRatesCard'
import { useCurrencyRates } from '../hooks/useCurrencyRates'

export default function CalculatorPage() {
  const { rates, loading: ratesLoading, error: ratesError, lastUpdated, refetch } = useCurrencyRates()

  return (
    <div className="space-y-6">
      {/* Calculator */}
      <ProportionalPaymentCalculator />

      {/* Currency Rates Card */}
      <CurrencyRatesCard
        rates={rates}
        loading={ratesLoading}
        error={ratesError}
        lastUpdated={lastUpdated}
        onRefresh={refetch}
      />
    </div>
  )
}
