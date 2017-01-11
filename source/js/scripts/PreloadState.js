var PreloadState = {
	preload: function() {
		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadBar');
		this.preloadBar.anchor.setTo(0.5);
		this.load.setPreloadSprite(this.preloadBar);

		this.load.atlasJSONHash('stickman_2', 'assets/sprites/stickmans/stickman_2/stickman_2.png', 'assets/sprites/stickmans/stickman_2/stickman_2.json');
		this.load.atlasJSONHash('stickman_1', 'assets/sprites/stickmans/stickman_3/stickman_3_lit.png', 'assets/sprites/stickmans/stickman_3/stickman_3.json');
    this.load.spritesheet('startButton', 'assets/buttons/startButton.png', 120, 40);
		this.load.spritesheet('helpButton', 'assets/buttons/helpButton.png', 120, 40);
		this.load.spritesheet('backButton', 'assets/buttons/backButton.png', 120, 40);
		this.load.image('healthBar_Red', 'assets/sprites/healthBar_Red.png');
		this.load.image('healthBar_Border', 'assets/sprites/healthBar_Border.png');
		this.load.image('storage_1', 'assets/structures/storage_1.png');
		this.load.physics('structures_physicsData', 'assets/structures/physicsData.json');
		this.load.tilemap('world', 'assets/tilemaps/world.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('tileset', 'assets/tilemaps/tileset.png');
		this.load.image('orb_blue', 'assets/sprites/particles/orbs/orb_blue.png');
		this.load.image('spawnPoint', 'assets/sprites/spawn_point.png');
		this.load.physics('sprites_physicsData', 'assets/sprites/physicsData.json');
		this.load.image('box_wood', 'assets/sprites/box_wood.png');
		this.load.atlasJSONHash('weapons', 'assets/sprites/weapons/weapons.png', 'assets/sprites/weapons/weapons.json');
		this.load.spritesheet('power_ups', 'assets/sprites/power_ups/power_ups.png', 50, 50);
		this.load.image('powerUp_2x', 'assets/sprites/power_ups/powerUp_2x.png');
		this.load.image('pistol', 'assets/sprites/weapons/guns/pistol.png');
		this.load.image('desert_eagle', 'assets/sprites/weapons/guns/desert_eagle.png');
		this.load.image('bullet_1', 'assets/sprites/particles/bullets/bullet_1.png');
		this.load.image('pistol_box', 'assets/sprites/power_ups/pistol_box.png');
		this.load.image('desert_eagle_box', 'assets/sprites/power_ups/desert_eagle_box.png');
		this.load.spritesheet('arrow_button', 'assets/sprites/buttons/arrow_button.png', 96, 96);
		this.load.spritesheet('button-round-a', 'assets/sprites/buttons/button-round-a.png', 96, 96);
		this.load.spritesheet('run_button', 'assets/sprites/buttons/run_button.png', 96, 96);
		this.load.spritesheet('jump_button', 'assets/sprites/buttons/jump_button.png', 96, 96);
		this.load.spritesheet('punch_button', 'assets/sprites/buttons/punch_button.png', 96, 96);
	},

	create: function() {
		this.state.start('HomeState');
	},

	update: function() {

	}
};

game.state.add('PreloadState', PreloadState);
