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

var game = new Phaser.Game(screen.CANVAS_WIDTH, screen.CANVAS_HEIGHT, Phaser.AUTO);

var BootState = {
	init: function() {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    	this.scale.pageAlignHorizontally = true;
    	this.scale.pageAlignVertically = true;
    	this.physics.startSystem(Phaser.Physics.ARCADE);
	},

	preload: function() {

		this.load.image('preloadBar', 'assets/sprites/healthBar_Red.png');
	},

	create: function() {
		this.game.stage.backgroundColor = '#000';

		this.state.start('PreloadState');
	}
};

game.state.add('BootState', BootState);



game.state.start('BootState');
//game.state.add('GameState', GameState);
game.state.add('Level1', Level1);
