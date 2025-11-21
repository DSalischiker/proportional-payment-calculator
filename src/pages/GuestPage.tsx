import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProportionalPaymentCalculator from '../components/ProportionalPaymentCalculator'
import CurrencyRatesCard from '../components/CurrencyRatesCard'
import GuestBanner from '../components/GuestBanner'
import { useCurrencyRates } from '../hooks/useCurrencyRates'
import { useLocale } from '../contexts/LocaleContext'
import LanguageSelector from '../components/LanguageSelector'
import { Button } from '../components/ui/button'
import { Home } from 'lucide-react'

export default function GuestPage() {
  const { rates, loading: ratesLoading, error: ratesError, lastUpdated, refetch } = useCurrencyRates()
  const { t } = useLocale()
  const navigate = useNavigate()
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false)

  // Show upgrade prompt after first calculation
  const handleCalculationComplete = () => {
    if (!showUpgradePrompt) {
      setShowUpgradePrompt(true)
    }
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="flex-shrink-0"
            >
              <Home className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold text-foreground">
              {t('app.title')}
            </h1>
          </div>
          <LanguageSelector />
        </div>

        {/* Guest Banner */}
        <GuestBanner />

        {/* Calculator */}
        <ProportionalPaymentCalculator onCalculationComplete={handleCalculationComplete} />

        {/* Upgrade Prompt after calculation */}
        {showUpgradePrompt && (
          <div className="animate-in slide-in-from-bottom">
            <GuestBanner variant="upgrade" />
          </div>
        )}

        {/* Currency Rates Card */}
        <CurrencyRatesCard
          rates={rates}
          loading={ratesLoading}
          error={ratesError}
          lastUpdated={lastUpdated}
          onRefresh={refetch}
        />
      </div>
    </div>
  )
}
