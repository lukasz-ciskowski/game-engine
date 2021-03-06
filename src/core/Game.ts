import { Scene } from '../controllers/Scene';
import { Camera } from './Camera';
import { Cursor } from './Cursor';
import { FileManager } from './FileManager';
import { FileNames } from 'types/config';

interface Config {
    id: string;
    width: number;
    height: number;
    scenes: typeof Scene[];
    debug?: boolean;
}

export class Game {
    public readonly canvas: HTMLCanvasElement;
    public readonly ctx: CanvasRenderingContext2D;
    private _camera: Camera;
    private _animationFrame: number | null = null;

    public readonly debug: boolean = false;

    private _scenes: Scene[];
    private _currentScene: Scene;
    private _scale: number = 1;
    private _oldTimeStamp = 0;

    public readonly cursor = new Cursor();
    public readonly fileManager: FileManager<FileNames> = new FileManager<FileNames>();

    private static _instance: Game;

    public static async init(config: Config) {
        this._instance = new Game(config);

        // create instances
        this._instance._scenes = config.scenes.map((scene) => new scene('scene'));

        for (const scene of this._instance._scenes) {
            await scene.preload();
        }
        // load first scene
        this._instance.loadScene(this._instance._scenes[0].name);
    }

    constructor(config: Config) {
        const canvas = document.querySelector<HTMLCanvasElement>(`#${config.id}`);

        const ctx = canvas?.getContext('2d', { alpha: false });
        if (!canvas || !ctx) {
            throw new Error('Canvas not found');
        }

        this.canvas = canvas;
        this.ctx = ctx;
        this.debug = config.debug || false;

        this.canvas.width = config.width;
        this.canvas.height = config.height;

        this.ctx.imageSmoothingEnabled = false;
    }

    public static get instance() {
        return this._instance;
    }

    public get camera() {
        return this._camera;
    }

    public gameLoop(scene: Scene, updateFn: (timestamp: number) => void, timestamp: number) {
        if (scene.name !== this.currentScene?.name) return;

        this.clearScene();

        const secondsPassed = (timestamp - this._oldTimeStamp) / 1000;
        this._oldTimeStamp = timestamp;

        updateFn.bind(scene)(secondsPassed);
        this.camera.update(secondsPassed);

        window.requestAnimationFrame(this.gameLoop.bind(this, scene, updateFn));
    }

    public async loadScene(name: string) {
        if (this._animationFrame) {
            window.cancelAnimationFrame(this._animationFrame);
        }

        const curr = this._scenes.find((s) => s.name === name);
        if (!curr) throw new Error('Failed loading scene');
        this._currentScene = curr;

        this._camera = new Camera();
        // testing purpose
        // setInterval(() => {
        //     this.gameLoop(curr, curr.update, 0);
        // }, 1000);
        this._animationFrame = window.requestAnimationFrame(this.gameLoop.bind(this, curr, curr.update));
        await curr.load();
    }

    public setScale(scale: number) {
        this.ctx.scale(1 / this.scale, 1 / this.scale);

        this._scale = scale;
        this.ctx.scale(scale, scale);
    }

    public get scale() {
        return this._scale;
    }

    public get currentScene() {
        return this._currentScene;
    }

    private clearScene() {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill();
    }
}
