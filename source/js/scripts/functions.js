function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}



function getPowDistance(fromX, fromY, toX, toY){
	var a = Math.abs(fromX - toX);
	var b = Math.abs(fromY - toY);
	return (a * a) + (b * b);
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
}

collideWithTilemap = function(all, obj, layer) {
  if(all == true) {
    game.physics.arcade.collide(obj, world);
    game.physics.arcade.collide(obj, world_tiles_1);
    game.physics.arcade.collide(obj, world_tiles_2);
    game.physics.arcade.collide(obj, world_tiles_3);
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

var tilemap = function() {
  world = game.add.tilemap('world');

    world.addTilesetImage('tileset');
    world.setCollision(1);
    world.setCollision(9);
    world.setTileIndexCallback(9, function(w, s){player.body.y -= 10;}, this);

    world_tiles_1 = world.createLayer('tiles_1');
    world_tiles_2 = world.createLayer('tiles_2');
    world_tiles_3 = world.createLayer('tiles_3');
    
    world_tiles_1.resizeWorld();
    world_tiles_2.resizeWorld();
    world_tiles_3.resizeWorld();
};

var buttonsExecute = function() {
  left_button = game.add.button(10, 400, 'arrow_button', null, this, 0, 1, 0, 1);
  left_button.fixedToCamera = true;
  left_button.events.onInputOver.add(function(){goto_left=true;});
  left_button.events.onInputOut.add(function(){goto_left=false;});
  left_button.events.onInputDown.add(function(){goto_left=true;});
  left_button.events.onInputUp.add(function(){goto_left=false;});

  right_button = game.add.button(300, 400, 'arrow_button', null, this, 0, 1, 0, 1);
  right_button.fixedToCamera = true;
  right_button.events.onInputOver.add(function(){goto_right=true;});
  right_button.events.onInputOut.add(function(){goto_right=false;});
  right_button.events.onInputDown.add(function(){goto_right=true;});
  right_button.events.onInputUp.add(function(){goto_right=false;});
  right_button.scale.x = -1;

  run_button = game.add.button(1090, 400, 'run_button', null, this, 0, 1, 0, 1);
  run_button.fixedToCamera = true;
  run_button.events.onInputOver.add(function(){run=true;});
  run_button.events.onInputOut.add(function(){run=false;});
  run_button.events.onInputDown.add(function(){run=true;});
  run_button.events.onInputUp.add(function(){run=false;});
  run_button.scale.x = -1;

  jump_button = game.add.button(980, 400, 'jump_button', null, this, 0, 1, 0, 1);
  jump_button.fixedToCamera = true;
  jump_button.events.onInputOver.add(function(){jump=true;});
  jump_button.events.onInputOut.add(function(){jump=false;});
  jump_button.events.onInputDown.add(function(){jump=true;});
  jump_button.events.onInputUp.add(function(){jump=false;});
  jump_button.scale.x = -1;

  punch_button = game.add.button(1090, 300, 'punch_button', null, this, 0, 1, 0, 1);
  punch_button.fixedToCamera = true;
  punch_button.events.onInputOver.add(function(){punch=true;});
  punch_button.events.onInputOut.add(function(){punch=false;});
  punch_button.events.onInputDown.add(function(){punch=true;});
  punch_button.events.onInputUp.add(function(){punch=false;});
  punch_button.scale.x = -1;
};
