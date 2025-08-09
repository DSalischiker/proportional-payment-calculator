import ProportionalPaymentCalculator from './components/ProportionalPaymentCalculator.tsx'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-foreground">
          Proportional Payment Calculator
        </h1>
        <ProportionalPaymentCalculator />
      </div>
    </div>
  )
}

export default App
