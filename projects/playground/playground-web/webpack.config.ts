import webpack from "webpack";
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default function (env, argv) {

  const config: webpack.Configuration = {
    entry: './src/index.tsx',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({template: './public/index.html'})
    ]
  };
  return config;
};
