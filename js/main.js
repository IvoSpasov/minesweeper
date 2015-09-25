function startNewGame(level) {
    preparePlayingBoard(level);
    drawInitialTiles();
    initializeGame();
}

startNewGame('intermediate');