function startNewGame(level) {
    var gameSettings,
        tiles;

    gameSettings = prepareGameSettings(level);
    tiles = preparePlayingBoard(gameSettings);
    drawInitialTiles(tiles, gameSettings.tileSizeInPx);
    initializeGame(tiles, gameSettings);
}

startNewGame('intermediate');