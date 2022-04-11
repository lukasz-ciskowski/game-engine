import { BaseController } from 'controllers/base/BaseController';
import { SpriteObject } from 'controllers/sprite/SpriteObject';

export class Camera extends BaseController {
    private _x: number = 0;
    private _y: number = 0;

    private _bounds: [[number, number], [number, number]] = [
        [0, 0],
        [0, 0],
    ];

    private _followSprites: SpriteObject[] = [];

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
        const prevX = this._x
        const prevY = this._y

        const nextX = this._x + (obj.x || 0);
        const nextY = this._y + (obj.y || 0);

        if (nextX <= this._bounds[0][0]) return;
        if (nextX >= this._bounds[1][0] - this.game.canvas.width / 3) return;
        if (nextY <= this._bounds[0][1]) return;
        if (nextY >= this._bounds[1][1] - this.game.canvas.height / 3) return;

        this._x = nextX;
        this._y = nextY;
        const ableToMove = this._followSprites.every(f => f.move(obj.x || 0, obj.y || 0))
        
        if (!ableToMove) {
            this._x = prevX
            this._y = prevY
        }
    }

    public follow(sprite: SpriteObject) {
        this._followSprites.push(sprite);
    }

    public setBounds(b: [[number, number], [number, number]]) {
        this._bounds = b;
    }
}
