class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('wizard', './assets/wizard.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('scenery', './assets/background.png');
        this.load.image('special', './assets/special.png');
        // load spritesheets
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64, 
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })
        this.load.spritesheet('explosion_small', './assets/explosion_small.png', {
            frameWidth: 32, 
            frameHeight: 16,
            startFrame: 0,
            endFrame: 9
        })
        this.load.spritesheet('warp', './assets/warp.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 4
        })
    } 

    create() {
        // update music
        this.sound.stopAll();
        if(game.settings.spaceshipSpeed == 4) {
            this.sound.play('bgm_play');
        }else{
            this.sound.play('bgm_fast');
        }

        // place scenery
        this.scenery = this.add.tileSprite(0, 0, game.config.width,
        game.config.height, 'scenery').setOrigin(0,0);

        // place starfield
        this.starfield = this.add.tileSprite(0, 0, game.config.width, 
        game.config.height, 'starfield').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding - 11, 
        game.config.width, borderUISize * 2, 
        0x000000).setOrigin(0, 0);

        // add rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, 
            game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0.5);

        // add wizard
        this.wizard = new Wizard(this, game.config.width/2,
            game.config.height - borderUISize - borderPadding*1.5, 'wizard').setOrigin(0.5, 0.5);

        // add spaceship (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6,
            borderUISize*4 + 5, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3,
            borderUISize*5 + borderPadding*2 + 5, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, 
            borderUISize*6 + borderPadding*4 + 5, 'spaceship', 0, 10).setOrigin(0,0);
        this.spec = new Special(this, game.config.width + 10,
            borderUISize*3 + 5, 'special', 0, 50).setOrigin(0,0);

        // white borders
        this.add.rectangle(0, 0, game.config.width, 
            borderUISize, 0x000000).setOrigin(0, 0);
            this.add.rectangle(0, game.config.height - borderUISize,
            game.config.width, borderUISize, 0x000000).setOrigin(0, 0);
            this.add.rectangle(0, 0, borderUISize, game.config.height, 
            0x000000).setOrigin(0, 0);
            this.add.rectangle(game.config.width - borderUISize, 0, 
            borderUISize, game.config.height, 0x000000).setOrigin(0, 0);
    
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }), 
            frameRate: 30
        });
        this.anims.create({
            key: 'explode_small',
            frames: this.anims.generateFrameNumbers('explosion_small', {
                start: 0,
                end: 9,
                first: 0
            }), 
            frameRate: 30
        });
        this.anims.create({
            key: 'warp_anim',
            frames: this.anims.generateFrameNumbers('warp', {
                start: 0,
                end: 3,
                first: 0
            }),
            frameRate: 30
        })

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#57007F',
            color: '#9CFD8A',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, 
        borderUISize + borderPadding*2 - 5, this.p1Score, scoreConfig);

        // GAME OVER flag
        this.gameOver = false;

        // halfway timer and full game clock
        scoreConfig.fixedWidth = 0;

        this.clock2 = this.time.delayedCall(game.settings.gameTimer/2, () => {
            this.ship01.speedUp();
            this.ship02.speedUp();
            this.ship03.speedUp();
            this.spec.speedUp();
        }, null, this);

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 
                'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64,
                'Press (R) to Restart or ↑ for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            this.ship01.speedDown();
            this.ship02.speedDown();
            this.ship03.speedDown();
            this.spec.speedDown();
        }, null, this);
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= starSpeed;

        // update calls
        if(!this.gameOver) {
            this.p1Rocket.update();
            if(!this.p1Rocket.isFiring) this.wizard.x = this.p1Rocket.x;
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.spec.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            this.makeWarp();
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            this.makeWarp();
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            this.makeWarp();
        }
        if(this.checkCollision(this.p1Rocket, this.spec)){
            this.p1Rocket.reset();
            this.specialExplode(this.spec);
            this.makeWarp();
        }
        if(this.p1Rocket.y <= (borderUISize * 3 + borderPadding)+1) {
            this.makeWarp();
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if(rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.y + rocket.height > ship.y) {
                return true;
        } else {
            return false;
        }
    }

    makeWarp() {
        let zoop = this.add.sprite(this.wizard.x, this.wizard.y, 'warp');
        zoop.anims.play('warp_anim');
        this.sound.play('sfx_warp');
        zoop.on('animationcomplete', () => {
            zoop.destroy();
        })
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        let rando = Phaser.Math.Between(1, 5);
        if(rando == 1){
            this.sound.play('sfx_explosion_1');
        } else if (rando == 2){
            this.sound.play('sfx_explosion_2');
        } else if (rando == 3){
            this.sound.play('sfx_explosion_3');
        } else if (rando == 4){
            this.sound.play('sfx_explosion_4');
        } else {
            this.sound.play('sfx_explosion_5');
        }
    }

    specialExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion_small').setOrigin(0,0);
        boom.anims.play('explode_small');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        let rando = Phaser.Math.Between(1, 5);
        if(rando == 1){
            this.sound.play('sfx_explosion_1');
        } else if (rando == 2){
            this.sound.play('sfx_explosion_2');
        } else if (rando == 3){
            this.sound.play('sfx_explosion_3');
        } else if (rando == 4){
            this.sound.play('sfx_explosion_4');
        } else {
            this.sound.play('sfx_explosion_5');
        }
        this.sound.play('sfx_jingle');
    }
}