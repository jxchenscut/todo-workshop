/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        'bg-dark': '#121212',
        'bg-card': 'rgba(30, 30, 30, 0.8)',
        'bg-card-hover': 'rgba(40, 40, 40, 0.9)',

        // Text colors
        text: {
          DEFAULT: '#ffffff',
          muted: '#b0b0b0',
          soft: '#8a8a8a',
        },

        // Border colors
        border: {
          DEFAULT: '#333333',
          soft: '#444444',
        },

        // Status colors
        'status-pending': '#6366f1',
        'status-pending-hover': '#5558e3',
        'status-in-progress': '#f59e0b',
        'status-in-progress-hover': '#e08e0a',
        'status-completed': '#10b981',
        'status-completed-hover': '#0ea374',

        // UI elements
        'primary': '#6366f1',
        'primary-hover': '#5558e3',
        'danger': '#ef4444',
        'danger-hover': '#dc2626',
        'success': '#10b981',
        'warning': '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['32px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-lg': ['24px', { lineHeight: '1.25', letterSpacing: '-0.015em', fontWeight: '600' }],
        'display-md': ['18px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'title-lg': ['16px', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],
        'title-md': ['15px', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '500' }],
        'body-lg': ['15px', { lineHeight: '1.55', letterSpacing: '0', fontWeight: '400' }],
        'body-md': ['14px', { lineHeight: '1.55', letterSpacing: '0', fontWeight: '400' }],
        'body-sm': ['13px', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '500' }],
        'button': ['14px', { lineHeight: '1', letterSpacing: '0', fontWeight: '500' }],
      },
      borderRadius: {
        'card': '12px',
        'card-sm': '8px',
        'pill': '9999px',
      },
      spacing: {
        'column': '24px',
        'card-spacing': '16px',
      },
      boxShadow: {
        'card': '0 4px 16px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.4)',
        'glow': '0 0 16px rgba(99, 102, 241, 0.3)',
        'glow-amber': '0 0 16px rgba(245, 158, 11, 0.3)',
        'glow-teal': '0 0 16px rgba(16, 185, 129, 0.3)',
      },
      backdropBlur: {
        'card': '12px',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 250ms ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 16px rgba(99, 102, 241, 0.3)' },
          '50%': { boxShadow: '0 0 24px rgba(99, 102, 241, 0.5)' },
        },
      },
      transitionDuration: {
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
      },
    },
  },
  plugins: [],
}