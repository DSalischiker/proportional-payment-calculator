import { Button } from './ui/button'
import { LogOut, User } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useLocale } from '../contexts/LocaleContext'

export default function UserMenu() {
  const { user, signOut } = useAuth()
  const { t } = useLocale()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Failed to sign out:', error)
    }
  }

  if (!user) return null

  return (
    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
      <div className="flex items-center gap-2 flex-1">
        <User className="h-4 w-4 text-primary" />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-left text-primary">
            {user.user_metadata?.full_name || user.email}
          </span>
          <span className="text-xs text-muted-foreground">
            {user.email}
          </span>
        </div>
      </div>
      <Button 
        onClick={handleSignOut}
        variant="outline"
        size="sm"
        className="gap-2 text-primary"
      >
        <LogOut className="h-4 w-4" />
        {t('auth.signOut')}
      </Button>
    </div>
  )
}
