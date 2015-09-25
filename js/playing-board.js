var horizontalTiles,
    verticalTiles,
    tileSize = 40,
    tileStartPositionX,
    tileStartPositionY,
    tileStep,
    numberOfMines,
    tiles = [],
    mineSymbol = '*';

function createGameDifficulty(level, horizontalTiles, verticalTiles, numberOfMines) {
    return {
        level: level,
        horizontalTiles: horizontalTiles,
        verticalTiles: verticalTiles,
        numberOfMines: numberOfMines
    }
}

function generateGameDifficulty(level) {
    switch (level) {
        case 'easy':
            return createGameDifficulty('easy', 9, 9, 10);
        case 'intermediate':
            return createGameDifficulty('intermediate', 16, 16, 40);
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
    var rows = matrix[0].length,
        cols = matrix[1].length;

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
    var rows = board[0].length,
        cols = board[1].length,
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
    var rows = board[0].length,
        cols = board[1].length;

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
    var rows = board[0].length,
        cols = board[1].length,
        isInsideBoard = row >= 0 && col >= 0 && row < rows && col < cols,
        hasMine;

    if (isInsideBoard) {
        hasMine = board[row][col] === mineSymbol;
    }

    return isInsideBoard && !hasMine;
}

function createTile(startX, startY, row, col, value, isVisited, hasMineFlag) {
    return {
        startX: startX,
        startY: startY,
        row: row,
        col: col,
        value: value,
        isVisited: isVisited,
        hasMineFlag: hasMineFlag
    }
}

function generateTiles(board) {
    var tiles = [],
        newTile,
        rows = board[0].length,
        cols = board[1].length;

    for (var row = 0; row < rows; row += 1) {
        for (var col = 0; col < cols; col += 1) {
            newTile = createTile(tileStartPositionX, tileStartPositionY, row, col, board[row][col], false, false);
            tiles.push(newTile);
            tileStartPositionX += tileStep;
        }

        tileStartPositionX = 5;
        tileStartPositionY += tileStep;
    }

    return tiles;
}

function preparePlayingBoard(level) {
    var gameDifficulty,
        board;

    tileStartPositionX = 5;
    tileStartPositionY = 5;
    tileStep = tileSize + tileStartPositionX;

    gameDifficulty = generateGameDifficulty(level);
    board = createEmptyMatrix(gameDifficulty.verticalTiles, gameDifficulty.horizontalTiles);
    fillMatrixWithZeros(board);
    generateRandomlyPositionedMines(board, gameDifficulty.numberOfMines, mineSymbol);
    calculateValuesBehindTiles(board, mineSymbol);
    tiles = generateTiles(board);
    //printBoardOnConsole(board);
}

function printBoardOnConsole(board) {
    var rows = board[0].length;
    for (var row = 0; row < rows; row += 1) {
        console.log(board[row]);
    }
}