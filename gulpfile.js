"use strict";


const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
const browserSync = require('browser-sync').create();

// sassからcssへcompileするための関数
const compileSass = () =>
  src("asset/scss/**/*.scss")
    .pipe(sassGlob())
    .pipe(
      sass({
        outputStyle: "expanded"
      })
      .on(
        'error', sass.logError
      )
    )
    .pipe( postcss([ autoprefixer(
      {
        cascade: false
      }
    ) ]) )
    .pipe(dest("asset/css"));


// リロードするhtml
const buildServer = (done) => {
  browserSync.init({
    server: {
        baseDir: "./",
        startPath: "index.html"
    }
});
done();
console.log('Server was launched');
};

// リロード設定
const reloadBrowser = (done) => {
  browserSync.reload();
  done();
  console.log('Browser reload completed');
};


// sassファイルの変更を監視するための関数
const WatchSass = () => {
  watch("*.html", reloadBrowser);
  watch("*asset/js/*.js", reloadBrowser);
  watch("asset/scss/**/*.scss", series(compileSass,reloadBrowser));
}

// export
exports.default = series(buildServer,compileSass,WatchSass);