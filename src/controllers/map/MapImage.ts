import { GameObject } from 'controllers/base/GameObject';
import { TileProps } from 'controllers/base/SingleTile';

export type MapImageProps = Omit<TileProps, 'width' | 'height' | 'crop'> & Partial<Pick<TileProps, 'crop'>>;

export class MapImage extends GameObject {
    protected cropProps?: TileProps['crop'];

    constructor(private readonly _img: HTMLImageElement, { crop, ...props }: MapImageProps) {
        super({ ...props, width: _img.width, height: _img.height });
        this.cropProps = crop;
    }

    public setCrop(crop: TileProps['crop']) {
        this.cropProps = crop;
    }

    update(timestamp: number): void {
        this.draw();
    }

    private draw() {
        this.game.ctx.drawImage(
            this._img,
            this.cropProps?.x || 0,
            this.cropProps?.y || 0,
            this.object.width,
            this.object.height,
            this.object.x - this.game.camera.x,
            this.object.y - this.game.camera.y,
            this.object.width * this.scale,
            this.object.height * this.scale,
        );
    }
}
