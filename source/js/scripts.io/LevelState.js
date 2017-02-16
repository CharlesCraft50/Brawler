var player;
var enemies_1;
var enemiesAlive = 0;
var punched = false;
var world;
var punchedCount = 0;
var counter = 0;
var run = false;
var punch = false;
var wave = 1;
var healthFull;
var standing_up = false;
var spriterLoader, spriterFile, spriterData;
var enemies_players;

var Level1 = function(game) {
  this.MAX_ENEMIES = 1;
  this.MAX_STUFF_BLOCKS = 3;
  this.GRAVITY = 2000;
  this.ENEMIES_COUNTER = 0;
  this.jumps = 0;
};

    Level1.prototype.init = function() {
        game.time.advancedTiming = true;
        game.stage.backgroundColor = '#fff';
        game.time.advancedTiming = true;
    };

    Level1.prototype.preload = function() {

    };

    Level1.prototype.create = function() {
    socket = io.connect()

    game.physics.startSystem(Phaser.Physics.ARCADE);

    tilemap();

    HUDisplay();
    spawnPoint = game.add.group();

    map.createFromObjects('objects', 22, 'spawnPoint', 0, true, false, spawnPoint);

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
    player = game.add.sprite(sp.body.x+30, sp.body.y-100, 'stickman_box');
    });

    game.physics.enable(player, Phaser.Physics.ARCADE);
    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);

    spriterLoader = new Spriter.Loader();
    spriterFile = new Spriter.SpriterJSON(this.cache.getJSON("stickman_animations"), { imageNameType: Spriter.eImageNameType.NAME_ONLY });
    spriterData = spriterLoader.load(spriterFile);

    player.bodyAnimation = new Spriter.SpriterGroup(game, spriterData, "stickman_1", "Player", 0, 200);

    game.world.add(player.bodyAnimation);

    game.physics.arcade.enable(player.bodyAnimation);
    
    player.bodyAnimation.scale.setTo(0.14, 0.14);

    player.body.gravity.y = this.GRAVITY;
    player.body.collideWorldBounds = true;
    game.physics.arcade.checkCollision.bottom = false;
    game.physics.arcade.checkCollision.top = false;


    jumping = false;
    player.doubleTapped = false;
    player.punching = false;
    player.punch_damage = 1;
    player.facing = 'idle';
    player.holding = 'nothing';
    player.counter = 0;
    player.randomNumber = 0;
    player.animCounter = 0;
    player.fallCounter = 0;
    player.fallDoneCounter = 0;
    player.crouchIdleCounter = 0;
    player.alive = true;
    player.anchor.setTo(0.5, 0.5);
    player.timeCheck = game.time.now;
    player.timeCheckBreathing = game.time.now;
    player.timeCheckPunching = game.time.now;
    player.timeCheckPunched = game.time.now;
    player.timeCheckCrouch = game.time.now;
    player.AnimationUpdate = false;
    player.weaponTime = false;
    player.crouching = false;
    player.weapon = false;
    player.upsidedown = false;


    enemies = this.game.add.group();
    enemies_players = [];
    stuff_blocks = this.game.add.group();
    weapons = this.game.add.group();
    power_ups = this.game.add.group();

    buttonsExecute();
    cursors = game.vjoy.cursors;

    game.world.bringToTop(weapons);
    game.world.bringToTop(stuff_blocks);
    game.world.bringToTop(player);
    game.world.bringToTop(enemies);
    game.world.bringToTop(enemies_players);
    game.world.bringToTop(spawnPoint);

    setEventHandlers();
    };

    var setEventHandlers = function () {
    // Socket connection successful
    socket.on('connect', onSocketConnected);

    // Socket disconnection
    socket.on('disconnect', onSocketDisconnect);

    // New player message received
    socket.on('new player', onNewPlayer);

    // Player move message received
    socket.on('move player', onMovePlayer);

    // Player removed message received
    socket.on('remove player', onRemovePlayer);
    };

// Socket connected
function onSocketConnected () {
  console.log('Connected to socket server');

  // Reset enemies on reconnect
  enemies_players.forEach(function (enemy) {
    enemy.player.kill();
  })
  enemies_players = [];

  // Send local player data to the game server
  socket.emit('new player', { x: player.x, y: player.y, facing: player.facing, punching: player.punching, crouching: player.crouching });
}

// Socket disconnected
function onSocketDisconnect () {
  console.log('Disconnected from socket server');
}

// New player
function onNewPlayer (data) {
  console.log('New player connected:', data.id);
  console.log(data);

  // Avoid possible duplicate players
  var duplicate = playerById(data.id);
  if (duplicate) {
    console.log('Duplicate player!');
    return;
  }

  // Add new player to the remote players array
  enemies_players.push(new RemotePlayer(data.id, game, player, data.x, data.y, data.facing, data.punching, data.crouching, spriterData));
}

// Move player
function onMovePlayer (data) {
  var movePlayer = playerById(data.id);

  // Player not found
  if (!movePlayer) {
    console.log('Player not found: ', data.id);
    return;
  }

  // Update player position
  movePlayer.player.x = data.x;
  movePlayer.player.y = data.y;
  movePlayer.player.facing = data.facing;
  movePlayer.player.punching = data.punching;
  movePlayer.player.crouching = data.crouching;
}

// Remove player
function onRemovePlayer (data) {
  var removePlayer = playerById(data.id);

  // Player not found
  if (!removePlayer) {
    console.log('Player not found: ', data.id);
    return;
  }

  removePlayer.player.kill();

  // Remove player from array
  enemies_players.splice(enemies_players.indexOf(removePlayer), 1);
}

    Level1.prototype.update = function() {
      for (var i = 0; i < enemies_players.length; i++) {
      if (enemies_players[i].alive) {
        enemies_players[i].update();
        game.physics.arcade.overlap(player, enemies_players[i].player);
      }
      }

      player.bodyAnimation.position.setTo(player.body.x+15, player.body.y+40);
      collideWithTilemap(true, player);
      if(player.AnimationUpdate == true) {
       player.bodyAnimation.updateAnimation();
      } else if(player.AnimationUpdate == null) { 

      } else {
        player.bodyAnimation.updateAnimation();
        player.bodyAnimation.setAnimationSpeedPercent(100);
        if(game.time.now - player.timeCheckBreathing >= 1000 && player.doubleTapped == false) {
          if(player.holding != 'nothing' && player.holding != 'powers') {
            player.bodyAnimation.playAnimationByName('idle_hold');
          } else {
            player.bodyAnimation.playAnimationByName('idle');
          }
          player.timeCheckBreathing = game.time.now;
        }
      }

      /*if(enemies.countLiving() == 0) {

        if(this.ENEMIES_COUNTER == 0) {
          this.MAX_ENEMIES += 1;
          this.ENEMIES_COUNTER++;
        } else {
          this.ENEMIES_COUNTER = 0;
        }

        for(var i = 0; i < this.MAX_ENEMIES; i++) {
            this.createEnemy_1(game.rnd.integerInRange(0, 1100), 700);
        }
      }*/

        if(stuff_blocks.countLiving() == 0) {
          for(var i = 0; i < this.MAX_STUFF_BLOCKS; i++) {
            this.createStuff_Block(game.rnd.integerInRange(10, 1100), 0);
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
        //Left
        player.bodyAnimation.scale.setTo(-0.14, 0.14);
        player.body.velocity.x = -200;
        

        if(player.facing != 'left' && player.crouching != true) {
            
            if(player.holding != 'nothing' && player.holding != 'powers') {
              player.bodyAnimation.setAnimationSpeedPercent(100);
              if(player.animCounter == 0) {
                player.bodyAnimation.playAnimationByName('walk_hold');
                player.AnimationUpdate = true;
                player.animCounter++;
              }
            } else {
            player.bodyAnimation.setAnimationSpeedPercent(100);
             if(player.animCounter == 0) {
                player.bodyAnimation.playAnimationByName('walk');
                player.AnimationUpdate = true;
                player.animCounter++;
              }
            }
            player.facing = 'left';
        }
        //break;
      } else if(cursors.right) {
        //Right
        player.bodyAnimation.scale.setTo(0.14, 0.14);
        player.body.velocity.x = 200;
        
        if(player.facing != 'right' && player.crouching != true) {
            
            if(player.holding != 'nothing' && player.holding != 'powers') {
              player.bodyAnimation.setAnimationSpeedPercent(100);
              if(player.animCounter == 0) {
                player.bodyAnimation.playAnimationByName('walk_hold');
                player.AnimationUpdate = true;
                player.animCounter++;
              }
            } else {
            player.bodyAnimation.setAnimationSpeedPercent(100);
             if(player.animCounter == 0) {
                player.bodyAnimation.playAnimationByName('walk');
                player.AnimationUpdate = true;
                player.animCounter++;
              }
            }
            player.facing = 'right';
        }
        //break;
      } else {
        player.body.velocity.x = 0;
        player.animCounter = 0;
        player.AnimationUpdate = false;
        

        if(player.facing != 'idle' && player.crouching != true) {

            if(player.facing == 'left') {
                if(player.holding != 'nothing' && player.holding != 'powers') {
                  player.bodyAnimation.scale.setTo(-0.14, 0.14);
                  player.bodyAnimation.setAnimationSpeedPercent(100);
                  
                  player.AnimationUpdate = false;

                  if(jumping == true) {
                  player.bodyAnimation.setAnimationSpeedPercent(100);
                  if(player.animCounter == 0) {
                    player.bodyAnimation.playAnimationByName('jump_loop_hold');
                    player.AnimationUpdate = true;
                    player.animCounter++;
                  }
                  }

                } else {
                  //Jump animation:
                  if(jumping == true) {
                  player.bodyAnimation.setAnimationSpeedPercent(100);
                  if(player.animCounter == 0) {
                    player.bodyAnimation.playAnimationByName('jump_loop');
                    player.AnimationUpdate = true;
                    player.animCounter++;
                  }
                  player.bodyAnimation.scale.setTo(-0.14, 0.14);
                  //break;
                  } else {
                  //Player idle left
                  player.bodyAnimation.scale.setTo(-0.14, 0.14);
                  //break;
                  }
                }
            } else {
                if(player.holding != 'nothing' && player.holding != 'powers') {
                  player.bodyAnimation.scale.setTo(0.14, 0.14);
                  player.bodyAnimation.setAnimationSpeedPercent(100);
                  
                  player.AnimationUpdate = false;

                  if(jumping == true) {
                  player.bodyAnimation.setAnimationSpeedPercent(100);
                  if(player.animCounter == 0) {
                    player.bodyAnimation.playAnimationByName('jump_loop_hold');
                    player.AnimationUpdate = true;
                    player.animCounter++;
                  }
                  }
                 
                } else {
                  //Jump animation:
                  if(jumping == true) {
                  player.bodyAnimation.setAnimationSpeedPercent(100);
                  if(player.animCounter == 0) {
                    player.bodyAnimation.playAnimationByName('jump_loop');
                    player.AnimationUpdate = true;
                    player.animCounter++;
                  }

                  player.bodyAnimation.scale.setTo(0.14, 0.14);
                  //break;
                  } else {
                  //Player idle left
                  player.bodyAnimation.scale.setTo(0.14, 0.14);
                  //break;
                  }                
                }
            }

            player.facing = player.facing;
        }
      }

      if(standing_up == false) {
      if(player.crouching == true) {
          player.body.velocity.x = 0;
          if(game.time.now - player.timeCheckCrouch >= 1000) {
          player.bodyAnimation.playAnimationByName('crouch_idle');
          player.AnimationUpdate = true;
          player.timeCheckCrouch = game.time.now;
        }
      }
      } else {
        if(player.crouching == true) {
        player.body.velocity.x = 0;
        }
      }

      if(player.doubleTapped == true) {
        player.body.velocity.x = 0;
      }

      if(player.body.onFloor() && jumping == true) {
          this.jumps = 0;
          jumping = false;
          cursors.up = false;
          if(player.holding != 'nothing' && player.holding != 'powers') {
            player.bodyAnimation.playAnimationByName('walk_hold');
          } else {
            player.bodyAnimation.playAnimationByName('walk');
          }
      }

      if(player.body.onFloor()) {
        player.fallCounter = 0;
        if(player.fallDoneCounter == 0) {
          player.bodyAnimation.setAnimationSpeedPercent(100);
            if(player.holding != 'nothing' && player.holding != 'powers') {
            player.bodyAnimation.playAnimationByName('walk_hold');
          } else {
            player.bodyAnimation.playAnimationByName('walk');
          }
            player.AnimationUpdate = true;
            player.fallDoneCounter++;
        }
      } else {
        player.fallDoneCounter = 0;
        player.bodyAnimation.setAnimationSpeedPercent(300);
        if(player.fallCounter == 0) {
          if(player.holding != 'nothing' && player.holding != 'powers') {
            player.bodyAnimation.playAnimationByName('jump_loop_hold');
          } else {
            player.bodyAnimation.playAnimationByName('jump_loop');
          }
            player.AnimationUpdate = true;
            player.fallCounter++;
        }
      }

      if(cursors.up && this.jumps < 5) {
        if(player.crouching != true && player.doubleTapped == false) {
          player.bodyAnimation.setAnimationSpeedPercent(200);
         
          if(player.animCounter == 0) {
            player.bodyAnimation.playAnimationByName('jump_start');
            player.AnimationUpdate = true;
            player.animCounter++;
          }

          player.body.velocity.x = 1;
          player.body.velocity.y = -1000;
          this.jumps++;
          jumping = true;
        }
      }

      

      if(run) {
        if(cursors.right || cursors.left) {
          if(player.crouching != true) {
          if (player.facing == 'left') {
              player.bodyAnimation.scale.setTo(-0.14, 0.14);
              player.body.velocity.x = -500;
          } else {
              player.bodyAnimation.scale.setTo(0.14, 0.14);
              player.body.velocity.x = 500;
          }

         

          if(player.holding != 'nothing' && player.holding != 'powers') {
            player.bodyAnimation.setAnimationSpeedPercent(200);
              if(player.animCounter == 0) {
                player.bodyAnimation.playAnimationByName('walk_hold');
                player.AnimationUpdate = true;
                player.animCounter++;
              }
          } else {
            player.bodyAnimation.setAnimationSpeedPercent(200);
            if(player.animCounter == 0) {
              player.bodyAnimation.playAnimationByName('walk');
              player.AnimationUpdate = true;
              player.animCounter++;
            }
          }
          }
        }

      }

      if(punch && player.crouching != true) {
        if(player.holding != 'nothing' && player.holding != 'powers') {
          if(player.facing == 'left') {
            player.bullet.fireAngle = Phaser.ANGLE_LEFT;
          } else {
            player.bullet.fireAngle = Phaser.ANGLE_RIGHT;
          }
          if(player.weaponTime != false) {
            if(game.time.now - player.timeCheck >= player.weaponTime) {
              player.bullet.fire();
              if(player.weapon.alive == true) {
              player.weapon.frame = 1;
              setTimeout(function(){player.weapon.frame = 0;}, 500);
              }
              player.timeCheck = game.time.now;
            }
          }
        } else {
          game.physics.arcade.collide(player, weapons, function(player, weapon){weapon.destroy(); weapon.alive = false;});
          if(punched == false) {
            if(player.facing == 'left') {
              player.bodyAnimation.scale.setTo(-0.14, 0.14);
            } else {
              player.bodyAnimation.scale.setTo(0.14, 0.14);
            }
            if(player.facing == 'left') {
              player.body.velocity.x = -1;  
            } else {
              player.body.velocity.x = 1;
            }
            
            player.bodyAnimation.setAnimationSpeedPercent(200);
            player.AnimationUpdate = true;
            

            if(game.time.now - player.timeCheckPunching >= 1000) {
              player.bodyAnimation.playAnimationByName('punch');
              
              player.timeCheckPunching = game.time.now;
            }

            if(game.time.now - player.timeCheckPunched >= 500) {
              player.punching = true;
              
              player.timeCheckPunched = game.time.now;
            } else {
              player.punching = false;
            }
                
          } else {
              punched = false;
          }
        }

      } else {
        player.punching = false;
      }
    }

    if(game.input.keyboard.isDown(Phaser.Keyboard.S)) {
      game.physics.arcade.collide(player, enemies, function(p, e){
        e.alive = false;
        e.destroy();
        e.healthBar.destroy();
        e.holding = 'nothing';
      });
    }

    socket.emit('move player', { x: player.x, y: player.y, facing: player.facing });
    };

    Level1.prototype.render = function() {
      game.debug.body(player);
      enemies.forEachAlive(function(e){
        game.debug.body(e);
      });
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
