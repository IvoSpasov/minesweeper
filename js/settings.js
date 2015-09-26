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

function prepareGameSettings(level) {
    var MINE_SYMBOL = '*',
        gameDifficulty,
        tileProperties,
        canvasSize;

    gameDifficulty = getGameDifficulty(level);
    tileProperties = getDefaultTileProperties();
    canvasSize = calculateCanvasSize(gameDifficulty, tileProperties);




    //var containerWidthInPx = $('.container').width(),
    //    calculatedTileSize = TILE_SIZE_IN_PX;
    //
    //if (canvasWidthInPx > containerWidthInPx) {
    //    calculatedTileSize = containerWidthInPx / gameDifficulty.horizontalTiles;
    //    // get the integer only
    //}

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