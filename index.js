#!/usr/bin/env node

var path = require('path')
var asciiVideo = require('./lib/ascii-video')
const {
  DEFAULT_CONTRAST
} = require('./defaults.js');
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
var resolution = 720;
var size = 360;
var encoding = "ts";
var fps = 30;
var ratio = 256 / 144;

try {
  if (!argv._ || !argv._.length) {
    throw new Error("No parameters specified")
  }
  var url = argv._.join(' ');
  var videoInfo = {
    url,
    width: ratio,
  }
  var videoOptions = {
    // TODO: some (old?) videos have fps incorrectly set to 1.
    fps: argv.fps /* || video.fps */ || 12,
    // TODO: width does not work well if video height is larger than terminal window
    width: argv.ratio || process.stdout.columns || 80,
    contrast: (argv.contrast || DEFAULT_CONTRAST) * 2.55, // percent to byte
    invert: argv.invert
  }
  // play video as ascii
  asciiVideo(videoInfo, videoOptions);
} catch (error) {
  require('./usage.js')(error.message);
}
