var coins;
var HomeState = {
	preload: function() {
        this.load.image('background', 'assets/designs/background.jpg');
	},

	create: function() {
		
		background = game.add.image(100, 0, 'background');
		background.scale.setTo(0.46, 0.46);
		this.preloadBar2 = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadBar');
        this.preloadBar2.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar2);

		textStyle = { font: '18px Arial', fill: '#fff' };

	    startButton = game.add.button(this.game.world.centerX+330, this.game.world.centerY, 'startButton', null, this);
	    startButton.anchor.set(0.5);
  		startButton.fixedToCamera = true;
  		startButton.events.onInputUp.add(preStartGame);

 		shopButton = game.add.button(this.game.world.centerX+330, this.game.world.centerY+80, 'shopButton', null, this);
	    shopButton.anchor.set(0.5);
  		shopButton.fixedToCamera = true;
  		shopButton.events.onInputUp.add(shopOpen);

  		helpButton = game.add.button(this.game.world.centerX+330, this.game.world.centerY+160, 'helpButton', null, this);
	    helpButton.anchor.set(0.5);
  		helpButton.fixedToCamera = true;
  		helpButton.events.onInputUp.add(getHelpBtn);

 		if(localStorage.getItem('coins') === undefined || localStorage.getItem('coins') === null || localStorage.getItem('coins') === NaN) {
			coinsValue = localStorage.setItem('coins', '0');
		} else {
			coinsValue = localStorage.getItem('coins');
			
		}

		if(localStorage.getItem('healthBarLevel') === undefined || localStorage.getItem('healthBarLevel') === null) {
			healthBarLevel = localStorage.setItem('healthBarLevel', JSON.stringify({health: -100, level: 0}));
		} else {
			healthBarLevel = localStorage.getItem('healthBarLevel');
			//localStorage.setItem('healthBarLevel', JSON.stringify({health: -100, level: 0}));
		}
	},

	update: function() {

	}
};

var RestartState = {
	create: function() {
		game.state.start('BootState');
		setTimeout(function(){preStartGame();}, 10);
	}
};

function preStartGame() {
	startButton.destroy();
	helpButton.destroy();
	background.destroy();
	vjoyAlive = true;
	startGame();
}

function startGame() {
	game.state.start('GameState');
}


function getHelpBtn() {
    getHelp = game.add.bitmapText(10, 10, 'BatmanForeverOutline', '', 30);
    getHelp.fixedToCamera = true;
    getHelp.setText('Get the blue orbs to get power ups \nor weapons.');
    backButton = game.add.button(game.world.centerX, game.world.height*0.7, 'backButton', null, this);
    backButton.anchor.set(0.5);
    backButton.fixedToCamera = true;
    backButton.events.onInputUp.add(function(){game.state.start('HomeState');});
}

function shopOpen() {
	game.state.start('ShopState');
	game.state.states['ShopState'].healthBarLevel = localStorage.getItem('healthBarLevel');
}

coins = {
	subtract: function(num) {
		coins.subtractCounter = 0;
		coins.number = num;

		return coins.number;
	},

	add: function(num) {
		coins.addCounter = 0;
		coins.number = num;

		return coins.number;
	},

	value: function() {
		a = localStorage.getItem('coins');

		return a;
	}
};

var ShopState = {
	create: function() {
	shopArea = game.add.image(0, 0, 'ShopArea');
	shopArea.scale.setTo(1.22, 1);
	startButton.visible = false;
	helpButton.visible = false;
	background.visible = false;
	coins.text = game.add.bitmapText(790, 10, 'BatmanForeverOutline', 'Coins: ' + coinsValue, 30);

	closeButton = game.add.button(990, 20, 'closeButton', null, this);
	closeButton.anchor.set(0.5);
	closeButton.scale.setTo(0.2, 0.2);
  	closeButton.fixedToCamera = true;
  	closeButton.events.onInputUp.add(function(){game.state.start('HomeState');});

 	//Upgrades:

 	healthLevelUpgrade_Text = game.add.bitmapText(30, 120, 'BatmanForeverAlternate', 'Health Level: ', 20);
 	Upgrade_HealthBarLevel_Bar = game.add.sprite(30, 150, 'upgradesBar_Green');
 	game.physics.arcade.enable(Upgrade_HealthBarLevel_Bar);
	Upgrade_HealthBarLevel_Bar.scale.x = JSON.parse(healthBarLevel).level; 

 	Upgrade_HealthBarLevel_Border = game.add.sprite(30, 150, 'upgradesBar_Border');
 	Upgrade_HealthBarLevel_Plus = game.add.button(250, 165, 'plusButton', null, this);
	Upgrade_HealthBarLevel_Plus.anchor.set(0.5);
 	Upgrade_HealthBarLevel_Plus.fixedToCamera = true;
  	Upgrade_HealthBarLevel_Plus.events.onInputUp.add(function(){
	if(JSON.parse(healthBarLevel).level <= 4.324) {
  		coins.subtract(2); 

		Upgrade_HealthBarLevel_Bar.scale.x += 0.871;
  		localStorage.setItem('healthBarLevel', JSON.stringify( { health: JSON.parse(healthBarLevel).health+50, level: JSON.parse(healthBarLevel).level+0.871 } ));

		game.state.start('HomeState');
		setTimeout(function(){game.state.start('ShopState');}, 50);
	}
  	});

	},

	update: function() {
		if(coins.addCounter == 0) {
			a = parseInt(coinsValue) + coins.number;
			b = localStorage.setItem('coins', a.toString());
			coins.text.setText('Coins: ' + localStorage.getItem('coins'));
			coins.addCounter++;
		}

		if(coins.subtractCounter == 0) {
			a = parseInt(coinsValue) - coins.number;
			b = localStorage.setItem('coins', a.toString());
			coins.text.setText('Coins: ' + localStorage.getItem('coins'));
			coins.subtractCounter++;
		}
	}
};

game.state.add('HomeState', HomeState);
game.state.add('ShopState', ShopState);
game.state.add('RestartState', RestartState);
