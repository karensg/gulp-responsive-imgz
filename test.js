const assert = require('assert');
const gutil = require('gulp-util');
const imgRetina = require('./index');

const imgInput = '<img src="blank.png"><img src="/path/blank.png">';
const imgOutput = '<img src="blank.png" srcset="blank.png 1x, blank@2x.png 2x, blank@3x.png 3x"><img src="/path/blank.png" srcset="/path/blank.png 1x, /path/blank@2x.png 2x, /path/blank@3x.png 3x">';

describe('gulp-img-retina', function() {
  it('should set img attribute', function(cb) {

    const stream = imgRetina();

    stream.once('data', function(file) {

      // make sure it came out the same way it went in
      assert(file.isStream);

      // check the contents
      assert(String(file.contents).indexOf(imgOutput) !== -1);
      cb();
    });

    stream.write(new gutil.File({
      path: 'index.html',
      contents: new Buffer(imgInput)
    }));
  });
});
