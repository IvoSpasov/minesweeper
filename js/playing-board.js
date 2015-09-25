var horizontalTiles,
    verticalTiles,
    numberOfMines,
    tileSizeInPx = 40,
    tiles = [],
    mineSymbol = '*';

function createGameDifficulty(level, verticalTiles, horizontalTiles, numberOfMines) {
    return {
        level: level,
        verticalTiles: verticalTiles,
        horizontalTiles: horizontalTiles,
        numberOfMines: numberOfMines
    }
}

function generateGameDifficulty(level) {
    switch (level) {
        case 'easy':
            return createGameDifficulty('easy', 9, 9, 10);
        case 'intermediate':
            return createGameDifficulty('intermediate', 10, 16, 20);
        default :
            console.log('Not implemented game difficulty.');
            break;
    }
}

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

function generateTiles(board) {
    var TILES_OFFSET_FROM_CANVAS_IN_PX = 5,
        GAP_BETWEEN_TILES_IN_PX = 2,
        rows = board.length,
        cols = board[0].length,
        tiles = [],
        tileStartPositionXinPx = TILES_OFFSET_FROM_CANVAS_IN_PX,
        tileStartPositionYinPx = TILES_OFFSET_FROM_CANVAS_IN_PX,
        newTile,
        tileStepInPx;

    tileStepInPx = tileSizeInPx + GAP_BETWEEN_TILES_IN_PX;

    for (var row = 0; row < rows; row += 1) {
        for (var col = 0; col < cols; col += 1) {
            newTile = createTile(tileStartPositionXinPx, tileStartPositionYinPx, row, col, board[row][col], false, false);
            tiles.push(newTile);
            tileStartPositionXinPx += tileStepInPx;
        }

        tileStartPositionXinPx = TILES_OFFSET_FROM_CANVAS_IN_PX;
        tileStartPositionYinPx += tileStepInPx;
    }

    return tiles;
}

function preparePlayingBoard(level) {
    var gameDifficulty,
        board;

    gameDifficulty = generateGameDifficulty(level);

    numberOfMines = gameDifficulty.numberOfMines;
    verticalTiles = gameDifficulty.verticalTiles;
    horizontalTiles = gameDifficulty.horizontalTiles;

    board = createEmptyMatrix(gameDifficulty.verticalTiles, gameDifficulty.horizontalTiles);
    fillMatrixWithZeros(board);
    generateRandomlyPositionedMines(board, gameDifficulty.numberOfMines, mineSymbol);
    calculateValuesBehindTiles(board, mineSymbol);
    tiles = generateTiles(board);

    //printBoardOnConsole(board);
}

function printBoardOnConsole(board) {
    var rows = board.length;
    for (var row = 0; row < rows; row += 1) {
        console.log(board[row]);
    }
}