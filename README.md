# gulp-responsive-imgz-lazyload
## (clone of the `gulp-responsive-imgz` repo)

add img attribute 'data-srcset' for retina and make it work with lazyload libraries

## Prerequisites
You must have retina images in the folder which the original image in.

## Install

`npm install gulp-responsive-imgz-lazyload`

## Usage

``` js
var gulp = require('gulp');
var imgRetina = require('gulp-responsive-imgz');

var retinaOpts = {
    // Your options here.
};

gulp.task('views', function() {

  return gulp.src('./views/**/*.html')
    .pipe(imgRetina(retinaOpts))
    .on('error', function(e) {
      console.log(e.message);
    })
    .pipe(gulp.dest('./build'));

});
```

You put html in:
``` html
<figure>
	<img src="images/default/example.jpg" alt="example image" />
</figure>
```

And get html out:
``` html
<figure>
	<img src="images/default/example.jpg" alt="example image" srcset="images/default/example.jpg 1x, images/default/example@2x.jpg 2x, images/default/example@3x.jpg 3x" />
</figure>
```

## Options (Optional)

### options.suffix
Type: ```Object```

Default: ```{1: '', 2: '@2x', 3: '@3x'}```

The suffix will insert to image's path, the key is resolution, and value is suffix.


## Note

SVG's are ignored
