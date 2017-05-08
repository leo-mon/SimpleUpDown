# react-tutorial
Studying about [react tutorial](https://facebook.github.io/react/tutorial/tutorial.html), environment is prepared referring to [javascript-from-scratch](https://github.com/verekia/js-stack-from-scratch)

* react tutorial (tic-tac-toe): Copyright (c) 2017 by Eric Nakagawa (http://codepen.io/ericnakagawa/pen/vXpjwZ)

## Branches
Would be created at each periods

## Setup
clone and switch to initial branch.
```
yarn install
yarn start
```
(Maybe you have to remove lockfile)

or download tutorial sourcefile and set directory like this (and rename), and copy gulpfile.babel.js, webpack.config.babel.js, package.json.

### From scratch
Omit build for node.js

```
# node 6.9.4 by nvm
# npm install -g yarn

yarn init -y

yarn add --dev gulp gulp-babel babel-preset-latest del babel-loader webpack-stream babel-preset-react
export PKG=eslint-config-airbnb
npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs yarn add --dev "$PKG@latest"
yarn add --dev eslint-config-airbnb gulp-eslint

yarn add react react-dom babel-polyfill
```

# Configure
```
mkdir src dist
vim package.json
```
```package.json
{
  "name": "react-tutorial",
  "version": "1.0.0",
  "main": "index.js",
  "repository": {},
  "license": "MIT",
  "devDependencies": {
    "babel-loader": "^6.2.10",
    "babel-preset-latest": "^6.22.0",
    "babel-preset-react": "^6.22.0",
    "del": "^2.2.2",
    "eslint": "^3.13.0",
    "eslint-config-airbnb": "^14.0.0",
    "eslint-plugin-import": "^2.2.0",
    "eslint-plugin-jsx-a11y": "^3.0.2",
    "eslint-plugin-react": "^6.9.0",
    "gulp": "^3.9.1",
    "gulp-babel": "^6.1.2",
    "gulp-eslint": "^3.0.1",
    "webpack-stream": "^3.2.0"
  },
  "dependencies": {
    "babel-polyfill": "^6.22.0",
    "react": "^15.4.2",
    "react-dom": "^15.4.2"
  },
  "babel": {
    "presets": [
      "latest",
      "react"
    ]
  },
  "eslintConfig": {
    "extends": "airbnb",
    "plugins": [
      "import"
    ],
    "env": {
      "browser": true
    }
  },
  "scripts": {
    "start": "gulp"
  }
}
```


```
vim gulpfile.babel.js
```
```gulpfile.babel.js
/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import eslint from 'gulp-eslint';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';

const paths = {
  allSrcJs: 'src/**/*.js',
  EntryPoint: 'src/index.jsx',
  gulpFile: 'gulpfile.babel.js',
  webpackFile: 'webpack.config.babel.js',
  libDir: 'lib',
  distDir: 'dist',
  bundle: 'dist/js/index.js?(.map)',
};

gulp.task('clean', () => del([
  paths.libDir,
  paths.bundle,
]));

gulp.task('build', ['lint', 'clean'], () =>
  gulp.src(paths.allSrcJs)
    .pipe(babel())
    .pipe(gulp.dest(paths.libDir)),
);

gulp.task('main', ['lint', 'clean'], () =>
  gulp.src(paths.EntryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.distDir)),
);

gulp.task('watch', () => {
  gulp.watch(paths.allSrcJs, ['main']);
});

gulp.task('default', ['watch', 'main']);

gulp.task('lint', () =>
  gulp.src([
    paths.allSrcJs,
    paths.gulpFile,
    paths.webpackFile,
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()),
);
```

```
vim webpack.config.babel.js
```
```webpack.config.babel.js
export default {
  output: {
    filename: 'index.js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
```
