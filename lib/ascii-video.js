const asciiPixels = require('ascii-pixels');
const charm = require('charm');
const Throttle = require('stream-throttle').Throttle;
const RawImageStream = require('./raw-image-stream');
const ffmpeg = require('./ffmpeg');
const term = charm(process);
const startFrame = function () {
  term.removeAllListeners('^C')
  term.on('^C', function () {
    term.cursor(true);
    process.exit();
  })
  term.reset();
  term.cursor(false);
};
const endFrame = function () {
  term.cursor(true).end();
};
const printFrame = (frameWidth, frameHeight, options) => (frameData) => {
  const imageData = {
    data: frameData,
    width: frameWidth,
    height: frameHeight,
    format: 'RGB24'
  };
  // convert to ascii art, but slice of the last newline
  const ascii = asciiPixels(imageData, options).slice(0, -1);
  term.erase('screen').position(0, 0).write(ascii);
};
module.exports = (video, options) => {
  const stream = ffmpeg.rawImageStream(video.url, options);
  const frameWidth = Math.round(options.width);
  const frameHeight = Math.round(1 / (video.width / frameWidth));
  const frameSize = frameWidth * frameHeight * 3; // rgb24
  startFrame();
  stream.pipe(new Throttle({
      rate: frameSize * options.fps
    }))
    .pipe(new RawImageStream(frameSize))
    .on('data', printFrame(frameWidth, frameHeight, options))
    .on('error', function (error) {
      endFrame();
      console.error(error);
    })
    .on('end', function () {
      endFrame();
    });
}
