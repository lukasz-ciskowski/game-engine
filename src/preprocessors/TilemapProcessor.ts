import { SingleTile } from 'controllers/base/SingleTile';
import { loadImgAsync } from 'utils/imageLoader';

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
    public static async loadTileset(src: string) {
        const img = await loadImgAsync(src);
        return img;
    }

    public static createLayer(
        layerName: string,
        mapData: TileMapJSONData,
        tileset: HTMLImageElement,
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

        const TILESET_W = tileset.width / mapData.tilewidth;
        const TILESET_H = tileset.height / mapData.tileheight;

        const tiles: SingleTile[] = [];
        layer.data?.forEach((point, index) => {
            if (index % mapData.width === 0 && index !== 0) heightLevel += 1;

            if (point !== 0) {
                tiles.push(
                    new SingleTile({
                        crop: {
                            x: ((point % TILESET_W) - 1) * mapData.tilewidth,
                            y: Math.floor(point / TILESET_H) * mapData.tileheight,
                        },
                        x: (index % mapData.width) * mapData.tilewidth,
                        y: heightLevel * mapData.tileheight,
                        width: mapData.tilewidth,
                        height: mapData.tileheight,
                    }),
                );
            }
        });
        return tiles;
    }
}
