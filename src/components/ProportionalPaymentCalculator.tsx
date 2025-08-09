import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Calculator, DollarSign, Percent } from 'lucide-react'

interface CalculationResult {
  personAPayment: number
  personBPayment: number
  personAPercentage: number
  personBPercentage: number
}

export default function ProportionalPaymentCalculator() {
  const [personAIncome, setPersonAIncome] = useState<string>('')
  const [personBIncome, setPersonBIncome] = useState<string>('')
  const [totalBill, setTotalBill] = useState<string>('')
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [errors, setErrors] = useState<string[]>([])

  const validateInputs = (): boolean => {
    const newErrors: string[] = []
    
    const incomeA = parseFloat(personAIncome)
    const incomeB = parseFloat(personBIncome)
    const bill = parseFloat(totalBill)
    
    if (!personAIncome || isNaN(incomeA) || incomeA <= 0) {
      newErrors.push('Person A income must be a positive number')
    }
    
    if (!personBIncome || isNaN(incomeB) || incomeB <= 0) {
      newErrors.push('Person B income must be a positive number')
    }
    
    if (!totalBill || isNaN(bill) || bill <= 0) {
      newErrors.push('Total bill must be a positive number')
    }
    
    setErrors(newErrors)
    return newErrors.length === 0
  }

  const calculatePayments = () => {
    if (!validateInputs()) return
    
    const incomeA = parseFloat(personAIncome)
    const incomeB = parseFloat(personBIncome)
    const bill = parseFloat(totalBill)
    
    const totalIncome = incomeA + incomeB
    
    // Calculate proportional payments
    const personAPayment = bill * (incomeA / totalIncome)
    const personBPayment = bill * (incomeB / totalIncome)
    
    // Calculate percentages of income
    const personAPercentage = (personAPayment / incomeA) * 100
    const personBPercentage = (personBPayment / incomeB) * 100
    
    setResult({
      personAPayment,
      personBPayment,
      personAPercentage,
      personBPercentage
    })
  }

  const resetCalculator = () => {
    setPersonAIncome('')
    setPersonBIncome('')
    setTotalBill('')
    setResult(null)
    setErrors([])
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatPercentage = (percentage: number): string => {
    return `${percentage.toFixed(2)}%`
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Payment Calculator
          </CardTitle>
          <CardDescription>
            Calculate how to split bills proportionally based on income differences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="personA">Person A Income</Label>
              <Input
                id="personA"
                type="number"
                placeholder="Enter Person A's income"
                value={personAIncome}
                onChange={(e: any) => setPersonAIncome(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="personB">Person B Income</Label>
              <Input
                id="personB"
                type="number"
                placeholder="Enter Person B's income"
                value={personBIncome}
                onChange={(e: any) => setPersonBIncome(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="totalBill">Total Bill Amount</Label>
            <Input
              id="totalBill"
              type="number"
              placeholder="Enter total bill amount"
              value={totalBill}
              onChange={(e: any) => setTotalBill(e.target.value)}
              min="0"
              step="0.01"
            />
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
            <Button onClick={calculatePayments} className="flex-1">
              Calculate Payments
            </Button>
            <Button onClick={resetCalculator} variant="outline">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Payment Breakdown
            </CardTitle>
            <CardDescription>
              Fair split based on proportional income
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Person A</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-2xl font-bold">
                        {formatCurrency(result.personAPayment)}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Percent className="h-4 w-4" />
                      <span>
                        {formatPercentage(result.personAPercentage)} of income
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Person B</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-2xl font-bold">
                        {formatCurrency(result.personBPayment)}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Percent className="h-4 w-4" />
                      <span>
                        {formatPercentage(result.personBPercentage)} of income
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-accent rounded-lg">
              <h4 className="font-semibold mb-2">Summary</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Total Bill:</span>
                  <p className="font-semibold">{formatCurrency(parseFloat(totalBill))}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Person A Pays:</span>
                  <p className="font-semibold">{formatCurrency(result.personAPayment)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Person B Pays:</span>
                  <p className="font-semibold">{formatCurrency(result.personBPayment)}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Both people pay the same percentage ({formatPercentage(result.personAPercentage)}) of their respective incomes.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
