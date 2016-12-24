var HomeState = {
	preload: function() {
	},

	create: function() {
		this.preloadBar2 = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadBar');
        this.preloadBar2.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar2);

		textStyle = { font: '18px Arial', fill: '#fff' };

	    this.startButton = this.add.button(this.game.world.centerX, this.game.world.centerY, 'startButton', preStartGame, this, 1, 0, 2);
	    this.startButton.anchor.set(0.5);
			this.helpButton = this.add.button(this.game.world.centerX, this.game.world.centerY+50, 'helpButton', getHelpBtn, this, 1, 0, 2);
	    this.helpButton.anchor.set(0.5);
	},

	update: function() {
	}
};

function preStartGame() {
		this.startButton.destroy();
		this.helpButton.destroy();
	  startGame();
}

function startGame() {
	game.state.start('Level1');
}


function getHelpBtn() {
    bgBlack = game.add.sprite(0, 0, 'black');
    getHelp = game.add.text(10, 10, '', { font: '30px Arial', fill: '#fff' });
    getHelp.fixedToCamera = true;
    getHelp.setText('Move Right = RIGHT ARROW;\nMove Left = LEFT ARROW;\nJump = SPACEBAR;\nDouble Jump = SPACEBAR + SPACEBAR;\nTriple Jump = SPACEBAR + SPACEBAR + SPACEBAR;\nSprint = SHIFT;');
    backButton = game.add.button(480, game.world.height*0.6, 'backButton', closeHelp, this, 1, 0, 2);
    backButton.anchor.set(0.5);
}

function closeHelp() {
    bgBlack.destroy();
    backButton.destroy();
    getHelp.setText('');
}

game.state.add('HomeState', HomeState);
