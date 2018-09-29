#!/usr/bin/env node

var path = require('path')
var asciiVideo = require('./lib/ascii-video.js')

// command line options
var argv = require('minimist')(process.argv.slice(2), {
  alias: {
    i: 'invert',
    c: 'contrast',
    r: 'ratio',
    m: 'mute',
    f: 'fps'
  },
  boolean: ['invert', 'mute']
});

try {
  if (!argv._ || !argv._.length) {
    throw new Error("No parameters specified")
  }
  // play video as ascii
  asciiVideo(argv._.join(' '), {
    // TODO: some (old?) videos have fps incorrectly set to 1.
    fps: argv.fps /* || video.fps */ || 12,
    // TODO: width does not work well if video height is larger than terminal window
    width: argv.ratio,
    contrast: argv.contrast, // percent to byte
    invert: argv.invert,
    ratio: argv.ratio
  });
} catch (error) {
  require('./usage.js')(error.message);
}
