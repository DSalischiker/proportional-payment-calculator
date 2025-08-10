import ProportionalPaymentCalculator from './components/ProportionalPaymentCalculator.tsx'
import LanguageSelector from './components/LanguageSelector.tsx'
import { LocaleProvider, useLocale } from './contexts/LocaleContext.tsx'
import './App.css'

function AppContent() {
  const { t } = useLocale()
  
  return (
    <div className="dark min-h-screen w-full max-w-full overflow-x-hidden bg-background p-4">
      <div className="w-full max-w-4xl px-4 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            {t('app.title')}
          </h1>
          <LanguageSelector />
        </div>
        <ProportionalPaymentCalculator />
      </div>
    </div>
  )
}

function App() {
  return (
    <LocaleProvider>
      <AppContent />
    </LocaleProvider>
  )
}

export default App
