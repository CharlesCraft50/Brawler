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
var vjoyAlive = true;
var MAX_ENEMIES = 1;
var MAX_STUFF_BLOCKS = 3;
var ENEMIES_COUNTER = 0;
var MAX_NPC = 5;

var GameState = function(game) {
  
};

    GameState.prototype.init = function() {
        //game.stage.backgroundColor = '#fff';
        game.time.advancedTiming = true;
        //game.add.plugin(Phaser.Plugin.Debug);
    };

    GameState.prototype.preload = function() {

    };

    GameState.prototype.create = function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    streetLightBeam_effect = game.add.group();
    streetLightBeam_group = game.add.group();

    tilemap();

    HUDisplay();
    spawnPoint = game.add.group();

    map.createFromObjects('objects', 67, 'spawnPoint', 0, true, false, spawnPoint);

    spawnPoint.forEach(function(sp){
      game.physics.arcade.enable(sp),
      sp.body.immovable = true;
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
    
    borderBottom = game.add.sprite(0, game.height-1, 'borderBottom');
    game.physics.arcade.enable(borderBottom);
    borderBottom.body.immovable = true;

    buttonsExecute();
    cursors = game.vjoy.cursors;
	
	        if(NPCGroup.countLiving() == 0) {
          for(var i = 0; i < MAX_NPC; i++) {
            a = game.rnd.integerInRange(0, 1);
            if(a == 0) {
              this.createNPC(945, 450, spriterData, game.rnd.integerInRange(50, 200), 'walk', 0);
            } else {
              this.createNPC(-10, 450, spriterData, game.rnd.integerInRange(50, 200), 'walk', 1);
            }
          }
        }
    };

    GameState.prototype.update = function() {
    
      if(enemies.countLiving() == 0) {

        if(ENEMIES_COUNTER == 0) {
          MAX_ENEMIES += 1;
          ENEMIES_COUNTER++;
        } else {
          ENEMIES_COUNTER = 0;
        }

        for(var i = 0; i < MAX_ENEMIES; i++) {
          a = game.rnd.integerInRange(0, 1);
          if(a == 0) {
            this.createEnemy_1(945, 450);
          } else {
            this.createEnemy_1(-10, 450);
          }
        }
      }

        if(stuff_blocks.countLiving() == 0) {
          for(var i = 0; i < MAX_STUFF_BLOCKS; i++) {
            this.createStuff_Block(game.rnd.integerInRange(10, 900), 0);
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

      if(game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        //playerSubtractHealthBar(20);
        coins.add(1);
      }
    };

    GameState.prototype.render = function() {
      
    };
