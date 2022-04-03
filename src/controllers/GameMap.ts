import { DrawQueue } from 'core/DrawQueue';
import { TilemapProcessor } from 'preprocessors/TilemapProcessor';
import { BaseController } from './BaseController';

export interface DrawArgs {
    x: number;
    y: number;
    cropX: number;
    cropY: number;
    tile: { w: number; h: number };
}

export class GameMap extends BaseController {
    constructor(private readonly _tilemap: TilemapProcessor) {
        super();
    }

    public async addTileset(name: string, src: string) {
        await this._tilemap.addTileset(name, src);
    }

    public createLayer(layerName: string, tilesetName: string) {
        const result = this._tilemap.createLayer(layerName, tilesetName);
        if (!result) return;
        this.drawQueue.push({
            draw: () => {
                result[1].forEach((t) => this.drawTile(result[0], t));
            },
        });
    }

    private drawTile(img: HTMLImageElement, args: DrawArgs) {
        this.game.ctx.drawImage(
            img,
            args.cropX,
            args.cropY,
            args.tile.w,
            args.tile.h,
            args.x - this.game.camera.x,
            args.y - this.game.camera.y,
            args.tile.w,
            args.tile.h,
        );
    }
}
