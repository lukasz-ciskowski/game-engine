import { Scene } from '../controllers/Scene';
import { Camera } from './Camera';

interface Config {
    id: string;
    width: number;
    height: number;
    scenes: typeof Scene[];
}

export class Game {
    public readonly canvas: HTMLCanvasElement;
    public readonly ctx: CanvasRenderingContext2D;
    private readonly _camera: Camera;

    private _scenes: Scene[];
    private _currentScene: Scene | null;

    private static _instance: Game;

    public static init(config: Config) {
        this._instance = new Game(config);

        // create instances
        this._instance._scenes = config.scenes.map((scene) => new scene('scene'));

        Promise.all(this._instance._scenes.map((s) => s.preload())).then(() => {
            // load first scene
            this._instance.loadScene(this._instance._scenes[0].name);
        });
    }

    constructor(config: Config) {
        const canvas = document.querySelector<HTMLCanvasElement>(`#${config.id}`);

        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) {
            console.error('Canvas not found');
            return;
        }

        this.canvas = canvas;
        this.ctx = ctx;

        this.canvas.width = config.width;
        this.canvas.height = config.height;

        this.ctx.imageSmoothingEnabled = false;
        this._camera = new Camera();
    }

    public static get instance() {
        return this._instance;
    }

    public get camera() {
        return this._camera;
    }

    public gameLoop(scene: Scene, updateFn: () => void) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        updateFn.bind(scene)();

        window.requestAnimationFrame(this.gameLoop.bind(this, scene, updateFn));
    }

    public loadScene(name: string) {
        const curr = this._scenes.find((s) => s.name === name);
        if (!curr) {
            console.error('Failed loading scene');
            return;
        }
        curr.load();

        window.requestAnimationFrame(this.gameLoop.bind(this, curr, curr.update));
        this._currentScene = curr;
    }
}