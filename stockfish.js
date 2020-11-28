/*
 * 
 */

var state = 0;
var bestMove = 'e3e4';
var pos = '';
var board = [];
var startPos = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
var toMove = 'w';

function putPiece(r, f, p) {
    // console.log('putting piece()', r, f, p, ((r-1)*8)+(f-1));
    board[((r-1)*8)+(f-1)] = p;
}

function getPiece(r, f) {
    return board[((r-1)*8)+(f-1)];
}

function parseFen(fen) {
    var sa = fen.split('');
    var rank = 8;
    var file = 1;
    for (r = 1; r <= 8; r++) {
        for (f = 1; f <= 8; f++) {
            putPiece(r, f, ' ');
        }
    }

    for (var i in sa) {
        var ch = fen[i];
        // console.log(i, ch);
        switch (ch) {
            case 'p':
            case 'r':
            case 'n':
            case 'b':
            case 'q':
            case 'k':
            case 'P':
            case 'R':
            case 'N':
            case 'B':
            case 'Q':
            case 'K':
                putPiece(rank, file, ch);
                file += 1;
                break;
            case '1':
                file += 1;
                break;
            case '2':
                file += 2;
                break;
            case '3':
                file += 3;
                break;
            case '4':
                file += 4;
                break;
            case '5':
                file += 5;
                break;
            case '6':
                file += 6;
                break;
            case '7':
                file += 7;
                break;
            case '8':
                file += 8;
                break;
            case '/':
                rank -= 1;
                file = 1;
                break;
        }
    }
}

function think() {
    console.log(board);
    while (state === 1) {
        return;
    }
}

function onmessage(msg) {
    if (msg.action === 'think') {
        state = 1;
        parseFen(msg.fen);
        think();
    }
    if (msg.action === 'stop') {
        state = 0;
    }
}
