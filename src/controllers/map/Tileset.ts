import { TileMapJSONData } from 'preprocessors/TilemapProcessor';

export class Tileset {
    constructor(
        public readonly img: HTMLImageElement,
        public readonly scale: number = 1,
        private readonly _mapData: TileMapJSONData,
    ) {}

    public get width() {
        return this._mapData.width * this._mapData.tilewidth * this.scale;
    }

    public get height() {
        return this._mapData.height * this._mapData.tileheight * this.scale;
    }
}
