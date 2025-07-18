var Game = {
    isPlaying: false,
    gravity: 10/1000,
    wind: .8,
    jump: .6,//.0011,
    velocity: 4/1000,//.03
    mouse: {},
    isEditing: false,
    lastColor: 'black',
    deltaMax: .2,

    init: () => {
        // document.addEventListener("keydown", Game.keydown);
        Game.initKeyListeners();

        Canvas.HTMLE.addEventListener('mousemove', (event) => {
            const rect = Canvas.HTMLE.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            Object.assign(Game.mouse, {
                x: Level.x + x / Canvas.HTMLE.width * 2,
                y: Level.y + y / Canvas.HTMLE.height
            });
        });
    },

    GetTime: ()=>{return audioActualLevel.currentTime;},

    play: () => {
        Game.isPlaying = true;
        audioActualLevel.play();
        Game.lastTime = performance.now();
        requestAnimationFrame(Game.loop);
    },

    stop: () => { 
    Game.isPlaying = false;
    audioActualLevel.pause();
     },

    loop: (time) => {

        // const time = Game.GetTime();
        let delta = time - Game.lastTime;
        Game.lastTime = time;
        if (Game.delta > Game.deltaMax) {
            console.warn('Delta: '+delta);
            Game.delta = Game.deltaMax;
        }


        Player.move(delta);
        Level.move(delta);

        let originalMouseCube, mouse;
        if (Game.isEditing) {
            mouse = [
                Math.round(Game.mouse.x * 10),
                Math.round(Game.mouse.y * 10)
            ];
            originalMouseCube = Level.data[mouse];
            Level.data[mouse] = 'white';
            if (Game.getState('KeyZ')) {

                // Game.isPlaying = false;
                let color = prompt('Color?');
                console.log('Draw', color, Game.lastColor)
                if (color !== null) {
                    if (color === "") color = Game.lastColor;
                    Game.lastColor = color;
                    originalMouseCube = color;
                    Game.keys.KeyZ = false;
                }
                // Game.isPlaying = true;
                // requestAnimationFrame(Game.loop);
            }
        }

        Canvas.clear();
        Level.draw();
        Player.draw();

        if (mouse) Level.data[mouse] = originalMouseCube;

        document.getElementById('xy').innerText = `
            X:${Player.x}; Y:${Player.y}; \n
            DX:${Player.dx}; DY:${Player.dy}; \n
            LX:${Level.x}; LY: ${Level.y} \n
            MX:${Game.mouse.x}; MY: ${Game.mouse.y}  \n
            D:${delta}; FPS:${1/delta}
        `;

        if (Game.isPlaying) requestAnimationFrame(Game.loop);


    },

    keydown: (key) => {
        console.log('Keydown:', key);
        switch (key.code) {
            case 'KeyP':
                Game.play();
                break;
            case 'KeyS':
                Game.stop();
                break;
            case 'KeyE':
                Game.isEditing = !Game.isEditing;
                break;
            case 'KeyL':
                console.log(Level.data);
                break;
        }
    },

    keys: {},

    // Initialisation des écouteurs d'événements
    initKeyListeners: () => {
        // Marquer la touche comme enfoncée
        window.addEventListener('keydown', (e) => {
            console.log('Keydown: ', e.code);
            Game.keys[e.code] = true;
            Game.keydown(e);
        });

        // Marquer la touche comme relâchée
        window.addEventListener('keyup', (e) => {
            Game.keys[e.code] = false;
        });

        // Réinitialiser l'état quand la fenêtre perd le focus
        window.addEventListener('blur', () => {
            for (const key in Game.keys) {
                Game.keys[key] = false;
            }
        });

        function updateMouseButton(buttonCode, isPressed) {
            switch (buttonCode) {
                case 0: Game.keys.MouseLeft = isPressed; break;
                case 1: Game.keys.MouseMiddle = isPressed; break;
                case 2: Game.keys.MouseRight = isPressed; break;
                case 3: Game.keys.MouseBack = isPressed; break;
                case 4: Game.keys.MouseForward = isPressed; break;
            }
        }

        // Enregistrement de l'appui sur un bouton
        document.addEventListener('mousedown', (e) => {
            updateMouseButton(e.button, true);
        });

        // Enregistrement du relâchement d'un bouton
        document.addEventListener('mouseup', (e) => {
            updateMouseButton(e.button, false);
        });

        // Réinitialiser l'état quand la souris quitte la fenêtre
        document.addEventListener('mouseleave', () => {
            for (let i = 0; i < 5; i++) {
                updateMouseButton(i, false);
            }
        });

        document.addEventListener('touchstart', (e) => {
            Game.keys.Touch = true;
        });

        document.addEventListener('touchend', (e) => {
            Game.keys.Touch = false;
        });
    },

    // Vérifier si une touche est enfoncée
    getState: (keyCode) => {
        if (keyCode == 'ArrowUp' && Game.keys.Touch) return true;
        return Game.keys[keyCode] || false;
    }

};




var GameJSLoaded = true;