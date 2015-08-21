class Dodge {
	
	game: Phaser.Game;
	
	player: Phaser.Sprite;
	
	cursors;
	
	block: number;
	
	scale: number;
	
	// text;
	
	constructor() {
		this.game = new Phaser.Game('100%', '100%', Phaser.AUTO, $('body')[0], {
			preload: this.preload.bind(this),
			create: this.create.bind(this),
			update: this.update.bind(this),
			render: this.render.bind(this)
		}, false, true);
		
		this.game.forceSingleUpdate = true;
		
		this.block = 16;
		
		// $(window).resize(() => {
		// 	var window: JQuery = $(window);
		// 	var width = window.width();
		// 	var height = window.height();
			
		// 	this.game.width = width;
		// 	this.game.height = height;
		// 	this.game.stage.bounds.width = width;
		// 	this.game.stage.bounds.height = height;
			
		// 	if (this.game.renderType === Phaser.WEBGL)
		// 	{
		// 		this.game.renderer.resize(width, height);
		// 	}
		// });
	}
	
	preload() {
		this.game.load.image('player', 'assets/player.png');
	}
	
	create() {
		this.scale = Math.min(this.game.width, this.game.height) / 150;
		
		this.game.physics.startSystem(Phaser.Physics.P2JS);
	
		this.player = this.game.add.sprite(this.game.width / 2, this.game.height / 4 * 3, 'player');
		this.player.smoothed = false;
		this.player.scale.setTo(this.scale);
	
		this.game.physics.p2.enable(this.player);
	
		(<Phaser.Physics.P2.Body>this.player.body).damping = 0;
		(<Phaser.Physics.P2.Body>this.player.body).fixedRotation = true;
	
		// this.text = this.game.add.text(20, 20, 'move with arrow keys', { fill: '#ffffff' });
	
		this.cursors = this.game.input.keyboard.createCursorKeys();
	}
	
	update() {
		var body = (<Phaser.Physics.P2.Body>this.player.body);
		
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