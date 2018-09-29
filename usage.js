const package = require('./package.json');
module.exports = function (message) {
    if (message) {
        console.log(message);
    }
    console.log(
        `VIP ASCII ${package.version}

Usage: ${package.name} [options] "search query"

Options:

    -i, --invert Invert colors, recommended on dark background
    -c, --contrast [percent] Adjust video contrast
    -r, --ratio[number] Width to Height Ratio
    -f, --fps[number] Adjust playback frame rate
`);
    process.exit(0)
}
