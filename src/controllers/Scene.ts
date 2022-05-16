import { SpriteData } from 'preprocessors/SpriteProcessor';
import { TileMapJSONData } from 'preprocessors/TilemapProcessor';
import { FileNames } from 'types/config';
import { BaseController, IController } from './base/BaseController';
import { Collisions } from './core/Collisions';
import { Queue } from './core/Queue';
import { GameMap } from './map/GameMap';
import { MapImage, MapImageProps } from './map/MapImage';
import { SpriteObject } from './sprite/SpriteObject';

interface IScene extends IController {
    preload(): Promise<void> | void;
}

export class Scene extends BaseController implements IScene {
    private _queue: Queue;
    private _collisions: Collisions;

    constructor(public readonly name: string) {
        super();
        this._queue = new Queue();
        this._collisions = new Collisions();
    }

    load(): void {
        this._queue = new Queue();
        this._collisions = new Collisions();
    }

    public preload(): void {
        return;
    }

    public addController(controller: BaseController) {
        return this._queue.addController(controller);
    }
    public addControllers(controllers: BaseController[]) {
        return this._queue.addControllers(controllers);
    }
    public removeController(controller: BaseController) {
        return this._queue.removeController(controller);
    }

    public async loadTileMapJSON(name: FileNames) {
        const result = this.game.fileManager.getJson<TileMapJSONData>(name);
        if (!result) throw new Error('No config found');

        const map = new GameMap(result);
        await this._queue.addController(map);
        return map;
    }

    public async addSprite(name: FileNames) {
        const result = this.game.fileManager.getJson<SpriteData>(name);
        const config = this.game.fileManager.getConfig(name);

        if (!config || !result) throw new Error('No config found');

        const sprite = new SpriteObject(result, config.url);
        await this._queue.addController(sprite);
        this.collisions.addCollisions([sprite]);
        return sprite;
    }

    public async addImage(name: FileNames, props: MapImageProps) {
        const result = this.game.fileManager.getImage(name);
        if (!result) throw new Error('No image');

        const newImage = new MapImage(result, props);
        await this._queue.addController(newImage);
        return newImage;
    }

    public update(timestamp: number): void {
        if (this.game.currentScene !== this) return;

        // run all queued controllers in current scene
        this._queue.controllers.forEach((q) => q.update(timestamp));
    }

    public get collisions() {
        return this._collisions;
    }
}
