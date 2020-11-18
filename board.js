const posMap = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8 };

blackPieces = {pawn: 'P', knight: 'N', bishop: 'B', rook: 'R', queen: 'Q', king: 'K'};
whitePieces = {pawn: 'p', knight: 'n', bishop: 'b', rook: 'r', queen: 'q', king: 'k'};

blackPiecesInt = {pawn: 'P', knight: 'N', bishop: 'B', rook: 'R', queen: 'Q', king: 'K'};
whitePiecesInt = {pawn: 'p', knight: 'n', bishop: 'b', rook: 'r', queen: 'q', king: 'k'};

emptyBoard = [
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
];
theBoard = emptyBoard;

thePos = '';
theTable = null;
function gen_cell(tr, c, r, bg) {
    const id = 'r'+ r + 'c' + c;
    // console.log('gen_cell(' + id + ')');
    const td = document.createElement("td");
    td.id = id;
    tr.appendChild(td);
    td.classList.add( (((r+c)%2) == 0) ? "black-cell" : "white-cell");
    const x = document.createTextNode('X');
    td.appendChild(x);
    return td;
}

function gen_tr(r) {
    // console.log('gen_tr(' + r + ')');
    const tr = document.createElement("tr");
    theTable.appendChild(tr);
    // one extra <td> at the beginning
    // for the row numbers
    td = document.createElement("td");
    rc = document.createTextNode(''+r);
    td.appendChild(rc);
    tr.appendChild(td);
    gen_cell(tr, 1, r, 0);
    gen_cell(tr, 2, r, 1);
    gen_cell(tr, 3, r, 0);
    gen_cell(tr, 4, r, 1);
    gen_cell(tr, 5, r, 0);
    gen_cell(tr, 6, r, 1);
    gen_cell(tr, 7, r, 0);
    gen_cell(tr, 8, r, 1);
}

function gen_board() {
    theTable = document.getElementById("the-table");

    gen_tr(8);
    gen_tr(7);
    gen_tr(6);
    gen_tr(5);
    gen_tr(4);
    gen_tr(3);
    gen_tr(2);
    gen_tr(1);
}

function resetBoard() {
    theBoard = emptyBoard;

    //         0123456789
    thePos =  '         \n'  //   0 -   9
    thePos += ' rnbqkbnr\n'  //  10 -  19
    thePos += ' pppppppp\n'  //  20 -  29
    thePos += ' ........\n'  //  30 -  39
    thePos += ' ........\n'  //  40 -  49
    thePos += ' ........\n'  //  50 -  59
    thePos += ' ........\n'  //  60 -  69
    thePos += ' PPPPPPPP\n'  //  70 -  79
    thePos += ' RNBQKBNR\n'  //  80 -  89
    thePos += '         \n'  //  90 -  99

    for (let i = 11; i < 98; i++) {
        const r = Math.floor(i/10);
        const c = i%10;
        const p = thePos.charAt(i);
        let x = boardPieces[p];
        x = x ? x : 0;
        if (r < 1 || c < 1) x = -1;
        if (r > 8 || c > 8) x = -1;
        setPiece(c, r, x);
    }
}

function getPiece(c, r) {
    return theBoard[r][c];
}

function setPiece(c, r, p) {
    theBoard[r][c] = p;
}

function syncPieceUI(c, r) {
    const id = 'r'+ r + 'c' + c;
    const pc = getPiece(c, r);
    let p = xxx.get(pc);
    let x = uni_pieces[p];
    x = x ? x : '';
    const el = document.getElementById(id);
    if (el) {
        el.childNodes[0].textContent = x;
    }
    // console.log(id, p, el);
}

function pieceAt(c, r) {
    if (isNaN(r) || isNaN(c)) return -1;
    if (r < 1 || c < 1) return -1;
    if (r > 8 || c > 8) return -1;
    return theBoard[r][c];
}

function drawPieces() {
    for (let r = 1; r <= 8; r++) {
        for (let c = 1; c <= 8; c++) {
            let index = r*10 + c;
            syncPieceUI(c, r);
        }
    }
}
