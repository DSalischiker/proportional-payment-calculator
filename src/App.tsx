import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LanguageSelector from './components/LanguageSelector.tsx'
import UserMenu from './components/UserMenu.tsx'
import Navigation from './components/Navigation.tsx'
import CalculatorPage from './pages/CalculatorPage.tsx'
import HistoryPage from './pages/HistoryPage.tsx'
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
        
        <div className="space-y-6">
          {user && <Navigation />}
          <Routes>
            <Route path="/" element={<CalculatorPage />} />
            {user && <Route path="/history" element={<HistoryPage />} />}
          </Routes>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <LocaleProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </LocaleProvider>
  )
}

export default App
