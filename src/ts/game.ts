class Dodge {
	
	game: Phaser.Game;
	
	sprite: Phaser.Sprite;
	sprite2: Phaser.Sprite;
	
	constructor() {
		this.game = new Phaser.Game('100%', '100%', Phaser.AUTO, document.body, {
			preload: this.preload.bind(this),
			create: this.create.bind(this),
			update: this.update.bind(this),
			render: this.render.bind(this)
		}, false, true);
	}
	
	preload() {
		this.game.load.spritesheet('gameboy', 'assets/sprites/gameboy_seize_color_40x60.png', 40, 60);
	}
	
	create() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
	
		this.game.stage.backgroundColor = '#124184';
	
		this.sprite = this.game.add.sprite(300, 0, 'gameboy', 2);
		this.sprite2 = this.game.add.sprite(300, 400, 'gameboy', 3);
	
		this.game.physics.arcade.enable([this.sprite, this.sprite2]);
	
		this.game.physics.arcade.gravity.y = 200;
	
		this.sprite.body.bounce.y = 0.95;
		this.sprite.body.collideWorldBounds = true;
	
		this.sprite2.body.allowGravity = false;
		this.sprite2.body.immovable = true;
	
		this.game.input.onDown.add(() => {
			//	Here we simply disable the body entirely
			//	This stops all motion and collision checks against it
			//	without actually destroying the body object itself.
		
			if (this.sprite2.body.enable)
			{
				this.sprite2.body.enable = false;
			}
			else
			{
				this.sprite2.body.enable = true;
			}
		}, this);
	}
	
	update() {
		this.game.physics.arcade.collide(this.sprite, this.sprite2);
	}
	
	render() {
		this.game.debug.text('Click to disable body1', 32, 32);
	
		if (this.sprite2.body.enable)
		{
			this.game.debug.body(this.sprite2);
		}
	}
}

export = Dodge;