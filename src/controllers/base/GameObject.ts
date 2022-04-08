import { BaseController } from './BaseController';

export interface GameObjectProps {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class GameObject extends BaseController {
    constructor(public readonly object: GameObjectProps) {
        super();
    }

    public setPosition(x: number, y: number) {
        this.object.x = x;
        this.object.y = y;
    }

    public get origin() {
        return {
            w: this.object.width / 2,
            h: this.object.height / 2,
        };
    }
}
