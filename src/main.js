// Jessica Wake
// Rocket Patrol Mods (Dragon Patrol)
// 4/20/21
// 8-10 Hours
//
// POINTS BREAKDOWN:
// Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
// Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
// Create 4 new explosion SFX and randomize which one plays on impact (10)
// Allow the player to control the Rocket after it's fired (5)
// Implement the speed increase that happens after 30 seconds in the original game (5)
//
// TOTAL POINTS: 100/100

let config = {
    type: Phaser.CANVAS, 
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

// set ui sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let starSpeed = -2;
let wizardPos = 0;

// reserve keyboard bindings
let keyF, keyR, keyLEFT, keyRIGHT; 