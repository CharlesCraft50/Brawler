function gofull() {
  if (game.scale.isFullScreen) {
    game.scale.stopFullScreen();
  } else {
    game.scale.startFullScreen(false);
  }
}

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
		healthBar_Border = game.add.sprite(0, 0, 'healthBar_Border');
		healthBar_Border.fixedToCamera = true;
		healthBar_Red = game.add.sprite(0, 1, 'healthBar_Red');
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

function logOut() {
  window.location = "?action=logOut";
}

function gameOver() {
  healthBar_Red.cameraOffset.x = -225;
  player.kill();
  startGame();
  player.alive = false;
  this.jumps = 0;
  jumping = false;
  this.MAX_ENEMIES = 1;
	this.MAX_STUFF_BLOCKS = 3;
	this.GRAVITY = 2000;
	this.ENEMIES_COUNTER = 0;
  enemies.forEachAlive(function(e){
    e.alive = false;
    e.destroy();
    e.healthBar.destroy();
    e.holding = 'nothing';
  });
}

collideWithTilemap = function(all, obj, layer) {
  if(all == true) {
    game.physics.arcade.collide(obj, world);
    game.physics.arcade.collide(obj, map_tiles_1);
    game.physics.arcade.collide(obj, map_tiles_2);
    game.physics.arcade.collide(obj, map_tiles_3);
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
    console.log(1);

};

var tilemap = function() {
    map = game.add.tilemap('map');

    map.addTilesetImage('tileset');
    map.setCollision(1);
    map.setCollision(9);
    map.setTileIndexCallback(9, function(w, s){player.body.y -= 10;}, this);

    map_tiles_1 = map.createLayer('tiles_1');
    map_tiles_2 = map.createLayer('tiles_2');
    map_tiles_3 = map.createLayer('tiles_3');

    map_tiles_1.renderSettings.enableScrollDelta = true;
    map_tiles_2.renderSettings.enableScrollDelta = true;
    map_tiles_3.renderSettings.enableScrollDelta = true;

    map_tiles_1.resizeWorld();
    map_tiles_2.resizeWorld();
    map_tiles_3.resizeWorld();

    map.forEach(function(tile){
      if (tile.index === 1) {
        tile.collideDown = false;
      }
    }, game, 0, 0, map.width, map.height, map_tiles_1);
};

var buttonsExecute = function() {
  run_button = game.add.button(990, 500, 'run_button', null, this, 0, 1, 0, 1);
  run_button.fixedToCamera = true;
  run_button.fixedToCamera = true;
  run_button.events.onInputOver.add(function(){run=true;});
  run_button.events.onInputOut.add(function(){run=false;});
  run_button.events.onInputDown.add(function(){run=true;});
  run_button.events.onInputUp.add(function(){run=false;});
  run_button.scale.x = -1;

  punch_button = game.add.button(990, 400, 'punch_button', null, this, 0, 1, 0, 1);
  punch_button.fixedToCamera = true;
  punch_button.events.onInputOver.add(function(){punch=true;});
  punch_button.events.onInputOut.add(function(){punch=false;});
  punch_button.events.onInputDown.add(function(){punch=true;});
  punch_button.events.onInputUp.add(function(){punch=false;});
  punch_button.scale.x = -1;

  game.input.onTap.add(function(pointer, doubleTap){
      if(doubleTap && jumping == false) {
        if(player.holding == 'nothing') {
        if(player.crouching != true) {
        if(player.facing == 'left') {
            player.scale.x = -1;
        } else {
            player.scale.x = 1;
        }
        player.doubleTapped = true;
        setTimeout(function(){player.crouching = true;}, 800);
        player.bodyAnimation.setAnimationSpeedPercent(100);
        player.bodyAnimation.playAnimationByName('crouch_down');   
        player.AnimationUpdate = true;

        player.body.velocity.x = 0;
        } else {
        if(player.facing == 'left') {
          player.scale.x = -1;
        } else {
          player.scale.x = 1;
        }
        
        standing_up = true;
        setTimeout(function(){player.crouching = false; player.doubleTapped = false; standing_up = false;}, 500);
        player.bodyAnimation.setAnimationSpeedPercent(100);
        player.bodyAnimation.playAnimationByName('stand_up');
        player.AnimationUpdate = true;
        }
        }
      }
  }, this);

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

function playerById (id) {
  for (var i = 0; i < enemies_players.length; i++) {
    if (enemies_players[i].player.name === id) {
      return enemies_players[i];
    }
  }

  return false;
}