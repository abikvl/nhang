async function runProcess(scriptPath, opts) {
    const testProcess = require('child_process').fork(scriptPath, opts);

    return new Promise((resolve, reject) => {
        testProcess.on('close', (err) => {
            console.log("Process killed");
            if (err === 1) {
                resolve();
            } else {
                reject(err);
            }
        });
    });
}

describe('detect hang', () => {
    jest.setTimeout(10000);
    it('should kill hang process', async () => {
        await expect(runProcess('./test/process.js')).resolves.not.toThrow();
    });
});
