export class Camera {
    private _x: number = 0;
    private _y: number = 0;

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
}
