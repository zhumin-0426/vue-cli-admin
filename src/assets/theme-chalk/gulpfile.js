'use strict'

const { series, src, dest, watch } = require("gulp");
const less = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

function css() {
  return src("./src/**/*.less")
    .pipe(less())
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(cssmin())
    .pipe(dest("../css"));
}

function observe() {
  watch('./src/**/*.less',css)
}
exports.default = series([css, observe]);