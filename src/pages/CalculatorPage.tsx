import ProportionalPaymentCalculator from '../components/ProportionalPaymentCalculator'
import CurrencyRatesCard from '../components/CurrencyRatesCard'
import Navigation from '../components/Navigation'
import UserMenu from '../components/UserMenu'
import LanguageSelector from '../components/LanguageSelector'
import { useCurrencyRates } from '../hooks/useCurrencyRates'
import { useLocale } from '../contexts/LocaleContext'

export default function CalculatorPage() {
  const { rates, loading: ratesLoading, error: ratesError, lastUpdated, refetch } = useCurrencyRates()
  const { t } = useLocale()

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold text-foreground">
            {t('app.title')}
          </h1>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <UserMenu />
          </div>
        </div>

        <Navigation />

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
    </div>
  )
}
