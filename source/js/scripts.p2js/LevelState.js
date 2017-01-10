var game = new Phaser.Game(1100, 550, Phaser.AUTO);

var sprite;

var player;
var enemies_1;
var enemiesAlive = 0;
var score = 0;
var playerDied = false;
var jumpTimer = 0;
var yAxis = p2.vec2.fromValues(0, 1);
var punched = false;
var world;
var punchOnce = false;
var punchedCount = 0;
var counter = 0;
var playerPunching = false;

var Level1 = function(game) {
  this.MAX_ENEMIES = 3;
  this.MAX_STUFF_BLOCKS = 3;
};

    Level1.prototype.init = function() {
        game.time.advancedTiming = true;
        game.stage.backgroundColor = '#fff';
    };

    Level1.prototype.preload = function() {

    };

    Level1.prototype.create = function() {
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);

    game.physics.p2.gravity.y = 550;

    playerCollisionGroup = game.physics.p2.createCollisionGroup();
    enemies_1ColisionGroup = game.physics.p2.createCollisionGroup();
    blockCollisionGroup = game.physics.p2.createCollisionGroup();
    objectsCollisionGroup = game.physics.p2.createCollisionGroup();
    stuff_blocksCollisionGroup = game.physics.p2.createCollisionGroup();

    game.physics.p2.updateBoundsCollisionGroup();

    world = game.add.tilemap('world');

    world.addTilesetImage('tileset');

    world_tiles_1 = world.createLayer('tiles_1');
    world_tiles_1.resizeWorld();
    world_tiles_2 = world.createLayer('tiles_2');
    world_tiles_2.resizeWorld();
    world.setCollision(1);
    world_tiles_1_objs = game.physics.p2.convertTilemap(world, world_tiles_1);
    for (var i = 0; i < world_tiles_1_objs.length; i++) {
      var world_tiles_1_body = world_tiles_1_objs[i];
      world_tiles_1_body.setCollisionGroup(blockCollisionGroup);
      world_tiles_1_body.collides(playerCollisionGroup);
      world_tiles_1_body.collides(enemies_1ColisionGroup);
      world_tiles_1_body.collides(objectsCollisionGroup);
      world_tiles_1_body.collides(stuff_blocksCollisionGroup);
    }

    HUDisplay();
    stickmans = [];
    spawnPoint = game.add.group();

    world.createFromObjects('objects', 13, 'spawnPoint', 0, true, false, spawnPoint);

    spawnPoint.forEach(function(sp){
      game.physics.p2.enable(sp),
      sp.body.kinematic = true,
      sp.body.clearShapes(),
      sp.body.loadPolygon('sprites_physicsData', 'spawn_point'),
      sp.body.setCollisionGroup(objectsCollisionGroup),
      sp.body.collides(playerCollisionGroup),
      sp.body.collides(enemies_1ColisionGroup),
      blueOrb = game.add.emitter(sp.body.x, sp.body.y, 200),

      blueOrb.makeParticles('orb_blue'),

      blueOrb.setRotation(0, 0),
      blueOrb.setAlpha(0.3, 0.8),
      blueOrb.setScale(0.5, 1),
      blueOrb.gravity = -200,

      blueOrb.start(false, 5000, 100);
    });


    stickmans.push(new MainPlayer(1, game));

    this.enemies = this.game.add.group();
    stuff_blocks = this.game.add.group();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    sprintButton = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    punchButton = game.input.keyboard.addKey(Phaser.Keyboard.S);

    game.physics.p2.setBoundsToWorld(true, true, true, true, false);
    };

    Level1.prototype.update = function() {


      if (this.enemies.countLiving() == 0) {
        for (var i = 0; i < this.MAX_ENEMIES; i++) {
          this.createEnemy_1(game.rnd.integerInRange(0, 1100), 841);
        }
      }

        if (stuff_blocks.countLiving() == 0) {
          for (var i = 0; i < this.MAX_STUFF_BLOCKS; i++) {
            this.createStuff_Block(game.rnd.integerInRange(10, 1100), 500);
          }
        }


      if(healthBar_Red.cameraOffset.x < -180) {
        if(counter == 0){gameOver();}
      }

      if(healthBar_Red.cameraOffset.x == 0 || healthBar_Red.cameraOffset.x > 0) {
        healthFull = true;
      } else {
        healthFull = false;
      }

      for (var i = 0; i < 1; i++) {
            stickmans[i].update();
      }

    };

    Level1.prototype.render = function() {

    };
