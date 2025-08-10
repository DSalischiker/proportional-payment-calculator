import type { Locale } from '../contexts/LocaleContext'

export const translations = {
  en: {
    // App
    'app.title': 'Proportional Payment Calculator',
    
    // Exchange Rates Card
    'exchangeRates.title': 'Exchange Rates',
    'exchangeRates.description': 'Current rates vs {baseCurrency}',
    'exchangeRates.loading': 'Loading rates...',
    'exchangeRates.error': 'Failed to load rates. Using fallback values.',
    'exchangeRates.lastUpdated': 'Last updated',
    'exchangeRates.refresh': 'Refresh exchange rates',
    'exchangeRates.expand': 'Expand exchange rates',
    'exchangeRates.collapse': 'Collapse exchange rates',
    'exchangeRates.noRates': 'No rates available',
    'exchangeRates.baseCurrency': 'Base Currency',
    'exchangeRates.selectBaseCurrency': 'Select base currency for comparison',
    
    // Currency names
    'currency.usd': 'US Dollar',
    'currency.eur': 'Euro',
    'currency.brl': 'Brazilian Real',
    'currency.clp': 'Chilean Peso',
    'currency.uyu': 'Uruguayan Peso',
    'currency.ars': 'Argentine Peso',
    
    // Payment Calculator
    'calculator.title': 'Payment Calculator',
    'calculator.description': 'Calculate how to split bills proportionally based on income differences',
    'calculator.income': 'Income',
    'calculator.personAIncome': 'Person A Income',
    'calculator.personBIncome': 'Person B Income',
    'calculator.totalBill': 'Total Bill Amount',
    'calculator.personAPlaceholder': "Enter Person A's income",
    'calculator.personBPlaceholder': "Enter Person B's income",
    'calculator.billPlaceholder': 'Enter total bill amount',
    'calculator.calculate': 'Calculate Payments',
    'calculator.loading': 'Loading rates...',
    'calculator.reset': 'Reset',
    
    // Validation errors
    'error.personAIncome': 'Person A income must be a positive number',
    'error.personBIncome': 'Person B income must be a positive number',
    'error.totalBill': 'Total bill must be a positive number',
    'error.ratesNotAvailable': 'Currency rates not available. Please try refreshing.',
    
    // Payment Breakdown
    'breakdown.title': 'Payment Breakdown',
    'breakdown.description': 'Fair split based on proportional income',
    'breakdown.personA': 'Person A',
    'breakdown.personB': 'Person B',
    'breakdown.ofIncome': 'of income',
    'breakdown.summary': 'Summary',
    'breakdown.totalBill': 'Total Bill:',
    'breakdown.pays': 'Pays:',
    'breakdown.personAPays': 'Person A Pays:',
    'breakdown.personBPays': 'Person B Pays:',
    'breakdown.samePercentage': 'Both people pay the same percentage ({percentage}) of their respective incomes.',
    
    // Language selector
    'language.english': 'English',
    'language.spanish': 'Spanish',
  },
  es: {
    // App
    'app.title': 'Calculadora de Pago Proporcional',
    
    // Exchange Rates Card
    'exchangeRates.title': 'Tipos de Cambio',
    'exchangeRates.description': 'Cotizaciones actuales vs {baseCurrency}',
    'exchangeRates.loading': 'Cargando cotizaciones...',
    'exchangeRates.error': 'Error al cargar cotizaciones. Usando valores de respaldo.',
    'exchangeRates.lastUpdated': 'Última actualización',
    'exchangeRates.refresh': 'Actualizar tipos de cambio',
    'exchangeRates.expand': 'Expandir tipos de cambio',
    'exchangeRates.collapse': 'Contraer tipos de cambio',
    'exchangeRates.noRates': 'No hay cotizaciones disponibles',
    'exchangeRates.baseCurrency': 'Moneda Base',
    'exchangeRates.selectBaseCurrency': 'Seleccionar moneda base para comparación',
    
    // Currency names
    'currency.usd': 'Dólar EEUU',
    'currency.eur': 'Euro',
    'currency.brl': 'Real',
    'currency.clp': 'Peso Chileno',
    'currency.uyu': 'Peso Uruguayo',
    'currency.ars': 'Peso Argentino',
    
    // Payment Calculator
    'calculator.title': 'Calculadora de Pagos',
    'calculator.description': 'Calcula cómo dividir gastos proporcionalmente según diferencias de ingresos',
    'calculator.income': 'Ingresos',
    'calculator.personAIncome': 'Ingresos Persona A',
    'calculator.personBIncome': 'Ingresos Persona B',
    'calculator.totalBill': 'Monto Total del Gasto',
    'calculator.personAPlaceholder': 'Ingrese ingresos',
    'calculator.personBPlaceholder': 'Ingrese ingresos',
    'calculator.billPlaceholder': 'Ingrese el gasto total',
    'calculator.calculate': 'Calcular Pagos',
    'calculator.loading': 'Cargando cotizaciones...',
    'calculator.reset': 'Reiniciar',
    
    // Validation errors
    'error.personAIncome': 'Los ingresos de la Persona A deben ser un número positivo',
    'error.personBIncome': 'Los ingresos de la Persona B deben ser un número positivo',
    'error.totalBill': 'El monto total debe ser un número positivo',
    'error.ratesNotAvailable': 'Cotizaciones no disponibles. Por favor, actualiza.',
    
    // Payment Breakdown
    'breakdown.title': 'Desglose de Pagos',
    'breakdown.description': 'División justa basada en ingresos proporcionales',
    'breakdown.personA': 'Persona A',
    'breakdown.personB': 'Persona B',
    'breakdown.ofIncome': 'de los ingresos',
    'breakdown.summary': 'Resumen',
    'breakdown.totalBill': 'Gasto Total:',
    'breakdown.pays': 'Paga:',
    'breakdown.personAPays': 'Persona A Paga:',
    'breakdown.personBPays': 'Persona B Paga:',
    'breakdown.samePercentage': 'Ambas personas pagan el mismo porcentaje ({percentage}) de sus respectivos ingresos.',
    
    // Language selector
    'language.english': 'Inglés',
    'language.spanish': 'Español',
  }
} as const

export type TranslationKeys = keyof typeof translations[Locale]
