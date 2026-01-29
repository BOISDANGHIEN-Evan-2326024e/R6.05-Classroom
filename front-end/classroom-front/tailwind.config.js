/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        slideDown: 'slideDown 0.6s ease-out',
        slideInRight: 'slideInRight 0.6s ease-out',
        slideInUp: 'slideInUp 0.8s ease-out forwards',
        float: 'float 10s ease-in-out infinite',
        floatReverse: 'floatReverse 12s ease-in-out infinite reverse',
        spinSlow: 'spinSlow 4s linear infinite',
        bounceSubtle: 'bounceSubtle 2s ease-in-out infinite',
        rotateAxis: 'rotateAxis 3s linear infinite',
      },
      keyframes: {
        slideDown: {
          from: {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInRight: {
          from: {
            opacity: '0',
            transform: 'translateX(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(40px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(40px)',
          },
        },
        floatReverse: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-40px)',
          },
        },
        spinSlow: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
        bounceSubtle: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-6px)',
          },
        },
        rotateAxis: {
          '0%': {
            transform: 'rotateY(0deg)',
          },
          '100%': {
            transform: 'rotateY(360deg)',
          },
        },
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
}