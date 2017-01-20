/**
 * Sagui configuration object
 * see: http://sagui.js.org/
 */
module.exports = {
  libraries: [
    {
      main: 'index',
      umdName: 'reactFormFactory'
    }
  ],
  webpack: {
    module: {
      preLoaders: [
        {
          test: /\.(jsx?|es6)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        }
      ]
    }
  }
}
