var width = navigator.isCocoonJS ? window.innerWidth : 1100,
height = navigator.isCocoonJS ? window.innerHeight : 550, game;

var game = new Phaser.Game(width, height, Phaser.CANVAS);

var BootState = {
	init: function() {
    	this.scale.pageAlignHorizontally = true;
    	this.scale.pageAlignVertically = true;
    	this.physics.startSystem(Phaser.Physics.ARCADE);
	},

	preload: function() {

		this.load.image('preloadBar', 'assets/sprites/healthBar_Red.png');
	},

	create: function() {
		var ratio = getRatio('all', 1100, 550);
        if (navigator.isCocoonJS) {
            this.world._container.scale.x = ratio.x;
            this.world._container.scale.y = ratio.y;
            this.world._container.updateTransform();
        } else {
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.stage.scale.minWidth = 1100;
            this.stage.scale.minHeight = 550;
            this.stage.scale.pageAlignHorizontally = true;
        }

		this.stage.backgroundColor = '#000';

		this.state.start('PreloadState');
	}
};

game.state.add('BootState', BootState);



game.state.start('BootState');
//game.state.add('GameState', GameState);
game.state.add('Level1', Level1);
