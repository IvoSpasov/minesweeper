var canvas = document.getElementById('mines-canvas');
var context = canvas.getContext('2d');


function main() {
    var horizontalTiles = 10,
        verticalTiles = 10;
    drawTiles(horizontalTiles, verticalTiles);

    displayNumberOfMines();
    addListener();
    generateRandomlyPositionedMines(10, horizontalTiles, verticalTiles);

}

function drawTiles(horizontalTiles, verticalTiles) {
    horizontalTiles = horizontalTiles || 10;
    verticalTiles = verticalTiles || 10;

    var numberOfTiles = horizontalTiles * verticalTiles,
        tileSize = 40,
        tileStartPositionX = 5,
        tileStartPositionY = tileStartPositionX,
        tileStep = tileSize + tileStartPositionX;

    context.fillStyle = 'rgb(107, 187, 201)';
    for (var i = 1; i <= numberOfTiles; i += 1) {
        context.fillRect(tileStartPositionX, tileStartPositionY, tileSize, tileSize);
        tileStartPositionX += tileStep;
        if (i % horizontalTiles === 0) {
            tileStartPositionX = 5;
            tileStartPositionY += tileStep;
        }
    }
}

function drawTilesAnimated(horizontalTiles, verticalTiles) {
    horizontalTiles = horizontalTiles || 10;
    verticalTiles = verticalTiles || 10;

    var numberOfTiles = horizontalTiles * verticalTiles,
        tileSize = 40,
        tileStartPositionX = 5,
        tileStartPositionY = tileStartPositionX,
        tileStep = tileSize + tileStartPositionX,
        i = 1;

    function animate() {
        context.fillStyle = 'rgb(107, 187, 201)';
        context.fillRect(tileStartPositionX, tileStartPositionY, tileSize, tileSize);
        tileStartPositionX += tileStep;
        if (i % horizontalTiles === 0) {
            tileStartPositionX = 5;
            tileStartPositionY += tileStep;
        }

        if (i < numberOfTiles) {
            //requestAnimationFrame(animate);
            setTimeout(animate, 10);
        }

        i += 1;
    }

    animate();
}


function displayNumberOfMines() {
    context.fillStyle = 'black';
    context.font = 'bold 28px Consolas';
    context.fillText('1', 20, 30);
}

function addListener (){
    canvas.addEventListener('click', onCanvasClick, false);
}

function onCanvasClick(event) {
    console.log('x ' + event.clientX);
    console.log('y ' +event.clientY);
    console.log('type ' + event.type);
    console.log('button ' + event.button);
    console.log('target' + event.target);
}

main();