MainPlayer = function (index, game) {
  spawnPoint.forEach(function(sp){
  player = game.add.sprite(sp.body.x+30, sp.body.y, 'stickman_1', 'walk/left_1');
  });
  game.physics.p2.enable(player);
  player.name = index.toString();
  game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);
  player.animations.add('left', Phaser.Animation.generateFrameNames('walk/left_', 1, 8), 10, true);
  player.animations.add('right', Phaser.Animation.generateFrameNames('walk/right_', 1, 8), 10, true);
  player.animations.add('sprint_left', Phaser.Animation.generateFrameNames('walk/left_', 1, 8), 20, true);
  player.animations.add('sprint_right', Phaser.Animation.generateFrameNames('walk/right_', 1, 8), 20, true);

  player.animations.add('punch_1_left_1', Phaser.Animation.generateFrameNames('punch_1/left_', 1, 1), 5, true);
  player.animations.add('punch_1_left_2', Phaser.Animation.generateFrameNames('punch_1/left_', 2, 2), 5, true);
  player.animations.add('punch_1_left_3', Phaser.Animation.generateFrameNames('punch_1/left_', 3, 3), 5, true);
  player.animations.add('punch_1_left_4', Phaser.Animation.generateFrameNames('punch_1/left_', 4, 4), 5, true);

  player.animations.add('punch_1_right_1', Phaser.Animation.generateFrameNames('punch_1/right_', 1, 1), 5, true);
  player.animations.add('punch_1_right_2', Phaser.Animation.generateFrameNames('punch_1/right_', 2, 2), 5, true);
  player.animations.add('punch_1_right_3', Phaser.Animation.generateFrameNames('punch_1/right_', 3, 3), 5, true);
  player.animations.add('punch_1_right_4', Phaser.Animation.generateFrameNames('punch_1/right_', 4, 4), 5, true);

  player.checkWorldBounds = true;
  player.body.collideWorldBounds = true;

  player.body.fixedRotation = true;
  player.body.damping = 0.5;
  player.body.setCollisionGroup(playerCollisionGroup);
  player.body.collides([objectsCollisionGroup, blockCollisionGroup]);
  this.jumping = false;
  player.punchtwospeed = 50;
  player.punchthreespeed = 50;
  player.punchfourspeed = 50;
  player.punch_damage = 1;
  player.facing = 'left';
};

MainPlayer.prototype.update = function () {
  if(game.input.keyboard.isDown(Phaser.Keyboard.A)) {
    player.body.moveLeft(200);

    if (player.facing != 'left')
    {
        player.animations.play('left');
        player.facing = 'left';
    }
  } else if(game.input.keyboard.isDown(Phaser.Keyboard.D)) {
    player.body.moveRight(200);

    if (player.facing != 'right')
    {
        player.animations.play('right');
        player.facing = 'right';
    }
  } else {
    player.body.velocity.x = 0;

    if (player.facing != 'idle')
    {
        player.animations.stop();

        if (player.facing == 'left')
        {
            player.frame = -14;
            player.animations.stop(null, true);
        }
        else
        {
            player.frame = 15;
            player.animations.stop(null, true);
        }

        player.facing = player.facing;
    }
  }

  // If the player is touching the ground, let him have 2 jumps
  if (checkIfCanJump(player)) {
      this.jumps = 1;
      this.jumping = false;
  }

  // Jump!
  if (this.jumps > 0 && spacebarInputIsActive([5]) && game.time.now > jumpTimer) {
      player.body.moveUp(300);
      if(player.facing == 'left') {
        player.animations.play('left');
      } else {
        player.animations.play('right');
      }
      this.jumping = true;
      jumpTimer = game.time.now;
  }

  // Reduce the number of available jumps if the jump input is released
  if (this.jumping && spacebarInputReleased()) {
      this.jumps--;
      this.jumping = false;
  }

  if(sprintButton.isDown) {
    if(game.input.keyboard.isDown(Phaser.Keyboard.A) || game.input.keyboard.isDown(Phaser.Keyboard.D)) {
      if (player.facing == 'left')
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
      if(player.facing == 'left') {
        player.body.moveRight(10);
        if(punchedCount == 0) {
          player.animations.play('punch_1_left_1');
          setTimeout(function(){punchedCount = 1;}, 0);
        } else if(punchedCount == 1) {
          player.animations.play('punch_1_left_2');
          setTimeout(function(){punchedCount = 2;}, player.punchtwospeed);
        } else if(punchedCount == 2) {
          player.animations.play('punch_1_left_3');
          playerPunching = true;
          setTimeout(function(){punchedCount = 3;}, player.punchthreespeed);
        } else if(punchedCount == 3) {
          player.animations.play('punch_1_left_4');
          playerPunching = true;
          setTimeout(function(){punchedCount = 4;}, player.punchfourspeed);
        } else {
          punchedCount = 0;
          playerPunching = false;
        }
      } else {
        player.body.moveLeft(10);
        if(punchedCount == 0) {
          player.animations.play('punch_1_right_1');
          setTimeout(function(){punchedCount = 1;}, 0);
        } else if(punchedCount == 1) {
          player.animations.play('punch_1_right_2');
          setTimeout(function(){punchedCount = 2;}, player.punchtwospeed);
        } else if(punchedCount == 2) {
          player.animations.play('punch_1_right_3');
          playerPunching = true;
          setTimeout(function(){punchedCount = 3;}, player.punchthreespeed);
        } else if(punchedCount == 3) {
          player.animations.play('punch_1_right_4');
          playerPunching = true;
          setTimeout(function(){punchedCount = 4;}, player.punchfourspeed);
        } else {
          punchedCount = 0;
          playerPunching = false;
        }
      }
      setTimeout(function() {if(player.facing == 'left') {player.animations.play('sprint_left');} else {player.animations.play('sprint_right');}}, 100);
      setTimeout(function(){punched = true;}, 1000);
    } else {
        punched = false;
    }
  } else {
    playerPunching = false;
  }
};

function spacebarInputIsActive(duration) {
var isActive = false;

isActive = game.input.keyboard.downDuration(Phaser.Keyboard.SPACEBAR, duration);
isActive |= (this.game.input.activePointer.justPressed(duration + 1000/60) &&
    this.game.input.activePointer.x > this.game.width/4 &&
    this.game.input.activePointer.x < this.game.width/2 + this.game.width/4);

return isActive;
}

function spacebarInputReleased() {
var released = false;

released = game.input.keyboard.upDuration(Phaser.Keyboard.SPACEBAR);
released |= this.game.input.activePointer.justReleased();

return released;
}

var Enemy_1 = function (game, player, health, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'stickman_2');
  this.player = player;
  this.player = player;
  this.alive = true;
  this.HP_enemy = health;
  this.punchedCount = 0;
  this.punch_damage = 0.5;

  this.punching = false;
  this.jumpCount = 0;
  game.physics.p2.enable(this);
  this.body.gravity.y = 1000;
  this.animations.add('left', Phaser.Animation.generateFrameNames('walk/left_', 1, 8), 10, true);
  this.animations.add('right', Phaser.Animation.generateFrameNames('walk/right_', 1, 8), 10, true);
  this.animations.add('sprint_left', Phaser.Animation.generateFrameNames('walk/left_', 1, 8), 20, true);
  this.animations.add('sprint_right', Phaser.Animation.generateFrameNames('walk/right_', 1, 8), 20, true);

  this.animations.add('punch_1_left', Phaser.Animation.generateFrameNames('punch_1/left_', 1, 4), 20, true);

  this.animations.add('punch_1_right', Phaser.Animation.generateFrameNames('punch_1/right_', 1, 4), 20, true);

  this.checkWorldBounds = true;
  this.body.collideWorldBounds = true;

  this.body.fixedRotation = true;
  this.body.damping = 0.5;
  this.body.setCollisionGroup(enemies_1ColisionGroup);
  this.body.collides(blockCollisionGroup);
  this.body.collides(objectsCollisionGroup, function(){this.jump();}.bind(this));
  this.HP_enemyBar = game.add.text(0, 0, 'HP: ' + this.HP_enemy + '%', {font: "10px Arial", fill: "#ffffff"});
  this.addChild(this.HP_enemyBar);
  this.HP_enemyBar.position.y = this.HP_enemyBar.position.y-80;
  game.world.bringToTop(stuff_blocks);
  game.world.bringToTop(this.player);
  game.world.bringToTop(this);
  game.world.bringToTop(spawnPoint);
};

// Missiles are a type of Phaser.Sprite
Enemy_1.prototype = Object.create(Phaser.Sprite.prototype);
Enemy_1.prototype.constructor = Enemy_1;

Enemy_1.prototype.move = function () {
  if(getPowDistance(this.body.x, this.body.y, this.player.body.x, this.player.body.y) < 10000) {
  if(this.enemyMoves != false) {
    if(this.body.velocity.x < 0 && this.body.velocity.y < 150 && this.body.velocity.y > 0) {
      this.animations.play('left');
      this.facing = 'left';
    } else if(this.body.velocity.x > 0 && this.body.velocity.y < 150 && this.body.velocity.y > 0) {
      this.animations.play('right');
      this.facing = 'right';
    }
  }
} else if(getPowDistance(this.body.x, this.body.y, this.player.body.x, this.player.body.y) < 300000) {
  if(this.enemyMoves != false) {
    accelerateToObject(this, this.player, 300);
    if(this.body.velocity.x < 0 && this.body.velocity.y < 150 && this.body.velocity.y > 0) {
      this.animations.play('left');
      this.facing = 'left';
    } else if(this.body.velocity.x > 0 && this.body.velocity.y < 150 && this.body.velocity.y > 0) {
      this.animations.play('right');
      this.facing = 'right';
    }
  }
} else {
    accelerateToObject(this, this.player, 500);
    if(this.body.velocity.x < 0 && this.body.velocity.y < 150 && this.body.velocity.y > 0) {
      this.animations.play('sprint_left');
      this.facing = 'left';
    } else if(this.body.velocity.x > 0 && this.body.velocity.y < 150 && this.body.velocity.y > 0) {
      this.animations.play('sprint_right');
      this.facing = 'right';
    }
  }
};

Enemy_1.prototype.damage = function() {
    this.HP_enemy -= this.player.punch_damage;

    if (this.HP_enemy <= 0)
    {
        this.alive = false;
        this.destroy();
        this.kill();
        return true;
    }

    return false;
};

Enemy_1.prototype.punch = function () {
  if(this.facing == 'left') {
      this.animations.play('punch_1_left');
      this.punching = true;
      if(this.player.facing == 'left') {
        this.player.body.x += 3;
        this.player.body.y -= 3;
      } else {
        this.player.body.x -= 3;
        this.player.body.y -= 3;
      }
  } else {
      this.animations.play('punch_1_right');
      this.punching = true;
  }
};

Enemy_1.prototype.jump = function () {
  if(checkIfCanJump(this)) {
    if(this.jumpCount == 0) {
      this.body.moveUp(300);
      this.jumpCount = 1;
    } else {
      this.body.moveUp(380);
      this.jumpCount = 0;
    }
  }
};


Enemy_1.prototype.update = function() {
  game.debug.body(this);
  this.enemyMoves = false;
  //<Enemy_Punch>
  if(checkOverlap(this, player)) {
    if(playerPunching == true){
      if(this.body.velocity.x < 0 && this.body.velocity.y < 150 && this.body.velocity.y > 0) {
        this.body.x += 30;
        this.body.y -= 30;
      } else if(this.body.velocity.x > 0 && this.body.velocity.y < 150 && this.body.velocity.y > 0) {
        this.body.x -= 30;
        this.body.y -= 30;
      }
      this.damage();
    } else {
      playerPunching = false;
    }
    game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){this.punch();}, this);
  } else {
    this.punching = false;
    this.enemyMoves = true;
    this.move();
  }
  //</Enemy_Punch>
  if(this.punching != false) {
    if(this.alive == true && this.HP_enemy > 0) {
      if(checkOverlap(this, player)) {
        playerSubtractHealthBar(this.punch_damage);
      }
    }

  }

  this.HP_enemyBar.setText('HP: ' + this.HP_enemy + '%');
};

Level1.prototype.createEnemy_1 = function(x, y) {
    var enemy = this.enemies;

    if (enemy) {
        var health = this.game.rnd.integerInRange(5, 100);
        enemy = new Enemy_1(this.game, player, health, x, y);
        this.enemies.add(enemy);
        if(health > 50) {
          enemy.scale.setTo(1.2, 1.2);
        }
    }

    return enemy;
};

Level1.prototype.createEnemy_2 = function(x, y) {
    var enemy = this.enemies.getFirstDead();

    if (enemy === null) {
        enemy = new Enemy_1(this.game, player, this.game.rnd.integerInRange(5, 20), x, y);
        this.enemies.add(enemy);
    }

    enemy.revive();

    return enemy;
};

Level1.prototype.showerEnemies = function (x, y) {
  var enemy = this.enemies;

  this.game.add.existing(
    enemy = new Enemy_1(this.game, player, this.game.rnd.integerInRange(5, 20))
  );

  enemy.x = x;
  enemy.y = y;

  return enemy;
};

var Stuff_Block = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'box_wood');

  game.physics.p2.enable(this);
  this.body.setCollisionGroup(stuff_blocksCollisionGroup);
  this.body.collides([blockCollisionGroup, objectsCollisionGroup, enemies_1ColisionGroup]);
  game.time.events.loop(10000, function(){this.kill();}.bind(this));
};

Stuff_Block.prototype = Object.create(Phaser.Sprite.prototype);
Stuff_Block.prototype.constructor = Stuff_Block;

Stuff_Block.prototype.update = function () {
  if(checkOverlap(this, player)) {
    this.kill();
    var rand = game.rnd.integerInRange(0, 20);;
    if(rand > 0) {
      player.punch_damage = 4;
    }
  }
};

Level1.prototype.createStuff_Block = function(x, y) {
  var block = stuff_blocks;
  if(this.MAX_STUFF_BLOCKS == block.countLiving()) {

  } else {
    if (block) {
        block = new Stuff_Block(this.game, x, y);
        stuff_blocks.add(block);
    }

    return block;
  }
};
