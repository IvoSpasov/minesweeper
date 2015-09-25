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
            return createGameDifficultyObject(10, 16, 20);
        default :
            console.log('Not implemented game difficulty.');
            break;
    }
}

function prepareGameSettings(level) {
    var TILE_SIZE_IN_PX = 40,
        TILES_OFFSET_FROM_CANVAS_IN_PX = 5,
        GAP_BETWEEN_TILES_IN_PX = 2,
        MINE_SYMBOL = '*',
        gameDifficulty;

    gameDifficulty = generateGameDifficulty(level);

    return {
        tileSizeInPx: TILE_SIZE_IN_PX,
        tilesOffsetFromCanvasInPx: TILES_OFFSET_FROM_CANVAS_IN_PX,
        gapBetweenTilesInPx: GAP_BETWEEN_TILES_IN_PX,
        mineSymbol: MINE_SYMBOL,
        difficulty: gameDifficulty
    }
}