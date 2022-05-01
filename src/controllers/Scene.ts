import { SpriteData } from 'preprocessors/SpriteProcessor';
import { TileMapJSONData } from 'preprocessors/TilemapProcessor';
import { FileNames } from 'types/config';
import { loadImgAsync } from 'utils/imageLoader';
import { fetchJson } from 'utils/jsonReader';
import { BaseController, IController } from './base/BaseController';
import { Collisions } from './core/Collisions';
import { Queue } from './core/Queue';
import { GameMap } from './map/GameMap';
import { MapImage, MapImageProps } from './map/MapImage';
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

    public async loadTileMapJSON(name: FileNames) {
        const result = this.game.fileManager.getJson<TileMapJSONData>(name);
        if (!result) throw new Error('No config found');

        const map = new GameMap(result);
        await this.queue.addController(map);
        return map;
    }

    public async addSprite(name: FileNames) {
        const result = this.game.fileManager.getJson<SpriteData>(name);
        const config = this.game.fileManager.getConfig(name);

        if (!config || !result) throw new Error('No config found');

        const sprite = new SpriteObject(result, config.url);
        await this.queue.addController(sprite)
        return sprite;
    }

    public async addImage(name: FileNames, props: MapImageProps) {
        const result = this.game.fileManager.getImage(name);
        if (!result) throw new Error("No image")
        
        const newImage = new MapImage(result, props);
        await this.queue.addController(newImage)
        return newImage;
    }

    public update(timestamp: number): void {
        if (this.game.currentScene !== this) return;

        this.queue.controllers.forEach((q) => q.update(timestamp));
    }

    public get collisions() {
        return this._collisions;
    }
}
