var HomeState = {
	preload: function() {
	},

	create: function() {
		this.preloadBar2 = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadBar');
        this.preloadBar2.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar2);

		textStyle = { font: '18px Arial', fill: '#fff' };

	    startButton = game.add.button(this.game.world.centerX, this.game.world.centerY, 'startButton', null, this, 1, 0, 2);
	    startButton.anchor.set(0.5);
  		startButton.fixedToCamera = true;
  		startButton.events.onInputOver.add(preStartGame);
 		startButton.events.onInputDown.add(preStartGame);

  		helpButton = game.add.button(this.game.world.centerX, this.game.world.centerY+50, 'helpButton', null, this, 1, 0, 2);
	    helpButton.anchor.set(0.5);
  		helpButton.fixedToCamera = true;
  		helpButton.events.onInputOver.add(getHelpBtn);
 		helpButton.events.onInputDown.add(getHelpBtn);
	},

	update: function() {
	}
};

function preStartGame() {
	startButton.destroy();
	helpButton.destroy();
	startGame();
}

function startGame() {
	game.state.start('Level1');
}


function getHelpBtn() {
    getHelp = game.add.text(10, 10, '', { font: '30px Arial', fill: '#fff' });
    getHelp.fixedToCamera = true;
    getHelp.setText('Move Right = RIGHT ARROW;\nMove Left = LEFT ARROW;\nJump = SPACEBAR;\nDouble Jump = SPACEBAR + SPACEBAR;\nTriple Jump = SPACEBAR + SPACEBAR + SPACEBAR;\nSprint = SHIFT;');
    backButton = game.add.button(game.world.centerX, game.world.height*0.7, 'backButton', null, this, 1, 0, 2);
    backButton.anchor.set(0.5);
    backButton.fixedToCamera = true;
    backButton.events.onInputOver.add(function(){game.state.start('HomeState');});
 	backButton.events.onInputDown.add(function(){game.state.start('HomeState');});
}

game.state.add('HomeState', HomeState);
