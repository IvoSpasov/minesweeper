var horizontalTiles = 10,
    verticalTiles = 10,
    numberOfTiles = horizontalTiles * verticalTiles,
    tileSize = 40,
    tileStartPositionX = 5,
    tileStartPositionY = 5,
    tileStep = tileSize + tileStartPositionX,
    mines,
    tiles = [],
    canvas = document.getElementById('mines-canvas'),
    context = canvas.getContext('2d');

function createEmptyMinesMatrix() {
    mines = new Array(verticalTiles);
    for (var i = 0; i < verticalTiles; i += 1) {
        mines[i] = new Array(horizontalTiles);
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
        minesCounter = 0,
        mineSymbol = '*';

    while (minesCounter < numberOfMines) {
        randomRowPosition = getRandomInt(0, verticalTiles);
        randomColPosition = getRandomInt(0, horizontalTiles);
        if (!mines[randomRowPosition][randomColPosition]) {
            mines[randomRowPosition][randomColPosition] = mineSymbol;
            minesCounter += 1;
        }
    }
}

function createTile(startX, startY, row, col, hasMine) {
    return {
        startX: startX,
        startY: startY,
        row: row,
        col: col,
        hasMine: hasMine
    }
}

// TODO: add mines
function generateTiles() {
    var currentTile,
        hasMine = false;
    for (var row = 0; row < verticalTiles; row += 1) {
        for (var col = 0; col < horizontalTiles; col += 1) {
            currentTile = createTile(tileStartPositionX, tileStartPositionY, row, col, hasMine);
            tiles.push(currentTile);
            tileStartPositionX += tileStep;
        }

        tileStartPositionX = 5;
        tileStartPositionY += tileStep;
    }
}

function drawTiles() {
    var x,
        y;

    context.fillStyle = 'rgb(107, 187, 201)';
    for (var index in tiles) {
        x = tiles[index].startX;
        y = tiles[index].startY;
        context.fillRect(x, y, tileSize, tileSize);
    }
}


function preparePlayingBoard() {
    createEmptyMinesMatrix();
    generateRandomlyPositionedMines(10);
    generateTiles();
    drawTiles();
}