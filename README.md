# Proportional Payment Calculator

A sophisticated React-based calculator that helps two people split bills proportionally based on their income differences, ensuring both parties pay the same percentage of their respective incomes. Now with **multi-currency support**, **user authentication**, and **calculation history**!

## ✨ Features

### 💰 **Core Functionality**
- **Fair Split Calculation**: Uses proportional income-based formula
- **Real-time Calculation**: Instant results as you input values
- **Input Validation**: Ensures all inputs are valid positive numbers

### 🔐 **Authentication & History**
- **Google OAuth**: Secure sign-in with Google accounts
- **Calculation History**: Automatically saves all calculations
- **Personal Dashboard**: View statistics and past calculations
- **Data Security**: Row-level security with Supabase

### 🌍 **Multi-Currency Support**
- **Six Currencies**: ARS, USD, EUR, BRL, CLP, UYU
- **Live Exchange Rates**: Real-time rates from DolarAPI
- **Mixed Currency Inputs**: Each person can use different currencies
- **Smart Conversion**: Automatic currency conversion for accurate calculations
- **Rate Display**: Beautiful exchange rates card with refresh capability

### 🎨 **User Experience**
- **Modern UI**: Built with Shadcn-UI components and Tailwind CSS
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Dark Mode**: Sleek dark theme by default
- **Loading States**: Visual feedback during operations
- **Error Handling**: Graceful fallbacks and user-friendly messages

## 🚀 How It Works

The calculator uses this proportional formula, with automatic currency conversion:

1. **Convert all amounts to ARS** (base currency)
2. **Calculate proportions**: 
   - Person A pays: Total Bill × (Person A Income / Combined Income)
   - Person B pays: Total Bill × (Person B Income / Combined Income)
3. **Convert results back** to the bill currency for display

This ensures both people pay the **exact same percentage** of their income, regardless of currency differences.

### 💡 Example

**Multi-Currency Scenario:**
- Person A earns **$5,000 USD** (≈ $6,675,000 ARS at 1,335 rate)
- Person B earns **2,000,000 ARS**
- Total bill is **R$ 500 BRL** (≈ $122,000 ARS at 244 rate)

**Result:**
- Person A pays: R$ 384.62 BRL (1.03% of income)
- Person B pays: R$ 115.38 BRL (1.03% of income)

Both pay exactly **1.03%** of their respective incomes!

## 🛠️ Technology Stack

### **Frontend**
- **React 19** - Latest React with concurrent features
- **TypeScript** - Full type safety
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling

### **Backend & Database**
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Robust relational database
- **Row Level Security** - Database-level access control
- **Real-time subscriptions** - Live data updates

### **Authentication**
- **Supabase Auth** - Secure authentication system
- **Google OAuth** - Social login integration
- **JWT Tokens** - Stateless authentication

### **UI Components**
- **Shadcn-UI** - Beautiful, accessible component library
- **Radix UI** - Unstyled, accessible primitives
- **Lucide React** - Consistent iconography

### **Currency Integration**
- **DolarAPI** - Real-time Argentine exchange rates
- **Custom Hooks** - Elegant state management
- **Automatic Fallbacks** - Resilient error handling

## 📦 Project Structure

```
proportional-payment-calculator/
├── src/
│   ├── components/
│   │   ├── ui/                           # Shadcn-UI components
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   └── select.tsx
│   │   ├── CurrencyRatesCard.tsx         # Exchange rates display
│   │   ├── CurrencySelector.tsx          # Currency dropdown
│   │   └── ProportionalPaymentCalculator.tsx # Main calculator
│   ├── hooks/
│   │   └── useCurrencyRates.ts           # Currency API integration
│   ├── lib/
│   │   └── utils.ts                      # Utility functions
│   ├── App.tsx                           # Application root
│   └── main.tsx                          # Entry point
├── scraper/                              # DolarHoy scraper (bonus)
│   ├── dolarhoy-scraper.js
│   ├── api-server.js
│   └── README.md
└── public/
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**
- **Supabase Account** (free tier available)

### Installation

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd proportional-payment-calculator
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up Supabase:**
   - Follow the detailed [Supabase Setup Guide](./SUPABASE_SETUP.md)
   - Create your `.env.local` file with Supabase credentials

4. **Start development server:**
```bash
npm run dev
```

5. **Open in browser:**
Navigate to `http://localhost:5173`

## 📖 Usage Guide

### Getting Started

1. **Sign In**: Click "Sign in with Google" to authenticate
2. **View Dashboard**: See your calculation statistics and history

### Making Calculations

1. **View Exchange Rates**: Current rates are displayed in the exchange rates card
2. **Enter Person A Income**: Input amount and select currency
3. **Enter Person B Income**: Input amount and select currency  
4. **Enter Total Bill**: Input amount and select currency
5. **Calculate**: Click "Calculate Payments" for instant results
6. **Auto-Save**: Calculation is automatically saved to your history

### Managing History

- **View Past Calculations**: Scroll through your calculation history
- **See Statistics**: Total calculations, most used currency, etc.
- **Delete Calculations**: Remove unwanted entries from your history
- **Refresh Data**: Update your history and statistics

### Currency Features

- **Mixed Currencies**: Each input can use different currencies
- **Live Rates**: Exchange rates update automatically
- **Manual Refresh**: Click refresh button to update rates
- **Fallback Rates**: Calculator works even if API is down

### Example Workflows

**Scenario 1: Same Currency**
- Both incomes in ARS, bill in ARS
- Traditional proportional split

**Scenario 2: Mixed Currencies**
- Person A: USD income
- Person B: ARS income  
- Bill: BRL
- System handles all conversions automatically

## 🔧 Configuration

### Environment Variables
```bash
# Optional: Custom API endpoints
VITE_CURRENCY_API_URL=https://dolarapi.com/v1/cotizaciones
```

### Currency Settings
- **Base Currency**: ARS (Argentine Peso)
- **Supported Currencies**: ARS, USD, BRL
- **Rate Source**: DolarAPI.com
- **Cache Duration**: 5 minutes
- **Fallback Rates**: Built-in reasonable defaults

## 🧪 Testing

### Manual Testing
1. Test with same currencies
2. Test with mixed currencies
3. Test with edge cases (very small/large amounts)
4. Test network failures (disconnect internet)
5. Test mobile responsiveness

### Currency Validation
- Rates should be within reasonable ranges
- Calculations should be mathematically correct
- UI should handle loading states gracefully

## 🎯 Key Features Explained

### **Proportional Fairness**
Unlike 50/50 splits, this calculator ensures income equity. A person earning twice as much pays twice the amount, but the same percentage of their income.

### **Currency Intelligence**
The system automatically converts all amounts to a common base (ARS) for calculation, ensuring accurate proportional splits even when mixing currencies.

### **Real-time Data**
Exchange rates are fetched live from DolarAPI, providing up-to-date conversion rates for accurate calculations.

### **User Experience**
The interface is designed to be intuitive, with clear visual feedback, loading states, and error handling for a smooth user experience.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use conventional commit messages
- Add tests for new features
- Maintain responsive design
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

- **[Scraper Tool](./scraper/)**: Additional web scraping tools for DolarHoy.com
- **DolarAPI**: Exchange rate data source
- **Shadcn-UI**: Component library used

## 🏆 Acknowledgments

- **DolarAPI** for providing free exchange rate data
- **Shadcn** for the beautiful UI components
- **Vercel** for the excellent developer experience
- **React Team** for the amazing framework

---

**Made with ❤️ for fair bill splitting across currencies**
