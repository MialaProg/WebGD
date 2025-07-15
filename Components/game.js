var Game = {
    isPlaying: false,
    x:.5,
    y:.5,
    dx:.001,
    dy:.001,

    init: ()=>{
        document.addEventListener("keydown", Game.keydown);
    },

    play: ()=>{
        Game.isPlaying = true;
        Game.loop();
    },

    stop: ()=>{Game.isPlaying = false;},

    loop: ()=>{
        if (Game.isPlaying) requestAnimationFrame(Game.loop);
        else return;

        Game.dx += randint(-1,1)/1000;
        Game.dy += randint(-1,1)/1000;
        const nx = Game.x + Game.dx;
        const ny = Game.y + Game.dy;
        if (nx + .05 > 1 || nx - .05 < 0) Game.dx *= (-.8);
        else Game.x = nx;
        if (ny + .05 > 1 || ny - .05 < 0) Game.dy *= (-.8);
        else Game.y = ny;

        Canvas.clear();
        Canvas.drawRect(Game.x, Game.y, .1, .1, 'orange');
    },

    keydown: (key)=>{
        console.log('Keydown:',key);
        switch (key.code){
            case 'ArrowUp':
                Game.dy -= .005;
                break;
            case 'ArrowDown':
                Game.dy += .005;
                break;
            case 'ArrowLeft':
                Game.dx -= .005;
                break;
            case 'ArrowRight':
                Game.dx += .005;
                break;
            case 'KeyP':
                Game.play();
                break;
            case 'KeyS':
                Game.stop();
                break;
        }
    }
};




var GameJSLoaded = true;