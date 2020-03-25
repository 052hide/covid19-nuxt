/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    fill: {
      primary: '#4baf8d',
      secondary: '#252626'
    },
    extend: {
      zIndex: {
        navButton: '20'
      },
      colors: {
        primary: {
          bg: '#4baf8d',
          border: '#4baf8d',
          text: '#4baf8d',
          textLight: '#9baf8d'
        },
        secondary: {
          bg: '#000',
          border: '#252626',
          text: '#252626',
          textLight: '#852626'
        }
      }
    }
  },
  variants: {},
  plugins: []
}
