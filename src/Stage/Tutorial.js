// Tutorial section
class Tutorial extends Phaser.Scene{
    constructor(){
        super('tutorialScene');
    }

    preload(){
        this.load.image('back','./assets/tutorial_bg.png');
        this.load.image('switch','./assets/switch.jpg');
        this.load.image('tenti','./assets/tenti.png');
        this.load.image('tutorial_bg', './assets/tutorial_bg.png');
        this.load.image('box_fragile', './assets/box_fragile.png');
        this.load.image('platform', './assets/wood_platform.png');
        this.load.image('crab', './assets/Crab.png');
        this.load.image('platformY', './assets/wood_platformY.png');
        this.load.image('box', './assets/box.png');
        this.load.atlas('crab_atlas', './assets/crabbertsheet.png', './assets/crabmap.json');
        this.load.atlas('tenti_atlas', './assets/tentisheet.png', './assets/tentimap.json');
        this.load.image('hatch', './assets/hatch.png');
        this.load.image('arrow', './assets/arrow.png');
        this.load.image('be', './assets/ekey.png');
        this.load.image('exitsign', './assets/exitsign.png');

        this.load.audio('switch','./assets/audio/switch.wav');
        this.load.audio('jump', './assets/audio/jump.wav');
        this.load.audio('climb', './assets/audio/climb.wav');
        this.load.audio('bgm', './assets/audio/TutorialTheme.wav');
    }

    create(){
        // world bounds
        //this.physics.world.setBounds(0,0,800,600,true,true,true,false);
        //set background
        let bg = this.add.image(game.config.width/2, game.config.height/2,"back");

        this.bgm = this.sound.add('bgm');
        this.bgm.setVolume(0.3);
        this.bgm.loop = true;
        this.bgm.play();

        //stuff so sound only repeats after completely playing once
        this.sfxJump = this.sound.add('jump');
        this.sfxJumpComplete = false;
        this.sfxJumpIsPlaying = false;
        this.sfxClimb = this.sound.add('climb');
        this.sfxClimbIsPlaying = false;

        // init ground and platform
        this.tutorial_bg = this.add.tileSprite(0, 0, 1200, 650, 'tutorial_bg').setOrigin(0, 0);
        this.platform = this.physics.add.sprite(game.config.width/3,game.config.height/2 + 10,'platform');
        this.platform.displayWidth = 900;
        this.platform.body.allowGravity = false;
        this.platform.setImmovable(true);
        this.platform.setFrictionX(0);
        this.ground = this.physics.add.sprite(game.config.width/2,game.config.height - 10,'platform');
        this.ground.displayWidth = 1200;
        this.ground.body.allowGravity = false;
        this.ground.setImmovable(true);
        this.ground.setFrictionX(0);

        this.wall = this.physics.add.sprite(game.config.width - 200, game.config.height - 160, 'platformY');
        this.wall.displayHeight = 280;
        this.wall.body.allowGravity = false;
        this.wall.setImmovable(true);
        this.wall.setFrictionX(0);

        this.hatch = this.physics.add.sprite(game.config.width - 280, game.config.height/2 + 10, 'hatch');
        this.hatch.displayWidth = 140;
        this.hatch.body.allowGravity = false;
        this.hatch.setImmovable(true);
        this.hatch.setFrictionX(0);

        this.platform2 = this.physics.add.sprite(game.config.width - 95, game.config.height/2 + 10, 'platform');
        this.platform2.displayWidth = 190;
        this.platform2.body.allowGravity = false;
        this.platform2.setImmovable(true);
        this.platform2.setFriction(0);
        
        // init players
        this.player1 = new Player1(this,game.config.width/3 - 200, game.config.height - 100, 'tenti');
        this.physics.add.collider(this.ground,this.player1);
        this.physics.add.collider(this.wall, this.player1);
        this.physics.add.collider(this.hatch, this.player1);
        this.physics.add.collider(this.platform2, this.player1);
        this.physics.add.collider(this.platform,this.player1);
        this.player1.setCollideWorldBounds(true);

        this.player2 = new Player2(this,game.config.width/3 - 200, game.config.height/2 -100, 'crab');
        this.physics.add.collider(this.platform,this.player2);
        this.physics.add.collider(this.ground, this.player2);
        this.physics.add.collider(this.wall, this.player2);
        this.physics.add.collider(this.hatch, this.player2);
        this.physics.add.collider(this.platform2, this.player2);
        this.player2.setCollideWorldBounds(true);

        // init key
        keyA = this.input.keyboard.addKey(65);
        keyD = this.input.keyboard.addKey(68);
        keyW = this.input.keyboard.addKey(87);
        keyS = this.input.keyboard.addKey(83);
        keyLEFT = this.input.keyboard.addKey(37);
        keyRIGHT = this.input.keyboard.addKey(39);
        keyUP = this.input.keyboard.addKey(38);
        keyDOWN = this.input.keyboard.addKey(40);
        keyE = this.input.keyboard.addKey(69);
        keyShift = this.input.keyboard.addKey(16);
    //    keySpace = this.input.keyboard.addKey(32);

        this.interact_button1 = false;
        this.interact_button2 = false;
        this.interact_switch = false;

        //arrow init
        this.arrow = this.physics.add.sprite(game.config.width/3 + 200,game.config.height/2 -100, 'arrow').setScale(1);
        this.arrow.setImmovable(true);
        this.arrow.body.allowGravity = false;
        this.arrow.visible = false;

        this.arrow2 = this.physics.add.sprite(game.config.width-60, game.config.height/2 - 120, 'arrow').setScale(1);
        this.arrow2.setImmovable(true);
        this.arrow2.body.allowGravity = false;
        this.arrow2.visible = false;

        this.be = this.physics.add.sprite(game.config.width-20, game.config.height/2 - 120, 'be').setScale(1);
        this.be.setImmovable(true);
        this.be.body.allowGravity = false;
        this.be.visible = false;

        // init interact
        this.switch = this.physics.add.sprite(game.config.width/3 + 200,game.config.height/2 -50, 'switch').setScale(1);
        this.switch.alpha = 0;
        this.physics.add.collider(this.switch,this.platform);
        this.switch.body.allowGravity = false;
        this.switch.setImmovable(true);

        this.box = this.physics.add.sprite(game.config.width/3 + 20,game.config.height/2 - 40, 'box_fragile').setScale(1);
        this.physics.add.collider(this.box,this.platform);
        this.physics.add.collider(this.box,this.player2);
        this.physics.add.collider(this.box, this.player1);
        this.box.setImmovable(true);
        this.box.body.allowGravity = false;

        this.box2 = this.physics.add.sprite(game.config.width - 250, game.config.height - 60, 'box_fragile').setScale(1);
        this.rockPlat = this.physics.add.collider(this.box2,this.platform);
        this.physics.add.collider(this.box2,this.player1);
        this.physics.add.collider(this.box2, this.player2);
        this.box2.setImmovable(true);
        this.box2.body.allowGravity = false;

        this.boxStack1 = this.physics.add.sprite(game.config.width - 260, game.config.height - 150, 'box').setScale(1.2);
        this.physics.add.collider(this.boxStack1,this.player1);
        this.physics.add.collider(this.boxStack1, this.player2);
        this.boxStack1.setImmovable(true);
        this.boxStack1.body.allowGravity = false;

        this.boxStack2 = this.physics.add.sprite(game.config.width - 330, game.config.height - 60, 'box').setScale(1);
        this.physics.add.collider(this.boxStack2,this.player1);
        this.physics.add.collider(this.boxStack2, this.player2);
        this.boxStack2.setImmovable(true);
        this.boxStack2.body.allowGravity = false;

        //this.playerGroup = this.game.add.group();
        //this.playerGroup.add(playert1);
        //this.playerGroup.add(playert2);


        this.button = this.physics.add.sprite(game.config.width-40, game.config.height/2-40, "exitsign").setScale(1);
        this.button.setImmovable(true);
        this.button.body.allowGravity = false;
        this.physics.add.collider(this.button,this.platform2); //tutorial end box
        this.player1_button = this.physics.add.overlap(this.player1,this.button,function(){
            if(keyE.isDown){
                this.interact_button1 = true;
            }
        },null,this);
        this.player2_button = this.physics.add.overlap(this.player2,this.button,function(){
            if(keyDOWN.isDown){
                this.interact_button2 = true;
            }
        },null,this);

        this.physics.add.overlap(this.player2,this.switch,function(){
            if(keyDOWN.isDown && !this.interact_switch){
                this.interact_switch = true;
                this.sound.play('switch');
            }
        },null,this);
    }

    update(){
        this.player1.update();
        this.player2.update();

        //player 2 jump sfx
        if (this.sfxJumpComplete && keyUP.isUp) {
            this.sfxJumpIsPlaying = false;
            this.sfxJumpComplete = false;
        }
        if (this.player2.jump) {
            if (!this.sfxJumpIsPlaying) {
                this.sfxJump.play();
            }
            this.sfxJump.on('play', () => {
                this.sfxJumpIsPlaying = true;
                this.sfxJump.on('complete', () => {
                    this.sfxJumpComplete = true;
                });
            });
        }
        //player 1 climb sfx
        if((keyW.isDown && this.player1.body.blocked.right) || (keyW.isDown && this.player1.body.blocked.left)){
            if(this.player1.climbTime > 0 ) {
                if (!this.sfxClimbIsPlaying) {
                    this.sfxClimb.play();
                }
                this.sfxClimb.on('play', () => {
                    this.sfxClimbIsPlaying = true;
                    this.sfxClimb.on('complete', () => {
                        this.sfxClimbIsPlaying = false;
                    });
                });
            }
        }

        if(this.switch.body.touching.none){
            this.arrow.visible = false;
        }
        else{
            this.arrow.visible = true;
        }

        if(this.button.body.touching.none){
            this.arrow2.visible = false;
            this.be.visible = false;
        }
        else{
            this.arrow2.visible = true;
            this.be.visible = true;
        }

        if(this.interact_switch){
            
            this.hatch.visible = false;
            this.hatch.setImmovable(false);
            this.hatch.body.allowGravity = true;
            this.hatch.setVelocityY(-500);
            this.physics.world.removeCollider(this.hatch);
        }

        if(this.interact_button1 && this.interact_button2){
            this.bgm.pause();
            this.scene.start("PostTutorial");
        }

    }

}