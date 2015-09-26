function createGameDifficulty(verticalTiles, horizontalTiles, numberOfMines) {
    return {
        verticalTiles: verticalTiles,
        horizontalTiles: horizontalTiles,
        numberOfMines: numberOfMines
    }
}

function getGameDifficulty(level) {
    switch (level) {
        case 'easy':
            return createGameDifficulty(9, 9, 10);
        case 'intermediate':
            return createGameDifficulty(16, 16, 40);
        case 'hard':
            return createGameDifficulty(16, 30, 90);
        default :
            console.log('Not implemented game difficulty.');
            break;
    }
}

function getDefaultTileProperties() {
    return {
        tileSizeInPx: 40,
        tilesOffsetFromCanvasInPx: 5,
        gapBetweenTilesInPx: 3
    }
}

function calculateCanvasSize(difficulty, tileProperties) {
    var canvasWidthInPx,
        canvasHeightInPx;


    canvasWidthInPx = (2 * tileProperties.tilesOffsetFromCanvasInPx) +
        (tileProperties.tileSizeInPx * difficulty.horizontalTiles) +
        (tileProperties.gapBetweenTilesInPx * (difficulty.horizontalTiles - 1));

    canvasHeightInPx = (2 * tileProperties.tilesOffsetFromCanvasInPx) +
        (tileProperties.tileSizeInPx * difficulty.verticalTiles) +
        (tileProperties.gapBetweenTilesInPx * (difficulty.verticalTiles - 1));

    return {
        canvasWidthInPx: canvasWidthInPx,
        canvasHeightInPx: canvasHeightInPx
    }
}

function getContainerSize() {
    var $container = $('.container'),
        containerWidthInPx = $container.width(),
        containerHeightInPx = $container.height();

    return {
        containerWidthInPx: containerWidthInPx,
        containerHeightInPx: containerHeightInPx
    }
}


function calculateTileSize(difficulty, tileProperties, containerSize) {
    var tileSizeInPx,
        tileSizeAsIntegerInPx;

    tileSizeInPx = (containerSize.containerWidthInPx - (2 * tileProperties.tilesOffsetFromCanvasInPx) -
        (tileProperties.gapBetweenTilesInPx * (difficulty.horizontalTiles - 1)))
        / difficulty.horizontalTiles;

    // If it is not an integer the tiles become blurry.
    tileSizeAsIntegerInPx = Math.floor(tileSizeInPx);
    return tileSizeAsIntegerInPx;
}

function prepareGameSettings(level) {
    var MINE_SYMBOL = '*',
        gameDifficulty,
        tileProperties,
        canvasSize,
        containerSize;

    gameDifficulty = getGameDifficulty(level);
    tileProperties = getDefaultTileProperties();
    canvasSize = calculateCanvasSize(gameDifficulty, tileProperties);
    containerSize = getContainerSize();

    // If the game files gets outside the container -> resize it to fit.
    if (canvasSize.canvasWidthInPx > containerSize.containerWidthInPx) {
        // Recalculate new tile size and store it.
        tileProperties.tileSizeInPx = calculateTileSize(gameDifficulty, tileProperties, containerSize);
        // Recalculate the canvas size and store it.
        canvasSize = calculateCanvasSize(gameDifficulty, tileProperties);
    }

    return {
        tileSizeInPx: tileProperties.tileSizeInPx,
        tilesOffsetFromCanvasInPx: tileProperties.tilesOffsetFromCanvasInPx,
        gapBetweenTilesInPx: tileProperties.gapBetweenTilesInPx,
        mineSymbol: MINE_SYMBOL,
        difficulty: gameDifficulty,
        canvasSize: canvasSize
    };

    // change to tileProperties
}