var game = new Phaser.Game(1100, 550, Phaser.CANVAS);

var sprite;

var player;
var enemies_1;
var enemiesAlive = 0;
var score = 0;
var playerDied = false;
var jumpTimer = 0;
var punched = false;
var world;
var punchOnce = false;
var punchedCount = 0;
var counter = 0;
var playerPunching = false;

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

    };

    Level1.prototype.create = function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);


    tilemap();

    HUDisplay();
    spawnPoint = game.add.group();

    world.createFromObjects('objects', 13, 'spawnPoint', 0, true, false, spawnPoint);

    spawnPoint.forEach(function(sp){
      game.physics.arcade.enable(sp),
      sp.body.immovable = true,
      blueOrb = game.add.emitter(sp.body.x, sp.body.y, 200),

      blueOrb.makeParticles('orb_blue'),

      blueOrb.setRotation(0, 0),
      blueOrb.setAlpha(0.3, 0.8),
      blueOrb.setScale(0.5, 1),
      blueOrb.gravity = -200,

      blueOrb.start(false, 5000, 100);
    });


    spawnPoint.forEach(function(sp){
    player = game.add.sprite(sp.body.x+30, sp.body.y-100, 'stickman_1', 'walk/left_1');
    });
    game.physics.enable(player, Phaser.Physics.ARCADE);
    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);
    player.animations.add('walk', Phaser.Animation.generateFrameNames('walk/left_', 1, 8), 10, true);
    player.animations.add('sprint', Phaser.Animation.generateFrameNames('walk/left_', 1, 8), 20, true);

    player.animations.add('punch_1', Phaser.Animation.generateFrameNames('punch_1/left_', 1, 1), 5, true);
    player.animations.add('punch_2', Phaser.Animation.generateFrameNames('punch_1/left_', 2, 2), 5, true);
    player.animations.add('punch_3', Phaser.Animation.generateFrameNames('punch_1/left_', 3, 3), 5, true);
    player.animations.add('punch_4', Phaser.Animation.generateFrameNames('punch_1/left_', 4, 4), 5, true);

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

    enemies = this.game.add.group();
    stuff_blocks = this.game.add.group();
    weapons = this.game.add.group();
    power_ups = this.game.add.group();


    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    sprintButton = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    punchButton = game.input.keyboard.addKey(Phaser.Keyboard.ALT);

    };

    Level1.prototype.update = function() {
      collideWithTilemap(true, player);
      collideWithTilemap(true, enemies);
      game.physics.arcade.collide(enemies, enemies);
      game.physics.arcade.collide(enemies, enemies);

      if (enemies.countLiving() == 0) {
        for (var i = 0; i < this.MAX_ENEMIES; i++) {
          this.createEnemy_1(game.rnd.integerInRange(0, 1100), 700);
        }
      }

        if (stuff_blocks.countLiving() == 0) {
          for (var i = 0; i < this.MAX_STUFF_BLOCKS; i++) {
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

      if(game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        player.body.velocity.x = -200;

        if (player.facing != 'left')
        {
            player.scale.x = 1;
            player.animations.play('walk');
            player.facing = 'left';
        }
      } else if(game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        player.body.velocity.x = 200;

        if (player.facing != 'right')
        {
            player.scale.x = -1;
            player.animations.play('walk');
            player.facing = 'right';
        }
      } else {
        player.body.velocity.x = 0;

        if (player.facing != 'idle')
        {
            player.animations.stop();

            if (player.facing == 'left')
            {
                if(player.holding == 'pistol') {
                  player.scale.x = 1;
                  player.animations.stop();
                  player.frame = 10;
                } else {
                  player.scale.x = 1;
                  player.animations.stop(null, true);
                }
            }
            else
            {
                if(player.holding == 'pistol') {
                  player.scale.x = -1;
                  player.animations.stop();
                  player.frame = 10;
                } else {
                  player.scale.x = -1;
                  player.animations.stop(null, true);
                }
            }

            player.facing = player.facing;
        }
      }

      // If the player is touching the ground, let him have 2 jumps
      if (player.body.onFloor()) {
          this.jumps = 2;
          this.jumping = false;
      }

      // Jump!
      if (this.jumps > 0 && this.spacebarInputIsActive([5])) {
          player.body.velocity.y = -1000;
          enemies.forEachAlive(function(enm){
            enm.enemyMoves = false;
            if(enm.health > 0) {
              enm.body.velocity.x = 0;
              enm.body.velocity.y = 0;
            }
          });
          this.jumping = true;
      }

      // Reduce the number of available jumps if the jump input is released
      if (this.jumping && this.spacebarInputReleased()) {
          this.jumps--;
          this.jumping = false;
      }

      if(sprintButton.isDown) {
        if(game.input.keyboard.isDown(Phaser.Keyboard.A) || game.input.keyboard.isDown(Phaser.Keyboard.D)) {
          if (player.facing == 'left')
          {
              player.scale.x = 1;
              player.body.velocity.x = -500;
              player.animations.play('sprint');
          }
          else
          {
              player.scale.x = -1;
              player.body.velocity.x = 500;
              player.animations.play('sprint');
          }
        }

      }

      if(punchButton.isDown) {
        if(player.holding == 'pistol') {
          if(player.facing == 'left') {
            player.bullet.fireAngle = Phaser.ANGLE_LEFT;
          } else {
            player.bullet.fireAngle = Phaser.ANGLE_RIGHT;
          }
          if(game.time.now - player.timeCheck > 1000) {
            player.bullet.fire();
            player.timeCheck = game.time.now;
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
