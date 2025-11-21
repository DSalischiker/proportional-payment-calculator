import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { useLocale } from '../contexts/LocaleContext'

export function Breadcrumb() {
  const location = useLocation()
  const { t } = useLocale()

  const pathnames = location.pathname.split('/').filter((x) => x)

  const getBreadcrumbName = (path: string): string => {
    const breadcrumbMap: Record<string, string> = {
      dashboard: t('nav.dashboard'),
      calculator: t('nav.calculator'),
      history: t('nav.history'),
      personas: t('nav.personas'),
      analytics: t('nav.analytics'),
      settings: t('nav.settings'),
    }
    return breadcrumbMap[path] || path
  }

  if (pathnames.length === 0) return null

  return (
    <nav className="ml-12 md:ml-0 flex items-center space-x-2 text-sm text-muted-foreground">
      <Link
        to="/dashboard"
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
        const isLast = index === pathnames.length - 1

        return (
          <div key={name} className="flex items-center space-x-2">
            <ChevronRight className="h-4 w-4" />
            {isLast ? (
              <span className="font-medium text-foreground">
                {getBreadcrumbName(name)}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="hover:text-foreground transition-colors"
              >
                {getBreadcrumbName(name)}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
