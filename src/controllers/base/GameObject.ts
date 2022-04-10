import { BaseController } from './BaseController';

export interface GameObjectProps {
    x: number;
    y: number;
    width: number;
    height: number;
    collisionBox?: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
    };
    scale?: number
}

export class GameObject extends BaseController {
    private _isColliding: false | GameObject = false;

    constructor(public readonly _object: GameObjectProps) {
        super();
    }

    public setPosition(x: number, y: number) {
        const isColliding = this.game.currentScene?.collisions.isColliding(x, y, this);
        if (isColliding) return false;

        this._object.x = x;
        this._object.y = y;

        return true;
    }

    public get origin() {
        return {
            w: (this._object.width * this.scale) / 2,
            h: (this._object.height * this.scale) / 2,
        };
    }

    public setColliding(collided: false | GameObject) {
        this._isColliding = collided;
    }

    public get isColliding() {
        return this._isColliding;
    }

    public get pos() {
        return { ...this._object, width: this._object.width * this.scale, height: this._object.height * this.scale };
    }

    public getCollisionPos(relatedX: number, relatedY: number) {
        const x = relatedX + (this._object.collisionBox?.x || 0);
        const y = relatedY + (this._object.collisionBox?.y || 0);
        const width = this._object.collisionBox?.width || this.pos.width;
        const height = this._object.collisionBox?.height || this.pos.height;

        return {
            x,
            y,
            width,
            height,
        };
    }

    public setScale(scale: number) {
        this._object.scale = scale;
        return this;
    }

    public setCollisionBox(params: GameObjectProps['collisionBox']) {
        this._object.collisionBox = params;
    }

    public get scale() {
        return this._object.scale || 1;
    }
}
