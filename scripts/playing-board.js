var horizontalTiles = 10,
    verticalTiles = 10,
    numberOfTiles = horizontalTiles * verticalTiles,
    tileSize = 40,
    tileStartPositionX = 5,
    tileStartPositionY = 5,
    tileStep = tileSize + tileStartPositionX,
    tiles = [],
    mines = [];

function createMine(row, col) {
    return {
        row: row,
        col: col
    }
}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomlyPositionedMines(numberOfMines, horizontalTiles, verticalTiles) {
    var randomRowPosition,
        randomColPosition,
        currentMine;

    for (var i = 0; i < numberOfMines; i += 1) {
        randomRowPosition = getRandomInt(0, verticalTiles);
        randomColPosition = getRandomInt(0, horizontalTiles);
        currentMine = createMine(randomRowPosition, randomColPosition);
        mines.push(currentMine);
    }
}

// TODO: create a function to check if two mines appear on the same place and fix it

function createTile(startX, startY, row, col, hasMine) {
    return {
        startX: startX,
        startY: startY,
        row: row,
        col: col,
        hasMine: hasMine
    }
}

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

function preparePlayingBoard() {

}