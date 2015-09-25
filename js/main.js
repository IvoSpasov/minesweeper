function startNewGame(level) {
    preparePlayingBoard(level);
    drawInitialTiles(); // needs tiles
    initializeGame(); // needs verticalTiles, horizontalTiles, tiles, board..
}

startNewGame('intermediate');