import ProportionalPaymentCalculator from '../components/ProportionalPaymentCalculator'
import CurrencyRatesCard from '../components/CurrencyRatesCard'
import SignInPrompt from '../components/SignInPrompt'
import { useCurrencyRates } from '../hooks/useCurrencyRates'
import { useAuth } from '../contexts/AuthContext'

export default function CalculatorPage() {
  const { rates, loading: ratesLoading, error: ratesError, lastUpdated, refetch } = useCurrencyRates()
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <ProportionalPaymentCalculator />
      
      {/* Show sign-in prompt for anonymous users */}
      {!user && <SignInPrompt />}
      
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
