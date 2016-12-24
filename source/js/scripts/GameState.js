var game = new Phaser.Game(1100, 550, Phaser.AUTO);

var player;
var world;

var GameState = function(game) {
};

    GameState.prototype.init = function() {
        game.time.advancedTiming = true;
        game.stage.backgroundColor = '#fff';
    };

    GameState.prototype.preload = function() {

    };

    GameState.prototype.create = function() {
      game.physics.startSystem(Phaser.Physics.P2JS);
      game.physics.p2.setImpactEvents(true);
      game.physics.p2.gravity.y = 550;

      playerCollisionGroup = game.physics.p2.createCollisionGroup();

      game.physics.p2.updateBoundsCollisionGroup();

      world = game.add.tilemap('world');

      world.addTilesetImage('tileset');

      world_tiles_1 = world.createLayer('tiles_1');
      world_tiles_1.resizeWorld();
      world_tiles_2 = world.createLayer('tiles_2');
      world_tiles_2.resizeWorld();

      world.setCollision(1);

      game.physics.p2.convertTilemap(world, world_tiles_1);
      game.physics.p2.convertTilemap(world, world_tiles_2);

      HUDisplay();

      player = game.add.sprite(200, 550, 'stickman_1', 'walk/left_1');
      game.physics.p2.enable(player);
      game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);
      player.animations.add('left', Phaser.Animation.generateFrameNames('walk/left_', 1, 8), 10, true);
      player.animations.add('right', Phaser.Animation.generateFrameNames('walk/right_', 1, 8), 10, true);
      player.animations.add('sprint_left', Phaser.Animation.generateFrameNames('walk/left_', 1, 8), 20, true);
      player.animations.add('sprint_right', Phaser.Animation.generateFrameNames('walk/right_', 1, 8), 20, true);
      player.animations.add('punch_1_left', Phaser.Animation.generateFrameNames('punch_1/left_', 3, 3), 5, true);
      player.animations.add('punch_1_right', Phaser.Animation.generateFrameNames('punch_1/right_', 3, 3), 5, true);

      player.checkWorldBounds = true;
      player.body.collideWorldBounds = true;

      player.body.fixedRotation = true;
      player.body.damping = 0.5;

      game.physics.p2.setBoundsToWorld(true, true, true, true, false);


      cursors = game.input.keyboard.createCursorKeys();
      jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      sprintButton = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
      punchButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
    };

    GameState.prototype.update = function() {
      if(healthBar_Red.cameraOffset.x < -230) {
        if(counter == 0){gameOver();}
      }

      if(healthBar_Red.cameraOffset.x == 0 || healthBar_Red.cameraOffset.x > 0) {
        healthFull = true;
      } else {
        healthFull = false;
      }

        if(playerDied == true) {

        }

        if (cursors.left.isDown)
        {
          player.body.moveLeft(200);

          if (facing != 'left')
          {
              player.animations.play('left');
              facing = 'left';
          }
        }
    else if (cursors.right.isDown)
    {
        player.body.moveRight(200);

        if (facing != 'right')
        {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else
    {
        player.body.velocity.x = 0;

        if (facing != 'idle')
        {
            player.animations.stop();

            if (facing == 'left')
            {
                player.frame = -14;
                player.animations.stop(null, true);
            }
            else
            {
                player.frame = 15;
                player.animations.stop(null, true);
            }

            facing = facing;
        }
    }

    if(sprintButton.isDown) {
      if(cursors.left.isDown || cursors.right.isDown) {
        if (facing == 'left')
        {
            player.body.moveLeft(500);
            player.animations.play('sprint_left');
        }
        else
        {
            player.body.moveRight(500);
            player.animations.play('sprint_right');
        }
      }

    }

    if(punchButton.isDown) {
      if(punched == false) {
        if(facing == 'left') {
          player.animations.play('punch_1_left');
        } else {
          player.animations.play('punch_1_right');
        }
        setTimeout(function() {if(facing == 'left') {player.animations.play('sprint_left');} else {player.animations.play('sprint_right');}}, 100);
        setTimeout(function(){punched = true;}, 1000);
      } else {
        punched = false;
      }
    }
    };

    GameState.prototype.render = function() {

    };
