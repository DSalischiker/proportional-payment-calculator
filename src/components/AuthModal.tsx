import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { LogIn, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useLocale } from '../contexts/LocaleContext'

interface AuthModalProps {
  open: boolean
  onClose: () => void
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const { signInWithGoogle, loading } = useAuth()
  const { t } = useLocale()

  if (!open) return null

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      onClose()
    } catch (error) {
      console.error('Failed to sign in:', error)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <Card className="relative z-10 w-full max-w-md border-2 shadow-2xl">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl">{t('auth.welcome')}</CardTitle>
              <CardDescription className="text-left">
                {t('auth.description')}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 -mt-2 -mr-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full gap-2"
            size="lg"
          >
            <LogIn className="h-5 w-5" />
            {loading ? t('auth.signingIn') : t('auth.signInWithGoogle')}
          </Button>

          <div className="space-y-2 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              {t('auth.modal.benefits')}
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                {t('auth.modal.benefit1')}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                {t('auth.modal.benefit2')}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                {t('auth.modal.benefit3')}
              </li>
            </ul>
          </div>

          <p className="text-xs text-center text-muted-foreground pt-2">
            {t('auth.modal.privacy')}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
