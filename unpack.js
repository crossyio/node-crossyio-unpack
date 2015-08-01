//      __//
//     /.__.\
//     \ \/ /
//  '__/    \
//   \-      )
//    \_____/
// _____|_|____
//      " "
//   crossy.io

'use strict'
var fs = require('fs');
var os = require('os');
var zlib = require('zlib');
var path = require('path');
var http = require('http');
var packageJSON = require(path.resolve(process.cwd(), 'package.json'));

var tar;

try {
  tar = require('tar');
} catch (error) {
  console.error("crossy.io -- could not load tar, giving up.");
  process.exit(0);
}

function unpack() {
  var filename = [
    packageJSON.name,
    packageJSON.version,
  ].join('-') + '.tar.gz';

  var downloadUrl = 'http://' + path.join(
    'cdn.' + packageJSON.crossyio.url,
    'npm',
    process.version,
    os.platform(),
    os.arch(),
    packageJSON.version,
    filename
  );

  var request = http.get(downloadUrl, function(response) {
    var unzipped;
    switch (response.headers['content-encoding']) {
      // or, just use zlib.createUnzip() to handle both cases
      case 'gzip':
        unzipped = response.pipe(zlib.createGunzip());
        break;
      case 'deflate':
        unzipped = response.pipe(zlib.createInflate())
        break;
    }

    if (!unzipped) {
      console.error('crossy.io -- unable to unzip file, giving up.');
      process.exit(0);
    }

    unzipped.pipe(tar.Extract({path: 'node_modules', strip: 1}))
      .on('error', function(error) {
        if (error) {
          console.error("crossy.io -- " + error.message + ', giving up.');
        }
        process.exit(0);
      });
  });

  request.on('error', function(error){
    if (error) {
      console.error("crossy.io -- " + error.message + ', giving up.');
    }
    process.exit(0);
  });
}

module.exports = {
  unpack: unpack
}
