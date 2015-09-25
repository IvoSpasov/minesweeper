function startNewGame(level) {
    var gameSettings,
        tiles;

    gameSettings = prepareGameSettings(level);
    tiles = preparePlayingBoard(gameSettings);
    prepareCanvas(gameSettings.canvasWidth, gameSettings.canvasHeight);
    drawInitialTiles(tiles, gameSettings.tileSizeInPx);
    initializeGame(tiles, gameSettings);
}

function restartGame() {
    var level = $(this)[0].id;
    startNewGame(level);
}

$('#difficulty').on('click', 'a', restartGame);

startNewGame('intermediate');