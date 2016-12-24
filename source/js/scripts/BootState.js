var game = new Phaser.Game(1100, 550, Phaser.AUTO);

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
