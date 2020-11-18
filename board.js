const posMap = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8 };

blackPieces = {pawn:  80, knight:  78, bishop: 66, rook:  82, queen:  81, king:  75};
whitePieces = {pawn: 112, knight: 110, bishop: 98, rook: 114, queen: 113, king: 107};
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
function onLoad() {
    gen_board();
    resetBoard();
    drawPieces();
}

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
    let tr = document.createElement("tr");
    theTable.appendChild(tr);
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
    tr = document.createElement("tr");
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
    thePos =  '         \n'  //  10 -  19
    thePos += ' rnbqkbnr\n'  //  20 -  29
    thePos += ' pppppppp\n'  //  30 -  39
    thePos += ' ........\n'  //  40 -  49
    thePos += ' ........\n'  //  50 -  59
    thePos += ' ........\n'  //  60 -  69
    thePos += ' ........\n'  //  70 -  79
    thePos += ' PPPPPPPP\n'  //  80 -  89
    thePos += ' RNBQKBNR\n'  //  90 -  99
    thePos += '         \n'  // 100 - 109
    thePos += '         \n'  // 110 - 119
}

function putPiece(c, r, pieceCode) {
    const id = 'r'+ r + 'c' + c;
    let x = uni_pieces[pieceCode];
    x = x ? x : '';
    const el = document.getElementById(id);
    if (el) { el.childNodes[0].textContent = x; }
    // console.log(id, pieceCode, el);
}

function pieceAt(c, r) {
    if ((r<1) || (r>8)) return '';
    if ((c<1) || (c>8)) return '';
    const id = 'r'+ r + 'c' + c;
    let p = undefined;
    const el = document.getElementById(id);
    if (el) { 
        p = revMap[el.childNodes[0].wholeText];
    }
    return p ? p : '';
}

function movePiece2(x) {
    if (x.length !== 4) {
        console.log('invalid move', x);
    } else {
        let fc = posMap[x.charAt(0)];
        let fr = x.charAt(1);
        let tc = posMap[x.charAt(2)];
        let tr = x.charAt(3);
        movePiece(fc, fr, tc, tr);
    }
}

function movePiece(fc, fr, tc, tr) {
    if ((fr<1) || (fr>8)) return;
    if ((fc<1) || (fc>8)) return;
    if ((tr<1) || (tr>8)) return;
    if ((tc<1) || (tc>8)) return;
    x = pieceAt(fc, fr);
    if (x) {
        putPiece(tc, tr, x);
        putPiece(fc, fr, ' ');
    }
}

function drawPieces() {
    for (let r = 1; r <= 8; r++) {
        for (let c = 1; c <= 8; c++) {
            let index = r*10 + c;
            let pc = thePos.charAt(index);
            putPiece(c, r, pc);
        }
    }
}
