let config = {
    type: Phaser.CANVAS,
    width: 1200,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y:600},
            debug: false
        }
    },
    scene: [ Menu , Tutorial , Stage_2, Stage_1, Credits, Over]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyA,keyD,keyW,keyS,keyLEFT,keyRIGHT,keyUP,keyShift, timer;

var keySpace,keyE,keyDOWN;

var owl;