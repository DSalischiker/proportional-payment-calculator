import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Button } from './ui/button'
import { Shield, AlertCircle, Sparkles, ArrowRight } from 'lucide-react'
import { useLocale } from '../contexts/LocaleContext'

interface GuestBannerProps {
  variant?: 'info' | 'upgrade'
}

export default function GuestBanner({ variant = 'info' }: GuestBannerProps) {
  const { t } = useLocale()
  const navigate = useNavigate()

  if (variant === 'info') {
    return (
      <Card className="border-blue-500/50 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <AlertCircle className="h-5 w-5" />
            {t('guest.banner.info.title')}
          </CardTitle>
          <CardDescription className="text-left">
            {t('guest.banner.info.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => navigate('/')}
              className="gap-2"
              size="sm"
            >
              <Shield className="h-4 w-4" />
              {t('guest.banner.info.createAccount')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Scroll to features or show more info
              }}
            >
              {t('guest.banner.info.learnMore')}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-primary/50 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 animate-in slide-in-from-bottom">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Sparkles className="h-5 w-5" />
          {t('guest.banner.upgrade.title')}
        </CardTitle>
        <CardDescription className="text-left">
          {t('guest.banner.upgrade.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-primary">✓</span>
            <span>{t('guest.banner.upgrade.feature1')}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary">✓</span>
            <span>{t('guest.banner.upgrade.feature2')}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary">✓</span>
            <span>{t('guest.banner.upgrade.feature3')}</span>
          </div>
        </div>
        <Button
          onClick={() => navigate('/')}
          className="w-full gap-2"
          size="lg"
        >
          {t('guest.banner.upgrade.cta')}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
