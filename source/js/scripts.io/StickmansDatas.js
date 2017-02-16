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
      obj2.randomNumber = game.rnd.integerInRange(0, 30);
      if(obj2.randomNumber > 18 && obj2.randomNumber < 20) {
        if(obj2.holding == 'nothing') {
          new Weapons('powerUp_2x', false, obj2, true);
        }
      } else if(obj2.randomNumber > 5 && obj2.randomNumber < 10) {
        if(obj2.holding == 'nothing') {
          new Weapons('pistol', true, obj2, true, 400, 15);
        }
      } else if(obj2.randomNumber > 11 && obj2.randomNumber < 14) {
        if(obj2.holding == 'nothing') {
          new Weapons('desert_eagle', true, obj2, true, 400, 8);
        }
      } else if(obj2.randomNumber > 25 && obj2.randomNumber < 30) {
        if(obj2.holding == 'nothing') {
          new Weapons('null_gravity', true, obj2, true, 400, 5);
        }
      } else if(obj2.randomNumber > 1 && obj2.randomNumber < 5) {
        if(obj2.holding == 'nothing') {
          new Weapons('uzi', true, obj2, true, 400, 5);
        }
      } else if(obj2.randomNumber > 21 && obj2.randomNumber < 28) {
        if(obj2.holding == 'nothing') {
          new Weapons('addHealth', false, obj2, true, 400);
        }
      } else {
        if(obj2.holding == 'nothing') {
          new Weapons('counter_0', false, obj2, true);
        }
      }
      obj2.counter++;
    }
  }.bind(this));
  game.physics.arcade.overlap(this, enemies, function(obj1, obj2){
    if(obj2.counter == 0) {
      this.kill();
      obj2.randomNumber = game.rnd.integerInRange(0, 30);
      if(obj2.randomNumber > 18 && obj2.randomNumber < 20) {
        if(obj2.holding == 'nothing') {
          new Weapons('powerUp_2x', false, obj2, false);
        }
      } else if(obj2.randomNumber > 5 && obj2.randomNumber < 10) {
        if(obj2.holding == 'nothing') {
          new Weapons('pistol', true, obj2, false, 400, 15);
        }
      } else if(obj2.randomNumber > 11 && obj2.randomNumber < 14) {
        if(obj2.holding == 'nothing') {
          new Weapons('desert_eagle', true, obj2, false, 400, 8);
        }
      } else if(obj2.randomNumber > 25 && obj2.randomNumber < 30) {
        if(obj2.holding == 'nothing') {
          new Weapons('null_gravity', true, obj2, false, 400, 5);
        }
      } else if(obj2.randomNumber > 1 && obj2.randomNumber < 5) {
        if(obj2.holding == 'nothing') {
          new Weapons('uzi', true, obj2, false, 400, 5);
        }
      } else if(obj2.randomNumber > 21 && obj2.randomNumber < 28) {
        if(obj2.holding == 'nothing') {
          new Weapons('addHealth', false, obj2, false, 400);
        }
      } else {
        if(obj2.holding == 'nothing') {
          new Weapons('counter_0', false, obj2, false);
        }
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

var Weapons = function (weapon_name, weapon, target, displayTimer, speed, timer) {
  var wp = weapons;

  if(weapon_name != '' && weapon == true && target.holding == 'nothing') {
    if(wp) {
      if(displayTimer == true) {
        var pu = power_ups;

        if(pu) {
          pu = new Power_Ups('weapon', weapon_name, timer);
          power_ups.add(pu);
        }
      }

      timer = timer.toString() + "000";
      wp = new createWeapon(weapon_name, speed, game, target, parseInt(timer));
      weapons.add(wp);
      target.holding = weapon_name;
    }

    return wp;
  } else if(weapon_name == 'powerUp_2x' && target.holding != 'powers' && weapon == false && target.holding == 'nothing') {
      target.punch_damage = 2;
      target.holding = 'powers';
      target.tint = 0xCCFFFF;
      game.add.tween(target.scale).to({ x: 1.3, y: 1.2 }, 500, Phaser.Easing.Back.Out, true, 0);
      setTimeout(function(){
        target.punch_damage = 0.5;
        game.add.tween(target.scale).to({ x: 1, y: 1 }, 500, Phaser.Easing.Back.Out, true, 0);
        target.tint = 0xFFFFFF;
        target.holding = 'nothing';
        target.counter = 0;
      }.bind(this), 6000);
      if(displayTimer == true) {
        var pu = power_ups;

        if(pu) {
          pu = new Power_Ups('powerUp_2x', target, 5);
          power_ups.add(pu);
        }
      }
  } else if(weapon_name == 'addHealth' && target.holding != 'powers' && weapon == false && target.holding == 'nothing') {
    if(healthFull != true || healthBar_Red.cameraOffset.x == 0 || healthBar_Red.cameraOffset.x > 0) {
    if(target.counter === 0) {
    
    if(target == player) {
      playerAddHealthBar(50);
    } else {
      target.health += 10;
    }
    target.counter++;
    }
    setTimeout(function(){
        target.holding = 'nothing';
        target.counter = 0;
    }.bind(this), 6000);
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

var createWeapon = function (weapon_name, speed, game, target, timer) {

  this.target = target;
  this.weapon_name = weapon_name;
  this.timer = timer;
  
  this.target.bodyAnimation.playAnimationByName('walk_hold');

  if(this.weapon_name) {

  if(this.weapon_name == 'pistol') {

    this.target.bullet = game.add.weapon(100, 'bullet_1');
    this.target.weaponTime = 500;
    Phaser.Sprite.call(this, game, 0, 0, 'pistol');
    game.physics.arcade.enable(this);
    this.target.weapon = this;
    this.target.bullet.trackSprite(this.target.weapon, 0, this.body.y-5);

    this.target.bodyAnimation.onPointUpdated.add(function (spriter, pointObj) {
        var transformed = pointObj.transformed;
        if(this.target.facing == 'left') {
          this.position.set(spriter.x + transformed.x * -0.14, spriter.y + transformed.y * 0.14);
          this.scale.x = -1;
        } else {
          this.position.set(spriter.x + transformed.x * 0.14, spriter.y + transformed.y * 0.14);
          this.scale.x = 1;
        }
        //this.angle = spriter.angle - 62.447 + transformed.angle;
    }, this);

  } else if(this.weapon_name == 'desert_eagle') {

    this.target.bullet = game.add.weapon(100, 'bullet_1');
    this.target.weaponTime = 1000;
    Phaser.Sprite.call(this, game, 0, 0, 'desert_eagle');
    game.physics.arcade.enable(this);
    this.target.weapon = this;
    this.target.bullet.trackSprite(this.target.weapon, 0, this.body.y-5);

    this.target.bodyAnimation.onPointUpdated.add(function (spriter, pointObj) {
        var transformed = pointObj.transformed;
        if(this.target.facing == 'left') {
          this.position.set(spriter.x + transformed.x * -0.14, spriter.y + transformed.y * 0.14);
          this.scale.x = -1;
        } else {
          this.position.set(spriter.x + transformed.x * 0.14, spriter.y + transformed.y * 0.14);
          this.scale.x = 1;
        }
        //this.angle = spriter.angle - 62.447 + transformed.angle;
    }, this);

  } else if(this.weapon_name == 'null_gravity') {

    this.target.bullet = game.add.weapon(100, 'orb_magical_orange');
    this.target.weaponTime = 1000;
    Phaser.Sprite.call(this, game, 0, 0, 'null_gravity');
    game.physics.arcade.enable(this);
    this.target.weapon = this;
    this.target.bullet.trackSprite(this.target.weapon, 0, this.body.y-5);

    this.target.bodyAnimation.onPointUpdated.add(function (spriter, pointObj) {
        var transformed = pointObj.transformed;
        if(this.target.facing == 'left') {
          this.position.set(spriter.x + transformed.x * -0.14, spriter.y + transformed.y * 0.14);
          this.scale.x = -1;
        } else {
          this.position.set(spriter.x + transformed.x * 0.14, spriter.y + transformed.y * 0.14);
          this.scale.x = 1;
        }
        //this.angle = spriter.angle - 62.447 + transformed.angle;
    }, this);

  } else if(this.weapon_name == 'uzi') {

    this.target.bullet = game.add.weapon(100, 'bullet_1');
    this.target.weaponTime = 100;
    Phaser.Sprite.call(this, game, 0, 0, 'uzi');
    game.physics.arcade.enable(this);
    this.target.weapon = this;
    this.target.bullet.trackSprite(this.target.weapon, 0, this.body.y-10);

    this.target.bodyAnimation.onPointUpdated.add(function (spriter, pointObj) {
        var transformed = pointObj.transformed;
        if(this.target.facing == 'left') {
          this.position.set(spriter.x + transformed.x * -0.14, spriter.y + transformed.y * 0.14);
          this.scale.x = -1;
        } else {
          this.position.set(spriter.x + transformed.x * 0.14, spriter.y + transformed.y * 0.14);
          this.scale.x = 1;
        }
        //this.angle = spriter.angle - 62.447 + transformed.angle;
    }, this);

  }

  if(this.target.alive == true) {
    this.target.bullet.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.target.bullet.bulletAngleOffset = 90;
    this.target.bullet.bulletSpeed = speed;
    this.target.bullet.fireRate = 60;
    }
  this.alive = true;
  this.anchor.setTo(0.5, 0.5);
  this.events.onOutOfBounds.add(function(){this.destroy();}, this);
  this.checkWorldBounds = true;

  setTimeout(function(){
    this.target.holding = 'nothing';
    this.target.counter = 0;
    this.destroy();
    this.alive = false;
  }.bind(this), this.timer);
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
    //start:
    if(this.target.alive == true) {
      
      if(this.target == player) {
        game.physics.arcade.collide(this.target.bullet.bullets, enemies, function(bullet, enemy){bullet.kill(); enemy.damage(true, 8);}.bind(this));
      } else {
        game.physics.arcade.collide(this.target.bullet.bullets, player, function(player, bullet){bullet.kill(); playerSubtractHealthBar(8);}.bind(this));
      }
    }

    

  } else if(this.weapon_name == 'desert_eagle') {
    //start:
    if(this.target.alive == true) {
    
    if(this.target == player) {
        game.physics.arcade.collide(this.target.bullet.bullets, enemies, function(bullet, enemy){bullet.kill(); enemy.damage(true, 20);}.bind(this));
      } else {
        game.physics.arcade.collide(this.target.bullet.bullets, player, function(player, bullet){bullet.kill(); playerSubtractHealthBar(20);}.bind(this));
      }
    }

    

    
  } else if(this.weapon_name == 'null_gravity') {
    //start:
        if(this.target.alive == true) {
        
        if(this.target == player) {

          enemies.forEachAlive(function(enm){
            game.physics.arcade.collide(this.target.bullet.bullets, enm, function(enemy, bullet){
            bullet.kill();
            enemy.damage(true, 5);
            enemy.body.gravity.y = -200;
            enemy.scale.y *= -1;
            enemy.upsidedown = true;
            setTimeout(function(){
              enemy.body.gravity.y = 2000;
              enemy.scale.y = 1;
              enemy.upsidedown = false;
            }, 5000);
            }.bind(this));
          }, this);

        } else {
          game.physics.arcade.collide(this.target.bullet.bullets, player, function(player, bullet){
          bullet.kill();
          playerSubtractHealthBar(5);
          player.body.gravity.y = -200;
          player.scale.y *= -1;
          player.upsidedown = true;
          setTimeout(function(){
            player.body.gravity.y = 2000;
            player.scale.y = 1;
            player.upsidedown = false;
          }, 5000);
          }.bind(this));
        }
      }

      


    
  } else if(this.weapon_name == 'uzi') {
    //start:
    if(this.target.alive == true) {
      
      if(this.target == player) {
        game.physics.arcade.collide(this.target.bullet.bullets, enemies, function(bullet, enemy){bullet.kill(); enemy.damage(true, 3);}.bind(this));
      } else {
        game.physics.arcade.collide(this.target.bullet.bullets, player, function(player, bullet){bullet.kill(); playerSubtractHealthBar(3);}.bind(this));
      }
    }

    

  }

}

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

var RemotePlayer = function(index, game, player, startX, startY, startFacing, startPunching, startCrouching, spriterData) {
  var x = startX;
  var y = startY;
  var facing = startFacing;
  var punching = startFacing;
  var crouching = startCrouching;

  this.game = game;
  this.health = 3;
  this.player = player;
  this.alive = true;

  this.player = this.game.add.sprite(x, y, 'stickman_box');

  game.physics.enable(this.player, Phaser.Physics.ARCADE);

    this.player.bodyAnimation = new Spriter.SpriterGroup(this.game, spriterData, "stickman_1", "Player", 0, 200);

    this.game.world.add(this.player.bodyAnimation);

    this.game.physics.arcade.enable(this.player.bodyAnimation);
    
    this.player.bodyAnimation.scale.setTo(0.14, 0.14);

    this.player.name = index.toString();
    this.player.body.gravity.y = 2000;
    this.player.body.collideWorldBounds = true;
    this.game.physics.arcade.checkCollision.bottom = false;
    this.game.physics.arcade.checkCollision.top = false;


    jumping = false;
    this.player.punching = false;
    this.player.punch_damage = 1;
    this.player.facing = facing;
    this.player.holding = 'nothing';
    this.player.counter = 0;
    this.player.randomNumber = 0;
    this.player.animCounter = 0;
    this.player.fallCounter = 0;
    this.player.fallDoneCounter = 0;
    this.player.crouchIdleCounter = 0;
    this.player.alive = true;
    this.player.anchor.setTo(0.5, 0.5);
    this.player.timeCheck = this.game.time.now;
    this.player.timeCheckBreathing = this.game.time.now;
    this.player.timeCheckPunching = this.game.time.now;
    this.player.timeCheckPunched = this.game.time.now;
    this.player.timeCheckCrouch = this.game.time.now;
    this.player.AnimationUpdate = false;
    this.player.weaponTime = false;
    this.player.crouching = false;
    this.player.weapon = false;
    this.player.upsidedown = false;
    this.player.doubleTapped = false;
    this.player.standing_up = false;

    this.lastPosition = { x: x, y: y, facing: facing, punching: punching, crouching: crouching }
};

RemotePlayer.prototype.update = function () {
  this.player.bodyAnimation.position.setTo(this.player.body.x+15, this.player.body.y+40);
      collideWithTilemap(true, this.player);
      if(this.player.AnimationUpdate == true) {
       this.player.bodyAnimation.updateAnimation();
      } else if(this.player.AnimationUpdate == null) { 

      } else {
        this.player.bodyAnimation.updateAnimation();
        this.player.bodyAnimation.setAnimationSpeedPercent(100);
        if(this.game.time.now - this.player.timeCheckBreathing >= 1000 && this.player.doubleTapped == false) {
          if(this.player.holding != 'nothing' && this.player.holding != 'powers') {
            this.player.bodyAnimation.playAnimationByName('idle_hold');
          } else {
            this.player.bodyAnimation.playAnimationByName('idle');
          }
          this.player.timeCheckBreathing = this.game.time.now;
        }
      }

  if (this.player.x !== this.lastPosition.x || this.player.y !== this.lastPosition.y) {
    this.player.bodyAnimation.setAnimationSpeedPercent(100);
             if(this.player.animCounter == 0) {
                this.player.bodyAnimation.playAnimationByName('walk');
                this.player.AnimationUpdate = true;
                this.player.animCounter++;
              }
              if(this.lastPosition.facing == 'left') {
                this.player.bodyAnimation.scale.setTo(0.14, 0.14);
              } else {
                this.player.bodyAnimation.scale.setTo(-0.14, 0.14);
              }

  } else {
    this.player.AnimationUpdate = false;
  }

  if(this.player.facing !== this.lastPosition.facing) {
    if(this.lastPosition.facing == 'left') {
      this.player.bodyAnimation.scale.setTo(0.14, 0.14);
    } else {
      this.player.bodyAnimation.scale.setTo(-0.14, 0.14);
    }
  }

  if(this.lastPosition.punching == true) {
            this.player.bodyAnimation.setAnimationSpeedPercent(200);
            this.player.AnimationUpdate = true;
            

            if(game.time.now - this.player.timeCheckPunching >= 1000) {
              this.player.bodyAnimation.playAnimationByName('punch');
              
              this.player.timeCheckPunching = game.time.now;
            }

            if(game.time.now - this.player.timeCheckPunched >= 500) {
              this.player.punching = true;
              
              this.player.timeCheckPunched = game.time.now;
            } else {
              this.player.punching = false;
            }
  }


  if(this.player.weapon != false) {
    this.player.bodyAnimation.onPointUpdated.add(function (spriter, pointObj) {
        var transformed = pointObj.transformed;
        if(this.player.facing == 'left') {
          this.player.weapon.position.set(spriter.x + transformed.x * -0.14, spriter.y + transformed.y * 0.14);
          this.player.weapon.scale.x = -1;
        } else {
          this.player.weapon.position.set(spriter.x + transformed.x * 0.14, spriter.y + transformed.y * 0.14);
          this.player.weapon.scale.x = 1;
        }
        //this.angle = spriter.angle - 62.447 + transformed.angle;
    }, this);
  }

  this.lastPosition.x = this.player.x;
  this.lastPosition.y = this.player.y;
  this.lastPosition.facing = this.player.facing;
  this.lastPosition.punching = this.player.punching;
  this.lastPosition.crouching = this.player.crouching;
};

window.RemotePlayer = RemotePlayer;

//Enemy_1
var Enemy_1 = function (game, player, health, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'stickman_box');

    this.bodyAnimation = new Spriter.SpriterGroup(game, spriterData, "stickman_2", "Player", 0, 200);

    game.world.add(this.bodyAnimation);

    game.physics.arcade.enable(this.bodyAnimation);
    
    this.bodyAnimation.scale.setTo(0.14, 0.14);

  this.alive = true;
  this.health = health;
  this.punchedCount = 0;
  this.punch_damage = 0.5;
  this.holding = 'nothing';
  this.counter = 0;
  this.randomNumber = 0;
  this.anchor.setTo(0.5, 1);
  this.timeCheck = game.time.now;
  this.timeCheckPunching = game.time.now;
  this.animCounter = 0;
  this.timeCheckBreathing = 0;
  var fallCounter = 0;
  var fallDoneCounter = 0;
  this.jumps = 0;

  this.punching = false;
  this.jumping = false;
  game.physics.arcade.enable(this);
  this.body.gravity.y = 2000;

  this.checkWorldBounds = true;
  this.body.collideWorldBounds = true;
  this.weaponTime = false;
  this.spawnPointTime = game.time.now;
  this.weapon = false;
  this.upsidedown = false;

  this.body.fixedRotation = true;
  this.body.damping = 0.5;
  this.healthBar = game.add.text(0, 0, 'HP: ' + this.health + '%', {font: "10px Arial", fill: "#ffffff"});
  this.healthBar.position.y = this.healthBar.position.y-80;
  game.physics.arcade.enable(this.healthBar);


};

Enemy_1.prototype = Object.create(Phaser.Sprite.prototype);
Enemy_1.prototype.constructor = Enemy_1;

Enemy_1.prototype.move = function () {
  //Enemy AI

if(this.holding != 'nothing') {
    //Left/Right
    if(this.body.velocity.x < 0) {
      this.bodyAnimation.scale.setTo(-0.14, 0.14);
      this.facing = 'left';
    } else if(this.body.velocity.x > 0 && this.body.velocity.y < 150 && this.body.velocity.y > 0) {
      this.bodyAnimation.scale.setTo(0.14, 0.14);
      this.facing = 'right';
    }

if(getPowDistance(false, true, 0, this.body.y, 0, player.body.y) > 88000) {
  this.jump();
}

if(this.holding != 'nothing' && this.holding != 'powers') {
if(game.physics.arcade.distanceBetween(player, this) < 800) {
  this.body.velocity.x = 0;
  this.animations.play('aim');
  this.punch();
} else {
  moveToObjectAdvance(this, player, 500, 0, true, false);
  
    this.bodyAnimation.setAnimationSpeedPercent(200);
    if(this.animCounter == 0) {
      this.bodyAnimation.playAnimationByName('walk');
      this.AnimationUpdate = true;
      this.animCounter++;
    }
}
} else {
  moveToObjectAdvance(this, player, 500, 0, true, false);
}

if(this.facing == 'left' && this.body.x < player.body.x) {
  this.facing = 'right';
  this.bodyAnimation.scale.setTo(0.14, 0.14);
} else if(this.facing == 'right' && this.body.x > player.body.x) {
  this.facing = 'left';
  this.bodyAnimation.scale.setTo(-0.14, 0.14);
}

} else {
  //Get Some Items
  if(this.enemyMoves != false) {
    


      if(game.physics.arcade.distanceBetween(player, this) < 500) {
        moveToObjectAdvance(this, player, 300, 0, true, false);
        this.bodyAnimation.setAnimationSpeedPercent(200);
        if(this.animCounter == 0) {
          this.bodyAnimation.playAnimationByName('walk');
          this.AnimationUpdate = true;
          this.animCounter++;
        }
      } else {
        stuff_blocks.forEachAlive(function(stuff_block){
        if(getPowDistance(true, true, this.body.x, this.body.y, stuff_block.body.x, stuff_block.body.y) < 10000) {
          moveToObjectAdvance(this, stuff_block, 300, 0, true, false);
        } else {
          moveToObjectAdvance(this, stuff_block, 500, 0, true, false);
        }
        }, this);
      }
      

    //Left/Right
    if(this.body.velocity.x < 0) {
      this.bodyAnimation.scale.setTo(-0.14, 0.14);
      this.facing = 'left';
    } else if(this.body.velocity.x > 0 && this.body.velocity.y < 150 && this.body.velocity.y > 0) {
      this.bodyAnimation.scale.setTo(0.14, 0.14);
      this.facing = 'right';
    }
  }

  stuff_blocks.forEachAlive(function(stuff_block){
    if(getPowDistance(false, true, 0, this.body.y, 0, stuff_block.body.y) > 88000) {
      this.jump();
    }
  }, this);
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
        this.bodyAnimation.destroy();
        this.healthBar.destroy();
        this.holding = 'nothing';
        return true;
    }

    return false;
};

Enemy_1.prototype.punch = function () {
  if(this.holding != 'nothing' && this.holding != 'powers') {

    if(this.weaponTime != false) {
      if(this.facing == 'left') {
        this.bullet.fireAngle = Phaser.ANGLE_LEFT;
      } else {
        this.bullet.fireAngle = Phaser.ANGLE_RIGHT;
      }
      if(game.time.now - this.timeCheck > this.weaponTime) {
            this.bullet.fire();
            if(this.weapon.alive == true) {
            this.weapon.frame = 1;
            setTimeout(function(){this.weapon.frame = 0;}.bind(this), 500);
            }
            this.timeCheck = game.time.now;
      }
    }

  } else {
  
  if(player.alive == true) {
  if(this.facing == 'right') {
      this.bodyAnimation.scale.setTo(0.14, 0.14);
        this.bodyAnimation.setAnimationSpeedPercent(200);
        this.AnimationUpdate = true;

      if(game.time.now - this.timeCheckPunching >= 1000) {
        this.bodyAnimation.playAnimationByName('punch');
              
        this.timeCheckPunching = game.time.now;
      }
      this.punching = true;
      if(player.facing == 'left') {
        player.body.x += 3;
        player.body.y -= 3;
      } else {
        player.body.x -= 3;
        player.body.y -= 3;
      }
  } else {
      this.bodyAnimation.scale.setTo(-0.14, 0.14);
      this.bodyAnimation.setAnimationSpeedPercent(200);
        this.AnimationUpdate = true;

      if(game.time.now - this.timeCheckPunching >= 1000) {
        this.bodyAnimation.playAnimationByName('punch');
              
        this.timeCheckPunching = game.time.now;
      }
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
  if(this.body.onFloor() && this.jumping == true) {
    this.jumps = 0;
    if(this.holding != 'nothing' && this.holding != 'powers') {
      this.bodyAnimation.playAnimationByName('walk_hold');
    } else {
      this.bodyAnimation.playAnimationByName('walk');
    }
  }

  if(this.body.onFloor()) {
        this.fallCounter = 0;
      if(this.fallDoneCounter == 0) {
        this.bodyAnimation.setAnimationSpeedPercent(100);
      if(this.holding != 'nothing' && this.holding != 'powers') {
        this.bodyAnimation.playAnimationByName('walk_hold');
      } else {
        this.bodyAnimation.playAnimationByName('walk');
      }
        this.AnimationUpdate = true;
        this.fallDoneCounter++;
      }
    } else {
      this.fallDoneCounter = 0;
      this.bodyAnimation.setAnimationSpeedPercent(300);
    if(this.fallCounter == 0) {
      if(this.holding != 'nothing' && this.holding != 'powers') {
        this.bodyAnimation.playAnimationByName('walk_hold');
      } else {
        this.bodyAnimation.playAnimationByName('walk');
      }
      this.AnimationUpdate = true;
      this.fallCounter++;
    }
  }

  if(this.jumps < 5 && this.body.onFloor()) {
      this.bodyAnimation.setAnimationSpeedPercent(200);
    if(this.AnimationUpdate == 0) {
        this.bodyAnimation.playAnimationByName('jump_start');
        this.AnimationUpdate = true;
        this.animCounter++;
    }

      this.body.velocity.x = 1;
      this.body.velocity.y = -1280;
      this.jumps++;
      this.jumping = true;
  }
};


Enemy_1.prototype.update = function() {
this.bodyAnimation.position.setTo(this.body.x+15, this.body.y+40);
collideWithTilemap(true, this);
if(this.AnimationUpdate == true) {
       this.bodyAnimation.updateAnimation();
      } else if(this.AnimationUpdate == null) { 

      } else {
        this.bodyAnimation.updateAnimation();
        this.bodyAnimation.setAnimationSpeedPercent(100);
        if(game.time.now - this.timeCheckBreathing >= 1000) {
          this.bodyAnimation.playAnimationByName('idle');
          this.timeCheckBreathing = game.time.now;
        }
      }

  if(this.alive == true) {
    this.healthBar.body.x = this.body.x;
    this.healthBar.body.y = this.body.y;
  }
  //<Enemy_Punch>
  
  if(checkOverlap(this, player)) {
    if(player.punching == true){
      if(this.body.velocity.x < 0) {
        this.body.x += 30;
        this.body.y -= 30;
      } else if(this.body.velocity.x > 0) {
        this.body.x -= 30;
        this.body.y -= 30;
      }
      this.damage();
    } else {
      player.punching = false;
    }
    setTimeout(function(){this.punch();}.bind(this), 100);
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
          //enemy.scale.setTo(1.2, 1.2);
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
