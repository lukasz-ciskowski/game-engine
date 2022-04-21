import { SingleTile } from 'controllers/base/SingleTile';
import { Tileset } from 'controllers/map/Tileset';

export interface TileMapJSONData {
    layers: TileMapJSONLayer[];
    tileheight: number;
    tilewidth: number;
    width: number;
    height: number;
}

interface TileMapJSONLayer {
    data?: number[];
    layers?: TileMapJSONLayer[];
    name: string;
    x: number;
    y: number;
}

export class TilemapProcessor {
    public static createLayer(
        layerName: string,
        mapData: TileMapJSONData,
        tileset: Tileset,
        toSearch: TileMapJSONLayer[],
    ): SingleTile[] {
        const layer = toSearch.find((layer) => layer.name === layerName);
        if (!layer) {
            console.error('Provided layer does not exist:', layerName);
            return [];
        }

        if (layer.layers) {
            return layer.layers
                .map((subLayer) => this.createLayer(subLayer.name, mapData, tileset, layer.layers || []))
                .flat();
        }

        let heightLevel = 0;

        const TILESET_W = tileset.img.width / mapData.tilewidth;

        const tiles: SingleTile[] = [];
        layer.data?.forEach((point, index) => {
            if (index % mapData.width === 0 && index !== 0) heightLevel += 1;

            if (point !== 0) {
                tiles.push(
                    new SingleTile({
                        crop: {
                            x: ((point - 1) % TILESET_W) * mapData.tilewidth,
                            y: Math.floor((point - 1) / TILESET_W) * mapData.tileheight,
                        },
                        x: (index % mapData.width) * mapData.tilewidth * tileset.scale,
                        y: heightLevel * mapData.tileheight * tileset.scale,
                        width: mapData.tilewidth,
                        height: mapData.tileheight,
                    }).setScale(tileset.scale),
                );
            }
        });
        return tiles;
    }
}
