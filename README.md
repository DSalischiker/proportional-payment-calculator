# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Proportional Payment Calculator

A React-based calculator that helps two people split bills proportionally based on their income differences, ensuring both parties pay the same percentage of their respective incomes.

## Features

- **Fair Split Calculation**: Uses the formula where each person pays according to their income ratio
- **Real-time Calculation**: Instant results as you input values
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with Shadcn-UI components and Tailwind CSS
- **Input Validation**: Ensures all inputs are valid positive numbers

## How It Works

The calculator uses this formula:

- **Person A pays**: Total Bill × (Person A Income / (Person A Income + Person B Income))
- **Person B pays**: Total Bill × (Person B Income / (Person A Income + Person B Income))

This ensures both people pay the same percentage of their income.

### Example

If Person A earns $60,000 and Person B earns $40,000, and the total bill is $100:

- Person A pays: $100 × ($60,000 / $100,000) = $60 (0.1% of income)
- Person B pays: $100 × ($40,000 / $100,000) = $40 (0.1% of income)

Both pay 0.1% of their respective incomes.

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd proportional-payment-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Enter Person A's income in the first input field
2. Enter Person B's income in the second input field
3. Enter the total bill amount in the third input field
4. Click "Calculate Payments" to see the results
5. View the breakdown showing:
   - How much each person should pay
   - What percentage of their income this represents
   - A summary of the total split

## Technology Stack

- **React 19** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **Tailwind CSS** - Styling framework
- **Shadcn-UI** - UI component library
- **Lucide React** - Icons

## Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn-UI components
│   └── ProportionalPaymentCalculator.tsx
├── lib/
│   └── utils.ts         # Utility functions
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
