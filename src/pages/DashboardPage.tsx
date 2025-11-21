import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { Button } from '../components/ui/button'
import {
  Calculator,
  History,
  Plus,
  ArrowRight,
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useLocale } from '../contexts/LocaleContext'
import { useCalculationHistory } from '../hooks/useCalculationHistory'
import OnboardingTooltip from '../components/OnboardingTooltip'
import { formatDistanceToNow } from 'date-fns'
import { enUS, es } from 'date-fns/locale'

export default function DashboardPage() {
  const { user } = useAuth()
  const { t, locale } = useLocale()
  const navigate = useNavigate()
  const { calculations, loading, stats } = useCalculationHistory()
  const [showOnboarding, setShowOnboarding] = useState(false)

  // Get the date-fns locale based on the current locale
  const dateLocale = locale === 'es' ? es : enUS

  // Get recent calculations (last 3)
  const recentCalculations = calculations.slice(0, 3)

  // Check if this is a new user
  useEffect(() => {
    if (!loading && calculations.length === 0) {
      const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding')
      if (!hasSeenOnboarding) {
        setShowOnboarding(true)
      }
    }
  }, [loading, calculations.length])

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    localStorage.setItem('hasSeenOnboarding', 'true')
  }

  const quickActions = [
    {
      title: t('dashboard.quickActions.newCalculation'),
      description: t('dashboard.quickActions.newCalculationDesc'),
      icon: Calculator,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      action: () => navigate('/calculator'),
    },
    {
      title: t('dashboard.quickActions.viewHistory'),
      description: t('dashboard.quickActions.viewHistoryDesc'),
      icon: History,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      action: () => navigate('/history'),
    },
  ]

  if (!user) {
    navigate('/')
    return null
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {t('dashboard.welcome', { name: user.user_metadata?.name?.split(' ')[0] || 'User' })}
        </h1>
        <p className="text-muted-foreground mt-2">
          {t('dashboard.subtitle')}
        </p>
      </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>{t('history.stats.total')}</CardDescription>
              <CardTitle className="text-3xl">
                {loading ? '...' : stats?.totalCalculations || 0}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>{t('history.stats.mostUsed')}</CardDescription>
              <CardTitle className="text-3xl">
                {loading ? '...' : stats?.mostUsedCurrency || t('dashboard.noData')}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>{t('history.stats.lastCalculation')}</CardDescription>
              <CardTitle className="text-xl">
                {loading
                  ? '...'
                  : stats?.lastCalculationDate
                  ? formatDistanceToNow(new Date(stats.lastCalculationDate), {
                      addSuffix: true,
                      locale: dateLocale,
                    })
                  : t('dashboard.noData')}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            {t('dashboard.quickActionsTitle')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:border-primary/50 transition-all hover:shadow-lg"
                onClick={action.action}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${action.bgColor} flex items-center justify-center mb-2`}>
                    <action.icon className={`h-6 w-6 ${action.color}`} />
                  </div>
                  <CardTitle className="text-left">{action.title}</CardTitle>
                  <CardDescription className="text-left">
                    {action.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mr-auto">
                  <Button variant="ghost" className="gap-2 px-0">
                    {t('dashboard.getStarted')}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Calculations */}
        {recentCalculations.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                {t('dashboard.recentCalculations')}
              </h2>
              <Link to="/history">
                <Button variant="ghost" className="gap-2">
                  {t('dashboard.viewAll')}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {recentCalculations.map((calc) => (
                <Card key={calc.id} className="hover:border-primary/50 transition-all">
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{calc.person_a_name}</span>
                          <span className="text-muted-foreground">&</span>
                          <span className="font-medium">{calc.person_b_name}</span>
                        </div>
                        <p className="text-left text-sm text-muted-foreground">
                          {t('history.totalBill')}: {calc.total_bill.toFixed(2)} {calc.bill_currency}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(calc.created_at), {
                              addSuffix: true,
                              locale: dateLocale,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && recentCalculations.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Calculator className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  {t('dashboard.emptyState.title')}
                </h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  {t('dashboard.emptyState.description')}
                </p>
              </div>
              <Button onClick={() => navigate('/calculator')} className="gap-2">
                <Plus className="h-4 w-4" />
                {t('dashboard.emptyState.cta')}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Onboarding Tooltip */}
        <OnboardingTooltip show={showOnboarding} onComplete={handleOnboardingComplete} />
      </div>
    )
  }
