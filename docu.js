
// Sounds
let sfx = new Audio('sound.wav') //=>.play();

window.onload = function () {
    //Board setup
    board = document.getElementById("board");
    board.height = board_h;
    board.width = board_w;
    context = board.getContext("2d");

    // Draw an image
    bg_img = new Image();
    bg_img.src = "bg.png";
    bg_img.onload = function () {
        context.drawImage(bg_img, 0, 536, 400, 64);
    }

    // Loop
    requestAnimationFrame(update);

    // Keys
    document.addEventListener("keydown", jump);
}


function update() {
    requestAnimationFrame(update);
    
    // Calcs

    // Clear Screen before draw
    context.clearRect(0, 0, board.width, board.height);

    // Draws

    // Score
    context.fillStyle = "White";
    context.font = "60px font";
    context.fillText(score, 181, 80);

}


function jump(key) {
    if (key.code == "Space") {
        // Checks...
    }
}
