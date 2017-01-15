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

var Level1 = function(game) {
  this.MAX_ENEMIES = 3;
  this.MAX_STUFF_BLOCKS = 3;
  this.GRAVITY = 2000;
};

    Level1.prototype.init = function() {
        game.time.advancedTiming = true;
        game.stage.backgroundColor = '#fff';
    };

    Level1.prototype.preload = function() {
        this.load.atlasJSONHash('stickman_2', 'assets/sprites/stickmans/stickman_2/stickman_2_lit.png', 'assets/sprites/stickmans/stickman_2/stickman_2.json');
		this.load.atlasJSONHash('stickman_1', 'assets/sprites/stickmans/stickman_3/stickman_3_lit.png', 'assets/sprites/stickmans/stickman_3/stickman_3.json');
        this.load.spritesheet('startButton', 'assets/buttons/startButton.png', 120, 40);
		this.load.spritesheet('helpButton', 'assets/buttons/helpButton.png', 120, 40);
		this.load.spritesheet('backButton', 'assets/buttons/backButton.png', 120, 40);
		this.load.image('healthBar_Red', 'assets/sprites/healthBar_Red.png');
		this.load.image('healthBar_Border', 'assets/sprites/healthBar_Border.png');
		this.load.tilemap('map', 'assets/tilemaps/map.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('tileset', 'assets/tilemaps/tileset.png');
		this.load.image('orb_blue', 'assets/sprites/particles/orbs/orb_blue.png');
		this.load.image('spawnPoint', 'assets/sprites/spawn_point.png');
		this.load.image('box_wood', 'assets/sprites/box_wood.png');
		this.load.atlasJSONHash('weapons', 'assets/sprites/weapons/weapons.png', 'assets/sprites/weapons/weapons.json');
		this.load.spritesheet('power_ups', 'assets/sprites/power_ups/power_ups.png', 50, 50);
		this.load.image('powerUp_2x', 'assets/sprites/power_ups/powerUp_2x.png');
		this.load.image('pistol', 'assets/sprites/weapons/guns/pistol.png');
		this.load.image('desert_eagle', 'assets/sprites/weapons/guns/desert_eagle.png');
		this.load.image('bullet_1', 'assets/sprites/particles/bullets/bullet_1.png');
		this.load.image('pistol_box', 'assets/sprites/power_ups/pistol_box.png');
		this.load.image('desert_eagle_box', 'assets/sprites/power_ups/desert_eagle_box.png');
		this.load.spritesheet('arrow_button', 'assets/sprites/buttons/arrow_button.png', 96, 96);
		this.load.spritesheet('button-round-a', 'assets/sprites/buttons/button-round-a.png', 96, 96);
		this.load.spritesheet('run_button', 'assets/sprites/buttons/run_button.png', 96, 96);
		this.load.spritesheet('jump_button', 'assets/sprites/buttons/jump_button.png', 96, 96);
		this.load.spritesheet('punch_button', 'assets/sprites/buttons/punch_button.png', 96, 96);
		this.load.image('vjoy_base', 'assets/sprites/buttons/vjoy_base.png');
        this.load.image('vjoy_body', 'assets/sprites/buttons/vjoy_body.png');
        this.load.image('vjoy_cap', 'assets/sprites/buttons/vjoy_cap.png');
    };

    Level1.prototype.create = function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    tilemap();

    HUDisplay();
    spawnPoint = game.add.group();

    map.createFromObjects('objects', 13, 'spawnPoint', 0, true, false, spawnPoint);

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


    spawnPoint.forEach(function(sp){
    player = game.add.sprite(sp.body.x+30, sp.body.y-100, 'stickman_1', 'walk/walk_1');
    });
    game.physics.enable(player, Phaser.Physics.ARCADE);
    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);
    player.animations.add('walk', Phaser.Animation.generateFrameNames('walk/walk_', 1, 8), 10, true);
    player.animations.add('sprint', Phaser.Animation.generateFrameNames('walk/walk_', 1, 8), 20, true);
    player.animations.add('crouch', Phaser.Animation.generateFrameNames('walk/crouch'), 20, true);

    player.animations.add('punch_1', Phaser.Animation.generateFrameNames('punch_1/punch_', 1, 1), 5, true);
    player.animations.add('punch_2', Phaser.Animation.generateFrameNames('punch_1/punch_', 2, 2), 5, true);
    player.animations.add('punch_3', Phaser.Animation.generateFrameNames('punch_1/punch_', 3, 3), 5, true);
    player.animations.add('punch_4', Phaser.Animation.generateFrameNames('punch_1/punch_', 4, 4), 5, true);

    player.body.gravity.y = this.GRAVITY;
    player.body.collideWorldBounds = true;
    game.physics.arcade.checkCollision.bottom = false;
    game.physics.arcade.checkCollision.top = false;


    this.jumping = false;
    player.punchtwospeed = 50;
    player.punchthreespeed = 50;
    player.punchfourspeed = 50;
    player.punch_damage = 1;
    player.facing = 'left';
    player.holding = 'nothing';
    player.counter = 0;
    player.randomNumber = 0;
    player.alive = true;
    player.anchor.setTo(0.5, 0.5);
    player.timeCheck = game.time.now;
    player.weaponTime = false;

    enemies = this.game.add.group();
    stuff_blocks = this.game.add.group();
    weapons = this.game.add.group();
    power_ups = this.game.add.group();

    buttonsExecute();
    cursors = game.vjoy.cursors;
    };

    Level1.prototype.update = function() {
      collideWithTilemap(true, player);
      collideWithTilemap(true, enemies);
      game.physics.arcade.collide(enemies, enemies);
      game.physics.arcade.collide(enemies, enemies);
      if(checkOverlap(player, spawnPoint)) {
        player.body.gravity.y = -2000;
        player.body.velocity.y = -2000;
      } else {
        player.body.gravity.y = this.GRAVITY;
      }

      if(enemies.countLiving() == 0) {
        for(var i = 0; i < this.MAX_ENEMIES; i++) {
          this.createEnemy_1(game.rnd.integerInRange(0, 1100), 700);
        }
      }

        if(stuff_blocks.countLiving() == 0) {
          for(var i = 0; i < this.MAX_STUFF_BLOCKS; i++) {
            this.createStuff_Block(game.rnd.integerInRange(10, 1100), 500);
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

      if(player.alive == true) {

        if(player.holding == 'nothing' && player.counter > 0) {
          player.counter = 0;
        }

      if(cursors.left) {
        player.body.velocity.x = -200;

        if(player.facing != 'left') {
            player.scale.x = 1;
            player.animations.play('walk');
            player.facing = 'left';
        }
      } else if(cursors.right) {
        player.body.velocity.x = 200;

        if(player.facing != 'right') {
            player.scale.x = -1;
            player.animations.play('walk');
            player.facing = 'right';
        }
      } else {
        player.body.velocity.x = 0;

        if(player.facing != 'idle') {
            player.animations.stop();

            if(player.facing == 'left') {
                if(player.holding != 'nothing' && player.holding != 'powerUp_2x') {
                  player.scale.x = 1;
                  player.animations.stop();
                  player.frame = 10;
                } else {
                  //Jump animation:
                  if(this.jumping == true) {
                  player.frame = 13;
                  player.scale.x = 1;
                  //break;
                  } else {
                  //Player idle left
                  player.scale.x = 1;
                  player.animations.stop(null, true);
                  //break;
                  }
                }
            } else {
                if(player.holding != 'nothing' && player.holding != 'powerUp_2x') {
                  player.scale.x = -1;
                  player.animations.stop();
                  player.frame = 10;
                } else {
                  //Jump animation:
                  if(this.jumping == true) {
                  player.frame = 13;
                  player.scale.x = -1;
                  //break;
                  } else {
                  //Player idle left
                  player.scale.x = -1;
                  player.animations.stop(null, true);
                  //break;
                  }                }
            }

            player.facing = player.facing;
        }
      }


      if(player.body.onFloor()) {
          this.jumps = 0;
          this.jumping = false;
      }

      if(cursors.up && this.jumps < 5) {
          player.body.velocity.y = -1000;
          this.jumps++; 
          this.jumping = true;
      }

      if(cursors.down) {
          if(player.facing == 'left') {
            player.scale.x = 1;
          } else {
            player.scale.x = -1;
          }
            player.frame = 4;
            player.body.velocity.x = 0;
      }

      if(run) {
        if(cursors.right || cursors.left) {
          if (player.facing == 'left') {
              player.scale.x = 1;
              player.body.velocity.x = -500;
              player.animations.play('sprint');
          } else {
              player.scale.x = -1;
              player.body.velocity.x = 500;
              player.animations.play('sprint');
          }
        }

      }

      if(punch) {
        if(player.holding != 'nothing' && player.holding != 'powerUp_2x') {
          if(player.facing == 'left') {
            player.bullet.fireAngle = Phaser.ANGLE_LEFT;
          } else {
            player.bullet.fireAngle = Phaser.ANGLE_RIGHT;
          }
          if(player.weaponTime != false) {
            if(game.time.now - player.timeCheck >= player.weaponTime) {
              player.bullet.fire();
              player.timeCheck = game.time.now;
            }
          }
        } else {
          game.physics.arcade.collide(player, weapons, function(player, weapon){weapon.destroy(); weapon.alive = false;});
          if(punched == false) {
            if(player.facing == 'left') {
              player.scale.x = 1;
            } else {
              player.scale.x = -1;
            }
            player.body.velocity.x = 10;
              if(punchedCount == 0) {
                player.animations.play('punch_1');
                setTimeout(function(){punchedCount = 1;}, 0);
              } else if(punchedCount == 1) {
                player.animations.play('punch_2');
                setTimeout(function(){punchedCount = 2;}, player.punchtwospeed);
              } else if(punchedCount == 2) {
                player.animations.play('punch_3');
                playerPunching = true;
                setTimeout(function(){punchedCount = 3;}, player.punchthreespeed);
              } else if(punchedCount == 3) {
                player.animations.play('punch_4');
                playerPunching = true;
                setTimeout(function(){punchedCount = 4;}, player.punchfourspeed);
              } else {
                punchedCount = 0;
                playerPunching = false;
              }
            setTimeout(function() {if(player.facing == 'left') {player.animations.play('sprint');} else {player.animations.play('sprint');}}, 100);
            setTimeout(function(){punched = true;}, 1000);
          } else {
              punched = false;
          }
        }

      } else {
        playerPunching = false;
      }
    }
    };

    Level1.prototype.render = function() {
      //game.debug.body(player);
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
