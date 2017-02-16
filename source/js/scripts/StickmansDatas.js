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
  this.target = target;
  this.timer = timer;

  if(weapon_name != '' && weapon == true && this.target.holding == 'nothing') {
    if(wp) {
      if(displayTimer == true) {
        var pu = power_ups;

        if(pu) {
          pu = new Power_Ups('ammo', this.target, weapon_name, this.timer);
          power_ups.add(pu);
        }
      }

      if(this.timer == null || this.timer == 0 || this.timer == undefined) {
        wp = new createWeapon(weapon_name, speed, game, this.target);
      } else {
        wp = new createWeapon(weapon_name, speed, game, this.target, timer);
      }
      
      weapons.add(wp);
      this.target.holding = weapon_name;
    }

    return wp;
  } else if(weapon_name == 'powerUp_2x' && this.target.holding != 'powers' && weapon == false && this.target.holding == 'nothing') {
      this.target.punch_damage = 2;
      this.target.holding = 'powers';
      this.target.tint = 0xCCFFFF;
      game.add.tween(this.target.scale).to({ x: 1.3, y: 1.2 }, 500, Phaser.Easing.Back.Out, true, 0);
      setTimeout(function(){
        this.target.punch_damage = 0.5;
        game.add.tween(this.target.scale).to({ x: 1, y: 1 }, 500, Phaser.Easing.Back.Out, true, 0);
        this.target.tint = 0xFFFFFF;
        this.target.holding = 'nothing';
        this.target.counter = 0;
      }.bind(this), 6000);
      if(displayTimer == true) {
        var pu = power_ups;

        if(pu) {
          pu = new Power_Ups('timer', this.target, weapon_name, 5);
          power_ups.add(pu);
        }
      }
  } else if(weapon_name == 'addHealth' && this.target.holding != 'powers' && weapon == false && this.target.holding == 'nothing') {
    if(healthFull != true || healthBar_Red.cameraOffset.x == 0 || healthBar_Red.cameraOffset.x > 0) {
    if(this.target.counter === 0) {
    
    if(this.target == player) {
      playerAddHealthBar(50);
    } else {
      this.target.health += 10;
    }
    this.target.counter++;
    }
    setTimeout(function(){
        this.target.holding = 'nothing';
        this.target.counter = 0;
    }.bind(this), 6000);
    }
  } else if(weapon_name == 'counter_0' && weapon == false) {
    setTimeout(function(){
      this.target.holding = 'nothing';
      this.target.counter = 0;
    }.bind(this), 500);
  }
};

Weapons.prototype = Object.create(Phaser.Sprite.prototype);
Weapons.prototype.constructor = Weapons;

var createWeapon = function (weapon_name, speed, game, target, ammo) {

  this.target = target;
  this.weapon_name = weapon_name;
  this.ammo = ammo;
  this.speed = speed;
  
  this.target.bodyAnimation.playAnimationByName('walk_hold');

  if(this.weapon_name) {

  if(this.weapon_name == 'pistol') {

    this.target.bullet = game.add.weapon(100, 'bullet_1');
    this.target.weaponTime = 500;
    Phaser.Sprite.call(this, game, 0, 0, 'pistol');
    game.physics.arcade.enable(this);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.target.weapon = this;
    this.target.weapon.name = this.weapon_name;
    this.target.bullet.trackSprite(this.target.weapon, 0, this.body.y-5);

    if(this.ammo == null || this.ammo == 0 || this.ammo == undefined) {
      this.target.weaponAmmo = 30;
    } else {
      this.target.weaponAmmo = this.ammo;
    }

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
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.target.weapon = this;
    this.target.weapon.name = this.weapon_name;
    this.target.bullet.trackSprite(this.target.weapon, 0, this.body.y-5);
    
    if(this.ammo == null || this.ammo == 0 || this.ammo == undefined) {
      this.target.weaponAmmo = 10;
    } else {
      this.target.weaponAmmo = this.ammo;
    }

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
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.target.weapon = this;
    this.target.weapon.name = this.weapon_name;
    this.target.bullet.trackSprite(this.target.weapon, 0, this.body.y-5);
    
    if(this.ammo == null || this.ammo == 0 || this.ammo == undefined) {
      this.target.weaponAmmo = 5;
    } else {
      this.target.weaponAmmo = this.ammo;
    }

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
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.target.weapon = this;
    this.target.weapon.name = this.weapon_name;
    this.target.bullet.trackSprite(this.target.weapon, 0, this.body.y-10);
    
    if(this.ammo == null || this.ammo == 0 || this.ammo == undefined) {
      this.target.weaponAmmo = 20;
    } else {
      this.target.weaponAmmo = this.ammo;
    }

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
    this.target.bullet.bulletSpeed = 700;
    this.target.bullet.fireRate = 60;
    }
  this.alive = true;
  this.anchor.setTo(0.5, 0.5);
  this.events.onOutOfBounds.add(function(){this.destroy();}, this);
  this.checkWorldBounds = true;
  }

};

createWeapon.prototype = Object.create(Phaser.Sprite.prototype);
createWeapon.prototype.constructor = createWeapon;

createWeapon.prototype.update = function () {
  if(this.target.alive == true) {
    if(this.alive == true) {
      //collideWithTilemap(true, this);
      if(this.weapon_name) {
        if(this.target.alive == true) {
  
  if(this.target.weaponAmmo == -1) {
    this.target.holding = 'nothing';
    this.target.counter = 0;
    this.destroy();
    this.alive = false;
  }

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

var Power_Ups = function (type, target, mainTarget, timer) {

  this.target = target;
  this.target.weaponType = type;
  this.mainTarget = mainTarget;

  if(this.target.weaponType == 'timer') {
    Phaser.Sprite.call(this, game, 0, 50, this.mainTarget);
    game.physics.arcade.enable(this);
    this.body.gravity.y = 1000;
    this.body.collideWorldBounds = true;
    this.fixedToCamera = true;
    this.timer = timer;
    this.timerText = game.add.text(this.body.x+16, this.body.y+38, timer, { font: '10px Arial', fill: '#fff' });
    this.timerText.fixedToCamera = true;
    setInterval(function(){if(this.timer != -1){this.timer--;}}.bind(this), 1000);
  } else if(this.target.weaponType == 'ammo') {
    if(this.target.weaponAmmo > 0) {
      this.timerText = game.add.text(this.body.x+16, this.body.y+38, this.target.weaponAmmo, { font: '10px Arial', fill: '#fff' });
      this.timerText.kill();
    } else {
    Phaser.Sprite.call(this, game, 0, 50, this.mainTarget + '_box');
    game.physics.arcade.enable(this);
    this.body.gravity.y = 1000;
    this.body.collideWorldBounds = true;
    this.fixedToCamera = true;
    this.timer = timer;
    this.timerText = game.add.text(this.body.x+16, this.body.y+38, this.target.weaponAmmo, { font: '10px Arial', fill: '#fff' });
    this.timerText.fixedToCamera = true;
    }
  }
};

Power_Ups.prototype = Object.create(Phaser.Sprite.prototype);
Power_Ups.prototype.constructor = Power_Ups;

Power_Ups.prototype.update = function () {
  if(this.target.weaponType == 'timer') {
    if(this.timer != -1) {
      this.timerText.setText(this.timer);
    } else {
      this.kill();
      this.timerText.kill();
    }
  } else if(this.target.weaponType == 'ammo') {
    if(this.target.weaponAmmo != -1) {
      this.timerText.setText(this.target.weaponAmmo);
    } else {
      this.kill();
      this.timerText.kill();
    }
  }
  
};

//Enemy_1
var Enemy_1 = function (game, player, health, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'stickman_box');

    this.bodyAnimation = new Spriter.SpriterGroup(game, spriterData, "stickman_2", "Player", 0, 200);

    game.world.add(this.bodyAnimation);

    game.physics.arcade.enable(this.bodyAnimation);
    
    this.bodyAnimation.scale.setTo(0.14, 0.14);

    audios(this);

  this.breathing = false;
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
  this.timeCheckBreathing = game.time.now;
  this.fallCounter = 0;
  this.fallDoneCounter = 0;
  this.soundCounter = 0;
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
  this.weapon.name = '';
  this.soundStart = false;
  this.weaponAmmo = 0;
  this.weaponType = 'null';

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
        a = parseInt(localStorage.getItem('coins')) + 1;
        b = localStorage.setItem('coins', a);
        player.coinsCounter = 0;
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
            if(this.weaponAmmo != -1){
              this.weaponAmmo--;
            }
            if(this.weapon.alive == true) {
            this.weapon.frame = 1;
            if(this.soundStart != true) {
              this.soundStart = true;
            }
            setTimeout(function(){this.weapon.frame = 0;}.bind(this), 500);
            }
            this.timeCheck = game.time.now;
      }
    }

    if(this.soundStart == true) {
      if(this.soundCounter == 0) {
        this.weapons_sounds[this.weapon.name].play();
        this.soundCounter++;
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
        this.sound_effects['punch'].play();
              
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
if(this.breathing == true) {
  this.bodyAnimation.position.setTo(this.body.x+15, this.body.y+40);
} else {
  this.bodyAnimation.position.setTo(this.body.x+15, this.body.y+45);
}

collideWithTilemap(true, this);
if(this.AnimationUpdate == true) {
       this.bodyAnimation.updateAnimation();
       this.breathing = false;
      } else if(this.AnimationUpdate == null) { 

      } else {
        this.bodyAnimation.updateAnimation();
        this.bodyAnimation.setAnimationSpeedPercent(100);
        if(game.time.now - this.timeCheckBreathing >= 1000) {
          if(this.holding != 'nothing' && this.holding != 'powers') {
            this.bodyAnimation.playAnimationByName('idle_hold');
          } else {
            this.bodyAnimation.playAnimationByName('idle');
          }
          this.breathing = true;
          this.timeCheckBreathing = game.time.now;
        }
      }

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

var NPC = function(game, x, y, spriterData, speed, moves, direction) {
    this.moves = moves;
    this.direction = direction;
    this.speed = speed;

    Phaser.Sprite.call(this, game, x, y, 'stickman_box');

    this.bodyAnimation = new Spriter.SpriterGroup(game, spriterData, "stickman_1", "Player", 0, 200);

    game.world.add(this.bodyAnimation);

    game.physics.arcade.enable(this.bodyAnimation);
    
    this.bodyAnimation.scale.setTo(0.14, 0.14);

    game.physics.arcade.enable(this);
    this.alive = true;
    this.body.gravity.y = 2000;

    this.animCounter = 0;
    this.killCounter = 0;
    this.timeCheckBreathing = game.time.now;
};

NPC.prototype = Object.create(Phaser.Sprite.prototype);
NPC.prototype.constructor = NPC;

NPC.prototype.update = function() {
  if(this.alive == true) {
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

  if(this.moves == 'walk') {
    if(this.direction == 0) {
      this.bodyAnimation.scale.setTo(-0.14, 0.14);
      this.body.velocity.x = -this.speed;
    } else {
      this.bodyAnimation.scale.setTo(0.14, 0.14);
      this.body.velocity.x = this.speed;
    }
    this.bodyAnimation.setAnimationSpeedPercent(this.speed);
    if(this.animCounter == 0) {
      this.bodyAnimation.playAnimationByName('walk');
      this.AnimationUpdate = true;
      this.animCounter++;
    }
  } else if(this.moves == 'idle') {
    this.AnimationUpdate = false;
  }

  if(this.body.x > 1610 || this.body.x < -30) {
    this.alive = true;
    this.destroy();
    this.bodyAnimation.destroy();
  }
  }
};

Level1.prototype.createNPC = function(x, y, spriterData, speed, moves, direction) {
  
    var npc = NPCGroup;

    if (npc) {
        npc = new NPC(this.game, x, y, spriterData, speed, moves, direction);
        NPCGroup.add(npc);
    }

    return npc;
};

var Player = function(game, x, y, spriterData) {

    Phaser.Sprite.call(this, game, x, y, 'stickman_box');
    player = this;

    game.physics.enable(player, Phaser.Physics.ARCADE);
    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);

    audios(player);

    player.bodyAnimation = new Spriter.SpriterGroup(game, spriterData, "stickman_3", "Player", 0, 200);

    game.world.add(player.bodyAnimation);

    game.physics.arcade.enable(player.bodyAnimation);
    
    player.bodyAnimation.scale.setTo(0.14, 0.14);

    player.body.gravity.y = 2000;
    player.body.collideWorldBounds = true;
    game.physics.arcade.checkCollision.bottom = false;
    game.physics.arcade.checkCollision.top = false;

    player.breathing = false;
    player.jumps = 0;
    player.jumping = false;
    player.standing_up = false;
    player.doubleTapped = false;
    player.punch_damage = 1;
    player.facing = 'idle';
    player.holding = 'nothing';
    player.counter = 0;
    player.randomNumber = 0;
    player.animCounter = 0;
    player.fallCounter = 0;
    player.fallDoneCounter = 0;
    player.crouchIdleCounter = 0;
    player.coinsCounter = 0;
    player.soundCounter = 0;
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
    player.weapon.name = '';
    player.soundStart = false;
    player.weaponAmmo = 0;
    player.weaponType = 'null';

    player.coins = game.add.text(700, 10, 'Coins: ' + localStorage.getItem('score'), { font: '20px Arial', fill: '#fff' });
    player.coins.fixedToCamera = true;

  game.world.bringToTop(weapons);
  game.world.bringToTop(map_tiles_4);
  game.world.bringToTop(stuff_blocks);
  game.world.bringToTop(spawnPoint);
  //game.world.bringToTop(worldLight);

  streetLightBeam_effect.forEachAlive(function(l){
    streetLightBeam_group.add(new streetLightBeam(this.game, l.x+13, l.y+260));
  });

  new Weapons('uzi', true, player, true, 400, 100);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
  if(player.coinsCounter == 0) {
          player.coins.setText('Coins: ' + parseInt(localStorage.getItem('coins')));
          player.coinsCounter++;
        }
      
      if(player.breathing == true) {
        player.bodyAnimation.position.setTo(player.body.x+15, player.body.y+40);
      } else {
        player.bodyAnimation.position.setTo(player.body.x+15, player.body.y+45);
      }
      

      collideWithTilemap(true, player);

      if(player.AnimationUpdate == true) {
       player.bodyAnimation.updateAnimation();
       player.breathing = false;
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
          player.breathing = true;
          player.timeCheckBreathing = game.time.now;
        }
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

                  if(player.jumping == true) {
                  player.bodyAnimation.setAnimationSpeedPercent(100);
                  if(player.animCounter == 0) {
                    player.bodyAnimation.playAnimationByName('jump_loop_hold');
                    player.AnimationUpdate = true;
                    player.animCounter++;
                  }
                  }

                } else {
                  //Jump animation:
                  if(player.jumping == true) {
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

                  if(player.jumping == true) {
                  player.bodyAnimation.setAnimationSpeedPercent(100);
                  if(player.animCounter == 0) {
                    player.bodyAnimation.playAnimationByName('jump_loop_hold');
                    player.AnimationUpdate = true;
                    player.animCounter++;
                  }
                  }
                 
                } else {
                  //Jump animation:
                  if(player.jumping == true) {
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

      if(player.standing_up == false) {
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

      if(player.body.onFloor() && player.jumping == true) {
          player.jumps = 0;
          player.jumping = false;
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

      if(cursors.up && player.jumps < 5) {
        if(player.crouching != true && player.doubleTapped == false) {
          player.bodyAnimation.setAnimationSpeedPercent(200);
         
          if(player.animCounter == 0) {
            player.bodyAnimation.playAnimationByName('jump_start');
            player.AnimationUpdate = true;
            player.animCounter++;
          }

          player.body.velocity.x = 1;
          player.body.velocity.y = -1000;
          player.jumps++;
          player.jumping = true;
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
              if(player.weaponAmmo != -1){
                player.weaponAmmo--;
              }
              if(player.weapon.alive == true) {
              player.weapon.frame = 1;
              if(player.soundStart != true) {
                player.soundStart = true;
              }
              
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
              player.sound_effects['punch'].play();
              
              player.timeCheckPunching = game.time.now;
            }

            if(game.time.now - player.timeCheckPunched >= 500) {
              playerPunching = true;
              
              player.timeCheckPunched = game.time.now;
            } else {
              playerPunching = false;
            }
                
          } else {
              punched = false;
          }
        }

      } else {
        playerPunching = false;
      }
    }

    if(player.soundStart == true) {
      if(player.soundCounter == 0) {
        player.weapons_sounds[player.weapon.name].play();
        player.soundCounter++;
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
};

Level1.prototype.createPlayer = function(x, y, spriterData) {
  
    var player = playerGroup;

    if (player) {
        
        player = new Player(this.game, x, y, spriterData);
        playerGroup.add(player);
    }

    return player;
  
};
