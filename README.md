# crossyio-unpack
crossy.io npm module unpacker

[![Build Status](https://travis-ci.org/crossyio/node-crossyio-unpack.svg?branch=master)](https://travis-ci.org/crossyio/node-crossyio-unpack)
[![Code Climate](https://codeclimate.com/github/crossyio/node-crossyio-unpack/badges/gpa.svg)](https://codeclimate.com/github/crossyio/node-crossyio-unpack)
[![Gitter](https://badges.gitter.im/crossyio/chat.svg)](https://gitter.im/crossyio/chat)

Crossy.IO allows you to easily cross compile your NPM packages for multiple operating systems / architectures. Sign up at [crossy.io](https://crossy.io).

## Usage

Include the following in your `package.json`.

```json
{
  "scripts": {
    "preinstall": "node node_modules/crossyio-unpack/preinstall.js; exit 0"
  },
  "bundledDependencies": [
    "crossyio-unpack"
  ],
  "dependencies": {
    "crossyio-unpack": "^1.0.0"
  },
  "crossyio": {
    "url": "crossy.io/org-name/package-name"
  }
}
```

When someone installs your package, the preinstall script will check `crossy.io` and, if available, download a tarball containing the package dependencies. The tarball will be extracted into your node_modules.

If the pre-compiled version is not available, the normal npm process will continue.

## Example

See [crossyio-canary](https://github.com/crossyio/node-crossyio-canary) as an example npm package.
