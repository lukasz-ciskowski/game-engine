import { TileMapJSONData, TilemapProcessor } from 'preprocessors/TilemapProcessor';
import { BaseController } from '../base/BaseController';
import { SingleTile } from '../base/SingleTile';
import { Layer } from './Layer';
import { Tileset } from './Tileset';

export class GameMap extends BaseController {
    private _tilesetImages: Map<string, Tileset> = new Map();
    private _layers: Layer[] = [];

    constructor(private readonly _mapObject: TileMapJSONData) {
        super();
    }

    public async addTileset(name: string, src: string, scale?: number) {
        const existingTileset = this._tilesetImages.get(name);
        if (existingTileset) {
            return existingTileset;
        }

        const img = await TilemapProcessor.loadTileset(src);

        const newTileset = new Tileset(img, scale, this._mapObject);
        this._tilesetImages.set(name, newTileset);
        return newTileset;
    }

    public createLayers(layers: string[], tilesetName: string) {
        const tileset = this._tilesetImages.get(tilesetName);
        if (!tileset) {
            console.error('No tileset found');
            return [];
        }

        const allCreatedTiles: SingleTile[] = [];
        layers.forEach((layer) => {
            const created = TilemapProcessor.createLayer(layer, this._mapObject, tileset, this._mapObject.layers);
            if (!created) return;

            const newLayer = new Layer(tileset.img, created);
            this._layers.push(newLayer);
            this.game.currentScene?.queue.addController(newLayer);

            allCreatedTiles.push(...created);
        });

        return allCreatedTiles;
    }

    public clearLayers() {
        this._layers = [];
    }
}
