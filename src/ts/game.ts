class Dodge {
	
	game: Phaser.Game;
	
	sprite: Phaser.Sprite;
	
	cursors;
	
	text;
	
	constructor() {
		this.game = new Phaser.Game('100%', '100%', Phaser.AUTO, document.body, {
			preload: this.preload.bind(this),
			create: this.create.bind(this),
			update: this.update.bind(this),
			render: this.render.bind(this)
		}, false, true);
	}
	
	preload() {
		this.game.load.image('block-red', 'assets/blocks/red.png');
	}
	
	create() {
		this.game.add.image(0, 0, 'block-red');
	
		this.game.physics.startSystem(Phaser.Physics.P2JS);
	
		this.sprite = this.game.add.sprite(200, 200, 'block-red');
	
		this.game.physics.p2.enable(this.sprite);
	
		(<Phaser.Physics.P2.Body>this.sprite.body).setZeroDamping();
		(<Phaser.Physics.P2.Body>this.sprite.body).fixedRotation = true;
	
		this.text = this.game.add.text(20, 20, 'move with arrow keys', { fill: '#ffffff' });
	
		this.cursors = this.game.input.keyboard.createCursorKeys();
	}
	
	update() {
		(<Phaser.Physics.P2.Body>this.sprite.body).setZeroVelocity();
	
		if (this.cursors.left.isDown)
		{
			(<Phaser.Physics.P2.Body>this.sprite.body).moveLeft(400);
		}
		else if (this.cursors.right.isDown)
		{
			(<Phaser.Physics.P2.Body>this.sprite.body).moveRight(400);
		}
	
		if (this.cursors.up.isDown)
		{
			(<Phaser.Physics.P2.Body>this.sprite.body).moveUp(400);
		}
		else if (this.cursors.down.isDown)
		{
			(<Phaser.Physics.P2.Body>this.sprite.body).moveDown(400);
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