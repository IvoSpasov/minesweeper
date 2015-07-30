var bodyMarginInPx = 8;

function main() {
    preparePlayingBoard();
    draw();
}



//function drawTilesAnimated(horizontalTiles, verticalTiles) {
//    horizontalTiles = horizontalTiles || 10;
//    verticalTiles = verticalTiles || 10;
//
//    var numberOfTiles = horizontalTiles * verticalTiles,
//        tileSize = 40,
//        tileStartPositionX = 5,
//        tileStartPositionY = tileStartPositionX,
//        tileStep = tileSize + tileStartPositionX,
//        i = 1;
//
//    function animate() {
//        context.fillStyle = 'rgb(107, 187, 201)';
//        context.fillRect(tileStartPositionX, tileStartPositionY, tileSize, tileSize);
//        tileStartPositionX += tileStep;
//        if (i % horizontalTiles === 0) {
//            tileStartPositionX = 5;
//            tileStartPositionY += tileStep;
//        }
//
//        if (i < numberOfTiles) {
//            //requestAnimationFrame(animate);
//            setTimeout(animate, 10);
//        }
//
//        i += 1;
//    }
//
//    animate();
//}

main();