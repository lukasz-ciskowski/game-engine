import { fetchJson } from 'utils/jsonReader';
import { BaseController, IController } from './base/BaseController';
import { GameObject } from './base/GameObject';
import { SingleTile } from './base/SingleTile';
import { Collisions } from './core/Collisions';
import { Queue } from './core/Queue';
import { GameMap } from './map/GameMap';
import { Sprite } from './sprite/Sprite';

interface IScene extends IController {
    preload(): Promise<void> | void;
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
        const sprite = new Sprite(result, path);
        await sprite.load();
        return sprite;
    }

    public update(timestamp: number): void {
        this.queue.controllers.forEach((q) => q.update(timestamp));
    }

    public addCollisions(obj1: (SingleTile | Sprite)[], obj2: (SingleTile | Sprite)[]) {
        let collidingObj1: GameObject[] = [];
        let collidingObj2: GameObject[] = [];

        obj1.forEach((e) => {
            if (e instanceof SingleTile) return collidingObj1.push(e);
            if (e instanceof Sprite && e.currentFrame) return collidingObj1.push(e.currentFrame);
        });
        obj2.forEach((e) => {
            if (e instanceof SingleTile) return collidingObj2.push(e);
            if (e instanceof Sprite && e.currentFrame) return collidingObj2.push(e.currentFrame);
        });

        this._collisions.addCollisions(collidingObj1, collidingObj2)
    }

    public get collisions() {
        return this._collisions
    }
}
