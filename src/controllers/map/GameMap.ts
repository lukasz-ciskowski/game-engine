import { TileMapJSONData, TilemapProcessor } from 'preprocessors/TilemapProcessor';
import { BaseController } from '../base/BaseController';
import { SingleTile } from '../base/SingleTile';

export class GameMap extends BaseController {
    private _tilesetImages: Map<string, HTMLImageElement> = new Map();
    private _layers: [string, SingleTile[]][] = [];

    constructor(private readonly _mapObject: TileMapJSONData) {
        super();
    }

    public async addTileset(name: string, src: string) {
        const img = await TilemapProcessor.loadTileset(src);
        this._tilesetImages.set(name, img);
    }

    public createLayers(layers: string[], tilesetName: string) {
        const tileset = this._tilesetImages.get(tilesetName);
        if (!tileset) {
            console.error('No tileset found');
            return;
        }

        const allCreatedTiles: SingleTile[] = [];
        layers.forEach((layer) => {
            const created = TilemapProcessor.createLayer(layer, this._mapObject, tileset, this._mapObject.layers);
            if (!created) return;

            this._layers.push([tilesetName, created]);
            allCreatedTiles.push(...created);
        });

        return allCreatedTiles;
    }

    public update(timestamp: number): void {
        this._layers.forEach(([layer, points]) => {
            const layerImg = this._tilesetImages.get(layer)
            if (!layerImg) return
            points.forEach((p) => p.drawTile(layerImg));
        });
    }
}
