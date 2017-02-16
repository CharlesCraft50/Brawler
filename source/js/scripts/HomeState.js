var HomeState = {
	preload: function() {
        this.load.image('background', 'assets/designs/background.jpg');
	},

	create: function() {
		
		background = game.add.image(0, 0, 'background');
		this.preloadBar2 = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadBar');
        this.preloadBar2.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar2);

		textStyle = { font: '18px Arial', fill: '#fff' };

	    startButton = game.add.button(this.game.world.centerX+330, this.game.world.centerY, 'startButton', null, this, 1, 0, 2);
	    startButton.anchor.set(0.5);
  		startButton.fixedToCamera = true;
  		startButton.events.onInputOver.add(preStartGame);
 		startButton.events.onInputDown.add(preStartGame);

 		shopButton = game.add.button(this.game.world.centerX+330, this.game.world.centerY+80, 'shopButton', null, this, 1, 0, 2);
	    shopButton.anchor.set(0.5);
  		shopButton.fixedToCamera = true;
  		shopButton.events.onInputOver.add(shopOpen);
 		shopButton.events.onInputDown.add(shopOpen);

  		helpButton = game.add.button(this.game.world.centerX+330, this.game.world.centerY+160, 'helpButton', null, this, 1, 0, 2);
	    helpButton.anchor.set(0.5);
  		helpButton.fixedToCamera = true;
  		helpButton.events.onInputOver.add(getHelpBtn);
 		helpButton.events.onInputDown.add(getHelpBtn);

 		if(localStorage.getItem('coins') === undefined || localStorage.getItem('coins') === null) {
			coinsValue = localStorage.setItem('coins', '0');
		} else {
			coinsValue = localStorage.getItem('coins');
		}

		if(localStorage.getItem('healthBarLevel') === undefined || localStorage.getItem('healthBarLevel') === null) {
			healthBarLevel = localStorage.setItem('healthBarLevel', '-100');
		} else {
			healthBarLevel = localStorage.getItem('healthBarLevel');
		}
	},

	update: function() {

	}
};

function preStartGame() {
	startButton.destroy();
	helpButton.destroy();
	background.destroy();
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

function shopOpen() {
	shopArea = game.add.image(0, 0, 'ShopArea');
	startButton.visible = false;
	helpButton.visible = false;
	background.visible = false;
	coins = game.add.text(800, 10, 'Coins: ' + coinsValue, { font: '30px Arial', fill: '#fff' });

	closeButton = game.add.button(940, 20, 'closeButton', null, this, 1, 0, 2);
	closeButton.anchor.set(0.5);
	closeButton.scale.setTo(0.2, 0.2);
  	closeButton.fixedToCamera = true;
  	closeButton.events.onInputOver.add(function(){game.state.start('HomeState');});
 	closeButton.events.onInputDown.add(function(){game.state.start('HomeState');});

 	//Upgrades:

 	healthLevelUpgrade_Text = game.add.text(30, 120, 'Health Level: ', { font: '20px Arial', fill: '#fff' });
 	Upgrade_HealthBarLevel_Bar = game.add.sprite(30, 150, 'upgradesBar_Green');
 	game.physics.arcade.enable(Upgrade_HealthBarLevel_Bar);
 	Upgrade_HealthBarLevel_Border = game.add.sprite(30, 150, 'upgradesBar_Border');
 	Upgrade_HealthBarLevel_Plus = game.add.button(250, 165, 'plusButton', null, this);
	Upgrade_HealthBarLevel_Plus.anchor.set(0.5);
 	Upgrade_HealthBarLevel_Plus.fixedToCamera = true;
  	Upgrade_HealthBarLevel_Plus.events.onInputOver.add(function(){
  		subtractCoins(2); 

  		localStorage.setItem('healthBarLevel', parseInt(healthBarLevel) + 100);
  		console.log(healthBarLevel);
  		Upgrade_HealthBarLevel_Bar.scale.x += 1;
  	});
 	Upgrade_HealthBarLevel_Plus.events.onInputDown.add(function(){subtractCoins(2)});
}

function subtractCoins(num) {
	a = parseInt(coinsValue) - num;

	b = localStorage.setItem('coins', a.toString());
	coins.setText('Coins: ' + localStorage.getItem('coins'));

	return b;
}

game.state.add('HomeState', HomeState);
