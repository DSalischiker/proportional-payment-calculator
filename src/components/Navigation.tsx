import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui/button'
import { Calculator, History } from 'lucide-react'
import { useLocale } from '../contexts/LocaleContext'
import { useAuth } from '../contexts/AuthContext'

export default function Navigation() {
  const { t } = useLocale()
  const { user } = useAuth()
  const location = useLocation()

  if (!user) return null

  const navItems = [
    {
      path: '/',
      label: t('nav.calculator'),
      icon: Calculator
    },
    {
      path: '/history',
      label: t('nav.history'),
      icon: History
    }
  ]

  return (
    <nav className="my-6">
      <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path
          return (
            <Link key={path} to={path} className="flex-1">
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-center gap-2 text-primary hover:bg-primary-foreground ${
                  isActive ? 'bg-background shadow-sm' : ''
                }`}
                size="sm"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Button>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
