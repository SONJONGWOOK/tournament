const path = require('path');

module.exports = {
  entry: ['@babel/polyfill', './src/js/entry.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/')
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'src/js')
      ],
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          //presets: ['env']
          presets: ['@babel/preset-env']
        }
      }
    },
    {
      test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader',
      options: {
        publicPath: './dist/' ,
        name: '[path][hash].[ext]'
      },
    }
    ]
  },
  devtool: 'source-map',
  mode: 'development'
};