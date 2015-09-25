function createEmptyMatrix(rows, cols) {
    var matrix = new Array(rows);
    for (var row = 0; row < rows; row += 1) {
        matrix[row] = new Array(cols);
    }

    return matrix;
}

function fillMatrixWithZeros(matrix) {
    var rows = matrix.length,
        cols = matrix[0].length;

    for (var row = 0; row < rows; row += 1) {
        for (var col = 0; col < cols; col += 1) {
            matrix[row][col] = 0;
        }
    }
}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomlyPositionedMines(board, numberOfMines, mineSymbol) {
    var rows = board.length,
        cols = board[0].length,
        randomRowPosition,
        randomColPosition,
        minesCounter = 0;

    while (minesCounter < numberOfMines) {
        randomRowPosition = getRandomInt(0, rows);
        randomColPosition = getRandomInt(0, cols);
        if (!board[randomRowPosition][randomColPosition]) {
            board[randomRowPosition][randomColPosition] = mineSymbol;
            minesCounter += 1;
        }
    }
}

function calculateValuesBehindTiles(board, mineSymbol) {
    var rows = board.length,
        cols = board[0].length;

    for (var row = 0; row < rows; row += 1) {
        for (var col = 0; col < cols; col += 1) {
            if (board[row][col] === mineSymbol) {
                if (isValidPosition(board, row - 1, col - 1, mineSymbol)) {
                    board[row - 1][col - 1] += 1;
                }
                if (isValidPosition(board, row - 1, col, mineSymbol)) {
                    board[row - 1][col] += 1;
                }
                if (isValidPosition(board, row, col - 1, mineSymbol)) {
                    board[row][col - 1] += 1;
                }
                if (isValidPosition(board, row + 1, col + 1, mineSymbol)) {
                    board[row + 1][col + 1] += 1;
                }
                if (isValidPosition(board, row + 1, col, mineSymbol)) {
                    board[row + 1][col] += 1;
                }
                if (isValidPosition(board, row, col + 1, mineSymbol)) {
                    board[row][col + 1] += 1;
                }
                if (isValidPosition(board, row + 1, col - 1, mineSymbol)) {
                    board[row + 1][col - 1] += 1;
                }
                if (isValidPosition(board, row - 1, col + 1, mineSymbol)) {
                    board[row - 1][col + 1] += 1;
                }
            }
        }
    }
}

function isValidPosition(board, row, col, mineSymbol) {
    var rows = board.length,
        cols = board[0].length,
        isInsideBoard = row >= 0 && col >= 0 && row < rows && col < cols,
        hasMine;

    if (isInsideBoard) {
        hasMine = board[row][col] === mineSymbol;
    }

    return isInsideBoard && !hasMine;
}

function createTile(startXinPx, startYinPx, row, col, value, isVisited, hasMineFlag) {
    return {
        startXinPx: startXinPx,
        startYinPx: startYinPx,
        row: row,
        col: col,
        value: value,
        isVisited: isVisited,
        hasMineFlag: hasMineFlag
    }
}

function generateTiles(board, settings) {
    var rows = board.length,
        cols = board[0].length,
        tiles = [],
        tileStartPositionXinPx = settings.tilesOffsetFromCanvasInPx,
        tileStartPositionYinPx = settings.tilesOffsetFromCanvasInPx,
        newTile,
        tileStepInPx;

    tileStepInPx = settings.tileSizeInPx + settings.gapBetweenTilesInPx;

    for (var row = 0; row < rows; row += 1) {
        for (var col = 0; col < cols; col += 1) {
            newTile = createTile(tileStartPositionXinPx, tileStartPositionYinPx, row, col, board[row][col], false, false);
            tiles.push(newTile);
            tileStartPositionXinPx += tileStepInPx;
        }

        tileStartPositionXinPx = settings.tilesOffsetFromCanvasInPx;
        tileStartPositionYinPx += tileStepInPx;
    }

    return tiles;
}

function preparePlayingBoard(settings) {
    var board,
        tiles;

    board = createEmptyMatrix(settings.difficulty.verticalTiles, settings.difficulty.horizontalTiles);
    fillMatrixWithZeros(board);
    generateRandomlyPositionedMines(board, settings.difficulty.numberOfMines, settings.mineSymbol);
    calculateValuesBehindTiles(board, settings.mineSymbol);
    tiles = generateTiles(board, settings);

    return tiles;
    //printBoardOnConsole(board);
}

function printBoardOnConsole(board) {
    var rows = board.length;
    for (var row = 0; row < rows; row += 1) {
        console.log(board[row]);
    }
}