import { TileMapJSONData, TilemapProcessor } from 'preprocessors/TilemapProcessor';
import { FileNames } from 'types/config';
import { BaseController } from '../base/BaseController';
import { SingleTile } from '../base/SingleTile';
import { Layer } from './Layer';
import { Tileset } from './Tileset';

interface LayerOptions {
    isObstacle: boolean;
}

export class GameMap extends BaseController {
    private _tilesetImages: Map<string, Tileset> = new Map();
    private _layers: Layer[] = [];

    constructor(private readonly _mapObject: TileMapJSONData) {
        super();
    }

    public async addTileset(name: string, fileName: FileNames, scale?: number) {
        const existingTileset = this._tilesetImages.get(name);
        if (existingTileset) {
            return existingTileset;
        }

        const img = this.game.fileManager.getImage(fileName);
        if (!img) throw new Error('Image not found');

        const newTileset = new Tileset(img, scale, this._mapObject);
        this._tilesetImages.set(name, newTileset);
        return newTileset;
    }

    public createLayers(layers: string[], tilesetName: string, options?: LayerOptions) {
        const tileset = this._tilesetImages.get(tilesetName);
        if (!tileset) throw new Error('No tileset found');

        const allCreatedTiles: SingleTile[] = [];
        layers.forEach((layer) => {
            const created = TilemapProcessor.createLayer(layer, this._mapObject, tileset, this._mapObject.layers);
            if (!created) return;

            const newLayer = new Layer(tileset.img, created);
            this._layers.push(newLayer);

            this.game.currentScene?.addController(newLayer);
            allCreatedTiles.push(...created);
        });

        if (options?.isObstacle) {
            this.game.currentScene.collisions.addCollisions(allCreatedTiles);
        }

        return allCreatedTiles;
    }

    public clearLayers() {
        this._layers = [];
    }
}
