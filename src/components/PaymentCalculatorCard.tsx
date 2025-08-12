import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Calculator, DollarSign, User } from 'lucide-react'
import { useLocale } from '../contexts/LocaleContext'
import { useCurrencyRates } from '../hooks/useCurrencyRates'
import CurrencySelector, { type Currency } from './CurrencySelector'
import EditableLabel from './EditableLabel'

export interface PaymentCalculatorData {
  personAIncome: string
  personBIncome: string
  totalBill: string
  personACurrency: Currency
  personBCurrency: Currency
  billCurrency: Currency
  personAName: string
  personBName: string
}

interface PaymentCalculatorCardProps {
  onCalculate: (data: PaymentCalculatorData) => void
  onReset: () => void
}

export default function PaymentCalculatorCard({
  onCalculate,
  onReset
}: PaymentCalculatorCardProps) {
  const { t } = useLocale()
  const { rates, loading: ratesLoading } = useCurrencyRates()
  
  // Local state management
  const [personAIncome, setPersonAIncome] = useState<string>('')
  const [personBIncome, setPersonBIncome] = useState<string>('')
  const [totalBill, setTotalBill] = useState<string>('')
  const [personAIncomeDisplay, setPersonAIncomeDisplay] = useState<string>('')
  const [personBIncomeDisplay, setPersonBIncomeDisplay] = useState<string>('')
  const [totalBillDisplay, setTotalBillDisplay] = useState<string>('')
  const [personACurrency, setPersonACurrency] = useState<Currency>('ARS')
  const [personBCurrency, setPersonBCurrency] = useState<Currency>('ARS')
  const [billCurrency, setBillCurrency] = useState<Currency>('ARS')
  const [personAName, setPersonAName] = useState<string>('Persona A')
  const [personBName, setPersonBName] = useState<string>('Persona B')
  const [errors, setErrors] = useState<string[]>([])

  // Helper functions for number formatting
  const formatNumberWithCommas = (value: string): string => {
    if (!value) return ''
    
    // Remove any existing commas and non-numeric characters except decimal point
    const cleanValue = value.replace(/[^\d.]/g, '')
    
    // Split by decimal point
    const parts = cleanValue.split('.')
    
    // Add commas to the integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    
    // Rejoin with decimal point if there was one
    return parts.join('.')
  }

  const parseNumberValue = (formattedValue: string): string => {
    // Remove commas for calculation
    return formattedValue.replace(/,/g, '')
  }

  // Input handlers for formatted numbers
  const handlePersonAIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const cleanValue = parseNumberValue(inputValue)
    const formattedValue = formatNumberWithCommas(inputValue)
    
    setPersonAIncome(cleanValue)
    setPersonAIncomeDisplay(formattedValue)
  }

  const handlePersonBIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const cleanValue = parseNumberValue(inputValue)
    const formattedValue = formatNumberWithCommas(inputValue)
    
    setPersonBIncome(cleanValue)
    setPersonBIncomeDisplay(formattedValue)
  }

  const handleTotalBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const cleanValue = parseNumberValue(inputValue)
    const formattedValue = formatNumberWithCommas(inputValue)
    
    setTotalBill(cleanValue)
    setTotalBillDisplay(formattedValue)
  }

  const validateInputs = (): boolean => {
    const newErrors: string[] = []
    
    const incomeA = parseFloat(personAIncome)
    const incomeB = parseFloat(personBIncome)
    const bill = parseFloat(totalBill)
    
    if (!personAIncome || isNaN(incomeA) || incomeA <= 0) {
      newErrors.push(t('error.personAIncome'))
    }
    
    if (!personBIncome || isNaN(incomeB) || incomeB <= 0) {
      newErrors.push(t('error.personBIncome'))
    }
    
    if (!totalBill || isNaN(bill) || bill <= 0) {
      newErrors.push(t('error.totalBill'))
    }

    if (!rates && !ratesLoading) {
      newErrors.push(t('error.ratesNotAvailable'))
    }
    
    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleCalculate = () => {
    if (!validateInputs() || !rates) return
    
    onCalculate({
      personAIncome,
      personBIncome,
      totalBill,
      personACurrency,
      personBCurrency,
      billCurrency,
      personAName,
      personBName
    })
  }

  const handleReset = () => {
    setPersonAIncome('')
    setPersonBIncome('')
    setTotalBill('')
    setPersonAIncomeDisplay('')
    setPersonBIncomeDisplay('')
    setTotalBillDisplay('')
    setPersonACurrency('ARS')
    setPersonBCurrency('ARS')
    setBillCurrency('ARS')
    setPersonAName(t('breakdown.personA'))
    setPersonBName(t('breakdown.personB'))
    setErrors([])
    onReset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          {t('calculator.title')}
        </CardTitle>
        <CardDescription className="flex justify-start text-left">
          {t('calculator.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <User className='h-4 w-4' />
              <span className="text-sm font-medium">{t('calculator.income')}</span>
              <EditableLabel
                value={personAName}
                onChange={setPersonAName}
                placeholder={t('breakdown.personA')}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                id="personA"
                type="text"
                placeholder={t('calculator.personAPlaceholder')}
                value={personAIncomeDisplay}
                onChange={handlePersonAIncomeChange}
                className="flex-1"
              />
              <CurrencySelector 
                value={personACurrency} 
                onChange={setPersonACurrency}
                disabled={ratesLoading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <User className='h-4 w-4' />
              <span className="text-sm font-medium">{t('calculator.income')}</span>
              <EditableLabel
                value={personBName}
                onChange={setPersonBName}
                placeholder={t('breakdown.personB')}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                id="personB"
                type="text"
                placeholder={t('calculator.personBPlaceholder')}
                value={personBIncomeDisplay}
                onChange={handlePersonBIncomeChange}
                className="flex-1"
              />
              <CurrencySelector 
                value={personBCurrency} 
                onChange={setPersonBCurrency}
                disabled={ratesLoading}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="totalBill" className="flex items-center gap-2">
            <DollarSign className='h-4 w-4' />
            {t('calculator.totalBill')}
          </Label>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              id="totalBill"
              type="text"
              placeholder={t('calculator.billPlaceholder')}
              value={totalBillDisplay}
              onChange={handleTotalBillChange}
              className="flex-1"
            />
            <CurrencySelector 
              value={billCurrency} 
              onChange={setBillCurrency}
              disabled={ratesLoading}
            />
          </div>
        </div>

        {errors.length > 0 && (
          <div className="space-y-1">
            {errors.map((error, index) => (
              <p key={index} className="text-sm text-destructive">
                {error}
              </p>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            onClick={handleCalculate} 
            className="flex-1"
            disabled={ratesLoading || !rates}
          >
            {ratesLoading ? t('calculator.loading') : t('calculator.calculate')}
          </Button>
          <Button onClick={handleReset} variant="outline">
            {t('calculator.reset')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
