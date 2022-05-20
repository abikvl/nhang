# Hang detector for Node.js
This is a simple package to detect hangs in Node.js applications caused by infinite loop or any other reason that causes the main thread to block.

### Installation

`$ npm install nhang`

### Usage

```javascript
const { watch, unwatch } = require('nhang');

watch({ checkInterval: 2000, pingInterval: 1000 });
```
