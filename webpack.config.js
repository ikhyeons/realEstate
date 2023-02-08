const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // clean-webpack-plugin을 가져옴 이전 번들링 파일 제거를 위함
const webpack = require('webpack') // 웹팩을 가져옴
const nodeExternals = require('webpack-node-externals')

module.exports = (env, argv) => {
  const prod = argv.mode === 'production'

  return {
    mode: prod ? 'production' : 'development', //prod가 true면 프로덕션 모드, 아니면 개발모드
    devtool: prod ? 'hidden-source-map' : 'eval',
    entry: './src/index.tsx', // 번들링하기위해 맨 처음 확인하는 파일

    output: {
      // 출력물 관련 설정
      path: path.join(__dirname, '/dist'), // 출력되는 파일 위치
      filename: '[name].js', // 출력되는 파일 이름
    },
    devServer: {
      port: 3000, // 웹팩 개발서버를 돌렸을 때 돌아갈 포트번호
      hot: true, // 저장시 바로 화면에 적용되게 끔 하기위한 핫 리로더
      historyApiFallback: true, // 라우팅된 페이지에서 중간 새로고침 시 화면 유지
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'], // 배열 안 확장자에 따라서 번들링을 처리함
      fallback: {
        path: require.resolve('path-browserify'),
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
        timers: require.resolve('timers-browserify'),
        fs: require.resolve('browserify-fs'),
      },
    },
    module: {
      //loader 설정
      rules: [
        {
          test: /\.tsx?$/, //tsx 확장자의 모든 모듈을 포함함
          use: ['babel-loader', 'ts-loader'], //어떤 로더를 사용할지를 설정함 왼쪽부터 오른쪽 순서로 먼저 적용함.
          //즉 tsx라는 확장자를 가지고 있을 경우 ts-loader를 이용하여 트랜스 파일링 한 후 babel-loader로 es5 트랜스 파일링 함
          exclude: [/BackServer/, /node_modules/],
        },
        {
          test: /\.css?$/, //css 확장자의 모든 모듈을 포함함
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      //플러그인들을 끼워넣는 부분
      new webpack.ProvidePlugin({
        // 자주 사용되는 모듈을 미리 등록하여 매번 작성하지 않게 하는 플러그인
        React: 'react',
        process: 'process/browser.js',
        Buffer: ['buffer', 'Buffer'],
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        minify:
          process.env.NODE_ENV === 'production' // 환경이 프로덕션 환경일 경우
            ? {
                collapseWhitespace: true, //빈칸을 제거함
                removeComments: true, //주석을 제거함
              }
            : false,
      }),
      new CleanWebpackPlugin(), // 미리 있는 번들링 제거
    ],
  }
}
