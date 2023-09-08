const path = require('path');
const webpack = require('webpack'); // для подключения jquery 

module.exports = {

  entry: {
    appA: __dirname + '/public/index.ts',
    enterpageA: __dirname + '/public/enter.ts'
  },
  
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/distribute'),
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery'",
      "window.$": "jquery"
    })
  ], 

  // mode: 'production',
  mode: 'development',
  watch: true,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: {
          loader: "style-loader",
          loader: "css-loader"
        }
      }
      
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

};