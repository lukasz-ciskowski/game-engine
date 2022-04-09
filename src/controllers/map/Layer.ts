import { BaseController } from 'controllers/base/BaseController';
import { SingleTile } from 'controllers/base/SingleTile';

export class Layer extends BaseController {
    constructor(private readonly _img: HTMLImageElement, private readonly _tiles: SingleTile[]) {
        super();
    }

    update(timestamp: number): void {
        this._tiles.forEach((tile) => {
            tile.drawTile(this._img);
        });
    }
}
