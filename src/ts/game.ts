class Dodge {
	
	game: Phaser.Game;
	
	sprite: Phaser.Sprite;
	
	cursors;
	
	text;
	
	constructor() {
		this.game = new Phaser.Game('100%', '100%', Phaser.AUTO, $('body')[0], {
			preload: this.preload.bind(this),
			create: this.create.bind(this),
			update: this.update.bind(this),
			render: this.render.bind(this)
		}, false, true);
		
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
		this.game.load.image('block-red', 'assets/blocks/red.png');
	}
	
	create() {
		this.game.add.image(0, 0, 'block-red');
	
		this.game.physics.startSystem(Phaser.Physics.P2JS);
	
		this.sprite = this.game.add.sprite(200, 200, 'block-red');
		this.sprite.scale.setTo(100);
	
		this.game.physics.p2.enable(this.sprite);
	
		(<Phaser.Physics.P2.Body>this.sprite.body).damping = 0;
		(<Phaser.Physics.P2.Body>this.sprite.body).fixedRotation = true;
	
		// this.text = this.game.add.text(20, 20, 'move with arrow keys', { fill: '#ffffff' });
	
		this.cursors = this.game.input.keyboard.createCursorKeys();
	}
	
	update() {
		var body = (<Phaser.Physics.P2.Body>this.sprite.body);
		
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