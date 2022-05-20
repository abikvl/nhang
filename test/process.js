const { watch } = require('../nhang');

function infiniteLoop() {
    while (true);
}

watch({ checkInterval: 2000, pingInterval: 1000 });

setTimeout(() => {
    console.log("Entering infinite loop");
    infiniteLoop();
}, 1000);