import { BaseController } from 'controllers/base/BaseController';
import { SingleTile } from 'controllers/base/SingleTile';
import { Player } from './Player';

export class HouseEntry extends BaseController {
    constructor(private readonly _triggers: SingleTile[], private readonly _sceneToLoad: string) {
        super();
    }

    update(timestamp: number): void {
        if (this.game.cursor.keyboard.e.isPressed) {
            if (this._triggers.some((t) => t.isColliding === Player.instance.sprite)) {
                this.game.loadScene(this._sceneToLoad);
            }
        }
    }
}
