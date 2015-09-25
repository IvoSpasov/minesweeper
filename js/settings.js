function createGameDifficultyObject(verticalTiles, horizontalTiles, numberOfMines) {
    return {
        verticalTiles: verticalTiles,
        horizontalTiles: horizontalTiles,
        numberOfMines: numberOfMines
    }
}

function generateGameDifficulty(level) {
    switch (level) {
        case 'easy':
            return createGameDifficultyObject(9, 9, 10);
        case 'intermediate':
            return createGameDifficultyObject(16, 16, 40);
        default :
            console.log('Not implemented game difficulty.');
            break;
    }
}

function prepareGameSettings(level) {
    var TILE_SIZE_IN_PX = 40,
        TILES_OFFSET_FROM_CANVAS_IN_PX = 5,
        GAP_BETWEEN_TILES_IN_PX = 3,
        MINE_SYMBOL = '*',
        gameDifficulty,
        canvasWidth,
        canvasHeight;

    gameDifficulty = generateGameDifficulty(level);
    canvasWidth = (2 * TILES_OFFSET_FROM_CANVAS_IN_PX) +
        (TILE_SIZE_IN_PX * gameDifficulty.horizontalTiles) +
        (GAP_BETWEEN_TILES_IN_PX * (gameDifficulty.horizontalTiles - 1));
    canvasHeight = (2 * TILES_OFFSET_FROM_CANVAS_IN_PX) +
        (TILE_SIZE_IN_PX * gameDifficulty.verticalTiles) +
        (GAP_BETWEEN_TILES_IN_PX * (gameDifficulty.verticalTiles - 1));


    return {
        tileSizeInPx: TILE_SIZE_IN_PX,
        tilesOffsetFromCanvasInPx: TILES_OFFSET_FROM_CANVAS_IN_PX,
        gapBetweenTilesInPx: GAP_BETWEEN_TILES_IN_PX,
        mineSymbol: MINE_SYMBOL,
        difficulty: gameDifficulty,
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight
    }
}