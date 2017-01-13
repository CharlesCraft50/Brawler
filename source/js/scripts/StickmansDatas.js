var Enemy_1 = function (game, player, health, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'stickman_2');
  this.alive = true;
  this.health = health;
  this.punchedCount = 0;
  this.punch_damage = 0.5;
  this.holding = 'nothing';
  this.counter = 0;
  this.randomNumber = 0;
  this.anchor.setTo(0.5, 1);
  this.timeCheck = game.time.now;

  this.punching = false;
  this.jumpCount = 0;
  game.physics.arcade.enable(this);
  this.body.gravity.y = 2600;
  this.animations.add('walk', Phaser.Animation.generateFrameNames('walk/left_', 1, 8), 10, true);
  this.animations.add('sprint', Phaser.Animation.generateFrameNames('walk/left_', 1, 8), 20, true);

  this.animations.add('punch_1_left', Phaser.Animation.generateFrameNames('punch_1/left_', 1, 4), 20, true);

  this.animations.add('punch_1_right', Phaser.Animation.generateFrameNames('punch_1/right_', 1, 4), 20, true);

  this.checkWorldBounds = true;
  this.body.collideWorldBounds = true;
  this.weaponTime = false;

  this.body.fixedRotation = true;
  this.body.damping = 0.5;
  this.healthBar = game.add.text(0, 0, 'HP: ' + this.health + '%', {font: "10px Arial", fill: "#ffffff"});
  this.healthBar.position.y = this.healthBar.position.y-80;
  game.physics.arcade.enable(this.healthBar);
  game.world.bringToTop(stuff_blocks);
  game.world.bringToTop(player);
  game.world.bringToTop(this);
  game.world.bringToTop(spawnPoint);
};

// Missiles are a type of Phaser.Sprite
Enemy_1.prototype = Object.create(Phaser.Sprite.prototype);
Enemy_1.prototype.constructor = Enemy_1;

Enemy_1.prototype.move = function () {
  if(getPowDistance(this.body.x, this.body.y, player.body.x, player.body.y) < 10000) {
  if(this.enemyMoves != false) {
    if(this.body.velocity.x < 0) {
      this.scale.x = 1;
      this.animations.play('walk');
      this.facing = 'left';
    } else if(this.body.velocity.x > 0) {
      this.scale.x = -1;
      this.animations.play('walk');
      this.facing = 'right';
    }
  }
} else if(getPowDistance(this.body.x, this.body.y, player.body.x, player.body.y) < 300000) {
  if(this.enemyMoves != false) {
    moveToObjectAdvance(this, player, 300, 0, true, false);
    if(this.body.velocity.x < 0) {
      this.scale.x = 1;
      this.animations.play('walk');
      this.facing = 'left';
    } else if(this.body.velocity.x > 0 && this.body.velocity.y < 150 && this.body.velocity.y > 0) {
      this.scale.x = -1;
      this.animations.play('walk');
      this.facing = 'right';
    }
  }
} else {
    moveToObjectAdvance(this, player, 500, 0, true, false);
    if(this.body.velocity.x < 0) {
      this.animations.play('sprint');
      this.facing = 'left';
    } else if(this.body.velocity.x > 0 && this.body.velocity.y < 150 && this.body.velocity.y > 0) {
      this.animations.play('sprint');
      this.facing = 'right';
    }
  }
};

Enemy_1.prototype.damage = function(edit, num) {
  if(edit == true) {
    this.health -= num;
  } else {
    this.health -= player.punch_damage;
  }

    if (this.health <= 0)
    {
        this.alive = false;
        this.destroy();
        this.healthBar.destroy();
        this.holding = 'nothing';
        return true;
    }

    return false;
};

Enemy_1.prototype.punch = function () {
  if(this.holding != 'nothing' && this.holding != 'powerUp_2x') {

    if(this.weaponTime != false) {
      if(this.facing == 'left') {
        this.bullet.fireAngle = Phaser.ANGLE_LEFT;
      } else {
        this.bullet.fireAngle = Phaser.ANGLE_RIGHT;
      }
      if(game.time.now - this.timeCheck > this.weaponTime) {
            this.bullet.fire();
            this.timeCheck = game.time.now;
      }
    }

  } else {
  if(player.alive == true) {
  if(this.facing == 'right') {
      this.animations.play('punch_1_left');
      this.punching = true;
      if(player.facing == 'left') {
        player.body.x += 3;
        player.body.y -= 3;
      } else {
        player.body.x -= 3;
        player.body.y -= 3;
      }
  } else {
      this.animations.play('punch_1_right');
      this.punching = true;
      if(player.facing == 'right') {
        player.body.x += 3;
        player.body.y -= 3;
      } else {
        player.body.x -= 3;
        player.body.y -= 3;
      }
  }
  }
  }
};

Enemy_1.prototype.jump = function () {
  if(this.body.onFloor()) {
    if(this.jumpCount == 0) {
      this.body.velocity.y = 300;
      this.jumpCount = 1;
    } else {
      this.body.velocity.y = 380;
      this.jumpCount = 0;
    }
  }
};


Enemy_1.prototype.update = function() {
  if(this.alive == true) {
    this.healthBar.body.x = this.body.x;
    this.healthBar.body.y = this.body.y;
  }
  //<Enemy_Punch>
  if(checkOverlap(this, player)) {
    if(playerPunching == true){
      if(this.body.velocity.x < 0) {
        this.body.x += 30;
        this.body.y -= 30;
      } else if(this.body.velocity.x > 0) {
        this.body.x -= 30;
        this.body.y -= 30;
      }
      this.damage();
    } else {
      playerPunching = false;
    }
    setTimeout(function(){this.punch();}.bind(this), 500);
    this.enemyMoves = false;
    if(this.health > 0) {
      this.body.velocity.x = 0;
    }
  } else {
    this.punching = false;
    this.enemyMoves = true;
    this.move();
    this.immovable = false;
  }

  if(this.holding == 'pistol') {
    if(this.facing == 'right' && player.facing == 'left' || this.facing == 'left' && player.facing == 'right') {
      this.punch();
    }
  }
  //</Enemy_Punch>
  if(this.punching != false) {
    if(this.alive == true && this.health > 0) {
      if(checkOverlap(this, player)) {
        playerSubtractHealthBar(this.punch_damage);
      }
    }
  }

  if(this.holding == 'nothing' && this.counter > 0) {
    this.counter = 0;
  }

  this.healthBar.setText('HP: ' + this.health + '%');
};

Level1.prototype.createEnemy_1 = function(x, y) {
    var enemy = enemies;

    if (enemy) {
        var health = this.game.rnd.integerInRange(5, 100);
        enemy = new Enemy_1(this.game, player, health, x, y);
        enemies.add(enemy);
        if(health > 50) {
          enemy.scale.setTo(1.2, 1.2);
        }
    }

    return enemy;
};

Level1.prototype.createEnemy_2 = function(x, y) {
    var enemy = enemies.getFirstDead();

    if (enemy === null) {
        enemy = new Enemy_1(this.game, player, this.game.rnd.integerInRange(5, 20), x, y);
        enemies.add(enemy);
    }

    enemy.revive();

    return enemy;
};

Level1.prototype.showerEnemies = function (x, y) {
  var enemy = enemies;

  this.game.add.existing(
    enemy = new Enemy_1(this.game, player, this.game.rnd.integerInRange(5, 20))
  );

  enemy.x = x;
  enemy.y = y;

  return enemy;
};

var Stuff_Block = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'orb_blue');

  game.physics.arcade.enable(this);
  this.body.gravity.y = 2500;
  setTimeout(function(){this.kill();}.bind(this), 10000);
};

Stuff_Block.prototype = Object.create(Phaser.Sprite.prototype);
Stuff_Block.prototype.constructor = Stuff_Block;

Stuff_Block.prototype.update = function () {
  //console.log(player.counter);
  game.physics.arcade.overlap(this, player, function(obj1, obj2){
    if(obj2.counter == 0) {
      this.kill();
      obj2.randomNumber = game.rnd.integerInRange(0, 20);
      if(obj2.randomNumber > 18 && obj2.randomNumber < 20) {
          new Weapons('powerUp_2x', false, obj2, true);
          //console.log('Player rnd: ' + obj2.randomNumber + ' You got it!');
      } else if(obj2.randomNumber > 5 && obj2.randomNumber < 10) {
        if(obj2.holding == 'nothing' && obj2.holding != 'desert_eagle') {
          new Weapons('pistol', true, obj2, true, 400);
        }
      } else if(obj2.randomNumber > 11 && obj2.randomNumber < 14) {
        if(obj2.holding == 'nothing' && obj2.holding != 'pistol') {
          new Weapons('desert_eagle', true, obj2, true, 400);
        }
      } else {
        //console.log('Player rnd: ' + obj2.randomNumber + ' Better luck next time!');
        new Weapons('counter_0', false, obj2, true);
      }
      obj2.counter++;
    }
  }.bind(this));
  game.physics.arcade.overlap(this, enemies, function(obj1, obj2){
    if(obj2.counter == 0) {
      this.kill();
      obj2.randomNumber = game.rnd.integerInRange(0, 20);
      if(obj2.randomNumber > 18 && obj2.randomNumber < 20) {
          new Weapons('powerUp_2x', false, obj2, false);
          //console.log('Enemy rnd: ' + obj2.randomNumber + ' You got it!');
      } else if(obj2.randomNumber > 5 && obj2.randomNumber < 10) {
          new Weapons('pistol', true, obj2, false, 400);
      } else if(obj2.randomNumber > 11 && obj2.randomNumber < 14) {
          new Weapons('desert_eagle', true, obj2, false, 400);
      } else {
        //console.log('Enemy rnd: ' + obj2.randomNumber + ' Better luck next time!');
        new Weapons('counter_0', false, obj2, false);
      }
      obj2.counter++;
    }
  }.bind(this));
  collideWithTilemap(true, this);
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

var Weapons = function (weapon_name, weapon, target, displayTimer, speed) {
  var wp = weapons;

  if(weapon_name != '' && weapon == true && target.holding == 'nothing') {
    if(wp) {
      wp = new createWeapon(weapon_name, speed, game, target);
      weapons.add(wp);
      target.holding = weapon_name;

      if(displayTimer == true) {
        var pu = power_ups;

        if(pu) {
          pu = new Power_Ups('weapon', weapon_name, 10);
          power_ups.add(pu);
        }
      }
    }

    return wp;
  } else if(weapon_name == 'powerUp_2x' && target.holding != 'powerUp_2x' && weapon == false && target.holding == 'nothing') {
      target.punch_damage = 2;
      target.holding = 'powerUp_2x';
      target.tint = 0xCCFFFF;
      game.add.tween(target.scale).to({ x: 1.3, y: 1.2 }, 500, Phaser.Easing.Back.Out, true, 0);
      setTimeout(function(){
        target.punch_damage = 0.5;
        game.add.tween(target.scale).to({ x: 1, y: 1 }, 500, Phaser.Easing.Back.Out, true, 0);
        target.tint = 0xFFFFFF;
        target.holding = 'nothing';
        target.counter = 0;
      }.bind(this), 5000);
      if(displayTimer == true) {
        var pu = power_ups;

        if(pu) {
          pu = new Power_Ups('powerUp_2x', target, 5);
          power_ups.add(pu);
        }
      }
  } else if(weapon_name == 'counter_0' && weapon == false) {
    setTimeout(function(){
      target.holding = 'nothing';
      target.counter = 0;
    }.bind(this), 500);
  }
};

Weapons.prototype = Object.create(Phaser.Sprite.prototype);
Weapons.prototype.constructor = Weapons;

var createWeapon = function (weapon_name, speed, game, target) {

  this.target = target;
  this.weapon_name = weapon_name;
  if(this.weapon_name) {

  if(this.weapon_name == 'pistol') {

    this.target.bullet = game.add.weapon(100, 'bullet_1');
    this.target.bullet.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.target.bullet.bulletAngleOffset = 90;
    this.target.bullet.bulletSpeed = speed;
    this.target.bullet.fireRate = 60;
    this.target.weaponTime = 500;
    Phaser.Sprite.call(this, game, 0, 0, 'pistol');

    //Weapon position:
    game.physics.arcade.enable(this);
    if(this.target == player) {
    this.target.bullet.trackSprite(this.target, 0, this.body.y-20);
    } else {
    this.target.bullet.trackSprite(this.target, 0, this.body.y-80);
    }
    //break;

  } else if(this.weapon_name == 'desert_eagle') {
    this.target.bullet = game.add.weapon(100, 'bullet_1');
    this.target.bullet.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.target.bullet.bulletAngleOffset = 90;
    this.target.bullet.bulletSpeed = speed;
    this.target.bullet.fireRate = 60;
    this.target.weaponTime = 1000;
    Phaser.Sprite.call(this, game, 0, 0, 'desert_eagle');

    //Weapon position:
    game.physics.arcade.enable(this);
    if(this.target == player) {
    this.target.bullet.trackSprite(this.target, 0, this.body.y-20);
    } else {
    this.target.bullet.trackSprite(this.target, 0, this.body.y-80);
    }
    //break;

  }

  this.alive = true;
  this.anchor.setTo(0.5, 0.5);
  this.events.onOutOfBounds.add(function(){this.destroy();}, this);   
  this.checkWorldBounds = true;
  this.target.holdingWeapon = this;

  setTimeout(function(){
    this.target.holding = 'nothing';
    this.target.counter = 0;
    this.destroy();
    this.alive = false;
  }.bind(this), 11000);
  }

};

createWeapon.prototype = Object.create(Phaser.Sprite.prototype);
createWeapon.prototype.constructor = createWeapon;

createWeapon.prototype.update = function () {
  if(this.target.alive == true) {
  if(this.alive == true) {
  //collideWithTilemap(true, this);
  if(this.weapon_name) {
if(this.target) {
  if(this.weapon_name == 'pistol') {
      if(this.target == player) {
        game.physics.arcade.collide(this.target.bullet.bullets, enemies, function(bullet, enemy){bullet.kill(); enemy.damage(true, 8);}.bind(this)); 
      } else {
        game.physics.arcade.collide(this.target.bullet.bullets, player, function(player, bullet){bullet.kill(); playerSubtractHealthBar(8);}.bind(this)); 
      }
  } else if(this.weapon_name == 'desert_eagle') {
    if(this.target == player) {
        game.physics.arcade.collide(this.target.bullet.bullets, enemies, function(bullet, enemy){bullet.kill(); enemy.damage(true, 20);}.bind(this)); 
      } else {
        game.physics.arcade.collide(this.target.bullet.bullets, player, function(player, bullet){bullet.kill(); playerSubtractHealthBar(20);}.bind(this)); 
      }
  }
}
    
    //Weapon scale to left/right:
    if(this.target.facing == 'left') {
      this.scale.x = -1;
      this.body.x = this.target.body.x-10;
      this.body.y = this.target.body.y+30;
    } else {
      this.scale.x = 1;
    if(this.target == player) {
      this.body.x = this.target.body.x+20;
    } else {
      this.body.x = this.target.body.x+50;
    }
      this.body.y = this.target.body.y+30;
    }
    //break;

}
    }
  } else {
    this.body.gravity.y = 10000;
  }
};

var Power_Ups = function (power_up_name, target, timer) {
  if(power_up_name == 'powerUp_2x') {
    Phaser.Sprite.call(this, game, 0, 50, 'powerUp_2x');
    game.physics.arcade.enable(this);
    this.body.gravity.y = 1000;
    this.body.collideWorldBounds = true;
    this.fixedToCamera = true;
    this.timer = timer;
    this.timerText = game.add.text(this.body.x+16, this.body.y+38, timer, { font: '10px Arial', fill: '#fff' });
    this.timerText.fixedToCamera = true;
    setInterval(function(){if(this.timer != -1){this.timer--;}}.bind(this), 1000);
  } else if(power_up_name == 'weapon') {
    if(this.timer > 0) {
      this.timerText.kill();
    } else {
    Phaser.Sprite.call(this, game, 0, 50, target + '_box');
    game.physics.arcade.enable(this);
    this.body.gravity.y = 1000;
    this.body.collideWorldBounds = true;
    this.fixedToCamera = true;
    this.timer = timer;
    this.timerText = game.add.text(this.body.x+16, this.body.y+38, timer, { font: '10px Arial', fill: '#fff' });
    this.timerText.fixedToCamera = true;
    setInterval(function(){if(this.timer != -1){this.timer--;}}.bind(this), 1000);
    }
  }
};

Power_Ups.prototype = Object.create(Phaser.Sprite.prototype);
Power_Ups.prototype.constructor = Power_Ups;

Power_Ups.prototype.update = function () {
  if(this.timer != -1) {
  this.timerText.setText(this.timer);
  game.physics.arcade.collide(this, this);
  } else {
  this.kill();
  this.timerText.kill();
  }
};
