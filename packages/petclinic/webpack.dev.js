const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

console.log('using dev webpack configuration');

module.exports = merge(common, {
    devtool: 'eval-source-map',
    plugins: [
        new webpack.DefinePlugin({ 
          'process.env': {
            'NODE_ENV': JSON.stringify('development')
          }
        })
      ],
      devServer: { 
        historyApiFallback: true,
        proxy: {
          "/api-vets": {
            target: "http://localhost:8082", 
            pathRewrite: {"^/api-vets" : "petclinic-vets/"}
          },
          "/api-owners": {
            target: "http://localhost:8081", 
            pathRewrite: {"^/api-owners" : "petclinic-customers/"}
          }
        }
      }
});