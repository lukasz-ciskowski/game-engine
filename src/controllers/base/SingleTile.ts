import { GameObject, GameObjectProps } from './GameObject';

interface TileProps extends GameObjectProps {
    crop: {
        x: number;
        y: number;
    };
    name?: string;
}

export class SingleTile extends GameObject {
    protected cropProps: TileProps['crop'];

    constructor({ crop, ...props }: TileProps) {
        super(props);
        this.cropProps = crop;
    }

    public setCrop(crop: TileProps['crop']) {
        this.cropProps = crop
    }

    public drawTile(img: HTMLImageElement) {
        this.game.ctx.drawImage(
            img,
            this.cropProps.x,
            this.cropProps.y,
            this._object.width,
            this._object.height,
            this._object.x - this.game.camera.x,
            this._object.y - this.game.camera.y,
            this._object.width * this.scale,
            this._object.height * this.scale,
        );
    }
}
