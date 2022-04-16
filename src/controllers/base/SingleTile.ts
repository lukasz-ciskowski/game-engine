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
        this.cropProps = crop;
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

        if (this._hasCollidingProp && this.game.debug) {
            const collisionPos = this.getCollisionPos(
                this._object.x - this.game.camera.x,
                this._object.y - this.game.camera.y,
            );

            this.game.ctx.beginPath();
            this.game.ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
            this.game.ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)';
            this.game.ctx.rect(collisionPos.x, collisionPos.y, collisionPos.width, collisionPos.height);
            this.game.ctx.fill();
            this.game.ctx.stroke()
        }
    }
}
