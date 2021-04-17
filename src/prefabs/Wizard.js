// Wizard (player) prefab

class Wizard extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        
        // add object to the existing scene
        scene.add.existing(this);
        this.isFiring = false;      // track firing status
        this.moveSpeed = 2;         // pixels per frame
    }
/*
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
            this.isFiring = true;
            console.log('wizard is firing');
        }

        // if fired, move the wizard up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    // reset wizard to "ground"
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
    */
}