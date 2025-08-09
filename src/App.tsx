import ProportionalPaymentCalculator from './components/ProportionalPaymentCalculator.tsx'
import './App.css'

function App() {
  return (
    <div className="dark min-h-screen w-full max-w-full overflow-x-hidden bg-background p-4">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-foreground">
          Proportional Payment Calculator
        </h1>
        <ProportionalPaymentCalculator />
      </div>
    </div>
  )
}

export default App
