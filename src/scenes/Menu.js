class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion_1', './assets/explosion38.wav');
        this.load.audio('sfx_explosion_2', './assets/explosion39.wav');
        this.load.audio('sfx_explosion_3', './assets/explosion40.wav');
        this.load.audio('sfx_explosion_4', './assets/explosion41.wav');
        this.load.audio('sfx_explosion_5', './assets/explosion42.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('bgm_menu', './assets/bgm_menu.wav');
        this.load.audio('bgm_play', './assets/bgm_play.wav');
        this.load.audio('bgm_fast', './assets/bgm_fast.wav');
        this.load.audio('sfx_jingle', './assets/jingle.wav');
        this.load.audio('sfx_warp', './assets/warp.wav');
        this.load.image('menu', './assets/menu.png');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#267F00',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.menu = this.add.tileSprite(0, 0, game.config.width,
            game.config.height, 'menu').setOrigin(0,0);

        
        this.sound.play('bgm_menu');

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize, 
            'Use ← → arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#57007F';
        menuConfig.color = '#FFFFFF';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2
            + borderPadding, 'Press ← for Novice or → for Expert', 
            menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#000000';
        menuConfig.fontSize = '18px';
        this.add.text(30, game.config.height/2 + borderUISize*3 + borderPadding, 
            'Control your fireball as it flies with ← → arrows!', menuConfig).setOrigin(0);
        this.add.text(30, game.config.height/2 + borderUISize*4 + borderPadding, 
            'Further dragons are worth more points!', menuConfig).setOrigin(0);
        this.add.text(30, game.config.height/2 + borderUISize*5 + borderPadding, 
            '(Try to hit the Red Drake!)', menuConfig).setOrigin(0);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 51000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 5,
                gameTimer: 43000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}