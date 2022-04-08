import { BaseController } from 'controllers/base/BaseController';
import { Sprite } from 'controllers/sprite/Sprite';

export class Camera extends BaseController {
    private _x: number = 0;
    private _y: number = 0;

    private _followSprites: Sprite[] = [];

    public setPosition(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public get x() {
        return this._x;
    }

    public get y() {
        return this._y;
    }

    public move(obj: { x?: number; y?: number }) {
        this._x += obj.x || 0;
        this._y += obj.y || 0;
    }

    public follow(sprite: Sprite) {
        this._followSprites.push(sprite)
    }

    update(timestamp: number): void {
        this._followSprites.forEach(f => f.toMiddle())
    }
}
