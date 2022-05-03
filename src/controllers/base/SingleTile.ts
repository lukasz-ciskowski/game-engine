import { GameObject, GameObjectProps } from './GameObject';

export interface TileProps extends GameObjectProps {
    crop: {
        x: number;
        y: number;
    };
}

export class SingleTile extends GameObject {
    protected cropProps: TileProps['crop'];

    constructor(tileProps?: Partial<TileProps>) {
        const { crop, ...props } = tileProps || {};
        super(props);
        this.cropProps = {
            x: crop?.x || 0,
            y: crop?.y || 0,
        };
    }

    public setCrop(crop: TileProps['crop']) {
        this.cropProps = crop;
    }

    public drawTile(img: HTMLImageElement) {
        this.game.ctx.drawImage(
            img,
            this.cropProps.x,
            this.cropProps.y,
            this.original.width,
            this.original.height,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            this.width,
            this.height,
        );

        if (this._hasCollidingProp && this.game.debug) {
            const collisionPos = this.getCollisionBox(this.x - this.game.camera.x, this.y - this.game.camera.y);

            this.game.ctx.beginPath();
            this.game.ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
            this.game.ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)';
            this.game.ctx.rect(collisionPos.x, collisionPos.y, collisionPos.width, collisionPos.height);
            this.game.ctx.fill();
            this.game.ctx.stroke();
        }
    }
}
