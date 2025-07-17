
var Player = {
    x: .4,
    y: 9,
    dy: 0,
    dyMax: 1,
    dx: 0,
    deathY: [0, 22],

    death: () => {
        Player.x = .4;
        Player.y = 9;
        Player.dy = 0;
        Player.dx = 0;
        audioActualLevel.currentTime = 0;
    },

    move: (delta) => {
        Player.dx = (!Game.isEditing || (Game.getState('ArrowRight') - Game.getState('ArrowLeft'))) * Game.velocity || Player.dx * Game.wind

        Player.x += Player.dx;

        Player.dy += Game.gravity;
        if (Player.dy > Player.dyMax) Player.dy = Player.dyMax;

        let ny = Player.y + Player.dy * delta;

        const minCellX = Math.floor(10 * Player.x);
        const minCellY = Math.floor(10 * ny);

        const dataAbove = [
            Level.data[[minCellX, minCellY]],
            Level.data[[minCellX + 1, minCellY]]
        ];
        const dataBellow = [
            Level.data[[minCellX, minCellY + 1]],
            Level.data[[minCellX + 1, minCellY + 1]]
        ];
        // const data = dataAbove.concat(dataBellow);

        if (['black'].includes(dataAbove[1])){
            Player.death();
            return;
        }

        if (dataAbove.includes('red')) {
            Player.death();
            return;
        }

        if (dataBellow.includes('black')) {
            ny = minCellY / 10 + .1;
            Player.dy = 0;
        }

        if (dataBellow.includes('black')) {
            ny = minCellY / 10;
            Player.dy = Game.getState('ArrowUp') * (-Game.jump);
        }
        Player.y = ny;

        if (Player.y > Player.deathY[1] || Game.getState('KeyR')) Player.death();
    },

    draw: () => {
        Canvas.drawRect(.5 * (Player.x - Level.x), Player.y - Level.y, .05, .1, 'orange');
    }
}





var PlayerJSLoaded = true;