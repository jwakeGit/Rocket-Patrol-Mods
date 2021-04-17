// Rocket (player) prefab

class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        
        // add object to the existing scene
        scene.add.existing(this);
        this.isFiring = false;      // track firing status
        this.moveSpeed = 3;         // pixels per frame
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    update(){
        // left / right movement
        // if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                if(!this.isFiring) this.x -= this.moveSpeed;
                else this.x -= this.moveSpeed/4;
            } else if (keyRIGHT.isDown && this.x <= game.config.width 
            - borderUISize - this.width) {
                if(!this.isFiring) this.x += this.moveSpeed;
                else this.x += this.moveSpeed/4;
            }
        // }
        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyF)) {
            if(this.isFiring == false) this.sfxRocket.play();
            this.isFiring = true;
        }
        // if fired, move the rocket up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    // reset rocket to "ground"
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}