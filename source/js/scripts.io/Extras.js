//Create:
enemies_1 = game.add.group();
world.createFromObjects('stickmans', 14, 'stickman_2', 0, true, false, enemies_1);

enemies_1.forEachAlive(function(enm){
  enm.health = 5,
  enm.punching = false,
  game.physics.p2.enable(enm),
  enm.animations.add('left', Phaser.Animation.generateFrameNames('walk/left_', 1, 8), 10, true),
  enm.animations.add('right', Phaser.Animation.generateFrameNames('walk/right_', 1, 8), 10, true),
  enm.animations.add('sprint_left', Phaser.Animation.generateFrameNames('walk/left_', 1, 8), 20, true),
  enm.animations.add('sprint_right', Phaser.Animation.generateFrameNames('walk/right_', 1, 8), 20, true),

  enm.animations.add('punch_1_left_1', Phaser.Animation.generateFrameNames('punch_1/left_', 1, 1), 5, true),
  enm.animations.add('punch_1_left_2', Phaser.Animation.generateFrameNames('punch_1/left_', 2, 2), 5, true),
  enm.animations.add('punch_1_left_3', Phaser.Animation.generateFrameNames('punch_1/left_', 3, 3), 5, true),
  enm.animations.add('punch_1_left_4', Phaser.Animation.generateFrameNames('punch_1/left_', 4, 4), 5, true),

  enm.animations.add('punch_1_right_1', Phaser.Animation.generateFrameNames('punch_1/right_', 1, 1), 5, true),
  enm.animations.add('punch_1_right_2', Phaser.Animation.generateFrameNames('punch_1/right_', 2, 2), 5, true),
  enm.animations.add('punch_1_right_3', Phaser.Animation.generateFrameNames('punch_1/right_', 3, 3), 5, true),
  enm.animations.add('punch_1_right_4', Phaser.Animation.generateFrameNames('punch_1/right_', 4, 4), 5, true),

  enm.checkWorldBounds = true,
  enm.body.collideWorldBounds = true,

  enm.body.fixedRotation = true,
  enm.body.damping = 0.5,
  enm.body.setCollisionGroup(enemies_1ColisionGroup),
  enm.body.collides(blockCollisionGroup),
  enm.healthBar = game.add.text(0, 0, enm.health, {font: "10px Arial", fill: "#ffffff"});
  enm.addChild(enm.healthBar);
});

//Update:
enemies_1.forEachAlive(function(enm) {
  if(enm.health > 0) {
    enm.punchedCount = 0,
    enm.body.gravity.y = 0,
    enm.body.gravity.x = 0;
    //<Enemy_Punch>
    if(checkOverlap(enm, player)) {
      if(playerPunching == true){enm.body.x += 30; enm.health -= 1;}else{playerPunching = false;}
      if(enm.facing == 'left') {
      enm.animations.play('punch_1_left_1');
      if(enm.punchedCount == 0) {
        enm.animations.play('punch_1_left_1');
        setTimeout(function(){enm.punchedCount = 1;}, 0);
      } else if(enm.punchedCount == 1) {
        enm.animations.play('punch_1_left_2');
        setTimeout(function(){enm.punchedCount = 2;}, 100);
      } else if(enm.punchedCount == 2) {
        enm.animations.play('punch_1_left_3');
        setTimeout(function(){enm.punchedCount = 3;}, 100);
      } else if(enm.punchedCount == 3) {
        enm.animations.play('punch_1_left_4');
        enm.punching = true;
        setTimeout(function(){enm.punchedCount = 4;}, 100);
      } else {
        enm.punchedCount = 0;
        enm.punching = true;
      }
    } else {
      enm.animations.play('punch_1_right_1');
      if(enm.punchedCount == 0) {
        enm.animations.play('punch_1_right_1');
        setTimeout(function(){enm.punchedCount = 1;}, 0);
      } else if(enm.punchedCount == 1) {
        enm.animations.play('punch_1_right_2');
        setTimeout(function(){enm.punchedCount = 2;}, 100);
      } else if(enm.punchedCount == 2) {
        enm.animations.play('punch_1_right_3');
        setTimeout(function(){enm.punchedCount = 3;}, 100);
      } else if(enm.punchedCount == 3) {
        enm.animations.play('punch_1_right_4');
        enm.punching = true;
        setTimeout(function(){enm.punchedCount = 4;}, 100);
      } else {
        enm.punchedCount = 0;
        enm.punching = true;
      }
    }
    } else {
      enm.punching = false;
      accelerateToObject(enm, player, 200);
      if(enm.body.velocity.x < 0 && enm.body.velocity.y < 150 && enm.body.velocity.y > 0) {
        enm.animations.play('left');
        enm.facing = 'left';
      } else if(enm.body.velocity.x > 0 && enm.body.velocity.y < 150 && enm.body.velocity.y > 0) {
        enm.animations.play('right');
        enm.facing = 'right';
      }
    }
    //</Enemy_Punch>
    if(enm.punching != false){}
    enm.healthBar.setText(enm.health);
  } else {
    enm.destroy();
  }
});

//if(this.enemy.facing == 'left')
this.enemy.animations.play('punch_1_left_1');
if(this.punchedCount == 0) {
  this.enemy.animations.play('punch_1_left_1');
  setTimeout(function(){this.punchedCount = 1;}, 0);
} else if(this.punchedCount == 1) {
  this.enemy.animations.play('punch_1_left_2');
  setTimeout(function(){this.punchedCount = 2;}, 100);
} else if(this.punchedCount == 2) {
  this.enemy.animations.play('punch_1_left_3');
  setTimeout(function(){this.punchedCount = 3;}, 100);
} else if(this.punchedCount == 3) {
  this.enemy.animations.play('punch_1_left_4');
  this.enemy.punching = true;
  setTimeout(function(){this.punchedCount = 4;}, 100);
} else {
  this.punchedCount = 0;
  this.enemy.punching = true;
}
//else
this.enemy.animations.play('punch_1_right_1');
if(this.punchedCount == 0) {
  this.enemy.animations.play('punch_1_right_1');
  setTimeout(function(){this.punchedCount = 1;}, 0);
} else if(this.punchedCount == 1) {
  this.enemy.animations.play('punch_1_right_2');
  setTimeout(function(){this.punchedCount = 2;}, 100);
} else if(this.punchedCount == 2) {
  this.enemy.animations.play('punch_1_right_3');
  setTimeout(function(){this.punchedCount = 3;}, 100);
} else if(this.punchedCount == 3) {
  this.enemy.animations.play('punch_1_right_4');
  this.enemy.punching = true;
  setTimeout(function(){this.punchedCount = 4;}, 100);
} else {
  this.punchedCount = 0;
  this.enemy.punching = true;
}

//Enemy_1
Enemy_1 = function (index, game, player) {

    var x = game.world.randomX;
    var y = game.world.randomY-50;

    this.game = game;
    this.health = Math.floor((Math.random() * 20) + 5);
    this.player = player;
    this.alive = true;
    this.punchedCount = 0;

    this.enemy = game.add.sprite(x, y, 'stickman_2');

    this.enemy.name = index.toString();
    this.enemy.punching = false;
    this.enemy.jumpCount = 0;
    game.physics.p2.enable(this.enemy);
    this.enemy.animations.add('left', Phaser.Animation.generateFrameNames('walk/left_', 1, 8), 10, true);
    this.enemy.animations.add('right', Phaser.Animation.generateFrameNames('walk/right_', 1, 8), 10, true);
    this.enemy.animations.add('sprint_left', Phaser.Animation.generateFrameNames('walk/left_', 1, 8), 20, true);
    this.enemy.animations.add('sprint_right', Phaser.Animation.generateFrameNames('walk/right_', 1, 8), 20, true);

    this.enemy.animations.add('punch_1_left', Phaser.Animation.generateFrameNames('punch_1/left_', 1, 4), 20, true);

    this.enemy.animations.add('punch_1_right', Phaser.Animation.generateFrameNames('punch_1/right_', 1, 4), 20, true);

    this.enemy.checkWorldBounds = true;
    this.enemy.body.collideWorldBounds = true;

    this.enemy.body.fixedRotation = true;
    this.enemy.body.damping = 0.5;
    this.enemy.body.setCollisionGroup(enemies_1ColisionGroup);
    this.enemy.body.collides(blockCollisionGroup);
    this.enemy.body.collides(objectsCollisionGroup, function(){enemies[this.enemy.name].jump();}.bind(this));
    this.enemy.healthBar = game.add.text(0, 0, 'HP: ' + this.health + '%', {font: "10px Arial", fill: "#ffffff"});
    this.enemy.addChild(this.enemy.healthBar);
    this.enemy.healthBar.position.y = this.enemy.healthBar.position.y-80;
    game.world.bringToTop(this.player);
    game.world.bringToTop(this.enemy);
    game.world.bringToTop(spawnPoint);
};


Enemy_1.prototype.damage = function() {
    this.health -= 1;

    if (this.health <= 0)
    {
        this.alive = false;
        this.enemy.kill();
        return true;
    }

    return false;
};

Enemy_1.prototype.punch = function () {
  if(this.enemy.facing == 'left') {
      this.enemy.animations.play('punch_1_left');
      this.enemy.punching = true;
      if(this.player.facing == 'left') {
        this.player.body.x += 1;
      } else {
        this.player.body.x -= 1;
      }
  } else {
      this.enemy.animations.play('punch_1_right');
      this.enemy.punching = true;
  }
};

Enemy_1.prototype.jump = function () {
  if(checkIfCanJump(this.enemy)) {
    if(this.enemy.jumpCount == 0) {
      this.enemy.body.moveUp(300);
      this.enemy.jumpCount = 1;
    } else {
      this.enemy.body.moveUp(380);
      this.enemy.jumpCount = 0;
    }
  }
};

Enemy_1.prototype.createEnemy = function () {
  enemyFirst = enemies[this.enemy.name].getFirstExists(false);

    if (enemy)
    {
        enemyFirst.revive();
    }
};

Enemy_1.prototype.move = function () {
  if(getPowDistance(this.enemy.body.x, this.enemy.body.y, this.player.body.x, this.player.body.y) < 10000) {
  if(this.enemyMoves != false) {
    if(this.enemy.body.velocity.x < 0 && this.enemy.body.velocity.y < 150 && this.enemy.body.velocity.y > 0) {
      this.enemy.animations.play('left');
      this.enemy.facing = 'left';
    } else if(this.enemy.body.velocity.x > 0 && this.enemy.body.velocity.y < 150 && this.enemy.body.velocity.y > 0) {
      this.enemy.animations.play('right');
      this.enemy.facing = 'right';
    }
  }
} else if(getPowDistance(this.enemy.body.x, this.enemy.body.y, this.player.body.x, this.player.body.y) < 300000) {
  if(this.enemyMoves != false) {
    accelerateToObject(this.enemy, this.player, 300);
    if(this.enemy.body.velocity.x < 0 && this.enemy.body.velocity.y < 150 && this.enemy.body.velocity.y > 0) {
      this.enemy.animations.play('left');
      this.enemy.facing = 'left';
    } else if(this.enemy.body.velocity.x > 0 && this.enemy.body.velocity.y < 150 && this.enemy.body.velocity.y > 0) {
      this.enemy.animations.play('right');
      this.enemy.facing = 'right';
    }
  }
} else {
    accelerateToObject(this.enemy, this.player, 500);
    if(this.enemy.body.velocity.x < 0 && this.enemy.body.velocity.y < 150 && this.enemy.body.velocity.y > 0) {
      this.enemy.animations.play('sprint_left');
      this.enemy.facing = 'left';
    } else if(this.enemy.body.velocity.x > 0 && this.enemy.body.velocity.y < 150 && this.enemy.body.velocity.y > 0) {
      this.enemy.animations.play('sprint_right');
      this.enemy.facing = 'right';
    }
  }
}

Enemy_1.prototype.update = function() {
  game.debug.body(this.enemy);
  this.enemyMoves = false;
  //<Enemy_Punch>
  if(checkOverlap(this.enemy, player)) {
    if(playerPunching == true){
      if(this.enemy.body.velocity.x < 0 && this.enemy.body.velocity.y < 150 && this.enemy.body.velocity.y > 0) {
        this.enemy.body.x += 30;
      } else if(this.enemy.body.velocity.x > 0 && this.enemy.body.velocity.y < 150 && this.enemy.body.velocity.y > 0) {
        this.enemy.body.x -= 30;
      }
      enemies[this.enemy.name].damage();
    } else {
      playerPunching = false;
    }
    game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){enemies[this.enemy.name].punch();}, this);
  } else {
    this.enemy.punching = false;
    this.enemyMoves = true;
    enemies[this.enemy.name].move();
  }
  //</Enemy_Punch>
  if(this.enemy.punching != false) {
  playerSubtractHealthBar(0.5);
  }
  this.enemy.healthBar.setText('HP: ' + this.health + '%');
};

//Deploy Enemy_1
//Create:
//enemiesTotal = 3;
//enemiesAlive = enemiesTotal;

/*for (var i = 0; i < enemiesTotal; i++)
{
    enemies.push(new Enemy_1(i, game, player));
}*/
//Update:
/*enemiesAlive = 0;
for (var i = 0; i < enemies.length; i++) {
  if (enemies[i].alive)
  {
      enemiesAlive++;
      enemies[i].update();
  }
}*/

/** Config part */
var FIXED_SIZE    = 600;
var FIXED_MEASURE = 'Height';

/** Name maping */
var fixedName  = FIXED_MEASURE;
var resName    = fixedName === 'Height' ? 'Width' : 'Height';
var FIXED_NAME = fixedName.toUpperCase();
var RES_NAME   = resName.toUpperCase();

/** Measures of document */
var documentElement = document.documentElement;
var documentFixed   = documentElement['client' + fixedName];
var documentRes     = documentElement['client' + resName];
var ratio           = documentRes / documentFixed;

/** Canvas measures */
var canvasFixed = FIXED_SIZE;
var canvasRes   = FIXED_SIZE * ratio;

var screen = {};
screen['CANVAS_' + FIXED_NAME] = canvasFixed;
screen['CANVAS_' + RES_NAME] = canvasRes;

/* Fix for CocoonJS */
window.width  = navigator.isCocoonJS  ? window.innerWidth  : screen.CANVAS_WIDTH;
window.height = navigator.isCocoonJS  ? window.innerHeight : screen.CANVAS_HEIGHT;

(function() {
    'use strict';
    var width = navigator.isCocoonJS ? window.innerWidth : 320,
        height = navigator.isCocoonJS ? window.innerHeight : 480,
        game, nanoha;
    game = new Phaser.Game(width, height, Phaser.WEBGL, '', {
        preload: preload,
        create: create,
        update: update
    });

    function preload() {
        game.load.image('bg', 'assets/bg.png');
        game.load.image('nanoha', 'assets/nanoha.png');
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

    function create() {
        var ratio = getRatio('all', 320, 480);
        if (navigator.isCocoonJS) {
            game.world._container.scale.x = ratio.x;
            game.world._container.scale.y = ratio.y;
            game.world._container.updateTransform();
        } else {
            game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
            game.stage.scale.minWidth = 320;
            game.stage.scale.minHeight = 480;
            game.stage.scale.pageAlignHorizontally = true;
            game.stage.scale.setScreenSize(true);
        }
        game.add.sprite(0, 0, 'bg');
        nanoha = game.add.sprite(160, 240, 'nanoha');
        nanoha.anchor.x = 0.5;
        nanoha.anchor.y = 0.5;
    }

    function update() {
        nanoha.angle -= 2;
    }
})();

this.target.bodyAnimation.onPointUpdated.add(function (spriter, pointObj) {
        var transformed = pointObj.transformed;
        // add SpriterGroups position and angle, bacause _item is in world space, but transformed values are in SpriterGroup local space
        
        // magic number 62.477 is initial angle of hand image in spriter animation. Compensate here to keep _item (book) more or less vertical
        // if _item was something like gun or sword, it would look good without this compensation
        //this.angle = spriter.angle - 62.447 + transformed.angle;
        if(this.target.facing == 'left') {
          this.scale.x = -1;
          
          if(player.fallCounter > 0 || jumping == true) {
            this.position.set(player.x + transformed.x + player.bodyAnimation.x - player.bodyAnimation.x - 260, player.y + transformed.y + player.bodyAnimation.y - player.bodyAnimation.y - 70);
          } else {
            this.position.set(player.x + transformed.x + player.bodyAnimation.x - player.bodyAnimation.x - 260, player.y + transformed.y + player.bodyAnimation.y - player.bodyAnimation.y - 145);
          }
        } else {
          this.scale.x = 1;
          if(player.fallCounter > 0 || jumping == true) {
            this.position.set(player.x + transformed.x + player.bodyAnimation.x + player.bodyAnimation.x - 175, player.y + transformed.y + player.bodyAnimation.y - player.bodyAnimation.y - 70);
          } else {
            this.position.set(player.x + transformed.x + player.bodyAnimation.x + player.bodyAnimation.x - 175, player.y + transformed.y + player.bodyAnimation.y - player.bodyAnimation.y - 145);
          }
          
        }
    }, this);

/*Weapon scale to left/right:
    if(this.target.facing == 'left') {
      this.scale.x = -1;
      this.body.x = this.target.body.x-40;
      if(this.target.upsidedown == true) {
        this.body.y = this.target.body.y+45;
      } else {
        this.body.y = this.target.body.y+20;
      }
    } else {
      this.scale.x = 1;
      this.body.x = this.target.body.x+40;
      if(this.target.upsidedown == true) {
        this.body.y = this.target.body.y+45;
      } else {
        this.body.y = this.target.body.y+20;
      }
    }

    if(this.target != player) {
      if(this.target.upsidedown == true) {
        this.body.y = this.target.body.y+75;
      } else {
        this.body.y = this.target.body.y+50;
      }
    }*/