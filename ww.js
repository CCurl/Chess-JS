self.addEventListener('message', (e) => { onWorkerMessage(e.data); }, false);

var state = 0;
var bestMove = 'e2e4';
var score = 2.3;
var count = 1;
var timer = undefined;

function setPosition(fen) {
    self.postMessage('setPos: ' + fen);
}

function doOne() {
    count += 1;
}

function doSome() {
    var num = 0;
    while (num < 1000) {
        doOne();
        num += 1;
    }
    bestMove = 'e' + num + 'd' + count;
    self.postMessage('bestMove: ' + bestMove);
}

function think() {
    if (timer) {
        clearTimeout(timer);
        timer = undefined;
    }
    if (state === 1) {
        doSome();
        timer = setTimeout(() => { think(); }, 50);
    }
}

function onWorkerMessage(msg) {
    switch (msg.cmd) {
        case 'start':
            self.postMessage('ready');
            break;
        case 'setPosition':
            setPosition(msg.fen);
            break;
        case 'think':
            self.postMessage('thinking ...');
            state = 1;
            count = 1;
            think();
            break;
        case 'stop':
            state = 0;
            self.postMessage('stopped, ' + count + ' nodes');
            break;
        case 'quit':
            self.postMessage('worker terminated, (buttons will no longer work)');
            self.close(); // Terminates the worker.
            break;
        default:
            self.postMessage('Unknown command: ' + msg.msg);
    }
}
