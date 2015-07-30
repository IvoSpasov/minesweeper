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
    var mines = [],
        randomRowPosition,
        randomColPosition,
        currentMine;

    for (var i = 0; i < numberOfMines; i += 1) {
        randomRowPosition = getRandomInt(0, verticalTiles);
        randomColPosition = getRandomInt(0, horizontalTiles);
        currentMine = createMine(randomRowPosition, randomColPosition);
        mines.push(currentMine);
    }

    console.log(mines);

}

// TODO: create a function to check if two mines appear on the same place and fix it
