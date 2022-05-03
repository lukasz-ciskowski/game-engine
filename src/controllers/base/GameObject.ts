import { BaseController } from './BaseController';

export interface CollisionBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface GameObjectProps {
    x: number;
    y: number;
    width: number;
    height: number;
    collisionBox?: Partial<CollisionBox>;
    scale?: number;
}

export class GameObject extends BaseController {
    private _isColliding: false | GameObject = false;
    protected _hasCollidingProp: boolean = false;
    private readonly object: GameObjectProps;

    constructor(object?: Partial<GameObjectProps>) {
        super();
        this.object = {
            x: object?.x || 0,
            y: object?.y || 0,
            width: object?.width || 0,
            height: object?.height || 0,
        };
    }

    public setPosition(x: number, y: number) {
        this.object.x = x;
        this.object.y = y;

        return this
    }

    /**
     * move without validating the collision
     */
    public move(moveX: number, moveY: number) {
        this.setPosition(this.object.x + moveX, this.object.y + moveY);
    }

    public get isColliding() {
        return this._isColliding;
    }

    public get x() {
        return this.object.x;
    }
    public get y() {
        return this.object.y;
    }

    public get width() {
        return this.object.width * this.scale;
    }

    public get height() {
        return this.object.height * this.scale;
    }

    public get original() {
        return this.object;
    }

    /**
     * Get the middle point of the object
     */
    public get center() {
        return {
            w: (this.object.width * this.scale * this.game.scale) / 2,
            h: (this.object.height * this.scale * this.game.scale) / 2,
        };
    }

    public setCollision(collided: false | GameObject) {
        this._isColliding = collided;
    }

    public enableCollision() {
        this._hasCollidingProp = true;
    }

    public getCollisionBox(relatedX: number = this.x, relatedY: number = this.y): CollisionBox {
        const x = relatedX + (this.object.collisionBox?.x || 0);
        const y = relatedY + (this.object.collisionBox?.y || 0);
        const width = this.object.collisionBox?.width || this.width - 1;
        const height = this.object.collisionBox?.height || this.height - 1;

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
