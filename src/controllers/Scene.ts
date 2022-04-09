import { fetchJson } from 'utils/jsonReader';
import { BaseController, IController } from './base/BaseController';
import { Queue } from './core/Queue';
import { GameMap } from './map/GameMap';
import { Sprite } from './sprite/Sprite';

interface IScene extends IController {
    preload(): Promise<void> | void;
}

export class Scene extends BaseController implements IScene {
    private readonly _queue = new Queue() 

    constructor(public readonly name: string) {
        super();
    }

    public preload(): void {
        return;
    }

    public get queue() {
        return this._queue
    }

    public async loadTileMapJSON(path: string) {
        const result = await fetchJson(path);
        const map = new GameMap(result);
        await this.queue.addController(map);
        return map;
    }

    public async addSprite(path: string) {
        const result = await fetchJson(path);
        const sprite = new Sprite(result, path);
        await sprite.load()
        return sprite;
    }

    public update(timestamp: number): void {
        this.queue.controllers.forEach(q => q.update(timestamp))
    }
}
