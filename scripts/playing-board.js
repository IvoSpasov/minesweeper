var horizontalTiles,
    verticalTiles,
    tileSize = 40,
    tileStartPositionX,
    tileStartPositionY,
    tileStep,
    numberOfMines,
    board,
    tiles = [],
    mineSymbol = '*';

function getLevelOfDifficulty () {
    var radios = document.getElementsByName('difficulty');
    for(var i in radios) {
        if (radios[i].checked) {
            switch (radios[i].id) {
                case 'easy':
                    horizontalTiles = 9;
                    verticalTiles = 9;
                    numberOfMines = 10;
                    break;
                case 'intermediate':
                    horizontalTiles = 16;
                    verticalTiles = 16;
                    numberOfMines = 40;
                    break;
                default :
                    console.log('Not implemented radio for board size.');
                    break;
            }
            break;
        }
    }
}

function createEmptyBoardMatrix() {
    board = new Array(verticalTiles);
    for (var i = 0; i < verticalTiles; i += 1) {
        board[i] = new Array(horizontalTiles);
    }

    for (var row = 0; row < verticalTiles; row += 1) {
        for (var col = 0; col < verticalTiles; col += 1) {
            board[row][col] = 0;
        }
    }
}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomlyPositionedMines(numberOfMines) {
    var randomRowPosition,
        randomColPosition,
        minesCounter = 0;

    while (minesCounter < numberOfMines) {
        randomRowPosition = getRandomInt(0, verticalTiles);
        randomColPosition = getRandomInt(0, horizontalTiles);
        if (!board[randomRowPosition][randomColPosition]) {
            board[randomRowPosition][randomColPosition] = mineSymbol;
            minesCounter += 1;
        }
    }
}

function calculateValuesBehindTiles() {
    for (var row = 0; row < verticalTiles; row += 1) {
        for (var col = 0; col < horizontalTiles; col += 1) {
            if (board[row][col] === mineSymbol) {
                if (row - 1 >= 0 && col - 1 >= 0 && isValidPosition(row - 1, col - 1)) {
                    board[row - 1][col - 1] += 1;
                }
                if (row - 1 >= 0 && isValidPosition(row - 1, col)) {
                    board[row - 1][col] += 1;
                }
                if (col - 1 >= 0 && isValidPosition(row, col - 1)) {
                    board[row][col - 1] += 1;
                }
                if (row + 1 < verticalTiles && col + 1 < horizontalTiles && isValidPosition(row + 1, col + 1)) {
                    board[row + 1][col + 1] += 1;
                }
                if (row + 1 < verticalTiles && isValidPosition(row + 1, col)) {
                    board[row + 1][col] += 1;
                }
                if (col + 1 < horizontalTiles && isValidPosition(row, col + 1)) {
                    board[row][col + 1] += 1;
                }
                if (row + 1 < verticalTiles && col - 1 >= 0 && isValidPosition(row + 1, col - 1)) {
                    board[row + 1][col - 1] += 1;
                }
                if (row - 1 >= 0 && col + 1 < horizontalTiles && isValidPosition(row - 1, col + 1)) {
                    board[row - 1][col + 1] += 1;
                }
            }
        }
    }
}

function isValidPosition(row, col) {
    return board[row][col] !== mineSymbol;
}

function createTile(startX, startY, row, col, value, isVisited) {
    return {
        startX: startX,
        startY: startY,
        row: row,
        col: col,
        value: value,
        isVisited: isVisited
    }
}

function generateTiles() {
    var newTile;

    for (var row = 0; row < verticalTiles; row += 1) {
        for (var col = 0; col < horizontalTiles; col += 1) {
            newTile = createTile(tileStartPositionX, tileStartPositionY, row, col, board[row][col], false);
            tiles.push(newTile);
            tileStartPositionX += tileStep;
        }

        tileStartPositionX = 5;
        tileStartPositionY += tileStep;
    }
}

function preparePlayingBoard() {
    tileStartPositionX = 5;
    tileStartPositionY = 5;
    tileStep = tileSize + tileStartPositionX;
    board = undefined;
    tiles = [];
    getLevelOfDifficulty();
    createEmptyBoardMatrix();
    generateRandomlyPositionedMines(numberOfMines);
    calculateValuesBehindTiles();
    generateTiles();
    //printBoardOnConsole();
}

function printBoardOnConsole() {
    for (var row = 0; row < verticalTiles; row += 1) {
        console.log(board[row]);
    }
}