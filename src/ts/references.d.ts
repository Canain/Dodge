/// <reference path="../../typings/tsd.d.ts" />

declare module Phaser {
	
	export var AUTO: number;
	
	export class RenderTexture {
		
	}
	
	export class BitmapData {
		
	}
	
	export class Video {
		
	}
	
	export class Group {
		
	}
	
	export class Image {
		
	}
	
	export class Text {
		
	}
	
	export class Point {
		x: number;
		y: number;
		
		type: number;
		
		constructor(x?: number, y?: number);
		
		setTo(x: number, y?: number);
	}
	
	export class GameObjectFactory {
		image(x?: number, y?: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | Phaser.Video | PIXI.Texture, frame?: string | number, group?: Group): Image;
		sprite(x?: number, y?: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | Phaser.Video | PIXI.Texture, frame?: string | number, group?: Group): Sprite;
		text(x?: number, y?: number, text?: string, style?, group?: Group): Text;
	}
	
	export class Cache {
		
	}
	
	export class Camera {
		
	}
	
	export class Create {
		
	}
	
	export module Utils {
		export class Debug {
			
		}
	} 
	
	export class Device {
		
	}
	
	export class Signal {
		
	}
	
	export class Keyboard {
		createCursorKeys(): { up; down; left; right; };
	}
	
	export class Input {
		keyboard: Keyboard;
	}
	
	export class Loader {
		spritesheet(key: string, url: string, frameWidth: number, frameHeight: number, frameMax?: number, margin?: number, spacing?: number);
		
		image(key: string, url?: string, overwrite?: boolean);
	}
	
	export class GameObjectCreator {
		
	}
	
	export class Net {
		
	}
	
	export class Math {
		
	}
	
	export class Particles {
		
	}
	
	export module Physics {
		export class Arcade {
			
		}
		
		export module Arcade {
			
			export class Body {
				
			}
		}
		
		export module P2 {
			
			export class Body {
				fixedRotation: boolean;
				force: InversePointProxy;
				velocity: InversePointProxy;
				damping: number;
				
				setZeroDamping();
				setZeroVelocity();
				moveLeft(speed: number);
				moveRight(speed: number);
				moveUp(speed: number);
				moveDown(speed: number);
			}
			
			export class InversePointProxy {
				mx: number;
				my: number;
				x: number;
				y: number;
			}
			
			export class CollisionGroup {
				
			}
		}
		
		export module Ninja {
			
			export class Body {
				
			}
		}
		
		export class P2 {
			setImpactEvents(state: boolean);
			enable(object: any | any[] | Group, debug?: boolean, children?: boolean);
			createCollisionGroup(object?: Group | Sprite);
		}
	}
	
	export class Physics {
		static ARCADE: number;
		static P2JS: number;
		
		arcade: Physics.Arcade;
		p2: Physics.P2;
		
		startSystem(system: number);
	}
	
	export class PluginManager {
		
	}
	
	export class RandomNumberGenerator {
		
	}
	
	export class ScaleManager {
		
	}
	
	export class SoundManager {
		
	}
	
	export class Stage {
		
	}
	
	export class StateManager {
		
	}
	
	export class Time {
		
	}
	
	export class TweenManager {
		
	}
	
	export class RequestAnimationFrame {
		
	}
	
	export class World {
		randomX: number;
		randomY: number;
	}
	
	export class Game {
		add: GameObjectFactory;
		antialias: boolean;
		cache: Cache;
		camera: Camera;
		canvas: HTMLCanvasElement;
		config;
		context: CanvasRenderingContext2D;
		create: Create;
		debug: Utils.Debug;
		device: Device;
		forceSingleUpdate: boolean;
		fpsProblemNotifier: Signal;
		input: Input;
		load: Loader;
		lockRender: boolean;
		make: GameObjectCreator;
		math: Math;
		net: Net;
		onBlur: Signal;
		onFocus: Signal;
		onPause: Signal;
		onResume: Signal;
		parent: string | HTMLElement;
		particles: Particles;
		paused: boolean;
		physics: Physics;
		physicsConfig;
		plugins: PluginManager;
		preserveDrawingBuffer: boolean;
		rnd: RandomNumberGenerator;
		scale: ScaleManager;
		sound: SoundManager;
		stage: Stage;
		state: StateManager;
		time: Time;
		transparent: boolean;
		tweens: TweenManager;
		world: World;
		
		private currentUpdateID: number;
		private raf: RequestAnimationFrame;
		private renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
		private updateThisFrame: number;
		
		height: number;
		id: number;
		isBooted: boolean;
		isRunning: boolean;
		pendingStep: boolean;
		renderType: number;
		resolution: number;
		stepCount: number;
		stepping: boolean;
		width: number;
		
		constructor(width?: number | string, height?: number | string, renderer?: number, parent?: string | HTMLElement, state?, transparent?: boolean, antialias?: boolean, physicsConfig?);
		
		destroy();
		disableStep();
		enableStep();
		step();
		
		private boot();
		private focusGain(event);
		private focusGain(event);
		private focusLoss(event);
		private gamePaused(event);
		private gameResumed(event);
		private parseConfig();
		private setUpRenderer();
		private showDebugHeader();
		private update(time: number);
		private updateLogic(timeStep: number);
		private updateRender(elapsedTime: number);
	}
	
	export class Sprite {
		body: Physics.Arcade.Body | Physics.P2.Body | Physics.Ninja.Body;
		scale: Point;
		smoothed: boolean;
		
		constructor(game: Game, x: number, y: number, key: string | RenderTexture | BitmapData | PIXI.Texture, frame: string | number);
		
		
	}
}
