const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    devtool: 'eval-source-map',
    plugins: [
        new webpack.DefinePlugin({ 
          'process.env': {
            'NODE_ENV': JSON.stringify('development')
          }
        })
      ],
      devServer: { historyApiFallback: true }
});