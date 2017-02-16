var player;
var enemies_1;
var enemiesAlive = 0;
var punched = false;
var world;
var punchedCount = 0;
var counter = 0;
var playerPunching = false;
var run = false;
var punch = false;
var wave = 1;
var healthFull;
var spriterLoader, spriterFile, spriterData;

var Level1 = function(game) {
  this.MAX_ENEMIES = 1;
  this.MAX_STUFF_BLOCKS = 3;
  this.ENEMIES_COUNTER = 0;
  this.MAX_NPC = 5;
};

    Level1.prototype.init = function() {
        game.time.advancedTiming = true;
        game.stage.backgroundColor = '#fff';
        game.time.advancedTiming = true;
    };

    Level1.prototype.preload = function() {

    };

    Level1.prototype.create = function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    streetLightBeam_effect = game.add.group();
    streetLightBeam_group = game.add.group();

    tilemap();

    HUDisplay();
    spawnPoint = game.add.group();

    map.createFromObjects('objects', 67, 'spawnPoint', 0, true, false, spawnPoint);

    spawnPoint.forEach(function(sp){
      game.physics.arcade.enable(sp),
      sp.body.immovable = true,
      blueOrb = game.add.emitter(sp.body.x+90, sp.body.y, 200),

      blueOrb.makeParticles('orb_blue'),

      blueOrb.setRotation(0, 0),
      blueOrb.setAlpha(0.3, 0.8),
      blueOrb.setScale(0.5, 1),
      blueOrb.gravity = -200,
      game.physics.arcade.enable(blueOrb),

      blueOrb.start(false, 5000, 100);
    });

    
    spriterLoader = new Spriter.Loader();
    spriterFile = new Spriter.SpriterJSON(this.cache.getJSON("stickman_animations"), { imageNameType: Spriter.eImageNameType.NAME_ONLY });
    spriterData = spriterLoader.load(spriterFile);
    

    playerGroup = this.game.add.group();
    enemies = this.game.add.group();
    stuff_blocks = this.game.add.group();
    weapons = this.game.add.group();
    power_ups = this.game.add.group();
    NPCGroup = this.game.add.group();

    /*worldLight = game.add.sprite(0, 0, 'darkBlue');
    worldLight.fixedToCamera = true;*/

    buttonsExecute();
    cursors = game.vjoy.cursors;
    };

    Level1.prototype.update = function() {

        

      if(enemies.countLiving() == 0) {

        if(this.ENEMIES_COUNTER == 0) {
          this.MAX_ENEMIES += 1;
          this.ENEMIES_COUNTER++;
        } else {
          this.ENEMIES_COUNTER = 0;
        }

        for(var i = 0; i < this.MAX_ENEMIES; i++) {
            this.createEnemy_1(game.rnd.integerInRange(0, 1100), 700);
        }
      }

        if(stuff_blocks.countLiving() == 0) {
          for(var i = 0; i < this.MAX_STUFF_BLOCKS; i++) {
            this.createStuff_Block(game.rnd.integerInRange(10, 1100), 0);
          }
        }

        if(NPCGroup.countLiving() == 0) {
          for(var i = 0; i < this.MAX_NPC; i++) {
            a = game.rnd.integerInRange(0, 1);
            if(a == 0) {
              this.createNPC(1600, 785, spriterData, game.rnd.integerInRange(50, 200), 'walk', 0);
            } else {
              this.createNPC(0, 785, spriterData, game.rnd.integerInRange(50, 200), 'walk', 1);
            }
          }
        }

        if(playerGroup.countLiving() == 0) {
          for(var i = 0; i < 1; i++) {
            spawnPoint.forEach(function(sp){
              this.createPlayer(sp.body.x+100, sp.body.y-100, spriterData);
            }, this);
          }
        }


      if(healthBar_Red.cameraOffset.x < -180) {
        gameOver();
      }

      if(healthBar_Red.cameraOffset.x == 0 || healthBar_Red.cameraOffset.x > 0) {
        healthFull = true;
      } else {
        healthFull = false;
      }

      
    };

    Level1.prototype.render = function() {
      /*game.debug.body(player);
      enemies.forEachAlive(function(e){
        game.debug.body(e);
      });*/
      game.debug.text(game.time.fps, 500, 20, { font: '50px Arial', fill: '#fff' });
    };

    Level1.prototype.spacebarInputIsActive = function(duration) {
        var isActive = false;

        isActive = this.input.keyboard.downDuration(Phaser.Keyboard.SPACEBAR, duration);


        return isActive;
    };

    Level1.prototype.spacebarInputReleased = function() {
        var released = false;

        released = this.input.keyboard.upDuration(Phaser.Keyboard.SPACEBAR);

        return released;
    };
