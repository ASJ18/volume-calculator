/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        glass: 'rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'gradient-x': 'gradientX 8s ease infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
      },

  
      keyframes: {
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
animation: {
  'gradient-x': 'gradientX 8s ease infinite',
  'fade-in-down': 'fadeInDown 1s ease-out',
  float: 'float 10s ease-in-out infinite',
},
keyframes: {
  gradientX: {
    '0%, 100%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
  },
  fadeInDown: {
    '0%': { opacity: 0, transform: 'translateY(-20px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
  float: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-20px)' },
  },
}





    },
  },
  plugins: [],
}
