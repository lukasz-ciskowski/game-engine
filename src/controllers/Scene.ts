import { fetchJson } from 'utils/jsonReader';
import { BaseController, IController } from './base/BaseController';
import { GameMap } from './map/GameMap';
import { Sprite } from './sprite/Sprite';

interface IScene extends IController {
    preload(): Promise<void> | void;
}

export class Scene extends BaseController implements IScene {
    constructor(public readonly name: string) {
        super();
    }

    public preload(): void {
        return;
    }

    public async loadTileMapJSON(path: string) {
        const result = await fetchJson(path);
        const map = new GameMap(result);
        await this.game.queue.addController(map);
        return map;
    }

    public async addSprite(path: string) {
        const result = await fetchJson(path);
        const sprite = new Sprite(result, path);
        await this.game.queue.addController(sprite);
        return sprite;
    }
}
