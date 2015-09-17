Path Manager
====================
![path-manager build status](https://travis-ci.org/crivas/path-manager.svg?branch=master)

> Instantiable class with one parameter which is the path to a config json file. Has methods that return an array js, scss, css, and views paths to be used at the beginning of gulp or grunt task

```js
var plugins = require('gulp-load-plugins')(),
var PathManager = require('path-manager');

// instantiate with a config.json as only parameter
var pathsObj = new PathManager('./config.json');
// get js path
var jsPath = pathsObj.getJSPaths();

gulp.task('js', function () {

	return gulp.src(jsPath)
		.pipe(plugins.ngAnnotate())
		.pipe(plugins.uglify())
		.pipe(gulp.dest('dist/js'))

});

```
