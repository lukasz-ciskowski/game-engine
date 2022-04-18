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
    scale?: number;
}

export class GameObject extends BaseController {
    private _isColliding: false | GameObject = false;
    protected _hasCollidingProp: boolean = false

    constructor(public readonly object: GameObjectProps) {
        super();
    }

    public setPosition(x: number, y: number) {
        const isColliding = this.game.currentScene?.collisions.isColliding(x, y, this);
        if (isColliding) return false;

        this.object.x = x;
        this.object.y = y;

        return true;
    }

    public move(moveX: number, moveY: number) {
        return this.setPosition(this.object.x + moveX, this.object.y + moveY);
    }

    public get origin() {
        return {
            w: (this.object.width * this.scale * this.game.scale) / 2,
            h: (this.object.height * this.scale * this.game.scale) / 2,
        };
    }

    public setColliding(collided: false | GameObject) {
        this._isColliding = collided;
    }

    public setCollidingProp() {
        this._hasCollidingProp = true
    }

    public get isColliding() {
        return this._isColliding;
    }

    public get pos() {
        return { ...this.object, width: this.object.width * this.scale, height: this.object.height * this.scale };
    }

    public getCollisionPos(relatedX: number, relatedY: number) {
        const x = relatedX + (this.object.collisionBox?.x || 0);
        const y = relatedY + (this.object.collisionBox?.y || 0);
        const width = this.object.collisionBox?.width || this.pos.width - 1;
        const height = this.object.collisionBox?.height || this.pos.height - 1;

        return {
            x,
            y,
            width,
            height,
        };
    }

    public setScale(scale: number) {
        this.object.scale = scale;
        return this;
    }

    public setCollisionBox(params: GameObjectProps['collisionBox']) {
        this.object.collisionBox = params;
    }

    public setSize(size: { width: number; height: number }) {
        this.object.width = size.width;
        this.object.height = size.height;
    }

    public get scale() {
        return this.object.scale || 1;
    }
}
