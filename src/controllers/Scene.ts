import { fetchJson } from 'utils/jsonReader';
import { BaseController, IController } from './base/BaseController';
import { Collisions } from './core/Collisions';
import { Queue } from './core/Queue';
import { GameMap } from './map/GameMap';
import { SpriteObject } from './sprite/SpriteObject';

interface IScene extends IController {
    preload(): Promise<void> | void;
    unload(): Promise<void> | void;
}

export class Scene extends BaseController implements IScene {
    private readonly _queue = new Queue();
    private readonly _collisions = new Collisions();

    constructor(public readonly name: string) {
        super();
    }

    public preload(): void {
        return;
    }

    public unload(): void {
        this.queue.clear();
        this._collisions.clear();
        return;
    }

    public get queue() {
        return this._queue;
    }

    public async loadTileMapJSON(path: string) {
        const result = await fetchJson(path);
        const map = new GameMap(result);
        await this.queue.addController(map);
        return map;
    }

    public async addSprite(path: string) {
        const result = await fetchJson(path);
        const sprite = new SpriteObject(result, path);
        await sprite.load();
        return sprite;
    }

    public update(timestamp: number): void {
        if (this.game.currentScene !== this) return;

        this.queue.controllers.forEach((q) => q.update(timestamp));
    }

    public get collisions() {
        return this._collisions;
    }
}
