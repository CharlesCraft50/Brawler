var PreloadState = {
	preload: function() {
		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadBar');
		this.preloadBar.anchor.setTo(0.5);
		this.load.setPreloadSprite(this.preloadBar);

    	this.load.atlas('stickman_1', 'assets/sprites/stickmans/stickman_1/atlas_3.png', 'assets/sprites/stickmans/stickman_1/atlas.json');
    	this.load.atlasJSONHash('stickman_22', 'assets/sprites/stickmans/stickman_2/stickman_2_lit.png', 'assets/sprites/stickmans/stickman_2/stickman_2.json');
    	this.load.atlas('stickman_2', 'assets/sprites/stickmans/stickman_1/atlas_2.png', 'assets/sprites/stickmans/stickman_1/atlas.json');
    	this.load.json('stickman_animations', 'assets/sprites/stickmans/stickman_1/anims.json');
    	this.load.image('stickman_box', 'assets/sprites/stickmans/stickman_1/stickman.png');
    	this.load.image('startButton', 'assets/buttons/startButton.png');
		this.load.image('helpButton', 'assets/buttons/helpButton.png');
		this.load.image('backButton', 'assets/buttons/backButton.png');
		this.load.image('healthBar_Red', 'assets/sprites/healthBar_Red.png');
		this.load.image('healthBar_Border', 'assets/sprites/healthBar_Border.png');
		this.load.tilemap('map', 'assets/tilemaps/map.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('tileset', 'assets/tilemaps/tileset.png');
		this.load.image('orb_blue', 'assets/sprites/particles/orbs/orb_blue.png');
		this.load.image('orb_magical_blue', 'assets/sprites/particles/orbs/orb_magical_blue.png');
		this.load.image('orb_magical_orange', 'assets/sprites/particles/orbs/orb_magical_orange.png');
		this.load.image('spawnPoint', 'assets/sprites/spawn_point.png');
		this.load.image('box_wood', 'assets/sprites/box_wood.png');
		this.load.atlasJSONHash('weapons', 'assets/sprites/weapons/weapons.png', 'assets/sprites/weapons/weapons.json');
		this.load.spritesheet('power_ups', 'assets/sprites/power_ups/power_ups.png', 50, 50);
		this.load.image('powerUp_2x', 'assets/sprites/power_ups/powerUp_2x.png');
		this.load.spritesheet('pistol', 'assets/sprites/weapons/guns/pistol.png', 40, 21);
		this.load.spritesheet('desert_eagle', 'assets/sprites/weapons/guns/desert_eagle.png', 45, 33);
		this.load.spritesheet('null_gravity', 'assets/sprites/weapons/guns/null_gravity.png', 49, 25);
		this.load.spritesheet('uzi', 'assets/sprites/weapons/guns/uzi.png', 44, 33);
		this.load.image('bullet_1', 'assets/sprites/particles/bullets/bullet_1.png');
		this.load.image('pistol_box', 'assets/sprites/power_ups/pistol_box.png');
		this.load.image('desert_eagle_box', 'assets/sprites/power_ups/desert_eagle_box.png');
		this.load.image('null_gravity_box', 'assets/sprites/power_ups/null_gravity_box.png');
		this.load.image('uzi_box', 'assets/sprites/power_ups/uzi_box.png');
		this.load.spritesheet('arrow_button', 'assets/sprites/buttons/arrow_button.png', 96, 96);
		this.load.spritesheet('button-round-a', 'assets/sprites/buttons/button-round-a.png', 96, 96);
		this.load.spritesheet('run_button', 'assets/sprites/buttons/run_button.png', 96, 96);
		this.load.spritesheet('jump_button', 'assets/sprites/buttons/jump_button.png', 96, 96);
		this.load.spritesheet('punch_button', 'assets/sprites/buttons/punch_button.png', 96, 96);
		this.load.image('vjoy_base', 'assets/sprites/buttons/vjoy_base.png');
        this.load.image('vjoy_body', 'assets/sprites/buttons/vjoy_body.png');
        this.load.image('vjoy_cap', 'assets/sprites/buttons/vjoy_cap.png');
	},

	create: function() {
		this.state.start('HomeState');
	},

	update: function() {

	}
};

game.state.add('PreloadState', PreloadState);
