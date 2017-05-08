/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import del from 'del';
import eslint from 'gulp-eslint';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';

const paths = {
  allSrcJs: 'src/*.js?(x)',
  entryPoint: 'src/index.jsx',
  gulpFile: 'gulpfile.babel.js',
  webpackFile: 'webpack.config.babel.js',
  distDir: 'dist/js',
  bundleFile: 'dist/js/index.js?(.map)',
};

gulp.task('lint', () =>
  gulp.src([
    // paths.allSrcJs,
    // To Avoid linting during tutorial
    paths.gulpFile,
    paths.webpackFile,
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()),
);

gulp.task('clean', () => del([
  paths.bundleFile,
]));

gulp.task('main', ['lint', 'clean'], () =>
  gulp.src(paths.entryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.distDir)),
);

gulp.task('watch', () => {
  gulp.watch(paths.allSrcJs, ['main']);
});

gulp.task('default', ['watch', 'main']);
