const {
    isMainThread,
    parentPort,
    Worker,
    workerData,
} = require('worker_threads');

if (isMainThread) {
    let worker;
    let timer;
    module.exports = {
        watch: function watchHang({ checkInterval, pingInterval, script }) {
            if (worker) {
                throw new Error('already watching');
            }
            if (checkInterval <= pingInterval) {
                throw new Error('checkInterval should be greater than pingInterval');
            }
            worker = new Worker(__filename, {
                workerData: { checkInterval, script }
            });
            timer = setInterval(() => {
                worker.postMessage('ping');
            }, pingInterval);
            return worker;
        },
        unwatch: function () {
            if (timer) {
                clearInterval(timer);
            }
            if (worker) {
                worker.terminate();
            }
        }
    }
} else {
    const { checkInterval, script } = workerData;
    const onHang = script ? require(script).onHang : null;

    let hang = true;

    function _onHang() {
        if (!onHang) {
            console.error('Main thread hang detected! Terminating process.');
            process.kill(process.pid);
        } else {
            onHang();
        }
    }

    parentPort.on('message', () => {
        hang = false;
    });

    const ticker = setInterval(() => {
        if (hang) {
            clearInterval(ticker);
            _onHang();
        }
        hang = true;
    }, checkInterval);

}
