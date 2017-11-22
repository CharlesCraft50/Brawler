function gofull() {
  if (game.scale.isFullScreen) {
    game.scale.stopFullScreen();
  } else {
    game.scale.startFullScreen(false);
  }
}

function resetSprite(sprite) {
    sprite.x = game.world.bounds.right;
}

function massCameraCull(type, obj) {
    if(type == 'sprite') {
      obj.autoCull = true;
      obj.checkWorldBounds = true;
      obj.events.onOutOfBounds.add(resetSprite, this);
    } else if(type == 'group') {
      obj.forEachAlive(function(t){
        t.autoCull = true,
        t.checkWorldBounds = true,
        t.events.onOutOfBounds.add(resetSprite, this);
      });
    } else {
      throw new Error('massCameraCull: Type not exist!');
    }
}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}

function getPowDistance(x, y, fromX, fromY, toX, toY){
  if(x == true && y != true) {
    var a = Math.abs(fromX - toX);
    return (a * a);
  } else if(y == true && x != true) {
    var b = Math.abs(fromY - toY);
    return (b * b);
  } else {
    var a = Math.abs(fromX - toX);
    var b = Math.abs(fromY - toY);
    return (a * a) + (b * b);
  }
}


function chasePlayer(obj, speed, maxtime) {
    if (player.alive) {
      if(maxtime != null) {
          game.physics.arcade.moveToObject(obj, player, speed, maxtime);
      } else {
          game.physics.arcade.moveToObject(obj, player, speed);
      }
    }
}

function HUDisplay() {
    healthBarLevel = localStorage.getItem('healthBarLevel');
    
		healthBar_Border = game.add.sprite(JSON.parse(healthBarLevel).health, 0, 'healthBar_Border');
		healthBar_Border.fixedToCamera = true;
		healthBar_Red = game.add.sprite(JSON.parse(healthBarLevel).health, 1, 'healthBar_Red');
		healthBar_Red.fixedToCamera = true;
		game.physics.arcade.enable(healthBar_Red);
}

function playerSubtractHealthBar(value, who) {
  if(who != null) {
    if(value != null) {
    healthBar_Red.cameraOffset.x -= value;
    whoKilled = who;
    } else {
    console.log("playerSubtractHealthBar(): Undefined value");
    }
  } else {
    if(value != null) {
    healthBar_Red.cameraOffset.x -= value;
    } else {
    console.log("playerSubtractHealthBar(): Undefined value");
    }
  }
}

function playerAddHealthBar(value) {
    if(value != null) {
      if(healthFull != true) {
        healthBar_Red.cameraOffset.x += value;
      }
    } else {
    console.log("playerSubtractHealthBar(): Undefined value");
    }
}

function restartGame() {
  score = 0;
  game.state.start('GameState');
}

function gameOver() {
  if(player.deathStartCounter == 0) {
    player.bodyAnimation.playAnimationByName('death_start');
    vjoyAlive = false;
    player.dead = true;
    player.body.immovable = true;
    player.animCounter = 0;
    player.body.velocity.x = 0;
  }

  if(player.deathCounter == 0) {

    setTimeout(function(){
      if(player.animCounter == 0) {
        healthBar_Red.cameraOffset.x = -225;
        player.jumping = false;
        player.weapon.destroy();
        player.scale.setTo(1, 0.750);
        player.bodyAnimation.setAnimationSpeedPercent(200);
        player.bodyAnimation.playAnimationByName('death_start');
        player.AnimationUpdate = true;
        player.animCounter++;
        player.deathStartCounter++;
        player.bodyAnimation.onFinish.add(function() {
          gameOverText = game.add.bitmapText(game.world.centerX-400, game.world.centerY-100, 'BatmanForeverOutline', 'Game Over', 100);
          game.add.tween(gameOverText).to({alpha:1}, 1000, Phaser.Easing.Quadratic.In, true);
          game.add.tween(gameOverText).to({alpha:0}, 2500, Phaser.Easing.Quadratic.Out, true);
          setTimeout(function(){
          restart_button = game.add.button(game.world.centerX-200, game.world.centerY-100, 'restartButton', null, this);
          restart_button.fixedToCamera = true;
          restart_button.events.onInputOver.add(function(){
            MAX_ENEMIES = 1;
            MAX_STUFF_BLOCKS = 3;
            ENEMIES_COUNTER = 0;
            MAX_NPC = 5;
		        vjoyAlive = true;
    	      player.dead = false;
    	      player.body.immovable = false;
            setTimeout(function(){
              game.state.start('RestartState');
            }, 100);
          });
          }, 3000);
        }, this);
        }
    }, 10);
    
  }
  
}

collideWithTilemap = function(all, obj, layer) {
  if(all == true) {
    game.physics.arcade.collide(obj, world);
    game.physics.arcade.collide(obj, map_tiles_1);
    game.physics.arcade.collide(obj, map_tiles_2);
    game.physics.arcade.collide(obj, map_tiles_3);
    game.physics.arcade.collide(obj, map_tiles_4);
  } else {
    game.physics.arcade.collide(obj, layer);
  }
};

moveToObjectAdvance = function (displayObject, destination, speed, maxTime, x, y) {

    if (speed === undefined) { speed = 60; }
    if (maxTime === undefined) { maxTime = 0; }

    var angle = Math.atan2(destination.y - displayObject.y, destination.x - displayObject.x);

    if (maxTime > 0)
    {
        //  We know how many pixels we need to move, but how fast?
        speed = this.distanceBetween(displayObject, destination) / (maxTime / 1000);
    }

    if(x == false) {
      displayObject.body.velocity.y = Math.sin(angle) * speed;
    } else if(y == false) {
      displayObject.body.velocity.x = Math.cos(angle) * speed;
    } else {
      displayObject.body.velocity.y = Math.sin(angle) * speed;
      displayObject.body.velocity.x = Math.cos(angle) * speed;
    }

    return angle;
};

/*
var Torch = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'transparent');

    // Set the pivot point for this sprite to the center
    this.anchor.setTo(0.5, 0.5);

    // Add a child image that is the glow of the torchlight
    this.glow = this.game.add.image(x, y, 'light_white');
    this.glow.anchor.setTo(0.5, 0.5);

    // Set the blendmode of the glow to ADD. This blendmode
    // has the effect of adding the color of the glow to anything
    // underneath it, brightening it.
    this.glow.blendMode = Phaser.blendModes.ADD;

    // Set the transparency to a low value so decrease the brightness
    this.glow.alpha = 0.5;
};

// Torches are a type of Phaser.Sprite
Torch.prototype = Object.create(Phaser.Sprite.prototype);
Torch.prototype.constructor = Torch;

Torch.prototype.update = function() {
    // Move the glow of this torch to wherever the torch is
    this.glow.x = this.x;
    this.glow.y = this.y;

    // Randomly change the width and height of the glow to simulate flickering
    var size = this.game.rnd.realInRange(0.9, 1.0);
    this.glow.scale.setTo(size, size); // x, y scaling
};*/

var streetLightBeam = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'transparent');

    // Set the pivot point for this sprite to the center
    this.anchor.setTo(0.5, 0.5);

    // Add a child image that is the glow of the torchlight
    this.glow = this.game.add.image(x, y, 'streetLightBeam');
    this.glow.anchor.setTo(0.5, 0.5);

    // Set the blendmode of the glow to ADD. This blendmode
    // has the effect of adding the color of the glow to anything
    // underneath it, brightening it.
    this.glow.blendMode = Phaser.blendModes.ADD;

    // Set the transparency to a low value so decrease the brightness
    this.glow.alpha = 0.5;
};

// Torches are a type of Phaser.Sprite
streetLightBeam.prototype = Object.create(Phaser.Sprite.prototype);
streetLightBeam.prototype.constructor = streetLightBeam;

streetLightBeam.prototype.update = function() {
    //* Move the glow of this torch to wherever the torch is
    this.glow.x = this.x;
    this.glow.y = this.y;

    // Randomly change the width and height of the glow to simulate flickering
    var size = this.game.rnd.realInRange(0.970, 1.0);
    this.glow.scale.setTo(size, size); // x, y scaling*/
};

var tilemap = function() {
    map = game.add.tilemap('map');

    map.addTilesetImage('tileset');
    map.addTilesetImage('shadows');
    map.setCollision(1);
    map.setCollision(9);
    map.setTileIndexCallback(9, function(w, s){player.body.y -= 10;}, this);

    map_tiles_1 = map.createLayer('tiles_1');
    map_tiles_2 = map.createLayer('tiles_2');
    map_tiles_3 = map.createLayer('tiles_3');
    map_tiles_4 = map.createLayer('tiles_4');
    map_shadow_1 = map.createLayer('shadow_1');

    map_tiles_1.renderSettings.enableScrollDelta = false;
    map_tiles_2.renderSettings.enableScrollDelta = false;
    map_tiles_3.renderSettings.enableScrollDelta = false;
    map_tiles_4.renderSettings.enableScrollDelta = false;
    map_shadow_1.renderSettings.enableScrollDelta = false;

    /*map_tiles_1.resizeWorld();
    map_tiles_2.resizeWorld();
    map_tiles_3.resizeWorld();
    map_tiles_4.resizeWorld();
    map_shadow_1.resizeWorld();*/

    map.createFromObjects('objects', 72, 'streetLightBeam', 0, true, false, streetLightBeam_effect);

    map.forEach(function(tile){
      if (tile.index === 1) {
        tile.collideDown = false;
        tile.collideLeft = false;
        tile.collideRight = false;
      }
    }, game, 0, 0, map.width, map.height, map_tiles_1);

    
  
};

var buttonsExecute = function() {
  run_button = game.add.button(game.width-166, game.height-200, 'run_button', null, this, 0, 1, 0, 1);
  run_button.fixedToCamera = true;
  run_button.events.onInputOver.add(function(){run=true;});
  run_button.events.onInputOut.add(function(){run=false;});
  run_button.events.onInputDown.add(function(){run=true;});
  run_button.events.onInputUp.add(function(){run=false;});

  punch_button = game.add.button(game.width-166, game.height-100, 'punch_button', null, this, 0, 1, 0, 1);
  punch_button.fixedToCamera = true;
  punch_button.events.onInputOver.add(function(){punch=true;});
  punch_button.events.onInputOut.add(function(){punch=false;});
  punch_button.events.onInputDown.add(function(){punch=true;});
  punch_button.events.onInputUp.add(function(){punch=false;});

  mute_button = game.add.button(game.width-200, game.height-550, 'mute_button', null, this);
  mute_button.scale.setTo(0.8, 0.8);
  mute_button.fixedToCamera = true;
  mute_button.events.onInputUp.add(function(){ if(game.sound.mute == false){game.sound.mute=true;mute_button.frame=1;}else{game.sound.mute=false;mute_button.frame=0;} });

  pause_button = game.add.button(game.width-100, game.height-550, 'pause_button', null, this);
  pause_button.scale.setTo(0.8, 0.8);
  pause_button.fixedToCamera = true;
  pause_button.events.onInputUp.add(function(){game.paused=true;pause_button.frame=1;});

  game.input.onDown.add(function(){game.paused=false;pause_button.frame=0;}, self);

  game.vjoy = game.plugins.add(Phaser.Plugin.VJoy);
  game.vjoy.inputEnable();
  game.vjoy.speed = {
  x:500,
  y:500
  };
};

function getRatio(type, w, h) {
        var scaleX = width / w,
            scaleY = height / h,
            result = {
                x: 1,
                y: 1
            };
        switch (type) {
            case 'all':
                result.x = scaleX > scaleY ? scaleY : scaleX;
                result.y = scaleX > scaleY ? scaleY : scaleX;
                break;
            case 'fit':
                result.x = scaleX > scaleY ? scaleX : scaleY;
                result.y = scaleX > scaleY ? scaleX : scaleY;
                break;
            case 'fill':
                result.x = scaleX;
                result.y = scaleY;
                break;
        }
        return result;
}

var audios = function(object) {
  if(object != null) {
    object.sound_effects = {};

    object.sound_effects['punch'] = game.add.audio('punching_sound');

    object.weapons_sounds = {};

    object.weapons_sounds['pistol'] = game.add.audio('pistol_sound');
    object.weapons_sounds['pistol'].onStop.add(function(){object.soundStart = false; object.soundCounter = 0;}, this);
    
    object.weapons_sounds['uzi'] = game.add.audio('uzi_sound');
    object.weapons_sounds['uzi'].onStop.add(function(){object.soundStart = false; object.soundCounter = 0;}, this);
    
    object.weapons_sounds['null_gravity'] = game.add.audio('null_gravity_sound');
    object.weapons_sounds['null_gravity'].onStop.add(function(){object.soundStart = false; object.soundCounter = 0;}, this);
    
    object.weapons_sounds['desert_eagle'] = game.add.audio('desert_eagle_sound');
    object.weapons_sounds['desert_eagle'].onStop.add(function(){object.soundStart = false; object.soundCounter = 0;}, this);
  }
};

