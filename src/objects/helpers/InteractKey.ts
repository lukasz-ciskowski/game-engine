import { BaseController } from 'controllers/base/BaseController';
import { MapImage } from 'controllers/map/MapImage';
import { Player } from '../Player';

export class InteractKey extends BaseController {
    private _img: MapImage;

    constructor() {
        super();
    }

    async load() {
        this._img = await this.game.currentScene.addImage('ekey', { x: 0, y: 0 });
    }

    public show() {
        const currentAnim = Player.instance.sprite.animator.currentFrame?.name;

        const posY =
            currentAnim === 'down-idle'
                ? Player.instance.sprite.y - Player.instance.sprite.height
                : Player.instance.sprite.y + Player.instance.sprite.height;

        this._img.setPosition(
            Player.instance.sprite.x + Player.instance.sprite.width / 2 - this._img.width / 2,
            posY,
        );
        this.game.currentScene.addController(this._img);
    }

    public hide() {
        this.game.currentScene.removeController(this._img);
    }
}
