/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#52ecca',
        secondary: '#061e5c',
        accent: '#028d90',
        'nz-green': {
          50: '#e6faf4',
          100: '#ccf5e9',
          500: '#52ecca',
          600: '#3eb3b5',
        },
        'nz-blue': {
          50: '#e6e7ed',
          100: '#cccfdb',
          500: '#061e5c',
          600: '#051849',
        },
        'nz-teal': {
          50: '#e6f4f4',
          100: '#cce9e9',
          500: '#028d90',
          600: '#027173',
        },
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      }
    }
  },
  plugins: [],
};