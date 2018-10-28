const through = require('through2');
const cheerio = require('cheerio');
const objectAssign = require('object-assign');
const gutil = require('gulp-util');

const reImageSrc = /^((?:(?:http|https):\/\/)?(?:.+))(\.(?:gif|png|jpg|jpeg|webp))$/;

const defaultOptions = {
  decodeEntities: false,
  suffix: {1: '', 2: '@2x', 3: '@3x'}
};

const imageRetina = function(options) {

  options = objectAssign({}, defaultOptions, options);

  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-img-imgz-lazyload', 'Streaming not supported'));
      return;
    }

    const content = file.contents.toString();

    const $ = cheerio.load(content, options);

    const imgList = $('img');

    imgList.each(function() {
      const _this = $(this);
      let prefix = '';
      let src = _this.attr('src');

      if (!src) {
        src = _this.attr('data-src');
        prefix = 'data-';
      }

      const tmpSrc = [];
      const match = src.match(reImageSrc);

      // Not a valid src attribute
      if (match === null) {
        return true;
      }

      for (let key = 1; key < 4; key++) {
        tmpSrc.push(match[1] + options.suffix[key] + match[2] + ' ' + key + 'x');
      }

      _this.attr(prefix + 'srcset', tmpSrc.join(', '));
    });

    file.contents = new Buffer($.html());

    cb(null, file);
  });
};


module.exports = imageRetina;
