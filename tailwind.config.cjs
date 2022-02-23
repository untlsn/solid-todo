module.exports = {
  extract: {
    include: ['**/*.{jsx,tsx,html,css}'],
    exclude: ['node_modules', '.git', 'dist', 'build'],
  },
  theme: {
    extend: {
      colors: {
        main: {
          blue: '#390099',
          purple: '#9E0059',
          fuchsia: '#FF0054',
          orange: '#FF5400',
          yellow: '#FFBD00',
        },
      },
    },
  },
}
