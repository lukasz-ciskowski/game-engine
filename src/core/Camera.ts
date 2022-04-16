import { BaseController } from 'controllers/base/BaseController';
import { SpriteObject } from 'controllers/sprite/SpriteObject';

export class Camera extends BaseController {
    private _x: number = 0;
    private _y: number = 0;

    private _boundOffsetX: number = 0;
    private _boundOffsetY: number = 0;

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
        const changeX = Math.round(obj.x || 0);
        const changeY = Math.round(obj.y || 0);

        const prevX = this._x;
        const prevY = this._y;

        const nextX = this._x + changeX;
        const nextY = this._y + changeY;

        this._x = nextX;
        this._y = nextY;

        const ableToMove = this._followSprites.every((f) => {
            return f.move(changeX, changeY);
        });

        const prevBoundX = this._boundOffsetX;
        const prevBoundY = this._boundOffsetY;

        const [boundXHit, boundYHit] = this.isHitBounds();

        if (ableToMove) {
            if (boundXHit) this._boundOffsetX += Math.abs(changeX);
            else if (this._boundOffsetX > 0) this._boundOffsetX -= Math.abs(changeX);

            if (boundYHit) this._boundOffsetY += Math.abs(changeY);
            else if (this._boundOffsetY > 0) this._boundOffsetY -= Math.abs(changeY);

            if (this._boundOffsetX < 0) this._boundOffsetX = 0;
            if (this._boundOffsetY < 0) this._boundOffsetY = 0;
        }

        if ((this._boundOffsetX > 0 && prevBoundX > 0) || !ableToMove) this._x = prevX;
        if ((this._boundOffsetY > 0 && prevBoundY > 0) || !ableToMove) this._y = prevY;
    }

    public follow(sprite: SpriteObject) {
        this._followSprites.push(sprite);
    }

    public setBounds(b: [[number, number], [number, number]]) {
        this._bounds = b;
    }

    private isHitBounds() {
        if (this._x <= this._bounds[0][0]) return [true, false];
        if (this._x >= this._bounds[1][0] - this.game.canvas.width / 3) return [true, false];
        if (this._y <= this._bounds[0][1]) return [false, true];
        if (this._y >= this._bounds[1][1] - this.game.canvas.height / 3) return [false, true];
        return [false, false];
    }
}
