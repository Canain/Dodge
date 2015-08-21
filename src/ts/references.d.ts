/// <reference path="../../typings/tsd.d.ts" />

declare module Phaser {
	
	export var AUTO: number;
	
	export class RenderTexture {
		
	}
	
	export class BitmapData {
		
	}
	
	export class GameObjectFactory {
		
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
	
	export class Input {
		
	}
	
	export class Loader {
		
	}
	
	export class GameObjectCreator {
		
	}
	
	export class Net {
		
	}
	
	export class Math {
		
	}
	
	export class Particles {
		
	}
	
	export class Physics {
		
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
		constructor(game: Game, x: number, y: number, key: string | RenderTexture | BitmapData | PIXI.Texture, frame: string | number);
	}
}
