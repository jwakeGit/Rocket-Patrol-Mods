// Wizard (player) prefab

class Wizard extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        
        // add object to the existing scene
        scene.add.existing(this);
        this.isFiring = false;      // track firing status
        this.moveSpeed = 2;         // pixels per frame
    }
}