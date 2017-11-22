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

window.width  = navigator.isCocoonJS  ? window.innerWidth  : screen.CANVAS_WIDTH;
window.height = navigator.isCocoonJS  ? window.innerHeight : screen.CANVAS_HEIGHT;

var game = new Phaser.Game(screen.CANVAS_WIDTH, screen.CANVAS_HEIGHT, Phaser.CANVAS);

var BootState = {
	init: function() {
    	this.physics.startSystem(Phaser.Physics.ARCADE);
	},

	preload: function() {

		this.load.image('preloadBar', 'assets/sprites/healthBar_Red.png');
	},

	create: function() {
		var ratio = getRatio('all', 320, 480);
        if (navigator.isCocoonJS) {
            this.world._container.scale.x = ratio.x;
            this.world._container.scale.y = ratio.y;
            this.world._container.updateTransform();
        } else {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.stage.scale.minWidth = 1100;
            this.stage.scale.minHeight = 550;
            this.stage.scale.pageAlignHorizontally = true;
            this.stage.scale.pageAlignVertically = true;
        }

		this.stage.backgroundColor = '#000';

		this.state.start('PreloadState');
	}
};

game.state.add('BootState', BootState);



game.state.start('BootState');
//game.state.add('GameState', GameState);
game.state.add('Level1', Level1);

GameState.prototype.createEnemy_2 = function(x, y) {
  
    var enemy = enemies.getFirstDead();

    if (enemy === null) {
        enemy = new Enemy_1(this.game, player, this.game.rnd.integerInRange(5, 20), x, y);
        enemies.add(enemy);
    }

    enemy.revive();

    return enemy;
};

GameState.prototype.showerEnemies = function (x, y) {
  
  var enemy = enemies;

  this.game.add.existing(
    enemy = new Enemy_1(this.game, player, this.game.rnd.integerInRange(5, 20))
  );

  enemy.x = x;
  enemy.y = y;

  return enemy;
};

  this.MAX_ENEMIES = 1;
	this.MAX_STUFF_BLOCKS = 3;
	this.GRAVITY = 2000;
	this.ENEMIES_COUNTER = 0;

/*game.debug.body(player);
      enemies.forEachAlive(function(e){
        game.debug.body(e);
      });*/
      /*game.debug.text(game.time.fps, 500, 20, { font: '50px Arial', fill: '#fff' });
      game.debug.cameraInfo(game.camera, 32, 32);*/

      /* blueOrb = game.add.emitter(sp.body.x+90, sp.body.y, 200),

      blueOrb.makeParticles('orb_blue'),

      blueOrb.setRotation(0, 0),
      blueOrb.setAlpha(0.3, 0.8),
      blueOrb.setScale(0.5, 1),
      blueOrb.gravity = -200,
      game.physics.arcade.enable(blueOrb),

      blueOrb.start(false, 5000, 100);*/
