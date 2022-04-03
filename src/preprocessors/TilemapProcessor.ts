import { DrawArgs, GameMap } from 'controllers/GameMap';
import { DrawQueue } from 'core/DrawQueue';
import { loadImgAsync } from 'utils/imageLoader';

interface TileMapObject {
    layers: TileMapLayer[];
    tileheight: number;
    tilewidth: number;
    width: number;
    height: number;
}

interface TileMapLayer {
    data?: number[];
    layers?: TileMapLayer[];
    name: string;
    x: number;
    y: number;
}

export class TilemapProcessor {
    private _tileSets: Map<string, HTMLImageElement> = new Map();

    constructor(private readonly _mapObject: TileMapObject) {}

    public async addTileset(name: string, src: string) {
        const img = await loadImgAsync(src);
        this._tileSets.set(name, img);

        return img;
    }

    public createLayer(layerName: string, tilesetName: string): void | [HTMLImageElement, DrawArgs[]] {
        const layer = this._mapObject.layers.find((layer) => layer.name === layerName);
        if (!layer) {
            console.error('Provided layer does not exist:', layerName);
            return;
        }
        const tileset = this._tileSets.get(tilesetName);
        if (!tileset) {
            console.error('Given tileset does not exist:', tilesetName);
            return;
        }

        let heightLevel = 0;

        const TILESET_W = tileset.width / this._mapObject.tilewidth;
        const TILESET_H = tileset.height / this._mapObject.tileheight;

        const drawArgs: DrawArgs[] = []
        layer.data?.forEach((point, index) => {
            if (index % this._mapObject.width === 0 && index !== 0) heightLevel += 1;

            if (point !== 0) {
                drawArgs.push({
                    cropX: ((point % TILESET_W) - 1) * this._mapObject.tilewidth,
                    cropY: Math.floor(point / TILESET_H) * this._mapObject.tileheight,
                    x: (index % this._mapObject.width) * this._mapObject.tilewidth,
                    y: heightLevel * this._mapObject.tileheight,
                    tile: {
                        w: this._mapObject.tilewidth,
                        h: this._mapObject.tileheight,
                    },
                });
            }
        });
        return [tileset, drawArgs]
    }
}
