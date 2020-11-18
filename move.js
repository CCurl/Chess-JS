function validMoves(p, c, r) {
    return [];
}

function isValidMoveBlackPawn(fc, fr, tc, tr) {
    // first move?
    if ((fr === 7) && (tr === 5) && (tc === fc)) {
        return pieceAt(tc, tr) ? false : true;
    }

    if (tr !== fr-1) { return false; }

    // simple march?
    if (fc === tc) { return pieceAt(tc, tr) ? false : true; }

    // take?
    if ((tc === fc+1) || (tc == fc-1)) {
        const x = pieceAt(tc, tr);
        if ((x >= 97) && (x <= 122)) { return true; }
    }

    // TODO: en-passant?
    return false;
}

function isValidMoveWhitePawn(fc, fr, tc, tr) {
    // first move?
    if ((fr === 2) && (tr === 4) && (tc === fc)) {
        return pieceAt(tc, tr) ? false : true;
    }

    if (tr !== fr+1) { return false; }

    // simple march?
    if (fc === tc) {
        return pieceAt(tc, tr) ? false : true;
    }

    // take?
    if ((tc === fc+1) || (tc === fc-1)) {
        const x = pieceAt(tc, tr);
        if ((x >= 65) && (x <= 90)) {
            return true;
        }
    }

    // TODO: en-passant?
    return false;
}

function isValidMoveKnight(fc, fr, tc, tr, isBlack) {
    let ok =       ((tc === fc+2) && ((tr === fr-1) || (tr === fr+1)));
    ok = ok ? ok : ((tc === fc-2) && ((tr === fr-1) || (tr === fr+1)));
    ok = ok ? ok : ((tr === fr+2) && ((tc === fc-1) || (tc === fc+1)));
    ok = ok ? ok : ((tr === fr-2) && ((tc === fc-1) || (tc === fc+1)));
    if (ok) {
        const x = pieceAt(tc, tr);
        if (!x) { return true; }
        const vl = (p === isBlack) ? boardPieces.b : boardPieces.B;
        const vh = (p === isBlack) ? boardPieces.r : boardPieces.R;
        if ((x >= vl) && (x <= vh)) { return true; }
    }
    return false;
}

function isValidMoveBishop(fc, fr, tc, tr, isBlack) {
    const ok = false;
    if (ok) {
        const x = pieceAt(tc, tr);
        if (!x) { return true; }
        const vl = (p === isBlack) ? boardPieces.b : boardPieces.B;
        const vh = (p === isBlack) ? boardPieces.r : boardPieces.R;
        if ((x >= vl) && (x <= vh)) { return true; }
    }
    return false;
}

function isValidMoveRook(fc, fr, tc, tr, isBlack) {
    const ok = false;
    if (ok) {
        const x = pieceAt(tc, tr);
        if (!x) { return true; }
        const vl = (p === isBlack) ? boardPieces.b : boardPieces.B;
        const vh = (p === isBlack) ? boardPieces.r : boardPieces.R;
        if ((x >= vl) && (x <= vh)) { return true; }
    }
    return false;
}

function isValidMoveQueen(fc, fr, tc, tr, isBlack) {
    if (isValidMoveBishop(fc, fr, tc, tr, isBlack)) { return true; }
    return isValidMoveRook(fc, fr, tc, tr, isBlack);
}

function isValidMoveKing(fc, fr, tc, tr, isBlack) {
    const dx = Math.abs(tc - fc);
    const dy = Math.abs(tr - fr);
    const dist = dy + dy;
    if ((dx < 2) && (dy < 2) && (dist > 0)) {
        const x = pieceAt(tc, tr);
        if (!x) { return true; }
        const vl = (p === isBlack) ? boardPieces.b : boardPieces.B;
        const vh = (p === isBlack) ? boardPieces.r : boardPieces.R;
        if ((x >= vl) && (x <= vh)) { return true; }
    }
    // TODO: O-O or O-O-O
    return false;
}

function isValidMove(p, fc, fr, tc, tr) {
    if ((fr<1) || (fr>8)) return false;
    if ((fc<1) || (fc>8)) return false;
    if ((tr<1) || (tr>8)) return false;
    if ((tc<1) || (tc>8)) return false;
    switch (p) {
        case boardPieces.P:
            return isValidMoveBlackPawn(fc, fr, tc, tr);
        case boardPieces.N:
            return isValidMoveKnight(fc, fr, tc, tr, true);
        case boardPieces.B:
            return isValidMoveBishop(fc, fr, tc, tr, true);
        case boardPieces.R:
            return isValidMoveRook(fc, fr, tc, tr, true);
        case boardPieces.Q:
            return isValidMoveQueen(fc, fr, tc, tr, true);
        case boardPieces.K:
            return isValidMoveKing(fc, fr, tc, tr, true);
        case boardPieces.p:
            return isValidMoveWhitePawn(fc, fr, tc, tr);
        case boardPieces.b:
            return isValidMoveBishop(fc, fr, tc, tr, false);
        case boardPieces.n:
            return isValidMoveKnight(fc, fr, tc, tr, false);
        case boardPieces.r:
            return isValidMoveRook(fc, fr, tc, tr, false);
        case boardPieces.q:
            return isValidMoveQueen(fc, fr, tc, tr, false);
        case boardPieces.k:
            return isValidMoveKing(fc, fr, tc, tr, false);
    }
    return false;
}

function invalidMove(x) {
    console.log('[' + x + '] is an invalid move.');
}

function movePiece(x) {
    if (x.length !== 4) {
        return invalidMove(x);
    } else {
        let fc = posMap[x.charAt(0)];
        let fr = x.charAt(1);
        let tc = posMap[x.charAt(2)];
        let tr = x.charAt(3);
        if (!movePieceRC(fc, fr, tc, tr))
            return invalidMove(x);
    }
    return true;
}

function invalidMove(x) {
    console.log('[' + x + '] is an invalid move.');
    return false;
}

function movePieceRC(fc, fr, tc, tr) {
    if ((fr<1) || (fr>8)) return false;
    if ((fc<1) || (fc>8)) return false;
    if ((tr<1) || (tr>8)) return false;
    if ((tc<1) || (tc>8)) return false;
    fc = Number.parseInt(fc);
    fr = Number.parseInt(fr);
    tc = Number.parseInt(tc);
    tr = Number.parseInt(tr);
    const x = pieceAt(fc, fr);
    if (!x) { return false; }
    if (isValidMove(x, fc, fr, tc, tr)) {
        setPiece(tc, tr, x);
        setPiece(fc, fr, 0);
        syncPieceUI(fc, fr);
        syncPieceUI(tc, tr);
        return true;
    }
    return false;
}

