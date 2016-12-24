var PreloadState = {
	preload: function() {
		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadBar');
		this.preloadBar.anchor.setTo(0.5);
		this.load.setPreloadSprite(this.preloadBar);

		this.load.atlasJSONHash('stickman_2', 'assets/stickmans/stickman_2/stickman_2.png', 'assets/stickmans/stickman_2/stickman_2.json');
		this.load.atlasJSONHash('stickman_1', 'assets/stickmans/stickman_3/stickman_3.png', 'assets/stickmans/stickman_3/stickman_3.json');
    this.load.spritesheet('startButton', 'assets/buttons/startButton.png', 120, 40);
		this.load.spritesheet('helpButton', 'assets/buttons/helpButton.png', 120, 40);
		this.load.spritesheet('backButton', 'assets/buttons/backButton.png', 120, 40);
		this.load.image('healthBar_Red', 'assets/sprites/healthBar_Red.png');
		this.load.image('healthBar_Border', 'assets/sprites/healthBar_Border.png');
		this.load.image('storage_1', 'assets/structures/storage_1.png');
		this.load.physics('structures_physicsData', 'assets/structures/physicsData.json');
		this.load.tilemap('world', 'assets/tilemaps/world.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('tileset', 'assets/tilemaps/tileset.png');
		this.load.image('orb_blue', 'assets/particles/orbs/orb_blue.png');
		this.load.image('spawnPoint', 'assets/sprites/spawn_point.png');
		this.load.physics('sprites_physicsData', 'assets/sprites/physicsData.json');
		this.load.image('box_wood', 'assets/sprites/box_wood.png');
	},

	create: function() {
		this.state.start('HomeState');
	},

	update: function() {

	}
};

game.state.add('PreloadState', PreloadState);
