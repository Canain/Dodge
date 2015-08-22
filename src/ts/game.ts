class Dodge {
	
	game: Phaser.Game;
	
	player: Phaser.Sprite;
	
	cursors;
	
	block: number;
	
	scale: number;
	
	colors: string[];
	
	collision: {
		player: Phaser.Physics.P2.CollisionGroup;
		block: Phaser.Physics.P2.CollisionGroup;
	};
	
	groups: {
		player: Phaser.Group;
		block: Phaser.Group;
		text: Phaser.Group;
	};
	
	speed: number;
	invincible: boolean;
	
	power: number;
	
	text: Phaser.Text;
	
	score: Phaser.Text;
	
	points: number;
	
	constructor() {
		this.game = new Phaser.Game('100%', '100%', Phaser.AUTO, $('body')[0], {
			preload: this.preload.bind(this),
			create: this.create.bind(this),
			update: this.update.bind(this),
			render: this.render.bind(this)
		}, false, true);
		
		this.colors = ['red', 'green', 'blue', 'yellow', 'purple'];
		
		this.points = 0;
		
		this.game.forceSingleUpdate = true;
		
		this.block = 16;
	}
	
	createBlock(color: string) {
		var block = this.game.add.sprite(this.game.world.randomX, -this.game.world.height / 4, 'block-' + color);
		block.smoothed = false;
		block.scale.setTo(this.scale * this.block);
		this.game.physics.p2.enable(block);
		var body = <Phaser.Physics.P2.Body>block.body;
		body.setZeroDamping();
		body.fixedRotation = true;
		body.velocity.y = 200;
		body.setCollisionGroup(this.collision.block);
		body.collides(this.collision.player, () => {
			if (color == 'yellow') {
				this.power = this.power == -1 ? this.game.time.now + 2000 : this.power + 2000;
				this.speed = 600;
				this.text.text = 'SPEED';
				this.text.fill = 'yellow';
				this.points += 200;
				this.updateScore();
			} else if (color == 'purple') {
				this.power = this.power == -1 ? this.game.time.now + 2000 : this.power + 2000;
				this.invincible = true;
				this.text.text = 'INVINCIBLE';
				this.text.fill = '#FF00FF';
				this.points += 200;
				this.updateScore();
			} else if (color == 'blue') {
				this.power = this.power == -1 ? this.game.time.now + 2000 : this.power + 2000;
				this.groups.block.forEach((child: Phaser.Sprite) => {
					var body = <Phaser.Physics.P2.Body>child.body;
					body.velocity.y = 100;
				}, this);
				this.text.text = 'SLOW DOWN';
				this.text.fill = 'blue';
				this.points += 200;
				this.updateScore();
			} else if (color == 'green') {
				this.points += 100;
				this.updateScore();
			} else {
				if (this.invincible) {
					this.points += 200;
					this.updateScore();
				} else {
					this.player.kill();
					this.text.text = 'GAME OVER';
					this.text.fill = 'red';
					this.power = -1;
				}
			}
			block.destroy();
		});
		body.collideWorldBounds = false;
		this.groups.block.add(block);
	}
	
	preload() {
		this.game.load.image('player', 'assets/player.png');
		this.colors.forEach((color: string) => {
			this.game.load.image('block-' + color, 'assets/blocks/' + color + '.png');
		});
	}
	
	create() {
		this.game.time.advancedTiming = true;
		
		this.reset();
		
		this.groups = {
			player: this.game.add.group(),
			block: this.game.add.group(),
			text: this.game.add.group()
		};
		
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
		
		this.groups.player.add(this.player);
	
		this.cursors = this.game.input.keyboard.createCursorKeys();
		
		this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, '', {
			font: 'bold 48px Tahoma',
			fill: 'white',
			align: 'center'
		});
		this.text.anchor.setTo(0.5);
		
		this.score = this.game.add.text(5, 0, 'Score: ' + this.points, {
			font: 'bold 32px Tahoma',
			fill: 'white'
		});
		
		this.groups.text.add(this.text);
		this.groups.text.add(this.score);
	}
	
	updateScore() {
		if (this.score) {
			this.score.text = 'Score: ' + this.points;
		}
	}
	
	reset() {
		this.power = -1;
		this.speed = 300;
		this.invincible = false;
		if (this.text) {
			this.text.text = '';
		}
		if (this.groups) {
			this.groups.block.forEach((child: Phaser.Sprite) => {
				var body = <Phaser.Physics.P2.Body>child.body;
				body.velocity.y = 200;
			}, this);
		}
	}
	
	update() {
		var body = <Phaser.Physics.P2.Body>this.player.body;
		
		var friction = 5;
		
		var pointer = this.game.input.activePointer;
		if (pointer.isDown) {
			var dir = this.player.position.clone().subtract(pointer.clientX, pointer.clientY);
			dir.normalize();
			body.velocity.x = -dir.x * this.speed;
			body.velocity.y = -dir.y * this.speed;
		} else {
			body.setZeroVelocity();
			
			if (this.cursors.left.isDown) {
				body.velocity.x -= this.speed;
			}
			if (this.cursors.right.isDown) {
				body.velocity.x += this.speed;
			}
			if (this.cursors.up.isDown) {
				body.velocity.y -= this.speed;
			}
			if (this.cursors.down.isDown) {
				body.velocity.y += this.speed;
			}
		}
		
		if (Math.random() < 0.02) {
			var color;
			if (Math.random() < 0.8) {
				color = Math.random() < 0.5 ? 'red' : 'green';
			} else {
				if (Math.random() < 0.33) {
					color = 'blue';
				} else if (Math.random() < 0.5) {
					color = 'yellow';
				} else {
					color = 'purple';
				}
			}
			
			this.createBlock(color);
		}
		
		if (this.power != -1 && this.game.time.now > this.power) {
			this.reset();
		}
		
		this.groups.block.forEach((child: Phaser.Sprite) => {
			if (child.position.y > this.game.width + child.height) {
				child.destroy();
			}
		}, this);
		
		if (this.player.alive) {
			this.points++;
			this.updateScore();
		}
	}
	
	render() {
		
	}
}
export = Dodge;