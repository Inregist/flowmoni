/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    keyframes: {
      slideDown: {
        '0%': { height: '0' },
        '100%': {height: 'var(--radix-accordion-content-height)'},
      },
      slideUp: {
        '0%': { height: 'var(--radix-accordion-content-height)' },
        '100%': { height: '0' },
      },
    },
    animation: {
      'slide-down': 'slideDown 100ms linear',
      'slide-up': 'slideUp 100ms linear',
    },
  },

  plugins: [],
};
