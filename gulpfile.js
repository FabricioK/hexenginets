const gulp = require('gulp');
const ts = require('gulp-typescript');
const jasmine = require('gulp-jasmine');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
var typedoc = require("gulp-typedoc");

gulp.task("typedoc", function() {
   return gulp
       .src(["src/**/*.ts"])
       .pipe(typedoc({
           // TypeScript options (see typescript docs)
           module: "commonjs",
           target: "es5",
           includeDeclarations: false,
           ignoreCompilerErrors: true,
           exclude  : "*.spec.ts",
           // Output options (see typedoc docs)
           out: "./docs",
           // TypeDoc options (see typedoc docs)
           name: "hexenginets",
           version: false,
       }))
   ;
});
gulp.task('build', function () {
    const merge = require('merge2');
    const tsProject = ts.createProject('tsconfig.json');

    var tsResult = tsProject.src()
        .pipe(tsProject());

    return merge([
        tsResult.dts.pipe(gulp.dest('./definitions')),
        tsResult.js.pipe(gulp.dest(tsProject.config.compilerOptions.outDir))
    ]);
});

gulp.task('clean', function () {
    return gulp.src('dist', { read: false })
        .pipe(clean());
});
gulp.task('cleandef', function () {
    return gulp.src('definitions', { read: false })
        .pipe(clean());
});

gulp.task('test:run', function () {
    return gulp.src('dist/spec/**')
        .pipe(jasmine())
});

gulp.task('watch', ['default'], function () {
    gulp.watch('src/**/*.ts', ['default']);
});

gulp.task('test', [], function (cb) {
    runSequence('clean','cleandef', 'build', 'test:run', cb);
});
gulp.task('default', [], function (cb) {
    runSequence('clean','cleandef', 'build', 'typedoc', cb);
});