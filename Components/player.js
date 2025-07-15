
var Player = {
    x: .4,
    maxy: .95,
    miny: .05,
    y: .7,
    dy: 0,

    move: (delta) => {
        Player.dy += Game.gravity;
        let ny = Player.y + Player.dy * delta;
        if (ny < Player.miny) {
            ny = Player.miny;
            Player.dy = 0;
        }
        if (ny > Player.maxy) {
            ny = Player.maxy;
            Player.dy = 0;
        }
        Player.y = ny;
    },

    draw: () => {
        Canvas.drawRect(Player.x, Player.y, .05, .1, 'orange');
    }
}





var PlayerJSLoaded = true;