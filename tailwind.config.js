/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    extend: {
      colors: {
        web: '#1438A6',
        light: '#b2c5ff'
      },
      gridTemplateRows: {
        layout: '1fr 1fr'
      },
      gridTemplateColumns: {
        postCardGrid: 'repeat(auto-fill, minMax(260px, 1fr))'
      },
      minHeight: {
        card: '300px'
      },
      flex: {
        thirds: '0 0 32%'
      }
    },
    variants: {
      marginLeft: ['last']
    }
  },
  plugins: []
}
