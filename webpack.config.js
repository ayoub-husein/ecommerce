const path = require('path');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports =  {
  
    mode: "development", 

    devServer: {
        contentBase: path.join(__dirname, "/dist"),
        port: 1239,
        writeToDisk: true,
        open: true,
    },
  
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        publicPath: "", 
        filename: "main.js"
    },
    
    module: {
     
      rules: [   
       { 
        test: /\.html$/i,
        use: [
              {
                loader: 'html-loader',
                options: {
                minimize: true,
                }
              }
          ],
        },
        { 
          test: /\.css$/i,
          use: [
                 {   
                  loader: MiniCssExtractPlugin.loader,
                    options: {
                    esModule: false,
                    },
                 }, 
                 
                 "css-loader"
             ],
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/i,
          loader: 'file-loader',
            options: {
              outputPath: "images",
              name: '[name].[ext]',
              },
        },
      ],
  },

    plugins: [
    
      new HtmlWebpackPlugin({
            filename: "index.html",
            template: './src/index.html'
          }),
          
      new MiniCssExtractPlugin({
            filename: "css/style.css",
          }),

      new OptimizeCssAssetsPlugin({}),
    ],
} 
