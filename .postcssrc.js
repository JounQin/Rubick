const config = {
  plugins: {
    autoprefixer: null,
  },
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.cssnano = {
    preset: [
      'default',
      {
        discardComments: {
          removeAll: true,
        },
      },
    ],
  }
}

module.exports = config
