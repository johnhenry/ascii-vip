const package = require('./package.json');
const {
    DEFAULT_CONTRAST
} = require('./defaults.js');
module.exports = function (message) {
    if (message) {
        console.log(message);
    }
    console.log(
        `VIP ASCII ${package.version}

Usage: ${package.name} [options] "search query"

Options:

    -i, --invert Invert colors, recommended on dark background
    -c, --contrast [percent] Adjust video contrast [default: ${DEFAULT_CONTRAST}]
    -r, --ratio[number] Width to Height Ratio
    -f, --fps[number] Adjust playback frame rate
`);
    process.exit(0)
}
