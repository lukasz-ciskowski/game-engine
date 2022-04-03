import { SpriteProcessor } from 'preprocessors/SpriteProcessor';
import { TilemapProcessor } from 'preprocessors/TilemapProcessor';
import { BaseController } from './BaseController';
import { Game } from '../core/Game';
import { GameMap } from './GameMap';

interface IScene {
    preload(): Promise<void> | void;
    load(): Promise<void> | void;
    update(): void;
}

export class Scene extends BaseController implements IScene {
    private gameMap: GameMap;

    constructor(public readonly name: string) {
        super();
    }

    public preload(): void {
        return;
    }
    public load(): void {
        return;
    }
    public update(): void {
        this.gameMap.drawQueue.drawAll();
        return;
    }

    public async loadTileMapJSON(path: string) {
        const result = await this.fetchJson(path);
        this.gameMap = new GameMap(new TilemapProcessor(result));
        return this.gameMap;
    }

    public async addSprite(path: string) {
        const result = await this.fetchJson(path);
        return new SpriteProcessor(result).loadMetadata(path);
    }

    private async fetchJson(path: string) {
        const response = await fetch(path);
        return await response.json();
    }
}
