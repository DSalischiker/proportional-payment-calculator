import ProportionalPaymentCalculator from './components/ProportionalPaymentCalculator.tsx'
import LanguageSelector from './components/LanguageSelector.tsx'
import AuthCard from './components/AuthCard.tsx'
import UserMenu from './components/UserMenu.tsx'
import CalculationHistoryCard from './components/CalculationHistoryCard.tsx'
import { LocaleProvider, useLocale } from './contexts/LocaleContext.tsx'
import { AuthProvider, useAuth } from './contexts/AuthContext.tsx'
import './App.css'

function AppContent() {
  const { t } = useLocale()
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="dark min-h-screen w-full max-w-full overflow-x-hidden bg-background p-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }
  
  return (
    <div className="dark min-h-screen w-full max-w-full overflow-x-hidden bg-background p-4">
      <div className="w-full max-w-4xl px-4 mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-foreground text-left">
            {t('app.title')}
          </h1>
          <div className="flex items-center gap-4">
            <LanguageSelector />
          </div>
        </div>
        
        {user && <UserMenu />}
        
        {!user ? (
          <div className="space-y-6">
            <AuthCard />
          </div>
        ) : (
          <div className="space-y-6">
            <ProportionalPaymentCalculator />
            <CalculationHistoryCard />
          </div>
        )}
      </div>
    </div>
  )
}

function App() {
  return (
    <LocaleProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LocaleProvider>
  )
}

export default App
