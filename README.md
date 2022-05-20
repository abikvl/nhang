# Hang detector for Node.js
This is a simple package to detect hangs in Node.js applications caused by infinite loop or any other reason that causes the main thread to block.

**nhang** starts a worker thread that expects to continuously receive *ping* messages from the main thread. If these messages stop coming, then it is considered a hang.

### Installation

`$ npm install nhang`

### Usage

```javascript
const { watch, unwatch } = require('nhang');

// Start watch
watch({ checkInterval: 5000, pingInterval: 1000 });

```

By default, when a hang is detected, the process will be aborted. Perhaps you are using a process manager like [pm2](https://github.com/Unitech/pm2 "pm2") which will restart your application.

#### Options

- `checkInterval`
A time delay between each function call in the Worker thread that checks if the main thread is blocked

- `pingInterval`
A time delay between each function call in the main thread that sends *ping* messages to the Worker thread

- `script`
An optional path to the script that is loaded in the Worker thread to handle the hang. The script must export `onHang` function that will be called in the context of the worker thread when a hang is detected. If the script is not set, then the application will simply be terminated.
