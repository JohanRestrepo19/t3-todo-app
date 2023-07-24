import { type Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#009AFA',
        'primary-dark': '#32BA97',
        base: colors.slate[200],
        'base-dark': colors.slate[700]
      }
    }
  },
  plugins: []
} satisfies Config
