import { GameObject, GameObjectProps } from './GameObject';

interface TileProps extends GameObjectProps {
    crop: {
        x: number;
        y: number;
    };
    name?: string;
}

export class SingleTile extends GameObject {
    public readonly cropProps: TileProps['crop'];
    private _scale: number = 1;

    constructor(props: TileProps) {
        super({ x: props.x, y: props.y, width: props.width, height: props.height });
        this.cropProps = props.crop;
    }

    public setScale(scale: number) {
        this._scale = scale;
        return this
    }

    public drawTile(img: HTMLImageElement) {
        this.game.ctx.drawImage(
            img,
            this.cropProps.x,
            this.cropProps.y,
            this.object.width,
            this.object.height,
            this.object.x - this.game.camera.x,
            this.object.y - this.game.camera.y,
            this.object.width * this._scale,
            this.object.height * this._scale,
        );
    }
}
