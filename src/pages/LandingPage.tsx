import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import {
  Calculator,
  History,
  Save,
  Users,
  TrendingUp,
  Shield,
  Zap,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useLocale } from '../contexts/LocaleContext'
import AuthModal from '../components/AuthModal'

export default function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuth()
  const { t } = useLocale()

  // If user is already authenticated, redirect to dashboard
  if (user) {
    navigate('/dashboard')
    return null
  }

  const handleTryWithoutAccount = () => {
    navigate('/guest')
  }

  const handleSignIn = () => {
    setShowAuthModal(true)
  }

  const features = [
    {
      icon: Save,
      title: t('landing.features.saveHistory.title'),
      description: t('landing.features.saveHistory.description'),
      color: 'text-blue-500',
    },
    {
      icon: History,
      title: t('landing.features.accessAnywhere.title'),
      description: t('landing.features.accessAnywhere.description'),
      color: 'text-purple-500',
    },
    {
      icon: TrendingUp,
      title: t('landing.features.analytics.title'),
      description: t('landing.features.analytics.description'),
      color: 'text-green-500',
    },
    {
      icon: Users,
      title: t('landing.features.multipleUsers.title'),
      description: t('landing.features.multipleUsers.description'),
      color: 'text-orange-500',
    },
    {
      icon: Shield,
      title: t('landing.features.secure.title'),
      description: t('landing.features.secure.description'),
      color: 'text-red-500',
    },
    {
      icon: Zap,
      title: t('landing.features.realtime.title'),
      description: t('landing.features.realtime.description'),
      color: 'text-yellow-500',
    },
  ]

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-primary/5">
      <div className="w-full max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            {t('landing.badge')}
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              {t('landing.hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('landing.hero.subtitle')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={handleSignIn}
              className="gap-2 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
            >
              <Shield className="h-5 w-5" />
              {t('landing.cta.signIn')}
              <ArrowRight className="h-5 w-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={handleTryWithoutAccount}
              className="gap-2 text-lg px-8 py-6 text-white"
            >
              <Calculator className="h-5 w-5" />
              {t('landing.cta.tryWithoutAccount')}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            {t('landing.hero.noCardRequired')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('landing.features.title')}
            </h2>
            <p className="text-muted-foreground">
              {t('landing.features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg bg-${feature.color.split('-')[1]}-500/10 flex items-center justify-center mb-2`}
                  >
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-left">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Comparison Section */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('landing.comparison.title')}
            </h2>
            <p className="text-muted-foreground">
              {t('landing.comparison.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Guest Mode Card */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  {t('landing.comparison.guest.title')}
                </CardTitle>
                <CardDescription className="text-left">
                  {t('landing.comparison.guest.subtitle')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-sm text-left">
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span>{t('landing.comparison.guest.feature1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span>{t('landing.comparison.guest.feature2')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✗
                    </div>
                    <span>{t('landing.comparison.guest.limitation1')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✗
                    </div>
                    <span>{t('landing.comparison.guest.limitation2')}</span>
                  </li>
                </ul>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleTryWithoutAccount}
                >
                  {t('landing.comparison.guest.cta')}
                </Button>
              </CardContent>
            </Card>

            {/* Full Account Card */}
            <Card className="border-2 border-primary bg-primary/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    {t('landing.comparison.full.title')}
                  </CardTitle>
                  <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full font-medium">
                    {t('landing.comparison.full.recommended')}
                  </span>
                </div>
                <CardDescription className="text-left">
                  {t('landing.comparison.full.subtitle')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-sm text-left">
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-bold">✓</span>
                    </div>
                    <span>{t('landing.comparison.full.feature1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-bold">✓</span>
                    </div>
                    <span>{t('landing.comparison.full.feature2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-bold">✓</span>
                    </div>
                    <span>{t('landing.comparison.full.feature3')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-bold">✓</span>
                    </div>
                    <span>{t('landing.comparison.full.feature4')}</span>
                  </li>
                </ul>
                <Button className="w-full" onClick={handleSignIn}>
                  {t('landing.comparison.full.cta')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center space-y-6 py-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t('landing.finalCta.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('landing.finalCta.subtitle')}
          </p>
          <Button size="lg" onClick={handleSignIn} className="gap-2 text-lg px-8 py-6">
            {t('landing.finalCta.button')}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  )
}
