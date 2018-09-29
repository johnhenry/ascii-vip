# ASCII VIP

Play video in the commandline


## CLI Usage

### Installation

```shell
npm install --global vip-ascii
```

### Get Help

```shell
vip-ascii
```

### Play Video

```shell
vip-ascii <path to video>
```

## Project Usage

### Installation

```shell
npm install vip-ascii
```

### Import and use

```javascript
const vipascii = require("vip-ascii");
vipascii(/*video url*/);
vipascii(/*video url*/, /*options*/);
```

## Options

- width: Width of video
- ratio: Ratio or video width to height -- Defaults to 16 / 9;
- contrast: Image contrast --  Defaults to 0.5 (50%)
- fps: Frames per second -- Defaults to 12
- invert: Invert video colors -- Defaults to false
