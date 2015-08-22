class Dodge {
	
	game: Phaser.Game;
	
	player: Phaser.Sprite;
	
	cursors;
	
	block: number;
	
	scale: number;
	
	collision: {
		player: Phaser.Physics.CollisionGroup;
		block: Phaser.Physics.CollisionGroup;
	};
	
	constructor() {
		this.game = new Phaser.Game('100%', '100%', Phaser.AUTO, $('body')[0], {
			preload: this.preload.bind(this),
			create: this.create.bind(this),
			update: this.update.bind(this),
			render: this.render.bind(this)
		}, false, true);
		
		this.game.forceSingleUpdate = true;
		
		this.block = 16;
	}
	
	createBlock(color: string) {
		var block = this.game.add.sprite(this.game.world.randomX, 0, 'block-' + color);
		block.smoothed = false;
		block.scale.setTo(this.scale * this.block);
		this.game.physics.p2.enable(block);
		var body = <Phaser.Physics.P2.Body>block.body;
		body.setZeroDamping();
		body.fixedRotation = true;
		body.velocity.y = -100;
		body.setCollisionGroup(this.collision.block);
		body.collides(this.collision.player, () => {
			console.log('hit ' + color);
		});
	}
	
	preload() {
		this.game.load.image('player', 'assets/player.png');
		var colors = ['red', 'blue', 'green', 'yellow', 'purple'];
		colors.forEach((color: string) => {
			this.game.load.image('block-' + color, 'assets/blocks/' + color + '.png');
		});
	}
	
	create() {
		this.scale = Math.min(this.game.width, this.game.height) / 150;
		
		this.game.physics.startSystem(Phaser.Physics.P2JS);
    	this.game.physics.p2.setImpactEvents(true);
		
		this.collision = {
			player: this.game.physics.p2.createCollisionGroup(),
			block: this.game.physics.p2.createCollisionGroup()
		};
		
		this.game.physics.p2.updateBoundsCollisionGroup();
	
		this.player = this.game.add.sprite(this.game.width / 2, this.game.height / 4 * 3, 'player');
		this.player.smoothed = false;
		this.player.scale.setTo(this.scale);
	
		this.game.physics.p2.enable(this.player);
		
		var body = <Phaser.Physics.P2.Body>this.player.body;
		body.setZeroDamping();
		body.fixedRotation = true;
		body.setCollisionGroup(this.collision.player);
		body.collides(this.collision.block);
	
		this.cursors = this.game.input.keyboard.createCursorKeys();
	}
	
	update() {
		var body = <Phaser.Physics.P2.Body>this.player.body;
		
		var force = 2000;
		
		var friction = 5;
		
		if (this.cursors.left.isDown) {
			body.force.x = -force;
		} else if (this.cursors.right.isDown) {
			body.force.x = force;
		} else {
			body.force.x = -friction * body.velocity.x;
		}
	
		if (this.cursors.up.isDown) {
			body.force.y = -force;
		} else if (this.cursors.down.isDown) {
			body.force.y = force;
		} else {
			body.force.y = -friction * body.velocity.y;
		}
	}
	
	render() {
		// this.game.debug.text('Click to disable body1', 32, 32);
	
		// if (this.sprite2.body.enable)
		// {
		// 	this.game.debug.body(this.sprite2);
		// }
	}
}
export = Dodge;