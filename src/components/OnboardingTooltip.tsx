import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Button } from './ui/button'
import { X, ChevronRight, ChevronLeft } from 'lucide-react'
import { useLocale } from '../contexts/LocaleContext'

interface OnboardingTooltipProps {
  show: boolean
  onComplete: () => void
}

interface TooltipStep {
  title: string
  description: string
  position: 'top' | 'bottom' | 'center'
}

export default function OnboardingTooltip({ show, onComplete }: OnboardingTooltipProps) {
  const { t } = useLocale()
  const [currentStep, setCurrentStep] = useState(0)

  const steps: TooltipStep[] = [
    {
      title: t('onboarding.step1.title'),
      description: t('onboarding.step1.description'),
      position: 'center',
    },
    {
      title: t('onboarding.step2.title'),
      description: t('onboarding.step2.description'),
      position: 'center',
    },
    {
      title: t('onboarding.step3.title'),
      description: t('onboarding.step3.description'),
      position: 'center',
    },
  ]

  useEffect(() => {
    if (!show) {
      setCurrentStep(0)
    }
  }, [show])

  if (!show) return null

  const currentTooltip = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0

  const handleNext = () => {
    if (isLastStep) {
      onComplete()
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Tooltip Content */}
      <Card className="relative z-10 w-full max-w-md border-2 shadow-2xl animate-in fade-in zoom-in duration-300">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-1">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        index === currentStep
                          ? 'w-8 bg-primary'
                          : index < currentStep
                          ? 'w-2 bg-primary/50'
                          : 'w-2 bg-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {currentStep + 1} / {steps.length}
                </span>
              </div>
              <CardTitle className="text-xl">{currentTooltip.title}</CardTitle>
              <CardDescription className="text-left">
                {currentTooltip.description}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSkip}
              className="h-8 w-8 -mt-2 -mr-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              onClick={handleSkip}
              size="sm"
            >
              {t('onboarding.skip')}
            </Button>

            <div className="flex items-center gap-2">
              {!isFirstStep && (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  size="sm"
                  className="gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  {t('onboarding.previous')}
                </Button>
              )}

              <Button onClick={handleNext} size="sm" className="gap-2">
                {isLastStep ? t('onboarding.finish') : t('onboarding.next')}
                {!isLastStep && <ChevronRight className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
