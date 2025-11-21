import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { cn } from '../lib/utils'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'
import {
  Calculator,
  History,
  Users,
  BarChart3,
  Settings,
  Home,
  ChevronLeft,
  ChevronRight,
  Plus,
  LogOut,
  Moon,
  Sun,
  Globe,
  Menu,
  X,
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useLocale } from '../contexts/LocaleContext'
import { useTheme } from '../contexts/ThemeContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  shortcut?: string
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const { t, locale, setLocale } = useLocale()
  const { actualTheme, toggleTheme } = useTheme()

  const navItems: NavItem[] = [
    {
      title: t('nav.dashboard'),
      href: '/dashboard',
      icon: Home,
      shortcut: 'D',
    },
    {
      title: t('nav.calculator'),
      href: '/calculator',
      icon: Calculator,
      shortcut: 'K',
    },
    {
      title: t('nav.history'),
      href: '/history',
      icon: History,
      shortcut: 'H',
    },
    {
      title: t('nav.personas'),
      href: '/personas',
      icon: Users,
      badge: t('nav.comingSoon'),
      shortcut: 'P',
    },
    {
      title: t('nav.analytics'),
      href: '/analytics',
      icon: BarChart3,
      badge: t('nav.comingSoon'),
      shortcut: 'A',
    },
  ]

  const isActive = (href: string) => location.pathname === href

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  function toggleLocale() {
    setLocale(locale === 'en' ? 'es' : 'en')
  }

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey) {
        const item = navItems.find(
          (item) => item.shortcut?.toLowerCase() === e.key.toLowerCase()
        )
        if (item && !item.badge) {
          e.preventDefault()
          navigate(item.href)
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [navigate])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const sidebarContent = (
    <>
      {/* Logo & Collapse Button */}
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!collapsed && (
          <Link to="/dashboard" className="flex items-center gap-2">
            <Calculator className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">{t('app.name')}</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn('h-8 w-8 hidden lg:flex', collapsed && 'mx-auto')}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(false)}
          className="h-8 w-8 lg:hidden"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Quick Action Button */}
      <div className="py-4 px-3">
        <Button
          className="w-full justify-start gap-2"
          onClick={() => navigate('/calculator')}
        >
          <Plus className="h-4 w-4" />
          {!collapsed && t('actions.newCalculation')}
        </Button>
      </div>

      {/* Navigation Items */}
      <ScrollArea className="flex-1 px-3">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.badge ? '#' : item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                'hover:bg-accent hover:text-accent-foreground',
                isActive(item.href)
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-muted-foreground',
                item.badge && 'cursor-not-allowed opacity-50'
              )}
              onClick={(e) => {
                if (item.badge) e.preventDefault()
              }}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.title}</span>
                  {item.badge && (
                    <span className="text-xs bg-muted px-2 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
                  {item.shortcut && !item.badge && (
                    <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium opacity-100">
                      <span className="text-xs">⌘</span>
                      {item.shortcut}
                    </kbd>
                  )}
                </>
              )}
            </Link>
          ))}
        </nav>
      </ScrollArea>

      {/* Bottom Section - User Menu & Settings */}
      <div className="border-t p-3 space-y-2">
        {/* Theme & Language Toggles */}
        {!collapsed && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="flex-1 gap-2"
            >
              {actualTheme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">
                {actualTheme === 'dark' ? t('theme.light') : t('theme.dark')}
              </span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLocale}
              className="flex-1 gap-2"
            >
              <Globe className="h-4 w-4" />
              {locale === 'en' ? 'ES' : 'EN'}
            </Button>
          </div>
        )}

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start gap-3 h-12',
                collapsed && 'justify-center px-0'
              )}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback>
                  {user?.user_metadata?.name?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex flex-col items-start text-left flex-1 min-w-0">
                  <span className="text-sm font-medium truncate w-full">
                    {user?.user_metadata?.name || t('user.guest')}
                  </span>
                  <span className="text-xs text-muted-foreground truncate w-full">
                    {user?.email}
                  </span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{t('user.account')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              {t('user.settings')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              {t('auth.signOut')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - Desktop */}
      <div
        className={cn(
          'hidden lg:flex relative flex-col border-r bg-card transition-all duration-300',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        {sidebarContent}
      </div>

      {/* Sidebar - Mobile */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 flex flex-col border-r bg-card transition-transform duration-300 lg:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {sidebarContent}
      </div>
    </>
  )
}
